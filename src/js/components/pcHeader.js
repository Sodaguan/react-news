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

import {Link} from "react-router-dom";

class PCHeader extends React.Component {
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

    componentWillMount() {
        if (localStorage.userid) {
            this.setState({
                hasLogined: true,
                userNickName: localStorage.userNickName,
                userid: localStorage.userid
            })
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
        let myFetchOptions = {
            method: "GET"
        };
        const formData = this.props.form.getFieldsValue();
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + formData.username + "&password=" + formData.password + "&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({
                userNickName: json.NickUserName,
                userid: json.UserId
            });
            localStorage.userNickName = json.NickUserName;
            localStorage.userid = json.UserId;
        });
        if (this.state.action == "login") {
            this.setState({
                hasLogined: true
            })
        }
        message.success("请求成功");
        this.setModalVisible(false);
    };

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

    logout() {
        localStorage.userid = "";
        localStorage.userNickName = "";
        this.setState({
            hasLogined: false
        })
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        const userShow = this.state.hasLogined
            ?
            <Menu.Item key="logout" class="register">
                <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
                &nbsp;&nbsp;
                <Link to="/usercenter" target="_black">
                    <Button type="255dashed" htmlType="button">个人中心</Button>
                </Link>
                &nbsp;&nbsp;
                <Button htmlType="button" type="ghost" onClick={this.logout.bind(this)}>退出</Button>
            </Menu.Item>
            :
            <Menu.Item key="register" class="register">
                <Icon type="appstore"/>登录/注册
            </Menu.Item>;

        return (

            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href="#" className="logo">
                            <img src="./src/images/news.png" alt=""/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu mode="horizontal" selectedKeys={this.state.current} onClick={this.handleClick.bind(this)}>
                            <Menu.Item key="top">
                                <Icon type="appstore"/>头条
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <Icon type="appstore"/>社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Icon type="appstore"/>国内
                            </Menu.Item>
                            <Menu.Item key="guoji">
                                <Icon type="appstore"/>国际
                            </Menu.Item>
                            <Menu.Item key="yule">
                                <Icon type="appstore"/>娱乐
                            </Menu.Item>
                            <Menu.Item key="tiyu">
                                <Icon type="appstore"/>体育
                            </Menu.Item>
                            <Menu.Item key="keji">
                                <Icon type="appstore"/>科技
                            </Menu.Item>
                            <Menu.Item key="shishang">
                                <Icon type="appstore"/>时尚
                            </Menu.Item>
                            {userShow}
                        </Menu>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
                       onCancel={() => this.setModalVisible(false)} footer={null}>
                    <Tabs defaultActiveKey="1" type="card" onChange={this.callback.bind(this)}>
                        <TabPane tab="登录" key="1">
                            <Form onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label="账号">
                                    {getFieldDecorator("username")(<Input placeholder="请输入您的账号"/>)}
                                </FormItem>
                                <FormItem label="密码">
                                    {getFieldDecorator("password")(<Input type="password" placeholder="请输入您的密码"/>)}

                                </FormItem>
                                <Button type="primary" htmlType="submit">登录</Button>
                            </Form>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label="账号">
                                    {getFieldDecorator("r_username")(<Input placeholder="请输入您的账号"/>)}

                                </FormItem>
                                <FormItem label="密码">
                                    {getFieldDecorator("r_password")(<Input type="password" placeholder="请输入您的密码"/>)}

                                </FormItem>
                                <FormItem label="确认密码">
                                    {getFieldDecorator("r_confirmPassword")(<Input type="password"
                                                                                   placeholder="请再次输入密码"/>)}

                                </FormItem>
                                <Button type="primary" htmlType="submit">注册</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </header>
        )
    }
}

export default PCHeader = Form.create()(PCHeader);