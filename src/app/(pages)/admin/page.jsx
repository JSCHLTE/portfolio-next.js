import AdminDashboard from './AdminDashboard';
import AnimatedText from '@/app/utils/animated-text/AnimatedText';

export const metadata = {
  title: 'Admin | Jordan Schulte',
  description: 'Admin dashboard for managing content and settings.',
  robots: 'noindex, nofollow',
};

const Admin = () => {
  return (
    <div className="admin-wrapper">
      <h1><AnimatedText text='Create a Blog' /></h1>
      <AdminDashboard />
    </div>
  );
};

export default Admin;
