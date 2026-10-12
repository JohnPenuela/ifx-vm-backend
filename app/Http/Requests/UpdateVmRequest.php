<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVmRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $vmId = $this->route('id') ?? $this->route('vm');

        return [
            'name' => [
                'sometimes',
                'required',
                'string',
                'min:3',
                'max:50',
                'regex:/^[a-zA-Z0-9\-_]+$/',
                Rule::unique('virtual_machines', 'name')->ignore($vmId),
            ],
            'cores' => ['sometimes', 'required', 'integer', 'min:1', 'max:64'],
            'ram' => ['sometimes', 'required', 'integer', 'min:1', 'max:512'],
            'disk' => ['sometimes', 'required', 'integer', 'min:10', 'max:10000'],
            'os' => ['sometimes', 'required', 'string', 'max:60'],
            'status' => ['sometimes', 'required', 'in:Activa,Apagada,Mantenimiento'],
            'ip_address' => ['nullable', 'ip'],
            'description' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.min' => 'El nombre debe tener mínimo 3 caracteres.',
            'name.max' => 'El nombre no puede exceder 50 caracteres.',
            'name.regex' => 'El nombre solo permite letras, números, guiones y guiones bajos (sin espacios).',
            'name.unique' => 'Ya existe otra máquina virtual con este nombre.',
            'cores.min' => 'Los cores no pueden ser negativos ni cero (mínimo 1).',
            'cores.max' => 'El límite de cores es 64.',
            'ram.min' => 'La RAM no puede ser negativa ni cero (mínimo 1 GB).',
            'ram.max' => 'El límite de RAM es 512 GB.',
            'disk.min' => 'El disco debe ser de al menos 10 GB.',
            'disk.max' => 'El límite de disco es 10.000 GB.',
            'status.in' => 'El estado debe ser Activa, Apagada o Mantenimiento.',
            'ip_address.ip' => 'La dirección IP ingresada no es válida.',
        ];
    }
}
