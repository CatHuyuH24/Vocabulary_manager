package com.cloudintroduction.vocabulary_manager.words;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/words")
public class WordController {
    private final WordRepository wordRepository;

    WordController(WordRepository repo) {
        wordRepository = repo;
    }

    @GetMapping("")
    List<Word> getAllWords() {
        return wordRepository.getAllWords();
    }

}
