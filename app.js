const express = require('express');
const app = express();
const multer  = require('multer');

const Post = require("./api/models/post");
const postData = new Post();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname +'-' + Date.now() + getExt(file.mimetype));
    }
  })

  const getExt = (mimeType) =>{
      if(mimeType = "image/png"){
          return ".png"
      }
      else if(mimeType="image/jpeg"){
          return ".jpg"
      }
  }
  const upload = multer({ storage: storage })

app.use((req,res,next)=>{
    //star means every(thus this line means that response to be shared with evey site)
    res.setHeader("Access-Control-Allow-Origin","*");
    next();
})

//parse to use in no js
app.use(express.json());

//for getting access to static files
app.use('/uploads', express.static('uploads'))

app.get("/api/posts",(req,res) =>{
    res.status(200).send(postData.get())
})

app.get("/api/posts/:_id",(req,res) =>{
    const postId = req.params._id;
    const foundPost = postData.getIndividualPost(postId);
    if(foundPost){
        res.status(200).send(foundPost)
    }
    else{
        res.status(404).send("Not found")
    }
})

app.post("/api/posts",upload.single("post_image"),(req,res) =>{
    const newPost = {
        "id":`${Date.now()}`,
        "title": req.body.title,
        "content":req.body.content,
        "post_image": req.file.path.replace("\\", "/"),
        "added_date":`${Date.now()}`
    }
    postData.add(newPost);
    res.status(201).send(newPost);
})

app.listen(3000,()=>{console.log("Listening port 3000")})