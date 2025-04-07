package com.cloudintroduction.vocabulary_manager.word;

import java.time.LocalDateTime;

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

    // Convert Word to WordDTO
    public static WordDTO fromWord(Word word) {
        return new WordDTO(word.id(), word.word(), word.description(), word.lastModified(), word.priority());
    }
}