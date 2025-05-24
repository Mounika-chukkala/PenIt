const express=require("express")
const cors=require("cors")
const dbConnect=require("./config/dbConnect")
const userRoute=require("./routes/userRoutes")
const blogRoute=require("./routes/blogRoutes")

const app=express();
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("Hello bhai welcome to my app")
})
app.use("/api/v1",userRoute);
app.use("/api/v1",blogRoute);
app.listen(3000,()=>{
    console.log("server started")
    dbConnect();
})