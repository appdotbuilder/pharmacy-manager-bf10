<?php

namespace Database\Factories;

use App\Models\Drug;
use App\Models\Purchase;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PurchaseItem>
 */
class PurchaseItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $quantity = fake()->numberBetween(10, 100);
        $unitCost = fake()->randomFloat(2, 50, 1000);
        $totalCost = $quantity * $unitCost;

        return [
            'purchase_id' => Purchase::factory(),
            'drug_id' => Drug::factory(),
            'quantity' => $quantity,
            'unit_cost' => $unitCost,
            'total_cost' => $totalCost,
        ];
    }
}