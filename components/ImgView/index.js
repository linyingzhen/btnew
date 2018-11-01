/**
 * const prefixCls = 'style-118695';
 * const images = '/static/images/components/ImgView';
 * @Version 1.1 180715 退出在要显示中才执行onClose
 * @Author: czy0729
 * @Date: 2018-07-04 18:45:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-26 11:56:22
 * @Path m.benting.com.cn /components/ImgView/index.js
 */
import React from 'react';
import classNames from 'classnames';
import Styles from '@styles';
import ImageView from '../_/react-imageview';

const prefixCls = 'c-img-view';

export default class ImgView extends React.Component {
  state = {
    close: false, // 关闭有渐出动画，是否关闭中
    data: this.props.data || [],
    originKeys: {},
    current: this.props.current || 0
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      current: nextProps.current
    });
  }

  componentWillUnmount() {
    const { show } = this.state;

    if (show) {
      this.onUnmount();
    }
  }

  // 卸载关闭不能有动画
  onUnmount = () => {
    const { onClose = Function.prototype } = this.props;

    this.setState({
      close: false
    });
    onClose();
  };

  // 正常页面关闭有动画
  onClose = () => {
    const { onClose = Function.prototype } = this.props;

    this.setState({
      close: true
    });

    setTimeout(() => {
      this.setState({
        close: false
      });
      onClose();
    }, 700);
  };

  // 查看原图
  doViewOrigin = () => {
    const { data, originKeys, current } = this.state;

    const _data = [...data];
    const _originKeys = { ...originKeys };

    if (_data[current].indexOf('.com/file/getimg/') !== -1) {
      _data[current] = _data[current].replace('/scale', '');
      _originKeys[current] = true;
    }

    if (_data[current].indexOf('.com/static/uploads/') !== -1) {
      _data[current] = _data[current].replace('_scale.', '.');
      _originKeys[current] = true;
    }

    this.setState({
      data: _data,
      originKeys: _originKeys,
      current
    });
  };

  render() {
    const { show, theme = 'dark', hideOrigin, className } = this.props;
    const { close, current, data, originKeys } = this.state;

    if (!show) {
      return null;
    }

    const showOriginBtn = !hideOrigin && !originKeys[current];

    return (
      <div
        className={classNames(prefixCls, className, theme, {
          closing: close
        })}
      >
        <ImageView
          imagelist={data}
          current={current}
          close={this.onClose}
          maxScale={4}
          gap={0}
          disableRotate
          onChange={current => this.setState({ current })}
        />
        {showOriginBtn && (
          <span className="btn-origin" onClick={this.doViewOrigin}>
            查看原图
          </span>
        )}

        <style jsx global>{`
          .c-img-view {
            position: fixed;
            z-index: ${Styles.z_img_view};
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
          /* react-imageview rewrite */
          .${prefixCls} .hide {
            opacity: 0;
            transition: opacity 0.2s;
          }
          .${prefixCls} .imageview {
            position: fixed;
            z-index: ${Styles.z_img_view};
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #000;
            overflow: hidden;
            animation: easeshow 0.25s;
          }
          .${prefixCls}.light .imageview {
            background-color: #fff;
          }
          @keyframes easeshow {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .${prefixCls} .imagelist {
            display: -webkit-box;
            height: 100%;
          }
          .${prefixCls} .imagelist .imagelist-item {
            display: -webkit-box;
            width: 100%;
            text-align: center;
            position: relative;
            background-color: #000;
            margin-right: 0;
          }
          .${prefixCls}.light .imagelist .imagelist-item {
            background-color: #fff;
          }
          .${prefixCls} .imagelist .imagelist-item .imagelist-item-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            max-width: 100%;
            max-height: 100%;
          }
          .${prefixCls} .page {
            position: fixed;
            bottom: ${Styles.space};
            left: 50%;
            padding: ${Styles.xs} ${Styles.sm};
            font-size: 0.28rem;
            color: rgba(255, 255, 255, 0.8);
            background-color: rgba(0, 0, 0, 0.48);
            border-radius: ${Styles.radius_sm};
            transform: translateX(-50%);
          }
          .${prefixCls}.light .page {
            color: ${Styles.color_desc};
            background-color: #fff;
          }
          .${prefixCls} .spinner {
            position: absolute;
            top: 45%;
            left: 50%;
            width: 0.4rem;
            height: 0.4rem;
            transform: translate(-50%, -50%);
          }
          .${prefixCls} .double-bounce1,
          .double-bounce2 {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #333;
            border-radius: 50%;
            opacity: 0.64;
            animation: sk-bounce 2s infinite ease-in-out;
          }
          .${prefixCls} .double-bounce2 {
            animation-delay: -1s;
          }
          @keyframes sk-bounce {
            0%,
            100% {
              transform: scale(0);
            }
            50% {
              transform: scale(1);
            }
          }
        `}</style>
        <style jsx>{`
          .c-img-view {
          }
          .closing {
            opacity: 0;
            transition: opacity 0.6s ease;
          }
          .btn-origin {
            position: absolute;
            z-index: ${Styles.z_img_view + 1};
            bottom: ${Styles.space};
            right: 0.2rem;
            padding: 0.08rem 0.16rem;
            font-size: 0.28rem;
            color: rgba(255, 255, 255, 0.8);
            background-color: rgba(0, 0, 0, 0.48);
            border-radius: ${Styles.radius_sm};
          }
        `}</style>
      </div>
    );
  }
}
