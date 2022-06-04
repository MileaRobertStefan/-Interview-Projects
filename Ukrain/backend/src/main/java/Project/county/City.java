package Project.county;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity( name = "City")
@Table( name = "account_city")

@Setter
public class City {
    @Id
    @Column(name = "id", nullable = false)
    public Long id;
    @ManyToOne
    @JoinColumn(name = "county_id")
    private County county;
    public String name;



}
