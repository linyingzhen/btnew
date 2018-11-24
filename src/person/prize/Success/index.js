/**
 * const prefixCls = 'style-195196';
 * const images = '/static/images/src/person/prize/Success';
 * @Author: czy0729
 * @Date: 2018-11-07 11:40:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-07 12:06:16
 * @Path bt_mb_new /src/person/prize/Success/index.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, observer } from '@';
import { Flex, Img, Button } from '@components';
import { Layout } from '@_';
import Utils from '@utils';
import Styles from '@styles';
import store from './store';

const prefixCls = 'style-195196';

const Success = (props, { $ }) => {
  const { prizeName, expdatebegin, expdateend, imgId } = $.getState('detail');

  const begin = Utils.date('y.m.d H:i:s', expdatebegin);
  const end = Utils.date('y.m.d H:i:s', expdateend);

  return (
    <Layout title="答谢金发放成功">
      <Flex className={`${prefixCls}__coupon`} direction="column">
        <Img className="border" src={imgId} size="1.2rem" />
        <p className="t-34 l-48 t-danger mt-40">此现金券已成功使用</p>
        <p className="t-30 l-42 mt-24">{prizeName}</p>
        <p className="t-24 l-32 t-sub t-c mt-24">
          <span>购买时间：</span>
          <span>{expdateend ? `${begin} - ${end}` : '-'}</span>
        </p>
        <Button
          className="mt-lg"
          type="primary"
          ghost
          style={{ width: '100%' }}
          onClick={Utils.router.back}
        >
          知道了
        </Button>
      </Flex>

      <style jsx global>{`
        .style-195196 {
        }
        .${prefixCls}__coupon {
          position: relative;
          padding: 0.8rem ${Styles.wind};
          margin: ${Styles.space};
          background: ${Styles.color_theme};
        }
        .${prefixCls}__coupon:before, .${prefixCls}__coupon:after {
          content: '';
          position: absolute;
          top: 50%;
          width: 0.64rem;
          height: 0.64rem;
          margin-top: -0.64rem;
          background: ${Styles.color_bg};
          border-radius: 50%;
        }
        .${prefixCls}__coupon:before {
          left: 0;
          margin-left: -0.32rem;
        }
        .${prefixCls}__coupon:after {
          right: 0;
          margin-right: -0.32rem;
        }
      `}</style>
    </Layout>
  );
};

Success.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Success));
