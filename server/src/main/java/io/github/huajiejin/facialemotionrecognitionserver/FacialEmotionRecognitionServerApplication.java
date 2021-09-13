package io.github.huajiejin.facialemotionrecognitionserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.AuthenticationWebFilter;

@SpringBootApplication
public class FacialEmotionRecognitionServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FacialEmotionRecognitionServerApplication.class, args);
	}

//	@Bean
//	public SecurityWebFilterChain chain(ServerHttpSecurity http, AuthenticationWebFilter webFilter) {
//		return http.authorizeExchange().anyExchange().permitAll().and()
//				.csrf().disable()
//				.build();
//	}

}
