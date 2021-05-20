import React, { FC } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const DismissKeyboardView: FC<Props> = ({ children }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    {children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
