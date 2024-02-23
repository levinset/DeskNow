//
import OfficeCard from "../components/OfficeCard";
import UserHeader from "../components/UserHeader";
import { useGetAllDesks } from "../hooks/useGetAllDesks";
import { DeskProps } from "../types/DesksProps";

//
export default function DesksAllPage() {
  //queries
  const { data } = useGetAllDesks();

  //
  return (
    <div>
      <UserHeader />
      <div className="container justify-center mx-auto pt-[10rem] gap-10 flex flex-col max-sm:px-4 ">
        <div className=" max-sm:text-center">
          <h1 className="text-4xl font-bold">Select your Desk</h1>
          <h2 className="text-xl ">
            you can see details by selecting the desk
          </h2>
        </div>
        <div className="bg-[#E2E9FB] h-12 rounded-md">searchbar</div>
        <div className="grid grid-cols-3 gap-[4rem] max-sm:grid-cols-1 ">
          {data &&
            data.map((office: DeskProps) => (
              <OfficeCard key={office.id} {...office} />
            ))}
        </div>
      </div>
    </div>
  );
}
