package com.cloudintroduction.vocabulary_manager.words;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.dynamodb.model.ScanRequest;

@Repository
public class WordRepository {
    private static final Logger logger = LoggerFactory.getLogger(WordRepository.class);
    private final DynamoDbClient dynamoDbClient;
    private final String tableName = "Words";

    public WordRepository(DynamoDbClient dynamoDbClient) {
        this.dynamoDbClient = dynamoDbClient;
    }

    public List<Word> getAllWords() {
        logger.info("Fetching all words from DynamoDB...");
        var scanRequest = ScanRequest.builder().tableName(tableName).build();
        return dynamoDbClient.scan(scanRequest).items().stream()
                .map(item -> new Word(
                        Integer.parseInt(item.get("id").n()),
                        item.get("word").s(),
                        item.get("description").s(),
                        LocalDateTime.parse(item.get("lastModified").s()), // DynamoDB does not support LocalDateTime
                                                                           // directly
                        Integer.parseInt(item.get("priority").n())))
                .collect(Collectors.toList());
    }

    public Optional<Word> getWordById(int id) {
        var getItemRequest = GetItemRequest.builder()
                .tableName(tableName)
                .key(Map.of("id", AttributeValue.builder().n(String.valueOf(id)).build()))
                .build();
        var item = dynamoDbClient.getItem(getItemRequest).item();
        if (item.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(new Word(
                Integer.parseInt(item.get("id").n()),
                item.get("word").s(),
                item.get("description").s(),
                null,
                Integer.parseInt(item.get("priority").n())));
    }

    public void createWord(Word word) {
        var putItemRequest = PutItemRequest.builder()
                .tableName(tableName)
                .item(Map.of(
                        "id", AttributeValue.builder().n(String.valueOf(word.id())).build(),
                        "word", AttributeValue.builder().s(word.word()).build(),
                        "description", AttributeValue.builder().s(word.description()).build(),
                        "lastModified", AttributeValue.builder().s(word.lastModified().toString()).build(),
                        "priority", AttributeValue.builder().n(String.valueOf(word.priority())).build()))
                .build();
        dynamoDbClient.putItem(putItemRequest);
    }
}