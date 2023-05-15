import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import TabMenu from '@/components/Dashboard/DashboardTab';

const Profile = (async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
        // redirect('/api/auth/signin');
        console.log(session, 'seon')
        return
    }
    const { user } = session
    //@ts-ignore
    const role = user.role
    return <div className="mx-2 rounded bg-gray-200">
        <TabMenu role={role} />
    </div>;
});

export default Profile;