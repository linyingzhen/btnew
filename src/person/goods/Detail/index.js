/**
 * const prefixCls = 'style-179542';
 * const images = '/static/images/src/person/goods/Detail';
 * @Author: lyz0720
 * @Date: 2018-10-23 17:05:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 20:16:19
 * @Path bt_mb_new /src/person/goods/Detail/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';
import { injectV2, observer } from '@';
import { Flex, Img } from '@components';
import { Layout } from '@_';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import store from './store';

const prefixCls = 'style-179542';

const Detail = (props, { $ }) => {
  const {
    _loaded,
    prizeType,
    imgId,
    prizeVal,
    limitPrize,
    prizeName,
    expdatebegin,
    expdateend,
    rule = '',
    prizeNo
  } = $.getState('myLotteryDetail');

  if (!_loaded) {
    return null;
  }

  const isReal = prizeType == 1;

  return (
    <Layout title="礼券详情">
      <div className="coupon mt-md">
        <Flex className={`${prefixCls}__flex`}>
          {isReal ? (
            <Img src={Utils.getAppImgUrl(imgId)} size="2.2rem" />
          ) : (
            <div className="amount">
              <p className="t-40 l-44 t-primary t-b t-c">¥ {prizeVal}</p>
              {limitPrize && (
                <p className="t-20 l-32 t-sub mt-4">
                  满 {parseInt(limitPrize)} 可用
                </p>
              )}
            </div>
          )}
          <Flex.Item className="ml-32" style={{ minHeight: '1.66rem' }}>
            <p className="t-30">{prizeName}</p>
            <p className="t-24 t-sub mt-16">使用时间：</p>
            <p className="t-24 t-sub mt-4">
              <span>{Utils.date('y.m.d H:i', expdatebegin)}</span>
              <span> - </span>
              <span>{Utils.date('y.m.d H:i', expdateend)}</span>
            </p>
          </Flex.Item>
        </Flex>
      </div>

      <div className="info mt-md">
        <p className="t-34">使用须知</p>
        <div className="mt-16">
          {rule.split('\n').map((item, index) => (
            <Flex
              /* eslint-disable-next-line */
              key={index}
              className="t-28 t-sub mt-d"
              align="start"
            >
              <span className="num">{index + 1}.</span>
              <Flex.Item>
                {Utils.stringSplitToArray(
                  item,
                  /\[b\]([\s\S]+?)\[\/b\]/g,
                  /(\[b\])|(\[\/b\])/g,
                  `${prefixCls}__p-highlight`
                )}
              </Flex.Item>
            </Flex>
          ))}
        </div>
        <div className="t-c mt-lg">
          <span className="code-main t-void user-select">{prizeNo}</span>
        </div>
        <div className="mt-md">
          {Const.__WX__ ? (
            <span
              className="t-primary"
              onClick={() => Utils.light('微信不支持复制，请手动选择复制')}
            >
              复制奖品口令
            </span>
          ) : (
            <CopyToClipboard
              className={`${prefixCls}__clipboard t-primary t-sm ml-sm`}
              text={prizeNo}
              onCopy={() => Utils.light('已复制')}
            >
              <Flex justify="center">
                <span className="t-primary mt-md">复制奖品口令</span>
              </Flex>
            </CopyToClipboard>
          )}
        </div>
      </div>

      {isReal && (
        <div className="p-w mt-lg">
          <p className="t-34">商家实物发放专用二维码</p>
          <div className="t-c mt-48">
            {prizeNo && <QRCode value={prizeNo} size={240} level="H" />}
          </div>
        </div>
      )}

      <style jsx global>{`
        .style-179542 {
        }
        .${prefixCls}__flex {
          padding: ${Styles.sm};
        }
        .${prefixCls}__code {
          padding: ${Styles.md} 0;
        }
        .${prefixCls}__clipboard {
          background: transparent;
          border: 0;
        }
      `}</style>
      <style jsx>{`
        .style-179542 {
        }
        .coupon {
          position: relative;
          margin: 0 ${Styles.wind};
          background: ${Styles.color_theme};
          border: ${Styles.border};
          border-radius: 0.04rem;
        }
        .info {
          padding: ${Styles.space} ${Styles.wind};
          background: ${Styles.color_theme};
        }
        .amount {
          padding-right: ${Styles.wind};
          border-right: ${Styles.border};
        }
        .num {
          min-width: 0.24rem;
        }
        .code-main {
          padding: ${Styles.sm} ${Styles.wind};
          font-size: ${Styles.t_40};
          letter-spacing: 0.02rem;
          background: linear-gradient(
            166deg,
            rgba(64, 88, 189, 1) 0%,
            rgba(1, 22, 83, 1) 100%
          );
          border-radius: 0.08rem;
        }
      `}</style>
    </Layout>
  );
};

Detail.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(observer(Detail));
