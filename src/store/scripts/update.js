const Aws = require('aws-sdk');
const config = require('../store.config');

Aws.config.update(config.aws_local_config);

const dynamodb = new Aws.DynamoDB.DocumentClient();

let updateProducts = () => {
    
    let dateAttri = new Date().toString();

    const params = {
        TableName: config.table_products,
        Key: { 'id': '1' },
        UpdateExpression: 'SET create_at = :newDateAttri, #name = :newNameAttri', // String representation of the update to an attribute
        // SET set-action , ... 
        // REMOVE remove-action , ...  (for document support)
        // ADD add-action , ... 
        // DELETE delete-action , ...  (previous DELETE equivalent)
       
        ExpressionAttributeNames: { // a map of substitutions for attribute names with special characters
            //'#name': 'attribute name'
            '#name': 'name'
        },
        ExpressionAttributeValues: { // a map of substitutions for all attribute values
            ':newDateAttri': dateAttri,
            ':newNameAttri': 'Tennis Adidas'
        },
        ReturnValues: 'UPDATED_NEW', // optional (NONE | ALL_OLD | UPDATED_OLD | ALL_NEW | UPDATED_NEW)
        // ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
        // ReturnItemCollectionMetrics: 'NONE', // optional (NONE | SIZE)
    }

    dynamodb.update(params, (err, data) => {
        if(err) return console.log(`Hubo un error al actualizar el producto`, err);
        console.log(`El producto se a actualizado correctamente`, data);
    })

}

updateProducts();