import React, { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import css from './ImadeGallery.module.css';

export default class ImageGallery extends Component {
  render() {
    const { images, onImageClick } = this.props;

    return (
      <ul className={css.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onClick={onImageClick}
          />
        ))}
      </ul>
    );
  }
}
