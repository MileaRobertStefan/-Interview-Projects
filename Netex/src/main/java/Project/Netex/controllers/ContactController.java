package Project.Netex.controllers;


import Project.Netex.models.Contact;
import Project.Netex.services.ContactService;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.minidev.json.JSONArray;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParseException;
import org.springframework.boot.json.JsonParser;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1")
public class ContactController {


    @Autowired
    private ContactService service;

    @RequestMapping(path = "/contacts", method = RequestMethod.GET)
    public ResponseEntity<List<Contact>> getAllContact() {

        var rez = service.getAllContacts();
        return new ResponseEntity<>(rez, new HttpHeaders(), HttpStatus.OK);
    }


    @RequestMapping(path = "/contacts/{NAME}", method = RequestMethod.GET)
    public ResponseEntity<List<Contact>> getAllContact(@PathVariable String NAME) {
        System.out.println(NAME);
        var rez = service.getContactByName(NAME);
        return new ResponseEntity<>(rez, new HttpHeaders(), HttpStatus.OK);
    }


    @RequestMapping(path = "/contacts", method = RequestMethod.POST)
    public ResponseEntity<Boolean> saveContacts (@RequestBody List<Contact> body) throws ParseException {

        Boolean rez =  service.saveContacts(body);

        return new ResponseEntity<>(rez, new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(path = "/contact", method = RequestMethod.POST)
    public ResponseEntity<Boolean> saveContacts (@RequestBody Contact body) throws ParseException {

        Boolean rez =  service.saveContact(body);
        return new ResponseEntity<>(rez, new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(path = "/csv", method = RequestMethod.GET)
    public ResponseEntity<String> csv (){

        var rez =  service.toCSV();
        return new ResponseEntity<>(rez, new HttpHeaders(), HttpStatus.OK);
    }
}
