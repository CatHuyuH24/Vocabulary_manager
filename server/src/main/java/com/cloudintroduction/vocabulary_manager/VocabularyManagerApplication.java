package com.cloudintroduction.vocabulary_manager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class VocabularyManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(VocabularyManagerApplication.class, args);
		System.out.println("Server started...");
	}

}
