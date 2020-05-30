import React from 'react';
import FlipCardFrom from '../FlipCardForm';
import FlipCardGrid from '../FlipCardGrid';
import UploadForm from './UploadForm';

function FlipCardList() {
  return (
    <>
      <UploadForm />
      <FlipCardFrom />
      <FlipCardGrid />
    </>
  );
}

export default FlipCardList;
