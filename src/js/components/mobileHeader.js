import React from "react";

import {
    Row, Col,
    Menu, Icon,
    Modal, Tabs, message, Form, Input, Button, Checkbox
} from 'antd';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

import {BrowserRouter, Route, Link, browserHistory} from "react-router-dom";

class MobileHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: "top",
            modalVisible: false,
            action: "login",
            hasLogined: false,
            userNickName: "",
            userid: 0
        }
    }

    setModalVisible(bool) {
        this.setState({
            modalVisible: bool,
        })
    }

    handleClick(e) {
        if (e.key == "register") {
            this.setState({
                current: "register",
            });
            this.setModalVisible(true)
        } else {
            this.setState({
                current: e.key,
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        //fetch
        var myFetchOptions = {
            method: "GET"
        };
        var formData = this.props.form.getFieldsValue();
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + formData.username + "&password=" + formData.password + "&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({
                userNickName: json.NickUserName,
                userid: json.UserId
            })
        });
        if (this.state.action == "login") {
            this.setState({
                hasLogined: true
            })
        }
        message.success("请求成功");
        this.setModalVisible(false);
    }
    login() {
        this.setState({
            modalVisible: true,
        })
    }

    callback(key) {
        if (key == 1) {
            this.setState({
                action: "login"
            })
        }
        else if (key == 2) {
            this.setState({
                action: "register"
            })
        }
    }

    render() {
        let {getFieldProps} = this.props.form;
        const userShow = this.state.hasLogined
            ?
            <Link to={`/usercenter`}>
                <Icon type="inbox"/>
            </Link>
            :
            <Icon type="setting" onClick={this.login.bind(this)}/>;

        return (
            <div id="mobileheader">
                <header>
                    <img src="./src/images/news.png" alt=""/>
                    <span>ReactNews</span>
                    {userShow}
                </header>
                <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
                       onCancel={() => this.setModalVisible(false)} footer={null}>
                    <Tabs defaultActiveKey="1" type="card" onChange={this.callback.bind(this)}>
                        <TabPane tab="登录" key="1">
                            <Form onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label="账号">
                                    <Input placeholder="请输入您的账号" {...getFieldProps("username")}/>
                                </FormItem>
                                <FormItem label="密码">
                                    <Input type="password" placeholder="请输入您的密码" {...getFieldProps("password")}/>
                                </FormItem>
                                <Button type="primary" htmlType="submit">登录</Button>
                            </Form>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label="账号">
                                    <Input placeholder="请输入您的账号" {...getFieldProps("r_username")}/>
                                </FormItem>
                                <FormItem label="密码">
                                    <Input type="password" placeholder="请输入您的密码" {...getFieldProps("r_password")}/>
                                </FormItem>
                                <FormItem label="确认密码">
                                    <Input type="password"
                                           placeholder="请再次输入密码" {...getFieldProps("r_confirmPassword")}/>
                                </FormItem>
                                <Button type="primary" htmlType="submit">注册</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        )
    }
}

export default MobileHeader = Form.create()(MobileHeader);