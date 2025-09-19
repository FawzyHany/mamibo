import { Facebook, Instagram, Phone, MapPin } from "lucide-react";
import Link from "next/link";

 export  const Footer = () => {
  return (
    <footer className="bg-[var(--primary-color2)] text-white py-10 mt-20">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-2">Mamibo Ristorante</h2>
          <p className="text-sm text-white">
            Authentic Italian cuisine made with passion and tradition. Join us for a true taste of Italy.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <ul className="text-sm text-white space-y-2">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +39 0123 456 789
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Via Roma 15, Milano, Italy
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <Link href="https://facebook.com" target="_blank">
              <Facebook className="w-6 h-6 hover:text-[var(--primary-color2)] transition" />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <Instagram className="w-6 h-6 hover:text-[var(--primary-color2)] transition" />
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mt-8 text-center text-sm text-gray-700">
        © {new Date().getFullYear()} Mamibo Ristorante. All rights reserved.
      </div>
    </footer>
  );
};
