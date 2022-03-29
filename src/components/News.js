import React, { Component } from 'react'
import NewItem from './NewItem'
import Spinner from './Spinner';

export class News extends Component {
    baseURL = "https://newsapi.org/v2";
    apiKey = "2bcaf1bdee034e1fa26a92f41e982ff9";

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        this.setState({
            loading: true,
        })
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

    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center'>News- Headlines</h2>
                {this.state.loading && <Spinner />}
                {!this.state.loading && <div className="row">
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
                </div>}
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.prevbtnDisable} className="btn btn-dark" onClick={this.handlePrevClick}>Prev</button>
                    <button disabled={this.state.nextbtnDisable} className="btn btn-dark" onClick={this.handleNextClick}>Next</button>
                </div>
            </div>
        )
    }
}

export default News
