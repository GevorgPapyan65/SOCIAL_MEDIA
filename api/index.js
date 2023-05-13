const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const multer = require("multer")
const cors = require('cors');
const path = require("path")
const app = express();
app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000'
}));

dotenv.config();



mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log("DB Connection Successfull!"))
.catch((err) => {
    console.log("hello  " + process.env.MONGO_URL);
    console.log(err);
  });

// app.use((req, res, next)=> {
//   res.setHeader('Access-Control-Allow-Origin',"*",'http://10.19.201.39:3000', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Credentials',true);
//   next();
// });


// mongoose
// .connect(process.env.MONGO_URL)
// .then(() => console.log("DB Connection Successfull!"))
// .catch((err) => {
//     console.log("hello  " + process.env.MONGO_URL);
//     console.log(err);
//   });

// mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true});

// app.use(
  //   helmet({
    //     crossOriginResourcePolicy: false,
    //   })
    // );
    // const db = mongoose.connection
    // db.on('error',(err)=>console.log("errorrr!"))
    // db.once('open',()=>console.log("db connected sucssesfull"));
    
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use("/images", express.static(path.join(__dirname, "public/images")));

//MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});


const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
//SERVER CONECTION
app.listen(8800,()=>{
  console.log("server listening");
})