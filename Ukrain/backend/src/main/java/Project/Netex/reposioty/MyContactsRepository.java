package Project.Netex.reposioty;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface  MyContactsRepository extends CrudRepository<Contact, Long> {

   public Iterable<Contact> findContactByNameStartingWith(String Name);

   public Iterable<Contact> findContactByName(String Name);

}
