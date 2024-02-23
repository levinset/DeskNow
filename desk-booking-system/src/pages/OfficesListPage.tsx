//
import OfficeListCard from "../components/OfficeListCard";
import UserHeader from "../components/UserHeader";
import { useGetAllOffices } from "../hooks/useGetAllOffices";
import { OfficesProps } from "../types/OfficesProps";

//
export default function OfficesListPage() {
  //queries
  const { data } = useGetAllOffices();

  //
  return (
    <div>
      <UserHeader />
      <div className="container justify-center mx-auto pt-[10rem] gap-10 flex flex-col max-sm:px-4 ">
        <div className=" max-sm:text-center">
          <h1 className="text-4xl font-bold">Select your Office</h1>
          <h2 className="text-xl ">
            you can see details and different options after you selected the
            office
          </h2>
        </div>
        <div className="bg-[#E2E9FB] h-12 rounded-md">searchbar</div>
        <div className="grid grid-cols-3 gap-[4rem] max-sm:grid-cols-1 ">
          {data &&
            data.map((office: OfficesProps) => (
              <OfficeListCard key={office.id} {...office} />
            ))}
        </div>
      </div>
    </div>
  );
}
