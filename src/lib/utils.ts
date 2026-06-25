export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate))
}

export function truncate(text: string, maxLength = 40): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}…`
}
