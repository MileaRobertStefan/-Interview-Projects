package Project.Netex.controllers;


import Project.Netex.helpers.FileUploadUtil;
import Project.Netex.models.Contact;
import Project.Netex.services.ContactService;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.minidev.json.JSONArray;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParseException;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("api/v1")
public class ContactController {


    @Autowired
    private ContactService service;
    ObjectMapper objectMapper = new ObjectMapper();


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

    @RequestMapping(path = "/contacts/{NAME}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteContract(@PathVariable String NAME) {
        var rez = service.deleteByName(NAME);
        return new ResponseEntity<>(rez, new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(path = "/contact", method = RequestMethod.POST)
    public ResponseEntity<Boolean> saveContacts(@RequestParam("contact") String scontact, @RequestParam("files") MultipartFile multipartFile) throws ParseException, IOException {
        Contact contact = new ObjectMapper().readValue(scontact, Contact.class);

        boolean rez = service.saveContact(contact);
        rez &= service.savePhoto(multipartFile);

        return new ResponseEntity<>(rez, new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(path = "/csv", method = RequestMethod.GET)
    public ResponseEntity<String> csv() {

        var rez = service.toCSV();
        return new ResponseEntity<>(rez, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping("/photo")
    public ResponseEntity<Boolean> saveUser(@RequestParam("files") MultipartFile multipartFile) {
        var rez  = service.savePhoto(multipartFile);
        return new ResponseEntity<>(rez, new HttpHeaders(), HttpStatus.OK);
    }


}
