/**
 * const prefixCls = 'style-203888';
 * const images = '/static/images/components/RichEditor';
 * @Author: czy0729
 * @Date: 2018-11-06 23:25:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-07 00:35:36
 * @Path bt_mb_new /components/RichEditor/_MediaEditable.js.git
 */
import React from 'react';
import Utils from '@utils';
import Styles from '@styles';
import ComponentVideo from '../Video';
import Flex from '../Flex';
import BtnTool from './_BtnTool';

const prefixCls = 'style-203888';

const _MediaEditable = props => {
  const { block, onDelete } = props;
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const data = entity.getData();
  const type = entity.getType();

  switch (type) {
    case 'image':
    case 'link-image':
      return <Image {...data} onDelete={() => onDelete(block)} />;

    case 'video':
      return <Video {...data} onDelete={() => onDelete(block)} />;

    case 'link-video':
      return <Iframe {...data} onDelete={() => onDelete(block)} />;

    default:
      return null;
  }
};

const Image = props => {
  const { src, onDelete } = props;

  return (
    <Flex align="start">
      <Flex.Item>
        <img
          className={`${prefixCls}__image`}
          src={Utils.getAppImgUrl(src, 'scale')}
          alt=""
        />
      </Flex.Item>
      <BtnTool
        className="ml-md"
        type="cross"
        onClick={() => Utils.onConfirm('确定删除图片?', onDelete)}
      />

      <style jsx global>{`
        .style-203888 {
        }
        .${prefixCls}__image {
          display: block;
          width: 100%;
          vertical-align: top;
          border: ${Styles.border};
        }
      `}</style>
    </Flex>
  );
};

const Video = props => {
  const { src, poster, size, playTime, onDelete } = props;

  return (
    <Flex align="start">
      <Flex.Item>
        <ComponentVideo
          className={`${prefixCls}__video`}
          src={src}
          height="50vw"
          poster={poster}
          fileSize={size}
          playSecond={playTime}
        />
      </Flex.Item>
      <BtnTool
        className="ml-md"
        type="cross"
        onClick={() => Utils.onConfirm('确定删除视频?', onDelete)}
      />

      <style jsx global>{`
        .style-203888 {
        }
        .${prefixCls}__video {
          display: block;
          width: 100%;
          vertical-align: top;
          border: ${Styles.border};
        }
      `}</style>
    </Flex>
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

export default _MediaEditable;
