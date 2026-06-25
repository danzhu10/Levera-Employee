import { ConfirmModal } from '../ui/Modal'
import type { Employee } from '../../types/employee'

interface DeleteConfirmModalProps {
  employee: Employee | null
  isOpen: boolean
  isLoading: boolean
  error: string | null
  onClose: () => void
  onConfirm: () => void
}

export function DeleteConfirmModal({
  employee,
  isOpen,
  isLoading,
  error,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Hapus Karyawan"
      confirmLabel="Hapus"
      isLoading={isLoading}
      error={error}
      message={
        employee ? (
          <>
            Yakin ingin menghapus karyawan{' '}
            <strong className="font-semibold text-gray-900">
              {employee.name}
            </strong>
            ? Tindakan ini tidak dapat dibatalkan.
          </>
        ) : (
          ''
        )
      }
    />
  )
}
