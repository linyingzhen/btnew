/**
 * const prefixCls = 'style-197921';
 * const images = '/static/images/src/bbs/Article/_Competition';
 * @Author: czy0729
 * @Date: 2018-07-14 23:37:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-29 18:05:11
 * @Path m.benting.com.cn /src/bbs/Article/_Competition/index.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import { PayConfirm } from '@components';
import Player from './_Player';
import Record from './_Record';
import Award from './_Award';

const _Competition = (props, { $ }) => {
  const { className } = props;
  const { guessingData = {} } = $.getState('detail');
  const { show, type, amount } = $.getState('_payConfirm');

  if (!guessingData.competition) {
    return null;
  }

  return (
    <>
      <Player className={className} />
      {$.isCompetitionEnd ? (
        <Award className="mt-d" />
      ) : (
        <Record className="mt-d" />
      )}
      {!$.isCompetitionEnd && (
        <PayConfirm
          show={show}
          type={type}
          amount={amount}
          onClose={$.page.hidePayConfirm}
          onConfirm={$.do.betting}
        />
      )}
    </>
  );
};

_Competition.contextTypes = {
  $: PropTypes.object
};

export default observer(_Competition);
