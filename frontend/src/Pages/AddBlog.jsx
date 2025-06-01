import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedBlog, removeSelectedBlog } from "../utils/selectedBlog";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import NestedList from "@editorjs/nested-list"
import CodeTool from "@editorjs/code"
import Marker from  "@editorjs/marker"
import Underline from "@editorjs/underline"
import Embed from '@editorjs/embed';
import RawTool from "@editorjs/raw"
import LinkTool from "@editorjs/link";
import textVariantTune from "@editorjs/text-variant-tune";
import ImageTool from "@editorjs/image"
function AddBlog() {
  const { id } = useParams();
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    image: null,
    content: "",
  });
  const imagesRef = useRef([]);

  const editorjsRef = useRef(null);
// const raw=useSelector((state)=>state.selectedBlog)?.content
// const content=raw?JSON.parse(raw):{}
  const content = useSelector((state) => state.selectedBlog)?.content|| {};
  const { token } = useSelector((slice) => slice.user);
  const navigate = useNavigate();
  const selectedBlog = useSelector((slice) => slice.selectedBlog);
  async function fetchBlogById() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`
      );
      dispatch(addSelectedBlog(res.data.blog));
      setBlogData({
        title: res.data.blog.title,
        description: res.data.blog.description,
        image: res.data.blog.image,
        content: res.data.blog.content,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch blog");
      console.log(error);
    }
  }
  const dispatch = useDispatch();

  function initializeEditojs() {
    if(editorjsRef.current){return;}
    const editorjs = new EditorJS({
      holder: "editorjs",
      placeholder: "Share your thoughts....",
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
          config: {
            placeholder: "Enter a header",
           levels: [2, 3, 4],
        defaultLevel: 3
          },
        },
        List:{
          class:NestedList,
          config:{

          },
          inlineToolbar:true
        },
        code:CodeTool,
        Marker:Marker,
        Underline:Underline,
        Embed:Embed,
        linkTool:LinkTool,
        raw:RawTool,
        textVariant:textVariantTune,
        image:{
          class:ImageTool,
          config:{
            uploader:{
              uploadByFile:async (image)=>{
                  imagesRef.current.push(image);
                return {
                  success:1,
                  file:{
                    url:URL.createObjectURL(image),
                    image
                  }
                }
              }
            }
          }
        }
      },
      tunes:['textVariant'],
      data:content||{},
      onChange: async () => {
        let data = await editorjs.save();
        setBlogData((blogData) => ({ ...blogData, content:data }));

      },
    });
    editorjsRef.current=editorjs;
  }

  useEffect(() => {
    if (id) {
      fetchBlogById();
      return () => {
        dispatch(removeSelectedBlog());
      };
    }
  }, [id]);

  useEffect(() => {
      initializeEditojs();

  return () => {
    if (editorjsRef.current && typeof editorjsRef.current.destroy === "function") {
      editorjsRef.current.destroy();
      editorjsRef.current = null;
    }
  };
  }, []); 




  async function handleUpdateBlog(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("description", blogData.description);
    console.log("blogData content",blogData.content);

    formData.append("content",JSON.stringify(blogData.content));
    
    formData.append("image", blogData.image);
// imagesRef.current.forEach((image) => {
 
//   formData.append("images", image);
// });


let existingImages=[];
console.log("blogData content",JSON.stringify(blogData.content));

console.log("formData content",formData.get("content"));
content?.blocks.forEach((block)=>{
  if(block.type==="image" ){
    if(block.data.file.image){
      formData.append("images",block.data.file.image);
    }
    else{

      existingImages.push({
        url:block.data.file.url,
        ImageId:block.data.file.ImageId
      });  
   
    }
    
  }

});
formData.append("existingImages",JSON.stringify(existingImages))


    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`,
        formData,
        {
          headers: {
                "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      navigate(`/blog/${id}`);
    } catch (error) {}
  }
  async function handleBlogCreation(e) {
    e.preventDefault();
        console.log(blogData)

    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("description", blogData.description);
    formData.append("image", blogData.image);
    formData.append("content", JSON.stringify(blogData.content));
    // const content=JSON.parse(blogData.content)
    // content.blocks.forEach((block)=>{
    //   if(block.type==="image"){
    //     // images.push(block.data.file.image)
    //         formData.append("images", block.data.file.image);

    //   }
    // })
imagesRef.current.forEach((image) => {
          console.log("hi")

  formData.append("images", image);
});
    console.log("formdata",formData.getAll("images"))

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/blogs`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post blog");
      console.log(error);
    }
  }

  return token == null ? (
    <Navigate to={"/signin"} />
  ) : (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4 py-5"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')",
      }}
    >

      <motion.form
        onSubmit={id ? handleUpdateBlog : handleBlogCreation}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-8 flex flex-col gap-6 border border-[#10B981] z-2"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold text-center text-[#10B981]">
          {id ? "Update Blog" : "Create a Blog"}
        </h2>

        <div>
          <label
            htmlFor="title"
            className="block mb-1 font-medium text-[#1E293B]"
          >
            Title
          </label>
          <motion.input
            type="text"
            id="title"
            onChange={(e) =>
              setBlogData({ ...blogData, title: e.target.value })
            }
            value={blogData.title}
            placeholder="Title of your blog"
            className="w-full p-3 rounded-xl border border-[#6EE7B7] focus:outline-none focus:ring-1 focus:ring-[#10B981] transition"
            whileFocus={{ scale: 1.02 }}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-1 font-medium text-[#1E293B]"
          >
            Description
          </label>
          <motion.textarea
            id="description"
            rows={2}
            onChange={(e) =>
              setBlogData({ ...blogData, description: e.target.value })
            }
            value={blogData.description}
            placeholder="What's your blog about?"
            className="w-full p-3 rounded-xl border border-[#6EE7B7] focus:outline-none focus:ring-1 focus:ring-[#8eb8aa] transition resize-none"
            whileFocus={{ scale: 1.02 }}
          />
        </div>
        {/* <div>
          <label
            htmlFor="Content"
            className="block mb-1 font-medium text-[#1E293B]"
          >
            Share your thoughts..
          </label>
          <motion.textarea
            id="content"
            rows={5}
            minLength={500}
            value={blogData.content}
            onChange={(e) =>
              setBlogData({ ...blogData, content: e.target.value })
            }
            placeholder="Write here..."
            className=""
          />
        </div> */}
<p >Share your thoughts</p>        <motion.div id="editorjs" className=" bg-white/20 w-full  p-3 rounded-xl border border-[#6EE7B7] focus:outline-none focus:ring-1 focus:ring-[#8eb8aa] transition resize-none overflow-auto "
                    whileFocus={{ scale: 1.02 }}
></motion.div>
        <div>
          <label
            htmlFor="image"
            className="block mb-2 font-medium text-[#1E293B]"
          >
            Image
          </label>
          <label
            htmlFor="image"
            className="cursor-pointer group flex justify-center items-center h-48 border border-dashed border-[#8eb8aa] rounded-xl overflow-hidden relative bg-white/70 hover:border-[#10B981] transition"
          >
            {blogData.image ? (
              <motion.img
                src={
                  typeof blogData.image == "string"
                    ? blogData.image
                    : URL.createObjectURL(blogData.image)
                }
                alt="preview"
                className="object-cover w-full h-full rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            ) : (
              <div className="text-[#1E293B] bg-transparent  group-hover:text-[#10B981] transition text-xl font-medium">
                Select Image
              </div>
            )}
          </label>
          <input
            type="file"
            id="image"
            accept=".png,.jpeg,.jpg"
            className="hidden"
            onChange={(e) =>
              setBlogData({ ...blogData, image: e.target.files[0] })
            }
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-6 py-3 bg-[#10B981] text-white rounded-xl hover:bg-[#059669] transition font-semibold text-lg"
        >
          {id ? "Update Blog" : "Post Blog"}
        </motion.button>
      </motion.form>
    </div>
  );
}

export default AddBlog;
