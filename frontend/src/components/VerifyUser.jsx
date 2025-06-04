import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function VerifyUser() {
    const navigate=useNavigate();
    const {verificationToken}=useParams();
    useEffect(()=>{
        async function verifyUser(){
            try {
            const res=await  axios.get(`${import.meta.env.VITE_BACKEND_URL}/verify-email/${verificationToken}`)
        toast.success(res.data.message);     
        navigate("/signin")
        } catch (error) {
console.log(error)
            toast.error(error.response.data.message);
            }finally{
                
            }
        }
        verifyUser();
    },[verificationToken])
  return (
    <div>
    </div>
  )
}

export default VerifyUser
