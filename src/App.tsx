import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { EmployeeDetailPage } from './pages/EmployeeDetailPage'
import { EmployeeFormPage } from './pages/EmployeeFormPage'
import { EmployeeListPage } from './pages/EmployeeListPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<EmployeeListPage />} />
          <Route path="employees/new" element={<EmployeeFormPage />} />
          <Route path="employees/:id" element={<EmployeeDetailPage />} />
          <Route path="employees/:id/edit" element={<EmployeeFormPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
