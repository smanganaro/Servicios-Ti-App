import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        marginTop: "3.5rem",
    },
    media: {
        height: 280,
    },

});

class MediaCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            img: this.props.img,
            subtitle: this.props.subtitle,
            //author: this.props.author,
            //date: this.props.date,
            id: this.props.id,
        }
    }

    render(){
        const { classes } = this.props;
        //console.log(this.state.img);
        const link = '/admin/noticias/'+ this.props.id;
        //console.log(link);

        return (
            <div className={classes.root}>
                <Card >
                    <CardActionArea>
                        <Link to={link}>
                        <CardMedia
                            className={classes.media}
                            image={this.state.img}
                        />
                        </Link>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.state.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.state.subtitle}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Link to={link}>
                            <Button  size="small" color="primary">
                                Learn More
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </div>
        );
    }
}
export default withStyles(styles) (MediaCard);