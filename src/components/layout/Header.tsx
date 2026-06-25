import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="text-xl font-bold text-gray-900 hover:text-blue-600">
          Employee Management
        </Link>
        <Link to="/employees/new">
          <Button>Tambah Karyawan</Button>
        </Link>
      </div>
    </header>
  )
}
