package Project.offer;

import javax.persistence.*;

@Entity(name = "Offer")
@Table(name = "OFFERS")

public class Offer {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Offer{" +
                "id=" + id +
                ", description='" + description + '\'' +
                '}';
    }
}
