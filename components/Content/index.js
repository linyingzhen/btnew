/**
 * const prefixCls = 'style-299751';
 * const images = '/static/images/components/Content';
 * @Author: czy0729
 * @Date: 2018-07-04 18:40:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-28 20:26:07
 * @Path m.benting.com.cn /components/Content/index.js
 */
import React from 'react';
import classNames from 'classnames';
import Utils from '@utils';

const prefixCls = 'c-content';

const Content = props => {
  const { left, atList = [], className, children, ...other } = props;

  const formatAtFn = str => {
    const match = [];

    if (atList) {
      atList.forEach(item => {
        if (str.indexOf(item.name) !== -1) {
          match.push(`@${item.name}`);
        }
      });
    }

    let _str = str;
    if (match.length) {
      const reg = new RegExp(`${match.join('|')}`, 'g');

      _str = Utils.stringSplitToArray(str, reg, '', 't-primary', name => ({
        onClick: e => {
          e.stopPropagation();

          const { id } = atList.find(item => `@${item.name}` === name);
          Utils.router.push(`/person/zone?id=${id}`, `/person/zone/${id}`);
        }
      }));
    }

    return _str;
  };

  let content;
  if (typeof children !== 'string' || children.indexOf('\n') === -1) {
    content = Utils.emojify(children, formatAtFn);
  } else {
    content = [];

    children.split('\n').forEach((item, index) => {
      if (index === 0) {
        if (item !== '') {
          content.push(Utils.emojify(item, formatAtFn));
        }
      } else {
        /* eslint-disable-next-line */
        content.push(<br key={index} />);

        if (item !== '') {
          content.push(Utils.emojify(item, formatAtFn));
        }
      }
    });
  }

  return (
    <div className={classNames(prefixCls, className)} {...other}>
      {left}
      {content}

      <style jsx global>{`
        .c-content {
          line-height: 1.5;
          word-wrap: break-word;
        }
        .${prefixCls} br + br + br {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Content;
