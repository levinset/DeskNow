//import libraries and components
import Footer from "../../components/general/Footer";
import CookiePrivacyModal from "../../components/user/booking/CookiePrivacyModal";
import HeaderView from "../../components/general/HeaderView";
import LandingPageView from "../../components/general/LandingPageView";

//main components
export const LandingPage = () => {
  return (
    <div>
      <HeaderView />
      <LandingPageView />
      <CookiePrivacyModal />
      <Footer />
    </div>
  );
};

export default LandingPage;
