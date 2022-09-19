import { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

const CAMERA_PERMISSION = PermissionsAndroid.PERMISSIONS.CAMERA;
const AUDIO_PERMISSION = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;
const EXTERNAL_STORAGE_PERMISSION =
  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

function usePermissions() {
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  useEffect(() => {
    getPermissions();
  }, []);

  async function getPermissions() {
    if (Platform.OS !== 'android') {
      setPermissionGranted(true);
      return;
    }

    const cameraPermission = await PermissionsAndroid.check(CAMERA_PERMISSION);
    const audioPermission = await PermissionsAndroid.check(AUDIO_PERMISSION);
    const storagePermission = await PermissionsAndroid.check(
      EXTERNAL_STORAGE_PERMISSION,
    );

    if (cameraPermission && audioPermission && storagePermission) {
      return setPermissionGranted(true);
    }

    const hasPermissions = await PermissionsAndroid.requestMultiple([
      CAMERA_PERMISSION,
      AUDIO_PERMISSION,
      EXTERNAL_STORAGE_PERMISSION,
    ]);

    if (hasPermissions) {
      return setPermissionGranted(true);
    }
  }

  return { permissionGranted };
}

export default usePermissions;
