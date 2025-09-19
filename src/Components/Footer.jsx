import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="f">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
        <div>
          <img src={assets.logo} alt="" className="mb-5 w-32 " />
          <p className="w-full sm:w-2/3 text-gray-600">
            Shop with Forever and experience the convenience of online shopping
            like never before.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>

          <ul className="flex flex-col flex-1 text-gray-600 cursor-pointer">
            <li className="mb-2">
              <Link to="/" onClick={scrollToTop}>Home</Link>
            </li>
            <li className="mb-2">
              <Link to="/about" onClick={scrollToTop}>About Us</Link>
            </li>
            <li className="mb-2">
              <Link to="/delivery" onClick={scrollToTop}>Delivery</Link>
            </li>
            <li className="mb-2">
              <Link to="/privacy" onClick={scrollToTop}>Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col flex-1 text-gray-600">
            <li className="mb-2">+123 456 7890</li>
            <li className="mb-2">contact@forevryou.com </li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ forever.com - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
