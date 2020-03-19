import React from "react";

import { withStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import News from "../../components/News/News.js";

class Noticias extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        return(
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <News></News>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }

}
export default withStyles(styles) (Noticias);