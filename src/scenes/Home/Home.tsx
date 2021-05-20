import React from 'react';
import { Heading, Wrapper } from './styles';

type Props = {
  logout: () => void;
};

const Home: React.FC<Props> = () => (
  <Wrapper>
    <Heading>Home</Heading>
  </Wrapper>
);

export default Home;
