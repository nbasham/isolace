package com.isolace.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.logging.Logger;

public class FileUtil {

    private static final Logger log = Logger.getLogger(FileUtil.class.getName());

    public static final String readStringFromFile(String path) {
        StringBuilder sb = new StringBuilder();
        try {
            BufferedReader in = new BufferedReader(new FileReader(path));
            String str;
            while ((str = in.readLine()) != null) {
                sb.append(str);
                sb.append("\r");
            }
            in.close();
        } catch (IOException e) {
            log.warning(e.getMessage());
        }
        return sb.toString();
    }

    public static final void writeToFile(String path, String content) {
        try {
            BufferedWriter out = new BufferedWriter(new FileWriter(path));
            out.write(content);
            out.close();
        } catch (Exception e) {
            log.warning(e.getMessage());
        }

    }
}
