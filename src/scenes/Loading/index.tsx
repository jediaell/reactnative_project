import React, { FC } from 'react';
import { LoadingIndicator } from '~/components';
import { LoadingWrapper, Wrapper } from './styles';

const Loading: FC = () => (
  <Wrapper>
    <LoadingWrapper>
      <LoadingIndicator large />
    </LoadingWrapper>
  </Wrapper>
);

export default Loading;
