<?php

namespace Database\Factories;

use App\Enums\InquiryStatus;
use App\Models\ContactInquiry;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ContactInquiry>
 */
class ContactInquiryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'company' => fake()->optional()->company(),
            'product_interest' => fake()->optional()->randomElement([
                'coffee',
                'sesame',
                'niger',
                'mung',
                'soya',
                'peanuts',
                'castor',
                'polymer',
                'vehicles',
                'other',
            ]),
            'message' => fake()->paragraphs(2, true),
            'status' => InquiryStatus::New,
            'source' => 'website',
        ];
    }
}
