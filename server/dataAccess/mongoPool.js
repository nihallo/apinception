import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;

const url = 'mongodb+srv://testuser:testuser123@cluster0.xyl9j.mongodb.net/apinception';

var option = { 
    numberOfRetries : 5, 
    auto_reconnect: true, 
    poolSize : 40, 
    connectTimeoutMS: 30000 ,
    useNewUrlParser: true, 
    useUnifiedTopology: true};

function MongoPool(){}

var p_client;

function initPool(cb){
  MongoClient.connect(url, option, function(err, client) {
    if (err) throw err;
    p_client = client;
    if(cb && typeof(client) == 'function')
        cb(p_client);
  });
  console.log("Mongodb Connected!");
  return MongoPool;
}

MongoPool.initPool = initPool;

function getInstance(cb){
  if(!p_client){
    initPool(cb)
  }
  else{
    if(cb && typeof(cb) == 'function')
      cb(p_client);
  }
}
MongoPool.getInstance = getInstance;

export default MongoPool;