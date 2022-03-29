import {Window} from 'happy-dom';
import {ElementRenderer} from 'lit-ssr';

let hWindow;

export class GenericRenderer extends ElementRenderer {
  static register() {
    const oldWindow = window;
    hWindow = new Window();
    // window = hWindow;
    // Object.assign(globalThis, {
    //   window: hWindow,
    //   document: hWindow.document,
    //   Node: hWindow.Node,
    //   MutationObserver: oldWindow.MutationObserver,
    // });
    // window.MutationObserver = oldWindow.MutationObserver;
    // window.document = hWindow.document;
    ElementRenderer.registerRenderer(HTMLElement, this);
    const define = CustomElementRegistry.prototype.define;
    CustomElementRegistry.prototype.define = function(tagName, ceClass) {
      define.call(this, tagName, ceClass);
      let proto = ceClass.prototype;
      // For elements rendered using this renderer, swizzle in the full DOM
      // HTMLElement prototype and register in the full DOM
      if (ElementRenderer.rendererFor(tagName, ceClass) === GenericRenderer) {
        while (proto && proto !== Object.prototype) {
          const parent = Object.getPrototypeOf(proto);
          if (parent === HTMLElement.prototype) {
            console.log(`Swizzled ${tagName} ${proto.constructor.name}`)
            Object.setPrototypeOf(proto, hWindow.HTMLElement.prototype);
            ceClass.__superHTMLElement = function() {
              hWindow.HTMLElement.call(this);
              this.tagName = tagName;
            }
            break;
          }
          proto = parent;
        }
        hWindow.customElements.define(tagName, ceClass);
      }
    }
  }
  createElement() {
    this.element = hWindow.document.createElement(this.tagName);
  }
  connectedCallback() {
    hWindow.document.body.appendChild(this.element);
    hWindow.document.body.removeChild(this.element);
  }
  attributeChangedCallback(...args) {
    if (this.element.attributeChangedCallback) {
      this.element.attributeChangedCallback(...args);
    }
  }
  *renderShadow() {
    if (this.element.shadowRoot) {
      yield this.element.shadowRoot.innerHTML;
    }
  }
}

if (!process.browser) {
  GenericRenderer.register();
}