<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\VirtualMachine;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@ifxcorp.com'],
            [
                'name' => 'Administrador Cloud IFX',
                'password' => Hash::make('Admin2026*!'),
                'role' => 'Administrador',
            ]
        );

        User::updateOrCreate(
            ['email' => 'cliente@ifxcorp.com'],
            [
                'name' => 'Cliente Corporativo IFX',
                'password' => Hash::make('Cliente2026*!'),
                'role' => 'Cliente',
            ]
        );

        $initialVms = [
            [
                'name' => 'srv-prod-db01',
                'cores' => 16,
                'ram' => 64,
                'disk' => 500,
                'os' => 'Ubuntu 22.04 LTS',
                'status' => 'Activa',
                'ip_address' => '10.20.1.15',
                'description' => 'Cluster de base de datos principal PostgreSQL en producción',
            ],
            [
                'name' => 'srv-k8s-master',
                'cores' => 8,
                'ram' => 32,
                'disk' => 200,
                'os' => 'Debian 12',
                'status' => 'Activa',
                'ip_address' => '10.20.1.20',
                'description' => 'Plano de control Kubernetes master para orquestación de microservicios',
            ],
            [
                'name' => 'srv-k8s-worker01',
                'cores' => 12,
                'ram' => 48,
                'disk' => 300,
                'os' => 'Debian 12',
                'status' => 'Activa',
                'ip_address' => '10.20.1.21',
                'description' => 'Nodo de cómputo para cargas de trabajo críticas',
            ],
            [
                'name' => 'srv-win-ad01',
                'cores' => 4,
                'ram' => 16,
                'disk' => 150,
                'os' => 'Windows Server 2022',
                'status' => 'Activa',
                'ip_address' => '10.20.1.5',
                'description' => 'Controlador de dominio Active Directory y LDAP corporativo',
            ],
            [
                'name' => 'srv-backup-storage',
                'cores' => 4,
                'ram' => 16,
                'disk' => 2000,
                'os' => 'Rocky Linux 9',
                'status' => 'Apagada',
                'ip_address' => '10.20.1.99',
                'description' => 'Almacenamiento de snapshots fuera de horario pico',
            ],
            [
                'name' => 'srv-qa-gateway',
                'cores' => 2,
                'ram' => 8,
                'disk' => 80,
                'os' => 'Ubuntu 22.04 LTS',
                'status' => 'Activa',
                'ip_address' => '10.20.2.10',
                'description' => 'Proxy inverso Nginx para ambientes de homologación',
            ],
            [
                'name' => 'srv-legacy-erp',
                'cores' => 8,
                'ram' => 32,
                'disk' => 400,
                'os' => 'CentOS Stream 9',
                'status' => 'Mantenimiento',
                'ip_address' => '10.20.1.50',
                'description' => 'Migración programada de módulos contables hacia SAP',
            ],
            [
                'name' => 'srv-monitor-elk',
                'cores' => 8,
                'ram' => 32,
                'disk' => 600,
                'os' => 'Ubuntu 22.04 LTS',
                'status' => 'Activa',
                'ip_address' => '10.20.1.75',
                'description' => 'Stack de observabilidad Elasticsearch, Logstash y Kibana',
            ],
        ];

        foreach ($initialVms as $vmData) {
            VirtualMachine::updateOrCreate(
                ['name' => $vmData['name']],
                $vmData
            );
        }
    }
}