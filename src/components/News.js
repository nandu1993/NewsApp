import React, { Component } from 'react'
import NewItem from './NewItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    baseURL = "https://newsapi.org/v2";
    apiKey = this.props.apiKey;

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        // this.setState({
        //     loading: true,
        // })
        await this.fetchArticles(this.state.page);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handlePrevClick = async () => {
        // this.setState({
        //     page: this.state.page - 1,
        // })
        let page = this.state.page - 1;
        this.setState({
            loading: true,
        })
        await this.fetchArticles(page);
    }

    handleNextClick = async () => {
        // this.setState({
        //     page: this.state.page + 1,
        // })
        let page = this.state.page + 1;
        this.setState({
            loading: true,
        })
        if (page <= Math.ceil((this.state.totalResults / this.state.pageSize))) {
            await this.fetchArticles(page);
        }
    }

    fetchMoreData = async () => {
            let page = this.state.page + 1;
            await this.fetchArticlesScroll(page);
    };

    fetchArticles = async (page) => {
        let url = this.baseURL + `/top-headlines?country=${this.props.country}&apiKey=${this.apiKey}&category=${this.props.category}&page=${page}&pageSize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            page: page,
            pageSize: this.props.pageSize,
            totalResults: parsedData.totalResults,
            prevbtnDisable: page <= 1 ? true : false,
            loading: false,
            //nextbtnDisable: false
            // nextbtnDisable: Math.ceil((this.state.totalResults / this.state.pageSize)) > page ? false : true,
        })

        this.setState({
            prevbtnDisable: page <= 1 ? true : false,
            nextbtnDisable: Math.ceil((this.state.totalResults / this.state.pageSize)) > page ? false : true,
        })
    }

    //for scroll
    fetchArticlesScroll = async (page) => {
        let url = this.baseURL + `/top-headlines?country=${this.props.country}&apiKey=${this.apiKey}&category=${this.props.category}&page=${page}&pageSize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            page: page,
            pageSize: this.props.pageSize,
            totalResults: parsedData.totalResults,
            prevbtnDisable: page <= 1 ? true : false,
            loading: false
        })
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>News- Headlines</h2>
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults.length}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((article) => {
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

                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.prevbtnDisable} className="btn btn-dark" onClick={this.handlePrevClick}>Prev</button>
                    <button disabled={this.state.nextbtnDisable} className="btn btn-dark" onClick={this.handleNextClick}>Next</button>
                </div> */}
            </div>
        )
    }
}

export default News
