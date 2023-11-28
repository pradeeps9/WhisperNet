const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
// const bcrypt = require('bcryptjs');
const multer  = require('multer');
const uploadMiddlware = multer({ dest: 'uploads/' });
const fs = require('fs');


//salt to crypt password 
const salt = bcrypt.genSaltSync(10);
// secret key to generate jwt token
const secret = 'qwerty09876';

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json()); // to JSONify
app.use(cookieParser()); // to parse cookies
app.use('/uploads', express.static(__dirname+'/uploads'));

main()
  .then((e) => {
    console.log("connection to db is successful.");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/WhisperNet ');
}


// home page
app.get("/", (req,res) => {
  // res.send("app is working fine with express.")
  res.json("app is working fine with express.")
});

// get info from register page
app.post("/register", async (req, res) => {
  // res.json("working");
  const {username, password} = req.body;
  
  try{
    const userDoc = await User.create({
    username, 
    password : bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  }
  catch(e){
    res.status(400).json(e);
  }
});

// login page
app.post("/login", async (req, res) => {
  const {username, password} = req.body;
  const userDoc = await User.findOne({username});
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if(passOk){
    // logged in
    // respond with json web tokens
    jwt.sign({username, id:userDoc._id}, secret, {}, (err, token)=>{
      if(err) throw err;
      res.cookie('token', token).json({
        id: userDoc._id,
        username,
      });
      // res.json(token);
    });
  }
  else{
    // wrong credentials
    res.status(400).json('Wrong Credentials');
  }
});

// to login user
app.get('/profile', (req,res)=> {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if(err) throw err;
    res.json(info);
  });
  // res.json(req.cookies);
});

// to logout user
app.post('/logout', (req, res)=> {
  res.cookie('token', '').json('ok');
});

// create post
app.post('/post', uploadMiddlware.single('file'), async (req,res)=> {
  const{originalname, path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length-1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async(err, info) => {
    if(err) throw err;
    const{title, category, content} = req.body;
    const postDoc = await Post.create({
      title,
      category,
      content,
      cover:newPath,
      author:info.id,
    });
    res.json({postDoc});
  });
})

// show posts
app.get('/post', async (req,res)=> {
  const posts = await Post.find()
  .populate('author', ['username'])
  .sort({createdAt: -1})
  .limit(20);
  // console.log(posts);
  res.json(posts);
})

// show full post content
app.get('/post/:id', async (req, res)=> {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  console.log(postDoc);
  res.json(postDoc);
});

// update post
app.put('/post', uploadMiddlware.single('file'), async(req,res) => {
  let newPath = null;
  if(req.file) {
    const{originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length-1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }


  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async(err, info) => {
    if(err) throw err;
    const{id, title, category, content} = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if(!isAuthor) {
      return res.status(400).json('You are not the author of this post.');
    }
    await postDoc.updateOne({
      title,
      category,
      cover : newPath ? newPath : postDoc.cover,
      content,
    })
    res.json(postDoc);
  });




});







app.listen(8080, () => {
  console.log(`app is listening on port:8080`);
});