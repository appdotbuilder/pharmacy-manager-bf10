<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Drug>
 */
class DrugFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $drugNames = [
            'Paracetamol', 'Ibuprofen', 'Aspirin', 'Amoxicillin', 'Cough Syrup',
            'Vitamin C', 'Multivitamins', 'Iron Tablets', 'Calcium Tablets',
            'Eye Drops', 'Antiseptic Cream', 'Bandages', 'Glucose', 'ORS',
            'Panadol', 'Flagyl', 'Chloroquine', 'Vitamin B Complex'
        ];

        $costPrice = fake()->randomFloat(2, 50, 2000);
        $markupPercentage = fake()->numberBetween(20, 80) / 100; // 20% to 80% markup
        $sellingPrice = round($costPrice * (1 + $markupPercentage), 2);

        return [
            'name' => fake()->randomElement($drugNames),
            'generic_name' => fake()->optional()->words(2, true),
            'batch_number' => 'BTH-' . fake()->unique()->numerify('######'),
            'expiry_date' => fake()->dateTimeBetween('+3 months', '+3 years'),
            'cost_price' => $costPrice,
            'selling_price' => $sellingPrice,
            'stock_quantity' => fake()->numberBetween(0, 500),
            'minimum_stock_level' => fake()->numberBetween(10, 50),
            'description' => fake()->optional()->sentence(),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the drug has low stock.
     */
    public function lowStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock_quantity' => fake()->numberBetween(1, 5),
            'minimum_stock_level' => fake()->numberBetween(10, 20),
        ]);
    }

    /**
     * Indicate that the drug is expired.
     */
    public function expired(): static
    {
        return $this->state(fn (array $attributes) => [
            'expiry_date' => fake()->dateTimeBetween('-1 year', 'now'),
        ]);
    }
}