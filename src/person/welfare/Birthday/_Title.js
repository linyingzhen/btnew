import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@';
import Styles from '@styles';

const _Title = props => {
  const { title } = props;
  return (
    <div className="titlebox">
      <div className="line-left">&nbsp;</div>
      <div className="t-28 l-40 t-sub text">{title}</div>
      <div className="line-right">&nbsp;</div>
      <style jsx>{`
        .style-000000 {
        }
        .titlebox {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: ${Styles.wind} ${Styles.wind} 0;
        }
        .text {
          margin: 0 .18rem;
        }
        .line-left {
          width: 1rem;
          height: 0.04rem;
          background: linear-gradient(
            90deg,
            rgba(216, 216, 216, 0.27) 0%,
            rgba(216, 216, 216, 1) 100%
          );
        }
        .line-right {
          width: 1rem;
          height: 0.04rem;
          background: linear-gradient(
            270deg,
            rgba(216, 216, 216, 0.27) 0%,
            rgba(216, 216, 216, 1) 100%
          );
        }
      `}</style>
    </div>
  );
};

_Title.contextTypes = {
  $: PropTypes.object
};

export default observer(_Title);
