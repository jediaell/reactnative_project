import { moderateScale } from 'react-native-size-matters';
import { Radius } from '@platformbuilders/react-elements/native';

export default {
  smallRadius: `${moderateScale(4)}px`,
  mediumRadius: `${moderateScale(8)}px`,
  largeRadius: `${moderateScale(20)}px`,
  modalRadius: `${moderateScale(12)}px`,
  buttonRadius: `${moderateScale(4)}px`,
} as Radius;
