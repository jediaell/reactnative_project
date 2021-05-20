import React, { FC } from 'react';
import {
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView as Wrapper,
} from 'react-native';
import { isIOS } from '~/utils';

type Behavior = 'height' | 'position' | 'padding' | undefined;

const defaultBehavior: Behavior = isIOS() ? 'padding' : undefined;
const defaultStyle = { flex: 1 };

type Props = {
  style?: StyleProp<ViewStyle>;
  behavior?: Behavior;
  enabled?: boolean;
  keyboardOffset?: number;
};

const KeyboardAvoidingView: FC<Props> = ({
  style = defaultStyle,
  behavior = defaultBehavior,
  keyboardOffset = 20,
  ...rest
}) => (
  <Wrapper
    style={style}
    behavior={behavior}
    enabled={true}
    keyboardVerticalOffset={keyboardOffset}
    {...rest}
  />
);

export default KeyboardAvoidingView;
