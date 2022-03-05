package Project.Netex.reposioty;


import Project.Netex.models.Contact;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface  MyContactsRepository extends CrudRepository<Contact, Long> {
}
