import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;

const url = 'mongodb+srv://testuser:testuser123@cluster0.xyl9j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

var option = { 
    numberOfRetries : 5, 
    auto_reconnect: true, 
    poolSize : 40, 
    connectTimeoutMS: 30000 ,
    useNewUrlParser: true, 
    useUnifiedTopology: true};

function MongoPool(){}

var p_db;

function initPool(cb){
  MongoClient.connect(url, option, function(err, db) {
    if (err) throw err;

    p_db = db;
    if(cb && typeof(cb) == 'function')
        cb(p_db);
  });
  console.log("Mongodb Connected!");
  return MongoPool;
}

MongoPool.initPool = initPool;

function getInstance(cb){
  if(!p_db){
    initPool(cb)
  }
  else{
    if(cb && typeof(cb) == 'function')
      cb(p_db);
  }
}
MongoPool.getInstance = getInstance;

export default MongoPool;