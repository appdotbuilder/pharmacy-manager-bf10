<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Supplier>
 */
class SupplierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $companyNames = [
            'MedPharm Ltd', 'HealthCare Distributors', 'Pharma Supplies Co.',
            'Medical Wholesale', 'DrugMart Suppliers', 'Wellness Distribution',
            'Premier Pharmaceuticals', 'Global Health Supplies', 'MediCore Ltd',
            'PharmaTrade Nigeria', 'Unity Medical Supplies'
        ];

        return [
            'name' => fake()->randomElement($companyNames),
            'contact_person' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}