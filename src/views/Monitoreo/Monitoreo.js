import React from "react";
// react plugin for creating charts
//import ChartistGraph from "react-chartist";
import AreaChartSmall from "../../components/Chart/AreaChartSmall";
// @material-ui/core
import { withStyles } from "@material-ui/core/styles";
// @material-ui/icons
//import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import Tasks from "../../components/Tasks/Tasks.js";
import CustomTabs from "../../components/CustomTabs/CustomTabs.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";

import { bugs, website, server } from "../../variables/general.js";

/*import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../variables/charts.js";*/

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from "axios";

class Monitoreo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      hostname: ["POLLER_WIN-DB-P-010", "POLLER_WIN-DB-P-010", "POLLER_WIN-DB-P-010"] ,
      service:  ["CHECK_TRX_POS_CaptTec_Otros_Descon", "CHECK_TRXDUR_POS_CaptTec_LAPOS_GSM_Claro", "CHECK_TRX_POS_Captura_LAPOS"],
      metric:  ["TRX", "Duracion", "TRX"],
      groupby:  ["Hour", "Hour", "Hour"],
      startdate: new Date(),
      enddate: new Date(),
      statusData: [],
      statusColors: [],
      lastUpdates: [],
    };
  }

  componentDidMount(){
    this.getChartData(0);
    this.getChartData(1);
    this.getChartData(2);

  }

  getChartData (index) {
    if(this.state.hostname != null && this.state.service != null && this.state.metric != null && this.state.groupby != null ) {
      let startDateFormatted = this.state.startdate.getFullYear() + "-" + ("0" + (this.state.startdate.getMonth() + 1)).slice(-2) + "-" + ("0" + this.state.startdate.getDate()).slice(-2);
      let endDateFormatted = this.state.enddate.getFullYear() + "-" + ("0" + (this.state.enddate.getMonth() + 1)).slice(-2) + "-" + ("0" + this.state.enddate.getDate()).slice(-2);
      //console.log(this.state.hostname[index], this.state.service[index], this.state.metric[index], startDateFormatted,  endDateFormatted);
      var url = '/api/dashboard/umbralbyhour';
      var urlb = '/api/dashboard/noumbralbyhour';
      if(this.state.groupby[index] === "Day"){
        url = '/api/dashboard/umbralbyday';
        urlb = '/api/dashboard/noumbralbyday';
      }
      axios.post(url, {
        'hostname': this.state.hostname[index],
        'service': this.state.service[index],
        'metric': this.state.metric[index],
        'startdate': startDateFormatted,
        'enddate': endDateFormatted
      }).then(response => {
        if (response.data == null) {
          axios.post(urlb, {
            'hostname': this.state.hostname[index],
            'service': this.state.service[index],
            'metric': this.state.metric[index],
            'startdate': this.state.startdate,
            'enddate': this.state.enddate
          }).then(response => {
            //console.log(response.data);
            this.setState({
              data: this.state.data.concat([response.data])
            });
          }).catch(e => {
            console.log(e);
          })
        } else {
          //console.log(response.data);
          this.setState({
            data: this.state.data.concat([response.data])
          });
          if(this.state.metric[index])
              this.getStatus(index);

        }
      }).catch(e => {
        console.log(e);
      })
    }
  }

  getStatus(index){
      if(this.state.hostname != null && this.state.service != null && this.state.metric != null ){
          let startDateFormatted = this.state.startdate.getFullYear() + "-" + ("0" + (this.state.startdate.getMonth() + 1)).slice(-2) + "-" + ("0" + this.state.startdate.getDate()).slice(-2);
          let endDateFormatted = this.state.enddate.getFullYear() + "-" + ("0" + (this.state.enddate.getMonth() + 1)).slice(-2) + "-" + ("0" + this.state.enddate.getDate()).slice(-2);
          //console.log(this.state.hostname[index], this.state.service[index], this.state.metric[index], startDateFormatted,  endDateFormatted);
          var url = '/api/dashboard/metricstatus';
          axios.post(url, {
              'hostname': this.state.hostname[index],
              'service': this.state.service[index],
              'metric': this.state.metric[index],
              'startdate': startDateFormatted,
              'enddate': endDateFormatted
          }).then(response => {
              let statusResp = response.data;
              this.setState({
                  statusData: this.state.statusData.concat([response.data])
              });
              this.setColorAndLatestUpdate(statusResp, index);
              //console.log(this.state.statusData);
          }).catch(e => {
              console.log(e);
          })
      }
  }

    setColorAndLatestUpdate(statusResp){

        //console.log(statusResp[0].Time);
        //console.log(statusResp[0].status);

        let s = "success";
        let w = "warning";
        let d = "danger";

        if(parseInt(statusResp[0].status) === 0) {
            this.setState({
                statusColors: this.state.statusColors.concat(s)
            });
        }else if(parseInt(statusResp[0].status) === 1) {
            this.setState({
                statusColors: this.state.statusColors.concat(w)
            });
        }else if(parseInt(statusResp[0].status) === 2) {
            this.setState({
                statusColors: this.state.statusColors.concat(d)
            });
        }
        this.setState({
            lastUpdates: this.state.lastUpdates.concat(statusResp[0].Time)
        });

    }

  render(){
    const { classes } = this.props;

    return (

        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card chart>
                <CardHeader color={this.state.statusColors[0]}>
                  <AreaChartSmall
                      label="A" data={this.state.data[0]} groupby= {this.state.groupby[0]}  metric={this.state.metric[0]} hostname={this.state.hostname[0]} service={this.state.service[0]}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>{this.state.service[0]}</h4>
                  <p className={classes.cardCategory}></p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime /> Last update: {this.state.lastUpdates[0]}
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card chart>
                <CardHeader color={this.state.statusColors[1]}>
                  <AreaChartSmall
                      label="B"  data={this.state.data[1]} groupby= {this.state.groupby[1]}  metric={this.state.metric[1]} hostname={this.state.hostname[1]} service={this.state.service[1]}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>{this.state.service[1]}</h4>
                  <p className={classes.cardCategory}></p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime /> Last update: {this.state.lastUpdates[1]}
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card chart>
                <CardHeader color={this.state.statusColors[2]}>
                  <AreaChartSmall
                      label="C" data={this.state.data[2]} groupby= {this.state.groupby[2]}  metric={this.state.metric[2]} hostname={this.state.hostname[2]} service={this.state.service[2]}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>{this.state.service[2]}</h4>
                  <p className={classes.cardCategory}></p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime /> Last update: {this.state.lastUpdates[2]}
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <CustomTabs
                  title="Tasks:"
                  headerColor="primary"
                  tabs={[
                    {
                      tabName: "Bugs",
                      tabIcon: BugReport,
                      tabContent: (
                          <Tasks
                              checkedIndexes={[0, 3]}
                              tasksIndexes={[0, 1, 2, 3]}
                              tasks={bugs}
                          />
                      )
                    },
                    {
                      tabName: "Website",
                      tabIcon: Code,
                      tabContent: (
                          <Tasks
                              checkedIndexes={[0]}
                              tasksIndexes={[0, 1]}
                              tasks={website}
                          />
                      )
                    },
                    {
                      tabName: "Server",
                      tabIcon: Cloud,
                      tabContent: (
                          <Tasks
                              checkedIndexes={[1]}
                              tasksIndexes={[0, 1, 2]}
                              tasks={server}
                          />
                      )
                    }
                  ]}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader color="warning">
                  <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                  <p className={classes.cardCategoryWhite}>
                    New employees on 15th September, 2016
                  </p>
                </CardHeader>
                <CardBody>
                  <Table
                      tableHeaderColor="warning"
                      tableHead={["ID", "Name", "Salary", "Country"]}
                      tableData={[
                        ["1", "Dakota Rice", "$36,738", "Niger"],
                        ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                        ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                        ["4", "Philip Chaney", "$38,735", "Korea, South"]
                      ]}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
    );
  }
}

export default withStyles(styles) (Monitoreo);

/*<p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                    increase in today sales.
                  </p>*/