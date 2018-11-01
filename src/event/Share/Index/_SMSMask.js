import React from 'react';
import PropTypes from 'prop-types';
import { observer, form } from '@';
import { Modal } from 'antd-mobile';
import { Flex, Icon, Form } from '@components';
import Styles from '@styles';
import Utils from '@utils';

const SMSMask = (props, { $ }) => {
  const { form, onSubmit, show } = props;

  return (
    <Modal visible={show} animationType="slide-up">
      <div className="modal t-c">
        <Flex
          justify="between"
          key="1"
          style={{ borderBottom: '1px solid #ccc' }}
        >
          <Flex justify="center" align="center" key="2">
            <Icon type="me-circle" className="t-32" key="3" />
            <Form form={form} className="ml-sm" key="4">
              <Form.Input
                name="phone"
                // option={Const.rules.gen('mobile')}
                type="phone"
                placeholder="请输入好友手机号码"
              />
            </Form>
          </Flex>
          <Icon
            key="6"
            className="t-32"
            type="right"
            onClick={() => {
              Utils.checkLogin(() => {
                onSubmit(form, value => {
                  $.do.doSend(value);
                  $.page.hideSMSModal();
                });
              });
            }}
          />
        </Flex>
        <Icon
          key="7"
          type="cross"
          className="close t-32"
          onClick={$.page.hideSMSModal}
        />
      </div>
      <style jsx>{`
        .modal {
          padding: 3.5rem ${Styles.wind} 0 ${Styles.wind};
        }
      `}</style>
      <style jsx global>{`
        .close {
          margin-top: 5.5rem !important;
        }
        .am-modal-content {
          background: #fff !important;
          opacity: 0.5;
        }
      `}</style>
    </Modal>
  );
};

SMSMask.contextTypes = {
  $: PropTypes.object
};

export default form(observer(SMSMask));
