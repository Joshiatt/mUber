var DriversController = require('../controllers/drivers_controller.js');

module.exports = function(app) {
    
    app.get('/api', DriversController.greeting);
    
    app.post('/api/drivers', DriversController.create);
    
    
    app.put('/api/drivers/:id', DriversController.edit);
    
    
    
    app.delete('/api/drivers/:id', DriversController.delete);
    
    
    app.get('/api/drivers', DriversController.index);
    
    
    
    
}