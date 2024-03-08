//import libraries
import { ChangeEvent, useState } from "react";
import OfficeListCard from "../../components/user/booking/OfficeListCard";
import UserHeader from "../../components/user/home/UserHeader";
import { useGetAllOffices } from "../../hooks/userHooks/offices/useGetAllOffices";
import { OfficesProps } from "../../types/OfficesProps";
import Footer from "../../components/general/Footer";

//main component
export default function OfficesListPage() {
  //queries
  const { data, isError, isLoading } = useGetAllOffices();
  //use state hooks
  const [searchQuery, setSearchQuery] = useState("");
  // Filter offices based on the search query
  const filteredOffices = data
    ? data.filter((office: OfficesProps) =>
        office.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  // Function to handle changes in the search query
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  //
  return (
    <div>
      <UserHeader />
      <div className="container mb-10 px-4 justify-center mx-auto pt-[3rem] gap-10 flex flex-col max-sm:px-4 max-sm:pt-2 max-sm:gap-4 ">
        <div className=" max-sm:text-center">
          <h1 className="text-4xl font-bold">Select your Office</h1>
          <h2 className="text-xl ">
            you can see details and different options after you selected the
            office
          </h2>
        </div>
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search Office"
          value={searchQuery}
          onChange={handleSearchChange}
          className="bg-[#E2E9FB] h-12 rounded-md px-4"
        />
        <div className="grid grid-cols-4 gap-[4rem] max-sm:gap-1 max-lg:grid-cols-3 max-sm:grid-cols-2 ">
          {/* Render filtered offices */}
          {filteredOffices.map((office: OfficesProps) => (
            <OfficeListCard key={office.id} {...office} />
          ))}
        </div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching user profile</p>}
      </div>
      <Footer />
    </div>
  );
}
