//import libaries and components
import LandingPageMoto from "../../components/general/LandingPageMoto";

//
export default function LandingPageView() {
  return (
    <section
      className="bg-white 2xl:h-[95vh] bg-right bg-no-repeat bg-[url(./images/heroImage.png)] max-lg:bg-bottom  "
      style={{ backgroundSize: "100%" }}
    >
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8 lg:py-16 max-sm:p-0 max-sm:h-[80vh] ">
        <div className="">
          <LandingPageMoto />
        </div>
      </div>
    </section>
  );
}
