package com.cloudintroduction.vocabulary_manager.word;

public class WordNotFoundException extends Exception {
    WordNotFoundException() {
        super("Word can not be found");
    }

    WordNotFoundException(String message) {
        super(message);
    }
}
