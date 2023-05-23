import dynamic from "next/dynamic";

import 'suneditor/dist/css/suneditor.min.css';
const DashboardPost = () => {
    const SunEditor = dynamic(() => import("suneditor-react"), {
        ssr: false,
    });
    return (
<<<<<<< HEAD
        <div className=''>
            <SunEditor placeholder="Please type here..." />
        </div>
=======
        <div className=''>DashboardPost</div>
>>>>>>> b905e9e (Dev (#8))
    )
}

export default DashboardPost