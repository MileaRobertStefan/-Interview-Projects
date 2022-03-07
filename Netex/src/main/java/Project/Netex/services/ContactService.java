package Project.Netex.services;


import Project.Netex.helpers.FileUploadUtil;
import Project.Netex.models.Contact;
import Project.Netex.reposioty.MyContactsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.lang.model.element.Name;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ContactService {
    private static final String uploadDir = "user-photos/";
    @Autowired
    private MyContactsRepository repository;

    public List<Contact> getAllContacts() {
        List<Contact> contacts = (List<Contact>) repository.findAll();

        if (contacts.size() == 0)
            contacts = new ArrayList<>();

        return contacts;
    }

    public List<Contact> getContactByName(String name) {
        if (name == null) return null;

        List<Contact> rez = (List<Contact>) repository.findContactByNameStartingWith(name);
        System.out.println(rez);
        return rez;
    }

    public boolean deleteByName(String name) {
        List<Contact> entities = (List<Contact>) repository.findContactByName(name);
        if (entities.size() == 0) {
            return false;
        }

        FileUploadUtil.deleteFile(uploadDir, entities.get(0).getPicture());
        repository.delete(entities.get(0));
        return true;
    }

    public boolean saveContacts(List<Contact> contacts) {
        if (contacts == null) return false;

        repository.saveAll(contacts);
        return true;
    }

    public boolean saveContact(Contact contact) {
        if (contact == null) return false;

        List<Contact> c = (List<Contact>) repository.findContactByName(contact.getName());

        if (c.size() == 0) {
            repository.save(contact);
            return false;
        }

        FileUploadUtil.deleteFile(uploadDir, c.get(0).getPicture());
        contact.setId(c.get(0).getId());
        repository.save(contact);
        return true;
    }

    public String toCSV() {

        var contacts = repository.findAll();

        StringBuilder stringBuilder = new StringBuilder();

        stringBuilder.append(Contact.getCSVH());

        for (var contact : contacts) {
            stringBuilder.append(contact.toCSV());
        }

        return stringBuilder.toString();
    }

    public boolean savePhoto(MultipartFile multipartFile, String name) {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));

        try {
            FileUploadUtil.saveFile(uploadDir, name + "_" + fileName, multipartFile);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

}
