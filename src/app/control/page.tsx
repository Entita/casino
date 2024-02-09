'use client'
import React from 'react'
import Login from '@/components/Login'
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Control() {
  return (
    <>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        transition={Bounce}
      />
      <Login />
    </>
  )
}
