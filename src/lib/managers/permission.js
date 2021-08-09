/**
 * @module Permission manager
 * @description check and request app permissions
 */

import {Platform, Alert} from 'react-native';
import {
  check as RNCheck,
  request as RNRequest,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

const permissions = {
  PHOTO: Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  }),
};

const showDeniedDialog = () => {
  Alert.alert('Photos', 'Please allow access', [
    {
      text: 'Later',
    },
    {text: 'Settings', onPress: () => openSettings()},
  ]);
};

const showUnavailableDialog = () => {
  Alert.alert('Photos', 'This feature is not available!', [{text: 'OK'}]);
};

export default {
  checkAndRequestPhoto: async () => {
    const result = await RNCheck(permissions.PHOTO);
    console.log('checkAndRequestPhoto', result);
    switch (result) {
      case RESULTS.UNAVAILABLE: // This feature is not available
        showUnavailableDialog();
        return false;

      case RESULTS.DENIED: // The permission has not been requested / is denied but requestable
        const res = await RNRequest(permissions.PHOTO);
        // The permission is granted or granted but with limitations
        if (res === RESULTS.LIMITED || res === RESULTS.GRANTED) {
          return true;
        }
        return false;

      case RESULTS.BLOCKED: // The permission is denied and not requestable anymore
        showDeniedDialog();
        return false;

      default:
        //'LIMITED|GRANTED'
        return true;
    }
  },
};
