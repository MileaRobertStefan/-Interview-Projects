package Project.county;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table( name = "account_county")
@Getter
@Setter
@Entity
public class County {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;
    private String code;
    private String name;

}
