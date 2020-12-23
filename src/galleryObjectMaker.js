//Copyright 2020 Isaac Svi
export class GalleryObject {
  constructor(type, element, json) {
    this.pictureSets = json.src
    this.bg = json.backgroundColor
    this.objectFit = json.objectFit
    this.info = json.pictureInfo
    this.btnTxt = json.btnTxt
    this.dir = this.isNullProperty(json.flipDirection)
      ? 'x'
      : json.flipDirection
    this.font = json.font
    this.baseSize = json.baseSize ? json.baseSize : 250
    this.reflect = json.reflection
    this.node = document.createElement('div')
    this.align = json.align
    this.placeHolder = json.placeHolderImage
    this.interval = json.sliderInterval
    this.cardSpeed = json.cardSpeed
    this.cardRatio = json.cardRatio
    this.sliderArrowColor = json.sliderArrowColor
    this.gridBaseSize = json.gridBaseSize

    switch (type) {
      case 'slider':
        this.createGallerySlider(element)
        break
      case 'grid':
        this.createGalleryGrid(element)
        break
      default:
        console.log('ERROR: You need to enter in a valid type.')
    }
  }

  isNullProperty(property) {
    return (
      property === null ||
      property === undefined ||
      !property ||
      property === ''
    )
  }
  setSliderArrowColor() {
    document.documentElement.style.setProperty(
      '--GS__slider-arrow-color',
      this.sliderArrowColor
    )
  }
  setBaseSize() {
    document.documentElement.style.setProperty('--GS__base', this.baseSize)
    // document.documentElement.style.setProperty('--GS__base-size', this.baseSize + 'px');
  }
  setFontFamily(areas) {
    this.node
      .querySelectorAll(areas)
      .forEach((child) => (child.style.fontFamily = this.font))
  }
  setReflection() {
    if (this.reflect || this.reflect == undefined) {
      const reflection =
        'below calc(var(--GS__base-size) / -5.1020408163) linear-gradient(transparent 60%, rgba(255,255,255,0.5));'
      document.documentElement.style.setProperty('--GS__reflection', reflection)
    } else {
      document.documentElement.style.setProperty('--GS__reflection', 0)
    }
  }
  setBackground() {
    if (!this.isNullProperty(this.bg)) {
      document.documentElement.style.setProperty('--GS__clr-bg', this.bg)
    } else {
      document.documentElement.style.setProperty('--GS__clr-bg', 'none')
    }
  }
  setObjectFit() {
    if (!this.isNullProperty(this.objectFit)) {
      document.documentElement.style.setProperty(
        '--GS__object-fit',
        this.objectFit
      )
    }
  }
  setSliderInterval() {
    document.documentElement.style.setProperty(
      '--GS__slider-interval',
      this.interval
    )
  }
  setCardSpeed() {
    document.documentElement.style.setProperty(
      '--GS__animation-time',
      this.cardSpeed
    )
  }
  setCardRatio() {
    document.documentElement.style.setProperty(
      '--GS__card-ratio',
      this.cardRatio
    )
  }

  createGalleryGrid(element) {
    this.node.classList.add('GS__grid')

    document.documentElement.style.setProperty(
      '--GS__grid-size',
      this.gridBaseSize + 'px'
    )

    element.appendChild(this.node)

    this.info = this.isNullProperty(this.info) ? [] : this.info

    for (let i in this.pictureSets) {
      this.node.innerHTML += this.createGridContainer(
        this.pictureSets[i],
        this.info[i]
      )
    }

    this.setFontFamily('.GS__grid-info, .GS__gallery-info-buttons button')
  }

  createGridContainer(pictures, info) {
    info = this.isNullProperty(info) ? [] : info
    let container = `
      <div class="GS__grid-container">
        <div class="GS__grid-card ${this.dir}" dir="${this.align}">
          <div class="GS__front">
            <img data-placeholder='${this.placeHolder}' src='${
      pictures[0]
    }' alt="">
            ${this.createGridCardInfo(info[0])}
          </div>
          <div class="GS__back">
            <img data-placeholder='${this.placeHolder}' src='${
      pictures[1]
    }' alt="">
            ${this.createGridCardInfo(info[1])}
          </div>
        </div>
      </div>
    `

    return container
  }

  createGridCardInfo(info) {
    if (this.isNullProperty(info)) return null

    return `
      <div class="GS__grid-info">
        <h3>${info.header}</h3>
        <p>${info.text}</p>
      </div>
    `
  }

  createGallerySlider(element) {
    this.node.classList.add('GS__frame')
    this.slider = document.createElement('div')
    this.slider.classList.add('GS__slider')

    element.appendChild(this.node)
    this.node.appendChild(this.slider)

    for (let i = 0; i < this.pictureSets.length; i++) {
      this.createAndAppendSliderContainers(i)
    }
    this.node.innerHTML += `
      <div class='GS__left'><button><span></span></button></div>
      <div class='GS__right'><button><span></span></button></div>
    `
    this.setFontFamily('.GS__info, .GS__gallery-info-buttons button')
    this.setBaseSize()
    this.setReflection()
    this.setBackground()
    this.setObjectFit()
    this.setSliderInterval()
    this.setSliderArrowColor()
    this.setCardSpeed()
    this.setCardRatio()
  }

  createAndAppendSliderContainers(num) {
    let container = document.createElement('div')
    let classList =
      num === 1
        ? ['GS__container', 'GS__active', 'GS__reflect']
        : ['GS__container']
    container.classList.add(...classList)
    container.innerHTML += this.createCard(
      this.pictureSets[num],
      this.info[num]
    )
    this.slider.appendChild(container)
  }

  createCard(picSet, info) {
    info = this.isNullProperty(info) ? [] : info
    return `
      <div class='GS__card' dir="${this.align}">
        <div class='GS__front'>
          <img src='${this.placeHolder}' data-placeholder='${
      picSet[0]
    }' alt=''/>
          ${this.createCardInfo(info[0])}
        </div>
        <div class='GS__back'>
          <img src='${this.placeHolder}' data-placeholder='${
      picSet[1]
    }' alt=''/>
          ${this.createCardInfo(info[1])}
        </div>
      </div>
    `
  }

  createCardInfo(info) {
    const margin = this.align === 'rtl' ? "style='margin-right: 80%;'" : ''

    return `
      <div class="GS__info">
        ${info && info.header ? `<h3>${info.header}</h3>` : ''}
        ${info && info.text ? `<p>${info.text}</p>` : ''}
        ${
          info && info.html
            ? `<div style="pointer-events: all;">${info.html}</div>`
            : ''
        }
        <div class="GS__gallery-info-buttons">
          <button class="GS__flip-btn" ${margin}>${this.btnTxt}</button>
        </div>
      </div>
    `
  }
}
