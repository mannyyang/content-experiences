import React from 'react';
import { Flex } from 'reflexbox';
import FlipCardFrom from '../FlipCardForm';
import FlipCardGrid from '../FlipCardGrid';
import UploadForm from './UploadForm';

function FlipCardList() {
  return (
    <Flex>
      <UploadForm />
      <FlipCardFrom />
      <FlipCardGrid />
    </Flex>
  );
}

export default FlipCardList;
