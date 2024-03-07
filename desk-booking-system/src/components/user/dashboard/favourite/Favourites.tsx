// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { useGetAllFavouritesDesk } from "../../../../hooks/userHooks/favourites/useGetAllFavouritesDesk";
import { useGetUserProfile } from "../../../../hooks/userHooks/users/useGetUserProfile";
//Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// import required modules
import FavouriteCard from "./FavouriteCard";
import { BookedDesk } from "../../../../types/DesksProps";
import { useEffect, useState } from "react";

//types
interface SliderProps {
  slide: number;
  width: string;
}

const Favourites = (props: SliderProps) => {
  //
  const [userId, setUserId] = useState("");
  //queries
  const { data } = useGetUserProfile();
  const { data: favouritesDeskData } = useGetAllFavouritesDesk(userId);

  //
  useEffect(() => {
    if (data && data.id) {
      setUserId(data.id);
    }
  }, [data]);
  return (
    <section
      className="flex flex-col pb-0 max-sm:justify-center max-sm:mx-auto max-sm:items-center "
      id="testimonials"
    >
      <div className={`container w-[100vw] ${props.width}`}>
        <div>
          <h1 className="text-2xl font-bold text-center text-black ">
            Your Favourites Desks:
          </h1>
        </div>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          //navigation
          breakpoints={{
            500: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1025: { slidesPerView: props.slide || 4 },
          }}
          pagination={{ clickable: true }}
          autoplay={false}
          className={`h-fit pb-[9rem] pt-[1rem]  `}
        >
          {favouritesDeskData &&
            favouritesDeskData.map((desk: BookedDesk) => (
              <SwiperSlide
                className=" max-sm:flex max-sm:justify-center"
                key={desk.id}
              >
                <FavouriteCard
                  key={desk.id}
                  deskFavouriteId={desk.id}
                  deskId={desk.desk.id}
                  label={desk.desk.label}
                  officeName={desk.desk.office.name}
                  dateStart={desk.dateStart}
                  dateEnd={desk.dateEnd}
                  column={desk.desk.column}
                  row={desk.desk.row}
                  userId={data.id}
                  officeId={desk.desk.office.id}
                  deskCommentId={desk.id}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Favourites;
