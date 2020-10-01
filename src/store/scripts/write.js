const Aws = require('aws-sdk');
const config = require('../store.config');

Aws.config.update(config.aws_local_config);

const dynamodb = new Aws.DynamoDB.DocumentClient();

let saveProducts = () => {

    const product = {
        'id': '1',
        'name': 'Tennis Reebok',
        'amount': '50',
        'cost': '100 USD',
        'create_at': new Date().toString()
    }
    
    const params = {
        TableName: config.table_products,
        Item: product
    }

    dynamodb.put(params, (err, data) => {
        if(err) return console.log(`Hubo un error al guardar el producto`, err);
        console.log(`El producto se a guardado correctamente`, data);
    })

}


saveProducts();