//import libraries and components
import Footer from "../../components/general/Footer";
import HeaderView from "../../components/general/HeaderView";
import LandingPageView from "./../../components/general/LandingPageView";

//main components
export const LandingPage = () => {
  return (
    <div>
      <HeaderView />
      <LandingPageView />
      <Footer />
    </div>
  );
};

export default LandingPage;
