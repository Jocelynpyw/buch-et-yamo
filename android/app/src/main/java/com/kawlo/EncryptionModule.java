package com.kawlo;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.kawlo.EncUtil;


public class EncryptionModule extends ReactContextBaseJavaModule {
    @Override
    public String getName() {
        return "Encryptor";  // Name of the Native Modules.
    }

    /**
* @param plainText Text to be encrypted(from JS layer)
*/
@ReactMethod
public void encrypt(String inputPath, String outputPath, Promise promise) {
    try {
      // Add your encryption logic here 
      // (can use any JAVA encryption library or use default)
      String encryptedText = inputPath + "This is encrypted text";
      EncUtil.encryptFile(inputPath,outputPath);
      promise.resolve(outputPath); // return encryptedText
    } catch (Exception e) {
      promise.reject("ENCRYPTION_FAILED", "Encryption Failed");
    }
}

/**
* @param encryptedText Text to be decrypted(from JS layer)
*/
@ReactMethod
public void decrypt(String inputPath, String outputPath, Promise promise) {
    try {
      // Add your decryption logic here 
      // (can use any JAVA decryption library or use default)
      EncUtil.decryptFile(inputPath,outputPath);
      promise.resolve(outputPath); // return decryptedText
    } catch (Exception e) {
      promise.reject("DECRYPTION_FAILED", "Decryption Failed");
    }
}




}
