//import libaries and components
import { useState } from "react";
import { useAddUser } from "../../hooks/userHooks/users/useAddUser";
import SuccessRegister from "../../components/general/SuccessRegister";
import Register from "../../components/general/Register";
import Footer from "../../components/general/Footer";
import Header from "../../components/general/Header";
//types
import { CustomError } from "../../types/ErrorType";
import { UserInputType } from "../../types/UserInputType";
//main component
export default function RegisterPage() {
  //queries
  const { mutate: registerUsers, isError, error } = useAddUser();
  //usestate hooks
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  //handle registration
  const onSubmit = async (data: UserInputType) => {
    try {
      await registerUsers(data, {
        onSuccess: () => {
          setSuccessMessage("User registered successfully!");
        },
        onError: (registerEror: CustomError) => {
          setSuccessMessage(
            registerEror?.response?.data?.message || "Failed to send comment."
          );
        },
      });
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  //
  return (
    <div>
      <Header />
      <div className="flex flex-row justify-center h-full bg-[#C7D2FF] ">
        {<Register onSubmit={onSubmit} />}
        {successMessage && <SuccessRegister />}
      </div>
      <div className="mt-10 ">
        <Footer />
      </div>
      {isError && <div>Error: {error.message}</div>}
    </div>
  );
}
