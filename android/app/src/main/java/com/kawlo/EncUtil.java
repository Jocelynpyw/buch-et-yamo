package com.kawlo;
import android.media.MediaCodec;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class EncUtil {

    private static final String ALGORITHM = "Blowfish";
    private static final String MODE = "Blowfish/CBC/PKCS5Padding";
    private static final String IV = "azertyui";
    private static final String KEY = "xyz";

    private static SecretKey generateKey() {
        return new SecretKeySpec(KEY.getBytes(), ALGORITHM);
    }



    public static void encryptFile(String inputPath, String outputPath) throws MediaCodec.CryptoException {

        File inputFile = new File(inputPath);
        File outputFile = new File(outputPath);

        try {
            Cipher cipher = Cipher.getInstance(MODE);
            cipher.init(Cipher.ENCRYPT_MODE, generateKey(), new IvParameterSpec(IV.getBytes()));

            FileInputStream inputStream = new FileInputStream(inputFile);
            byte[] inputBytes = new byte[(int) inputFile.length()];
            inputStream.read(inputBytes);

            byte[] outputBytes = cipher.doFinal(inputBytes);

            FileOutputStream outputStream = new FileOutputStream(outputFile);
            outputStream.write(outputBytes);

            inputStream.close();
            outputStream.close();

        } catch (NoSuchPaddingException | NoSuchAlgorithmException
                | InvalidKeyException | BadPaddingException
                | IllegalBlockSizeException | IOException ex) {
            ex.fillInStackTrace();
        } catch (InvalidAlgorithmParameterException e) {
            e.printStackTrace();
        }
    }

    public static void decryptFile(String inputPath, String outputPath) throws MediaCodec.CryptoException {

        File inputFile = new File(inputPath);
        File outputFile = new File(outputPath);

        try {
            Cipher cipher = Cipher.getInstance(MODE);
            cipher.init(Cipher.DECRYPT_MODE, generateKey(), new IvParameterSpec(IV.getBytes()));

            FileInputStream inputStream = new FileInputStream(inputFile);
            byte[] inputBytes = new byte[(int) inputFile.length()];
            inputStream.read(inputBytes);

            byte[] outputBytes = cipher.doFinal(inputBytes);

            FileOutputStream outputStream = new FileOutputStream(outputFile);
            outputStream.write(outputBytes);

            inputStream.close();
            outputStream.close();

        } catch (NoSuchPaddingException | NoSuchAlgorithmException
                | InvalidKeyException | BadPaddingException
                | IllegalBlockSizeException | IOException ex) {
            ex.fillInStackTrace();
        } catch (InvalidAlgorithmParameterException e) {
            e.printStackTrace();
        }


    }

    

}