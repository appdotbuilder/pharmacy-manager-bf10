import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Drug {
    id: number;
    name: string;
    generic_name: string | null;
    batch_number: string;
    cost_price: number;
    selling_price: number;
    stock_quantity: number;
    minimum_stock_level: number;
    expiry_date: string;
    status: string;
    is_low_stock: boolean;
    is_expired: boolean;
}

interface PaginationData {
    data: Drug[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    drugs: PaginationData;
    [key: string]: unknown;
}

export default function DrugsIndex({ drugs }: Props) {
    const getStockStatus = (drug: Drug) => {
        if (drug.stock_quantity === 0) {
            return { label: 'Out of Stock', className: 'bg-red-100 text-red-800' };
        } else if (drug.is_low_stock) {
            return { label: 'Low Stock', className: 'bg-yellow-100 text-yellow-800' };
        } else {
            return { label: 'In Stock', className: 'bg-green-100 text-green-800' };
        }
    };

    return (
        <AppShell>
            <Head title="Drug Inventory - PharmaCare" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">💊 Drug Inventory</h1>
                        <p className="text-gray-600 mt-1">Manage your pharmacy's drug stock and inventory</p>
                    </div>
                    
                    <div className="flex space-x-3">
                        <Link href="/drugs/create">
                            <Button>
                                ➕ Add New Drug
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border">
                        <div className="text-2xl font-bold text-blue-600">{drugs.total}</div>
                        <div className="text-sm text-gray-600">Total Drugs</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border">
                        <div className="text-2xl font-bold text-green-600">
                            {drugs.data.filter(drug => drug.stock_quantity > drug.minimum_stock_level).length}
                        </div>
                        <div className="text-sm text-gray-600">In Stock</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border">
                        <div className="text-2xl font-bold text-yellow-600">
                            {drugs.data.filter(drug => drug.is_low_stock).length}
                        </div>
                        <div className="text-sm text-gray-600">Low Stock</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border">
                        <div className="text-2xl font-bold text-red-600">
                            {drugs.data.filter(drug => drug.is_expired).length}
                        </div>
                        <div className="text-sm text-gray-600">Expired</div>
                    </div>
                </div>

                {/* Drugs Table */}
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Drug Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Batch & Expiry
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Pricing
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Stock Status
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {drugs.data.map((drug) => {
                                    const stockStatus = getStockStatus(drug);
                                    
                                    return (
                                        <tr key={drug.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{drug.name}</div>
                                                    {drug.generic_name && (
                                                        <div className="text-sm text-gray-500">{drug.generic_name}</div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">{drug.batch_number}</div>
                                                <div className={`text-sm ${drug.is_expired ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                                                    Exp: {new Date(drug.expiry_date).toLocaleDateString()}
                                                    {drug.is_expired && ' (Expired)'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">Cost: ₦{drug.cost_price}</div>
                                                <div className="text-sm font-semibold text-green-600">Sell: ₦{drug.selling_price}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stockStatus.className}`}>
                                                        {stockStatus.label}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    {drug.stock_quantity} / {drug.minimum_stock_level} min
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                                                <Link href={`/drugs/${drug.id}`}>
                                                    <Button variant="ghost" size="sm">
                                                        View
                                                    </Button>
                                                </Link>
                                                <Link href={`/drugs/${drug.id}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        Edit
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination */}
                    {drugs.last_page > 1 && (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="flex-1 flex justify-between sm:hidden">
                                {drugs.current_page > 1 && (
                                    <Link href={`/drugs?page=${drugs.current_page - 1}`}>
                                        <Button variant="outline">Previous</Button>
                                    </Link>
                                )}
                                {drugs.current_page < drugs.last_page && (
                                    <Link href={`/drugs?page=${drugs.current_page + 1}`}>
                                        <Button variant="outline">Next</Button>
                                    </Link>
                                )}
                            </div>
                            
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{((drugs.current_page - 1) * drugs.per_page) + 1}</span> to{' '}
                                        <span className="font-medium">
                                            {Math.min(drugs.current_page * drugs.per_page, drugs.total)}
                                        </span> of{' '}
                                        <span className="font-medium">{drugs.total}</span> results
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    {drugs.current_page > 1 && (
                                        <Link href={`/drugs?page=${drugs.current_page - 1}`}>
                                            <Button variant="outline" size="sm">Previous</Button>
                                        </Link>
                                    )}
                                    {drugs.current_page < drugs.last_page && (
                                        <Link href={`/drugs?page=${drugs.current_page + 1}`}>
                                            <Button variant="outline" size="sm">Next</Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}