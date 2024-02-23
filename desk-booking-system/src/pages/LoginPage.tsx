//import libaries and comonents
import Footer from "../components/Footer";
import Login from "../components/Login";
import { useLoginUser } from "../hooks/useLoginUser";
import { UserLoginType } from "../types/UserLoginType";

//main component
export default function LoginPage() {
  //
  const { mutate: loginUsers } = useLoginUser();
  //
  const onSubmit = async (data: UserLoginType) => {
    try {
      await loginUsers(data);
    } catch (error) {
      console.error("Error login user:", error);
    }
  };
  return (
    <div>
      <div className="flex flex-row justify-center h-screen  bg-[#C7D2FF] ">
        <Login onSubmit={onSubmit} />
      </div>
      <Footer />
    </div>
  );
}
