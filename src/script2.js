//Copyright 2020 Isaac Svi
export const gallerySetup = () => {
  let sliderInterval = Number(
    getComputedStyle(document.body).getPropertyValue('--GS__slider-interval')
  )
  let baseSize = eval(
    getComputedStyle(document.body)
      .getPropertyValue('--GS__base-size')
      .replace(/[pxcalc\(\)]/g, '')
  )
  let cardRatio = Number(
    getComputedStyle(document.body).getPropertyValue('--GS__card-ratio')
  )
  let animationTime = getComputedStyle(document.body).getPropertyValue(
    '--GS__animation-time'
  )
  let slider = document.querySelector('.GS__slider')
  let cards = document.querySelectorAll('.GS__card')
  let containers = document.querySelectorAll('.GS__container')
  let bigCard = 1 //represents position of the big card in positions array
  let positions = []
  //very important; sets width for slider according to baseSize and number of cards user wants to put in
  setPositions()
  window.addEventListener('resize', setPositions)
  let right = document.querySelector('.GS__right button')
  let left = document.querySelector('.GS__left button')
  let flag = Array(cards.length).fill(0)
  //events to move slider
  document.addEventListener('keydown', function (e) {
    e = e || window.event
    let d = e.keyCode == '37' ? 'left' : e.keyCode == '39' ? 'right' : null
    shiftSlider(d)
  })
  right.addEventListener('click', shiftSlider.bind(null, 'right'))
  left.addEventListener('click', shiftSlider.bind(null, 'left'))
  for (let i = 0; i < cards.length; i++) {
    for (let j = 0; j < 2; j++) {
      cards[i]
        .querySelectorAll('.GS__flip-btn')
        [j].addEventListener('click', function () {
          cards[i].style.animation = flag[i]
            ? 'GS__switch2 1s forwards'
            : 'GS__switch 1s forwards'
          flag[i] = flag[i] ? --flag[i] : ++flag[i]
        })
    }
  }
  //automatic movement setInterval function
  cardAnimation(sliderInterval)
  function cardAnimation(interval) {
    if (isNaN(interval)) return
    var move
    autoMove()
    function autoMove() {
      move = setInterval(function () {
        if (bigCard < cards.length - 1) shiftSlider('right')
        else {
          for (let i = 0; i < cards.length; i++) {
            shiftSlider('left')
          }
        }
      }, interval)
    }
    const galleryEventHandlers = [right, left, slider]
    for (let handler of galleryEventHandlers) {
      handler.addEventListener('mouseover', () => {
        clearInterval(move)
      })
      handler.addEventListener('mouseleave', () => {
        autoMove()
      })
    }
  }
  //auxiliary functions
  function setPositions() {
    //resets positions of gallery object when needed
    const distance = ((baseSize / cardRatio) * 2) / baseSize //basically 0.4, this is because the size of each small container is 1/5 of the big container, and each space between the big container is also 1/5 of each big container
    let distancer = distance
    // baseSize = Number(getComputedStyle(document.body).getPropertyValue('--GS__base-size').replace('px', ''));
    baseSize = new Function(
      'return ' +
        getComputedStyle(document.body)
          .getPropertyValue('--GS__base-size')
          .replace(/[pxcalc\(\)]/g, '')
    )
    for (let i = 0; i < containers.length; i++) {
      positions[i] = baseSize * distancer
      distancer -= distance
    }
    slider.style.left = positions[bigCard] + 'px'
    slider.style.width =
      baseSize + (baseSize / cardRatio) * 2 * (containers.length - 1) + 'px'
  }
  function shiftSlider(dir) {
    if (
      (dir === 'right' && bigCard < containers.length - 1) ||
      (dir === 'left' && bigCard > 0)
    ) {
      const leftOffset = dir === 'right' ? bigCard + 1 : bigCard - 1
      slider.style.left = positions[leftOffset] + 'px'
      dir = dir === 'right' ? 'left' : 'right'
      cards[
        bigCard
      ].style.animation = `GS__smallen-${dir} ${animationTime} forwards`
      containers[bigCard].classList.remove('GS__active', 'GS__reflect')
      containers[bigCard].style.flex =
        '0 0 calc(var(--GS__base-size) / var(--GS__card-ratio))'
      bigCard = leftOffset
      cards[
        bigCard
      ].style.animation = `GS__biggen-${dir} ${animationTime} forwards`
      containers[bigCard].style.flex = '0 0 var(--GS__base-size)'
      containers[bigCard].classList.add('GS__reflect')
      flag[bigCard] = 0
      setTimeout(function () {
        containers[bigCard].classList.add('GS__active')
      }, 1000)
    }
  }
}
