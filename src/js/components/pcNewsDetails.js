import React from "react";
import {Row, Col} from "antd";

import PCHeader from "./pcHeader"
import PCFooter from "./pcFooter"

import PCNewsImageBlock from "./pcNewsImageBlock";

import CommonComments from "./commonComments"


export default class PCNewsDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            newsItem: ""
        }
    }

    componentDidMount() {

        const myFetchOptions = {
            method: "GET"
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey, myFetchOptions).then(response => response.json()).then(json => this.setState({
            newsItem: json
        }));
        console.log(this.state.newsItem);
        document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
    }


    createMarkup() {
        return {
            __html: this.state.newsItem.pagecontent
        }
    }

    render() {
        return (
            <div>
                <PCHeader/>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} class="container">
                        <div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <CommonComments uniquekey={this.props.match.params.uniquekey}/>
                    </Col>
                    <Col span={6}>
                        <PCNewsImageBlock count={40} type="yule" width="100%" cartTitle="相关新闻" imageWidth="120px"/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PCFooter/>
            </div>
        )
    }
}