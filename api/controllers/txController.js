const tx = require('../models/txModel');
const blockchainApiProvider = require('../../providers/blockchainApiProvider');
exports.list_all_tx = function(req, res){
  tx.find({}, function(err, transaction){
    if(err) res.send(err);
    res.status(200).json(transaction);
  });
}

exports.create_a_tx = function(req, res){
  var new_tx = new tx();
    //////////////marker
  var promise = blockchainApiProvider.getTxInfo(req.body.hash);

  promise.then(response => {
    console.log(response);
    new_tx.hash = response.hash;
    new_tx.size = response.size;
    new_tx.lock_time = response.lock_time;
    new_tx.relayed_by = response.relayed_by;
    new_tx.block_height = response.block_height;
  }, error => {
    console.log("Hash error");
  }).then(send => {
    new_tx.save(function(err, transaction){
      if(err) res.send(err);
      res.status(201).json(transaction);
    })
  });
}

exports.read_a_tx = function(req, res) {
  tx.findById(req.params.txId, function(err, transaction) {
    if(err) res.send(err);
    res.json(transaction);
  });
};


exports.update_a_tx = function(req, res) {
  tx.findOneAndUpdate({_id: req.params.txId}, req.body, {new: true}, function(err, transaction) {
    if(err) res.send(err);
    res.json(transaction);
  });
};


exports.delete_a_tx = function(req, res) {
  tx.remove({
    _id: req.params.txId
  }, function(err, transaction) {
    if(err) res.send(err);
    res.json({ message: 'Transaction successfully deleted' });
  });
};
