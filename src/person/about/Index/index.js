/**
 * const prefixCls = 'style-195493';
 * const images = '/static/images/src/person/about/Index';
 * @Author: czy0729
 * @Date: 2018-11-02 10:19:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-02 10:24:22
 * @Path bt_mb_new /src/person/about/Index/index.js.git
 */
import React from 'react';
import { Layout } from '@_';
import { List, Flex, Icon } from '@components';
import Styles from '@styles';
import UI from '@stores/ui';

const About = () => (
  <Layout title="关于我们">
    <div className="top">
      <div className="t-c">
        <Icon
          type="lingdong"
          color
          style={{
            width: '1.6rem',
            height: '1.6rem'
          }}
        />
      </div>
      <p className="t-32 mt-48">
        {'　　'}
        灵动是备受中国钓鱼人群体喜爱的运动聚集社区，灵动旨在打造一个让广大钓鱼爱好者畅所欲言、交流互动、休闲放松、切磋钓技的交友玩乐的活动平台，让我们一起快乐垂钓，纵情山水，享受自然，强健体魄，放飞心情！
      </p>
    </div>
    <List className="mt-d">
      <List.Item extra="灵动小区">公众号名称</List.Item>
      <List.Item
        arrow="horizontal"
        onClick={() => {
          UI.showMask({
            children: (
              <div>
                <img
                  key="0"
                  className="img-qr"
                  src="/static/images/src/person/Help/Nido/qr.jpg"
                  alt=""
                />
                <p key="1" className="t-36 t-void t-c mt-lg">
                  长按识别二维码
                </p>
              </div>
            ),
            onClick: UI.hideMask
          });
        }}
      >
        <Flex justify="between">
          <span className="t-34 l-48">公众号二维码</span>
          <Icon className="t-32 t-sub" type="qrcode" />
        </Flex>
      </List.Item>
    </List>

    <style jsx>{`
      .style-195493 {
      }
      .top {
        padding: ${Styles.space} ${Styles.wind} ${Styles.bottom};
        background-color: ${Styles.color_theme};
      }
      .img-qr {
        width: 4rem;
        height: 4rem;
        box-shadow: 0.04rem 0.04rem 0.16rem rgba(0, 0, 0, 0.16);
      }
    `}</style>
  </Layout>
);

export default About;
