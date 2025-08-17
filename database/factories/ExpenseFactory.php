<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['utilities', 'rent', 'salaries', 'maintenance', 'supplies', 'other'];
        
        return [
            'description' => fake()->sentence(),
            'amount' => fake()->randomFloat(2, 1000, 50000),
            'expense_date' => fake()->dateTimeBetween('-3 months', 'now'),
            'category' => fake()->randomElement($categories),
            'notes' => fake()->optional()->paragraph(),
        ];
    }
}