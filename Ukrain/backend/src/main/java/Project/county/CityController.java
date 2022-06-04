package Project.county;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("api/v1")
public class CityController {
    @Autowired
    private  CityService cityService;

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<List<City>> getAllCounties(@PathVariable Long id){
        List<City> result = cityService.getByCountyId(id);

        return new ResponseEntity<>(result, new HttpHeaders(), HttpStatus.OK);
    }
}
