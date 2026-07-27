<?php

namespace App\Policies;

use App\Models\ContactInquiry;
use App\Models\User;

class ContactInquiryPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->canAccessAdmin();
    }

    public function view(User $user, ContactInquiry $contactInquiry): bool
    {
        return $user->canAccessAdmin();
    }

    public function update(User $user, ContactInquiry $contactInquiry): bool
    {
        return $user->canAccessAdmin();
    }

    public function delete(User $user, ContactInquiry $contactInquiry): bool
    {
        return $user->canAccessAdmin();
    }
}
