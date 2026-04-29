const Loading = ({ variant = 'detail' }) => {
  const showDetailBlock = variant !== 'grid';

  return (
    <div className="min-h-screen w-screen overflow-hidden bg-[#0D0F14] p-4 text-white sm:p-8">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,96,9,0.12),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="shimmer h-11 w-11 rounded-full" />
            <div className="shimmer h-11 w-11 rounded-full" />
            <div>
              <div className="shimmer mb-3 h-3 w-28 rounded-full" />
              <div className="shimmer h-8 w-48 rounded-full sm:w-64" />
            </div>
          </div>
          <div className="shimmer h-12 w-full rounded-full sm:w-80" />
        </div>

        {showDetailBlock && (
          <div className="grid gap-8 lg:grid-cols-[20rem_1fr]">
            <div className="shimmer aspect-[2/3] w-full max-w-sm rounded-3xl shadow-2xl shadow-black/30" />

            <div className="space-y-5">
              <div className="shimmer h-4 w-32 rounded-full" />
              <div className="shimmer h-12 w-full max-w-3xl rounded-2xl sm:h-16" />
              <div className="flex flex-wrap gap-3">
                <div className="shimmer h-14 w-14 rounded-full" />
                <div className="shimmer h-10 w-28 rounded-full" />
                <div className="shimmer h-10 w-36 rounded-full" />
                <div className="shimmer h-10 w-52 rounded-full" />
              </div>
              <div className="space-y-3 pt-2">
                <div className="shimmer h-4 w-full max-w-4xl rounded-full" />
                <div className="shimmer h-4 w-full max-w-3xl rounded-full" />
                <div className="shimmer h-4 w-full max-w-2xl rounded-full" />
              </div>
              <div className="shimmer h-12 w-40 rounded-full" />
            </div>
          </div>
        )}

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <div className="shimmer aspect-[2/3] w-full" />
              <div className="space-y-2 p-3">
                <div className="shimmer h-4 w-full rounded-full" />
                <div className="shimmer h-3 w-2/3 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loading
