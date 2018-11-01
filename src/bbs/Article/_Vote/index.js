/**
 * const prefixCls = 'style-136740';
 * const images = '/static/images/src/bbs/Article/_Vote';
 * @Author: czy0729
 * @Date: 2018-10-10 15:04:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-16 17:18:12
 * @Path m.benting.com.cn /src/bbs/Article/_Vote/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { Flex, Button, FixedTextarea } from '@components';
import Utils from '@utils';
import Form from './_Form';
import Detail from './_Detail';

const prefixCls = 'style-136740';

@observer
export default class _Vote extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  };

  componentWillUnmount() {
    const { $ } = this.context;

    $.page.hideVote();
    $.page.hideFixedTextarea();
  }

  render() {
    const { $ } = this.context;
    const { show: textareaShow, placeholder, onSubmit } = $.getState('_fixedTextarea');
    const { show } = $.getState('_vote');
    const { hasVoted } = $.getState('vote');
    const isVoted = hasVoted === 1;

    return (
      <div>
        {show &&
          (isVoted ? (
            <Detail onHide={$.page.hideVote} />
          ) : (
            <Form onHide={$.page.hideVote} onSubmit={$.do.voting} />
          ))}
        <FixedTextarea
          show={textareaShow}
          placeholder={placeholder}
          showUploadPicButton
          onSubmit={onSubmit}
          onClose={$.page.hideFixedTextarea}
        />
        <Flex className={prefixCls}>
          <Flex.Item>
            <Button
              type="danger"
              onClick={() =>
                Utils.checkLogin(() => Utils.checkWW(() => $.page.showVote()))
              }
            >
              {isVoted ? '最新投票结果' : '投票'}
            </Button>
          </Flex.Item>
          <Flex.Item style={{ marginLeft: 0 }}>
            <Button
              type="warning"
              onClick={() =>
                Utils.checkLogin(() =>
                  Utils.checkWW(() =>
                    $.page.onCommentClick({
                      placeholder:
                        '回复内容为大家喜欢或想入手本汀的什么作品，例如：我喜欢本汀的金迦潘，爱死她啦。。。或我想入手本汀桃园等等，最多可回复3次'
                    })))
              }
            >
              踩楼
            </Button>
          </Flex.Item>

          <style jsx global>{`
            .style-136740 {
              position: fixed;
              z-index: 1;
              right: 0;
              bottom: 0;
              left: 0;
            }
          `}</style>
        </Flex>
      </div>
    );
  }
}
