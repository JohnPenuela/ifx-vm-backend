<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVmRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Controlado por el middleware de rol
    }

    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'min:3',
                'max:50',
                'regex:/^[a-zA-Z0-9\-_]+$/',
                'unique:virtual_machines,name',
            ],
            'cores' => ['required', 'integer', 'min:1', 'max:64'],
            'ram' => ['required', 'integer', 'min:1', 'max:512'],
            'disk' => ['required', 'integer', 'min:10', 'max:10000'],
            'os' => ['required', 'string', 'max:60'],
            'status' => ['required', 'in:Activa,Apagada,Mantenimiento'],
            'ip_address' => ['nullable', 'ip'],
            'description' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre de la máquina virtual es obligatorio.',
            'name.min' => 'El nombre debe tener mínimo 3 caracteres.',
            'name.max' => 'El nombre no puede exceder 50 caracteres.',
            'name.regex' => 'El nombre solo permite letras, números, guiones y guiones bajos (sin espacios).',
            'name.unique' => 'Ya existe una máquina virtual con este nombre en el cluster.',
            'cores.required' => 'La cantidad de cores (vCPU) es obligatoria.',
            'cores.min' => 'Debe asignar al menos 1 core (no se permiten valores negativos ni cero).',
            'cores.max' => 'El límite máximo por nodo es de 64 cores.',
            'ram.required' => 'La memoria RAM es obligatoria.',
            'ram.min' => 'Debe asignar al menos 1 GB de RAM (no se permiten valores negativos ni cero).',
            'ram.max' => 'El límite de RAM por máquina virtual es de 512 GB.',
            'disk.required' => 'El almacenamiento de disco es obligatorio.',
            'disk.min' => 'El almacenamiento mínimo de disco es 10 GB.',
            'disk.max' => 'El almacenamiento máximo es 10.000 GB (10 TB).',
            'os.required' => 'Debe seleccionar un sistema operativo.',
            'status.in' => 'El estado debe ser Activa, Apagada o Mantenimiento.',
            'ip_address.ip' => 'La dirección IP ingresada no tiene un formato válido.',
        ];
    }
}
