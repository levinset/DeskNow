import { useState, useEffect } from "react";

const CookiePrivacyModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [acceptedCookies, setAcceptedCookies] = useState(false);

  // Function to handle accepting cookies
  const handleAcceptCookies = () => {
    setAcceptedCookies(true);
    setIsOpen(false);
    localStorage.setItem("cookiesAccepted", "true");
  };

  // Function to handle closing the modal
  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("cookiesAccepted", acceptedCookies.toString()); // Store user's choice in local storage
  };

  // Effect to check if user previously accepted cookies
  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (cookiesAccepted === "true") {
      setAcceptedCookies(true);
      setIsOpen(false);
    }
  }, []);

  return (
    <>
      {isOpen && !acceptedCookies && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="p-8 bg-white rounded-md shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Cookie & Privacy Policy</h2>
            <p>
              This website uses cookies to ensure you get the best experience.{" "}
              <br /> By continuing to use this website, you agree to our use of
              cookies as described in our{" "}
              <a href="/privacy-policy" className="text-blue-500">
                Privacy Policy
              </a>
              .
            </p>
            <div className="flex justify-center mt-4 gap-x-6">
              <button
                onClick={handleAcceptCookies}
                className="px-6 py-3 font-bold text-white transition-all duration-300 ease-in-out transform bg-blue-500 rounded-full shadow-lg hover:bg-blue-600"
              >
                Accept
              </button>
              <button
                onClick={handleClose}
                className="px-6 py-3 font-bold text-white transition-all duration-300 ease-in-out transform bg-blue-500 rounded-full shadow-lg hover:bg-blue-600"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookiePrivacyModal;
