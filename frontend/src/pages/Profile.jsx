import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, Calendar, LogOut } from 'lucide-react';

function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

            try {
                const response = await axios.get(`${baseUrl}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setUserData(response.data.user);
                }
            } catch (err) {
                setError('تعذر جلب بيانات المستخدم، يرجى إعادة تسجيل الدخول');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
                جاري تحميل البيانات...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <p className="text-red-500 text-sm font-medium">{error}</p>
                <button
                    onClick={() => navigate('/login')}
                    className="px-6 py-2 bg-black text-white text-xs uppercase font-bold rounded"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-neutral-900 text-white p-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-serif uppercase tracking-widest">My Profile</h1>
                        <p className="text-gray-400 text-xs mt-1">Manage your account information</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-xs uppercase tracking-wider font-bold transition-colors"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>

                {/* Profile Info Grid */}
                <div className="p-8 grid gap-6 md:grid-cols-2">
                    {/* Name */}
                    <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
                        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                            <User size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-semibold uppercase">Full Name</p>
                            <p className="text-sm font-bold text-gray-800">{userData?.name}</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
                        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                            <Mail size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-semibold uppercase">Email Address</p>
                            <p className="text-sm font-bold text-gray-800">{userData?.email}</p>
                        </div>
                    </div>

                    {/* Role */}
                    <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
                        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                            <Shield size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-semibold uppercase">Account Role</p>
                            <p className="text-sm font-bold text-gray-800 capitalize">{userData?.role}</p>
                        </div>
                    </div>

                    {/* Member Since */}
                    <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
                        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-semibold uppercase">Member Since</p>
                            <p className="text-sm font-bold text-gray-800">
                                {userData?.created_at ? new Date(userData.created_at).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;