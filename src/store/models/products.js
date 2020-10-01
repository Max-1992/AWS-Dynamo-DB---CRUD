const Aws = require('aws-sdk');
const config = require('../store.config');

Aws.config.update(config.aws_local_config);

const dynamodb = new Aws.DynamoDB();
const clientDynamoDb = new Aws.DynamoDB.DocumentClient();

var params = {
    TableName: 'production_products',
    KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
        { // Required HASH type attribute
            AttributeName: 'id',
            KeyType: 'HASH',
        },
    ],
    AttributeDefinitions: [ // The names and types of all primary and index key attributes only
        {
            AttributeName: 'id',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        },
        // ... more attributes ...
    ],
    ProvisionedThroughput: { // required provisioned throughput for the table
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1, 
    },
};

dynamodb.createTable(params, function(err, data) {
    if (err) console.log(err); // an error occurred
    else console.log(data); // successful response
});