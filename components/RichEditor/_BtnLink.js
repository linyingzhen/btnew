/**
 * const prefixCls = 'style-132743';
 * const images = '/static/images/components/RichEditor';
 * @Author: czy0729
 * @Date: 2018-07-11 23:11:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-05 17:43:13
 * @Path m.benting.com.cn /components/RichEditor/_BtnLink.js
 */
import React from 'react';
import classNames from 'classnames';
import { Modal } from 'antd-mobile';
import BtnControl from './_BtnControl';

const prefixCls = 'style-132743';

export default class _BtnLink extends React.Component {
  state = {
    visible: false,
    link: '',
    tag: ''
  };

  onChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  toggleModal = () => {
    const { visible } = this.state;

    this.setState({
      visible: !visible
    });
  };

  doAdd = () => {
    const { onAdd } = this.props;
    let { link, tag } = this.state;

    if (link.indexOf('://') === -1) link = `http://${link}`;
    if (!tag) tag = link;

    onAdd('link', { link, tag }, tag);

    this.setState({
      link: '',
      tag: ''
    });
    this.toggleModal();
  };

  render() {
    const { className } = this.props;
    const { visible, link, tag } = this.state;

    return (
      <div className={classNames(prefixCls, className)}>
        <BtnControl
          label="link"
          onClick={this.toggleModal}
        />
        <Modal
          classNames={`${prefixCls}__modal`}
          title="插入链接"
          transparent
          maskClosable={false}
          visible={visible}
          footer={[
            {
              text: '取消',
              onPress: this.toggleModal
            },
            {
              text: '确定',
              onPress: this.doAdd
            }
          ]}
        >
          <div className="am-modal-input-container">
            <div className="am-modal-input">
              <label htmlFor="link">
                <input
                  name="link"
                  placeholder="链接地址"
                  value={link}
                  onChange={this.onChange}
                />
              </label>
            </div>
            <div className="am-modal-input">
              <label htmlFor="tag">
                <input
                  className="mt-sm"
                  name="tag"
                  placeholder="链接名字 (选填)"
                  value={tag}
                  onChange={this.onChange}
                />
              </label>
            </div>
          </div>
        </Modal>

        <style jsx global>{`
          .style-132743 {
            width: 0.6rem;
            height: 0.6rem;
          }
        `}</style>
      </div>
    );
  }
}
