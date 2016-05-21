var express = require('express'),
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
var partitionKey = 'geoadds';
function Entity (partitionKey, rowKey, value1){
	this.PartitionKey = partitionKey;
	this.RowKey = rowKey;
	this.value1 = value1;
}

function azureTableCallBack(error, data){
    console.log(error);
    console.log(data);
}

app.get('/api/random-quote', function(req, res) {
  res.status(200).send(quoter.getRandomOne());
});
app.get('/api/getAdverts', function(req, res) {
    client.queryEntities(tableName,{
        query:azureTable.Query.create('PartitionKey', '==', partitionKey),
         limitTo: 100  
    },
    function(error, data, continuation){
      if(error!=null && error != undefined){
          console.log(error);
          res.status(200).send(error)
      }
      
      if(data != null && data != undefined){
          console.log(data);
          res.status(200).send(data)
      }
   })
})

  //   var tableValue = client.getEntity(tableName, partitionKey, name,[{metadata:"no"}] ,function(error, data){
  //   console.log(error);
  //   console.log(data);
  //   if(error != undefined){
  //     res.status(200).send(error);
  //   }
    
  //   if(data != undefined){
  //      res.status(200).send(data.value1);
  //   }
  // });
  



