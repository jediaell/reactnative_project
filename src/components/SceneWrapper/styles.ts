import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components';
import { Typography } from '~/components';
import {
  getBottomSpace,
  getStatusBarHeight,
  getTheme,
  ifStyle,
  isIphoneX,
} from '~/utils';

const extraPadding = isIphoneX() ? 20 : 10;
const statusBarHeight = getStatusBarHeight();
const bottomSpacing = getBottomSpace();
const largeSpacing = getTheme('largeSpacing');
const sceneSpacing = getTheme('sceneSpacing');
const isFullWidth = ifStyle('fullWidth');
const primaryContrast = getTheme('primary.contrast');

type ChildrenWrapperProps = {
  contentContainerStyle: StyleProp<ViewStyle>;
  fullWidth: boolean;
};

export const ChildrenWrapper = styled(ScrollView)<ChildrenWrapperProps>`
  flex: 1;
  width: 100%;
  padding-horizontal: ${isFullWidth(0, sceneSpacing)};
  padding-top: ${statusBarHeight + extraPadding}px;
  padding-bottom: ${bottomSpacing + extraPadding}px;
`;

type TitleProps = {
  fullWidth: boolean;
};
export const Title = styled(Typography).attrs({ variant: 'largeTitle' })<
  TitleProps
>`
  color: ${primaryContrast};
  margin-horizontal: ${isFullWidth(sceneSpacing, 0)};
  font-weight: 700;
`;

type SubtitleProps = {
  fullWidth: boolean;
};
export const Subtitle = styled(Typography).attrs({ variant: 'body' })<
  SubtitleProps
>`
  color: ${primaryContrast};
  margin-horizontal: ${isFullWidth(sceneSpacing, 0)};
  margin-bottom: ${largeSpacing};
  font-weight: 300;
  opacity: 0.8;
  letter-spacing: 0.3px;
`;
