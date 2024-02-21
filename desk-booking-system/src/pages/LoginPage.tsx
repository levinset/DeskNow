//import libaries and comonents
import Login from "../components/Login";
import { UserLoginType } from "../types/UserLoginType";

//main component
export default function LoginPage() {
  //
  const onSubmit = async (data: UserLoginType) => {
    console.log(data);
  };
  return (
    <div className="flex flex-row justify-center h-screen  bg-[#C7D2FF] ">
      <Login onSubmit={onSubmit} />
    </div>
  );
}
