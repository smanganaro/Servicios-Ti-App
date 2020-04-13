import React, {useState, useEffect} from 'react';
import axios from "axios";
import News from "./News.js"
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
//import { makeStyles } from "@material-ui/core/styles";


//const styles = {};

//const useStyles = makeStyles(styles);


const NewsWrapper = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [newsPerPage] = useState(6);
    //const classes = useStyles();

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            const res = await axios.get('/api/news');
            setNews(res.data);
            setLoading(false);
        }
        fetchNews();
    },[]);

    const indexOfLastNew = currentPage * newsPerPage;
    const indexOfFirstNew = indexOfLastNew - newsPerPage;
    const currentNews = news.slice(indexOfFirstNew,indexOfLastNew);

    const paginate = (event, value) => setCurrentPage(value);


    return(

        <div>
            <News news={currentNews} loading={loading}/>
            <Box mt={10}>
            <GridContainer direction="column"
                           alignItems="center"
                           justify="center" >
                <GridItem xs={12} sm={12} md={4}/>
                <GridItem xs={12} sm={12} md={4}>
                        <Pagination count={Math.ceil(news.length / newsPerPage)}  color="primary" onChange={paginate}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}/>
            </GridContainer>
            </Box>
        </div>
    );

};

export default NewsWrapper;