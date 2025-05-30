const multer=require("multer")
// const path=require("path")
const storage=multer.memoryStorage();
// diskStorage({
//     destination:"uploads/",
//     filename:function(req,file,cb){
//         cb(null,Date.now()+path.extname(file.originalname))
//     }
// })
const upload=multer({
    storage
})

module.exports=upload