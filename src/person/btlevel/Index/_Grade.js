/**
 * const prefixCls = 'style-142296';
 * const images = '/static/images/src/person/btlevel/Index';
 * @Author: lyz0720
 * @Date: 2018-10-26 10:48:19
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-11-13 17:24:04
 * @Path bt_mb_new /src/person/btlevel/Index/_Grade.js.git
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Flex, Progress } from 'antd-mobile';
import { Img, Button } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import { images, gradeData, getBTLevel } from './ds';

const prefixCls = 'styles-142296';

const _Grade = (props, { $ }) => {
  const { btexp = 0, btlevel = 0, className, _loaded } = $.getState('userInfo');

  const _point = gradeData[parseInt(btlevel) + 1].point;
  const percent = parseInt((btexp / _point) * 100);

  return (
    <div className={classNames(prefixCls, className, 't-c')}>
      {_loaded && (
        <>
          <p className="t-26 l-36 t-sub t-c">
            <span>升级还需消费</span>
            <span className="t-danger ml-xs mr-xs">
              {_point > btexp ? _point - btexp : btexp}
            </span>
            <span>元</span>
          </p>
          <Flex className="t-24" align="start" justify="between">
            <div className="t-c" style={{ marginTop: '-.16rem' }}>
              <Img
                src={`${images}/${btlevel}.png`}
                size="0.64rem"
                transparent
              />
              <div className="t-24 t-sub mt-8">{getBTLevel(btlevel)}</div>
            </div>
            <Flex.Item className="mt-12 ml-sm" style={{ marginLeft: '0' }}>
              <Progress
                position="normal"
                percent={percent > 100 ? 100 : percent}
              />
              <p className="t-24 t-sub t-c mt-12">
                <span>您已累计消费</span>
                <span className="t-danger ml-xs mr-xs">{btexp}</span>
                <span>/{_point} 元</span>
              </p>
            </Flex.Item>
            <div className="t-c ml-sm" style={{ marginTop: '-.16rem' }}>
              <Img
                src={`${images}/${parseInt(btlevel) + 1}.png`}
                size="0.64rem"
                transparent
              />
              <div className="t-24 t-sub mt-8">
                {getBTLevel(parseInt(btlevel) + 1)}
              </div>
            </div>
          </Flex>
          <Button
            className={`${prefixCls}__btn`}
            type="primary"
            onClick={() => Utils.router.push('/service')}
          >
            添加消费订单
          </Button>
        </>
      )}

      <style jsx>{`
        .styles-142296 {
          padding: 0 0.64rem 1rem;
          min-height: 3.58rem;
        }
        .rule {
          text-decoration: underline;
        }
      `}</style>
      <style jsx global>{`
        .styles-142296 {
          background: ${Styles.color_void};
        }
        .${prefixCls} .am-flexbox {
          overflow: visible !important;
        }
        .${prefixCls} .am-progress-outer {
          border-radius: 0.08rem;
        }
        .${prefixCls} .am-progress-bar {
          border: 0.04rem solid #476dd9;
          border-radius: 0.08rem;
        }
        .${prefixCls}__btn {
          width: 4rem;
          height: 0.8rem;
          margin: 0.4rem auto 0;
          font-size: 0.3rem;
          line-height: 0.8rem;
          box-shadow: 0 0.16rem 0.32rem 0 rgba(46, 142, 255, 0.32);
        }
      `}</style>
    </div>
  );
};

_Grade.contextTypes = {
  $: PropTypes.object
};

export default observer(_Grade);
