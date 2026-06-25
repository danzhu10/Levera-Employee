export interface Employee {
  id: string
  name: string
  address: string
  position: string
  createdAt: string
}

export interface EmployeeInput {
  name: string
  address: string
  position: string
}

export interface GetEmployeesParams {
  page?: number
  limit?: number
  search?: string
}
