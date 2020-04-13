import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button";
import PostAddIcon from '@material-ui/icons/Add';
import NewsWrapper from "../../components/News/NewsWrapper.js";
import NewCreate from "../../components/News/NewCreate.js";

class Noticias extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            create: false,
        };
    }

    changeContext(){
        this.setState({create: true});
    }

    render(){
        return(

            <div>

                {this.state.create ? <NewCreate/> : <div><GridContainer direction="column"
                                                           alignItems="center"
                                                           justify="center" >
                    <GridItem xs={12} sm={12} md={4}/>
                    <GridItem xs={12} sm={12} md={4}>
                        <Button color="success"  startIcon={<PostAddIcon />} onClick={()=>this.changeContext()}>
                            Add New
                        </Button>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}/>
                </GridContainer>
                    <NewsWrapper/></div>}

            </div>
        )
    }

}
export default withStyles(styles) (Noticias);