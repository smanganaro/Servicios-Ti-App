import React from "react";

import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";

import { withStyles } from "@material-ui/core/styles";

import axios from "axios";

import GaugeChart from "../../components/Chart/GaugeChart.js";

const styles = theme => ({
    service:{
        marginTop: "-.375rem",
        fontFamily:'Arial',
    },
    trx:{
        marginTop: "-.375rem",
        color:"gray",

    },
    nomarg:{
        margin:"0px",
    }
});


class Disponibilidad extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            token: null,
            debitoP: 0,
            creditoP: 0,
            decidirP: 0,
            todopagoP: 0,
            pmcspvP: 0,
            qrP: 0,
            pheP: 0,
            vhbP: 0,
            vhsP: 0,
            wsbeP: 0,
            debitoTrx: 0,
            creditoTrx: 0,
            decidirTrx: 0,
            todopagoTrx: 0,
            pmcspvTrx: 0,
            qrTrx: 0,
            pheTrx: 0,
            vhbTrx: 0,
            vhsTrx: 0,
            wsbeTrx: 0
        }
    }

    componentDidMount() {
        this.getSharepointData();
    }

    getSharepointData(){

        let tokenurl = '/api/disponibilidad/gettoken';
        let url = '/api/disponibilidad/getdisponibilidades'
        var token;

        axios.get(tokenurl)
            .then((response)=> {
                token = response.data.access_token;
                //console.log(token);
                this.setState({
                    token: token
                });
                axios.post(url, {
                    'token': token
                }).then(response => {
                    //console.log(response.data);
                    this.setState({data: response.data});
                    //console.log(response.data.d.results.length);

                    for(let i=0; i < response.data.d.results.length; i++){
                        this.setState({
                            debitoP: this.state.debitoP + response.data.d.results[i].NonStop_x0020_BE,
                            creditoP: this.state.creditoP + response.data.d.results[i].Mainframe,
                            decidirP: this.state.decidirP + response.data.d.results[i].Decidir_x0020_2_x002e_0,
                            todopagoP: this.state.todopagoP + response.data.d.results[i].TodoPago,
                            pmcspvP: this.state.pmcspvP + response.data.d.results[i].Pagomiscuentas,
                            qrP: this.state.qrP + response.data.d.results[i].Transacciones_x0020_QR,
                            pheP: this.state.pheP + response.data.d.results[i].PHE,
                            vhbP: this.state.vhbP + response.data.d.results[i].OData__x0025__x0020_VHB_x0020__x0028_8,
                            vhsP: this.state.vhsP + response.data.d.results[i].OData__x0025__x0020_VHS_x0020__x0028_9,
                            wsbeP: this.state.wsbeP + response.data.d.results[i].OData__x0025__x0020_WS_x0020_BE,
                            debitoTrx: this.state.debitoTrx + response.data.d.results[i].TRX_x0020_NonStop_x0020_BE,
                            creditoTrx: this.state.creditoTrx + response.data.d.results[i].TRX_x0020_Mainframe,
                            decidirTrx: this.state.decidirTrx + response.data.d.results[i].r8x4,
                            todopagoTrx: this.state.todopagoTrx + response.data.d.results[i].OData__x0074_ya3,
                            pmcspvTrx: this.state.pmcspvTrx + response.data.d.results[i].oobi,
                            qrTrx: this.state.qrTrx + response.data.d.results[i].TRX_x0020_QR,
                            pheTrx: this.state.pheTrx + response.data.d.results[i].d6ti,
                            vhbTrx: this.state.vhbTrx + response.data.d.results[i].VHB_x0028_8_x0029_,
                            vhsTrx: this.state.vhsTrx + response.data.d.results[i].REQ_x0020_VHS_x0020__x0028_9_x00,
                            wsbeTrx: this.state.wsbeTrx + response.data.d.results[i].TRX_x0020_WS_x0020_BE_x0020__x00
                        })
                    }


                }).catch(e=>{
                    console.log(e);
                })
            }).catch((e) => {
            console.log(e);
        })



    }

    render(){
        const { classes } = this.props;

        return (
            <div>
                <GridContainer>

                    <GridItem xs={12} sm={12} md={6} lg={4}>
                        <Card chart>
                            <CardHeader className={classes.nomarg} color="grey">
                                    <GaugeChart
                                                id={"debito"} value={this.state.debitoP/30*100}
                                    />
                            </CardHeader>


                            <CardBody>
                                <h3 className={classes.service}>Débito</h3>
                                <h5 className={classes.trx}>Procesadas: {this.state.debitoTrx}</h5>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={4}>
                        <Card  chart>
                            <CardHeader color="grey">
                                <GaugeChart
                                    id={"credito"} value={this.state.creditoP/30*100}
                                />
                            </CardHeader>
                            <CardBody>
                                <h3 className={classes.service} >Crédito</h3>
                                <h5 className={classes.trx}>Procesadas: {this.state.creditoTrx}</h5>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={4}>
                        <Card  chart>
                            <CardHeader  color="grey">
                                <GaugeChart
                                    id={"decidir"} value={this.state.decidirP/30*100}
                                />
                            </CardHeader>
                            <CardBody>
                                <h3 className={classes.service}>Decidir</h3>
                                <h5 className={classes.trx}>Procesadas: {this.state.decidirTrx}</h5>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={4}>
                        <Card chart>
                            <CardHeader color="grey">
                                <GaugeChart
                                    id={"todopago"} value={this.state.todopagoP/30*100}
                                />
                            </CardHeader>
                            <CardBody>
                                <h3 className={classes.service} >TodoPago</h3>
                                <h5 className={classes.trx}>Procesadas: {this.state.todopagoTrx}</h5>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={4}>
                        <Card  chart>
                            <CardHeader color="grey">
                                <GaugeChart
                                    id={"pmcspv"} value={this.state.pmcspvP/30*100}
                                />
                            </CardHeader>
                            <CardBody>
                                <h3 className={classes.service}>PMC/SPV</h3>
                                <h5 className={classes.trx}>Procesadas: {this.state.pmcspvTrx}</h5>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={4}>
                        <Card  chart>
                            <CardHeader color="grey">
                                <GaugeChart
                                    id={"qrp"} value={this.state.qrP/30*100}
                                />
                            </CardHeader>
                            <CardBody>
                                <h3 className={classes.service}>QR</h3>
                                <h5 className={classes.trx}>Procesadas: {this.state.qrTrx}</h5>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={4}>
                        <Card  chart>
                            <CardHeader color="grey">
                                <GaugeChart
                                    id={"phe"} value={this.state.pheP/30*100}
                                />
                            </CardHeader>
                            <CardBody>
                                <h3 className={classes.service} >PHE</h3>
                                <h5 className={classes.trx} >Procesadas: {this.state.pheTrx}</h5>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={4}>
                        <Card chart>
                            <CardHeader color="grey">
                                <GaugeChart
                                    id={"vhb"} value={this.state.vhbP/30*100}
                                />
                            </CardHeader>
                            <CardBody>
                                <h3 className={classes.service}>Visa Home Bancos</h3>
                                <h5 className={classes.trx}>Procesadas: {this.state.vhbTrx}</h5>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={4}>
                        <Card chart>
                            <CardHeader color="grey">
                                <GaugeChart
                                    id={"vhs"} value={this.state.vhsP/30*100}
                                />
                            </CardHeader>
                            <CardBody>
                                <h3 className={classes.service}>Visa Home Socios</h3>
                                <h5 className={classes.trx}>Procesadas: {this.state.vhsTrx}</h5>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={4}>
                        <Card  chart>
                            <CardHeader color="grey">
                                <GaugeChart
                                    id={"wsbe"} value={this.state.wsbeP/30*100}
                                />
                            </CardHeader>
                            <CardBody>
                                <h3 className={classes.service} >Web Service Banca Electronica</h3>
                                <h5 className={classes.trx} >Procesadas: {this.state.wsbeTrx}</h5>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }

}

export default withStyles(styles) (Disponibilidad);