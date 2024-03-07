//import libraries
import { Carousel } from "primereact/carousel";
import BookedInfoCard from "./BookedInfoCard";
import { useGetAllBookedDesk } from "../../../../hooks/userHooks/bookings/useGetAllBookedDesk";
import { useEffect, useState } from "react";
import { useGetUserProfile } from "../../../../hooks/userHooks/users/useGetUserProfile";

//types
import { BookedDesk } from "../../../../types/DesksProps";
interface ResponsiveOption {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}

//main component
export default function BookedView() {
  //
  const [userId, setUserId] = useState("");
  // queries
  const { data, isLoading, isError } = useGetUserProfile();
  const { data: bookedDeskData } = useGetAllBookedDesk(userId);

  //adjust Carousel screen size
  const responsiveOptions: ResponsiveOption[] = [
    {
      breakpoint: "1600px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "1650px",
      numVisible: 2,
      numScroll: 1,
    },
  ];
  //use effect
  useEffect(() => {
    if (data && data.id) {
      setUserId(data.id);
    }
  }, [data]);

  //
  return (
    <div className="flex max-sm:justify-center">
      <Carousel
        value={bookedDeskData || []}
        numVisible={2}
        numScroll={1}
        orientation="vertical"
        verticalViewPortHeight="40vh"
        responsiveOptions={responsiveOptions}
        itemTemplate={(desk: BookedDesk) => (
          <div className=" w-[25vw] max-sm:w-[90vw] p-d-flex p-ai-center p-jc-center max-lg:w-full">
            <BookedInfoCard
              key={desk.id}
              deskId={desk.id}
              deskCommentId={desk.desk.id}
              label={desk.desk.label}
              officeName={desk.desk.office.name}
              dateStart={desk.dateStart}
              dateEnd={desk.dateEnd}
              column={desk.desk.column}
              row={desk.desk.row}
              userId={data.id}
              officeId=""
              deskFavouriteId=""
            />
          </div>
        )}
      />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching user profile</p>}
    </div>
  );
}
