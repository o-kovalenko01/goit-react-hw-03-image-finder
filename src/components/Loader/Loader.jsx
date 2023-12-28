import React, { Component } from 'react';
import { Circles } from 'react-loader-spinner';

export default class Loader extends Component {
  render() {
    return (
      <Circles
        height="100"
        width="100"
        color="#3f51b5"
        ariaLabel="circles-loading"
        wrapperStyle={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 100,
        }}
        wrapperClass=""
        visible={true}
      />
    );
  }
}
