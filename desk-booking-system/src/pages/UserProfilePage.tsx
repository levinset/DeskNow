//import libraries
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
//
const imageUrl = "src/Images/frame.png";
//main componet
export default function UserProfilePage() {
  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center gap-8 py-10">
        <div className="container flex flex-row items-center justify-center gap-2 mx-auto ">
          <div className=" w-[30%] ">
            <div className="">
              <InfoCard />
            </div>
          </div>
          <div className="w-[40%] flex justify-center items-center text-center  ">
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-4xl text-[#2647C8] font-bold ">
                Welcome back, Summanya!
              </h1>
              <h2>you are working from office today.</h2>
              <button className=" bg-[#2647C8] px-4 py-2 rounded-3xl text-white ">
                book a desk
              </button>
            </div>
          </div>
          <div className=" w-[30%] ">
            <img src={imageUrl} alt="" />
          </div>
        </div>
        <div className="container flex flex-row items-center justify-center gap-4 mx-auto ">
          <InfoCard />
          <InfoCard />
        </div>
      </div>
      <Footer />
    </div>
  );
}
