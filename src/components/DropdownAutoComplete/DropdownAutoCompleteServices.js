import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import axios from "axios";

class DropdownAutoCompleteServices extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: undefined,
            pollerhosts: this.props.pollerhosts,
            hostname: this.props.hostname,
            service: null
        };
    }

   static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.hostname!==prevState.hostname){
            return { hostname: nextProps.hostname};
        }
       if(nextProps.pollerhosts!==prevState.pollerhosts){
           return { pollerhosts: nextProps.pollerhosts};
       }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.hostname!==this.state.hostname){
            this.searchServices();
        }
    }

    /*componentDidMount(){
        this.searchServices();
    }*/

    /*searchAllServices(){
        axios.get('/api/dashboard/allservices', {
            params: {'service': this.state.service_description}
        }).then(response =>{
            this.setState({data: response.data});
        }).catch(e=>{
            console.log(e);
        })
    }*/

    changeService = (event, service) => {
        this.setState({
            service: service
        });
    };

    setService = (event, service) => {this.props.sendService(service)};

    handleService = (event, service) => {
        this.changeService(event, service)
        this.setService(event, service)
    }


    searchServices(){
        if(this.state.hostname != null && this.state.pollerhosts !=null){
            let hostname = this.state.hostname.host_name;
            let aux = "POLLER_" + hostname;
            //console.log(hostname);
            if(this.state.pollerhosts.some(item => item.host_name === aux)){
                hostname = aux;
            }
            //console.log(this.state.pollerhosts);
            //console.log(hostname);
            axios.post('/api/dashboard/hostservices', {
                'hostname':hostname
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
                id="highlights-services"
                style={{ width: 250 }}
                options={this.state.data}
                getOptionLabel={option => option.service_description}
                renderInput={params => (
                    <TextField {...params} label="Service" variant="outlined" fullWidth margin="normal" />
                )}
                onChange={this.handleService}
                renderOption={(option, { inputValue }) => {
                    const matches = match(option.service_description, inputValue);
                    const parts = parse(option.service_description, matches);

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

export default DropdownAutoCompleteServices;


