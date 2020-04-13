import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


const styles = theme => ({
    root: {
        marginTop: "3.5rem",
    },
    media: {
        height: 0,
        paddingTop: '40%',
    },

});


class NewsDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            img: this.props.img,
            subtitle: this.props.subtitle,
            author: this.props.author,
            date: this.props.date,
            id: this.props.match.params.id,
            body:this.props.body
        }
    }

    componentDidMount(){
        let url='/api/news/' + this.state.id;
        //console.log(url);

        axios.get(url, {})
            .then(response => {
                //console.log(response.data);
                this.setState({
                            title: response.data.title,
                            subtitle: response.data.subtitle,
                            author: response.data.author,
                            date: response.data.date,
                            img: response.data.img,
                            body: response.data.body
                });
            })
            .catch(e => {
                console.log(e);
            })

    }


    render(){
        const { classes } = this.props;

        return(


            <div>

                {this.state.img == null ? <div/> : <Card >
                                        <CardMedia
                                            className={classes.media}
                                            image={this.state.img}
                                        />
                                        <CardContent>
                                            <Typography variant="h3" >
                                                {this.state.title}
                                            </Typography>
                                            <Typography gutterBottom variant="h5" color="textSecondary" >
                                                {this.state.subtitle}
                                            </Typography>
                                            <Typography gutterBottom color="textSecondary" >
                                                {this.state.author} - {(this.state.date).substr(0,10)} at {(this.state.date).substr(11,11)}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                {this.state.body}
                                            </Typography>
                                        </CardContent>
                                </Card>
                }
        </div>);
    }

}

export default withStyles(styles) (NewsDetail);