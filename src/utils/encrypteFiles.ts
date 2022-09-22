import RNFetchBlob from 'react-native-blob-util';
import { Dirs, FileSystem } from 'react-native-file-access';
import { Alert } from 'react-native';
import { ProgressListener } from 'react-native-file-access/lib/typescript/types';
import { encrypt, decrypt } from './encryptor';

// const key = forge.random.getBytesSync(16);

export function downloadFiles(
  url: string,
  PATH: string,
  title: string,
  notify = true,
) {
  const { config } = RNFetchBlob;

  return config({
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: notify,
      mediaScannable: true,
      title,
      path: PATH,
    },
  }).fetch('GET', url);
}

// METHOD USED FOR FILE DOWNLOADS answers
// eslint-disable-next-line consistent-return
export async function answerFileManager(
  answerId: string,
  url?: string,
  onProgress?: (progress: ProgressListener | undefined) => void,
): Promise<string | undefined> {
  const temp_path = `${Dirs.CacheDir}/${answerId}.pdf`;
  const file_path = `${Dirs.DocumentDir}/${answerId}.kw.txt`;

  const exists = await FileSystem.exists(file_path);
  if (exists) {
    await decrypt(file_path, temp_path);

    return temp_path;
  }
  if (url) {
    // download to temp_file and send feedback
    const res = await FileSystem.fetch(
      url,
      {
        headers: {
          Accept: 'application/pdf',
          'Content-Type': 'application/pdf',
        },
        path: temp_path,
        network: 'any',
      },
      (progress, contentLength, done) => {
        if (onProgress) {
          onProgress({
            bytesRead: Number(progress),
            contentLength,
            done,
          });
        }
      },
    );

    if (res.status === 200 && res.ok) {
      await encrypt(temp_path, file_path);

      return temp_path;
    }
    Alert.alert('File Not Downloaded');
  }
}

// Will clear a file_path passed in
answerFileManager.clear = async (file_path: string) => {
  if (await FileSystem.exists(file_path)) {
    await FileSystem.unlink(file_path);
  }
};

// METHOD USED FOR FILE DOWNLOADS answers
export const papersFileManager = async (
  answerId: string,
  url?: string,
  onProgress?: (progress: ProgressListener | undefined) => void,
  // eslint-disable-next-line consistent-return
): Promise<string | undefined> => {
  const temp_path = `${Dirs.CacheDir}/${answerId}.pdf`;
  const file_path = `${Dirs.DocumentDir}/${answerId}.kw.txt`;

  const exists = await FileSystem.exists(file_path);
  if (exists) {
    await decrypt(file_path, temp_path);

    return temp_path;
  }
  if (url) {
    // download to temp_file and send feedback
    const res = await FileSystem.fetch(
      url,
      {
        headers: {
          Accept: 'application/pdf',
          'Content-Type': 'application/pdf',
        },
        path: temp_path,
        network: 'any',
      },
      (progress, contentLength, done) => {
        if (onProgress) {
          onProgress({
            bytesRead: Number(progress),
            contentLength,
            done,
          });
        }
      },
    );

    if (res.status === 200 && res.ok) {
      await encrypt(temp_path, file_path);

      return temp_path;
    }
    Alert.alert('File Not Downloaded');
  }
};

export function checkFiles(fileName: string, correction = false) {
  const PATHS = correction
    ? `${Dirs.CacheDir}/${fileName}.kw.txt`
    : `${Dirs.DocumentDir}/${fileName}.kw.txt`;

  return FileSystem.exists(PATHS).then((ex) => {
    if (ex) {
      return FileSystem.stat(PATHS)
        .then((stats) => stats.size > 10000)
        .catch(() => false);
    }
    return false;
  });
}
