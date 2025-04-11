package com.cloudintroduction.vocabulary_manager.word;

import java.time.LocalDateTime;

import com.cloudintroduction.vocabulary_manager.Counters;
import com.cloudintroduction.vocabulary_manager.ApplicationContextProvider;

public record WordDTO(
        Integer id,
        String word,
        String description,
        LocalDateTime lastModified,
        Integer priority) {

    // Convert WordDTO to Word
    public Word toWord() {
        return new Word(id, word, description, lastModified, priority);
    }

    public Word toWordToBeCreatedWithUniqueID() {
        Counters counter = ApplicationContextProvider.getBean(Counters.class); // Retrieve Counter bean
        int nextId = counter.incToNextWordIdAndReturn();
        return new Word(nextId, word, description, lastModified, priority);
    }

    // Convert Word to WordDTO
    public static WordDTO fromWord(Word word) {
        return new WordDTO(word.id(), word.word(), word.description(), word.lastModified(), word.priority());
    }
}