import { Animations } from '@platformbuilders/react-elements/native';
import {
  LoadDotsAnimation,
  LoadingCircleAnimation,
  LoadingProgressAnimation,
} from '~/assets/animations';

export default {
  circularLoading: LoadingCircleAnimation,
  buttonLoading: LoadDotsAnimation,
  linearLoading: LoadingProgressAnimation,
} as Animations;
