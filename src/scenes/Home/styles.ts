import styled from 'styled-components/native';
import { SceneWrapper, Typography } from '~/components';
import { getTheme } from '~/utils';

export const Wrapper = styled(SceneWrapper)`
  justify-content: center;
  flex: 1;
`;

export const Heading = styled(Typography).attrs({ variant: 'body' })`
  font-weight: 300;
  text-align: center;
  color: ${getTheme('primary.dark')};
`;
