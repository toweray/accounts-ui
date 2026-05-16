import { AccountCard } from './components/account-card'

export const HomePage = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="flex min-w-0 flex-col gap-4">
        <AccountCard />
      </div>
    </div>
  )
}
