/**
 * const prefixCls = 'style-119845';
 * const images = '/static/images/common/styles';
 * @Author: czy0729
 * @Date: 2018-06-20 11:16:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-11-16 15:49:51
 * @Path m.benting.com.cn \common\styles\index.js
 */
import Const from '@const';

const space = 0.4;
const wind = 0.32;
const colorDanger = '#d0021b';
const colorBorder = '#e9e9e9';
const Styles = {
  /* ==================== color ==================== */
  color_theme: '#fff', // 白 (可能用于优化夜间主题)
  color_main: '#404040', // 主题色
  color_bg: 'rgba(243, 246, 248, 1)', // 背景色 #f3f6f8
  color_inner: 'rgba(238, 240, 244, 1)', // 内背景色 #eef0e4
  color_title: '#121212', // 字体标题色
  color_desc: '#121212', // 字体默认色 #404040
  color_sub: '#888', // '#9b9b9b', // 字体浅色
  color_wait: '#7289a5', // 字体等待色
  color_icon: '#ccc', // 图标颜色
  color_disabled: '#ccc', // 字体表单禁止色
  color_void: '#fff', // 字体白色
  color_primary: '#2e8eff', // 蓝色 (46, 142, 255)
  color_danger: colorDanger, // 红色
  color_success: '#52c41a', // 绿色
  color_warning: '#f5a623', // 橙色
  color_event: '#fff566', // 黄色
  color_gold: '#c6a96f', // 金色
  color_pink: '#fd4176', // 粉色
  color_lingdong: '#35e2aa', // 灵动主色调
  color_border: colorBorder, // 边框色
  color_tab_bar: '#fafafa', // tabbar

  /* ==================== unit ==================== */
  space: `${space}rem`, // 上
  space_raw: space, // 上原始
  wind: `${wind}rem`, // 两翼
  wind_raw: wind, // 两翼原始
  distance: '0.16rem', // 间距
  bottom: '0.4rem', // 下
  xs: '0.08rem', // 最小
  sm: '0.16rem', // 小
  md: '0.32rem', // 中
  lg: '0.64rem', // 大

  /* ==================== font ==================== */
  // font_family: '"lucida grande", "lucida sans unicode", lucida, "Helvetica Neue", helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif !important',
  // font_normal: '500',
  font_family:
    '"PingFang SC",SimHei,"Helvetica Neue",Helvetica,STHeiTi,sans-serif',
  font_normal: '400',
  font_bold: 'bold',
  font_medium: '500',
  font_form: '0.3rem',

  /* ==================== font-size ==================== */
  t_20: '0.22rem',
  t_22: '0.24rem',
  t_24: '0.26rem',
  t_26: '0.28rem',
  t_28: '0.3rem',
  t_30: '0.3rem',
  t_32: '0.32rem',
  t_34: '0.34rem',
  t_36: '0.36rem',
  t_40: '0.4rem',
  t_44: '0.44rem',
  t_48: '0.48rem',
  t_52: '0.52rem',
  t_56: '0.56rem',
  t_64: '0.64rem',
  t_72: '0.72rem',

  /* ==================== radius ==================== */
  radius_xs: '0.02rem',
  radius_sm: '0.06rem',

  /* ==================== other ==================== */
  border: `0.01rem solid ${colorBorder}`,
  boxShadow: '0.01rem 0.01rem 0.02rem rgba(0, 0, 0, 0.32)',

  /* ==================== z-index ==================== */
  z_header: 990,
  z_rich_editor_control: 991,
  z_fixed_input: 998,
  z_tabbar: 998,
  z_layout_icon: 999,
  z_mask: 999,
  z_fixed_money_input: 1001,
  z_fixed_textarea: 1001,
  z_img_view: 1001,
  z_rule: 1001,
  z_modal_wrap: 1002,

  /* ==================== mixin ==================== */
  _absolute: `
    position: absolute !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  `,
  _bg: `
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  `,
  _full: `
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  `,
  _padding: `
    padding: ${space} ${wind};
  `,
  _badge: {
    fontSize: '0.2rem',
    lineHeight: '0.34rem',
    color: colorDanger,
    background: 'transparent',
    border: `0.01rem solid ${colorDanger}`,
    borderRadius: '0.02rem'
  },
  _badgeFill: {
    minWidth: '0.28rem',
    height: '0.28rem',
    padding: '0 0.08rem',
    fontSize: '0.2rem',
    lineHeight: '0.26rem',
    color: '#fff',
    background: colorDanger,
    border: `0.01rem solid ${colorDanger}`,
    borderRadius: '0.16rem'
  }
};

export default Styles;

if (Const.__CLIENT__) {
  window.Styles = Styles;
}
