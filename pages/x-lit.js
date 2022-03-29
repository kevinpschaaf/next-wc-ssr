import { LitElement, html, css } from 'lit-element';

if (!process.browser || true) {
  customElements.define('x-lit', class extends LitElement {
    static styles = css`
      :host { 
        display: inline-block; 
        border: 1px solid blue;
        padding: 10px;
      }
      .title { font-weight: bold; }
      .prop { color: green; }
      .reflected { color: red; }
      .slot { color: purple; }
    `;
    static properties = {
      prop: {type: String},
      reflected: {type: String, reflect: true},
    }
    constructor() {
      super();
      this.prop = 'prop';
      this.reflected = 'reflected';
      console.log(`x-lit created`);
    }
    render() {
      return html`
        <span class="title">x-lit</span> |
        <span class="prop">prop: ${this.prop}</span> |
        <span class="reflected">reflected: ${this.reflected}</span> |
        <span class="slot">slot: <slot></slot></span>
      `;
    }
  });
}