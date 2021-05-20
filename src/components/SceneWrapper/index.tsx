import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { DismissKeyboardView, If } from '~/components';
import { ChildrenWrapper, Subtitle, Title } from './styles';

const contentContainerStyle = {
  width: '100%',
  flexDirection: 'column',
  alignContent: 'center',
  alignSelf: 'center',
  paddingBottom: 40,
};

type SceneStyle = {
  [index: number]: {
    backgroundColor?: string;
  };
};
type Props = {
  title?: string;
  subtitle?: string;
  style?: SceneStyle;
  scrollStyle?: StyleProp<ViewStyle>;
  scrollRef?: any;
  fullWidth?: boolean;
};

const SceneWrapper: React.FC<Props> = ({
  children,
  title = '',
  subtitle = '',
  style = [{}],
  scrollStyle = {},
  scrollRef = React.createRef(),
  fullWidth = false,
  ...rest
}) => {
  const backgroundColor = style[0]?.backgroundColor;
  return (
    <DismissKeyboardView>
      <ChildrenWrapper
        fullWidth={fullWidth}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={[contentContainerStyle, style]}
        style={[scrollStyle, { backgroundColor, width: '100%' }]}
        ref={scrollRef}
        {...rest}
      >
        <If condition={!!title}>
          <Title fullWidth={fullWidth}>{title}</Title>
        </If>
        <If condition={!!subtitle}>
          <Subtitle fullWidth={fullWidth}>{subtitle}</Subtitle>
        </If>
        {children}
      </ChildrenWrapper>
    </DismissKeyboardView>
  );
};

export default SceneWrapper;
