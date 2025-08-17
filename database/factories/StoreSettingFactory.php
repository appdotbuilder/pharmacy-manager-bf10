<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StoreSetting>
 */
class StoreSettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'store_name' => fake()->company() . ' Pharmacy',
            'address' => fake()->address(),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->safeEmail(),
            'license_number' => 'PCN-' . fake()->numerify('######'),
            'tax_number' => 'VAT-' . fake()->numerify('######'),
            'receipt_footer' => 'Thank you for your business. Get well soon!',
        ];
    }
}