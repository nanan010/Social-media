let express = require('express');
let app = express();
const cors = require('cors');
const { ObjectId } = require('mongodb');


//MongoDB
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://nive:nive@cluster0.lu5y67v.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());
app.get("/",()=>{
});

app.post("/signup",(req,res)=>{
    res =  usersignup(req.body);
    return res;
});

app.post("/login",(req, res)=>{
    userLogin(req.body, res);
});

app.get("/chats",(req, res)=>{
    getChats(res);
});

app.put("/chat/:id",(req, res)=>{
    updateChat(req.params.id, req.body, res);
});

app.get("/friends",(req, res)=>{
    getFriends(res);
});

app.delete("/friends/:id",  (req, res) => {
    removeFriend(req, res);
});

app.post("/friends", (req, res)=>{
    addFriends(req.body, res);
});

app.get("/user_profile",(req, res)=>{
    getUserProfile(res);
});

app.listen(3030,'0.0.0.0', function () {
    console.log("App running at port 3030");
});

async function usersignup(body){
    try{
        await client.connect();
        var db = client.db('social');
        var collection = db.collection('userlogin');
        var res = await collection.insertOne((body));
        return res;
    } catch(e){
        console.log("Error from user sign up",e);
    } finally{
        await client.close();
    }
}

async function userLogin(body, res){
    try{
        await client.connect();
        var collection = client.db('social').collection('userlogin');
        var result = await collection.findOne(body);
        return res.json(result);
    } catch(e){
        console.log("error from login api", e);
    } finally{
        await client.close();
    }
}

async function getChats(result){
    try{
        await client.connect();
        var collection = client.db("social").collection("messages");
        var res = await collection.find().toArray();
        return result.json(res)
    } catch(e){
        console.log("Error from Get Chats", e);
    }
}

async function updateChat(id, body, res) {
    try{
        if(!client.topology.isConnected()){
            await client.connect();
        }
        var collection = client.db("social").collection("messages");
        var filter = {_id: ObjectId.createFromHexString(id)};
        //var update = {$set: body};
        var update = { $set: { messages: body } }
        var result = await collection.updateOne(filter, update);
        res.json(result);
    } catch(e){
        console.log("Error", e);
    }
}

async function addFriends(body, res) {
    try{
        if(!client.topology.isConnected()){
            await client.connect();
        }
        var collection = client.db("social").collection("friends");
        var result = await collection.insertOne(body);
        const newFriend = {
            _id: result.insertedId,
            ...body
        }
        console.log("res", newFriend);
        res.json(newFriend);
    } catch(e){
        console.log("Error", e);
    }
}

async function removeFriend(req, res){
    const { id } = req.params;
    try {
        if (!client.topology || !client.topology.isConnected()) {
            await client.connect();
        }
        const collection = client.db("social").collection("friends");
        const result = await collection.deleteOne({ _id: ObjectId.createFromHexString(id) });
        
        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Friend removed successfully" });
        } else {
            res.status(404).json({ error: "Friend not found" });
        }
    } catch (error) {
        console.error("Error removing friend:", error);
        res.status(500).json({ error: "Failed to remove friend" });
    }
}

async function getFriends(result){
    try{
        if(!client.topology || !client.topology.isConnected()){
            await client.connect();
        }
        var collection = client.db("social").collection("friends");
        var res = await collection.find().toArray();
        return result.json(res)
    } catch(e){
        console.log("Error from Get Friends", e);
    }
}

async function getUserProfile(result){
    try{
        if(!client.topology || !client.topology.isConnected()){
            await client.connect();
        }
        var collection = client.db("social").collection("profile");
        var res = await collection.find().toArray();
        return result.json(res);
    }catch(e){
        console.log("Error get user profile", e);
    }
}