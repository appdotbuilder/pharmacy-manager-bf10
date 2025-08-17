<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Drug;
use App\Models\Sale;
use App\Models\Supplier;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        // Calculate dashboard statistics
        $todaySales = Sale::whereDate('sale_date', today())
            ->where('status', 'completed')
            ->sum('total_amount');

        $monthlySales = Sale::whereMonth('sale_date', now()->month)
            ->whereYear('sale_date', now()->year)
            ->where('status', 'completed')
            ->sum('total_amount');

        $totalDrugs = Drug::active()->count();
        $lowStockCount = Drug::active()->lowStock()->count();
        $expiredDrugsCount = Drug::active()->expired()->count();

        // Calculate monthly profit (simplified - revenue minus cost)
        $monthlyCost = Sale::whereMonth('sale_date', now()->month)
            ->whereYear('sale_date', now()->year)
            ->where('status', 'completed')
            ->with('items.drug')
            ->get()
            ->sum(function ($sale) {
                return $sale->items->sum(function ($item) {
                    return $item->quantity * $item->drug->cost_price;
                });
            });

        $monthlyProfit = $monthlySales - $monthlyCost;

        $stats = [
            'todaySales' => $todaySales,
            'monthlySales' => $monthlySales,
            'totalDrugs' => $totalDrugs,
            'lowStockCount' => $lowStockCount,
            'expiredDrugsCount' => $expiredDrugsCount,
            'monthlyProfit' => $monthlyProfit,
        ];
        
        return Inertia::render('dashboard', [
            'stats' => $stats
        ]);
    }
}