export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center py-16">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600 dark:text-gray-300">Memuat...</p>
    </div>
  )
}
