package Project.Netex.models;



import com.fasterxml.jackson.annotation.JsonCreator;

import javax.persistence.*;

@Entity(name = "Contact")
@Table(name = "CONTACTS")
public class Contact {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String picture;
    private String name;
    private String address;

    protected Contact() {};

    @JsonCreator
    public Contact(String picture, String name, String address) {
        this.picture = picture;
        this.name = name;
        this.address = address;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public static String getCSVH(){
        return "ID,\tNAME,\tADDRESS,\tPICTURE";
    }

    public String toCSV(){
        return "\n" + getId() + " , " + getName() + " , " + getAddress() + " , " + getPicture() ;
    }
}
