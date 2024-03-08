//import libaries and components
import LandingPageMoto from "../../components/general/LandingPageMoto";

//
export default function LandingPageView() {
  return (
    <section className=" bg-white  max-sm:bg-[#B6EDFF] max-lg:bg-[url(./images/background_Mobile.webp)] ">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8 lg:py-16 max-sm:p-0 max-sm:h-[80vh] ">
        <div
          className={`bg-[url(./images/heroImage.webp)] bg-no-repeat bg-right max-lg:bg-none   `}
          style={{ backgroundSize: "60%" }}
        >
          <LandingPageMoto />
        </div>
      </div>
    </section>
  );
}
