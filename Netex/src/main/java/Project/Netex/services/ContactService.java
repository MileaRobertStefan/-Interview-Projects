package Project.Netex.services;


import Project.Netex.models.Contact;
import Project.Netex.reposioty.MyContactsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContactService {

    @Autowired
    private MyContactsRepository repository;

    public List<Contact> getAllContacts() {
        List<Contact> contacts = (List<Contact>) repository.findAll();

        if (contacts.size() == 0)
            contacts = new ArrayList<>();

        return contacts;
    }


}
