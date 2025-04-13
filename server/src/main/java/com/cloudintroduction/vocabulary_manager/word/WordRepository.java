package com.cloudintroduction.vocabulary_manager.word;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeAction;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.AttributeValueUpdate;
import software.amazon.awssdk.services.dynamodb.model.DeleteItemRequest;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.dynamodb.model.ScanRequest;
import software.amazon.awssdk.services.dynamodb.model.UpdateItemRequest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class WordRepository {
    private static final Logger logger = LoggerFactory.getLogger(WordRepository.class);
    private final DynamoDbClient dynamoDbClient;
    private final String TABLE_NAME = "Words";

    WordRepository(DynamoDbClient dynamoDbClient) {
        this.dynamoDbClient = dynamoDbClient;
    }

    List<Word> getAllWords() {
        var scanRequest = ScanRequest.builder().tableName(TABLE_NAME).build();
        try {
            return dynamoDbClient.scan(scanRequest).items().stream()
                    .map(item -> new Word(
                            Integer.parseInt(item.get("id").n()),
                            item.get("word").s(),
                            item.get("description").s(),
                            LocalDateTime.parse(item.get("lastModified").s()),
                            Integer.parseInt(item.get("priority").n())))
                    .collect(Collectors.toList());
        } catch (DynamoDbException e) {
            logger.error("WordRepository: Exception occurred while fetching all words: {}", e.getMessage());
            throw e;
        }
    }

    Optional<Word> getWordById(int id) {
        var getItemRequest = GetItemRequest.builder()
                .tableName(TABLE_NAME)
                .key(Map.of("id", AttributeValue.builder().n(String.valueOf(id)).build()))
                .build();
        try {
            var item = dynamoDbClient.getItem(getItemRequest).item();
            if (item.isEmpty()) {
                return Optional.empty();
            }
            return Optional.of(new Word(
                    Integer.parseInt(item.get("id").n()),
                    item.get("word").s(),
                    item.get("description").s(),
                    LocalDateTime.parse(item.get("lastModified").s()),
                    Integer.parseInt(item.get("priority").n())));
        } catch (DynamoDbException e) {
            logger.error("WordRepository: Exception occurred while fetching word with id {}: {}", id, e.getMessage());
            return Optional.empty();
        }
    }

    void createWord(Word word) throws IllegalArgumentException {

        // Check if a word with the same ID already exists
        // var getItemRequest = GetItemRequest.builder()
        // .tableName(TABLE_NAME)
        // .key(Map.of("id",
        // AttributeValue.builder().n(String.valueOf(word.id())).build()))
        // .build();
        try {
            // var item = dynamoDbClient.getItem(getItemRequest).item();
            // if (!item.isEmpty()) {
            // throw new IllegalArgumentException("A word with ID " + word.id() + " already
            // exists.");
            // }

            // Proceed to create the new word
            var putItemRequest = PutItemRequest.builder()
                    .tableName(TABLE_NAME)
                    .item(Map.of(
                            "id", AttributeValue.builder().n(String.valueOf(word.id())).build(),
                            "word", AttributeValue.builder().s(word.word()).build(),
                            "description", AttributeValue.builder().s(word.description()).build(),
                            "lastModified", AttributeValue.builder().s(word.lastModified().toString()).build(),
                            "priority", AttributeValue.builder().n(String.valueOf(word.priority())).build()))
                    .build();

            dynamoDbClient.putItem(putItemRequest);
        } catch (DynamoDbException e) {
            logger.error("WordRepository: Exception occurred while creating a new word: {}", e.getMessage());
            throw e;
        }
    }

    void deleteWordById(int id) throws WordNotFoundException {
        var getItemRequest = GetItemRequest.builder()
                .tableName(TABLE_NAME)
                .key(Map.of("id", AttributeValue.builder().n(String.valueOf(id)).build()))
                .build();
        try {
            var item = dynamoDbClient.getItem(getItemRequest).item();
            if (item.isEmpty()) {
                throw new WordNotFoundException("Word with id " + id + " not found.");
            }

            var deleteItemRequest = DeleteItemRequest.builder()
                    .tableName(TABLE_NAME)
                    .key(Map.of("id", AttributeValue.builder().n(String.valueOf(id)).build()))
                    .build();
            dynamoDbClient.deleteItem(deleteItemRequest);
        } catch (DynamoDbException e) {
            logger.error("Exception occurred while deleting word with id {}: {}", id, e.getMessage());
            throw e;
        }
    }

    void updateWordById(int id, Word newWord) throws WordNotFoundException {
        // Validate that the newWord.id matches the id parameter
        if (newWord.id() != id) {
            throw new IllegalArgumentException(
                    "The ID of the new word does not match the ID of the word to be updated.");
        }

        var getItemRequest = GetItemRequest.builder()
                .tableName(TABLE_NAME)
                .key(Map.of("id", AttributeValue.builder().n(String.valueOf(id)).build()))
                .build();
        try {
            var item = dynamoDbClient.getItem(getItemRequest).item();
            if (item.isEmpty()) {
                throw new WordNotFoundException("Word with id " + id + " not found.");
            }

            var updateItemRequest = UpdateItemRequest.builder()
                    .tableName(TABLE_NAME)
                    .key(Map.of("id", AttributeValue.builder().n(String.valueOf(id)).build()))
                    .attributeUpdates(Map.of(
                            "word",
                            AttributeValueUpdate.builder().value(AttributeValue.builder().s(newWord.word()).build())
                                    .action(AttributeAction.PUT).build(),
                            "description",
                            AttributeValueUpdate.builder()
                                    .value(AttributeValue.builder().s(newWord.description()).build())
                                    .action(AttributeAction.PUT).build(),
                            "lastModified",
                            AttributeValueUpdate.builder()
                                    .value(AttributeValue.builder().s(newWord.lastModified().toString()).build())
                                    .action(AttributeAction.PUT).build(),
                            "priority",
                            AttributeValueUpdate.builder()
                                    .value(AttributeValue.builder().n(String.valueOf(newWord.priority())).build())
                                    .action(AttributeAction.PUT).build()))
                    .build();
            dynamoDbClient.updateItem(updateItemRequest);
        } catch (DynamoDbException e) {
            logger.error("WordRepository: Exception occurred while updating word with id {}: {}", id, e.getMessage());
            throw e;
        }
    }
}