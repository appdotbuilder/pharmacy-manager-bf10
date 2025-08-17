import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <>
            <Head title="PharmaCare - Pharmacy Management System" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header */}
                <header className="px-6 py-4 border-b bg-white/80 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">💊</span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">PharmaCare</h1>
                        </div>
                        
                        <div className="space-x-4">
                            <Link href="/login">
                                <Button variant="ghost">Login</Button>
                            </Link>
                            <Link href="/register">
                                <Button>Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="max-w-7xl mx-auto px-6 py-16">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            💊 Professional Pharmacy 
                            <span className="text-blue-600"> Management System</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Streamline your pharmacy operations with our comprehensive management solution. 
                            Handle sales, inventory, purchases, and reporting all in one place.
                        </p>
                        
                        <div className="flex justify-center space-x-4">
                            <Link href="/register">
                                <Button size="lg" className="px-8 py-3 text-lg">
                                    Start Managing Your Pharmacy
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        <div className="bg-white rounded-xl p-6 shadow-sm border">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">🛒</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Point of Sale</h3>
                            <p className="text-gray-600">Fast and efficient drug sales with automatic stock deduction and receipt printing.</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">📦</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Inventory Management</h3>
                            <p className="text-gray-600">Track stock levels, expiry dates, and get low stock notifications.</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">🏪</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Purchase Management</h3>
                            <p className="text-gray-600">Record purchases from suppliers with automatic stock updates.</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Reports</h3>
                            <p className="text-gray-600">Sales, profit/loss, cash flow, and expense reports for better insights.</p>
                        </div>
                    </div>

                    {/* Key Features */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border mb-16">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Everything You Need</h2>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">💰 Sales & POS Features</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Quick drug search and selection</li>
                                    <li>• Multiple payment methods (cash, card, mobile)</li>
                                    <li>• Discount management</li>
                                    <li>• Automatic receipt generation</li>
                                    <li>• Customer management</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">📈 Management Features</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Supplier relationship management</li>
                                    <li>• Expense tracking</li>
                                    <li>• User roles and permissions</li>
                                    <li>• Store settings and configuration</li>
                                    <li>• Comprehensive reporting suite</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Intuitive Dashboard</h2>
                        <p className="text-gray-600 mb-8">Get a complete overview of your pharmacy operations at a glance</p>
                        
                        <div className="bg-gray-100 rounded-2xl p-8 border-2 border-dashed border-gray-300">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <div className="text-2xl font-bold text-green-600">₦2,450,000</div>
                                    <div className="text-sm text-gray-600">Monthly Sales</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <div className="text-2xl font-bold text-blue-600">1,234</div>
                                    <div className="text-sm text-gray-600">Drugs in Stock</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <div className="text-2xl font-bold text-orange-600">23</div>
                                    <div className="text-sm text-gray-600">Low Stock Items</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <div className="text-2xl font-bold text-purple-600">₦180,500</div>
                                    <div className="text-sm text-gray-600">Monthly Profit</div>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm">📱 Dashboard preview - Real data shown after login</p>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white">
                        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Pharmacy?</h2>
                        <p className="text-xl opacity-90 mb-8">
                            Join hundreds of pharmacies already using PharmaCare to streamline their operations
                        </p>
                        
                        <div className="flex justify-center space-x-4">
                            <Link href="/register">
                                <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
                                    Start Free Trial
                                </Button>
                            </Link>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white border-t mt-16">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">💊</span>
                                </div>
                                <span className="font-semibold text-gray-900">PharmaCare</span>
                            </div>
                            
                            <div className="text-sm text-gray-600">
                                © 2024 PharmaCare. Professional Pharmacy Management.
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}