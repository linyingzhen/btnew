/**
 * const prefixCls = 'style-203823';
 * const images = '/static/images/src/person/help/Service';
 * @Author: Jun
 * @Date: 2018-08-10 17:04:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 14:21:32
 * @Path m.benting.com.cn /src/person/help/Service/_Step.js
 */
import React from 'react';
import classNames from 'classnames';
import { Flex } from '@components';
import { Header } from '@_';
import Styles from '@styles';
import { images } from './ds';

const prefixCls = 'style-203823';

const Step = ({ className }) => (
  <div className={classNames(prefixCls, className)}>
    <Header title="如何关注公众号" desc="关注本汀公众号，咨询查询更加便捷" />
    <div className="p-w">
      <p className="t-30 l-42">
        首先进入【微信】点击右上角红框内的【添加按钮】，然后点击【微信公众号】搜索【本汀钓鱼服务号】。
      </p>
      <Flex>
        <Flex.Item>
          <img src={`${images}/1.jpg`} alt="" />
        </Flex.Item>
        <Flex.Item>
          <img src={`${images}/2.jpg`} alt="" />
        </Flex.Item>
      </Flex>
      <p className="t-30 l-42">
        在搜索框内输入【本汀钓鱼服务号】后，进行搜索，选择红框内的【本汀钓鱼服务号】后，进入并选择【关注】。
      </p>
      <Flex>
        <Flex.Item>
          <img src={`${images}/3.jpg`} alt="" />
        </Flex.Item>
        <Flex.Item>
          <img src={`${images}/4.jpg`} alt="" />
        </Flex.Item>
      </Flex>
      <p className="t-30 l-42">
        关注后点击【进入公众号】，进入到聊天详情内页，点击【键盘模式切换按钮】切换到文本模式。
      </p>
      <Flex>
        <Flex.Item>
          <img src={`${images}/5.jpg`} alt="" />
        </Flex.Item>
        <Flex.Item>
          <img src={`${images}/6.jpg`} alt="" />
        </Flex.Item>
      </Flex>
      <p className="t-30 l-42">
        在聊天输入文本框内直接输入您想咨询的问题即可，工作人员会在收到后，及时为您提供服务。
      </p>
      <Flex>
        <Flex.Item>
          <img src={`${images}/7.jpg`} alt="" />
        </Flex.Item>
        <Flex.Item />
      </Flex>
    </div>

    <style jsx>{`
      .style-203823 {
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
