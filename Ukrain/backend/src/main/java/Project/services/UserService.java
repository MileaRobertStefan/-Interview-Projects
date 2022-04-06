package Project.services;

import Project.models.User;
import Project.reposioty.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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