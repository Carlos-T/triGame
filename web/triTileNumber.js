import { div, style } from './naive.js';

class TriTileNumber extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const number = this.getAttribute('number');
    const color = this.getAttribute('color');
    if (this.validateNumber(number, color)) {
      this.render(number, color);
    }
  }

  validateNumber(number, color) {
    const valid = {
      1: ['GREEN'],
      2: ['YELLOW'],
      3: ['BLACK'],
      4: ['BROWN'],
      5: ['RED', 'BLACK'],
      6: ['PINK', 'GREEN'],
      7: ['YELLOW', 'PINK', 'BLUE'],
    };
    return valid[number].indexOf(color) !== -1;
  }

  addNumber(root, number, color) {
    const numberDiv = div('.number.' + color.toLowerCase(), [number]);
    root.appendChild(numberDiv);
  }

  addStyle() {
    this.shadow.appendChild(this.getStyle(this.size));
  }

  render(number, color) {
    const root = div('.tile-number');
    this.shadow.appendChild(root);
    this.addNumber(root, number, color);
    this.addStyle();
  }

  getStyle() {
    return style({
      '.tile-number': {
        backgroundColor: '#FFFFFF',
        fontFamily: '"Barlow", sans-serif',
        width: '5rem',
        height: '0',
        borderRadius: '5px',
        paddingBottom: '35%',
        display: 'inline-block',
        position: 'relative',
        boxSizing: 'border-box',
        boxShadow: '0 0 10px 0px #000000'
      },

      '.number': {
        fontSize: '5rem',
        fontWeight: 'bold',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
      },

      '.green': { color: 'var(--color-dark-green)' },
      '.yellow': { color: 'var(--color-yellow)' },
      '.black': { color: 'var(--color-black)' },
      '.brown': { color: 'var(--color-brown)' },
      '.red': { color: 'var(--color-red)' },
      '.pink': { color: 'var(--color-pink)' },
      '.blue': { color: 'var(--color-blue)' }
    });
  }
}

try {
  customElements.define('tri-tile-number', TriTileNumber);
} catch (err) {
  const h3 = document.createElement('h3');
  h3.innerHTML =
    "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!";
  document.body.appendChild(h3);
}
