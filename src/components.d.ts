/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import '@stencil/core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLElement {
    componentOnReady?: () => Promise<this | null>;
  }

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}

import '@stencil/router';
import '@stencil/state-tunnel';


declare global {

  namespace StencilComponents {
    interface AppHome {

    }
  }

  interface HTMLAppHomeElement extends StencilComponents.AppHome, HTMLStencilElement {}

  var HTMLAppHomeElement: {
    prototype: HTMLAppHomeElement;
    new (): HTMLAppHomeElement;
  };
  interface HTMLElementTagNameMap {
    'app-home': HTMLAppHomeElement;
  }
  interface ElementTagNameMap {
    'app-home': HTMLAppHomeElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'app-home': JSXElements.AppHomeAttributes;
    }
  }
  namespace JSXElements {
    export interface AppHomeAttributes extends HTMLAttributes {

    }
  }
}


declare global {

  namespace StencilComponents {
    interface MadnessLife {

    }
  }

  interface HTMLMadnessLifeElement extends StencilComponents.MadnessLife, HTMLStencilElement {}

  var HTMLMadnessLifeElement: {
    prototype: HTMLMadnessLifeElement;
    new (): HTMLMadnessLifeElement;
  };
  interface HTMLElementTagNameMap {
    'madness-life': HTMLMadnessLifeElement;
  }
  interface ElementTagNameMap {
    'madness-life': HTMLMadnessLifeElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'madness-life': JSXElements.MadnessLifeAttributes;
    }
  }
  namespace JSXElements {
    export interface MadnessLifeAttributes extends HTMLAttributes {

    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }
