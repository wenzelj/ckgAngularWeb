var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('./config'),
    logger = require('morgan'),
    quoter  = require('./quoter');

var app = module.exports = express.Router();
var azureTable = require('azure-table-node');
azureTable.setDefaultClient({
  accountUrl: 'https://ckgconsulting.table.core.windows.net/',
  accountName: 'ckgconsulting',
  accountKey: 'Sx+XIP3oD8OAaIdHgmP008tro+5HWboQLrLva6AXGreBY6+pFcEcew2qOBYfEWQGhlU4bGsyafetcC1H+u7Z8A=='
});
var client = azureTable.getDefaultClient();
var tableName = 'advertstable';
function Entity (partitionKey, rowKey, value1){
	this.PartitionKey = partitionKey;
	this.RowKey = rowKey;
	this.value1 = value1;
}


function azureTableCallBack(error, data){
    console.log(error);
    console.log(data);
}
// use the client to create the table 
//client.createTable(tableName, true, azureTableCallBack);

var jwtCheck = jwt({
  secret: config.secret
});

app.use('/api/protected', jwtCheck);

app.post('/api/protected/advert', function(req, res) {
  var advert = JSON.stringify(req.body);
  var name = req.body.name;
  var partitionKey = 'geoadds';

  var entity = new Entity(partitionKey, name, advert);
  client.insertEntity(tableName, entity ,function(error, data){
    console.log(error);
    console.log(data);
     if(error != undefined){
        res.status(200).send(error)
     }
     
     if(data != undefined){
         res.status(200).send('Succesfully saved')
     }
  });
});

