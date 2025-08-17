import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface DashboardStats {
    todaySales: number;
    monthlySales: number;
    totalDrugs: number;
    lowStockCount: number;
    expiredDrugsCount: number;
    monthlyProfit: number;
    [key: string]: unknown;
}

export default function Dashboard({ stats }: { stats: DashboardStats }) {
    return (
        <AppShell>
            <Head title="Dashboard - PharmaCare" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">💊 Pharmacy Dashboard</h1>
                        <p className="text-gray-600 mt-1">Welcome back! Here's your pharmacy overview</p>
                    </div>
                    
                    <div className="flex space-x-3">
                        <Link href="/pos">
                            <Button size="lg" className="px-6">
                                🛒 New Sale
                            </Button>
                        </Link>
                        <Link href="/drugs/create">
                            <Button variant="outline" size="lg">
                                ➕ Add Drug
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Today's Sales</p>
                                <p className="text-2xl font-bold text-green-600">
                                    ₦{stats?.todaySales?.toLocaleString() || '0'}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">💰</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Monthly Sales</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    ₦{stats?.monthlySales?.toLocaleString() || '0'}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📈</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Drugs in Stock</p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {stats?.totalDrugs?.toLocaleString() || '0'}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">💊</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Monthly Profit</p>
                                <p className="text-2xl font-bold text-emerald-600">
                                    ₦{stats?.monthlyProfit?.toLocaleString() || '0'}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">💵</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Alert Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stats?.lowStockCount > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">⚠️</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-yellow-800">Low Stock Alert</h3>
                                        <p className="text-yellow-700">{stats.lowStockCount} drugs need restocking</p>
                                    </div>
                                </div>
                                <Link href="/drugs?filter=low_stock">
                                    <Button variant="outline" size="sm">View Items</Button>
                                </Link>
                            </div>
                        </div>
                    )}

                    {stats?.expiredDrugsCount > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">🚨</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-red-800">Expired Drugs</h3>
                                        <p className="text-red-700">{stats.expiredDrugsCount} drugs have expired</p>
                                    </div>
                                </div>
                                <Link href="/drugs?filter=expired">
                                    <Button variant="outline" size="sm">View Items</Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🛒</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Point of Sale</h3>
                            <p className="text-gray-600 mb-4">Process new drug sales and transactions</p>
                            <Link href="/pos">
                                <Button className="w-full">Start New Sale</Button>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">📦</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Inventory</h3>
                            <p className="text-gray-600 mb-4">Manage drug stock and inventory</p>
                            <Link href="/drugs">
                                <Button variant="outline" className="w-full">View Inventory</Button>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">📊</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reports</h3>
                            <p className="text-gray-600 mb-4">View sales and financial reports</p>
                            <Link href="/reports">
                                <Button variant="outline" className="w-full">View Reports</Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Access</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        <Link href="/drugs">
                            <Button variant="ghost" className="w-full justify-start">
                                💊 Drugs
                            </Button>
                        </Link>
                        <Link href="/customers">
                            <Button variant="ghost" className="w-full justify-start">
                                👥 Customers
                            </Button>
                        </Link>
                        <Link href="/suppliers">
                            <Button variant="ghost" className="w-full justify-start">
                                🏪 Suppliers
                            </Button>
                        </Link>
                        <Link href="/purchases">
                            <Button variant="ghost" className="w-full justify-start">
                                🛍️ Purchases
                            </Button>
                        </Link>
                        <Link href="/expenses">
                            <Button variant="ghost" className="w-full justify-start">
                                💸 Expenses
                            </Button>
                        </Link>
                        <Link href="/settings">
                            <Button variant="ghost" className="w-full justify-start">
                                ⚙️ Settings
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}