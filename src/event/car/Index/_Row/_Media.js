/**
 * const prefixCls = 'style-862747';
 * const images = '/static/images/src/event/car/Index/_Row';
 * @Author: czy0729
 * @Date: 2018-11-07 18:41:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-22 17:20:39
 * @Path bt_mb_new /src/event/car/Index/_Row/_Media.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Content, ImgView, Flex, Icon } from '@components';
import Utils from '@utils';
import Imgs from './_Imgs';

const prefixCls = 'style-862747';

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

  renderImgs() {
    const { files = [], params = {} } = this.props;

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

  renderExplain() {
    const { isPass, reason } = this.props;

    if (!reason) {
      return null;
    }

    return (
      <Flex className="mt-24" align="start">
        <Icon
          className={classNames('t-28 l-34', {
            't-success': isPass,
            't-danger': !isPass
          })}
          type={isPass ? 'success-circle' : 'fail-circle'}
        />
        <Flex.Item className="t-24 l-34">{reason}</Flex.Item>
      </Flex>
    );
  }

  render() {
    const { atList, content, infoId, params = {}, className } = this.props;
    const { renderImgView, dataImgView, show, current } = this.state;

    return (
      <div className={classNames(prefixCls, className)}>
        {this.renderImgs()}
        {content && (
          <Content
            className="t-34 l-48 mt-24 user-select"
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
        {this.renderExplain()}
        {renderImgView && (
          <ImgView
            show={show}
            current={current}
            hideOrigin
            data={dataImgView.map(
              ({ fileId, filePath }) =>
                `${Utils.getAppImgUrl(fileId || filePath, 'scale')}/1`
            )}
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
