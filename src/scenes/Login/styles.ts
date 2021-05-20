import styled from 'styled-components/native';
import {
  Button,
  PasswordInput,
  SceneWrapper,
  TextInput,
  Typography,
} from '~/components';
import { getTheme } from '~/utils';

const sectionSpacing = getTheme('sectionSpacing');

export const Wrapper = styled(SceneWrapper)`
  flex: 1;
  justify-content: center;
  background-color: ${getTheme('primary.contrast')};
`;

export const Heading = styled(Typography).attrs({ variant: 'body' })`
  font-weight: 300;
  text-align: center;
  color: ${getTheme('primary.dark')};
`;

export const LoginButton = styled(Button).attrs({ secondary: true })`
  width: 232px;
  margin-top: ${sectionSpacing};
  align-self: center;
`;

export const FormWrapper = styled.View`
  flex: 0.4;
  justify-content: space-around;
  margin-vertical: ${sectionSpacing};
`;

export const Input = styled(TextInput)``;

export const Password = styled(PasswordInput)`
  margin-top: ${getTheme('largeSpacing')};
`;
