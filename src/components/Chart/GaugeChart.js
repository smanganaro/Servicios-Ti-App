import React from 'react';
import ReactSpeedometer from "react-d3-speedometer";

class GaugeChart extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            value: this.props.value,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.value!==prevState.value){
            return { value: nextProps.value};
        }
        if(nextProps.text!==prevState.text){
            return { text: nextProps.text};
        }
        else return null;
    }

    render() {

        return(
            <ReactSpeedometer id={this.state.id}
                              height={200}
                              minValue={90}
                              maxValue={100}
                              maxSegmentLabels={0}
                              startColor={"#ff1500"}
                              endColor={"#15ff00"}
                              segments={25}
                              textColor={"#FFFFFF"}
                              valueTextFontSize="25px"
                              currentValueText= {this.state.value+'%'}
                              value={this.state.value}/>
        );
    }

}

export default GaugeChart;