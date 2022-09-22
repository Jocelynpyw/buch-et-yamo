import { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

const CAMERA_PERMISSION = PermissionsAndroid.PERMISSIONS.CAMERA;
const AUDIO_PERMISSION = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;
const EXTERNAL_READ_STORAGE_PERMISSION =
  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
const EXTERNAL_WRITE_STORAGE_PERMISSION =
  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

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
    const storageReadPermission = await PermissionsAndroid.check(
      EXTERNAL_READ_STORAGE_PERMISSION,
    );
    const storageWritePermission = await PermissionsAndroid.check(
      EXTERNAL_WRITE_STORAGE_PERMISSION,
    );

    if (
      cameraPermission &&
      audioPermission &&
      storageWritePermission &&
      storageReadPermission
    ) {
      setPermissionGranted(true);
      return null;
    }

    const hasPermissions = await PermissionsAndroid.requestMultiple([
      CAMERA_PERMISSION,
      AUDIO_PERMISSION,
      EXTERNAL_READ_STORAGE_PERMISSION,
      EXTERNAL_WRITE_STORAGE_PERMISSION,
    ]);

    if (hasPermissions) {
      setPermissionGranted(true);
      return null;
    }
  }

  return { permissionGranted };
}

export default usePermissions;
