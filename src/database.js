const mongoose = require('mongoose');
const URI = 'mongodb://localhost/todo-mern';
mongoose.connect(URI)
    .then(db => console.log('Conexión a la BD exitosa'))
    .catch(err => console.error(err));

module.exports = mongoose;