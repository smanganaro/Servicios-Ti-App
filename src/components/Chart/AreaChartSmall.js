import React from 'react';
import {Line} from 'react-chartjs-2';

class AreaChart extends React.Component {

   constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            hostname: this.props.hostname,
            service: this.props.service,
            metric: this.props.metric,
            groupby: this.props.groupby,
            label: this.props.label
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
            label: this.props.label,
            labels: this.state.data.map(time => time.Time),
            datasets: [
                {
                    label: this.state.metric,
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
                    pointHoverRadius: 5,
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
                    pointHoverRadius: 5,
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

        if ( this.state.data === undefined ||  this.state.hostname == null ||  this.state.service == null || this.state.metric == null  ){
            return (
                <div></div>
            )
        }


        return (

                        <Line options={{responsive:true,  height:"100px",
                                        scales:{
                                            yAxes:[{
                                                scaleLabel:{ display: true,
                                                            labelString: this.state.metric,
                                                            fontColor: 'white',
                                                            fontSize: 10,
                                                            fontFamily: 'Verdana'},
                                                ticks:{fontColor: 'white',fontSize: 10,}
                                            }],
                                            xAxes:[{
                                                scaleLabel:{ display: true,
                                                            labelString: this.state.groupby,
                                                            fontColor: 'white',
                                                            fontSize: 10,
                                                            fontFamily: 'Verdana'},
                                                ticks:{
                                                    callback: (value, index, values) =>{
                                                        if(this.state.groupby === "Hour") {
                                                            return value.substring(11,13) + "hs";
                                                        }else{
                                                            return value;
                                                        }},
                                                    fontSize: 10,
                                                    fontColor: 'white',
                                                    beginAtZero: true
                                                    }
                                            }]

                                        },
                                        legend:{
                                            display: false,
                                            /*position: 'right',
                                            align: 'start',
                                            labels:{ fontColor: 'white',
                                                    fontSize: 14,
                                                    fontFamily: 'Verdana'
                                            }*/
                                        },
                         }} data={this.getChartData} />

        );
    }


}

export default AreaChart;
