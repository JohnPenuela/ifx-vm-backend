<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('virtual_machines', function (Blueprint $table) {
            $table->id();
            $table->string('name', 60)->index();
            $table->unsignedSmallInteger('cores');
            $table->unsignedInteger('ram'); // RAM en Gigabytes (GB)
            $table->unsignedInteger('disk'); // Disco en Gigabytes (GB)
            $table->string('os', 60);
            $table->enum('status', ['Activa', 'Apagada', 'Mantenimiento'])->default('Apagada');
            $table->string('ip_address', 45)->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('virtual_machines');
    }
};
