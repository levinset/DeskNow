//import libraries
import { Link } from "react-router-dom";
import { useGetUserProfile } from "../../../../hooks/userHooks/users/useGetUserProfile";

//main component
export default function UserWelcome() {
  //query
  const { data, isLoading, isError } = useGetUserProfile();
  //
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl text-[#2647C8] font-bold ">
          Welcome back,
          <span className="capitalize text-violet-600">
            {data && data.firstname} !
          </span>
        </h1>
        <h2>you are working from office today.</h2>
        <Link
          to="/offices"
          className=" bg-[#2647C8] px-4 py-2 rounded-3xl text-white w-[10rem] font-semibold "
        >
          Book a Desk
        </Link>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching user profile</p>}
    </div>
  );
}
