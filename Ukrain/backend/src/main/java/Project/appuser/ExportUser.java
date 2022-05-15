package Project.appuser;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;


public class ExportUser {
    public String firstName;
    public String lastName;
    public String email;
    @Enumerated(EnumType.STRING)
    public AppUserRole appUserRole;
    public Long id;

    public  ExportUser(AppUser appUser){

        this.firstName = appUser.getFirstName();
        this.lastName = appUser.getLastName();
        this.email = appUser.getEmail();
        this.appUserRole = appUser.getAppUserRole();
        this.id = appUser.getId();


    }
}
