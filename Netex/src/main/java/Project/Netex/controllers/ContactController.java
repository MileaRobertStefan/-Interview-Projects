package Project.Netex.controllers;


import Project.Netex.models.Contact;
import Project.Netex.services.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1")
public class ContactController {

    @Autowired
    private ContactService service;

    @RequestMapping(path = "/contacts", method = RequestMethod.GET)
    public ResponseEntity<List<Contact>> getAllContact() {

        List<Contact> myRez = service.getAllContacts();

        return new ResponseEntity<>(myRez, new HttpHeaders(), HttpStatus.OK);
    }

}
