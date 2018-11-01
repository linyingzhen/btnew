/**
 * const prefixCls = 'style-615266';
 * const images = '/static/images/components/FixedTextarea';
 * @Author: czy0729
 * @Date: 2018-08-03 12:23:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-23 17:27:08
 * @Path m.benting.com.cn /components/FixedTextarea/topic.js
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

const prefixCls = 'c-fixed-textarea-topic';
const localStorageKey = `${Const.__LS_PREFIX__}c-fixed-textarea`;
const defaultState = {
  showTextarea: false,
  showEmojiPicker: false,
  focus: false,
  value: '',
  fileId: []
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
  onSelectPic = nextFileId => {
    const { fileId } = this.state;

    const _fileId = [...fileId];
    _fileId.push(nextFileId);

    this.setState({
      fileId: _fileId
    });
  };

  // when selected picture count more than 2
  // click the picture and toggle the position
  onImgClick = () => {
    const { fileId } = this.state;

    if (fileId.length < 2) {
      return;
    }

    const _fileId = [...fileId];
    const head = _fileId.shift();
    _fileId.push(head);

    this.setState({ fileId: _fileId });
  };

  // remove a picture where position is head
  removeHeadPic = () => {
    const { fileId } = this.state;

    if (!fileId.length) {
      return;
    }

    const _fileId = [...fileId];
    _fileId.shift();
    this.setState({ fileId: _fileId });
  };

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
    const { showUploadPicButton } = this.props;
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

    let imgs;
    if (fileId.length) {
      imgs = fileId.filter((item, index) => index < 3).map((item, index) => {
        const len = fileId.length < 2 ? fileId.length : 2;

        if (index < 2) {
          return (
            <div
              /* eslint-disable-next-line */
              key={index}
              className="img"
              style={{
                zIndex: 10 - index,
                top: `${index * 0.08}rem`,
                left: `${index * 0.08}rem`,
                width: `${styleImgSize - len * 0.08}rem`,
                height: `${styleImgSize - len * 0.08}rem`,
                backgroundImage: `url(${Utils.getAppImgUrl(item)})`
              }}
              onClick={index === 0 ? this.onImgClick : undefined}
            >
              {index === 0 && (
                <Flex className={`${prefixCls}__clear`} justify="center">
                  <Icon
                    className="t-24 t-void"
                    type="cross"
                    onClick={e => {
                      e.stopPropagation();
                      this.removeHeadPic();
                    }}
                  />
                </Flex>
              )}

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
                .c-fixed-textarea-topic {
                }
                .img {
                  display: inline-block;
                  position: absolute;
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
          /* eslint-disable-next-line */
          <div key={index} className="num t-20 l-36 t-void">
            {fileId.length}

            <style jsx>{`
              .c-fixed-textarea-topic {
              }
              .num {
                display: inline-block;
                position: absolute;
                z-index: 11;
                right: 0.24rem;
                bottom: 0.24rem;
                width: 0.4rem;
                height: 0.4rem;
                text-align: center;
                background-color: #000;
                opacity: 0.64;
                border-radius: 50%;
              }
            `}</style>
          </div>
        );
      });
    }

    return (
      <Flex align="start">
        {fileId.length < showUploadPicButton && (
          <Icon
            className="t-48 l-56 t-void ml-sm"
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
        )}
        {!!fileId.length && <div className="wrap-imgs ml-sm">{imgs}</div>}

        <style jsx>{`
          .c-fixed-textarea-topic {
          }
          .wrap-imgs {
            display: inline-block;
            position: relative;
            width: ${styleImgSize}rem;
            height: ${styleImgSize}rem;
          }
        `}</style>
      </Flex>
    );
  }

  renderTextarea() {
    const {
      count,
      title,
      placeholder,
      showEmoji,
      showUploadPicButton
      // showCoin
    } = this.props;
    const { showEmojiPicker, focus, value } = this.state;

    return (
      <div className={prefixCls}>
        <Flex className={`${prefixCls}__title`}>{title}</Flex>
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
                    className="t-48 l-56 t-void"
                    type="emoji"
                    onClick={() =>
                      this.setState({
                        showEmojiPicker: !showEmojiPicker
                      })
                    }
                  />
                ) : (
                  <Icon
                    className="t-48 l-56 t-void"
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
              {/* {showCoin && this.renderCoin()} */}
            </Flex>
          </Flex.Item>
          <span className="t-28 l-56 t-void" onClick={this.onCancel}>
            取消
          </span>
          <Button
            className="t-primary ml-32"
            inline
            size="sm"
            disabled={!(this.props.value || value)}
            onClick={this.onSubmit}
          >
            发表
          </Button>
        </Flex>

        <style jsx global>{`
          .c-fixed-textarea-topic {
          }
          .${prefixCls}__title {
            padding: 0.16rem 0.24rem 0;
            background: ${Styles.color_primary};
          }
          .${prefixCls}__bar {
            padding: 0 0.24rem 0.16rem;
            background: ${Styles.color_primary};
          }
          .{prefixCls} textarea {
            position: static !important;
          }
          .${prefixCls} .c-textarea {
            box-shadow: 0.02rem 0.02rem 0.08rem rgba(0, 0, 0, 0.32) inset;
          }
        `}</style>
        <style jsx>{`
          .c-fixed-textarea-topic {
            position: fixed;
            z-index: ${Styles.z_fixed_textarea};
            top: 0;
            right: 0;
            left: 0;
            background-color: ${Styles.color_theme};
          }
          .wrap-textarea {
            padding: 0.16rem 0.24rem;
            background: ${Styles.color_primary};
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
          .c-fixed-textarea-topic {
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
          if (localUploadPicDS.length > 10) {
            localUploadPicDS.pop();
          }
          Utils.lsSet(localStorageKey, localUploadPicDS);
          /* ========== 缓存上传图片 end ========== */

          this.onSelectPic(data.fileId);
          Utils.hideToast();
          Utils.hideActionSheet();
        }}
      />
    );
  }

  // renderCoin() {
  //   const { sysAmount = '0.00' } = G.getState('walletInfo');

  //   return (
  //     <Flex style={{ height: '0.6rem' }}>
  //       <img
  //         src={`${Const.__IMAGES__}/coin.png`}
  //         style={{ width: '0.32rem', height: '0.32rem' }}
  //         alt=""
  //       />
  //       <span className="t-24 t-void ml-xs">金币：</span>
  //       <span className="t-24 t-primary">{sysAmount}</span>
  //       <Button
  //         className="btn-primary ml-sm"
  //         size="small"
  //         inline
  //         onClick={() => Utils.router.push('/person/wallet/coin_desc')}
  //       >
  //         获取
  //       </Button>
  //     </Flex>
  //   );
  // }

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
