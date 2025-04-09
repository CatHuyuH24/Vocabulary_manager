package com.cloudintroduction.vocabulary_manager.word;

import java.time.LocalDateTime;

public record Word(
        Integer id,
        String word,
        String description,
        LocalDateTime lastModified,
        Integer priority) {
}
