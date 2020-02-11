import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import axios from "axios";

class DropdownAutoCompleteMetrics extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: undefined,
            pollerhosts: this.props.pollerhosts,
            hostname: this.props.hostname,
            service: this.props.service,
            metric: null
        };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.hostname!==prevState.hostname){
            return { hostname: nextProps.hostname};
        }
        if(nextProps.service!==prevState.service){
            return { service: nextProps.service};
        }
        if(nextProps.pollerhosts!==prevState.pollerhosts){
            return { pollerhosts: nextProps.pollerhosts};
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.hostname!==this.props.hostname || prevProps.service!==this.props.service){
            this.searchMetric();
        }
    }

    changeMetric = (event, metric) => {
        this.setState({
            metric: metric
        });
    };

    setMetric = (event, metric) => {this.props.sendMetric(metric)};

    handleMetric = (event, metric) => {
        this.changeMetric(event, metric)
        this.setMetric(event, metric)
    }

    searchMetric(){
        if(this.state.hostname != null && this.state.service !=null  && this.state.pollerhosts !=null){
            let hostname = this.state.hostname.host_name;
            let service = this.state.service.service_description;
            let aux = "POLLER_" + hostname;

            if(this.state.pollerhosts.some(item => item.host_name === aux)){
                hostname = aux;
            }

            axios.post('/api/dashboard/servicemetrics', {
                'hostname': hostname,
                'service': service
            }).then(response => {
                //console.log(response.data);
                this.setState({data: response.data});
            }).catch(e=>{
                console.log(e);
            })
        }
    }

    render(){
        return (
            <Autocomplete
                id="highlights-metrics"
                style={{ width: 250 }}
                options={this.state.data}
                getOptionLabel={option => option.metric_name}
                renderInput={params => (
                    <TextField {...params} label="Metric" variant="outlined" fullWidth margin="normal" />
                )}
                onChange={this.handleMetric}
                renderOption={(option, { inputValue }) => {
                    const matches = match(option.metric_name, inputValue);
                    const parts = parse(option.metric_name, matches);

                    return (
                        <div>
                            {parts.map((part, index) => (
                                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                    {part.text}
                                </span>
                            ))}
                        </div>
                    );
                }}
            />
        );
    }
}

export default DropdownAutoCompleteMetrics;

