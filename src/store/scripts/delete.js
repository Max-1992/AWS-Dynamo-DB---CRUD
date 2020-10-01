const Aws = require('aws-sdk');
const config = require('../store.config');

Aws.config.update(config.aws_local_config);

const dynamodb = new Aws.DynamoDB.DocumentClient();

let deleteProducts = () => {
    
    const params = {
        TableName: config.table_products,
        Key: { 'id': '1' }
    }

    dynamodb.delete(params, (err, data) => {
        if(err) return console.log(`Hubo un error al eliminar el producto`, err);
        console.log(`Producto eliminado correctamente`, data);
    })

}


deleteProducts();