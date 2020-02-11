import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


class DateTimePicker extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            date: new Date()
        };
    }

    changeDate = (date) => {
        this.setState({
            date: date
        });
    };

    setDate = (date) => {this.props.sendEndDate(date)}

    handleDate = (date) => {
        this.changeDate(date)
        this.setDate(date)
    }


    render(){
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container>
                    <KeyboardDatePicker
                        margin="normal"
                        id="end-date-picker"
                        label="End Date"
                        format="dd/MM/yyyy"
                        value={this.state.date}
                        onChange={this.handleDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />

                </Grid>
            </MuiPickersUtilsProvider>
        );
    }
}

/*<KeyboardTimePicker
    margin="normal"
    id="end-time-picker"
    label="End Time"
    value={this.state.date}
    onChange={this.handleDate}
    KeyboardButtonProps={{
        'aria-label': 'change time',
    }}
/>*/

export default DateTimePicker;