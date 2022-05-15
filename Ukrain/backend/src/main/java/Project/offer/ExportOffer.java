package Project.offer;

import Project.appuser.ExportUser;

public class ExportOffer {

    public Long id;
    public String description;

    public ExportUser appUser;
    public  String title;

    public String locality;
    public Integer maxRefuge;

    public ExportOffer(Offer offer) {
        this.id = offer.getId();
        this.description = offer.getDescription();
        this.appUser = new ExportUser(offer.getAppUser());
        this.title = offer.getTitle();
        this.locality = offer.getLocality();
        this.maxRefuge = offer.getMaxRefuge();
    }
}
