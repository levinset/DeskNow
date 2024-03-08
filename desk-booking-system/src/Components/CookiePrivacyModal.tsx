import React, { useState, useEffect } from "react";

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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Cookie & Privacy Policy</h2>
            <p>
              This website uses cookies to ensure you get the best experience.{" "}
              <br /> By continuing to use this website, you agree to our use of
              cookies as described in our{" "}
              <a href="/privacy-policy" className="text-blue-500">
                Privacy Policy
              </a>
              .
            </p>
            <div className="flex justify-center gap-x-6 mt-4">
              <button
                onClick={handleAcceptCookies}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 ease-in-out"
              >
                Accept
              </button>
              <button
                onClick={handleClose}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 ease-in-out"
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
