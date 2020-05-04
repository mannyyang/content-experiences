import React from 'react';
import { Flex } from 'reflexbox';
import FlipCardFrom from '../FlipCardForm';
import FlipCardGrid from '../FlipCardGrid';

function FlipCardList() {
  return (
    <Flex>
      <FlipCardFrom />
      <FlipCardGrid />
    </Flex>
  );
}

export default FlipCardList;
