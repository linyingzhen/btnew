/**
 * const prefixCls = 'style-199793';
 * const images = '/static/images';
 * @Author: cwz0525
 * @Date: 2018-08-22 14:34:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 16:11:49
 * @Path newProject \src\person\about\Index\store.js
 */
import React from 'react';
import { observer } from '@';
import { Layout } from '@_';
import { Img, List, Flex, Icon } from '@components';
import UI, { aboutDetail, images } from './ds';
import Styles from '@styles';

// @injectV2(store)
@observer
export default class About extends React.Component {
  render() {
    return (
      <Layout title="关于我们">
        <div className="top">
          <div className="t-c">
            <Img src={`${images}/nido.jpg`} size="2.92rem" />
          </div>
          <p className="desc t-30 l-44 text-desc">{aboutDetail}</p>
        </div>
        <List className="mt-sm">
          <List.Item>
            <span className="t-sub">公众号名称:</span>
            <span className="ml-24">灵动运动</span>
          </List.Item>
          <List.Item
            arrow="horizontal"
            onClick={() => {
              UI.showMask({
                children: (
                  <Flex direction="column">
                    <Img key="0" src={`${images}/code.jpg`} size="4rem" />
                    <p key="1" className="info mt-md">
                      微信里长按识别二维码
                    </p>
                    <Icon
                      key="2"
                      className="mt-128 t-32"
                      type="cross"
                      onClick={UI.hideMask}
                    />
                  </Flex>
                )
              });
            }}
          >
            <Flex justify="between">
              <span className="t-34 l-48">公众号二维码</span>{' '}
              <Icon type="qrcode" className="t-22" />
            </Flex>
          </List.Item>
        </List>
        <style jsx>{`
          .style-199793 {
          }
          .top {
            padding: ${Styles.wind};
            padding-top: 0;
            background-color: ${Styles.color_void};
          }
          .desc {
            text-indent: 2em;
          }
          .info {
            margin-bottom: 1.5rem;
          }
        `}</style>
        <style jsx global>{`
          .am-modal-mask {
            background-color: rgba(255, 255, 255, 0.97);
          }
        `}</style>
      </Layout>
    );
  }
}
