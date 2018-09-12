import { Component, Element, State } from '@stencil/core';

interface Slide {
  element: Element;
}

@Component({
  tag: 'swifty-carousel',
  styleUrl: 'swifty-carousel.scss',
  shadow: true
})
export class SwiftyCarousel {

  @Element() element: Element;
  @State() slides: Slide[];
  @State() activeSlide: Slide;

  slideNext = () => {
    this.activeSlide.element.classList.remove('active')
    this.activeSlide.element = this.activeSlide.element.nextElementSibling ? this.activeSlide.element.nextElementSibling : this.element.firstElementChild
    this.activeSlide.element.classList.add('active')
  }

  componentWillLoad() {
    console.log('Component is about to be rendered');
    this.slides = [].slice.call(this.element.children).map(el => ({element: el}));
    this.slides[0].element.classList.add('active');
    this.activeSlide = this.slides[0];
    this.slides.forEach(s => {
      s.element.addEventListener("click", () => {
        this.slideNext()
      });
      let img = s.element.querySelector('img')
      img.style.width = '100%'
      img.style.display = 'block'
    })
  }

  componentDidLoad() {
    console.log('Component has been rendered');
    console.log(this.element, this.slides);
  }

  componentWillUpdate() {
    console.log('Component will update and re-render');
  }

  componentDidUpdate() {
    console.log('Component did update');
  }

  componentDidUnload() {
    console.log('Component removed from the DOM');
  }

  render() {
    return (
      <div>
        <div class="inner">
          <slot />
        </div>
      </div>
    );
  }
}
