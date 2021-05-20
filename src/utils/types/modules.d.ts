import { CameraType } from 'react-native-camera';
import { RouteProp } from '@react-navigation/native';
import { Routes } from '~/navigation';

declare global {
  namespace Modules {
    export type { CameraType, RouteProp };
    export { Routes };
  }
}
