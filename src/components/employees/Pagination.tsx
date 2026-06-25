interface PaginationProps {
  page: number
  hasNextPage: boolean
  onPageChange: (page: number) => void
}

export function Pagination({ page, hasNextPage, onPageChange }: PaginationProps) {
  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 pt-4"
      aria-label="Pagination"
    >
      <p className="text-sm text-gray-600">Halaman {page}</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Sebelumnya
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNextPage}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Selanjutnya
        </button>
      </div>
    </nav>
  )
}
