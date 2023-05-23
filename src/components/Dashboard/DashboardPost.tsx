import dynamic from "next/dynamic";

import 'suneditor/dist/css/suneditor.min.css';
const DashboardPost = () => {
    const SunEditor = dynamic(() => import("suneditor-react"), {
        ssr: false,
    });
    return (
        <div className=''>
            <SunEditor placeholder="Please type here..." />
        </div>
    )
}

export default DashboardPost