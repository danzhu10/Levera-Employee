import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ApiError } from '../api/employeeApi'
import { DeleteConfirmModal } from '../components/employees/DeleteConfirmModal'
import {
  ErrorMessage,
  LoadingSpinner,
} from '../components/employees/EmployeeStates'
import { Button } from '../components/ui/Button'
import { useEmployee } from '../hooks/useEmployee'
import { useDeleteEmployee } from '../hooks/useEmployeeMutations'
import { formatDate } from '../lib/utils'

export function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const { data: employee, isLoading, isError, error, refetch } = useEmployee(id)
  const deleteMutation = useDeleteEmployee()

  const isNotFound = isError && error instanceof ApiError && error.status === 404

  const handleDeleteConfirm = async () => {
    if (!employee) return

    setDeleteError(null)
    try {
      await deleteMutation.mutateAsync(employee.id)
      navigate('/')
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'Gagal menghapus karyawan. Silakan coba lagi.'
      setDeleteError(message)
    }
  }

  const handleDeleteClose = () => {
    if (deleteMutation.isPending) return
    setShowDeleteModal(false)
    setDeleteError(null)
  }

  if (isLoading) {
    return <LoadingSpinner label="Memuat detail karyawan..." />
  }

  if (isNotFound) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold text-gray-900">Karyawan Tidak Ditemukan</h1>
        <p className="mt-2 text-sm text-gray-500">
          Data karyawan dengan ID tersebut tidak ada atau sudah dihapus.
        </p>
        <Link to="/" className="mt-6 inline-block">
          <Button variant="secondary">Kembali ke Daftar</Button>
        </Link>
      </div>
    )
  }

  if (isError || !employee) {
    return (
      <ErrorMessage
        message={
          error instanceof ApiError
            ? error.message
            : 'Gagal memuat detail karyawan.'
        }
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            to="/"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            ← Kembali ke daftar
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            {employee.name}
          </h1>
          <p className="text-sm text-gray-500">{employee.position}</p>
        </div>
        <div className="flex gap-3">
          <Link to={`/employees/${employee.id}/edit`}>
            <Button variant="secondary">Edit</Button>
          </Link>
          <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
            Hapus
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">ID</dt>
            <dd className="mt-1 text-sm text-gray-900">{employee.id}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Posisi</dt>
            <dd className="mt-1 text-sm text-gray-900">{employee.position}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Alamat</dt>
            <dd className="mt-1 text-sm text-gray-900">{employee.address}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Dibuat pada</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDate(employee.createdAt)}
            </dd>
          </div>
        </dl>
      </div>

      <DeleteConfirmModal
        employee={employee}
        isOpen={showDeleteModal}
        isLoading={deleteMutation.isPending}
        error={deleteError}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
