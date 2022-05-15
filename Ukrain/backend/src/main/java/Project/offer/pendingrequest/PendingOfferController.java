package Project.offer.pendingrequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
public class PendingOfferController {

    @Autowired
    private PendingOfferService pendingOfferService;

    @RequestMapping(path = "/pending_offers/{userID}/{offer_id}", method = RequestMethod.POST)
    public ResponseEntity<Boolean> savePendingOffer(@PathVariable Long userID, @PathVariable Long offer_id, @RequestBody String description) {
        var rez = pendingOfferService.save(userID, offer_id, description);
        return new ResponseEntity<>(rez, new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(path = "/pending_offers/getbyofferid/{offer_id}")
    public ResponseEntity<List<PendingOffer>> getAllPendingOffersForOfferId(@PathVariable Long offer_id) {
        return new ResponseEntity<>( pendingOfferService.getPendingOffersByOffer( offer_id), new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(path = "/pending_offers/confirmOffer/{id}", method = RequestMethod.POST)
    public ResponseEntity<Boolean> confirmOffer(@PathVariable Long id) {
        return new ResponseEntity<>( pendingOfferService.confirm(id), new HttpHeaders(), HttpStatus.OK);
    }


}
