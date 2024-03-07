//imports
import { useGetUserProfile } from "../../../hooks/userHooks/users/useGetUserProfile";

//main component
const UserProfileSection = () => {
  //querries
  const { data } = useGetUserProfile();

  return (
    <div>
      <section className="bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Profile Information</h2>
        <div className="flex items-center mb-4">
          <div>
            <h3 className="text-xl font-bold mb-2">
              {data && data.firstname} {data && data.lastname}
            </h3>
            <p className="mb-1 text-gray-600">
              <span className="font-semibold">Email:</span> {data && data.email}
            </p>
            <p className="mb-1 text-gray-600">
              <span className="font-semibold">Department:</span>
              {data && data.department}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfileSection;
