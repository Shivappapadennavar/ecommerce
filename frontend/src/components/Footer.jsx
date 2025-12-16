import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#172337] text-white pt-12 pb-6 mt-16 text-sm">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-gray-700 pb-8">

                <div>
                    <h3 className="text-gray-400 font-medium mb-4 uppercase tracking-wider text-xs">About</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Contact Us</a></li>
                        <li><a href="#" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Careers</a></li>
                        <li><a href="#" className="hover:underline">Press</a></li>
                        <li><a href="#" className="hover:underline">Corporate Information</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-gray-400 font-medium mb-4 uppercase tracking-wider text-xs">Help</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Payments</a></li>
                        <li><a href="#" className="hover:underline">Shipping</a></li>
                        <li><a href="#" className="hover:underline">Cancellation & Returns</a></li>
                        <li><a href="#" className="hover:underline">FAQ</a></li>
                        <li><a href="#" className="hover:underline">Report Infringement</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-gray-400 font-medium mb-4 uppercase tracking-wider text-xs">Policy</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Return Policy</a></li>
                        <li><a href="#" className="hover:underline">Terms Of Use</a></li>
                        <li><a href="#" className="hover:underline">Security</a></li>
                        <li><a href="#" className="hover:underline">Privacy</a></li>
                        <li><a href="#" className="hover:underline">Sitemap</a></li>
                    </ul>
                </div>

                <div className="border-l border-gray-700 pl-0 md:pl-8">
                    <h3 className="text-gray-400 font-medium mb-4 uppercase tracking-wider text-xs">Mail Us:</h3>
                    <p className="mb-4 text-sm leading-relaxed">
                        QuickKart Internet Private Limited,<br />
                        Buildings Alyssa, Begonia &<br />
                        Clove Embassy Tech Village,<br />
                        Bengaluru, 560103,<br />
                        Karnataka, India
                    </p>
                    <div className="flex gap-4 mt-4">
                        <Facebook size={20} className="hover:text-blue-500 cursor-pointer" />
                        <Twitter size={20} className="hover:text-blue-400 cursor-pointer" />
                        <Instagram size={20} className="hover:text-pink-500 cursor-pointer" />
                    </div>
                </div>

            </div>

            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400">
                <div className="flex items-center gap-2 mb-2 sm:mb-0">
                    <span className="text-yellow-400"><MapPin size={14} /></span>
                    <span>Sell On QuickKart</span>
                </div>
                <div className="mb-2 sm:mb-0">
                    © 2007-2024 QuickKart.com
                </div>
                <div className="flex items-center gap-4">
                    <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg" alt="Payments" className="h-4" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
