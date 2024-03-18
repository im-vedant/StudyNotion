import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import countryData from "../../../data/countrycode.json";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../services/operations/settingAPI";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteProfile } from "../../../services/operations/settingAPI";
import ChangePassword from "./Settings/ChangePassword";
import ChangeImage from "./Settings/ChangeImage";
import {beautifyChat} from "../../../services/operations/genai";
import { Button } from "@mui/material";
import { PiLightningDuotone } from "react-icons/pi";

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.profile);
  const { token } = useSelector((store) => store.auth);
  const { image, firstName, lastName, additionalDetails, _id } = user;
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      gender: additionalDetails.gender,
      phoneNumberCode: additionalDetails.countryCode,
      about: additionalDetails.about,
      phoneNo: additionalDetails.contactNumber,
    },
  });
 const [loading, setLoading]=useState(false)

  function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(navigate, token, user._id));
    } catch (error) {
      console.log("Error", error);
    }
  }
  function submitForm(data) {
    try {
      dispatch(updateProfile(data, user, token));
    } catch (error) {
      console.log("Error", error);
    }
  }

  async function beautify(e)
  { e.preventDefault()
    setLoading(true)
    console.log(getValues().about)
    let text = '';
    let count =0;
    try{
      const result = await beautifyChat.sendMessageStream(getValues().about)
    for await (const chunk of result.stream) {
      
      const chunkText = chunk.text();
      text += chunkText;
      setValue('about',text)
  }
    }catch(error)
    {
      console.log(error)
    }
  // const response = await result.response;
  // const text = response.text();
  console.log(text)
  setLoading(false)
}

  return (
    <div className="bg-richblack-900 w-full mb-[100px] ">
      <div className="p-6">
        <p className="text-[14px] flex flex-row items-center space-x-1 leading-[22px] mb-3 text-richblack-300">
          <MdKeyboardArrowLeft size={14} /> <span>Back</span>
        </p>
        <h2 className="text-richblack-5 font-medium text-[30px] leading-[38px]">
          Edit Profile
        </h2>
      </div>
      <div className="flex flex-col mt-8 ml-[100px] w-[70%]">
        <ChangeImage/>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="p-6 bg-richblack-800 border border-richblack-700 border-solid rounded-[8px] mt-5 flex flex-col space-y-5"
        >
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-richblack-5 text-[18px] font-semibold ">
              Profile Information
            </h2>
          </div>
          <div className="flex flex-row justify-between space-x-6 text-[14px] text-richblack-5">
            <label className="flex-1">
              <p>First Name</p>
              <input
                type="text"
                {...register("firstName", { required: true })}
                defaultValue={firstName}
                className="w-full my-[6px] focus:outline-none boxShadow p-[12px] bg-richblack-700 text-richblack-5 rounded-[.5rem]"
              />
            </label>
            <label className="flex-1">
              <p>Last Name</p>
              <input
                type="text"
                {...register("lastName", { required: true })}
                defaultValue={lastName}
                className="w-full my-[6px] focus:outline-none boxShadow p-[12px] bg-richblack-700 text-richblack-5 rounded-[.5rem]"
              />
            </label>
          </div>
          <div className="flex flex-row justify-between space-x-6 text-[14px] text-richblack-5">
            <label className="flex-1">
              <p>Date of Birth</p>
              <input
                type="date"
                {...register("dateOfBirth", )}
                defaultValue={additionalDetails.dateOfBirth}
                className="w-full my-[6px] focus:outline-none boxShadow p-[12px] bg-richblack-700 text-richblack-5 rounded-[.5rem]"
              />
            </label>
            <label className="flex-1">
              <p>Gender</p>
              <div className="flex flex-row justify-between w-full my-[6px] focus:outline-none boxShadow p-[12px] bg-richblack-700 text-richblack-5 rounded-[.5rem]">
                <div className="">
                  <label className="flex flex-row items-center" htmlFor="Male">
                    <input
                      {...register("gender",)}
                      type="radio"
                      name="gender"
                      value="male"
                      id="Male"
                      className=""
                    />{" "}
                    Male
                  </label>
                </div>
                <div className="">
                  <label
                    className="flex flex-1 flex-row items-center"
                    htmlFor="Female"
                  >
                    <input
                      {...register("gender", )}
                      type="radio"
                      name="gender"
                      value="female"
                      id="Female"
                    />{" "}
                    Female
                  </label>
                </div>
                <div className="">
                  <label
                    className="flex flex-1 flex-row items-center "
                    htmlFor="Other"
                  >
                    <input
                      {...register("gender",)}
                      type="radio"
                      name="gender"
                      value="other"
                      id="Other"
                    />
                    Other
                  </label>
                </div>
              </div>
            </label>
          </div>
          <div className="flex flex-row justify-between space-x-6 text-[14px] text-richblack-5">
            <label className="flex-1">
              <p>Phone Number</p>
              <div className="flex flex-row space-x-5 my-[6px]">
                <select
                  name="phoneNumberCode"
                  className="w-[85px] boxShadow p-[12px] bg-richblack-700 text-richblack-5 rounded-[.5rem]"
                  id="phoneNumberCode"
                  {...register("phoneNumberCode",)}
                >
                  {countryData.map((data, index) => {
                    return (
                      <option key={index} value={data.code}>
                        {data.code + " - " + data.country}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="text"
                  name="phoneNo"
                  className="w-full boxShadow p-[12px] bg-richblack-700 text-richblack-5 rounded-[.5rem]"
                  id="phoneNo"
                  placeholder="12345567890"
                  {...register("phoneNo", {
                    maxLength: { value: 10, message: "Invalid phone number" },
                    minLength: { value: 7, message: "Invalid phone number" },
                  })}
                />
              </div>
            </label>
            <label className="flex-1 flex flex-col items-center space-y-3">
              <p>About</p>
              <textarea
                {...register("about",)}
                placeholder="Enter Bio Details"
                
                className="w-full my-[6px] h-[200px] focus:outline-none boxShadow p-[12px] bg-richblack-700 text-richblack-5 rounded-[.5rem]"
              />
         <Button variant="contained" className="flex mt-2 flex-row space-x-2 mx-auto w-fit" onClick={beautify}>
          <PiLightningDuotone size={18}/>
          <div>
          {loading ? "Beautifying" : "Beautify"}
          </div>
         </Button>
            </label>
           
          </div>
          <div className="flex items-center gap-x-4">
            <button
              onClick={() => navigate("/dashboard/my-profile")}
              className="cursor-pointer rounded-md bg-richblack-200 py-2 px-5 font-semibold text-richblack-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded-md py-2 px-5 font-semibold text-richblack-900 bg-yellow-50"
            >
              Save
            </button>
          </div>
        </form>
          <ChangePassword/>
        <div className="p-6 flex flex-row mt-[44px] space-x-5 w-full border border-solid border-pink-700 rounded-[8px] bg-pink-900">
          <div className="p-[14px] h-fit rounded-full bg-pink-700 text-pink-200 ">
            <RiDeleteBin6Line size={24} />
          </div>
          <div>
            <h2 className="text-[18px] text-richblack-5 font-bold">
              Delete Account
            </h2>
            <div className="text-pink-25 text-[14px] font-medium my-2 w-[80%]">
              <p>Would you like to delete account?</p>
              <p>
                This account contains Paid Courses. Deleting your account will
                remove all the contain associated with it.
              </p>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="text-[16px] cursor-pointer font-medium italic text-pink-300"
            >
              I want to delete my account.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
