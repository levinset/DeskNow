import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { UserInputType } from "../types/UserInputType";
import { useGetAllDepartments } from "../hooks/useGetAllDepartments";

interface EditProfileFormProps {
  onSubmit: SubmitHandler<UserInputType>;
  userData: UserInputType;
}

const schema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup.string().required("Email is required"),
  department: yup.string().required("Department is required"),
  password: yup.string().required("Password is required"),
});

const EditProfileForm: React.FC<EditProfileFormProps> = ({ onSubmit, userData }) => {
  const { data, isLoading, isError } = useGetAllDepartments();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputType>({
    resolver: yupResolver(schema),
    defaultValues: userData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          id="firstname"
          {...register("firstname")}
          type="text"
          className="mt-1 p-2 border rounded-md w-full"
        />
        {errors.firstname && <p className="text-red-500">{errors.firstname.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          id="lastname"
          {...register("lastname")}
          type="text"
          className="mt-1 p-2 border rounded-md w-full"
        />
        {errors.lastname && <p className="text-red-500">{errors.lastname.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          {...register("email")}
          type="email"
          className="mt-1 p-2 border rounded-md w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="department" className="block text-sm font-medium text-gray-700">
          Department
        </label>
        <select
          id="department"
          {...register("department")}
          className="mt-1 p-2 border rounded-md w-full"
        >
          <option value="">Please Select Your Department</option>
          {data &&
            Object.keys(data).map((departmentKey, index) => (
              <option key={index} value={data[departmentKey]}>
                {data[departmentKey]} Department
              </option>
            ))}
        </select>
        {errors.department && <p className="text-red-500">{errors.department.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          {...register("password")}
          type="password"
          className="mt-1 p-2 border rounded-md w-full"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
        Save Changes
      </button>
    </form>
  );
};

export default EditProfileForm;
