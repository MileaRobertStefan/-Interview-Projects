package Project.Netex.reposioty;


import Project.Netex.models.Contact;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.lang.model.element.Name;

@Repository

public interface  MyContactsRepository extends CrudRepository<Contact, Long> {

   public Iterable<Contact> findContactByNameStartingWith(String Name);

   public Iterable<Contact> findContactByName(String Name);

}
