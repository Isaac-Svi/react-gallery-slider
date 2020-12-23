import React, { Component } from 'react'
import { GalleryObject } from './galleryObjectMaker'
import { gallerySetup } from './script'
import './slider-styles.css'

export default class GallerySlider extends Component {
  componentDidMount() {
    const elem = document.querySelector('.GS__gallery-slider')
    const { json } = this.props
    new GalleryObject('slider', elem, json.default || json)
    gallerySetup()
    // lazy load images
    let imgs = document.querySelectorAll('.GS__card img')
    imgs.forEach((img) => {
      img.setAttribute('src', img.getAttribute('data-placeholder'))
    })
  }

  render() {
    return <div className='GS__gallery-slider'></div>
  }
}
