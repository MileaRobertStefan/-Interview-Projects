package Project.county;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {
    @Autowired
    private CityRepository cityRepository;
    @Autowired
    private CountyRepository countyRepository;
    List<City> getByCountyId(Long countyID){
        return  cityRepository.findAllByCounty( countyRepository.getById(countyID), Sort.by(Sort.Direction.ASC,"name") );
    }
}
