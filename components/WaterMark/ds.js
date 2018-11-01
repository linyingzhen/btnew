/* eslint-disable no-bitwise, no-restricted-globals */
/**
 * const prefixCls = 'style-183766';
 * const images = '/static/images/components/WaterMark';
 * @Author: czy0729
 * @Date: 2018-10-07 10:39:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2018-10-07 10:41:03
 * @Path m.benting.com.cn /components/WaterMark/ds.js
 */
const svgNS = 'http://www.w3.org/2000/svg';

function createTag(tag, objAttr) {
  const oTag = document.createElementNS(svgNS, tag);

  Object.keys(objAttr).forEach(key => {
    oTag.setAttribute(key, objAttr[key]);
  });

  return oTag;
}

function utf8Encode(string) {
  const _string = string.replace(/\r\n/g, '\n');
  let utftext = '';

  for (let n = 0; n < _string.length; n += 1) {
    const c = _string.charCodeAt(n);

    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }
  }

  return utftext;
}

function encode(input) {
  let output = '';
  let chr1;
  let chr2;
  let chr3;
  let enc1;
  let enc2;
  let enc3;
  let enc4;
  let i = 0;
  const _keyStr =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  const _input = utf8Encode(input);

  while (i < _input.length) {
    chr1 = _input.charCodeAt(i);
    i += 1;

    chr2 = _input.charCodeAt(i);
    i += 1;

    chr3 = _input.charCodeAt(i);
    i += 1;

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = 64;
      enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output =
      output +
      _keyStr.charAt(enc1) +
      _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) +
      _keyStr.charAt(enc4);
  }

  return output;
}

function getSVGTextBase64(text, style) {
  const svgStyle = {
    width: '50px',
    height: '50px',
    'text-anchor': 'left',
    'font-size': '12px',
    transform: 'translate(0 50) rotate(-15)',
    x: '0',
    y: '0',
    ...style
  };

  const oSvg = createTag('svg', {
    xmlns: svgNS,
    width: svgStyle.width,
    height: svgStyle.height
  });

  text.forEach(item => {
    const oText = createTag('text', { ...svgStyle, ...item.style });
    oText.innerHTML = item.text;
    oSvg.appendChild(oText);
  });

  const svgStr = new XMLSerializer().serializeToString(oSvg);
  const bgUrl = `data:image/svg+xml;base64,${encode(svgStr)}`;

  return bgUrl;
}

export { getSVGTextBase64 };
