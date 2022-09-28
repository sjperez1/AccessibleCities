const mongoose = require('mongoose')
// have to change the name after localhost/
// the following line creates the database
mongoose.connect('mongodb://localhost/accessiblecities_db', {
    // need the following two lines when connecting to the database
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));