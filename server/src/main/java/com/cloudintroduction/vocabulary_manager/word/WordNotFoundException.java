package com.cloudintroduction.vocabulary_manager.word;

public class WordNotFoundException extends Exception {
    WordNotFoundException() {
        super("Word not found");
    }

    WordNotFoundException(String message) {
        super(message);
    }
}
