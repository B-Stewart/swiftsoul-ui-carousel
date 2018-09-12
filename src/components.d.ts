/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
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


declare global {

  namespace StencilComponents {
    interface SwiftyCarousel {

    }
  }

  interface HTMLSwiftyCarouselElement extends StencilComponents.SwiftyCarousel, HTMLStencilElement {}

  var HTMLSwiftyCarouselElement: {
    prototype: HTMLSwiftyCarouselElement;
    new (): HTMLSwiftyCarouselElement;
  };
  interface HTMLElementTagNameMap {
    'swifty-carousel': HTMLSwiftyCarouselElement;
  }
  interface ElementTagNameMap {
    'swifty-carousel': HTMLSwiftyCarouselElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'swifty-carousel': JSXElements.SwiftyCarouselAttributes;
    }
  }
  namespace JSXElements {
    export interface SwiftyCarouselAttributes extends HTMLAttributes {

    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }

export declare function defineCustomElements(window: any): void;