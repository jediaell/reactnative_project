import styled from 'styled-components/native';
import { SceneWrapper } from '~/components';
import { getTheme } from '~/utils';

export const Wrapper = styled(SceneWrapper).attrs({
  fullWidth: true,
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${getTheme('primary.main')};
`;

export const LoadingWrapper = styled.View`
  flex: 1;
  justify-content: center;
`;
