import { Outlet } from 'react-router-dom'

export const InnerPage = () => {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-4 md:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}
