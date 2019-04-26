const blockchainApiProvider = require('../../providers/blockchainApiProvider');

exports.convert = function(req, res){
    var promise = blockchainApiProvider.convert(req.params.currency, req.params.amount);

    promise.then(response => {
        res.send(response);
    });

}