const Aws = require('aws-sdk');
const config = require('../store.config');

Aws.config.update(config.aws_local_config);

const dynamodb = new Aws.DynamoDB.DocumentClient();

let listProducts = () => {
    
    const params = {
        TableName: config.table_products,
        Key: { 'id': '1' }
    }

    dynamodb.get(params, (err, data) => {
        if(err) return console.log(`Hubo un error al obtener el producto`, err);
        console.log(`Producto: `, data);
    })

}


listProducts();