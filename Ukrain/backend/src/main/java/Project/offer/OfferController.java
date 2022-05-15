package Project.offer;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("api/v1")
public class OfferController {

    @Autowired
    private OfferService service;

    @RequestMapping(path = "/offers", method = RequestMethod.GET)
    public ResponseEntity<List<ExportOffer>> getAllOffer() {
        List<ExportOffer> rez = new ArrayList<>();

        for(var el : service.getAll()){
            rez.add( new ExportOffer(el));
        }

        return new ResponseEntity<>(rez, new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(path = "/offers/{id}", method = RequestMethod.POST)
    public ResponseEntity<Long> saveOffer(@RequestBody Offer offer,@PathVariable Long id) {
        Long rez = service.save(offer, id);
        return new ResponseEntity<>(rez, new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(path = "/offers/update/{id}", method = RequestMethod.POST)
    public ResponseEntity<Boolean> updateOffer(@RequestBody Offer offer,@PathVariable Long id) {
        var rez = service.update(offer.getTitle(), offer.getDescription(), id);
        return new ResponseEntity<>(rez, new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(path = "/offers/{id}", method = RequestMethod.GET)
    public ResponseEntity<List<ExportOffer>> saveOffer(@PathVariable Long id) {

        List<ExportOffer> rez = new ArrayList<>();

        for( var el: service.getAllByUserId(id)){
            rez.add( new ExportOffer(el));
        }

        return new ResponseEntity<>(rez, new HttpHeaders(), HttpStatus.OK);
    }


}
