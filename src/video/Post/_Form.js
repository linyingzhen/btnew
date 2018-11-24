/**
 * const prefixCls = 'style-873451';
 * const images = '/static/images/src/video/Post';
 * @Author: czy0729
 * @Date: 2018-07-26 12:28:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-05 09:33:17
 * @Path m.benting.com.cn /src/video/Post/_Form.js
 */
import React from 'react';
import classNames from 'classnames';
import { observer } from '@';
import { Form } from '@components';
import Const from '@const';

const prefixCls = 'style-873451';

const _Form = props => {
  const { form, className } = props;

  return (
    <Form className={classNames(prefixCls, className)} form={form} label>
      <Form.Input label="标题" name="tit" option={Const.rules.required} />
      <Form.Textarea label="描述" name="introCon" rows={4} />
    </Form>
  );
};

export default observer(_Form);
