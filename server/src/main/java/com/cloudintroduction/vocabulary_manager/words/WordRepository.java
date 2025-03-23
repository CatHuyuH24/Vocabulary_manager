package com.cloudintroduction.vocabulary_manager.words;

import java.util.List;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
public class WordRepository {
    private JdbcClient jdbcClient;

    WordRepository(JdbcClient client) {
        jdbcClient = client;
    }

    List<Word> getAllWords() {
        return jdbcClient.sql("SELECT * FROM WORDS").query(Word.class).list();
    }
}
