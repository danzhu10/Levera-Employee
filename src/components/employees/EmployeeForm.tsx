import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import type { EmployeeInput } from '../../types/employee'

const employeeSchema = z.object({
  name: z
    .string()
    .min(1, 'Nama wajib diisi')
    .max(100, 'Nama maksimal 100 karakter'),
  address: z.string().min(1, 'Alamat wajib diisi'),
  position: z.string().min(1, 'Posisi wajib diisi'),
})

interface EmployeeFormProps {
  defaultValues?: EmployeeInput
  onSubmit: (data: EmployeeInput) => void
  isSubmitting: boolean
  submitError?: string | null
  submitLabel?: string
}

export function EmployeeForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitError,
  submitLabel = 'Simpan',
}: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeInput>({
    resolver: zodResolver(employeeSchema),
    defaultValues: defaultValues ?? {
      name: '',
      address: '',
      position: '',
    },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-lg space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      noValidate
    >
      {submitError && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
          role="alert"
        >
          {submitError}
        </div>
      )}

      <Input
        id="name"
        label="Nama"
        placeholder="Masukkan nama karyawan"
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        id="address"
        label="Alamat"
        placeholder="Masukkan alamat"
        error={errors.address?.message}
        {...register('address')}
      />

      <Input
        id="position"
        label="Posisi"
        placeholder="Masukkan posisi/jabatan"
        error={errors.position?.message}
        {...register('position')}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Menyimpan...' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
