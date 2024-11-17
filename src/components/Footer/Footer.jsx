import { MailTwoTone, PhoneTwoTone } from '@ant-design/icons';
import React from 'react';

const Footer = () => {
    return (
        <footer className="py-8 bg-white border-t-[1px]">
            <div className="grid grid-cols-6 w-full px-16">
                {/* Logo and Contact Section */}
                <div className="col-span-1">
                    <h2 className="text-lg font-bold mb-4">Quick Book</h2>
                    <ul className="space-y-2">
                        <li>
                            <span className="flex items-center">
                                <MailTwoTone className="mr-2" />
                                info@bestarion.com
                            </span>
                        </li>
                        <li>
                            <span className="flex items-center">
                                <PhoneTwoTone className="mr-2" />
                                (+84) 349 600 819
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Links Sections */}
                <div className="col-span-1">
                    <h2 className="text-lg font-bold mb-4">Getting started</h2>
                    <ul className="space-y-2">
                        <li>Getting started</li>
                        <li>FAQ</li>
                        <li>API</li>
                        <li>Blog</li>
                    </ul>
                </div>

                <div className="col-span-1">
                    <h2 className="text-lg font-bold mb-4">Company</h2>
                    <ul className="space-y-2">
                        <li>Meet us</li>
                        <li>Contact us</li>
                        <li>Terms of service</li>
                        <li>Privacy</li>
                    </ul>
                </div>

                <div className="col-span-1">
                    <h2 className="text-lg font-bold mb-4">Social</h2>
                    <ul className="space-y-2">
                        <li>Twitter</li>
                        <li>GitHub</li>
                        <li>cal.com</li>
                    </ul>
                </div>

                <div className="col-span-1">
                    <h2 className="text-lg font-bold mb-4">Industries</h2>
                    <ul className="space-y-2">
                        <li>Banking</li>
                        <li>Accounting</li>
                        <li>Personal Finance</li>
                    </ul>
                </div>

                {/* Newsletter Section */}
                <div className="col-span-1">
                    <h2 className="text-lg font-bold mb-4">
                        Subscribe to our newsletter
                    </h2>
                    <form className="flex">
                        <input
                            type="email"
                            placeholder="jsmith@gmail.com"
                            className="flex-1 border rounded-l px-4 py-2 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-orange-400 text-white rounded-r px-4 py-2 hover:bg-orange-400"
                        >
                            ➤
                        </button>
                    </form>
                </div>
            </div>
            <div className="mt-8 text-center text-gray-500">
                © 2024 Powered by Bestarion
            </div>
        </footer>
    );
};

export default Footer;
