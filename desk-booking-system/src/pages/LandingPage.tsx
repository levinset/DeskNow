import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import heroImage from '../Images/heroImage.jpg'

const LandingPage = () => {
  return (
    
    <div>
        <Header/>
      <section className="bg-blue-200">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 ">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
              <img
                alt="Landing Page  Hero Image"
                src={heroImage}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Welcome To DeskNow
              </h2>

              <p className="mt-4 text-gray-600">
                The most Efficient, User-friendly software with real-time updates desk booking system in the World.
              </p>

              <a
                href="#"
                className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Get Started Today
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default LandingPage;