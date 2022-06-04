package Project.county;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("api/v1")
public class CountyController {

    @Autowired
    private CountyService countyService;

    @RequestMapping(path = "/county", method = RequestMethod.GET)
    public ResponseEntity< List<County> > getAllCounties(){
        List<County> result = countyService.getAll();

        return new ResponseEntity<>(result, new HttpHeaders(), HttpStatus.OK);
    }
}
