import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {Button} from 'antd';
import 'antd/dist/antd.css';

import PCIndex from "./components/pcIndex"

import MediaQuery from "react-responsive";

import MobileIndex from "./components/mobileIndex"

import PCNewsDetails from "./components/pcNewsDetails"

import MobileNewsDetails from "./components/mobileNewsDetails"

import PCUserCenter from "./components/pcUserCenter"
import MobileUserCenter from "./components/mobileUserCenter"

export default class Root extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery query="(min-device-width:1224px)">
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={PCIndex}/>
                            <Route exact path="/details/:uniquekey" component={PCNewsDetails}/>
                            <Route path="/usercenter" component={PCUserCenter}/>
                        </Switch>
                    </BrowserRouter>
                </MediaQuery>
                <MediaQuery query="(max-device-width:1224px)">
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={MobileIndex}/>
                            <Route path="/details/:uniquekey" component={MobileNewsDetails}/>
                            <Route path="/usercenter" component={MobileUserCenter}/>
                        </Switch>
                    </BrowserRouter>
                </MediaQuery>
            </div>
        )
    }
}

ReactDOM.render(<Root/>, document.querySelector("#mainContainer"));