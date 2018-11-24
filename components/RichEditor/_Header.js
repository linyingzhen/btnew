/**
 * const prefixCls = 'style-151822';
 * const images = '/static/images/components/RichEditor';
 * @Author: czy0729
 * @Date: 2018-11-05 21:45:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-06 11:35:13
 * @Path bt_mb_new /components/RichEditor/_Header.js.git
 */
import React from 'react';
import Utils from '@utils';
import Header from '../Header';
import Flex from '../Flex';
import Icon from '../Icon';
import BtnView from './_BtnView';

const _Header = props => {
  const { editorState, title, onOk } = props;

  return (
    <Header
      show
      hd={<Icon className="t-34" type="cross" onClick={Utils.router.back} />}
      ft={
        <Flex>
          <BtnView editorState={editorState} title={title} />
          <span
            className="t-34 l-48 t-primary ml-md"
            onClick={() => Utils.onConfirm('确定发布贴子？', onOk)}
          >
            发布
          </span>
        </Flex>
      }
      style={{
        background: '#e9e9e9'
      }}
    />
  );
};

export default _Header;
