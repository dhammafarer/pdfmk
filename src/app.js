import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { clone } from 'ramda';
import colors from './colors';
import fonts from './fonts.js';

pdfMake.vfs = fonts.pdfmake.vfs;

console.log(pdfMake)

pdfMake.fonts = {
  nexa: {
    normal: 'nexaBold',
    bold: 'nexaBold'
  }
};

const primary = colors.bahamaBlue;
const secondary = colors.deepSkyBlue;
const tertiary = colors.apache;
const quartenary = colors.pictonBlue;
const gradient = [ primary, secondary, quartenary, primary ];


const fw = 600;
const noMargin = [-40, 0];

const separator = {
  canvas: [
    { type: 'rect', x: 0, y: 0, w: fw, h: 3, linearGradient: gradient},
  ],
  margin: noMargin
};

const docDefinition = {
  pageOrientation: 'portrait',
  content: [
    { text: 'PDF Document Title', style: 'header', margin: [0, 30] },
    clone(separator),
    {
      image: require('./assets/our-fleet-of-minibuses-three.jpg'),
      margin: [-50, 0]
    },
    clone(separator),
    {
      pageBreak: 'before',
      layout: 'lightHorizontalLines',
      table: {
        headerRows: 1,
        widths: ['*', '*', '*'],
        body: [
          [{ text: 'H1' }, 'H2', 'H3'],
          [{ text: 'First', bold: true }, 'Second', 'Third'],
          [{ text: 'First', bold: true }, 'Second', 'Third']
        ]
      }
    },
    'List example',
    {
      ul: [
        'Item 1',
        'Item 2',
        'Item 3'
      ]
    }
  ],
  styles: {
    header: {
      font: 'nexa',
      fontSize: 30,
      alignment: 'left',
      color: secondary,
      margins: [100, 0, 0, 10]
    }
  }
 };

const pdfDocGenerator = pdfMake.createPdf(docDefinition);
pdfDocGenerator.getDataUrl((dataUrl) => {
	const targetElement = document.querySelector('#app');
	const iframe = document.createElement('iframe');
	iframe.src = dataUrl;
	targetElement.appendChild(iframe);
});
