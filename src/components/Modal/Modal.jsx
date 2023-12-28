import React, { Component } from 'react';
import css from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { isOpen, imageUrl, alt } = this.props;

    return (
      <div
        className={`${css.overlay} ${isOpen ? 'open' : ''}`}
        onClick={this.handleOverlayClick}
      >
        <div className={css.modal}>
          <img src={imageUrl} alt={alt} />
        </div>
      </div>
    );
  }
}
