'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/store/authStore';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/dashboard');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isAuthenticated, user, router]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!stats) {
    return <div className="container mx-auto px-4 py-8">No data available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-slate-600 text-sm mb-2">Total Revenue</p>
          <p className="text-3xl font-bold">${stats.totalRevenue?.toFixed(2) || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-slate-600 text-sm mb-2">Total Orders</p>
          <p className="text-3xl font-bold">{stats.totalOrders || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-slate-600 text-sm mb-2">Total Products</p>
          <p className="text-3xl font-bold">{stats.totalProducts || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-slate-600 text-sm mb-2">Total Users</p>
          <p className="text-3xl font-bold">{stats.totalUsers || 0}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Order ID</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Total</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders?.map((order: any) => (
                <tr key={order._id} className="border-b">
                  <td className="py-3 px-4 text-sm">{order._id}</td>
                  <td className="py-3 px-4 text-sm">{order.user?.name || 'N/A'}</td>
                  <td className="py-3 px-4 text-sm">${order.totalPrice.toFixed(2)}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className="px-2 py-1 rounded-full text-xs bg-slate-100">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
