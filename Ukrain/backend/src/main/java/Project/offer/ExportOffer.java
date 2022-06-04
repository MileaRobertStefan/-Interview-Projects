package Project.offer;

import Project.appuser.ExportUser;
import Project.county.City;
import Project.county.County;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

public class ExportOffer {

    public Long id;
    public String description;

    public ExportUser appUser;
    public  String title;

    public String locality;
    public Integer maxRefuge;

    public County county;
    public City city;
    public String period;
    public String wiling2host;
    public String typeOfAccomodation;


    public ExportOffer(Offer offer) {
        this.id = offer.getId();
        this.description = offer.getDescription();
        this.appUser = new ExportUser(offer.getAppUser());
        this.title = offer.getTitle();
        this.locality = offer.getLocality();
        this.maxRefuge = offer.getMaxRefuge();
        this.county = offer.getCounty();
        this.city = offer.getCity();
        this.period= offer.getPeriod();
        this.wiling2host = offer.getWiling2host();
        this.typeOfAccomodation = offer.getTypeOfAccomodation();
    }
}
