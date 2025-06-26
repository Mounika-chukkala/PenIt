// // components/FollowRequests.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";

// const FollowRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const {username,token}=useSelector((state)=>state.user);
//   const [userData,setUserData]=useState(null);
//   async function fetchDetails(){
//     try{
// let res = await axios.get(
//               `${import.meta.env.VITE_BACKEND_URL}/users/${username}`
//             );
//             setUserData(res.data.user)
//             setRequests(res.data.user.followRequests || [])
//       // setRequests(res.data.user.followRequests || []);
//     }
//     catch(error){
//       toast.error(error);
//     }
//   }
//   useEffect( () => {
//     fetchDetails();
    
//   }, []);

//   const handleAction = async (requesterId, action) => {
//     const res=await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/handle-follow-request`, { requesterId, action },{
//       headers:{
//         Authorization:`Bearer ${token}`
//       }
//     });
//     setRequests((prev) => prev.filter((req) => req._id !== requesterId));
//     // !res.data.success?toast.success(res.data.message):toast.error(res.data.message)
// if (action === "accept") {
//       toast.success("Request accepted ✅");
//     } else {
//       toast.success("Request rejected ❌");
//     }

//   };

//   return (
//     <div className="mt-4 w-[60%] mx-auto">
//       <h2 className="text-lg  font-semibold   my-2">Follow Requests</h2>
//       {requests.length === 0 && <p>No requests</p>}
//       {requests.map((request,index) => (
//         <div key={index} className="flex w-full items-center justify-between p-3 ">
// <div className="flex items-center gap-2">
//   <img
//     src={
//       request.profilePic ||
//       `https://api.dicebear.com/9.x/initials/svg?seed=${request.name}`
//     }
//     alt={request.name}
//     className="w-6 h-6 rounded-full"
//   />
//   <p className="text-sm font-medium">{request.name}</p>
// </div>          <div className="space-x-2">
//             <button
//               onClick={() => handleAction(request._id, "accept")}
//               className="bg-green-500 text-white px-3 py-1 rounded"
//             >
//               Accept
//             </button>
//             <button
//               onClick={() => handleAction(request._id, "reject")}
//               className="bg-red-500 text-white px-3 py-1 rounded"
//             >
//               Reject
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FollowRequests;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, UserRound } from "lucide-react";

const FollowRequests = () => {
  const [requests, setRequests] = useState([]);
  const { username, token } = useSelector((state) => state.user);

  async function fetchDetails() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${username}`
      );
      setRequests(res.data.user.followRequests || []);
    } catch (error) {
      toast.error("Failed to load follow requests");
    }
  }

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleAction = async (requesterId, action) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/handle-follow-request`,
        { requesterId, action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message || "Action successful");
      setRequests((prev) => prev.filter((user) => user._id !== requesterId));
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="mt-4 w-[60%] mx-auto">
      <h2 className="text-lg font-semibold my-2">Follow Requests</h2>
      {requests.length === 0 && <p className="text-sm text-gray-500">No requests</p>}

      {requests.map((request) => (
        <div
          key={request._id}
          className="flex items-center justify-between border-b py-3"
        >
          <div className="flex items-center gap-3">
            <UserRound className="w-5 h-5 text-gray-600" />
            {console.log(request)}
            <div className="flex flex-col">
              {/* <div className="flex"> */}
            <span className="text-sm font-medium">{request.name}</span>
            {/* <span>{request.username}</span> */}

              {/* </div> */}
                          <span className="text-xs text-slate-500">{request.bio}</span>

            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleAction(request._id, "accept")}
              className="text-green-600 hover:text-green-700 transition"
              title="Accept"
            >
              <CheckCircle size={20} />
            </button>
            <button
              onClick={() => handleAction(request._id, "reject")}
              className="text-red-600 hover:text-red-700 transition"
              title="Reject"
            >
              <XCircle size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowRequests;
