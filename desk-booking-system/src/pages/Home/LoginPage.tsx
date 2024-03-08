//import libaries and comonents
import Footer from "../../components/general/Footer";
import Header from "../../components/general/Header";
import Login from "../../components/general/Login";
import { useLoginUser } from "../../hooks/userHooks/users/useLoginUser";
import { useNavigate } from "react-router-dom";

//types
import { UserLoginType } from "../../types/UserLoginType";

//main component
export default function LoginPage() {
  //queries
  const { mutate: loginUsers, isError, error } = useLoginUser();
  //

  //navigation
  const navigate = useNavigate();
  //handle sign in
  const onSubmit = async (data: UserLoginType) => {
    try {
      await loginUsers(data, {
        onSuccess: () => {
          navigate("/DeskNow/loginloading");
        },
        onError: (error) => {
          console.log(error.message);
        },
      });
    } catch (error) {
      console.error("Error login user:", error);
    }
  };
  //

  return (
    <div>
      <Header />
      <div className="flex flex-row justify-center h-screen  bg-[#C7D2FF] ">
        <Login userError={error?.message} onSubmit={onSubmit} />
      </div>

      <Footer />
      {isError && <div>Error: {error.message}</div>}
    </div>
  );
}
