import React, { Component } from 'react';
import css from './Button.module.css';

export default class Button extends Component {
  render() {
    const { onClick, disabled } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <button
          type="button"
          className={css.Button}
          onClick={onClick}
          disabled={disabled}
        >
          Load more
        </button>
      </div>
    );
  }
}
