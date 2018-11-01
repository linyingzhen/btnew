/**
 * const prefixCls = 'style-168506';
 * const images = '/static/images/components/FixedTextarea';
 * @Author: czy0729
 * @Date: 2018-07-05 16:57:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 17:10:25
 * @Path m.benting.com.cn /components/FixedTextarea/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@components';
import Const from '@const';
import Styles from '@styles';
import Utils from '@utils';
import G from '@stores/g';
import Animate from '../Animate';
import Button from '../Button';
import EmojiPicker from '../EmojiPicker';
import Icon from '../Icon';
import Img from '../Img';
import Textarea from '../Textarea';
import Upload from '../Upload';

const prefixCls = 'c-fixed-textarea';
const localStorageKey = `${Const.__LS_PREFIX__}${prefixCls}`;
const defaultState = {
  showTextarea: false,
  showEmojiPicker: false,
  focus: false,
  value: '',
  fileId: ''
};
const styleImgSize = 1.6; // 图片大小

export default class FixedTextarea extends React.Component {
  static propsTypes = {
    count: PropTypes.number,
    placeholder: PropTypes.string,
    show: PropTypes.bool,
    showEmoji: PropTypes.bool,
    showUploadPicButton: PropTypes.bool,
    showCoin: PropTypes.bool,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func
  };

  iosScrollTop = 0;

  static defaultProps = {
    count: 200,
    placeholder: '评论：',
    show: false,
    showEmoji: true,
    showUploadPicButton: false,
    showCoin: false,
    onSubmit: Function.prototype,
    onClose: Function.prototype
  };

  state = {
    ...defaultState,
    value: this.props.value || ''
  };

  componentDidMount() {
    const { showCoin } = this.props;

    if (showCoin) {
      G.fetchWalletInfo();
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('show' in nextProps) {
      if (!nextProps.show) {
        // 解决IOS fixed问题
        document.body.scrollTop = this.iosScrollTop;
        this.setState(defaultState);
      } else {
        this.setState({ showTextarea: true }, () => this.focus());
      }
    }
  }

  // textarea onFocus
  onFocus = () =>
    this.setState({
      showEmojiPicker: false,
      focus: false
    });

  // textarea onBlur
  onBlur = () => this.setState({ focus: false });

  // textarea onChange
  onChange = value => {
    const { count } = this.props;

    if (value.length > count) {
      Utils.light('不能再输入了');
      return;
    }

    this.setState({ value });
  };

  // emoji onClick
  onPick = emoji => {
    const { count } = this.props;
    const { value } = this.state;

    const newValue = `${value}${emoji}`;
    if (newValue.length > count) {
      Utils.light('不能再输入了');
      return;
    }

    this.setState({
      value: newValue
    });
  };

  // textarea onSubmit
  onSubmit = () => {
    const { showUploadPicButton, onSubmit } = this.props;
    const { value, fileId } = this.state;

    if (showUploadPicButton) {
      onSubmit({
        value,
        id: fileId
      });
    } else {
      onSubmit(value);
    }
  };

  // hide fixedTextarea
  onCancel = () => {
    const { onClose } = this.props;

    Utils.hideActionSheet();
    this.setState(defaultState, () => onClose());
  };

  // actionSheet seleted a picture
  onSelectPic = fileId => this.setState({ fileId });

  // when show fixedTextarea
  focus = () => {
    // 解决IOS fixed问题
    this.iosScrollTop = document.body.scrollTop;
    document.getElementById(prefixCls).focus();
  };

  renderMask() {
    return <div className="am-modal-mask" />;
  }

  renderPic() {
    const { fileId } = this.state;
    const localUploadPicDS = Utils.lsGet(localStorageKey, []);
    const DS = [
      {
        icon: <Icon className="t-48" type="plus" />,
        title: '上传图片'
      }
    ];
    localUploadPicDS.forEach((item, index) => {
      DS.push({
        icon: (
          <Img
            src={Utils.getAppImgUrl(item.id)}
            size="1.04rem"
            style={{ borderRadius: '.08rem' }}
          />
        ),
        title: index + 1,
        fileId: item.id
      });
    });

    if (fileId) {
      return (
        <div
          className="img ml-sm"
          style={{
            backgroundImage: `url(${Utils.getAppImgUrl(fileId)})`
          }}
        >
          <Flex className={`${prefixCls}__clear`} justify="center">
            <Icon
              className="t-24 t-void"
              type="cross"
              onClick={e => {
                e.stopPropagation();
                this.setState({ fileId: '' });
              }}
            />
          </Flex>

          <style jsx global>{`
            .c-fixed-textarea-topic {
            }
            .${prefixCls}__clear {
              position: absolute;
              top: 0.08rem;
              right: 0.08rem;
              width: 0.4rem;
              height: 0.4rem;
              background: rgba(0, 0, 0, 0.64);
              border-radius: 50%;
              opacity: 0.64;
            }
          `}</style>
          <style jsx>{`
            .c-fixed-textarea {
            }
            .img {
              display: inline-block;
              position: relative;
              width: ${styleImgSize}rem;
              height: ${styleImgSize}rem;
              ${Styles._bg};
              background-color: #fff;
              border: 0.01rem solid #fff;
              border-radius: ${Styles.radius_xs};
            }
          `}</style>
        </div>
      );
    }

    return (
      <Icon
        className="t-48 l-56 t-sub ml-sm"
        type="pic"
        onClick={() => {
          this.setState({ showEmojiPicker: false });
          Utils.hideActionSheet();
          Utils.shareActionSheet(
            DS,
            index => {
              if (index === 0) {
                return new Promise((resolve, reject) => {
                  document
                    .querySelector(`.${prefixCls}__upload-image > input`)
                    .click();

                  reject(new Error('waiting for upload finish.'));
                });
              }

              if (index < 11) {
                if (index === -1 || index === DS.length) {
                  return false;
                }

                this.onSelectPic(DS[index].fileId);
                return true;
              }

              return true;
            },
            {
              message: '选择图片',
              destructiveButtonIndex: undefined
            }
          );
        }}
      />
    );
  }

  renderTextarea() {
    const {
      count,
      placeholder,
      showEmoji,
      showUploadPicButton,
      showCoin
    } = this.props;
    const { showEmojiPicker, focus, value } = this.state;

    return (
      <div className={prefixCls}>
        <div className="wrap-textarea">
          <Textarea
            id={prefixCls}
            name={prefixCls}
            value={this.props.value || value}
            placeholder={placeholder}
            count={count}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </div>
        <Flex className={`${prefixCls}__bar`} align="start">
          <Flex.Item>
            <Flex align="start">
              {showEmoji &&
                (showEmojiPicker && !focus ? (
                  <Icon
                    className="t-48 l-56 t-primary"
                    type="emoji"
                    onClick={() =>
                      this.setState({
                        showEmojiPicker: !showEmojiPicker
                      })
                    }
                  />
                ) : (
                  <Icon
                    className="t-48 l-56 t-sub"
                    type="emoji"
                    onClick={() => {
                      Utils.hideActionSheet();
                      this.setState({
                        showEmojiPicker: !showEmojiPicker
                      });
                    }}
                  />
                ))}
              {showUploadPicButton && this.renderPic()}
              {showCoin && this.renderCoin()}
            </Flex>
          </Flex.Item>
          <span className="t-28 l-56 t-sub" onClick={this.onCancel}>
            取消
          </span>
          <Button
            className="ml-32"
            type="primary"
            inline
            size="sm"
            disabled={!(this.props.value || value)}
            onClick={this.onSubmit}
          >
            回复
          </Button>
        </Flex>

        <style jsx global>{`
          .c-fixed-textarea {
          }
          .${prefixCls}__bar {
            padding: 0.16rem 0.24rem;
            background: ${Styles.color_bg};
          }
          .{prefixCls} textarea {
            position: static !important;
          }
        `}</style>
        <style jsx>{`
          .c-fixed-textarea {
            position: fixed;
            z-index: ${Styles.z_fixed_textarea};
            top: 0;
            right: 0;
            left: 0;
            background: ${Styles.color_theme};
          }
          .wrap-textarea {
            padding: 0.16rem 0.24rem;
          }
        `}</style>
      </div>
    );
  }

  renderEmojiPicker() {
    return (
      <div className="emoji-picker">
        <EmojiPicker onPick={this.onPick} />

        <style jsx>{`
          .c-fixed-textarea {
          }
          .emoji-picker {
            position: fixed;
            z-index: ${Styles.z_fixed_textarea};
            right: 0;
            left: 0;
            bottom: 0;
            width: 100%;
            background: #fff;
            border-top: ${Styles.border};
          }
        `}</style>
      </div>
    );
  }

  renderUpload() {
    return (
      <Upload
        className={`${prefixCls}__upload-image`}
        beforeUpload={() => Utils.loading('上传中...')}
        style={{
          display: 'none'
        }}
        onSuccess={result => {
          const { code, data } = result;

          if (code !== 0) {
            Utils.hideToast();
            Utils.light(`文件上传失败, ${result.err}`);
            return;
          }

          /* ========== 缓存上传图片 start ========== */
          const localUploadPicDS = Utils.lsGet(localStorageKey, []);
          const date = new Date().valueOf();

          localUploadPicDS.unshift({
            id: data.fileId,
            date
          });

          // 保存数不大于10个
          if (localUploadPicDS.length > 10) localUploadPicDS.pop();
          Utils.lsSet(localStorageKey, localUploadPicDS);
          /* ========== 缓存上传图片 end ========== */

          this.setState({
            fileId: data.fileId
          });
          Utils.hideToast();
          Utils.hideActionSheet();
        }}
      />
    );
  }

  renderCoin() {
    const { sysAmount = '0.00' } = G.getState('walletInfo');

    return (
      <Flex style={{ height: '0.6rem' }}>
        <span className="t-24 t-sub ml-xs">金币：</span>
        <span className="t-24 t-primary">{sysAmount}</span>
        <Button
          className="ml-sm"
          type="primary"
          size="sm"
          inline
          onClick={() => Utils.router.push('/person/wallet/coin/exchange')}
        >
          获取
        </Button>
      </Flex>
    );
  }

  render() {
    const { showUploadPicButton } = this.props;
    const { showTextarea, showEmojiPicker, focus } = this.state;
    const isShow = showTextarea || showEmojiPicker; // 组件是否展示中

    return (
      <React.Fragment>
        <Animate type="fade">{isShow && this.renderMask()}</Animate>
        <Animate type="top">{showTextarea && this.renderTextarea()}</Animate>
        <Animate type="bottom">
          {!focus && showEmojiPicker && this.renderEmojiPicker()}
        </Animate>
        {showUploadPicButton && this.renderUpload()}
      </React.Fragment>
    );
  }
}
