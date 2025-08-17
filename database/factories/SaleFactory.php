<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 100, 5000);
        $discountAmount = fake()->randomFloat(2, 0, $subtotal * 0.2); // Up to 20% discount
        $totalAmount = $subtotal - $discountAmount;

        return [
            'receipt_number' => 'RCP-' . fake()->unique()->numerify('########'),
            'customer_id' => fake()->optional()->randomElement(Customer::pluck('id')->toArray()),
            'user_id' => fake()->randomElement(User::pluck('id')->toArray()),
            'subtotal' => $subtotal,
            'discount_amount' => $discountAmount,
            'total_amount' => $totalAmount,
            'payment_method' => fake()->randomElement(['cash', 'card', 'mobile']),
            'status' => 'completed',
            'sale_date' => fake()->dateTimeBetween('-1 month', 'now'),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}