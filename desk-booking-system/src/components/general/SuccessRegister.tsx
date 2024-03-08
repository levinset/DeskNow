import { Link } from "react-router-dom";

export default function SuccessRegister() {
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
      <div className="w-[40vw] h-fit rounded-md shadow-xl bg-gray-50 max-sm:w-full max-sm:h-fit mt-10 max-sm:mt-4 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6 p-8 pb-0 mb-10">
          <div className="flex items-center justify-center pt-10">
            <h1 className="text-4xl font-bold text-center text-green-600">
              You have been successfully registered!
            </h1>
          </div>
        </div>
        <hr className="" />
        <div className="flex flex-col justify-center gap-4 p-8">
          <div className="flex flex-col items-center justify-center gap-4 font-semibold">
            <h2 className="text-xl">Sign in with your Email and Password</h2>
            <Link
              to="/DeskNow/login"
              className="bg-[#6E41E2] w-full h-12 rounded-md text-white flex justify-center items-center"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
