//import libaries and components
import { useState } from "react";
import Register from "../components/Register";
import { useAddUser } from "../hooks/useAddUser";
import { UserInputType } from "../types/UserInputType";
import SuccessRegister from "../components/SuccessRegister";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { CustomError } from "../types/ErrorType";

//main component
export default function RegisterPage() {
  const { mutate: registerUsers } = useAddUser();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  return (
    <div>
      <Header />
      <div className="flex flex-row justify-center h-screen bg-[#C7D2FF] ">
        {!successMessage && <Register onSubmit={onSubmit} />}
        {successMessage && <SuccessRegister />}
      </div>
      <Footer />
    </div>
  );
}
