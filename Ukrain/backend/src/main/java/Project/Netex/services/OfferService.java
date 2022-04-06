package Project.Netex.services;

import Project.Netex.models.Offer;
import Project.Netex.reposioty.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OfferService {

    @Autowired
    private OfferRepository repository;

    public List<Offer> getAll(){
        List<Offer> list = (List<Offer>) repository.findAll();

        if (list.size() == 0)
            list = new ArrayList<>();

        return list;
    }

    public  boolean save(Offer offer){
        if( offer == null) return  false;


        repository.save(offer);
        return true;
    }

}
