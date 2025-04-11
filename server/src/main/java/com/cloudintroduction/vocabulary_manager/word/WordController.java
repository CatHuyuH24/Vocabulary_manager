package com.cloudintroduction.vocabulary_manager.word;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/words")
public class WordController {
    private final WordRepository wordRepository;
    private static final Logger logger = LoggerFactory.getLogger(WordController.class);

    WordController(WordRepository repo) {
        wordRepository = repo;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("")
    List<WordDTO> getAllWords() {
        try {
            return wordRepository.getAllWords().stream()
                    .map(WordDTO::fromWord) // Convert Word to WordDTO
                    .toList();
        } catch (DynamoDbException e) {
            logger.error("WordController: Exception occurred while fetching all words: {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error fetching all words.");
        }
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    WordDTO getWordById(@PathVariable int id) {
        try {
            Optional<Word> word = wordRepository.getWordById(id);
            if (word.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Word with ID " + id + " not found.");
            } else {
                return WordDTO.fromWord(word.get()); // Convert Word to WordDTO
            }
        } catch (DynamoDbException e) {
            logger.error("WordController: Exception occurred while fetching word with id {}: {}", id, e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error fetching word with ID " + id);
        }
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    int createNewWord(@RequestBody WordDTO wordDTO) {
        try {
            Word createdWord = wordDTO.toWordToBeCreatedWithUniqueID();// the new id assignment happens
                                                                       // transparently here
            wordRepository.createWord(createdWord);
            return createdWord.id();
        } catch (IllegalArgumentException e) {
            logger.error("WordController: {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        } catch (DynamoDbException e) {
            logger.error("WordController: Exception occurred while creating a new word: {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error creating word.");
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}")
    public void updateWordById(@PathVariable int id, @RequestBody WordDTO newWordDTO) {
        try {
            wordRepository.updateWordById(id, newWordDTO.toWord()); // Convert WordDTO to Word
        } catch (IllegalArgumentException e) {
            logger.error("WordController: {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (WordNotFoundException e) {
            logger.error("WordController: {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (DynamoDbException e) {
            logger.error("WordController: Exception occurred while updating word with id {}: {}", id, e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error updating word.");
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteWordById(@PathVariable int id) {
        try {
            wordRepository.deleteWordById(id);
        } catch (WordNotFoundException e) {
            logger.error("WordController: {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (DynamoDbException e) {
            logger.error("WordController: Exception occurred while deleting word with id {}: {}", id, e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error deleting word.");
        }
    }
}