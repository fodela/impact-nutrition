import Link from "next/link";
import React, { FC } from "react";
import { createPortal } from "react-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import SessionButtons from "./SessionButtons";
import Logo from "./Logo";

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
    sidebarRoot: HTMLElement | null; // Sidebar root element
};

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose, sidebarRoot }) => {
    if (!isOpen || !sidebarRoot) return null;

    return createPortal(
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50">
            <div className={`fixed top-0 left-0 flex flex-col w-64 bg-white h-full transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-1000 ease-linear`}>
                <div className="flex justify-between">
                    <Logo />
                    <button
                        className="ml-auto mr-4 mt-4 text-gray-600 hover:text-gray-800"
                        onClick={onClose}
                    >
                        <AiOutlineCloseCircle size={30} />
                    </button>
                </div>

                <ul className="mt-8">
                    <li className="py-2 px-4 text-gray-600 hover:bg-gray-200">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="py-2 px-4 text-gray-600 hover:bg-gray-200">
                        <Link href="/about">About</Link>
                    </li>
                    <li className="py-2 px-4 text-gray-600 hover:bg-gray-200">
                        <Link href="/services">Services</Link>
                    </li>
                    <li className="py-2 px-4 text-gray-600 hover:bg-gray-200">
                        <Link href="/blog">Blog</Link>
                    </li>
                    <li className="py-2 px-4 text-gray-600 hover:bg-gray-200">
                        <Link href="/contact_us">Contact Us</Link>
                    </li>
                    <SessionButtons />
                </ul>
            </div>
        </div>,
        sidebarRoot
    );
};

export default Sidebar;
