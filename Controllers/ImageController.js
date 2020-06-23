const Metadata=require('../Model/Metadata');
const fuzzy=require('fuzzy');
const Image =require('../Model/Image');
var uniqid = require('uniqid');
const { ReplSet } = require('mongodb');
const uri = "mongodb+srv://ayush_it:2552@cluster0-fkvtj.mongodb.net/Images?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;

var options = {
    extract: function(el) { return el.name; }
};

module.exports.postImage=(req,res,next)=>{
    const url=req.body.url;
    const name=req.body.name;
    const type=req.body.type;
    console.log(url,' ',name,' ',type);
    
    let image=new Image(uniqid(),url,name,type);
    const client = new MongoClient(uri, { useNewUrlParser: true },{ useUnifiedTopology: true });
    client.connect(err => {
        // perform actions on the collection object
        if(!err){
            console.log('Connection Successful!');
        }
        const db=client.db('Images');
        const collection=db.collection('Image');
        collection.insertOne(image).then(result=>{
            // console.log(result);
            res.json({
                'result':image,
                'error':false
            });
        }).catch(err=>{
            console.log(err);
            res.json({
                'error':true,
                'result':err
            });
        }).finally(()=>{
            client.close();
        })
    });
 

};

module.exports.getImage=(req,res,next)=>{
    const offset=parseInt(req.query.offset);
    const limit=parseInt(req.query.limit);
    const nameString=req.query.nameString;
    console.log(offset,' ',limit,' ',nameString);
    
    const client = new MongoClient(uri, { useNewUrlParser: true },{ useUnifiedTopology: true });
    client.connect(err => {
        // perform actions on the collection object
        if(!err){
            console.log('Connection Successful!');
        }
        const db=client.db('Images');
        const collection=db.collection('Image');
        
        collection.find().toArray().then((results)=>{
            
            results=results.slice(offset-1,(offset+limit)-1);
            results = fuzzy.filter(nameString,results,options);
            const length=results.length;
            res.json({
                'error':false,
                'result':results
            });
        }).catch((err)=>{
            res.json({
                'result':err,
                'error':true
            })
        }).finally(()=>{
            client.close;
        })
        
           
    });
        
           
    
        
}
