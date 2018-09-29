import { Component, Element, State } from "@stencil/core"

interface CssDefinitions {
  active: string
  visible: string
  slideNext: string
  slidePrev: string
  visibleNext: string
  visiblePrev: string
}

const cssDefinitions: CssDefinitions = {
  active: "active",
  visible: "visible",
  slideNext: "slide-next",
  slidePrev: "slide-prev",
  visibleNext: "visible-next",
  visiblePrev: "visible-prev"
}

@Component({
  tag: "ssui-carousel",
  styleUrl: "ssui-carousel.scss",
  shadow: true
})
export class SSUICarousel {
  @Element()
  element: Element
  @State()
  activeSlide: Element
  @State()
  transitioning: boolean
  @State()
  wrapper: Element
  // Touch state
  @State()
  longTouch: boolean
  @State()
  touchstartx: number
  @State()
  touchmovex: number
  @State()
  movex: number

  transition = (
    newActiveElement: Element,
    visibleDirection: string,
    slideDirection: string
  ) => {
    // Don't allow multiple transitions
    if (this.transitioning) {
      return
    }
    this.transitioning = true

    // On animation completion, update classnames
    let onComplete = e => {
      console.log("transition over", e)
      this.activeSlide.removeEventListener("transitionend", onComplete)
      this.setActive(newActiveElement)
      this.transitioning = false
    }
    this.activeSlide.addEventListener("transitionend", onComplete)
    // Set next to visible
    Array.from(this.element.querySelectorAll(`.${visibleDirection}`)).forEach(
      el => {
        console.log("next found", el)
        el.classList.add(cssDefinitions.visible)
        // Add animation
        el.classList.add(slideDirection)
      }
    )
    // add active animation classes
    this.activeSlide.classList.add(slideDirection)
  }

  swipeTransition = () => {}

  showNext = () => {
    console.log("slide next")
    this.transition(
      this.getNextElement(this.activeSlide),
      cssDefinitions.visibleNext,
      cssDefinitions.slideNext
    )
  }

  showPrev = () => {
    console.log("slide prev")
    this.transition(
      this.getPrevElement(this.activeSlide),
      cssDefinitions.visiblePrev,
      cssDefinitions.slidePrev
    )
  }

  getNextElement = (element: Element) => {
    return element.nextElementSibling || element.parentElement.firstElementChild
  }

  getPrevElement = (element: Element) => {
    return (
      element.previousElementSibling || element.parentElement.lastElementChild
    )
  }

  removeStateClasses = () => {
    Array.from(this.element.children).forEach(el => {
      el.classList.remove(
        cssDefinitions.visibleNext,
        cssDefinitions.active,
        cssDefinitions.visible,
        cssDefinitions.slideNext,
        cssDefinitions.slidePrev,
        cssDefinitions.visiblePrev
      )
    })
  }

  setActive = (element: Element) => {
    if (element) {
      this.removeStateClasses()
      // Support multiple active slides
      this.activeSlide = element
      this.activeSlide.classList.add(
        cssDefinitions.active,
        cssDefinitions.visible
      )
      // Set other state classes
      // Set next slides to next visible
      // TODO: Support multiple
      this.getNextElement(this.activeSlide).classList.add(
        cssDefinitions.visibleNext
      )
      // Set prev slides to prev visible
      // TODO: support multiple
      this.getPrevElement(this.activeSlide).classList.add(
        cssDefinitions.visiblePrev
      )
    }
  }

  setUpSwipeListeners() {
    // Flick
    setTimeout(() => {
      this.longTouch = true
    }, 250)

    this.wrapper.addEventListener("touchstart", e => {
      console.log("touchstart", e)
      // Get the original touch position.
      this.touchstartx = e.touches[0].pageX
    })

    this.wrapper.addEventListener("touchmove", e => {
      console.log("touchmove", e)
      // Continuously return touch position.
      this.touchmovex = e.touches[0].pageX
      // Calculate distance to translate holder.
      // this.movex = this.index * this.slideWidth + (this.touchstartx - this.touchmovex);
      this.movex = this.touchstartx - this.touchmovex
      // Defines the speed the images should move at.
      // Makes the holder stop moving when there is no more content.
      this.activeSlide.setAttribute(
        "style",
        `transform: translate3d(${this.movex * -1}px,0,0)`
      )

      //Move next slides

      //Move prev slides
    })

    this.wrapper.addEventListener("touchend", e => {
      console.log("touchend", e)
      // Settle into place

      // Calculate the distance swiped.
      // var absMove = Math.abs(this.index * this.slideWidth - this.movex)
      // let absMove = this.movex
      // // Calculate the index. All other calculations are based on the index.
      // if (absMove > 100 / 2 || this.longTouch === false) {
      //   if (this.movex > this.index * this.slideWidth && this.index < 2) {
      //     this.index++
      //   } else if (
      //     this.movex < this.index * this.slideWidth &&
      //     this.index > 0
      //   ) {
      //     this.index--
      //   }
      // }
      // // Move and animate the elements.
      // this.el.holder
      //   .addClass("animate")
      //   .css(
      //     "transform",
      //     "translate3d(-" + this.index * this.slideWidth + "px,0,0)"
      //   )
      // this.el.imgSlide
      //   .addClass("animate")
      //   .css("transform", "translate3d(-" + 100 - this.index * 50 + "px,0,0)")
    })
  }

  componentWillLoad() {
    console.log("Component is about to be rendered")
    this.longTouch = false
    this.setActive(this.element.firstElementChild)

    // Sets up on click listeners
    Array.from(this.element.children).forEach(s => {
      // TODO: Remove This is currently taking the place of global styles
      let img = s.querySelector("img")
      img.style.width = "100%"
      img.style.display = "block"
    })
  }

  componentDidLoad() {
    console.log("Component has been rendered")
    console.log(this.element, Array.from(this.element.children))
    // Set initial state
    this.wrapper = this.element.shadowRoot.querySelector(".wrapper")

    this.setUpSwipeListeners()
  }

  componentWillUpdate() {
    console.log("Component will update and re-render")
  }

  componentDidUpdate() {
    console.log("Component did update")
  }

  componentDidUnload() {
    console.log("Component removed from the DOM")
  }

  render() {
    return (
      <div class="wrapper">
        <div class="inner">
          <slot />
        </div>
        <div class="arrows">
          <div class="arrow arrow-prev" onClick={this.showPrev}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z" />
            </svg>
          </div>
          <div class="arrow arrow-next" onClick={this.showNext}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z" />
            </svg>
          </div>
        </div>
      </div>
    )
  }
}
