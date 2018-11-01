/**
 * const prefixCls = 'style-136577';
 * const images = '/static/images/src/account/WW';
 * @Author: czy0729
 * @Date: 2018-10-07 12:26:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-17 09:18:09
 * @Path m.benting.com.cn /src/account/WW/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, form, observer } from '@';
import { Form } from '@components';
import { Layout, Tips } from '@_';
import Const from '@const';
import Utils from '@utils';
import Styles from '@styles';
import store from './store';

const prefixCls = 'style-136577';

const WW = (props, { $ }) => {
  const { form, onSubmit } = props;
  const { ww, _loaded } = $.getState('userInfo');

  if (!_loaded) {
    return null;
  }

  const isBind = !!ww;

  return (
    <Layout title="绑定旺旺" bd={null}>
      <div className="wrap">
        <p className="t-48 l-66 t-b">绑定旺旺</p>
      </div>
      <Form className={`${prefixCls}__form`} form={form} label>
        <Form.Input
          label="旺旺ID"
          name="ww"
          initialValue={ww}
          option={Const.rules.required}
          disabled={isBind}
        />
      </Form>
      <Tips className="mt-32">
        请注意：旺旺ID不是登录账号，是淘宝个人中心的【会员名】，会员名是唯一的。
        <span
          className="tool-link"
          onClick={() => Utils.router.push('/bbs/article/53017')}
        >
          查看详细
        </span>
      </Tips>
      <Tips className="mt-32">
        此旺旺ID用于参加本站的所有活动，一旦确定之后无法更改。
      </Tips>
      <Tips className="mt-32">
        后续所参加的活动如有需要在淘宝购买产品则必须用此旺旺ID进行购买，其他旺旺ID购买无效。
      </Tips>
      <Form.Button
        disabled={isBind}
        onClick={() => onSubmit(form, $.page.check)}
      >
        {isBind ? '已绑定' : '绑定'}
      </Form.Button>

      <style jsx global>{`
        .style-136577 {
        }
        .${prefixCls}__form {
          margin-top: 0;
          background: ${Styles.color_theme};
        }
      `}</style>
      <style jsx>{`
        .style-136577 {
        }
        .wrap {
          padding: ${Styles.space} ${Styles.wind};
          background: ${Styles.color_theme};
        }
      `}</style>
    </Layout>
  );
};

WW.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(form(observer(WW)));
