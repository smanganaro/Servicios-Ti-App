import React from "react";
import axios from "axios";

import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import DropdownAutoCompleteMetricsB from "../../components/DropdownAutoComplete/DropdownAutoCompleteMetricsB.js";
import StartDateTimePicker from "../../components/Datepicker/StartDateTimePicker.js";
import EndDateTimePicker from "../../components/Datepicker/EndDateTimePicker.js";
import AreaChart from "../Chart/AreaChart";
import DropdownGroupBy from "../DropdownMenu/DropdownGroupBy";

class NagiosSearchHostService extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: undefined,
            pollerhosts: null,
            hostname:this.props.match.params.host,
            service:this.props.match.params.service,
            metric:null,
            startdate: new Date(),
            enddate: new Date(),
            groupby: null,
        }
    }

    getMetric = (metric) =>{
        this.setState({
            metric: metric
        })
    }

    getStartDate = (startdate) =>{
        this.setState({
            startdate: startdate
        })
    }

    getEndDate = (enddate) =>{
        this.setState({
            enddate: enddate
        })
    }

    getGroupBy = (groupby) =>{
        this.setState({
            groupby: groupby
        })
    }

    componentDidMount(){
        this.searchHosts();
    }

    searchHosts(){
        axios.get('/api/dashboard/allhosts').then(response =>{
            //console.log(response.data);
            let pollerhosts = response.data.filter(data => data.host_name.startsWith("POLLER"));
            //console.log(pollerhosts);
            this.setState({pollerhosts: pollerhosts});
        }).catch(e=>{
            console.log(e);
        })
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if( prevState.metric!==this.state.metric || prevState.groupby!==this.state.groupby
            || prevState.startdate!==this.state.startdate || prevState.enddate!==this.state.enddate){
            this.handleSubmit();
        }
    }


    handleSubmit () {
        if(this.state.hostname != null && this.state.service != null && this.state.metric != null && this.state.groupby != null && this.state.pollerhosts != null ) {

            let startDateFormatted = this.state.startdate.getFullYear() + "-" + ("0" + (this.state.startdate.getMonth() + 1)).slice(-2) + "-" + ("0" + this.state.startdate.getDate()).slice(-2);
            let endDateFormatted = this.state.enddate.getFullYear() + "-" + ("0" + (this.state.enddate.getMonth() + 1)).slice(-2) + "-" + ("0" + this.state.enddate.getDate()).slice(-2);
            console.log(this.state.hostname, this.state.service, this.state.metric.metric_name, startDateFormatted,  endDateFormatted)
            let url = '/api/dashboard/umbralbyhour';
            let urlb = '/api/dashboard/noumbralbyhour';
            let hostname = this.state.hostname;
            let service = this.state.service;
            let metric = this.state.metric.metric_name;
            let aux = "POLLER_" + hostname;

            if(this.state.groupby.name === "Day"){
                url = '/api/dashboard/umbralbyday';
                urlb = '/api/dashboard/noumbralbyday';
            }
            if(this.state.pollerhosts.some(item => item.host_name === aux)){
                hostname = aux;
            }
            axios.post(url, {
                'hostname': hostname,
                'service': service ,
                'metric': metric,
                'startdate': startDateFormatted,
                'enddate': endDateFormatted
            }).then(response => {
                if (response.data == null) {
                    axios.post(urlb, {
                        'hostname': hostname,
                        'service': service,
                        'metric': metric,
                        'startdate': startDateFormatted,
                        'enddate': endDateFormatted
                    }).then(response => {
                        console.log(response.data);
                        this.setState({data: response.data});
                    }).catch(e => {
                        console.log(e);
                    })
                } else {
                    console.log(response.data);
                    this.setState({data: response.data});
                }
            }).catch(e => {
                console.log(e);
            })
        }
    }

    render() {
        //console.log(this.state.pollerhosts);
        return(
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={6} md={4}>
                        <DropdownAutoCompleteMetricsB hostname={this.state.hostname} pollerhosts={this.state.pollerhosts} service={this.state.service} sendMetric={this.getMetric.bind(this)}/>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={4}>
                        <StartDateTimePicker sendStartDate={this.getStartDate.bind(this)}/>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={4}>
                        <EndDateTimePicker sendEndDate={this.getEndDate.bind(this)}/>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={4}>
                        <DropdownGroupBy groupby= {this.state.groupby} sendGroupBy={this.getGroupBy.bind(this)}/>
                    </GridItem>
                </GridContainer>
                <AreaChart groupby= {this.state.groupby}  metric={this.state.metric} hostname={this.state.hostname} service={this.state.service} data={this.state.data} />
            </div>
        );
    }
}
export default NagiosSearchHostService;