package Project.county;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class CountyService {

    @Autowired
    private CountyRepository countyRepository;



    List<County> getAll() {
        return countyRepository.findAll(Sort.by(Sort.Direction.ASC,"name"));
    }



}
