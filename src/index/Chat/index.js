/**
 * const prefixCls = 'style-917444';
 * const images = '/static/images/src/index/Chat';
 * @Author: czy0729
 * @Date: 2018-10-21 15:52:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-21 19:35:26
 * @Path bt_mb_new /src/index/Chat/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Flex, ImgView } from '@components';
import { Layout } from '@_';
import Styles from '@styles';
import Time from './_Time';
import Item from './_Item';
import ItemMe from './_ItemMe';
import FixedTextarea from './_FixedTextarea';
import store from './store';

const prefixCls = 'style-917444';

const Chat = (props, { $ }) => {
  const { imgView } = $.getState();
  const { userId } = $.getState('userInfo');
  const { niname } = $.getState('toUserInfo');
  const chatList = $.getState('chatList');

  return (
    <Layout
      className={prefixCls}
      title={niname || '聊天'}
      wrapStyle={{
        position: 'initial'
      }}
    >
      <Flex className={`${prefixCls}__container`} direction="column">
        <Flex.Item className={`${prefixCls}__wrap`}>
          {chatList.list.map((item, index) => {
            let showTime;
            if (index === 0) {
              showTime = true;
            } else if (
              item.createTime - chatList.list[index - 1].createTime >
              60
            ) {
              showTime = true;
            }

            if (showTime) {
              if (item.userId === userId) {
                return (
                  /* eslint-disable-next-line */
                  <div key={index}>
                    <Time ctime={item.createTime} />
                    <ItemMe {...item} />
                  </div>
                );
              }

              return (
                /* eslint-disable-next-line */
                <div key={index}>
                  <Time ctime={item.createTime} />
                  <Item {...item} />
                </div>
              );
            }

            if (item.userId === userId) {
              /* eslint-disable-next-line */
              return <ItemMe key={index} {...item} />;
            }

            /* eslint-disable-next-line */
            return <Item key={index} {...item} />;
          })}
        </Flex.Item>

        <FixedTextarea />
        {imgView.show && (
          <ImgView
            show={imgView.show}
            current={imgView.current}
            data={imgView.data.slice()}
            onClose={$.page.hideImgView}
          />
        )}
      </Flex>

      <style jsx global>{`
        .style-917444 {
          min-height: 100vh !important;
          padding-bottom: 0 !important;
        }
        .${prefixCls}__container {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        .${prefixCls}__wrap {
          width: 100%;
          padding: 0.8rem ${Styles.wind} 1.6rem;
          overflow: scroll;
        }
      `}</style>
    </Layout>
  );
};

Chat.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Chat));
