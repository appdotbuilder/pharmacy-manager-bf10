<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDrugRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'generic_name' => 'nullable|string|max:255',
            'batch_number' => 'required|string|max:255|unique:drugs,batch_number',
            'expiry_date' => 'required|date|after:today',
            'cost_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0|gt:cost_price',
            'stock_quantity' => 'required|integer|min:0',
            'minimum_stock_level' => 'required|integer|min:1',
            'description' => 'nullable|string|max:1000',
            'status' => 'required|in:active,inactive',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Drug name is required.',
            'batch_number.required' => 'Batch number is required.',
            'batch_number.unique' => 'This batch number already exists.',
            'expiry_date.required' => 'Expiry date is required.',
            'expiry_date.after' => 'Expiry date must be in the future.',
            'cost_price.required' => 'Cost price is required.',
            'selling_price.required' => 'Selling price is required.',
            'selling_price.gt' => 'Selling price must be greater than cost price.',
            'stock_quantity.required' => 'Stock quantity is required.',
            'minimum_stock_level.required' => 'Minimum stock level is required.',
        ];
    }
}