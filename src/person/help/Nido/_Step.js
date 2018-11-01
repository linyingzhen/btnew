/**
 * const prefixCls = 'style-207149';
 * const images = '/static/images';
 * @Author: lyz0720
 * @Date: 2018-11-01 18:06:46
 * @Last Modified by:   lyz0720
 * @Last Modified time: 2018-11-01 18:06:46
 * @Path bt_mb_new \src\person\help\Nido\_Step.js.git
 */
import React from 'react';
import classNames from 'classnames';
import { Flex } from '@components';
import { Header } from '@_';
import Styles from '@styles';
import { images } from './ds';

const prefixCls = 'style-207149';

const Step = ({ className }) => (
  <div className={classNames(prefixCls, className)}>
    <Header
      title="如何关注公众号"
      desc="关注【灵动小区】公众号，咨询查询更加便捷"
    />
    <div className="p-w">
      <p className="t-30 l-42">
        首先进入【微信】点击右上角红框内的【添加按钮】，然后点击【微信公众号】搜索【灵动小区】。
      </p>
      <Flex>
        <Flex.Item>
          <img src={`${images}/1.png`} alt="" />
        </Flex.Item>
        <Flex.Item>
          <img src={`${images}/2.png`} alt="" />
        </Flex.Item>
      </Flex>
      <p className="t-30 l-42">
        在搜索框内输入【灵动小区】后，进行搜索，选择红框内的【灵动小区】后，进入并选择【关注】。
      </p>
      <Flex>
        <Flex.Item>
          <img src={`${images}/3.png`} alt="" />
        </Flex.Item>
        <Flex.Item>
          <img src={`${images}/4.png`} alt="" />
        </Flex.Item>
      </Flex>
      <p className="t-30 l-42">
        关注后点击【进入公众号】，进入到聊天详情内页，点击【键盘模式切换按钮】切换到文本模式。
      </p>
      <Flex>
        <Flex.Item>
          <img src={`${images}/5.png`} alt="" />
        </Flex.Item>
        <Flex.Item>
          <img src={`${images}/6.png`} alt="" />
        </Flex.Item>
      </Flex>
      <p className="t-30 l-42">
        在聊天输入文本框内直接输入您想咨询的问题即可，工作人员会在收到后，及时为您提供服务。
      </p>
      <Flex>
        <Flex.Item>
          <img src={`${images}/7.png`} alt="" />
        </Flex.Item>
        <Flex.Item />
      </Flex>
    </div>

    <style jsx>{`
      .style-207149 {
        background: ${Styles.color_theme};
      }
      img {
        width: 100%;
        margin: 0.4rem 0 0.8rem;
      }
    `}</style>
  </div>
);

export default Step;
