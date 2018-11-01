/**
 * const prefixCls = 'style-959233';
 * const images = '/static/images/src/index/nearby/Detail';
 * @Author: czy0729
 * @Date: 2018-10-22 12:03:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-22 17:26:44
 * @Path bt_mb_new /src/index/nearby/Detail/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { List, Flex, Img, ImgView } from '@components';
import { Layout } from '@_';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import G from '@stores/g';
import store from './store';
import { prefixCls, images } from './ds';

@injectV2(store)
@observer
export default class Detail extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  state = {
    showImgView: false,
    imgViewIndex: 0
  };

  componentDidMount() {
    if (Const.__CLIENT__) {
      const { $ } = this.context;

      Utils.removeHD();
      G.loadAMapJS(() => $.fetch.shopDetail());
    }
  }

  componentWillUnmount() {
    if (Const.__CLIENT__) {
      Utils.setHD();
    }
  }

  showImgView = imgViewIndex =>
    this.setState({
      showImgView: true,
      imgViewIndex
    });

  hideImgView = () =>
    this.setState({
      showImgView: false
    });

  render() {
    const { $ } = this.context;
    const shopDetail = $.getState('shopDetail');
    const { showImgView, imgViewIndex } = this.state;

    let photos = [];
    if (shopDetail.shopFace) {
      photos = [shopDetail.shopFace, ...shopDetail.shopPhoto.split(',')].filter(
        item => !!item
      );
    }

    return (
      <Layout title="经销商" hideHeader>
        <div id="amap" className="amap" />
        <img
          className="img-navigate"
          src={`${images}/navigate${Const.__IMG_DPR__}.png`}
          alt=""
          onClick={$.page.doNavigate}
        />
        <List className={`${prefixCls}__list`}>
          <List.Item>
            <p className="t-32 t-b">{shopDetail.shopName || '-'}</p>
          </List.Item>
          <List.Item wrap="wrap">
            <Flex className="t-28" align="start">
              <span>地　　址：</span>
              <Flex.Item>{shopDetail.address || '-'}</Flex.Item>
            </Flex>
            <Flex className="t-28 mt-xs" align="start">
              <span>营业时间：</span>
              <Flex.Item>{shopDetail.businessTime || '-'}</Flex.Item>
            </Flex>
          </List.Item>
        </List>
        <List className="mt-d">
          <List.Item>
            <p className="t-28">简介</p>
          </List.Item>
          <List.Item wrap>
            <p className="t-28">{shopDetail.intro || '-'}</p>
          </List.Item>
        </List>
        {!!photos.length && (
          <List className="mt-d">
            <List.Item>
              <p className="t-28">照片</p>
            </List.Item>
            <List.Item wrap>
              <div className="photo">
                {photos.map((item, index) => (
                  <Img
                    key={item}
                    className={`${prefixCls}__img`}
                    src={Utils.getAppImgUrl(item, 'scale')}
                    onClick={() => this.showImgView(index)}
                  />
                ))}
              </div>
            </List.Item>
          </List>
        )}
        {!!photos.length && (
          <ImgView
            show={showImgView}
            current={imgViewIndex}
            data={photos.map(item => Utils.getAppImgUrl(item, 'scale'))}
            onClose={this.hideImgView}
          />
        )}

        <style jsx global>{`
          .style-959233 {
          }
          .${prefixCls}__img {
            display: inline-block;
            width: 2.4rem !important;
            height: 1.8rem !important;
            margin-right: ${Styles.sm};
            border: ${Styles.border};
          }
          .${prefixCls}__img:last-child {
            margin-right: 0;
          }
          .${prefixCls}__marker {
            width: 0.576rem !important;
            height: 0.576rem !important;
          }
          .${prefixCls}__list {
            border-top: ${Styles.border};
          }
        `}</style>
        <style jsx>{`
          .style-959233 {
          }
          .amap {
            position: relative;
            padding-bottom: 75%;
            background: #fcf9f2;
            overflow: hidden;
          }
          .detail {
            background: ${Styles.color_theme};
          }
          .content {
            background: ${Styles.color_theme};
          }
          .img-navigate {
            position: absolute;
            z-index: 100;
            top: 0;
            margin-top: 78%;
            right: ${Styles.wind};
            width: 1.54rem;
            height: 1.54rem;
            transform: translateY(-50%);
          }
          .photo {
            background: ${Styles.color_theme};
            overflow-x: scroll;
            overflow-y: hidden;
            white-space: nowrap;
          }
        `}</style>
      </Layout>
    );
  }
}
