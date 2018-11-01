/**
 * const prefixCls = 'style-208794';
 * const images = '/static/images/src/person/help/Index';
 * @Author: Jun
 * @Date: 2018-09-08 09:47:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-08 11:43:26
 * @Path m.benting.com.cn /src/person/help/Index/_Questions.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from '@';
import { List, Icon, Flex } from '@components';
import { Header } from '@_';
import Styles from '@styles';

const prefixCls = 'style-208794';

const _Questions = (props, { $ }) => {
  const { className } = props;
  const { isLoading } = $.getState('_loadingState');
  const { list, _loaded } = $.getState('questions');

  let _list;
  if (_loaded) {
    _list = list;
  } else {
    _list = [{}, {}, {}, {}, {}];
  }

  return (
    <div className={classNames(prefixCls, className)}>
      <Header title="常见问题" isList />
      <List>
        {_list.map((item, index) => (
          <List.Item
            key={item.tbId || index}
            href={`/person/help/detail?id=${item.tbId}`}
            as={`/person/help/detail/${item.tbId}`}
          >
            <p className="t-30 l-42 t-c1">{item.tit}</p>
          </List.Item>
        ))}
        <List.Item onClick={$.page.changeQuestions}>
          <Flex justify="center">
            <span className="t-30 l-42 t-primary">换一换</span>
            <Icon
              className={classNames('t-26 t-primary ml-xs', {
                'tool-animate-rotate': isLoading
              })}
              type="refresh"
            />
          </Flex>
        </List.Item>
      </List>

      <style jsx>{`
        .style-208794 {
          background: ${Styles.color_theme};
        }
      `}</style>
    </div>
  );
};

_Questions.contextTypes = {
  $: PropTypes.object
};

export default observer(_Questions);
