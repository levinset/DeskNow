//import libraries
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//types
import { UserInputType } from "../types/UserInputType";
import { useState } from "react";
interface RegisterProps {
  onSubmit: SubmitHandler<UserInputType>;
}
//
//user shema input erro handller
const schema = yup.object().shape({
  firstname: yup.string().required("*"),
  lastname: yup.string().required("*"),
  email: yup.string().required("*"),
  department: yup.string().required(),
  password: yup.string().required("*"),
});
//main component
export default function Register({ onSubmit }: RegisterProps) {
  //react form with yup resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputType>({ resolver: yupResolver(schema) });
  //term of policy accaptance
  const [isChecked, setIsChecked] = useState(false);
  const [showCheckboxError, setShowCheckboxError] = useState(false); // State to track if the checkbox error message should be shown

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    setShowCheckboxError(false); // Reset the checkbox error message when the checkbox is checked
  };

  const handleRegistration = () => {
    if (!Object.keys(errors).length) {
      // Check if there are no Yup errors
      if (!isChecked) {
        setShowCheckboxError(true);
        return; // Stop registration if checkbox is not checked
      }
    }
    handleSubmit(onSubmit)();
  };

  //main components
  return (
    <div className="  w-[40vw]  h-[85vh] rounded-md shadow-xl bg-gray-50 max-sm:w-full max-sm:h-fit mt-10 max-sm:mt-4 ">
      <div className="flex flex-col gap-6 p-8 pb-0">
        <div>
          <h1 className="text-4xl font-bold">Sign Up</h1>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-3">
            <Link className="" to="/register">
              Registration
            </Link>
            <p className=" border-[1.5px] border-[#6E41E2] "></p>
          </div>
          <Link to="/login">Sign In</Link>
        </div>
      </div>
      <hr className="" />
      <div className="flex flex-col justify-center gap-4 p-8">
        <div className="">
          <form className="flex flex-col gap-4 " action="">
            {(errors.firstname ||
              errors.lastname ||
              errors.email ||
              errors.password) && (
              <p className="text-red-500 ">Please fill the required field</p>
            )}
            <div className="flex flex-row gap-1 ">
              {errors.firstname && (
                <p className="text-red-500 ">{errors.firstname.message}</p>
              )}
              <input
                {...register("firstname")}
                className="inputStyle"
                type="text"
                placeholder="First Name"
              />
            </div>
            <div className="flex flex-row gap-1 ">
              {errors.lastname && (
                <p className="text-red-500 ">{errors.lastname.message}</p>
              )}
              <input
                {...register("lastname")}
                className="inputStyle"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <div className="flex flex-row gap-1 ">
              {errors.email && (
                <p className="text-red-500 ">{errors.email.message}</p>
              )}
              <input
                {...register("email")}
                className="inputStyle"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="flex flex-row gap-1 ">
              {errors.password && (
                <p className="text-red-500 ">{errors.password.message}</p>
              )}
              <input
                {...register("password")}
                className="inputStyle"
                type="password"
                placeholder="Password"
              />
            </div>
            <select
              {...register("department")}
              className="hidden inputStyle"
              defaultValue="CodingSchool"
            >
              <option value="CodingSchool">Coding School Department</option>
            </select>
          </form>
        </div>
        <div className="flex flex-row items-center mt-4 mb-8 max-sm:my-0 ">
          <div className="flex flex-col ">
            <div className="flex flex-row gap-2">
              <input
                type="checkbox"
                value=""
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={handleCheckboxChange}
              />
              <p>
                I accept the terms of the offer of
                <span className="text-[#6E41E2]"> the privacy policy</span>
              </p>
            </div>
            <div>
              {showCheckboxError && (
                <p className="text-red-500">
                  Please accept the terms to proceed
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 font-semibold">
          <button
            onClick={handleRegistration}
            className="bg-[#6E41E2] w-full h-12 rounded-md text-white  "
          >
            Registration
          </button>
          <Link className="text-[#6E41E2] " to="/login">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
