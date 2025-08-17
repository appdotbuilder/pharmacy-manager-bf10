<?php

namespace Database\Factories;

use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Purchase>
 */
class PurchaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'reference_number' => 'PUR-' . fake()->unique()->numerify('########'),
            'supplier_id' => Supplier::factory(),
            'purchase_date' => fake()->dateTimeBetween('-2 months', 'now'),
            'total_amount' => fake()->randomFloat(2, 10000, 100000),
            'status' => fake()->randomElement(['pending', 'received', 'cancelled']),
            'notes' => fake()->optional()->paragraph(),
        ];
    }
}