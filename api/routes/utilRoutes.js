module.exports = function(app){
    const util = require('../controllers/utilController');
    const jwtMiddleware = require('../../middleware/jwtMiddleware');
    
    app.route('/btcConvert/:currency/:amount')
    .all(jwtMiddleware.verify_token)
    .get(util.convert);
          
  };
      