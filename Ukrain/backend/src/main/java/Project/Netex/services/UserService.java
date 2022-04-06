package Project.Netex.services;

import Project.Netex.models.Offer;
import Project.Netex.models.User;
import Project.Netex.reposioty.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;


    public List<User> getAll() {
        List<User> list = (List<User>) repository.findAll();

        if (list.size() == 0)
            list = new ArrayList<>();

        return list;
    }

    public boolean save(User user){
        if( user == null) return  false;
        repository.save(user);
        return true;
    }
}