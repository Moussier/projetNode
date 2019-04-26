module.exports = function(app){
  const tx = require('../controllers/txController');
  const jwtMiddleware = require('../../middleware/jwtMiddleware');
  
  app.route('/transactions')
  .all(jwtMiddleware.verify_token)
  .get(tx.list_all_tx)
  .post(tx.create_a_tx);

  app.route('/transactions/:txId')
  .get(tx.read_a_tx)
  .put(tx.update_a_tx)
  .delete(tx.delete_a_tx);
      
};
    