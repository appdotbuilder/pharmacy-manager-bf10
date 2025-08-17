<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSaleRequest;
use App\Models\Customer;
use App\Models\Drug;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PosController extends Controller
{
    /**
     * Display the POS interface.
     */
    public function index()
    {
        $drugs = Drug::active()->where('stock_quantity', '>', 0)->get();
        $customers = Customer::active()->get();
        
        return Inertia::render('pos/index', [
            'drugs' => $drugs,
            'customers' => $customers
        ]);
    }

    /**
     * Process a sale transaction.
     */
    public function store(StoreSaleRequest $request)
    {
        try {
            DB::beginTransaction();

            // Generate receipt number
            $receiptNumber = 'RCP-' . date('Ymd') . '-' . str_pad((string)(Sale::whereDate('created_at', today())->count() + 1), 4, '0', STR_PAD_LEFT);

            // Create sale record
            $sale = Sale::create([
                'receipt_number' => $receiptNumber,
                'customer_id' => $request->customer_id,
                'user_id' => auth()->id(),
                'subtotal' => $request->subtotal,
                'discount_amount' => $request->discount_amount ?? 0,
                'total_amount' => $request->total_amount,
                'payment_method' => $request->payment_method,
                'sale_date' => now(),
                'notes' => $request->notes,
            ]);

            // Process sale items and update stock
            foreach ($request->items as $item) {
                $drug = Drug::findOrFail($item['drug_id']);
                
                // Check stock availability
                if ($drug->stock_quantity < $item['quantity']) {
                    throw new \Exception("Insufficient stock for {$drug->name}. Available: {$drug->stock_quantity}");
                }

                // Create sale item
                SaleItem::create([
                    'sale_id' => $sale->id,
                    'drug_id' => $item['drug_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total_price' => $item['total_price'],
                ]);

                // Update drug stock
                $drug->decrement('stock_quantity', $item['quantity']);
            }

            DB::commit();

            return redirect()->route('pos.receipt', $sale->id)
                ->with('success', 'Sale completed successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display sale receipt.
     */
    public function show(Sale $sale)
    {
        $sale->load(['customer', 'items.drug', 'user']);
        
        return Inertia::render('pos/receipt', [
            'sale' => $sale
        ]);
    }


}