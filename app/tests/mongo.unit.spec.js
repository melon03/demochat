var debug = require('debug')('model->test');
var  mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;


var TestSchema = new mongoose.Schema({
  testField: {
      type: String,
      required: true//,
  //    trim: true
  }
});
var Entity = mongoose.model('Test1', TestSchema);
var enitytToSave = new Entity({testField:'test1123232'});
var dbRemote = 'mongodb://admin:hpadmin@ds037415.mongolab.com:37415/hp_mongo';
var db_local = 'mongodb://192.168.99.101:27017/hp_mongo';
var db_docker = 'mongodb://mongo:27017';

describe('sanity tests', function(done){
beforeEach((done)=>{
  if (process.env.MONGO_TESTS)
    done();
  else
  done('test will run only when MONGO_TESTS env is confugured')
})
it('test only connection', (done)=>{
   console.log('test only connection');
  let settings     = require('../config');
  MongoClient.connect(db_docker, function(err, db) {
  //assert.equal(null, err);
  console.log("Connected correctly to server");
  done(err);
  db.close();
})
})
it('test mongo connection' , function(done){

    mongoose.connect(db_docker, function(err) {

        if (err) {
            console.log(err);
            throw err;
        }

        console.log('mongo is connected');
        enitytToSave.save(function(err) {
            //done(err);
            debug('after save:' + err );
            if (err) {
                console.log('saved process finished with error')
                return done(err);
            }
            debug('saved succesfully');
            console.log('test entity succesfully saved');
            mongoose.connection.close();
            return done(null);
        });
      });
    });

});


/*Object.keys(user).forEach(function(key) {
    debug('key:' + key);
    userToSave.set(key, user[key]);
});*/

/*  User.findByToken(username, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    return done(null, user);
});*/
