const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const userRouter = require("./routes/user.router");

const cors = require("cors");
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueString = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueString + file.originalname);
  },
});
const upload = multer({ storage: storage });


app.use('/users', userRouter);
app.post("/uploads", upload.single("userPhoto"), (req, res) => {
  console.log(req.file, req.body);
  res.send("success");
});



app.listen(process.env.PORT, () => {
  console.log(`Servidor funcionando en puerto ${process.env.PORT}`);
});
