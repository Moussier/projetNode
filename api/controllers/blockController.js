const Block = require('../models/blockModel');
const blockchainApiProvider = require('../../providers/blockchainApiProvider');
exports.list_all_blocks = function(req, res){
  Block.find({}, function(err, block){
    if(err) res.send(err);
    res.status(200).json(block);
  });
}

exports.create_a_block = function(req, res){
  var new_block = new Block();

  var promise = blockchainApiProvider.getBlockInfo(req.body.hash);

  promise.then(response => {
    console.log(response);
    new_block.hash = response.hash;
    new_block.size = response.size;
    new_block.height = response.height;
    new_block.block_index = response.block_index;
    new_block.prev_block = response.prev_block;
    new_block.next_block = JSON.stringify(response.next_block);
  }, error => {
    console.log("Hash error");
  }).then(send => {
    new_block.save(function(err, block){
      if(err) res.send(err);
      res.status(201).json(block);
    })
  });
}

exports.get_latest_block = function(req, res){
  var new_block = new Block();

  var promise = blockchainApiProvider.getLatestBlock();

  promise.then(response => {
    console.log(response);
    new_block.hash = response.hash;
    new_block.block_index = response.block_index;
    new_block.height = response.height;
  }, error => {
    console.log("Latest Block error");
  }).then(send => {
    new_block.save(function(err, block){
      if(err) res.send(err);
      res.status(201).json(block);
    })
  });
}

exports.read_a_block = function(req, res) {
  Block.findById(req.params.blockId, function(err, block) {
    if(err) res.send(err);
    res.json(block);
  });
};


exports.update_a_block = function(req, res) {
  Block.findOneAndUpdate({_id: req.params.blockId}, req.body, {new: true}, function(err, block) {
    if(err) res.send(err);
    res.json(block);
  });
};


exports.delete_a_block = function(req, res) {
  Block.remove({
    _id: req.params.blockId
  }, function(err, block) {
    if(err) res.send(err);
    res.json({ message: 'Block successfully deleted' });
  });
};
