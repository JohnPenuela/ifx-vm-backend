<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVmRequest;
use App\Http\Requests\UpdateVmRequest;
use App\Models\VirtualMachine;
use App\Services\WebSocketBroadcaster;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VmController extends Controller
{
    public function __construct(
        private readonly WebSocketBroadcaster $broadcaster
    ) {}

    public function index(Request $request): JsonResponse
    {
        $query = VirtualMachine::query();

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('os', 'like', "%{$search}%")
                  ->orWhere('ip_address', 'like', "%{$search}%");
            });
        }

        $vms = $query->orderBy('id', 'desc')->get();

        return response()->json([
            'data' => $vms,
            'stats' => $this->calculateStats()
        ], Response::HTTP_OK);
    }

    public function stats(): JsonResponse
    {
        return response()->json($this->calculateStats(), Response::HTTP_OK);
    }

    public function store(StoreVmRequest $request): JsonResponse
    {
        $data = $request->validated();

        // Generar IP realista si no se proporcionÃ³
        if (empty($data['ip_address'])) {
            $data['ip_address'] = '10.20.' . rand(1, 5) . '.' . rand(10, 250);
        }

        $vm = VirtualMachine::create($data);

        // Notificar en tiempo real a todos los clientes conectados
        $this->broadcaster->broadcast('vm:created', [
            'vm' => $vm,
            'stats' => $this->calculateStats(),
            'message' => "Se ha desplegado la mÃ¡quina virtual {$vm->name}"
        ]);

        return response()->json([
            'message' => 'MÃ¡quina virtual desplegada con Ã©xito.',
            'data' => $vm,
            'stats' => $this->calculateStats()
        ], Response::HTTP_CREATED);
    }

    public function show(int $id): JsonResponse
    {
        $vm = VirtualMachine::findOrFail($id);

        return response()->json(['data' => $vm], Response::HTTP_OK);
    }

    public function update(UpdateVmRequest $request, int $id): JsonResponse
    {
        $vm = VirtualMachine::findOrFail($id);
        $previousStatus = $vm->status;

        $vm->update($request->validated());

        // Emitir evento si cambiÃ³ el estado o configuraciÃ³n
        $this->broadcaster->broadcast('vm:updated', [
            'vm' => $vm,
            'previous_status' => $previousStatus,
            'stats' => $this->calculateStats(),
            'message' => "La mÃ¡quina virtual {$vm->name} fue actualizada."
        ]);

        return response()->json([
            'message' => 'MÃ¡quina virtual actualizada con Ã©xito.',
            'data' => $vm,
            'stats' => $this->calculateStats()
        ], Response::HTTP_OK);
    }

    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'status' => 'required|in:Activa,Apagada,Mantenimiento'
        ]);

        $vm = VirtualMachine::findOrFail($id);
        $previousStatus = $vm->status;
        $vm->status = $request->status;
        $vm->save();

        // Broadcast de tiempo real para sincronizaciÃ³n instantÃ¡nea y animaciÃ³n en clientes
        $this->broadcaster->broadcast('vm:status_changed', [
            'id' => $vm->id,
            'name' => $vm->name,
            'previous_status' => $previousStatus,
            'status' => $vm->status,
            'vm' => $vm,
            'stats' => $this->calculateStats(),
            'message' => "Estado de {$vm->name} modificado a '{$vm->status}'."
        ]);

        return response()->json([
            'message' => "Estado actualizado a '{$vm->status}'.",
            'data' => $vm,
            'stats' => $this->calculateStats()
        ], Response::HTTP_OK);
    }

    public function destroy(int $id): JsonResponse
    {
        $vm = VirtualMachine::findOrFail($id);
        $vmName = $vm->name;
        $vm->delete();

        $stats = $this->calculateStats();

        // Notificar en tiempo real
        $this->broadcaster->broadcast('vm:deleted', [
            'id' => $id,
            'name' => $vmName,
            'stats' => $stats,
            'message' => "MÃ¡quina virtual {$vmName} eliminada del cluster."
        ]);

        return response()->json([
            'message' => "MÃ¡quina virtual {$vmName} eliminada correctamente.",
            'id' => $id,
            'stats' => $stats
        ], Response::HTTP_OK);
    }

    private function calculateStats(): array
    {
        $all = VirtualMachine::all();
        $active = $all->where('status', 'Activa');

        return [
            'total_vms' => $all->count(),
            'active_vms' => $active->count(),
            'stopped_vms' => $all->where('status', 'Apagada')->count(),
            'maintenance_vms' => $all->where('status', 'Mantenimiento')->count(),
            // Requisito especÃ­fico: Suma de Cores, RAM y Disco de todas las VMs activas
            'active_cores' => (int) $active->sum('cores'),
            'active_ram_gb' => (int) $active->sum('ram'),
            'active_disk_gb' => (int) $active->sum('disk'),
            // Totales globales para comparativas de aprovisionamiento
            'total_cores' => (int) $all->sum('cores'),
            'total_ram_gb' => (int) $all->sum('ram'),
            'total_disk_gb' => (int) $all->sum('disk'),
            'os_distribution' => $all->groupBy('os')->map->count(),
        ];
    }
}

