import React from "react";

import {Col, Icon, Modal, Row, Tabs, Upload, Card} from "antd"
import PCHeader from "./pcHeader"
import PCFooter from "./pcFooter"

const TabPane = Tabs.TabPane;

export default class PCUserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            usercollection: "",
            previewVisible: false,
            previewImage: "",
            usercomments: ""

        }
    }

    handleCancel(bool) {

        this.setState({
            previewVisible: bool,
        });
    };

    componentDidMount() {
        const myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({usercollection: json});
        });

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({usercomments: json});
        });
    };


    render() {
        const props = {
            //上传地址
            action: 'http://newsapi.gugujiankong.com/handler.ashx',
            //请求头
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            //上传列表的内建样式
            listType: 'picture-card',
            //默认已上传的文件列表
            defaultFileList: [
                {
                    uid: -1,
                    name: 'xxx.png',
                    state: 'done',
                    url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                    thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
                }
            ],
            //预览时的回调
            onPreview: (file) => {
                this.setState({previewImage: file.url, previewVisible: true});
            }
        };

        const {usercollection} = this.state;
        const usercollectionList = usercollection.length
            ?
            usercollection.map((uc, index) => (
                <Card key={index} title={uc.uniquekey}
                      extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>查看</a>}>
                    <p>{uc.Title}</p>
                </Card>
            ))
            :
            '您还没有收藏任何的新闻，快去收藏一些新闻吧。';

        const {usercomments} = this.state;
        const usercommentsList = usercomments.length
            ?
            usercomments.map((comment, index) => (
                <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`}
                      extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            '您还没有发表任何评论，快去评论一些新闻吧。';

        return (
            <div>
                <PCHeader/>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="我的收藏列表" key="1">
                                <div className="comment">
                                    <Row>
                                        <Col span={24}>
                                            {usercollectionList}
                                        </Col>
                                    </Row>
                                </div>

                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                <div className="comment">
                                    <Row>
                                        <Col span={24}>
                                            {usercommentsList}
                                        </Col>
                                    </Row>
                                </div>

                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div className="clearfix">
                                    <Upload {...props}>

                                        <Icon type="upload"/>
                                        <div className="ant-upload-text">上传照片</div>
                                    </Upload>
                                    <Modal visible={this.state.previewVisible} footer={null}
                                           onCancel={() => this.handleCancel(false)}>
                                        <img src={this.state.previewImage} alt="预览"/>
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>

                <PCFooter/>
            </div>
        )
    }
}