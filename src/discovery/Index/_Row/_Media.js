/**
 * const prefixCls = 'style-100916';
 * const images = '/static/images/src/discovery/Index/_Row';
 * @Author: czy0729
 * @Date: 2018-07-06 14:48:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-31 18:21:21
 * @Path m.benting.com.cn /src/discovery/Index/_Row/_Media.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Video, Carousel, Content, ImgView, Icon, Link } from '@components';
import Utils from '@utils';
import Imgs from './_Imgs';
import { images } from '../ds';

const prefixCls = 'style-100916';

@observer
export default class Media extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  state = {
    renderImgView: false, // 用于列表重新渲染ImgView
    dataImgView: [], // 存放列表ImgView图片数据
    show: false,
    current: 0
  };

  renderVideo() {
    const { content, files, params = {} } = this.props;

    return (
      <Video
        className={classNames({
          'mt-18': !!content
        })}
        src={files.length && files[0].filePath}
        poster={files.length ? files[0].sfPath : undefined}
        fileSize={files.length && files[0].fileSize}
        playSecond={files.length && files[0].playSeconds}
        onClick={e => e.preventDefault()}
        {...params.video}
      />
    );
  }

  renderImgs() {
    const { content, files = [], infoId, params = {} } = this.props;

    // 列表项
    if (infoId) {
      return (
        <Imgs
          className={classNames({
            'mt-18': !!content
          })}
          data={files.map(item => ({
            src: item.fileId || item.filePath
          }))}
          onImgClick={current =>
            this.setState({
              renderImgView: true,
              dataImgView: files,
              show: true,
              current
            })
          }
          {...params.image}
        />
      );
    }

    // 详情
    return (
      <Carousel
        className={classNames({
          'mt-18': !!content
        })}
        data={files.map(item => ({
          src: item.fileId || item.filePath
        }))}
        height="100vw"
        autoplay={false}
        style={{ backgroundSize: 'contain' }}
        onImgClick={current =>
          this.setState({
            renderImgView: true,
            dataImgView: files,
            show: true,
            current
          })
        }
      />
    );
  }

  renderRedPacket() {
    const { $ } = this.context;
    const { infoId, red = {}, redRecordsOpen } = this.props;
    const {
      amount,
      getAmount,
      getNum = 0,
      num,
      packetId,
      redPacketLogs = [],
      redType,
      state
    } = red;

    const isUserPublish = redType == 3;
    const isNone = state == 2;
    let redTypeText;
    let ext = '';
    let _getAmount = getAmount;
    let _amount = amount;

    switch (parseInt(redType)) {
      case 1:
        redTypeText = '金币';
        ext = '枚';
        _getAmount = parseInt(getAmount);
        _amount = parseInt(_amount);
        break;

      case 2:
        ext = '积分';
        _getAmount = parseInt(getAmount);
        _amount = parseInt(_amount);
        break;

      case 3:
        ext = '元';
        break;

      case 4:
        redTypeText = '优惠券';
        ext = '元';
        break;

      default:
        break;
    }

    let bestAmount = 0;
    let second = 0;
    if (isNone) {
      redPacketLogs.forEach(item => {
        if (parseFloat(item.amount) > bestAmount) {
          bestAmount = parseFloat(item.amount);
        }
      });

      const _secondArr = redPacketLogs
        .map(item => item.createTime)
        .sort((a, b) => a - b);
      second = _secondArr[_secondArr.length - 1] - _secondArr[0] || 1;
    }

    // 红包背景图
    let redImg;
    if (isUserPublish) {
      redImg = isNone
        ? `${images}/red-user-none.png`
        : `${images}/red-user.png`;
    } else {
      redImg = isNone ? `${images}/red-none.png` : `${images}/red.png`;
    }

    // 抢光时间
    let allTime;
    if (second) {
      if (second > 3600) {
        allTime = `${parseInt(second / 3600)}时`;
      } else if (second > 60) {
        allTime = `${parseInt(second / 60)}分`;
      } else {
        allTime = `${second}秒`;
      }
    }

    return (
      <div className="mt-d">
        <div
          className="redpacket"
          onClick={() =>
            Utils.checkLogin(() => {
              if ($.do.redClick) {
                $.do.redClick(packetId, redType, infoId);
              } else {
                Utils.light('只能在发现列表里领取');
              }
            })
          }
        >
          <img
            className={isUserPublish ? 'img-red-user' : 'img-red'}
            src={redImg}
            alt=""
          />
          {isUserPublish ? (
            <span className="p-red-user-text t-b">现金红包</span>
          ) : (
            <span className="p-red-text t-b">
              {redTypeText || ext}
              红包
            </span>
          )}
        </div>
        {/* eslint-disable-next-line */}
        {!isNaN(_amount) && (
          <p className="t-24 l-34 mt-24">
            <Icon className="t-24" type="redpacket" />
            <span className="ml-16">已领取</span>
            <span className="t-danger ml-4">
              {getNum}/{num}
            </span>
            <span className="ml-4">个，</span>
            <span className="t-danger">
              {_getAmount}/{_amount}
            </span>
            <span className="ml-4">{ext}</span>
            {allTime && (
              <span>
                ，{allTime}
                抢光
              </span>
            )}
          </p>
        )}
        {!!redPacketLogs.length && (
          <div className="logs">
            {redPacketLogs
              .filter((item, index) => redRecordsOpen || index < 10)
              .map(item => (
                <p key={item.userId} className="t-24 l-34 mt-8">
                  <Link
                    className="t-primary"
                    href={`/person/zone?id=${item.userId}`}
                    as={`/person/zone/${item.userId}`}
                  >
                    {item.niname}
                  </Link>
                  <span className="t-sub ml-4">抢到</span>
                  <span className="t-primary ml-4">
                    {ext === '元' ? item.amount : parseInt(item.amount)}
                  </span>
                  <span className="t-sub ml-4">{ext}。</span>
                  {!!bestAmount &&
                    bestAmount === parseFloat(item.amount) && (
                    <img
                      className="img-best"
                      src={`${images}/best.png`}
                      alt=""
                    />
                  )}
                </p>
              ))}
            {!redRecordsOpen &&
              redPacketLogs.length > 10 && (
              <p
                className="t-24 l-34 mt-8"
                onClick={() => $.page.onRedLogsOpen(infoId)}
              >
                <span className="t-sub">展开</span>
                <Icon className="t-24 l-34 t-sub ml-4" type="down" />
              </p>
            )}
          </div>
        )}

        <style jsx>{`
          .style-100916 {
          }
          .redpacket {
            display: inline-block;
            position: relative;
            min-width: 3.87rem;
            min-height: 2.96rem;
            background: rgb(207, 66, 86);
            border-radius: 0.08rem;
            overflow: hidden;
          }
          .img-red-user {
            width: 3.87rem;
            height: 5.05rem;
          }
          .img-red {
            width: 6rem;
            max-width: 100%;
            height: initial;
          }
          .p-red-text {
            position: absolute;
            top: 62%;
            left: 50%;
            color: #ffd265;
            transform: translate(-50%, -50%);
            text-shadow: 0.04rem 0.04rem 0.04rem rgba(0, 0, 0, 0.16);
          }
          .p-red-user-text {
            position: absolute;
            top: 53%;
            left: 1.93rem;
            color: #ffd265;
            transform: translate(-50%, -50%);
            text-shadow: 0.04rem 0.04rem 0.04rem rgba(0, 0, 0, 0.16);
          }
          .logs {
            padding-left: 0.4rem;
          }
          .img-best {
            width: initial;
            height: 0.4rem;
            margin-top: -0.1rem;
          }
        `}</style>
      </div>
    );
  }

  render() {
    const {
      atList,
      content,
      infoId,
      params = {},
      type,
      className
    } = this.props;
    const { renderImgView, dataImgView, show, current } = this.state;

    let El;
    switch (parseInt(type)) {
      case 1:
        El = this.renderVideo();
        break;

      case 2:
        El = this.renderImgs();
        break;

      case 10:
      case 11:
      case 12:
      case 13:
        El = this.renderRedPacket();
        break;

      default:
        break;
    }

    return (
      <div className={classNames(prefixCls, className)}>
        {content && (
          <Content
            className="t-34 l-48 ls-o1 user-select"
            atList={atList}
            onClick={e => {
              if (infoId) {
                e.stopPropagation();
                Utils.router.push(
                  `/discovery/detail?id=${infoId}`,
                  `/discovery/detail/${infoId}`
                );
              }
            }}
            {...params.article}
          >
            {content}
          </Content>
        )}
        {El}
        {renderImgView && (
          <ImgView
            show={show}
            current={current}
            data={dataImgView.map(item => {
              if (item.filePath.indexOf('.gif') !== -1) {
                return Utils.getImgUrl(item.filePath);
              }

              return Utils.getAppImgUrl(item.fileId || item.filePath, 'scale');
            })}
            onClose={() =>
              this.setState({
                renderImgView: false,
                dataImgView: [],
                show: false
              })
            }
          />
        )}
      </div>
    );
  }
}
