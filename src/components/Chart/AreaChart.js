import React from 'react';
import {Line} from 'react-chartjs-2';

import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import Card from "../../components/Card/Card.js";

class AreaChart extends React.Component {

   constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            hostname: this.props.hostname,
            service: this.props.service,
            metric: this.props.metric,
            groupby: this.props.groupby
        };
    }


    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.data!==prevState.data){
            return { data: nextProps.data};
        }
        if(nextProps.hostname!==prevState.hostname){
            return { hostname: nextProps.hostname};
        }
        if(nextProps.service!==prevState.service){
            return { service: nextProps.service};
        }
        if(nextProps.metric!==prevState.metric){
            return { metric: nextProps.metric};
        }
        if(nextProps.groupby!==prevState.groupby){
            return { groupby: nextProps.groupby};
        }
        else return null;
    }

    getChartData = canvas => {
        let data = {
            labels: this.state.data.map(time => time.Time),
            datasets: [
                {
                    label: this.state.metric.metric_name,
                    fill: true,
                    borderColor:'rgba(0, 242, 255, 1)',
                    lineTension: 0.1,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(3, 169, 244, 1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(3, 169, 244, 1)',
                    pointHoverBorderColor: 'white',
                    pointHoverBorderWidth: 2,
                    pointRadius: 2,
                    maintainAspectRatio: false,
                    pointHitRadius: 10,
                    data: this.state.data.map(trx => trx.TrxTotal),
                    reverse: true
                },
                {
                    label: "Umbral",
                    fill: false,
                    borderColor: 'rgba(255, 106, 0, 1)',
                    lineTension: 0.1,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(232, 126, 44, 1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgba(232, 126, 44, 1)',
                    pointHoverBorderColor: 'white',
                    pointHoverBorderWidth: 2,
                    pointRadius: 2,
                    maintainAspectRatio: false,
                    pointHitRadius: 10,
                    data: this.state.data.map(trx => trx.Umbral),
                    reverse: true,
                }
            ]
        };
        if(data.datasets){
            let colors = ["rgba(0, 242, 255, 1)", "rgba(255, 106, 0, 1)"];

            data.datasets.forEach((set,i) => {
                set.backgroundColor = this.setGradientColor(canvas, colors[i]);
                set.borderWidth = 2;
            })
        }
        return data;
    }

     setGradientColor = (canvas, color) => {
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0,0,500, 500);
        gradient.addColorStop(0,color);
        gradient.addColorStop(0.95, "rgba(0, 81, 255, 1)");
        return gradient;
    }

    render() {

        if ( this.state.data === undefined ||  this.state.hostname == null ||  this.state.service == null || this.state.metric == null ||  this.state.groupby == null  ){
            return (
                <div></div>
            )
        }


        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card style={{ backgroundColor: '#263238', "paddingTop":"15px" }}
                           >
                        <Line options={{responsive:true,
                                        scales:{
                                            yAxes:[{
                                                scaleLabel:{ display: true,
                                                            labelString: this.state.metric.metric_name,
                                                            fontColor: 'white',
                                                            fontSize: 12,
                                                            fontFamily: 'Verdana'},
                                                ticks:{fontColor: 'white'}
                                            }],
                                            xAxes:[{
                                                scaleLabel:{ display: true,
                                                            labelString: this.state.groupby.name,
                                                            fontColor: 'white',
                                                            fontSize: 12,
                                                            fontFamily: 'Verdana'},
                                                ticks:{
                                                    callback: (value, index, values) =>{
                                                        if(this.state.groupby.name === "Hour") {
                                                            return value + "hs";
                                                        }else{
                                                            return value;
                                                        }},
                                                    fontColor: 'white',
                                                    beginAtZero: true
                                                    }
                                            }]

                                        },
                                        legend:{
                                            position: 'right',
                                            align: 'start',
                                            labels:{ fontColor: 'white',
                                                    fontSize: 14,
                                                    fontFamily: 'Verdana'
                                            }
                                        },
                         }} data={this.getChartData} />
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }


}

export default AreaChart;
