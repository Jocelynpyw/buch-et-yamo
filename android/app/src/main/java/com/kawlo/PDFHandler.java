package com.kawlo;


import androidx.annotation.NonNull;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


import android.content.Context;

import android.os.Environment;
import android.util.Log;




/**
 * Encrypts and decrypts PDF FILES
 */
public class PDFHandler {
    private static String CONTENT_TAIL = "sdkf03lkenfskf-3lkdf942lkjsdf-sdf";
    public static final int SLICE_LEN = 63;
    private final static String CAWLO_DIR = "kawlo";
    private static String appDataDir = "";
    public final static String LOG_TAG = "PDFHANDLER";

    public PDFHandler(){

        
        appDataDir = Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator + CAWLO_DIR + File.separator + "data" + File.separator;
        File appDirFile = new File(appDataDir);
        //CONTENT_TAIL = mContext.getString(R.string.pdf_header);
        File appDataDirFile = new File(appDataDir + File.separator + "data");
        File tmpDataDirFile = new File(appDataDirFile.getAbsolutePath() + File.separator + "tmp");
        if(!appDataDirFile.exists()){
            if(appDataDirFile.mkdirs()){
                Log.i(LOG_TAG,"Application data directory created");
            }else{
                Log.w(LOG_TAG, "Failed creating data directory");
            }
        }
        if(!tmpDataDirFile.exists()){
            if(tmpDataDirFile.mkdirs()){
                Log.i(LOG_TAG,"Application tmp data directory created");
            }else{
                Log.w(LOG_TAG, "Failed creating tmp data directory");
            }
        }

    }

    @NonNull
    /*@Override ----*/
    public String getName() {
        return "PDFHandler";
    }


    /**
     * Performce a byte level transposition of sequential byte array
     * @param content byte array to transpose
     */
    private void transposeBytes(byte[] content){
        int effLen = content.length;
        int sliceLen = Math.round((float) Math.floor(effLen / SLICE_LEN));
        if(sliceLen < 1) sliceLen = 1;
        //backup = new byte[sliceLen];
        byte[] frontCont = new byte[sliceLen];
        byte[] backCont = new byte[sliceLen];
        int j = effLen-sliceLen;
        for(int i = 0; i < sliceLen; i++){
            frontCont[i] = content[i];
            backCont[i] = content[j];
            //replace
            content[i] = backCont[i];
            content[j] = frontCont[i];
            j++;
        }
    }

    /**
     * Encryption function to perform work in a thread
     * @param fname Filename | filepath
     */
    //@ReactMethod
    public void encrypt(String fname /*, Promise promise */){
        //async thread
        Runnable work = () -> {
            Map<String, Object> map = this.encryptPdfFile(fname);
            boolean ok = (boolean) map.get("state");
            if(ok){
                map.put("status", "SUCCESS");
                //resolve promise
                //promise.resolve(msgData);
            }else{
                map.put("status", "FAILURE");
                //reject promise
                //promise.reject(map);
            }
        };
        Thread thread = new Thread(work);
        thread.start();
    }

    /**
     * Threaded based Decryption of the contents of the file
     * @param fname Filename or filepath
     */
    //@ReactMethod
    public void decrypt(String fname /*, Promise promise */){
        //async thread
        Runnable work = () -> {
            Map<String, Object> map = this.decryptPdfFile(fname);
            boolean ok = (boolean) map.get("state");
             //msgData = new HashMap<>();
            if(ok){
                map.put("status", "SUCCESS");
                //resolve promise
                //promise.resolve(map);
            }else{
                map.put("status", "FAILURE");
                //reject promise
                //promise.reject(map);
            }
        };
        Thread thread = new Thread(work);
        thread.start();
    }

    /**
     * Decrypts a  pdf file by perfoming byte level transposition of elements
     * @param fname filename | File path .
     * @return A map communicating activity state and results
     */
    public Map<String, Object> encryptPdfFile(String fname){
        Map<String, Object> map = new HashMap<>();
        //String fpath = fname;
        if(fname.trim().equals("")){
            map.put("state", false);
            map.put("fail_reason", "Empty path provided");
            return map;
        }

        fname = fname.contains("/") ? fname.split("/")[fname.length()-1] :
                fname;
        Log.i(LOG_TAG, " --->  fname is : " + fname);
        String[] tokens = fname.split("\\.(?=[^\\.]+$)");
        String name = "", ext = "";
        if(tokens.length > 1) {
            Log.i(LOG_TAG, "File matches regex");
            name = tokens[0];
            ext = tokens[1];
            Log.i(LOG_TAG, "About to encrypt file : " + fname);
            File extDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
            System.out.println("ext folder : " + extDir.getAbsolutePath());
            File targetFile = null;
            FileInputStream fis = null;
            byte[] fileContents;

            int effLen = 0, readLen = 0;
            try {
                targetFile = new File(extDir + File.separator + fname);
                fis = new FileInputStream(targetFile);
                effLen = (int) targetFile.length();
                fileContents = new byte[effLen];
                Log.i(LOG_TAG, ">>>>> Total length = " + fileContents.length);
                readLen = fis.read(fileContents, 0, effLen); //head append

                transposeBytes(fileContents);

                String outFile = appDataDir + name;
                bytesToFile(fileContents, outFile);

                boolean del =deleteFile(fname);
                if(del){
                   Log.v(LOG_TAG, "Original file deleteted");
                }else{
                    Log.v(LOG_TAG, "Original file not deleted");
                    map.put("del_error", "Original file not deleted");
                }

                map.put("state", true); //ok
                return map;

            } catch (FileNotFoundException e) {
                e.printStackTrace();
                map.put("error", e.getCause());
            } catch (IOException e) {
                e.printStackTrace();
                map.put("error", e.getCause());
            } finally {
                try {
                    if (fis != null) fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        map.put("state", false); //bad
        //map.put("status", "FAILED");
        map.put("fail_reson", "Malformed file path");
        return map;
    }

    /**
     * Deletes the specified file from disk
     * @param fname file name
     * @return Returns true if success else false
     */
    protected boolean deleteFile(String fname){
        File downFolder = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
        File file = new File(downFolder.getAbsolutePath() + File.separator + fname);
        Log.i(LOG_TAG,">>>> Deleting file : " + file.getAbsolutePath());
        if(file.exists() && file.isFile()){
            boolean res =  file.delete();
            Log.i(LOG_TAG,res ? " > successful \n" : " > failure \n" );
        }
        return false;
    }


    /**
     * Writes a sequence of bytes to a file in disk at fpath
     * @param content byte contents to write
     * @param fpath path to file
     * @return Returns true if success else false
     */
    protected boolean bytesToFile(byte[] content, String fpath){
        Log.i(LOG_TAG,"------> Saving new file: " + fpath);
        File out = null;
        FileOutputStream fos = null;
        try{
            out = new File((fpath));
            if(out.exists() && out.isFile()){
                return true;
            }
            fos = new FileOutputStream(out);
            fos.write(content);
            if(out.exists()){
                Log.i(LOG_TAG,"Created new file");
            }else{
                Log.i(LOG_TAG,"Failed creating new file");
            }
            return true;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            Log.e(LOG_TAG,e.getMessage());
        } catch (IOException ex){
            ex.printStackTrace();
            Log.e(LOG_TAG,ex.getMessage());
        } finally {
            if(fos != null){
                try {
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return false;
    }

    protected void appendTailBytes(byte[] content, byte[] end, int offset){
        int j = 0;
        for(int i = offset; i < content.length; i++){
            content[i] = end[j++];
        }
    }

    protected void appendHeadBytes(byte[] content, byte[] header, int offset){
        for(int i = 0; i < header.length; i++){
            content[i] = header[i];
        }
    }

    /**
     * Decrypts a  pdf file by perfoming byte level transposition of elements
     * @param fname filename | File path .
     * @return A map communicating activity state and results
     */
    public Map<String, Object> decryptPdfFile(String fname){
        Map<String, Object> map = new HashMap<>();
        fname = fname.contains("/") ? fname.split("/")[fname.length()-1] :
                fname;
        Log.i(LOG_TAG, " --->  fname is : " + fname);
        String[] tokens = fname.split("\\.(?=[^\\.]+$)");
        String name = "", ext = "";
        if(tokens.length > 1) {
            Log.i(LOG_TAG, "File matches regex");
            name = tokens[0];
            ext = tokens[1];

            Log.i(LOG_TAG, "name : " + name + " | " + "ext : " + ext);
            String tmpFile = appDataDir + "tmp" + File.separator + name + ".pdf";
            File targetFile = new File(appDataDir + name);
            Log.i(LOG_TAG, "Decrypt >>> infile = " + targetFile.getAbsolutePath());
            Log.i(LOG_TAG, "Dec >>> out file = " + tmpFile);
            //decode file
            FileInputStream fis = null;
            int totalLen = 0, readLen = 0;
            byte[] content, effContent;

            if (targetFile.exists()) { //targetFile == In file
                try {
                    fis = new FileInputStream(targetFile);
                    totalLen = (int) targetFile.length();
                    content = new byte[totalLen];
                    readLen = fis.read(content, 0, totalLen);
                    if (readLen > 0) {
                        Log.i(LOG_TAG, "creating decoded pdf file");
                        File tempFile = new File(tmpFile);
                        if(!tempFile.getParentFile().exists()){
                            if(tempFile.getParentFile().mkdirs()){
                                Log.i(LOG_TAG, "created parent files well");
                            }else{
                                Log.i(LOG_TAG, "created parent files failed");
                            }
                        }

                        transposeBytes(content);

                        bytesToFile(content, tmpFile);
                        map.put("filePath", tmpFile);
                        map.put("state", true); //ok
                        return map;
                    }
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }else{
            Log.i(LOG_TAG, "file name not matched");
        }
        map.put("state", false); //bad
        //map.put("status", "FAILED");
        map.put("fail_reson", "Malformed file path");
        return map;
    }

    private void printHead(byte[] content){
        String head = "";
        byte[] fhead = new byte[100];
        for(int i = 0; i< 100;i++){
            fhead[i] = content[i];
        }
        head = new String(fhead);
        System.out.println("====> \n" + head);
    }

}
