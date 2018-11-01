/**
 * const prefixCls = 'style-199619';
 * const images = '/static/images/components/Form';
 * @Author: czy0729
 * @Date: 2018-08-13 15:17:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-08-13 15:21:22
 * @Path m.benting.com.cn /components/Form/Button.js
 */
import React from 'react';
import classNames from 'classnames';
import Styles from '@styles';
import Button from '../Button';

const prefixCls = 'c-form-button';

const FormButton = props => {
  const { className, children, ...other } = props;

  return (
    <div className={classNames(prefixCls, className, 'mt-lg')}>
      <Button type="primary" {...other}>
        {children}
      </Button>

      <style jsx>{`
        .c-form-button {
          padding: 0 ${Styles.wind};
        }
      `}</style>
    </div>
  );
};

export default FormButton;
