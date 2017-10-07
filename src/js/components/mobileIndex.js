import React from "react";

import MobileHeader from "./mobileHeader"
import MobileFooter from "./mobileFooter"

import {Tabs, Carousel} from 'antd';

const TabPane = Tabs.TabPane;

import MobileList from "./mobileList"
import {BackTop} from 'antd';

import MobilePullToRefresh from "./mobileListPullRefresh"

export default class MobileIndex extends React.Component {
    render() {
        return (
            <div>
                <MobileHeader/>

                <Tabs defaultActiveKey="1">
                    <TabPane tab="头条" key="1">
                        <Carousel autoplay>
                            <div><img src="./src/images/carousel_1.jpg" alt=""/></div>
                            <div><img src="./src/images/carousel_2.jpg" alt=""/></div>
                            <div><img src="./src/images/carousel_3.jpg" alt=""/></div>
                            <div><img src="./src/images/carousel_4.jpg" alt=""/></div>
                        </Carousel>
                        <MobileList count={20} type="top" width="100%"/></TabPane>
                    <TabPane tab="社会" key="2"><MobileList count={20} type="shehui" width="100%"/></TabPane>
                    <TabPane tab="国内" key="3"><MobilePullToRefresh count={20} type="guonei" width="100%"/></TabPane>
                    <TabPane tab="国际" key="4"><MobileList count={20} type="guoji" width="100%"/></TabPane>
                    <TabPane tab="娱乐" key="5"><MobileList count={20} type="yule" width="100%"/></TabPane>
                    <TabPane tab="体育" key="6"><MobileList count={20} type="tiyu" width="100%"/></TabPane>
                    <TabPane tab="科技" key="7"><MobileList count={20} type="keji" width="100%"/></TabPane>
                    <TabPane tab="时尚" key="8"><MobileList count={20} type="shishang" width="100%"/></TabPane>
                </Tabs>
                <MobileFooter/>
                <div>
                    <BackTop/>
                    <strong style={{color: 'rgba(64, 64, 64, 0.6)'}}> gray </strong>
                </div>
            </div>
        )
    }
}