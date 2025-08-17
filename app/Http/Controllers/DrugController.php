<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDrugRequest;
use App\Http\Requests\UpdateDrugRequest;
use App\Models\Drug;
use Inertia\Inertia;

class DrugController extends Controller
{
    /**
     * Display a listing of the drugs.
     */
    public function index()
    {
        $drugs = Drug::with(['purchaseItems', 'saleItems'])
            ->latest()
            ->paginate(15);
        
        return Inertia::render('drugs/index', [
            'drugs' => $drugs
        ]);
    }

    /**
     * Show the form for creating a new drug.
     */
    public function create()
    {
        return Inertia::render('drugs/create');
    }

    /**
     * Store a newly created drug.
     */
    public function store(StoreDrugRequest $request)
    {
        $drug = Drug::create($request->validated());

        return redirect()->route('drugs.show', $drug)
            ->with('success', 'Drug added successfully.');
    }

    /**
     * Display the specified drug.
     */
    public function show(Drug $drug)
    {
        $drug->load(['purchaseItems.purchase.supplier', 'saleItems.sale']);
        
        return Inertia::render('drugs/show', [
            'drug' => $drug
        ]);
    }

    /**
     * Show the form for editing the drug.
     */
    public function edit(Drug $drug)
    {
        return Inertia::render('drugs/edit', [
            'drug' => $drug
        ]);
    }

    /**
     * Update the specified drug.
     */
    public function update(UpdateDrugRequest $request, Drug $drug)
    {
        $drug->update($request->validated());

        return redirect()->route('drugs.show', $drug)
            ->with('success', 'Drug updated successfully.');
    }

    /**
     * Remove the specified drug.
     */
    public function destroy(Drug $drug)
    {
        $drug->delete();

        return redirect()->route('drugs.index')
            ->with('success', 'Drug deleted successfully.');
    }
}