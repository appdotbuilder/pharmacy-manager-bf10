<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Drug;
use App\Models\StoreSetting;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Pharmacy Admin',
            'email' => 'admin@pharmacare.com',
        ]);

        // Create additional users
        User::factory()->create([
            'name' => 'Cashier',
            'email' => 'cashier@pharmacare.com',
        ]);

        // Create store settings
        StoreSetting::create([
            'store_name' => 'PharmaCare Pharmacy',
            'address' => '123 Health Street, Medical District, Lagos, Nigeria',
            'phone' => '+234 901 234 5678',
            'email' => 'info@pharmacare.com',
            'license_number' => 'PCN-12345',
            'tax_number' => 'VAT-67890',
            'receipt_footer' => 'Thank you for choosing PharmaCare. Get well soon!',
        ]);

        // Create suppliers
        Supplier::factory(10)->create();

        // Create customers
        Customer::factory(50)->create();

        // Create drugs with various stock levels
        Drug::factory(100)->create();
        Drug::factory(15)->lowStock()->create();
        Drug::factory(8)->expired()->create();
    }
}
