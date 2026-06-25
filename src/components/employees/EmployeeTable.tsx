import { Link, useNavigate } from 'react-router-dom'
import type { Employee } from '../../types/employee'
import { formatDate, truncate } from '../../lib/utils'
import { Button } from '../ui/Button'

interface EmployeeTableProps {
  employees: Employee[]
  onDelete: (employee: Employee) => void
}

export function EmployeeTable({ employees, onDelete }: EmployeeTableProps) {
  const navigate = useNavigate()

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
            >
              Nama
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
            >
              Posisi
            </th>
            <th
              scope="col"
              className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 sm:table-cell"
            >
              Alamat
            </th>
            <th
              scope="col"
              className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 md:table-cell"
            >
              Dibuat
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500"
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => navigate(`/employees/${employee.id}`)}
            >
              <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                {employee.name}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                {employee.position}
              </td>
              <td className="hidden px-4 py-3 text-sm text-gray-600 sm:table-cell">
                {truncate(employee.address)}
              </td>
              <td className="hidden whitespace-nowrap px-4 py-3 text-sm text-gray-500 md:table-cell">
                {formatDate(employee.createdAt)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                <div
                  className="flex justify-end gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link to={`/employees/${employee.id}`}>
                    <Button variant="ghost" className="px-2 py-1">
                      Lihat
                    </Button>
                  </Link>
                  <Link to={`/employees/${employee.id}/edit`}>
                    <Button variant="secondary" className="px-2 py-1">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="px-2 py-1"
                    onClick={() => onDelete(employee)}
                  >
                    Hapus
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
