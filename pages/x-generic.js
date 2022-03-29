
if (!process.browser || true) {
  customElements.define('x-generic', class extends HTMLElement {
    static observedAttributes = ['prop', 'reflected', 'defer-hydration'];
    constructor() {
      super();
      console.log(`x-generic created`);
    }
    set prop(v) {
      this._prop = v;
      this.update();
    }
    get prop() { return this._prop; }
    set reflected(v) {
      this.setAttribute('reflected', v);
    }
    get reflected() { 
      return this.getAttribute('reflected');
    }
    attributeChangedCallback() {
      this.update();
    }
    connectedCallback() {
      this.update();    
    }
    ensureRoot() {
      if (!this.root) {
        if (!this.shadowRoot) {
          this.attachShadow({mode: 'open'}).innerHTML = `
            <style>
              :host { 
                display: inline-block; 
                border: 1px solid blue;
                padding: 10px;
              }
              #title { font-weight: bold; }
              #prop { color: green; }
              #reflected { color: red; }
              #slot { color: purple; }
            </style>
            <span id="title">${this.localName}</span> |
            <span id="prop"></span> |
            <span id="reflected"></span> |
            <span id="slot">slot: <slot></slot></span>
          `;
        }
        ['prop', 'reflected'].forEach(id => {
          this[`${id}Element`] = this.shadowRoot.querySelector(`#${id}`);
        });
        this.root = this.shadowRoot;
      }
    }
    update() {
      if (this.isConnected && !this.hasAttribute('defer-hydration')) {
        this.ensureRoot();
        this.propElement.textContent = `prop: ${this.prop}`;
        this.reflectedElement.textContent = `prop: ${this.reflected}`;
      }
    }
  });
}