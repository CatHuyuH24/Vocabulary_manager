package com.cloudintroduction.vocabulary_manager;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeAction;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.AttributeValueUpdate;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;
import software.amazon.awssdk.services.dynamodb.model.ReturnValue;
import software.amazon.awssdk.services.dynamodb.model.UpdateItemRequest;

@Component
public class Counters {
    private final DynamoDbClient dynamoDbClient;
    private static final Logger logger = LoggerFactory.getLogger(Counters.class);

    // Constructor to inject DynamoDbClient
    public Counters(DynamoDbClient client) {
        this.dynamoDbClient = client;
    }

    public int incToNextWordIdAndReturn() {
        // Update the "Counters" table and increment the "currentValue" attribute for
        // "wordCounter"
        UpdateItemRequest updateRequest = UpdateItemRequest.builder()
                .tableName("Counters") // Correct table name
                .key(Map.of("counterName", AttributeValue.builder().s("wordCounter").build())) // Correct key attribute
                .attributeUpdates(Map.of(
                        "currentValue", AttributeValueUpdate.builder() // Correct attribute name
                                .value(AttributeValue.builder().n("1").build())
                                .action(AttributeAction.ADD)
                                .build()))
                .returnValues(ReturnValue.UPDATED_NEW)
                .build();

        try {
            var response = dynamoDbClient.updateItem(updateRequest);
            return Integer.parseInt(response.attributes().get("currentValue").n()); // Correct attribute name
        } catch (DynamoDbException e) {
            logger.error("Failed to get next ID: {}", e.getMessage());
            throw e;
        }
    }
}