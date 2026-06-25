import { useQuery } from '@tanstack/react-query'
import { ApiError, getEmployeeById } from '../api/employeeApi'

export function useEmployee(id: string | undefined) {
  return useQuery({
    queryKey: ['employee', id],
    queryFn: () => getEmployeeById(id!),
    enabled: Boolean(id),
    retry: (_, error) => {
      if (error instanceof ApiError && error.status === 404) {
        return false
      }
      return true
    },
  })
}
