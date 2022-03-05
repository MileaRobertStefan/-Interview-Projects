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

    public List<Contact> getContactByName(String name) {
        if (name == null) return null;

        List<Contact> rez = (List<Contact>) repository.findContactByName(name);
        System.out.println(rez);
        return rez;
    }

    public boolean saveContacts(List<Contact> contacts) {
        if (contacts == null) return false;

        repository.saveAll(contacts);
        return true;
    }

    public boolean saveContact(Contact contact) {
        if (contact == null) return false;

        List<Contact>  c = (List<Contact>) repository.findContactByName( contact.getName() );

        if (c.size() == 0 ){
            return false;
        }

        contact.setId( c.get(0).getId() );
        repository.save(contact);
        return true;
    }

    public String toCSV(){

        var contacts = repository.findAll();

        StringBuilder stringBuilder = new StringBuilder();

        stringBuilder.append(Contact.getCSVH());

        for( var contact : contacts){
          stringBuilder.append(contact.toCSV());
        }

        return stringBuilder.toString();
    }

}
