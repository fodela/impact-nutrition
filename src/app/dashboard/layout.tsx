import { ToastContainer } from "react-toastify";
import DashboardNav from "./DashboardNav";
import "react-toastify/ReactToastify.min.css";
export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="pt-10 max-w-screen-xl md:mx-auto border-b border-gray-300">
        <ToastContainer />
        <DashboardNav />
        <div className='dark:bg-black bg-white rounded-xl p-4 m-4'>
            {children}
        </div>
    </div>
}