//
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { UserInputType } from "../../../types/UserInputType";
import { useGetAllDepartments } from "../../../hooks/userHooks/getEnums/useGetAllDepartments";
import { useEffect, useState } from "react";
import { useGetUserProfile } from "../../../hooks/userHooks/users/useGetUserProfile";

///
interface RegisterProps {
  onSubmit: SubmitHandler<UserInputType>;
}

//
const schema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup.string().required("Email is required"),
  department: yup.string().required("Department is required"),
  password: yup.string().required("Password is required"),
});
export default function EditProfileForm({ onSubmit }: RegisterProps) {
  const { data: initialDepartments } = useGetAllDepartments();
  const [departments, setDepartments] = useState(initialDepartments);
  const { data: userData } = useGetUserProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Add the setValue function from useForm
  } = useForm<UserInputType>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (initialDepartments !== undefined) {
      setDepartments(initialDepartments);
    }
  }, [initialDepartments]);

  useEffect(() => {
    // Set form values with user data when userData is available
    if (userData) {
      setValue("firstname", userData.firstname);
      setValue("lastname", userData.lastname);
      setValue("email", userData.email);
      setValue("department", userData.department);
      // Assuming you have a password field in your user data
      setValue("password", userData.password);
    }
  }, [userData, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields with defaultValue */}
      {/* First Name */}
      <div className="mb-4">
        <label
          htmlFor="firstname"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <input
          id="firstname"
          {...register("firstname")}
          type="text"
          defaultValue={userData?.firstname || ""}
          className="mt-1 p-2 border rounded-md w-full"
        />
        {errors.firstname && (
          <p className="text-red-500">{errors.firstname.message}</p>
        )}
      </div>
      {/* Last Name */}
      <div className="mb-4">
        <label
          htmlFor="lastname"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <input
          id="lastname"
          {...register("lastname")}
          type="text"
          defaultValue={userData?.lastname || ""}
          className="mt-1 p-2 border rounded-md w-full"
        />
        {errors.lastname && (
          <p className="text-red-500">{errors.lastname.message}</p>
        )}
      </div>
      {/* Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          {...register("email")}
          type="email"
          defaultValue={userData?.email || ""}
          className="mt-1 p-2 border rounded-md w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      {/* Department */}
      <div className="mb-4">
        <label
          htmlFor="department"
          className="block text-sm font-medium text-gray-700"
        >
          Department
        </label>
        {departments !== undefined && (
          <select
            id="department"
            {...register("department")}
            defaultValue={userData?.department || ""}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="">Please Select Your Department</option>
            {departments &&
              Object.keys(departments).map((departmentKey, index) => (
                <option key={index} value={departments[departmentKey]}>
                  {departments[departmentKey]} Department
                </option>
              ))}
          </select>
        )}
        {errors.department && (
          <p className="text-red-500">{errors.department.message}</p>
        )}
      </div>
      {/* Password */}
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          {...register("password")}
          type="password"
          defaultValue={userData?.password || ""}
          className="mt-1 p-2 border rounded-md w-full"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        Save Changes
      </button>
    </form>
  );
}
