import React from "react";

import {Form, Row, Col, Input, Button, Card, notification} from "antd"

const FormItem = Form.Item;

class CommonComments extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: ""
        }
    }

    componentDidMount() {
        const myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({comments: json});
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        const myFetchOptions = {
            method: "GET"
        };
        let formdata = this.props.form.getFieldsValue();
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formdata.remark, myFetchOptions).then(response => response.json()).then(json => this.componentDidMount())

    };

    addUserCollection() {
        const myFetchOptions = {
            method: "GET"
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
            //    收藏成功提醒
            notification["success"]({
                message: "React News提醒", description: "收藏文章成功"
            });
        })
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        const {comments} = this.state;
        const commentList = comments.length
            ? comments.map((comment, index) =>
                <Card key={index} title={comment.UserName} extra={<a href="#">发布于 {comment.datetime}</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            )
            : "目前没有评论";
        return (
            <div className="comment">
                <Row>
                    <Col span={24}>
                        {commentList}
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label="您的评论">
                                {getFieldDecorator("remark")(<Input type="textarea" placeholder="随便写"/>)}

                            </FormItem>
                            <Button type="primary" htmlType="submit">提交评论</Button>&nbsp;&nbsp;
                            <Button type="primary" htmlType="button"
                                    onClick={this.addUserCollection.bind(this)}>收藏文章</Button>
                        </Form>
                    </Col>
                </Row>
            </div>

        )
    }

}

export default CommonComments = Form.create()(CommonComments)