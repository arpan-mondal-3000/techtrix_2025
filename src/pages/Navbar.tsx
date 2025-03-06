// src/components/Navbar.tsx
import React from "react";

interface NavbarProps {
  // If used normally, these callback(s) are for Login/Sign Up buttons
  onAuthClick?: () => void;
  // Determines whether or not to show the Login/Sign Up buttons.
  showAuthButtons?: boolean;
  // If on the Auth route, we'll show a single Home button instead.
  isAuthRoute?: boolean;
  // Callback for the Home button when on the Auth route.
  onHomeClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onAuthClick,
  showAuthButtons = true,
  isAuthRoute = false,
  onHomeClick,
}) => {
  return (
    <nav className="w-full h-[10vh] flex justify-around items-center text-white">
      <div className="logo ml-16">
        <span className="text-[#4d2be2] text-4xl font-bold">Dr</span>
        <span className="text-red-600 text-4xl font-bold">i</span>
        <span className="text-[#4d2be2] text-4xl font-bold">ver</span>
        <span className="text-4xl font-bold">Net</span>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="links flex space-x-4 ml-14">
          <div
            className="link"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <a
              href="#"
              className="text-white no-underline text-xl hover:text-red-600"
            >
              Home
            </a>
          </div>
          <div
            className="link"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="100"
          >
            <a
              href="#"
              className="text-white no-underline text-xl hover:text-red-600"
            >
              About
            </a>
          </div>
          <div
            className="link"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="200"
          >
            <a
              href="#"
              className="text-white no-underline text-xl hover:text-red-600"
            >
              Services
            </a>
          </div>
          <div
            className="link"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="500"
          >
            <a
              href="#"
              className="text-white no-underline text-xl hover:text-red-600"
            >
              Feedback
            </a>
          </div>
          <div
            className="link"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="600"
          >
            <a
              href="#"
              className="text-white no-underline text-xl hover:text-red-600"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {isAuthRoute ? (
        // For the Auth route: show a single Home button.
        <div className="buttons w-64 flex justify-center items-center mr-10">
          <button
            data-aos="fade-up"
            data-aos-duration="1200"
            className="mx-1 w-2/5 h-[5vh] rounded-md border-none outline-none text-xl font-bold text-white bg-red-600 transition ease-linear hover:scale-110 hover:bg-transparent hover:backdrop-brightness-50 hover:text-white hover:border-solid hover:border"
            onClick={onHomeClick}
          >
            Home
          </button>
        </div>
      ) : (
        // Otherwise, if desired, show the Login and Sign Up buttons.
        showAuthButtons && (
          <div className="buttons w-64 flex justify-center items-center mr-16">
            <button
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="800"
              className="mx-1 w-2/5 h-[5vh] rounded-md border-none outline-none text-xl font-bold text-white bg-red-600 transition ease-linear hover:scale-110 hover:bg-transparent hover:backdrop-brightness-50 hover:text-white hover:border-solid hover:border"
              onClick={onAuthClick}
            >
              Login
            </button>
            <button
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="900"
              className="mx-1 w-2/5 h-[5vh] rounded-md border-none outline-none text-xl font-bold text-white bg-red-600 transition ease-linear hover:scale-110 hover:bg-transparent hover:backdrop-brightness-50 hover:text-white hover:border-solid hover:border"
              onClick={onAuthClick}
            >
              Sign up
            </button>
          </div>
        )
      )}
    </nav>
  );
};

export default Navbar;
