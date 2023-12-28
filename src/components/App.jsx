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
  componentDidMount() {
    this.fetchImages();
  }

  fetchImages = () => {
    const { query, page } = this.state;
    const apiKey = '40628537-4691ca78f12bcbf3b40caa1e0';

    this.setState({ isLoading: true });

    axios
      .get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        if (response.data.hits.length === 0) {
          this.setState({ hasMore: false });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...response.data.hits],
            page: prevState.page + 1,
          }));
        }
      })
      .catch(error => console.error('Error fetching images:', error))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleSearch = newQuery => {
    this.setState({ query: newQuery, page: 1, images: [], hasMore: true }, () =>
      this.fetchImages()
    );
  };

  handleLoadMore = () => {
    this.fetchImages();
  };

  handleImageClick = selectedImage => {
    this.setState({ showModal: true, selectedImage });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

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
