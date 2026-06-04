
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaHome,
  FaBlog,
  FaBuilding,
  FaUsers,
  FaDollarSign,
  FaHeadset,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="w-full mt-40 bg-gradient-to-r from-slate-900 via-green-900 to-slate-900 text-gray-300 px-6 md:px-16 lg:px-24 xl:px-32 py-16 overflow-hidden">

        <div className="max-w-7xl mx-auto">

          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

            {/* Logo + About */}
            <div>

              <a href="https://prebuiltui.com">
                <img
                  src="/logo.svg"
                  alt="logo"
                  className="h-11 w-auto brightness-0 invert"
                />
              </a>

              <div className="w-40 h-[2px] mt-6 bg-gradient-to-r from-green-500 via-green-300 to-transparent rounded-full"></div>

              <p className="text-sm text-gray-400 mt-6 leading-relaxed max-w-sm">
                Making every customer feel valued no matter the size of your audience.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-4 mt-8">

                <a
                  href="#"
                  className="size-10 rounded-full bg-white/10 hover:bg-pink-500 transition-all duration-300 flex items-center justify-center hover:scale-110"
                >
                  <FaInstagram className="text-white text-lg" />
                </a>

                <a
                  href="#"
                  className="size-10 rounded-full bg-white/10 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center hover:scale-110"
                >
                  <FaFacebookF className="text-white text-lg" />
                </a>

                <a
                  href="#"
                  className="size-10 rounded-full bg-white/10 hover:bg-sky-500 transition-all duration-300 flex items-center justify-center hover:scale-110"
                >
                  <FaTwitter className="text-white text-lg" />
                </a>

                <a
                  href="#"
                  className="size-10 rounded-full bg-white/10 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center hover:scale-110"
                >
                  <FaLinkedinIn className="text-white text-lg" />
                </a>

                <a
                  href="#"
                  className="size-10 rounded-full bg-white/10 hover:bg-red-500 transition-all duration-300 flex items-center justify-center hover:scale-110"
                >
                  <FaYoutube className="text-white text-lg" />
                </a>

              </div>

            </div>

            {/* Product Links */}
            <div>

              <p className="text-lg font-semibold text-white mb-6">
                Product
              </p>

              <div className="flex flex-col gap-4">

                <a href="#" className="flex items-center gap-3 hover:text-green-400 transition">
                  <FaHome />
                  Home
                </a>

                <a href="#" className="flex items-center gap-3 hover:text-green-400 transition">
                  <FaHeadset />
                  Support
                </a>

                <a href="#" className="flex items-center gap-3 hover:text-green-400 transition">
                  <FaDollarSign />
                  Pricing
                </a>

                <a href="#" className="flex items-center gap-3 hover:text-green-400 transition">
                  <FaUsers />
                  Affiliate
                </a>

              </div>

            </div>

            {/* Resources */}
            <div>

              <p className="text-lg font-semibold text-white mb-6">
                Resources
              </p>

              <div className="flex flex-col gap-4">

                <a href="#" className="flex items-center gap-3 hover:text-green-400 transition">
                  <FaBuilding />
                  Company
                </a>

                <a href="#" className="flex items-center gap-3 hover:text-green-400 transition">
                  <FaBlog />
                  Blogs
                </a>

                <a href="#" className="flex items-center gap-3 hover:text-green-400 transition">
                  <FaUsers />
                  Community
                </a>

                <a href="#" className="flex items-center gap-3 hover:text-green-400 transition">
                  <FaLinkedinIn />
                  Careers
                </a>

                <a href="#" className="flex items-center gap-3 hover:text-green-400 transition">
                  <FaInstagram />
                  About
                </a>

              </div>

              <span className="inline-block text-xs text-white bg-green-600 rounded-md mt-5 px-3 py-1">
                We're Hiring
              </span>

            </div>

            {/* Subscribe */}
            <div>

              <h3 className="text-lg font-semibold text-white mb-6">
                Subscribe for news
              </h3>

              <p className="text-sm text-gray-400 mb-5">
                Get updates, blogs and latest product news directly in your inbox.
              </p>

              <div className="flex items-center bg-white/10 border border-white/20 rounded-full overflow-hidden backdrop-blur-md">

                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full bg-transparent px-5 py-3 outline-none text-sm text-white placeholder:text-gray-400"
                />

                <button className="bg-green-500 hover:bg-green-600 px-6 py-3 text-white text-sm font-medium transition">
                  Subscribe
                </button>

              </div>

            </div>

          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/10 my-10"></div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">

            <p>
              © 2025 Resume Builder. All rights reserved.
            </p>

            <div className="flex items-center gap-5">

              <a href="#" className="hover:text-green-400 transition">
                Terms & Conditions
              </a>

              <div className="w-px h-4 bg-white/20"></div>

              <a href="#" className="hover:text-green-400 transition">
                Privacy Policy
              </a>

            </div>

          </div>

        </div>

      </footer>
    </>
  );
};

export default Footer;



