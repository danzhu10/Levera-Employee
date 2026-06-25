interface EmployeeSearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function EmployeeSearchBar({ value, onChange }: EmployeeSearchBarProps) {
  return (
    <div className="flex-1">
      <label htmlFor="search" className="sr-only">
        Cari karyawan
      </label>
      <input
        id="search"
        type="search"
        placeholder="Cari berdasarkan nama..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}
