import React from "react";

import PCHeader from "./pcHeader"
import PCFooter from "./pcFooter"

import PCNewsContainer from "./pcNewscontainer"

import { BackTop } from 'antd';




export default class PCIndex extends React.Component {
    render() {
        return (
            <div>
                <PCHeader/>
                <PCNewsContainer/>
                <PCFooter/>
                {/*返回顶部*/}
                <div>
                    <BackTop />
                    <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}></strong>
                </div>
            </div>
        )
    }
}