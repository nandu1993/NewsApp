import React, { useEffect, useState } from 'react'
import NewItem from './NewItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    let baseURL = "https://newsapi.org/v2";
    let apiKey = props.apiKey;
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    useEffect(() => {
        fetchArticles(page);
    }, [])


    const fetchMoreData = async () => {
        await fetchArticlesScroll(page + 1);
    };

    const fetchArticles = async (page) => {
        let url = baseURL + `/top-headlines?country=${props.country}&apiKey=${apiKey}&category=${props.category}&page=${page}&pageSize=${props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setPage(page)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    }

    //for scroll
    const fetchArticlesScroll = async (page) => {
        let url = baseURL + `/top-headlines?country=${props.country}&apiKey=${apiKey}&category=${props.category}&page=${page}&pageSize=${props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setPage(page)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    }

    return (
        <div style={{marginTop: "70px"}}>
            <h2 className='text-center'>News- Headlines</h2>
            {/* {loading && <Spinner />} */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((article) => {
                            let limitedTitle = article.title ? article.title : "";
                            let limitedDesc = article.description ? article.description : "";
                            limitedTitle = limitedTitle.slice(0, 45) + (limitedTitle.length > 45 ? "..." : "");
                            limitedDesc = limitedDesc.slice(0, 88) + (limitedDesc.length > 88 ? "..." : "");

                            return (
                                <div className="col-md-4 my-2" key={article.url}>
                                    <NewItem title={limitedTitle} description={limitedDesc} imageUrl={article.urlToImage} newUrl={article.url} author={article.author} date={article.publishedAt} source={article.source.name} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default News
