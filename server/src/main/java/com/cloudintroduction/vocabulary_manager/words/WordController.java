package com.cloudintroduction.vocabulary_manager.words;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

    @GetMapping("/{id}")
    Word getWordById(@PathVariable int id) throws WordNotFoundException {
        Optional<Word> word = wordRepository.getWordById(id);
        if (word.isEmpty()) {
            throw new WordNotFoundException();
        } else {
            return word.get();
        }
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    void createNewWord(@RequestBody Word word) {
        wordRepository.createWord(word);
    }

}
