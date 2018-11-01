/**
 * const prefixCls = 'style-161156';
 * const images = '/static/images/components/RichEditor';
 * @Author: czy0729
 * @Date: 2018-07-11 23:15:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-07-11 23:17:30
 * @Path m.benting.com.cn /components/RichEditor/_BtnLinkImage.js
 */
import React from 'react';
import classNames from 'classnames';
import { Modal } from 'antd-mobile';
import BtnControl from './_BtnControl';
import { images } from './ds';

const prefixCls = 'style-161156';

export default class _BtnLinkImage extends React.Component {
  state = {
    visible: false,
    src: ''
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
    const { src } = this.state;

    onAdd('link-image', { src });

    this.setState({
      src: ''
    });
    this.toggleModal();
  };

  render() {
    const { className } = this.props;
    const { visible, src } = this.state;

    return (
      <div className={classNames(prefixCls, className)}>
        <BtnControl
          label={<img src={`${images}/link_pic.png`} alt="" />}
          onClick={this.toggleModal}
        />
        <Modal
          classNames={`${prefixCls}__modal`}
          title="插入网络图片"
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
              <label htmlFor="src">
                <input
                  name="src"
                  placeholder="图片链接地址"
                  value={src}
                  onChange={this.onChange}
                />
              </label>
            </div>
          </div>
        </Modal>

        <style jsx global>{`
          .style-161156 {
            width: 0.6rem;
            height: 0.6rem;
          }
        `}</style>
      </div>
    );
  }
}
