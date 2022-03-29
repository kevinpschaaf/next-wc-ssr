import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

if (!process.browser || true) {
  customElements.define('x-polymer', class extends PolymerElement {
    static properties = {
      prop: {type: String},
      reflected: {type: String, reflectToAttribute: true},
    }
    static get template() {
      return html`
        <style>
          :host { 
            display: inline-block; 
            border: 1px solid blue;
            padding: 10px;
          }
          .title { font-weight: bold; }
          .prop { color: green; }
          .reflected { color: red; }
          .slot { color: purple; }
        </style>
        <span class="title">x-lit</span> |
        <span class="prop">prop: [[prop]]</span> |
        <span class="reflected">reflected: [[reflected]]</span> |
        <span class="slot">slot: <slot></slot></span>
      `;
    }
    constructor() {
      super();
      this.prop = 'prop';
      this.reflected = 'reflected';
      console.log(`x-polymer created`);
    }
  });
}