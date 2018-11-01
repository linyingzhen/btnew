/**
 * const prefixCls = 'style-182547';
 * const images = '/static/images/src/index/Chat';
 * @Author: czy0729
 * @Date: 2018-10-21 17:46:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-21 20:24:42
 * @Path bt_mb_new /src/index/Chat/_Extra.js
 */
import React from 'react';
import { observer } from '@';
import { Upload, Icon } from '@components';
import Utils from '@utils';

const prefixCls = 'style-182547';

const _Extra = props => {
  const { onUploadImageSuccess = Function.prototype, disabled } = props;

  return (
    <>
      <Icon
        className="t-56 t-sub"
        type="pic"
        onClick={() => {
          if (disabled) {
            return;
          }

          document.querySelector(`.${prefixCls}__upload-image > input`).click();
        }}
      />
      <Upload
        className={`${prefixCls}__upload-image`}
        data={{
          iswatermark: 1
        }}
        beforeUpload={() => Utils.loading('上传中...')}
        style={{ display: 'none' }}
        onSuccess={result => {
          const { code, data } = result;

          Utils.hideToast();

          if (code !== 0) {
            Utils.light(`文件上传失败, ${result.err}`);
            return;
          }

          onUploadImageSuccess(`${data.targetPath}/${data.name}`);
        }}
      />
    </>
  );
};

export default observer(_Extra);
