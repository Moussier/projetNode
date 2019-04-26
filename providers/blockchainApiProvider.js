const request = require('request');
const baseUrl = "https://blockchain.info";

exports.getBlockInfo = function(hash){
  var url = baseUrl + '/rawblock/' + hash;
  return new Promise((resolve, reject) => {
    request(url, function(error, response, body){
      try{
        body = JSON.parse(body);
        var blockInfo = {
          "hash": body.hash,
          "size": body.size,
          "prev_block": body.prev_block,
          "next_block": body.next_block,
          "block_index": body.block_index,
          "height": body.height
        }
        resolve(blockInfo);
      }
      catch(e){
        console.log(e);
        reject(false);
      }
    });
  });
}

exports.convert = function(currency, amount){
  var url = baseUrl + '/tobtc?currency=' + currency + '&value=' + amount;
  return new Promise((resolve, reject) => {
    request(url, function(error, response, body){
      try{
        resolve(body);
      }
      catch(e){
        console.log(e);
        reject(false);
      }
    })
  })
}

exports.getLatestBlock = function(){
  var url = baseUrl + '/latestblock';
  return new Promise((resolve, reject) => {
    request(url, function(error, response, body){
      try{
        body = JSON.parse(body);
        var blockInfo = {
          "hash": body.hash,
          "block_index": body.block_index,
          "height": body.height
        }
        resolve(blockInfo);
      }
      catch(e){
        console.log(e);
        reject(false);
      }
    })
  })
}

exports.getTxInfo = function(hash){
  var url = baseUrl + '/rawtx/' + hash;
  return new Promise((resolve, reject) => {
    request(url, function(error, response, body){
      try{
        body = JSON.parse(body);
        var txInfo = {
          "hash": body.hash,
          "size": body.size,
          "lock_time": body.lock_time,
          "relayed_by": body.relayed_by,
          "block_height": body.block_height
        }
        resolve(txInfo);
      }
      catch(e){
        console.log(e);
        reject(false);
      }
    });
  });
}
