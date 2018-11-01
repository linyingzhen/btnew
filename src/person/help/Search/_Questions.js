/**
 * const prefixCls = 'style-168707';
 * const images = '/static/images/src/person/help/Search';
 * @Author: Jun
 * @Date: 2018-08-09 16:58:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 15:26:06
 * @Path m.benting.com.cn /src/person/help/Search/_Questions.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { Header } from '@_';
import { List } from '@components';

const prefixCls = 'style-168707';

const _Questions = (props, { $ }) => {
  const { className } = props;
  const { title } = $.getState();
  const { list } = $.getState('searchList');

  return (
    <List className={classNames(prefixCls, className)}>
      {title && <Header title={title} isList />}
      {list.map(item => (
        <List.Item
          key={item.tbId}
          href={`/person/help/detail?id=${item.tbId}`}
          as={`/person/help/detail/${item.tbId}`}
        >
          <p className="t-30 l-42 t-c1">{item.tit}</p>
        </List.Item>
      ))}
    </List>
  );
};

_Questions.contextTypes = {
  $: PropTypes.object
};

export default observer(_Questions);
