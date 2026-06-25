import { useQuery } from '@tanstack/react-query'
import { getEmployees } from '../api/employeeApi'
import type { Employee } from '../types/employee'

const PAGE_SIZE = 10
const POSITION_FETCH_LIMIT = 100

export interface UseEmployeesOptions {
  page: number
  search: string
  position: string
}

export function useEmployees({ page, search, position }: UseEmployeesOptions) {
  const hasPositionFilter = position.length > 0

  return useQuery({
    queryKey: ['employees', { page, search, position }],
    queryFn: async (): Promise<{
      employees: Employee[]
      hasNextPage: boolean
    }> => {
      if (hasPositionFilter) {
        const allMatching = await getEmployees({
          search: search || undefined,
          limit: POSITION_FETCH_LIMIT,
        })
        const filtered = allMatching.filter((e) => e.position === position)
        const start = (page - 1) * PAGE_SIZE
        const employees = filtered.slice(start, start + PAGE_SIZE)

        return {
          employees,
          hasNextPage: start + PAGE_SIZE < filtered.length,
        }
      }

      const employees = await getEmployees({
        page,
        limit: PAGE_SIZE,
        search: search || undefined,
      })

      return {
        employees,
        hasNextPage: employees.length === PAGE_SIZE,
      }
    },
  })
}

export function usePositions() {
  return useQuery({
    queryKey: ['positions'],
    queryFn: async () => {
      const employees = await getEmployees({ limit: POSITION_FETCH_LIMIT })
      const positions = [...new Set(employees.map((e) => e.position))].sort()
      return positions
    },
    staleTime: 5 * 60 * 1000,
  })
}

export { PAGE_SIZE }
