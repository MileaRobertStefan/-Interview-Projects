package Project.offer.pendingrequest;


import Project.appuser.AppUser;
import Project.offer.Offer;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter

@Entity(name = "PendingOffer")
@Table(name = "PendingOffers")
public class PendingOffer {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "app_user_id")
    private AppUser reguestedbyuser;

    @ManyToOne
    @JoinColumn(name = "offer_id")
    private Offer offer;

    private Boolean accepted = false;
    @Column(nullable = false)
    private LocalDateTime createdAt;
    private LocalDateTime confirmedAt;

    private String description;
}
