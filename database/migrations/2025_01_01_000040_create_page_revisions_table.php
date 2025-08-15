<?php
use Illuminate\Database\Migrations\Migration; use Illuminate\Database\Schema\Blueprint; use Illuminate\Support\Facades\Schema;
return new class extends Migration { public function up(): void { Schema::create('page_revisions', function (Blueprint $table) { $table->id(); $table->foreignId('page_id')->constrained('pages')->cascadeOnDelete(); $table->foreignId('client_id')->constrained('users')->cascadeOnDelete(); $table->json('revision_data')->nullable(); $table->timestamps(); }); } public function down(): void { Schema::dropIfExists('page_revisions'); } };

