//
import { useState } from "react";
import Register from "../components/Register";
import { useAddUser } from "../hooks/useAddUser";
import { UserInputType } from "../types/UserInputType";
import SuccessRegister from "../components/SuccessRegister";
//

//
export default function RegisterPage() {
  const { mutate: registerUsers } = useAddUser();
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State to track success message

  const onSubmit = async (data: UserInputType) => {
    try {
      await registerUsers(data);
      setSuccessMessage("User registered successfully!"); // Set success message if registration is successful
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="flex flex-row justify-center h-screen bg-[#C7D2FF] ">
      {!successMessage && <Register onSubmit={onSubmit} />}
      {successMessage && <SuccessRegister />}
    </div>
  );
}
