import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import TabMenu from '@/components/Dashboard/DashboardTab';

const Profile = (async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/api/auth/signin');
    }
    const { user } = session
    // console.log('user', user.role)


    return <div className="mx-2 bg-gray-200">
        <TabMenu role={user?.role} />
    </div>;
});

export default Profile;
