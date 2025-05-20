import {redirect} from 'next/navigation';
import {getServerSession} from 'next-auth';
export default async function HomePage() {
    const session = await getServerSession();
    if(!session) {
        redirect('/authentication');
    }
    return (
        <div>
            <h1>Hello, {session.user?.name}!</h1>
            <p>Welcome to the home page!</p>
        </div>
    );
}