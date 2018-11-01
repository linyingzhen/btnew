/**
 * const prefixCls = 'style-176472';
 * const images = '/static/images/components/RichEditor';
 * @Author: czy0729
 * @Date: 2018-07-11 23:34:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-26 00:30:07
 * @Path m.benting.com.cn /components/RichEditor/_Media.js
 */
import React from 'react';
import LazyLoad from 'react-lazyload';
import Utils from '@utils';
import Styles from '@styles';
import Animate from '../Animate/Wrap';
import Video from '../Video';

const prefixCls = 'style-176472';

const _Media = props => {
  const { onClick } = props;
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const data = entity.getData();
  const type = entity.getType();

  switch (type) {
    case 'image':
    case 'link-image':
      return (
        <LazyLoad
          height="6.4rem"
          throttle={80}
          offset={160}
          once
          placeholder={<Placeholder />}
        >
          <Animate>
            <Image {...data} onClick={onClick} />
          </Animate>
        </LazyLoad>
      );

    case 'video':
      return <V {...data} />;

    case 'link-video':
      return <Iframe {...data} />;

    default:
      return null;
  }
};

const Placeholder = () => (
  <>
    <div className={`${prefixCls}__placeholder`} />

    <style jsx global>{`
      .style-176472 {
      }
      .${prefixCls}__placeholder {
        height: 6.4rem;
        background: ${Styles.color_bg};
      }
    `}</style>
  </>
);

const Image = props => {
  const { src, onClick } = props;

  return (
    <>
      <img
        className={`${prefixCls}__image`}
        src={Utils.getAppImgUrl(src, 'scale')}
        onClick={onClick ? () => onClick(src) : undefined}
        alt=""
      />

      <style jsx global>{`
        .style-176472 {
        }
        .${prefixCls}__image {
          display: block;
          width: 100%;
          margin: ${Styles.distance} auto;
          vertical-align: top;
        }
      `}</style>
    </>
  );
};

const V = props => {
  const { src, poster, size, playTime } = props;

  return (
    <>
      <Video
        className={`${prefixCls}__video`}
        src={src}
        poster={poster}
        fileSize={size}
        playSecond={playTime}
      />

      <style jsx global>{`
        .style-176472 {
        }
        .${prefixCls}__video {
          display: block;
          width: 100%;
          margin: ${Styles.distance} auto;
          vertical-align: top;
          border: 0.01rem solid #eee;
        }
      `}</style>
    </>
  );
};

const Iframe = props => {
  const { src } = props;

  return (
    <iframe
      title={src}
      src={src}
      allowFullScreen
      frameBorder="0"
      style={{
        display: 'block',
        position: 'relative',
        width: '100%',
        height: '57.5vw'
      }}
    />
  );
};

export default _Media;
