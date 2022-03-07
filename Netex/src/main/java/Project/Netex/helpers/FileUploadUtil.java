package Project.Netex.helpers;


import java.io.*;
import java.nio.file.*;

import org.springframework.web.multipart.MultipartFile;

public class FileUploadUtil {


    public static void saveFile(String uploadDir, String fileName,
                                MultipartFile multipartFile) throws IOException {
        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            inputStream.close();
        } catch (IOException ioe) {
            throw new IOException("Could not save image file: " + fileName, ioe);
        }
    }

    public static void deleteFile(String uploadDir,String filename)  {


        Path uploadPath = Paths.get( uploadDir);
        System.out.println(uploadPath.toString());

        Path filePath = uploadPath.resolve(filename);
        System.out.println(filePath.toAbsolutePath());
        try{
            Files.delete(filePath.toAbsolutePath());
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}