import type { Employee, EmployeeInput, GetEmployeesParams } from '../types/employee'

const BASE_URL =
  'https://65264556917d673fd76bec6f.mockapi.io/api/v1/employee'

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const message =
      res.status === 404
        ? 'Data tidak ditemukan'
        : `Terjadi kesalahan (${res.status})`
    throw new ApiError(message, res.status)
  }

  return res.json() as Promise<T>
}

function buildUrl(params?: GetEmployeesParams): string {
  const url = new URL(BASE_URL)

  if (params?.page) {
    url.searchParams.set('page', String(params.page))
  }
  if (params?.limit) {
    url.searchParams.set('limit', String(params.limit))
  }
  if (params?.search?.trim()) {
    url.searchParams.set('search', params.search.trim())
  }

  return url.toString()
}

export async function getEmployees(
  params: GetEmployeesParams = {},
): Promise<Employee[]> {
  const res = await fetch(buildUrl(params))
  return handleResponse<Employee[]>(res)
}

export async function getEmployeeById(id: string): Promise<Employee> {
  const res = await fetch(`${BASE_URL}/${id}`)
  return handleResponse<Employee>(res)
}

export async function createEmployee(data: EmployeeInput): Promise<Employee> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse<Employee>(res)
}

export async function updateEmployee(
  id: string,
  data: EmployeeInput,
): Promise<Employee> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse<Employee>(res)
}

export async function deleteEmployee(id: string): Promise<Employee> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
  return handleResponse<Employee>(res)
}
