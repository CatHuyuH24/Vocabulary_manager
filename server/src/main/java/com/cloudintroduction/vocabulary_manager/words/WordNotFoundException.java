package com.cloudintroduction.vocabulary_manager.words;

public class WordNotFoundException extends Exception {
    WordNotFoundException() {
        super("Word not found");
    }
}
