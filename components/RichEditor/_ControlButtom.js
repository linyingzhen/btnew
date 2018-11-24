/**
 * const prefixCls = 'style-302886';
 * const images = '/static/images/components/RichEditor';
 * @Author: czy0729
 * @Date: 2018-07-12 09:49:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-05 17:14:37
 * @Path m.benting.com.cn /components/RichEditor/_ControlButtom.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EditorState } from 'draft-js';
import { Flex } from '@components';
import Utils from '@utils';
import Styles from '@styles';
import Button from '../Button';
import BtnControl from './_BtnControl';
import BtnView from './_BtnView';

const prefixCls = 'style-302886';

export default class _ControlButtom extends React.Component {
  static propsTypes = {
    onOk: PropTypes.func,
    onGetAutoSave: PropTypes.func
  };

  static defaultProps = {
    onOk: Function.prototype,
    onGetAutoSave: Function.prototype
  };

  getBackup = () => {
    const { localStorageKey, onGetAutoSave } = this.props;
    const backupDS = Utils.lsGet(localStorageKey, []);

    if (backupDS.length === 0) {
      Utils.light('没有任何自动保存数据');
    } else {
      const DS = backupDS.map(item => ({
        icon: Utils.date('H:i', item.date / 1000),
        title: Utils.date('m-d', item.date / 1000)
      }));

      Utils.shareActionSheet(
        DS,
        index => {
          if (backupDS[index]) {
            Utils.onConfirm('恢复会覆盖当前数据，确定恢复?', () => {
              onGetAutoSave(backupDS[index]);
            });
          }
        },
        {
          message: '请选择你要恢复的数据',
          destructiveButtonIndex: undefined
        }
      );
    }
  };

  undo = () => {
    const { editorState, onChange } = this.props;

    const newEditorState = EditorState.undo(editorState);

    if (newEditorState) {
      onChange(newEditorState);
    }
  };

  redo = () => {
    const { editorState, onChange } = this.props;

    const newEditorState = EditorState.redo(editorState);

    if (newEditorState) {
      onChange(newEditorState);
    }
  };

  render() {
    const { editorState, advance, title, onOk, className } = this.props;

    return (
      <Flex className={classNames(prefixCls, className)}>
        <Flex.Item>
          <Flex>
            {advance && (
              <BtnControl
                label="back-fill"
                onClick={this.undo}
              />
            )}
            {advance && (
              <BtnControl
                className="ml-sm"
                label="forward-fill"
                onClick={this.redo}
              />
            )}
            <BtnControl
              className={advance ? 'ml-sm' : undefined}
              label="history"
              onClick={this.getBackup}
            />
          </Flex>
        </Flex.Item>
        <BtnView className="mr-sm" editorState={editorState} title={title} />
        <Button
          type="primary"
          size="sm"
          inline
          onClick={() => Utils.onConfirm('确定发布贴子？', onOk)}
        >
          发布
        </Button>

        <style jsx global>{`
          .style-302886 {
            position: fixed;
            z-index: 1;
            bottom: 0;
            left: 0;
            right: 0;
            padding: ${Styles.sm} ${Styles.wind};
            background-color: #e9e9e9;
          }
        `}</style>
      </Flex>
    );
  }
}
