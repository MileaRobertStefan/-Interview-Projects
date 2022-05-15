package Project.offer.pendingrequest;

import Project.offer.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PendingOfferRepository extends JpaRepository<PendingOffer, Long> {

    List<PendingOffer> findAllByOffer(Offer offer);
}