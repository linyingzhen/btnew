/**
 * const prefixCls = 'style-114766';
 * const images = '/static/images/components/Video';
 * @Author: czy0729
 * @Date: 2018-07-04 18:26:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-06 15:58:36
 * @Path m.benting.com.cn /components/Video/index.js
 */
import React from 'react';
import classNames from 'classnames';
import ReactPlayer from 'react-player';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import Img from '../Img';

const prefixCls = 'c-video';
const images = Utils.cdn('/static/images/components/Video');
const thumbOldUrl =
  'https://api.nidosport.com/static/uploads/png/20170519/591e5f9e2c2bc_thumb.png';

export default class Video extends React.Component {
  played = false;
  state = {
    playing: false
  };

  renderControl() {
    const { fileSize, playSecond, isPoster } = this.props;
    const { playing } = this.state;

    // 播放中
    if (playing) {
      return null;
    }

    // 微信环境 播放过后不再显示
    if (Const.__WX__ && this.played) {
      return null;
    }

    return (
      <div
        className="control"
        onClick={e => {
          if (!isPoster) {
            e.preventDefault();
            e.stopPropagation();

            this.setState({
              playing: !playing
            });
          }
        }}
      >
        <img
          className="img-play"
          src={`${Const.__IMG__}/play${Const.__IMG_DPR__}.png`}
          alt=""
        />
        {/* 视频信息播放过后不再显示 */}
        {!this.played && (
          <p className="p-control t-24 l-34 t-void">
            {fileSize && (
              <span className="p-round">
                {fileSize ? Utils.getMB(fileSize) : '-'} MB
              </span>
            )}
            {playSecond && (
              <span className="p-round pull-right">
                {playSecond ? Utils.getPlayTime(playSecond) : '00:00'}
              </span>
            )}
          </p>
        )}

        <style jsx>{`
          .c-video {
          }
          .control {
            ${Styles._full};
            z-index: 2;
          }
          .img-play {
            position: absolute;
            z-index: 2;
            top: 48%;
            left: 50%;
            width: 0.96rem !important;
            height: 0.96rem !important;
            transform: translate(-50%, -50%);
          }
          .p-control {
            position: absolute;
            z-index: 2;
            right: 0;
            bottom: 0;
            left: 0;
            padding: 0.16rem;
          }
          .p-round {
            padding: 0.08rem 0.16rem;
            background: rgba(0, 0, 0, 0.28);
            border-radius: 0.24rem;
          }
        `}</style>
      </div>
    );
  }

  render() {
    const {
      src,
      poster,
      height = '57.5vw',
      fileSize,
      playSecond,
      placeholderPublish,
      isPoster,
      posterAnimate,
      className,
      ...other
    } = this.props;
    const { playing } = this.state;

    let _poster;
    if (poster === '') {
      _poster = placeholderPublish ? `${images}/1.png` : `${images}/2.png`;
    } else {
      _poster = Utils.getAppImgUrl(poster, 'scale');

      if (_poster === thumbOldUrl) {
        _poster = placeholderPublish ? `${images}/1.png` : `${images}/2.png`;
      }
    }

    if (isPoster) {
      return (
        <div className={classNames(prefixCls, className)} style={{ height }}>
          <Img
            className={`${prefixCls}__poster`}
            src={_poster}
            size="auto"
            animate={posterAnimate}
          />
          {this.renderControl()}

          <style jsx global>{`
            .c-video {
              position: relative;
              overflow: hidden;
              border-radius: ${Styles.radius_xs};
            }
            .${prefixCls}__poster {
              ${Styles._full};
              position: absolute !important;
              z-index: 1;
            }
          `}</style>
        </div>
      );
    }

    // 通过class去控制是否显示-webkit-media-controls
    return (
      <div
        className={classNames(prefixCls, className, {
          [`${prefixCls}_pause`]: !playing
        })}
      >
        <ReactPlayer
          url={Utils.getImgUrl(src)}
          playing={playing}
          controls
          // playsinline
          width="100%"
          height={height}
          config={{
            file: {
              attributes: {
                preload: 'none'
              }
            }
          }}
          onPlay={() => {
            this.played = true;
            this.setState({ playing: true });
          }}
          onPause={() => this.setState({ playing: false })}
          {...other}
        />
        {_poster !== Const.__IMG_DEFAULT__ &&
          !this.played && (
          <Img
            className={`${prefixCls}__poster`}
            src={_poster}
            size="auto"
            animate={posterAnimate}
          />
        )}
        {this.renderControl()}

        <style jsx global>{`
          .c-video {
            position: relative;
            overflow: hidden;
            border-radius: ${Styles.radius_xs};
          }
          .${prefixCls} video {
            vertical-align: top;
            background: #000;
          }
          .${prefixCls}_pause video::-webkit-media-controls {
            display: none !important;
          }
          .${prefixCls}__poster {
            ${Styles._full};
            position: absolute !important;
            z-index: 1;
          }
        `}</style>
      </div>
    );
  }
}
