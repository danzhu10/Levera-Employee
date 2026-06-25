interface PositionFilterProps {
  value: string
  positions: string[]
  onChange: (value: string) => void
  isLoading?: boolean
}

export function PositionFilter({
  value,
  positions,
  onChange,
  isLoading,
}: PositionFilterProps) {
  return (
    <div className="w-full sm:w-64">
      <label htmlFor="position-filter" className="sr-only">
        Filter posisi
      </label>
      <select
        id="position-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      >
        <option value="">Semua posisi</option>
        {positions.map((position) => (
          <option key={position} value={position}>
            {position}
          </option>
        ))}
      </select>
    </div>
  )
}
