/**
 * const prefixCls = 'style-124445';
 * const images = '/static/images/src/bbs/Article/_Registration';
 * @Author: czy0729
 * @Date: 2018-07-13 18:00:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-24 23:35:20
 * @Path m.benting.com.cn /src/bbs/Article/_Registration/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Button, Link } from '@components';
import Utils from '@utils';

const prefixCls = 'style-124445';

const _Registration = (props, { $ }) => {
  const { className } = props;
  const { id } = $.params.params;
  const { registrationData = {} } = $.getState('detail');
  const registration = $.getState('registration');

  if (!registrationData.id) {
    return null;
  }

  let type;
  let disabled;
  let text;
  let onClick;

  // registration.status(-1=>取消报名, 0=>报名审核中, 1=>报名审核未通过, 2=>报名审核通过,
  // 3=>订单信息审核中, 4=>订单信息审核未通过, 5=>订单信息审核通过)
  if (registrationData.status != 1) {
    type = 'default';
    text = '活动未开启';
  } else {
    const startTime = parseInt(registrationData.start_time);
    const endTime = parseInt(registrationData.end_time);
    const now = Utils.getTimestamp();

    if (now < startTime) {
      // 报名未开始
      type = 'default';
      text = `活动将于${Utils.date('m-d H:i:s', startTime)}开始报名`;
    } else if (now >= startTime && now < endTime) {
      // 报名已开始
      if (!registration.id) {
        // 未报名
        const leftNum =
          parseInt(registrationData.num) - parseInt(registrationData.joinNum);

        if (!leftNum) {
          // 没有名额
          type = 'default';
          disabled = true;
          text = '名额已抢光';
        } else {
          // 还有名额
          type = 'danger';
          text = `还剩${leftNum}个报名名额，立即报名`;
          onClick = () =>
            Utils.router.push(
              `/bbs/registration?id=${id}`,
              `/bbs/registration/${id}`
            );
        }
      } else {
        // 已报名
        switch (parseInt(registration.status)) {
          case 1: // 报名审核未通过
            type = 'danger';
            text = '重新报名';
            onClick = () => Utils.router.push('/person/event/registration');
            break;

          case 2: // 报名审核成功
          case 3:
          case 4:
          case 5:
            type = 'wait';
            text = '报名成功，请等待活动开始';
            onClick = () => Utils.router.push('/person/event/registration');
            break;

          default:
            // 报名待审核
            type = 'wait';
            text = `前面还有${registration.waiting_num}人排队，请等待审核...`;
            onClick = () => Utils.router.push('/person/event/registration');
            break;
        }
      }
    } else {
      // 报名已结束
      switch (parseInt(registration.status)) {
        case 2: // 订单信息待提交
          type = 'primary';
          text = '活动进行中，请提交订单';
          onClick = () =>
            Utils.router.push(
              `/bbs/registration?id=${id}`,
              `/bbs/registration/${id}`
            );
          break;

        case 3: // 订单信息已提交，待审核
          type = 'wait';
          text = '订单已提交，待审核';
          onClick = () => Utils.router.push('/person/event/registration');
          break;

        case 4: // 订单信息审核未通过
          type = 'danger';
          text = '订单审核失败，请重新提交';
          onClick = () => Utils.router.push('/person/event/registration');
          break;

        case 5: // 订单信息审核通过
          type = 'primary';
          text = '订单审核成功，请等待发放奖励';
          onClick = () => Utils.router.push('/person/event/registration');
          break;

        default:
          // 没有参加活动
          type = 'default';
          disabled = true;
          text = '活动已结束';
          break;
      }
    }
  }

  return (
    <div className={classNames(prefixCls, className)}>
      <Button
        type={type}
        disabled={disabled}
        onClick={() => Utils.checkLogin(onClick)}
      >
        {text}
      </Button>
      <p className="t-28 l-40 t-c mt-md">
        <span className="t-sub">审核中：</span>
        <span className="t-danger">{registrationData.waitNum}</span>
        <span className="t-sub"> / 已通过：</span>
        <span className="t-danger">{registrationData.successNum}</span>
      </p>
      <p className="t-28 l-40 t-c mt-d">
        <span className="t-sub">不合格：</span>
        <span className="t-danger">{registrationData.failNum}</span>
        <span className="t-sub"> / 已报名：</span>
        <span className="t-danger">{registrationData.joinNum}</span>
        <span className="t-sub"> / 总名额：</span>
        <span className="t-danger">{registrationData.passNum}</span>
      </p>
      <div className="t-c mt-lg">
        <Link className="tool-link" href="/person/event/registration" login>
          前往我的活动
        </Link>
      </div>
    </div>
  );
};

_Registration.contextTypes = {
  $: PropTypes.object
};

export default observer(_Registration);
