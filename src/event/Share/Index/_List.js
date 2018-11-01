import React from 'react';
import PropTypes from 'prop-types';
import { observer, form } from '@';
import { List, NativeShare, Icon } from '@components';
import Const from '@const';
import Utils from '@utils';

const ShareList = (props, { $ }) => {
  const code = $.getState('code');
  const { niname } = $.getState('userInfo');
  return (
    <List className="mt-lg">
      <List.Item
        thumb={<Icon type="message" className="t-28" />}
        arrow="horizontal"
        onClick={$.page.showSMSModal}
      >
        短信邀请
      </List.Item>
      <List.Item
        thumb={<Icon type="link" className="t-28" />}
        arrow="horizontal"
      >
        <NativeShare
          config={{
            icon: 'https://www.nidosport.com/common/images/share_logo.png',
            link: `${Const.__WEB_ORGIN__}/event/share_regist/${code}`,
            title: `${niname}邀请您加入灵动`,
            desc: Const.__WX_DESC__
            // from: ''
          }}
          actionSheetConfig={{
            message: '分享邀请链接到'
          }}
        >
          发送链接邀请
        </NativeShare>
      </List.Item>
      <List.Item
        thumb={<Icon type="list" className="t-28" />}
        arrow="horizontal"
        onClick={() => Utils.router.push('/event/share/record')}
      >
        我的邀请记录
      </List.Item>
      <style jsx global>{`
        .am-list-item {
          padding-left: 0 !important;
        }
        .c-form {
          margin-top: 0 !important;
        }
        .am-list-item .am-list-line{
          padding-right: 0 !important;
        }
      `}</style>
    </List>
  );
};
ShareList.contextTypes = {
  $: PropTypes.object
};

export default form(observer(ShareList));
