import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Drug {
    id: number;
    name: string;
    generic_name: string | null;
    batch_number: string;
    selling_price: number;
    stock_quantity: number;
    expiry_date: string;
}

interface Customer {
    id: number;
    name: string;
    phone: string | null;
    email: string | null;
}

interface CartItem {
    drug_id: number;
    drug: Drug;
    quantity: number;
    unit_price: number;
    total_price: number;
}



interface Props {
    drugs: Drug[];
    customers: Customer[];
    [key: string]: unknown;
}

export default function PosIndex({ drugs, customers }: Props) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
    const [discountAmount, setDiscountAmount] = useState(0);
    
    const { data, setData, post, processing } = useForm({
        customer_id: null as number | null,
        subtotal: 0,
        discount_amount: 0,
        total_amount: 0,
        payment_method: 'cash' as 'cash' | 'card' | 'mobile',
        notes: '',
        items: [] as Array<{
            drug_id: number;
            quantity: number;
            unit_price: number;
            total_price: number;
        }>
    });

    const filteredDrugs = drugs.filter(drug =>
        drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (drug.generic_name && drug.generic_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        drug.batch_number.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addToCart = (drug: Drug) => {
        const existingItem = cart.find(item => item.drug_id === drug.id);
        
        if (existingItem) {
            if (existingItem.quantity < drug.stock_quantity) {
                updateQuantity(drug.id, existingItem.quantity + 1);
            }
        } else {
            const newItem: CartItem = {
                drug_id: drug.id,
                drug: drug,
                quantity: 1,
                unit_price: drug.selling_price,
                total_price: drug.selling_price
            };
            setCart([...cart, newItem]);
        }
    };

    const updateQuantity = (drugId: number, newQuantity: number) => {
        if (newQuantity === 0) {
            removeFromCart(drugId);
            return;
        }

        setCart(cart.map(item => 
            item.drug_id === drugId 
                ? { ...item, quantity: newQuantity, total_price: item.unit_price * newQuantity }
                : item
        ));
    };

    const removeFromCart = (drugId: number) => {
        setCart(cart.filter(item => item.drug_id !== drugId));
    };

    const subtotal = cart.reduce((sum, item) => sum + item.total_price, 0);
    const total = subtotal - discountAmount;

    const handleCheckout = () => {
        setData({
            customer_id: selectedCustomer,
            subtotal: subtotal,
            discount_amount: discountAmount,
            total_amount: total,
            payment_method: data.payment_method,
            notes: data.notes,
            items: cart.map(item => ({
                drug_id: item.drug_id,
                quantity: item.quantity,
                unit_price: item.unit_price,
                total_price: item.total_price
            }))
        });
        
        post(route('pos.store'), {
            onSuccess: () => {
                setCart([]);
                setSelectedCustomer(null);
                setDiscountAmount(0);
            }
        });
    };

    return (
        <AppShell>
            <Head title="Point of Sale - PharmaCare" />
            
            <div className="flex gap-6 h-full">
                {/* Left Panel - Drug Search & Selection */}
                <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">🛒 Point of Sale</h2>
                        
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search drugs by name, generic name, or batch number..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <span className="absolute right-3 top-3 text-gray-400">🔍</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                        {filteredDrugs.map(drug => (
                            <div key={drug.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-gray-900 text-sm">{drug.name}</h3>
                                    <span className="text-lg font-bold text-green-600">₦{drug.selling_price}</span>
                                </div>
                                
                                {drug.generic_name && (
                                    <p className="text-xs text-gray-600 mb-1">{drug.generic_name}</p>
                                )}
                                
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs text-gray-500">Batch: {drug.batch_number}</span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        drug.stock_quantity > 10 
                                            ? 'bg-green-100 text-green-800' 
                                            : drug.stock_quantity > 0
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        Stock: {drug.stock_quantity}
                                    </span>
                                </div>
                                
                                <Button 
                                    onClick={() => addToCart(drug)}
                                    disabled={drug.stock_quantity === 0}
                                    size="sm"
                                    className="w-full"
                                >
                                    {drug.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel - Cart & Checkout */}
                <div className="w-96 bg-white rounded-xl p-6 shadow-sm border">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🛍️ Cart ({cart.length})</h3>
                    
                    {cart.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No items in cart</p>
                            <p className="text-sm text-gray-400 mt-2">Search and add drugs to get started</p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                                {cart.map(item => (
                                    <div key={item.drug_id} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-sm">{item.drug.name}</h4>
                                            <p className="text-xs text-gray-500">₦{item.unit_price} each</p>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => updateQuantity(item.drug_id, item.quantity - 1)}
                                                className="w-8 h-8 p-0"
                                            >
                                                -
                                            </Button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => updateQuantity(item.drug_id, item.quantity + 1)}
                                                disabled={item.quantity >= item.drug.stock_quantity}
                                                className="w-8 h-8 p-0"
                                            >
                                                +
                                            </Button>
                                        </div>
                                        
                                        <div className="text-right ml-3">
                                            <p className="font-semibold text-sm">₦{item.total_price}</p>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => removeFromCart(item.drug_id)}
                                                className="text-red-600 hover:text-red-700 p-0"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Customer Selection */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Customer (Optional)</label>
                                <select
                                    value={selectedCustomer || ''}
                                    onChange={(e) => setSelectedCustomer(e.target.value ? Number(e.target.value) : null)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Walk-in Customer</option>
                                    {customers.map(customer => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name} {customer.phone && `(${customer.phone})`}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Discount */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Amount</label>
                                <input
                                    type="number"
                                    min="0"
                                    max={subtotal}
                                    value={discountAmount}
                                    onChange={(e) => setDiscountAmount(Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="0"
                                />
                            </div>

                            {/* Payment Method */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                                <select
                                    value={data.payment_method}
                                    onChange={(e) => setData('payment_method', e.target.value as 'cash' | 'card' | 'mobile')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="cash">💵 Cash</option>
                                    <option value="card">💳 Card</option>
                                    <option value="mobile">📱 Mobile Payment</option>
                                </select>
                            </div>

                            {/* Totals */}
                            <div className="space-y-2 pt-4 border-t border-gray-200">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal:</span>
                                    <span>₦{subtotal.toLocaleString()}</span>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="flex justify-between text-sm text-red-600">
                                        <span>Discount:</span>
                                        <span>-₦{discountAmount.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                                    <span>Total:</span>
                                    <span>₦{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <Button
                                onClick={handleCheckout}
                                disabled={processing || cart.length === 0}
                                className="w-full mt-4"
                                size="lg"
                            >
                                {processing ? 'Processing...' : 'Complete Sale'}
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </AppShell>
    );
}