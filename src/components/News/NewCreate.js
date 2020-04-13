import React from 'react';
import axios from 'axios';
import { authContext } from '../../adalConfig';


// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";

// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js"


const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    inputFile: {
        marginTop:"20px"
    }
};

class NewCreate extends React.Component{
    constructor(props) {
        super(props);

        this.handleFile = this.handleFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: "",
            subtitle: "",
            description: "",
            img: "",
        };

    }

    handleTitle = (event) => {
        this.setState({
            title: event.target.value
        });
    }

    handleSubtitle = (event) => {
        this.setState({
            subtitle: event.target.value
        });
    }

    handleDescription = (event) => {
        this.setState({
            description: event.target.value
        });
    }

    handleFile = (event, img) => {
        this.setState({
            img: event.target.files[0]
        });
    }


    onSubmit(e){
        //e.preventDefault();
        console.log(this.state.title);
        console.log(this.state.subtitle);
        console.log(this.state.description);
        console.log(this.state.img);

        let user = authContext.getCachedUser();
        let author = user.profile.name;
        let url = '/api/news/add';

        const formData = new FormData();
        formData.set('title', this.state.title);
        formData.set('subtitle', this.state.subtitle);
        formData.set('body', this.state.description);
        formData.set('author', author);
        formData.append('img', this.state.img);

        axios.post(url, formData, {}).then(response => {
            console.log(response);
        }).catch(e => {
            console.log(e);
        })

    }

    render(){
        const { classes } = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <form onSubmit={this.onSubmit}>
                                <CardHeader color="primary">
                                    <h4 className={classes.cardTitleWhite}>Create News</h4>
                                    <p className={classes.cardCategoryWhite}>Complete news data</p>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={10}>
                                            <CustomInput
                                                labelText="Title"
                                                id="title"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    required: true
                                                }}
                                                inputProps={{
                                                    onChange:this.handleTitle
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={10}>
                                            <CustomInput
                                                labelText="Subtitle"
                                                id="subtitle"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    required: true
                                                }}
                                                inputProps={{
                                                    onChange: this.handleSubtitle
                                                }}

                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="Description"
                                                id="description"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    required: true
                                                }}
                                                inputProps={{
                                                    multiline: true,
                                                    rows: 5,
                                                    onChange: this.handleDescription
                                                }}


                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <input
                                                required={true}
                                                type="file"
                                                className={classes.inputFile}
                                                onChange={this.handleFile}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                                <CardFooter>
                                    <Button  color="primary" type={"submit"}>Upload New</Button >
                                </CardFooter>
                            </form>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
            );
        }
}
export default withStyles(styles) (NewCreate);