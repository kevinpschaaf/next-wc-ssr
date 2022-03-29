/** @jsx createElementCE */
import { createElement, Component, useState, useEffect } from 'react';
import { enhanceCreateElement } from 'lit-ssr/lib/react/create-element.js';
import { GenericRenderer } from './generic-renderer.js';
import './x-lit.js';
import './x-generic.js';
import './x-polymer.js';

const createElementCE = enhanceCreateElement(createElement, Component);

if (!process.browser) {
  GenericRenderer.register();
}

export default function Home() {
  const [prop, setProp] = useState(0);
  return (<>
    <h1>next.js app</h1>
    <button onClick={() => setProp(prop - 1)}>-</button>
    <button onClick={() => setProp(prop + 1)}>+</button>
    <hr></hr>
    <x-lit prop={prop} reflected="yes">Hello Lit!</x-lit>
    <hr></hr>
    <x-generic prop={prop} reflected="yes">Hello Generic!</x-generic>
    <hr></hr>
    {/* <x-polymer prop={prop} reflected="yes">Hello Generic!</x-polymer> */}
  </>);
}