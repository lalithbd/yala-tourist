export default function LoadingIndicator() {
  return (
    <div className="flex items-center justify-center py-20" role="status">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
}
