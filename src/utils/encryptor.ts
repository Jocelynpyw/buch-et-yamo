import { NativeModules } from 'react-native';

const { Encryptor } = NativeModules;

export const encrypt = (
  inputpath: string,
  outputpath: string,
): Promise<string> =>
  // Add your additional custom logic here
  Encryptor.encrypt(inputpath, outputpath);

export const decrypt = (
  inputpath: string,
  outputpath: string,
): Promise<string> =>
  // Add your additional custom logic here
  Encryptor.decrypt(inputpath, outputpath);
// You can directly export this and access it
// like Encryptor.enrypt/Encryptor.decrypt
export default Encryptor;
