import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ApiError } from '../api/employeeApi'
import { EmployeeForm } from '../components/employees/EmployeeForm'
import {
  ErrorMessage,
  LoadingSpinner,
} from '../components/employees/EmployeeStates'
import { Button } from '../components/ui/Button'
import { useEmployee } from '../hooks/useEmployee'
import {
  useCreateEmployee,
  useUpdateEmployee,
} from '../hooks/useEmployeeMutations'
import type { EmployeeInput } from '../types/employee'

export function EmployeeFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    data: employee,
    isLoading,
    isError,
    error,
    refetch,
  } = useEmployee(isEdit ? id : undefined)

  const createMutation = useCreateEmployee()
  const updateMutation = useUpdateEmployee()

  const isNotFound = isEdit && isError && error instanceof ApiError && error.status === 404
  const isSubmitting = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (data: EmployeeInput) => {
    setSubmitError(null)

    try {
      if (isEdit && id) {
        const updated = await updateMutation.mutateAsync({ id, data })
        navigate(`/employees/${updated.id}`)
      } else {
        const created = await createMutation.mutateAsync(data)
        navigate(`/employees/${created.id}`)
      }
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'Gagal menyimpan data. Silakan coba lagi.'
      setSubmitError(message)
    }
  }

  if (isEdit && isLoading) {
    return <LoadingSpinner label="Memuat data karyawan..." />
  }

  if (isNotFound) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold text-gray-900">Karyawan Tidak Ditemukan</h1>
        <p className="mt-2 text-sm text-gray-500">
          Data karyawan yang ingin diedit tidak ditemukan.
        </p>
        <Link to="/" className="mt-6 inline-block">
          <Button variant="secondary">Kembali ke Daftar</Button>
        </Link>
      </div>
    )
  }

  if (isEdit && isError) {
    return (
      <ErrorMessage
        message={
          error instanceof ApiError
            ? error.message
            : 'Gagal memuat data karyawan.'
        }
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          to={isEdit && employee ? `/employees/${employee.id}` : '/'}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          ← Kembali
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">
          {isEdit ? 'Edit Karyawan' : 'Tambah Karyawan'}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {isEdit
            ? 'Perbarui informasi karyawan'
            : 'Isi form untuk menambah karyawan baru'}
        </p>
      </div>

      <EmployeeForm
        defaultValues={
          employee
            ? {
                name: employee.name,
                address: employee.address,
                position: employee.position,
              }
            : undefined
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitError={submitError}
        submitLabel={isEdit ? 'Perbarui' : 'Simpan'}
      />
    </div>
  )
}
