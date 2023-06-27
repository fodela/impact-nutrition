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
    const handleSubElementClick = (e: any) => {
        e.stopPropagation();
    };
    if (!isOpen || !sidebarRoot) return null;

    return createPortal(
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50" onClick={onClose} >
            <div onClick={handleSubElementClick} className={`fixed top-0 left-0 flex flex-col w-64 bg-white dark:bg-black h-full revealFromLeft`}>
                <div className="flex justify-between">
                    <Logo />
                    <button
                        className="ml-auto mr-4 mt-4 hover:text-gray-800"
                        onClick={onClose}
                    >
                        <AiOutlineCloseCircle size={30} />
                    </button>
                </div>

                <ul className="mt-8">
                    <li className="py-2 px-4 text-gray-600 hover:bg-gray-200 dark:text-white">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="py-2 px-4 text-gray-600 hover:bg-gray-200 dark:text-white">
                        <Link href="/about">About</Link>
                    </li>
                    {/* <li className="py-2 px-4 text-gray-600 hover:bg-gray-200">
                        <Link href="/services">Services</Link>
                    </li> */}
                    <li className="py-2 px-4 text-gray-600 hover:bg-gray-200 dark:text-white">
                        <Link href="/blog">Blog</Link>
                    </li>
                    <li className="py-2 px-4 text-gray-600 hover:bg-gray-200 dark:text-white">
                        <Link href="/events">Events</Link>
                    </li>
                    <li className="py-2 px-4 text-gray-600 hover:bg-gray-200 dark:text-white">
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
