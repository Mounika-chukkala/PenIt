const express=require("express")
const cors=require("cors")
const dbConnect=require("./config/dbConnect")
const userRoute=require("./routes/userRoutes")
const blogRoute=require("./routes/blogRoutes")
// const noteRoutes = require("./routes/notesRoutes");
const cloudinaryConfig  = require("./config/cloudinaryConfig")
const { PORT, FRONTEND_URL } = require("./config/dotenv.config")
// const dotenv=require("dotenv")
// dotenv.config();
const port=PORT || 5000
const app=express()
app.use(express.json());
// app.use(cors());
app.use(cors({origin:"*"}));
app.get("/",(req,res)=>{
    res.send("Hello ,welcome to Pen It")
})
app.use("/api/v1",userRoute);

app.use("/api/v1",blogRoute);
app.listen(port,()=>{
    console.log("server started")
    dbConnect();
    cloudinaryConfig();
})