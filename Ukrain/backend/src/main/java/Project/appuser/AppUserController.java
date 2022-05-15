package Project.appuser;

import Project.offer.Offer;
import Project.offer.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("api/v1")
public class AppUserController {



    @Autowired
    private AppUserService service;

    @RequestMapping(path = "/user/{email}", method = RequestMethod.GET)
    public ResponseEntity<ExportUser> getAllOffer(@PathVariable String email) {
        var appUser = service.getUserByEmail(email);

        return new ResponseEntity<>(new ExportUser(appUser), new HttpHeaders(), HttpStatus.OK);
    }



}




