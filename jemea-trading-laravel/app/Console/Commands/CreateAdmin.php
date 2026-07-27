<?php

namespace App\Console\Commands;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class CreateAdmin extends Command
{
    protected $signature = 'admin:create
                            {--name= : Administrator name}
                            {--email= : Administrator email address}';

    protected $description = 'Create an active administrator account using an interactive password prompt';

    public function handle(): int
    {
        if (! $this->input->isInteractive()) {
            $this->components->error('The admin:create command requires an interactive terminal so the password is not exposed.');

            return self::FAILURE;
        }

        $name = trim((string) ($this->option('name') ?: $this->ask('Administrator name')));
        $email = mb_strtolower(trim((string) ($this->option('email') ?: $this->ask('Administrator email'))));
        $password = (string) $this->secret('Password');
        $passwordConfirmation = (string) $this->secret('Confirm password');

        $validator = Validator::make(
            compact('name', 'email', 'password', 'passwordConfirmation'),
            [
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'email', 'max:255', 'unique:users,email'],
                'password' => ['required', Password::defaults(), 'same:passwordConfirmation'],
            ],
            ['password.same' => 'The password confirmation does not match.'],
        );

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                $this->components->error($error);
            }

            return self::FAILURE;
        }

        $user = User::forceCreate([
            'name' => $name,
            'email' => $email,
            'email_verified_at' => now(),
            'password' => Hash::make($password),
            'role' => UserRole::Admin,
            'is_active' => true,
        ]);

        $this->components->info("Administrator {$user->email} created.");

        return self::SUCCESS;
    }
}
