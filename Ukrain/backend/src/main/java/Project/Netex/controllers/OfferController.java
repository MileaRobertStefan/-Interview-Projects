package Project.Netex.controllers;

import Project.Netex.models.Offer;
import Project.Netex.services.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("api/v1")
public class OfferController {

    @Autowired
    private OfferService service;

    @RequestMapping(path = "/offers", method = RequestMethod.GET)
    public ResponseEntity<List<Offer>> getAllOffer() {
        var rez = service.getAll();
        return new ResponseEntity<>(rez, new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(path = "/offers", method = RequestMethod.POST)
    public ResponseEntity<Boolean> saveOffer(@RequestBody Offer offer) {
        System.out.println(offer);
        Boolean rez = service.save(offer);
        return new ResponseEntity<>(rez, new HttpHeaders(), HttpStatus.OK);
    }


}
