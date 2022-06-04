package Project.offer;

import Project.appuser.AppUser;
import Project.county.City;
import Project.county.County;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;


@Getter
@Setter
@ToString
@Entity(name = "Offer")
@Table(name = "OFFERS")
public class Offer {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String description;
    private String title;

    private String locality;
    private Integer maxRefuge;

    @ManyToOne
    @JoinColumn(name = "county_id")
    private County county;
    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;
    private String period;
    private String wiling2host;
    private String typeOfAccomodation;



    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "user_id"
    )
    private AppUser appUser;

}
