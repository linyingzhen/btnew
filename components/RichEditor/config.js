/**
 * const prefixCls = 'style-117634';
 * const images = '/static/images/components/RichEditor';
 * @Author: czy0729
 * @Date: 2018-07-11 18:45:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-05 17:40:29
 * @Path m.benting.com.cn /components/RichEditor/config.js
 */
import Styles from '@styles';

export const inlineTypes = [
  {
    label: 'bold',
    style: 'BOLD'
  },
  {
    label: 'italic',
    style: 'ITALIC'
  }
];

export const blockTypes = [
  {
    label: 'h',
    style: 'header-two'
  },
  {
    label: 'ul',
    style: 'unordered-list-item'
  },
  {
    label: 'ol',
    style: 'ordered-list-item'
  }
];

export const colors = [
  {
    label: Styles.color_danger,
    style: 'red'
  },
  {
    label: '#ffce54',
    style: 'yellow'
  },
  {
    label: '#37bc9b',
    style: 'green'
  },
  {
    label: Styles.color_primary,
    style: 'blue'
  },
  {
    label: '#967ADC',
    style: 'purple'
  }
];

export const colorStyleMap = {
  red: {
    color: Styles.color_danger
  },
  yellow: {
    color: '#FFCE54'
  },
  green: {
    color: '#37BC9B'
  },
  blue: {
    color: Styles.color_primary
  },
  purple: {
    color: '#967ADC'
  },
  gray: {
    color: '#AAB2BD'
  }
};
