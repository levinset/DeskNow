//import libraries
import { Link } from "react-router-dom";

//main component
export default function Register() {
  return (
    <div className="  w-[40vw]  h-[85vh] rounded-md shadow-xl bg-gray-50 max-sm:w-full max-sm:h-fit  ">
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
            <input
              className="inputStyle"
              type="text"
              placeholder="First Name"
            />
            <input className="inputStyle" type="text" placeholder="Last Name" />
            <input className="inputStyle" type="email" placeholder="Email" />
            <input
              className="inputStyle"
              type="password"
              placeholder="Password"
            />
          </form>
        </div>
        <div className="flex flex-row items-center mt-4 mb-8 max-sm:my-0 ">
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              value=""
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <p>
              I accept the terms of the offer of
              <span className="text-[#6E41E2]"> the privacy policy</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 font-semibold">
          <button className="bg-[#6E41E2] w-full h-12 rounded-md text-white  ">
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
