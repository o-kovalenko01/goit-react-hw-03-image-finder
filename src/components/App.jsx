import React, { Component } from 'react';
import axios from 'axios';

import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      query: '',
      page: 1,
      isLoading: false,
      showModal: false,
      selectedImage: {},
      hasMore: true,
    };
  }

  fetchImages = async () => {
    const { query, page } = this.state;
    const apiKey = '40628537-4691ca78f12bcbf3b40caa1e0';

    this.setState({ isLoading: true });
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
      );

      const newImages = response.data.hits.map(
        ({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        })
      );

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = newQuery => {
    const { query } = this.state;

    if (query !== newQuery) {
      this.setState({ query: newQuery, images: [], page: 1 });
    }
  };

  handleLoadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  handleImageClick = selectedImage => {
    this.setState({ showModal: true, selectedImage });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      if (this.state.query !== '') {
        this.fetchImages();
      }
    }
  }

  render() {
    const { images, isLoading, showModal, selectedImage, hasMore } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSearch} />
        {isLoading && <Loader />}
        <ImageGallery images={images} onImageClick={this.handleImageClick} />

        {images.length > 0 && !isLoading && hasMore && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal
            isOpen={showModal}
            onClose={this.handleCloseModal}
            imageUrl={selectedImage.largeImageURL}
            alt={selectedImage.id}
          />
        )}
      </>
    );
  }
}
