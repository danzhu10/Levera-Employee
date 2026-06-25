import { useState } from 'react'
import { ApiError } from '../api/employeeApi'
import { DeleteConfirmModal } from '../components/employees/DeleteConfirmModal'
import { EmployeeSearchBar } from '../components/employees/EmployeeSearchBar'
import {
  EmptyState,
  ErrorMessage,
  LoadingSpinner,
} from '../components/employees/EmployeeStates'
import { EmployeeTable } from '../components/employees/EmployeeTable'
import { Pagination } from '../components/employees/Pagination'
import { PositionFilter } from '../components/employees/PositionFilter'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useDeleteEmployee } from '../hooks/useEmployeeMutations'
import { useEmployees, usePositions } from '../hooks/useEmployees'
import type { Employee } from '../types/employee'

export function EmployeeListPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [position, setPosition] = useState('')
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  )
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const debouncedSearch = useDebouncedValue(search)
  const deleteMutation = useDeleteEmployee()

  const { data: positions = [], isLoading: positionsLoading } = usePositions()
  const { data, isLoading, isError, error, refetch, isFetching } = useEmployees(
    {
      page,
      search: debouncedSearch,
      position,
    },
  )

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handlePositionChange = (value: string) => {
    setPosition(value)
    setPage(1)
  }

  const handleDeleteConfirm = async () => {
    if (!employeeToDelete) return

    setDeleteError(null)
    try {
      await deleteMutation.mutateAsync(employeeToDelete.id)
      setEmployeeToDelete(null)
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
    setEmployeeToDelete(null)
    setDeleteError(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Daftar Karyawan</h1>
        <p className="mt-1 text-sm text-gray-500">
          Kelola data karyawan perusahaan
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <EmployeeSearchBar value={search} onChange={handleSearchChange} />
        <PositionFilter
          value={position}
          positions={positions}
          onChange={handlePositionChange}
          isLoading={positionsLoading}
        />
      </div>

      {isLoading && <LoadingSpinner label="Memuat daftar karyawan..." />}

      {isError && (
        <ErrorMessage
          message={
            error instanceof ApiError
              ? error.message
              : 'Gagal memuat daftar karyawan.'
          }
          onRetry={() => refetch()}
        />
      )}

      {!isLoading && !isError && data && (
        <>
          {data.employees.length === 0 ? (
            <EmptyState message="Belum ada karyawan yang ditemukan." />
          ) : (
            <>
              <EmployeeTable
                employees={data.employees}
                onDelete={setEmployeeToDelete}
              />
              <Pagination
                page={page}
                hasNextPage={data.hasNextPage}
                onPageChange={setPage}
              />
            </>
          )}
          {isFetching && !isLoading && (
            <p className="text-center text-xs text-gray-400">Memperbarui...</p>
          )}
        </>
      )}

      <DeleteConfirmModal
        employee={employeeToDelete}
        isOpen={Boolean(employeeToDelete)}
        isLoading={deleteMutation.isPending}
        error={deleteError}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
