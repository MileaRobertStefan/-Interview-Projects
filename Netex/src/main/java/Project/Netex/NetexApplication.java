package Project.Netex;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;


@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class NetexApplication {

	public static void main(String[] args) {
		SpringApplication.run(NetexApplication.class, args);
	}

}
