const express = require('express');
const db = require('./db/connection.js');
const cors = require('cors');
const admin = require('firebase-admin');
const User = require('./models/User.js');
const Model = require('./models/Model.js');
const serviceAccount = require("./secrets/hack49-3e467-firebase-adminsdk-i5i7u-dba126b053.json");
const axios = require('axios');
const weaviate = require('weaviate-client').default;


require('dotenv').config();


// firebase auth

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const verifyToken = async (req, res, next) => {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const firebaseUser = await admin.auth().getUser(decodedToken.uid);
      req.user = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName
      };
      next();
    } catch (error) {
      res.status(401).send('Unauthorized');
    }
}; 
 
// ollama and weavite

async function getEmbedding(prompt) {
    try {
        
        const ollamaClient = axios.create({
            baseURL: process.env.OLLAMA_URL,
        });

        const response = await ollamaClient.post('/api/embeddings', {
            model: "all-minilm",
            prompt: prompt,
        });
        
        return response.data.embedding;
    } catch (error) {
        console.error('Error getting embeddings:', error);
    }
}

async function getRelevantDocument(embedding) {
    try {
        const weaviateClient = await weaviate.connectToLocal({
            host: process.env.WEAVITE_URL,
            port: process.env.WEAVITE_PORT,
            grpcPort: 50051,
            secure: false,
        });
        
        const collection = weaviateClient.collections.get('Docs')
        const response = await collection.query.nearVector(embedding, {
            vector: embedding,
            limit: 1,
        })

        return response.objects[0].properties;
    } catch (error) {
        console.error('Error getting Weaviate:', error);
    }
}


//express

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/protected', verifyToken);

app.get('/api', async (req, res) => {
    res.send('test');
});

app.get('/api/protected/getmodels', async (req, res) => {
    try {
        const models = await Model.find({});
        res.json(models);
    } catch (error) {
        console.error('Error getting phone models:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/protected/getarticles', async (req, res) => {
    try {
        const uid = req.user.uid;
        const oldUser = await User.findOne({ uid });
        const prompt = req.query.prompt;
        const now = new Date(); 

        if (!prompt){
            return res.status(400).json({error: 'Missing prompt'})
        }

        const newUser = await User.findOneAndUpdate(
            { uid },
            { lastAiCall: new Date() },
            { new: true, upsert: true } 
        );
        
        if (oldUser){
            if ((now - new Date(oldUser.lastAiCall)) / 1000 < 10) { //10 second rate limit 
                return res.status(400).json({ error: 'Too many requests' });
            }
        }

        const embedding = await getEmbedding(prompt);
        const result = await getRelevantDocument(embedding);
        res.json({ result });
    } catch (error) {
        console.error('Error making user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/protected/getverdict', async (req, res) => {
    try {
        const uid = req.user.uid;
        const newUser = await User.findOneAndUpdate(
            { uid },
            { lastAiCall: new Date() },
            { new: true, upsert: true } 
        );
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User saved successfully', data: savedUser });
    } catch (error) {
        console.error('Error making user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// init servers and other stuffs

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




