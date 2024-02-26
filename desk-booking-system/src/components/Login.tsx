//import libraries
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//types
import { UserLoginType } from "../types/UserLoginType";
interface LoginProps {
  onSubmit: SubmitHandler<UserLoginType>;
}
//
//user shema input erro handller
const schema = yup.object().shape({
  email: yup.string().required("please enter your Email"),
  password: yup.string().required("please enter your Password"),
});

//main component
export default function Login({ onSubmit }: LoginProps) {
  //react form with yup resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginType>({ resolver: yupResolver(schema) });
  //handle Login data pass
  const handleLogin = () => {
    handleSubmit(onSubmit)();
  };
  return (
    <div className="  w-[40vw] h-fit rounded-md shadow-xl bg-gray-50  max-sm:w-full max-sm:h-fit mt-10 max-sm:mt-4 ">
      <div className="flex flex-col gap-6 p-8 pb-0">
        <div>
          <h1 className="text-4xl font-bold">Sign In</h1>
        </div>
        <div className="flex flex-row gap-4">
          <Link to="/register">Registeration</Link>
          <div className="flex flex-col gap-3">
            <Link className="" to="/login">
              Sign In
            </Link>
            <p className=" border-[1.5px] border-[#6E41E2] "></p>
          </div>
        </div>
      </div>
      <hr className="" />
      <div className="flex flex-col justify-center gap-4 p-8">
        <div className="">
          <form className="flex flex-col gap-4 " action="">
            <input
              {...register("email")}
              className="inputStyle"
              type="email"
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="text-red-500 ">{errors.email.message}</p>
            )}
            <input
              {...register("password")}
              className="inputStyle"
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 ">{errors.password.message}</p>
            )}
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
              Save my
              <span className="text-[#6E41E2]"> Password</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 font-semibold">
          <button
            onClick={handleLogin}
            className="bg-[#6E41E2] w-full h-12 rounded-md text-white  "
          >
            Sign In
          </button>
          <div>
            <Link className="text-[#6E41E2] " to="/register">
              Registeration
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
