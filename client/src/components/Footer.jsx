import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-8 text-sm text-gray-600">

          {/* Brand */}
          <div>
            <h2 className="text-lg font-semibold text-black">
              Notebook AI
            </h2>
            <p className="mt-2">
              Smart notes powered by AI to help you learn faster and stay organized.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-medium text-black mb-3">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-black">Features</a></li>
              <li><a href="#" className="hover:text-black">Pricing</a></li>
              <li><a href="#" className="hover:text-black">Updates</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium text-black mb-3">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-black">About</a></li>
              <li><a href="#" className="hover:text-black">Careers</a></li>
              <li><a href="#" className="hover:text-black">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-medium text-black mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-black">Privacy</a></li>
              <li><a href="#" className="hover:text-black">Terms</a></li>
              <li><a href="#" className="hover:text-black">Security</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Notebook AI</p>
          <div className="space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-black">Twitter</a>
            <a href="#" className="hover:text-black">LinkedIn</a>
            <a href="#" className="hover:text-black">GitHub</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;