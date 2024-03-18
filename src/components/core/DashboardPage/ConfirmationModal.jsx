import React from 'react'
import { useRef } from 'react';
import useOnOutsideClick from '../../../hooks/useOnOutsideClick';
const ConfirmationModal = ({modalData, isOpen,btnHandler1,btnHandler2}) => {
    let ref=useRef(null)
    useOnOutsideClick(ref,btnHandler2)
    if (!isOpen) return null;
  return (
    <div  className="fixed inset-0 z-10 flex items-center justify-center backdrop-filter backdrop-blur-sm">
    <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
    <div ref={ref} className="fixed z-20 rounded-lg border border-richblack-400 bg-richblack-800 p-6">
      <h2 className="text-2xl font-semibold text-richblack-5">{modalData.title}</h2>
      <p className="mt-3 mb-5 leading-6 text-richblack-200">{modalData.text}</p>
      <div className="flex items-center gap-x-4">
        <button onClick={btnHandler1} className="cursor-pointer rounded-md py-2 px-5 font-semibold text-richblack-900 bg-yellow-50">{modalData.btn1}</button>
        <button onClick={btnHandler2} className="cursor-pointer rounded-md bg-richblack-200 py-2 px-5 font-semibold text-richblack-900">{modalData.btn2}</button>
      </div>
    </div>
  </div>
  )
}

export default ConfirmationModal