# Setting up DynamoDB Local

This guide will help you set up a local DynamoDB environment for your Java Spring Vocabulary Manager project on Windows using PowerShell and Docker.

## Prerequisites

- Docker Desktop installed and running
- AWS CLI installed
- PowerShell

## Step 1: Start DynamoDB Local using Docker

Open PowerShell and run:

```powershell
docker run -d -p 8000:8000 --name dynamodb-local amazon/dynamodb-local:latest
```

Check that the container is running:
```powershell
docker ps
```

## Step 2: Configure AWS CLI for Local Development

Open PowerShell and run:

```powershell
aws configure
```

Enter the following values:
- AWS Access Key ID: `dummy`
- AWS Secret Access Key: `dummy`
- Default region name: `us-east-1`
- Default output format: `json`

## Step 3: Create Required Tables

### Create Counters Table

```powershell
aws dynamodb create-table `
  --table-name Counters `
  --attribute-definitions AttributeName=counterName,AttributeType=S `
  --key-schema AttributeName=counterName,KeyType=HASH `
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 `
  --endpoint-url http://localhost:8000
```

### Create Words Table

```powershell
aws dynamodb create-table `
  --table-name Words `
  --attribute-definitions AttributeName=id,AttributeType=N `
  --key-schema AttributeName=id,KeyType=HASH `
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 `
  --endpoint-url http://localhost:8000
```

## Step 4: Initialize Tables with Sample Data

### Initialize Counters Table

```powershell
aws dynamodb put-item `
  --table-name Counters `
  --item '{\"counterName\":{\"S\":\"wordCounter\"},\"currentValue\":{\"N\":\"0\"}}' `
  --endpoint-url http://localhost:8000
```

### Add Sample Words

```powershell
aws dynamodb put-item `
  --table-name Words `
  --item '{\"id\":{\"N\":\"1\"},\"word\":{\"S\":\"Yes\"},\"description\":{\"S\":\"Đúng\"},\"lastModified\":{\"S\":\"2023-10-15T08:30:00\"},\"priority\":{\"N\":\"1\"}}' `
  --endpoint-url http://localhost:8000
```

## Step 5: Verify Your Setup

List all tables:
```powershell
aws dynamodb list-tables --endpoint-url http://localhost:8000
```

Scan the Counters table:
```powershell
aws dynamodb scan --table-name Counters --endpoint-url http://localhost:8000
```

Scan the Words table:
```powershell
aws dynamodb scan --table-name Words --endpoint-url http://localhost:8000
```

## Using NoSQL Workbench (Recommended)

For a visual interface to manage your DynamoDB tables:

1. Download and install [NoSQL Workbench](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html)

2. Launch NoSQL Workbench and connect to your local DynamoDB:
    - Click "Operation builder"
    - Click "Add connection"
    - Select "DynamoDB local"
    - Connection name: "DynamoDB Local"
    - Port: 8000
    - Click "Connect"

3. Now you can view, query, and modify your tables with a visual interface.

## Troubleshooting

If you encounter `Unable to locate credentials` error, ensure you've run `aws configure` correctly.

If port 8000 is already in use, choose a different port by modifying the Docker run command and updating your application configuration accordingly.