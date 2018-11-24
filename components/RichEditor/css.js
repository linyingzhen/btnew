/**
 * const prefixCls = 'style-567561';
 * const images = '/static/images/components/RichEditor';
 * @Author: czy0729
 * @Date: 2018-11-07 09:38:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-07 09:40:51
 * @Path bt_mb_new /components/RichEditor/css.js.git
 */
import css from 'styled-jsx/css';
import Styles from '@styles';

export const resetCSS = css.global`
  /* draft-js reset */
  .DraftEditor-editorContainer,
  .DraftEditor-root,
  .public-DraftEditor-content {
    height: inherit;
    text-align: initial;
  }
  .public-DraftEditor-content[contenteditable='true'] {
    -webkit-user-modify: read-write-plaintext-only;
  }
  .DraftEditor-root {
    position: relative;
  }
  .DraftEditor-editorContainer {
    position: relative;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0);
    border-left: 0.01rem solid transparent;
  }
  .public-DraftEditor-block {
    position: relative;
  }
  .DraftEditor-alignLeft .public-DraftStyleDefault-block {
    text-align: left;
  }
  .DraftEditor-alignLeft .public-DraftEditorPlaceholder-root {
    left: 0;
    text-align: left;
  }
  .DraftEditor-alignCenter .public-DraftStyleDefault-block {
    text-align: center;
  }
  .DraftEditor-alignCenter .public-DraftEditorPlaceholder-root {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
  .DraftEditor-alignRight .public-DraftStyleDefault-block {
    text-align: right;
  }
  .DraftEditor-alignRight .public-DraftEditorPlaceholder-root {
    right: 0;
    text-align: right;
  }
  .public-DraftEditorPlaceholder-root {
    position: absolute;
    z-index: 1;
    color: ${Styles.color_sub};
  }
  .public-DraftEditorPlaceholder-hasFocus {
    color: ${Styles.color_sub};
  }
  .DraftEditorPlaceholder-hidden {
    display: none;
  }
  .public-DraftStyleDefault-block {
    position: relative;
    white-space: pre-wrap;
  }
  .public-DraftStyleDefault-ltr {
    direction: ltr;
    text-align: left;
  }
  .public-DraftStyleDefault-rtl {
    direction: rtl;
    text-align: right;
  }
  .public-DraftStyleDefault-listLTR {
    direction: ltr;
  }
  .public-DraftStyleDefault-listRTL {
    direction: rtl;
  }
  .public-DraftStyleDefault-ol,
  .public-DraftStyleDefault-ul {
    padding: 0;
    margin: 0.16rem 0;
  }
  .public-DraftStyleDefault-depth0.public-DraftStyleDefault-listLTR {
    margin-left: 0.75rem;
  }
  .public-DraftStyleDefault-depth0.public-DraftStyleDefault-listRTL {
    margin-right: 0.75rem;
  }
  .public-DraftStyleDefault-depth1.public-DraftStyleDefault-listLTR {
    margin-left: 1.5rem;
  }
  .public-DraftStyleDefault-depth1.public-DraftStyleDefault-listRTL {
    margin-right: 1.5rem;
  }
  .public-DraftStyleDefault-depth2.public-DraftStyleDefault-listLTR {
    margin-left: 2.25rem;
  }
  .public-DraftStyleDefault-depth2.public-DraftStyleDefault-listRTL {
    margin-right: 2.25rem;
  }
  .public-DraftStyleDefault-depth3.public-DraftStyleDefault-listLTR {
    margin-left: 3rem;
  }
  .public-DraftStyleDefault-depth3.public-DraftStyleDefault-listRTL {
    margin-right: 3rem;
  }
  .public-DraftStyleDefault-depth4.public-DraftStyleDefault-listLTR {
    margin-left: 3.75rem;
  }
  .public-DraftStyleDefault-depth4.public-DraftStyleDefault-listRTL {
    margin-right: 3.75rem;
  }
  .public-DraftStyleDefault-unorderedListItem {
    position: relative;
    list-style-type: square;
  }
  .public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth0 {
    list-style-type: disc;
  }
  .public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth1 {
    list-style-type: circle;
  }
  .public-DraftStyleDefault-orderedListItem {
    position: relative;
    list-style-type: none;
  }
  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listLTR:before {
    position: absolute;
    left: -0.36rem;
    width: 0.3rem;
    text-align: right;
  }
  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listRTL:before {
    position: absolute;
    right: -0.36rem;
    width: 0.3rem;
    text-align: left;
  }
  .public-DraftStyleDefault-orderedListItem:before {
    content: counter(ol0) '. ';
    counter-increment: ol0;
  }
  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth1:before {
    content: counter(ol1) '. ';
    counter-increment: ol1;
  }
  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth2:before {
    content: counter(ol2) '. ';
    counter-increment: ol2;
  }
  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth3:before {
    content: counter(ol3) '. ';
    counter-increment: ol3;
  }
  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth4:before {
    content: counter(ol4) '. ';
    counter-increment: ol4;
  }
  .public-DraftStyleDefault-depth0.public-DraftStyleDefault-reset {
    counter-reset: ol0;
  }
  .public-DraftStyleDefault-depth1.public-DraftStyleDefault-reset {
    counter-reset: ol1;
  }
  .public-DraftStyleDefault-depth2.public-DraftStyleDefault-reset {
    counter-reset: ol2;
  }
  .public-DraftStyleDefault-depth3.public-DraftStyleDefault-reset {
    counter-reset: ol3;
  }
  .public-DraftStyleDefault-depth4.public-DraftStyleDefault-reset {
    counter-reset: ol4;
  }
`;
