package Project.offer;

import Project.appuser.AppUser;
import Project.appuser.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OfferService {

    @Autowired
    private OfferRepository repository;
    @Autowired
    private AppUserRepository appUserRepository;

    public List<Offer> getAll() {
        List<Offer> list = (List<Offer>) repository.findAll();

        if (list.size() == 0)
            list = new ArrayList<>();

        return list;
    }

    public List<Offer> getAllByUserId(Long id) {
        List<Offer> list = repository.findAllByAppUser(appUserRepository.getById(id));

        if (list.size() == 0)
            list = new ArrayList<>();

        return list;
    }

    public Long save(Offer offer, Long userID) {

        AppUser appUser = appUserRepository.getById(userID);
        offer.setCreatedAt(LocalDateTime.now() );
        offer.setAppUser(appUser);

        return repository.save(offer).getId();
    }

    public boolean update(String title, String description, Long ID){
       Offer offer =  repository.findById(ID).get();

       offer.setDescription(description);
       offer.setTitle(title);

       return true;
    }





}
