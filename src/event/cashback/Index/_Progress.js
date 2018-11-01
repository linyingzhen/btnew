/**
 * const prefixCls = 'style-105730';
 * const images = '/static/images/src/event/cashback/Index';
 * @Author: czy0729
 * @Date: 2018-10-15 16:33:04
 * @Last Modified by:   czy0729
 * @Last Modified time: 2018-10-15 16:33:04
 * @Path m.benting.com.cn /src/event/cashback/Index/_Progress.js
 */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Flex } from '@components';
import Utils from '@utils';
import { images, typeDS } from './ds';

const prefixCls = 'style-105730';
const getNode = (type, isLast) => {
  switch (Utils.getLabel(typeDS, type)) {
    case '信息提交成功':
    case '信息审核通过':
    case '重新提交信息成功':
    case '奖金发放成功':
    case '报名成功':
      return isLast ? (
        <img src={`${images}/green_active.png`} alt="" />
      ) : (
        <img src={`${images}/green.png`} alt="" />
      );

    default:
      return isLast ? (
        <img src={`${images}/red_active.png`} alt="" />
      ) : (
        <img src={`${images}/red.png`} alt="" />
      );
  }
};

const getEditBtn = (type, isLast, id) => {
  if (!isLast) return null;

  const label = Utils.getLabel(typeDS, type);
  if (label !== '信息审核失败' && label !== '奖金发放失败') return null;

  return (
    <img
      className="img-rewrite"
      src={`${images}/rewrite.png`}
      alt=""
      onClick={() =>
        Utils.router.push(
          `/event/cashback/submit?id=${id}`,
          `/event/cashback/submit/${id}`
        )
      }
    />
  );
};

const _Progress = (props, { $ }) => {
  const { className } = props;
  const { id } = $.params.params;
  const { list } = $.getState('progress');

  return (
    <div className={classNames(prefixCls, className)}>
      <img className="img-progress" src={`${images}/progress.png`} alt="" />
      {list.map((item, index) => {
        const { type, time, remarks } = item;
        const isLast = list.length === index + 1;

        return (
          <Flex
            key={item.id}
            className={`${prefixCls}__item mt-sm`}
            direction="column"
          >
            {index == 0 ? (
              <img src={`${images}/line_0.png`} alt="" />
            ) : (
              <img src={`${images}/line_1.png`} alt="" />
            )}
            {getNode(type, isLast)}
            {getEditBtn(type, isLast, id)}
            <p className="t-32 t-void mt-sm">{Utils.getLabel(typeDS, type)}</p>
            <p className="t-24 t-void mt-xs">{Utils.lastDate(time)}</p>
            {remarks && (
              <p className="t-24 t-void mt-xs t-c">{`（${remarks}）`}</p>
            )}
          </Flex>
        );
      })}

      <style jsx>{`
        .style-105730 {
          position: relative;
          margin-top: 1rem;
        }
        .img-progress {
          width: 2.68rem;
          height: 0.88rem;
        }
      `}</style>
    </div>
  );
};

_Progress.contextTypes = {
  $: PropTypes.object
};

export default observer(_Progress);
