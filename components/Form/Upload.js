/**
 * const prefixCls = 'style-107622';
 * const images = '/static/images/components/Form';
 * @Author: czy0729
 * @Date: 2018-09-03 17:40:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-09-03 18:50:24
 * @Path m.benting.com.cn /components/Form/Upload.js
 */
import React from 'react';
import classNames from 'classnames';
import { List, InputItem, Flex } from 'antd-mobile';
import Utils from '@utils';
import Styles from '@styles';
import AMUpload from '../Upload';
import Icon from '../Icon';
import Img from '../Img';
import utils from './utils';

const prefixCls = 'c-form-upload';

export default class Upload extends React.Component {
  state = {
    src: this.props.src || ''
  };

  render() {
    const {
      form,
      initialValue,
      option,
      title,
      label,
      name,
      right,
      data,
      extra,
      className,
      disabled = false
    } = this.props;
    const { src } = this.state;

    // 关键：form改变后要以form的值为主，不再使用initialValue，并构造upload需要的数据结构
    const value = form.getFieldValue(name);
    let _value;
    if (src) {
      _value = src;
    } else if (value) {
      _value = value;
    } else {
      _value = initialValue || '';
    }

    return (
      <List.Item
        className={classNames(
          prefixCls,
          className,
          utils.getFormItemCls(name),
          {
            [`${prefixCls}_disabled-input`]: !!_value
          }
        )}
      >
        {title && <div className="mb-d">{title}</div>}
        <Flex>
          <Flex.Item>
            <Flex justify={right || extra ? 'between' : undefined}>
              {label && (
                <div className="am-input-label am-input-label-5">
                  {label && utils.getLabelDecorator(option)(label)}
                </div>
              )}
              <AMUpload
                disabled={disabled}
                beforeUpload={() => Utils.loading('上传中...')}
                data={data}
                onSuccess={result => {
                  const { data } = result;

                  this.setState(
                    {
                      src: `${data.targetPath}/${data.name}`
                    },
                    () =>
                      form.setFieldsValue({
                        [name]: data.fileId
                      })
                  );

                  Utils.hideToast();
                }}
              >
                {_value ? (
                  <Img
                    className={`${prefixCls}__upload`}
                    src={_value || value}
                  />
                ) : (
                  <Flex className={`${prefixCls}__upload`} justify="center">
                    <Icon className="t-48 t-sub" type="plus" />
                  </Flex>
                )}
              </AMUpload>
              {extra && <div className="am-input-extra">{extra}</div>}
            </Flex>
          </Flex.Item>
          <div
            className="am-list-arrow am-list-arrow-horizontal"
            aria-hidden="true"
          />
        </Flex>
        <div style={{ display: 'none' }}>
          <InputItem
            {...form.getFieldProps(name, {
              initialValue,
              ...option
            })}
          />
        </div>

        <style jsx global>{`
          .c-form-upload {
          }
          .${prefixCls}__upload {
            width: 1.6rem !important;
            height: 1.6rem !important;
            border: ${Styles.border};
          }
        `}</style>
      </List.Item>
    );
  }
}
