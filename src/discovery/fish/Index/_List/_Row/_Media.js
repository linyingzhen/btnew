/**
 * const prefixCls = 'style-111886';
 * const images = '/static/images/src/discovery/fish/Index/_List/_Row';
 * @Author: czy0729
 * @Date: 2018-08-08 16:24:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-22 17:20:54
 * @Path m.benting.com.cn /src/discovery/fish/Index/_List/_Row/_Media.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Video, Content, ImgView, Flex, Icon, Link } from '@components';
import Utils from '@utils';
import Imgs from './_Imgs';

const prefixCls = 'style-111886';

export default
@observer
class Media extends React.Component {
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
          'mt-16': !!content
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
    const { content, files = [], params = {} } = this.props;

    let data;
    if (files.length === 1) {
      data = files.map(({ fileId, filePath }) => ({
        src: `${Utils.getAppImgUrl(fileId || filePath, 'scale')}/1`
      }));
    } else {
      data = files.map(({ fileId, filePath }) => ({
        src: fileId || filePath
      }));
    }

    return (
      <Imgs
        className={classNames({
          'mt-16': !!content
        })}
        data={data}
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

  renderFishDesc() {
    const { dtsourceId, tit = [] } = this.props;
    const isClothes = dtsourceId == 51; // 是否服装
    const [goodsName, area, fishKind, maxWeight, totalWeight] = tit.split('|'); // 产品名称|地区|鱼种|单尾最大|总渔重

    return (
      <p className="t-36">
        <span>「</span>
        {isClothes ? (
          <React.Fragment>
            <span>
              {area}
              汀友
            </span>
            <span className="t-primary">{goodsName}</span>
            <span>帅爆分享！</span>
            {maxWeight && !totalWeight && (
              <span>
                喜获
                {fishKind}
                {maxWeight}
                斤巨物！
              </span>
            )}
            {!maxWeight && totalWeight && (
              <span>
                喜获
                {fishKind}
                等渔获共
                {totalWeight}
                斤！
              </span>
            )}
            {maxWeight && totalWeight && (
              <span>
                喜获
                {fishKind}
                {maxWeight}
                斤巨物，总渔获
                {totalWeight}
                斤！
              </span>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <span>
              {area}
              汀友使用
            </span>
            <span className="t-primary">{goodsName}</span>
            {maxWeight && !totalWeight && (
              <span>
                喜获
                {fishKind}
                {maxWeight}
                斤巨物！
              </span>
            )}
            {!maxWeight && totalWeight && (
              <span>
                喜获
                {fishKind}
                等渔获共
                {totalWeight}
                斤！
              </span>
            )}
            {maxWeight && totalWeight && (
              <span>
                喜获
                {fishKind}
                {maxWeight}
                斤巨物，总渔获
                {totalWeight}
                斤！
              </span>
            )}
          </React.Fragment>
        )}
        <span>」</span>
      </p>
    );
  }

  renderContent() {
    const { atList, content, params = {} } = this.props;

    return (
      content && (
        <Content
          className="t-34 l-48 ls-o1 mt-16 user-select"
          atList={atList}
          {...params.article}
        >
          {content}
        </Content>
      )
    );
  }

  renderExplain() {
    const { rate, explain, gold } = this.props;
    const _gold = parseInt(gold);
    const isSuccess = rate != 0;
    const isFail = rate == 0 && !!explain;
    const isWait = !isSuccess && !isFail;

    if (isWait || (!explain && _gold === 0)) {
      return null;
    }

    return (
      <Flex className="mt-16" align="start">
        <Icon
          className={classNames('t-28 mt-4', {
            't-success': isSuccess,
            't-danger': isFail
          })}
          type={isSuccess ? 'success-circle' : 'fail-circle'}
        />
        <Flex.Item>
          <p className="t-24 l-34">{explain}</p>
          {_gold !== 0 && (
            <p className="t-24 l-34 t-sub mt-8">
              <span>奖励</span>
              <span className="t-primary">
                {_gold}
                金币
              </span>
            </p>
          )}
        </Flex.Item>
      </Flex>
    );
  }

  render() {
    const { type, infoId, className } = this.props;
    const { renderImgView, dataImgView, show, current } = this.state;

    let El;
    switch (parseInt(type)) {
      case 1:
        El = this.renderVideo();
        break;

      case 2:
        El = this.renderImgs();
        break;

      default:
        break;
    }

    return (
      <div className={classNames(prefixCls, className)}>
        <Link
          href={`/discovery/detail?id=${infoId}`}
          as={`/discovery/detail/${infoId}`}
        >
          {this.renderFishDesc()}
          {this.renderContent()}
        </Link>
        {El}
        {this.renderExplain()}
        {renderImgView && (
          <ImgView
            show={show}
            current={current}
            data={dataImgView.map(
              item =>
                `${Utils.getAppImgUrl(item.fileId || item.filePath, 'scale')}/1`
            )}
            hideOrigin
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
