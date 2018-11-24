/**
 * const prefixCls = 'style-679252';
 * const images = '/static/images/src/account/Bank';
 * @Author: czy0729
 * @Date: 2018-10-07 14:41:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-19 10:06:37
 * @Path m.benting.com.cn /src/account/Bank/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectV2, form, observer } from '@';
import { Form } from '@components';
import { Layout, Tips } from '@_';
import Const from '@const';
import Styles from '@styles';
import { bankDS } from '@ds';
import store from './store';

const prefixCls = 'style-679252';

const Bank = (props, { $ }) => {
  const { form, onSubmit } = props;
  const bankName = form.getFieldValue('bankName') || ['工商银行'];
  const isNeedBrand =
    bankName[0] != '工商银行' &&
    bankName[0] != '农业银行' &&
    bankName[0] != '中国银行' &&
    bankName[0] != '建设银行';

  return (
    <Layout title="绑定银行卡" bd={null}>
      <div className="wrap">
        <p className="t-48 l-66 t-b">绑定银行卡</p>
      </div>
      <Form className={`${prefixCls}__form`} form={form} label>
        <Form.Picker
          name="bankName"
          label="银行"
          option={Const.rules.required}
          data={bankDS}
        />
        {isNeedBrand && (
          <Form.Input
            label="支行名称"
            name="branchName"
            option={Const.rules.required}
          />
        )}
        <Form.Input
          label="银行卡号"
          name="bankNo"
          option={Const.rules.gen('bank')}
          type="number"
        />
        <Form.Input
          label="持卡人"
          name="cardUsername"
          placeholder="请输入"
          option={Const.rules.required}
        />
      </Form>
      <Tips className="mt-32">
        本银行卡用于参与本站后续所有活动的奖励金发放，绑定之后无法修改，请认真核对并填写正确的银行卡信息。
      </Tips>
      <Form.Button onClick={() => onSubmit(form, $.do.submit)}>
        绑定
      </Form.Button>

      <style jsx global>{`
        .style-679252 {
        }
        .${prefixCls}__form {
          margin-top: 0;
          background: ${Styles.color_theme};
        }
      `}</style>
      <style jsx>{`
        .style-679252 {
        }
        .wrap {
          padding: ${Styles.space} ${Styles.wind};
          background: ${Styles.color_theme};
        }
      `}</style>
    </Layout>
  );
};

Bank.contextTypes = {
  $: PropTypes.object
};

export default injectV2(store)(form(observer(Bank)));
