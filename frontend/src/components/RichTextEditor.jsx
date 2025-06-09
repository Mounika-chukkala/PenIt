// import React from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const RichTextEditor = ({ value, onChange }) => {
//   return (
//     <div className="">
//       <ReactQuill
//         theme="snow"
//         value={value}
//         onChange={onChange}
//         className=" text-base  border-none"
//         placeholder="Start writing your blog here..."
//         modules={{
//           toolbar: [
//             [{ header: [1, 2, 3, false] }],
//             ["bold", "italic", "underline", "strike"],
//                 [{ color: [] }, { background: [] }],
//             [{ list: "ordered" }, { list: "bullet" }],
//             ["blockquote", "code-block"],
//                 ["image"], 
//             ["clean"],
//           ],
//         }}
//       />
//     </div>
//   );
// };

// export default RichTextEditor;






import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ font: [] }, { size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["clean"], // remove formatting
  ],
};

const formats = [
  "font", "size",
  "header",
  "bold", "italic", "underline", "strike",
  "color", "background",
  "script",
  "list", "bullet",
  "indent",
  "align",
  "blockquote", "code-block",
  "link", "image",
  "clean",
];

export default function RichTextEditor({ value, onChange }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md border border-[#E5E7EB] bg-white">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="min-h-[300px] font-serif text-[#1E293B]"
      />
    </div>
  );
}
