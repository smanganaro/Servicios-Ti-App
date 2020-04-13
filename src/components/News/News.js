import React from 'react';
import MediaCard from "../Card/MediaCard"
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { withStyles } from "@material-ui/core/styles";

import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";

const News = ({news, loading}) => {
    if(loading){
        return <h2>Loading...</h2>;
    }

    return (
        <GridContainer>
        {news.map(snew => (
            <GridItem key={snew._id} xs={12} sm={12} md={4}>
                <MediaCard title={snew.title} subtitle={snew.subtitle} img={snew.img} id={snew._id}/>
            </GridItem>
            ))}
        </GridContainer>
    );
};

export default withStyles(styles) (News);