package Project.controllers;


import Project.models.User;
import Project.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("api/v1")
public class UserController {

    @Autowired
    private UserService service;

    @RequestMapping(path = "/users", method = RequestMethod.GET)
    public ResponseEntity<List<User>> getAllUsers() {
        var rez = service.getAll();
        return new ResponseEntity<>(rez, new HttpHeaders(), HttpStatus.OK);
    }


    @RequestMapping(path = "/users", method = RequestMethod.POST)
    public ResponseEntity<Boolean> saveUser(@RequestBody User user){
        boolean rez = service.save(user);
        return new ResponseEntity<>(rez, new HttpHeaders(), HttpStatus.OK);
    }

}
