import React from "react";

import {
    Row, Col, Carousel, Tabs
} from "antd";

import PCNewsBlock from "./pcNewsBlock";

import PCNewsImageBlock from "./pcNewsImageBlock"

const TabPane = Tabs.TabPane;

import PCProduct from "./pcProduct"


export default class PCNewsContainer extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} class="container">
                        <div class="leftContainer">
                            <div class="carousel">
                                <Carousel autoplay>
                                    <div><img src="./src/images/carousel_1.jpg" alt=""/></div>
                                    <div><img src="./src/images/carousel_2.jpg" alt=""/></div>
                                    <div><img src="./src/images/carousel_3.jpg" alt=""/></div>
                                    <div><img src="./src/images/carousel_4.jpg" alt=""/></div>
                                </Carousel>
                            </div>
                            <PCNewsImageBlock count={6} type="guoji" width="400px" cartTitle="国际头条" imageWidth="112px"/>

                        </div>
                        <Tabs defaultActiveKey="1" class="tabs_news ">
                            <TabPane tab="头条新闻" key="1">
                                <PCNewsBlock count="20" type="top" width="100%" bordered="false"/>
                            </TabPane>
                            <TabPane tab="国际新闻" key="2">
                                <PCNewsBlock count="20" type="guoji" width="100%" bordered="false"/>
                            </TabPane>

                        </Tabs>
                        <Tabs class="tabs_product">
                            <TabPane tab="ReactNews 产品" key="1">
                                <PCProduct/>
                            </TabPane>
                        </Tabs>

                        <PCNewsImageBlock count={8} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="120px"/>
                        <PCNewsImageBlock count={16} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="120px"/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}