const express = require('express');
const db = require('./db/connection.js');
const cors = require('cors');
const admin = require('firebase-admin');
const User = require('./models/User.js');
const serviceAccount = require("./secrets/hack49-3e467-firebase-adminsdk-i5i7u-dba126b053.json");

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
 

//express

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/protected', verifyToken);

app.get('/api', (req, res) => {
    res.send('test');
});

app.get('/api/protected/getuser', async (req, res) => {
    try {
        const uid = req.user.uid;
        const user = await User.findOne({ uid });
        res.json(user);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/protected/createuser', async (req, res) => {
    try {
        const uid = req.user.uid;
        const now = new Date()
        const newUser = new User({
            uid,
            now,
        });
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User saved successfully', data: savedUser });
    } catch (error) {
        console.error('Error making user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/protected/getarticles', async (req, res) => {
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

// init servers

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});