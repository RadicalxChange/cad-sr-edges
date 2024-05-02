import { getAccounts } from "@/lib/getAccounts";
import { getUser } from "@/lib/user";
import { Account } from "@/types/account";

export default async function Home() {

  const user: Account = getUser()
  const accounts: Account[] = await getAccounts()

  return (
    <main className="flex min-h-screen flex-col items-center border-b-2 border-white">
      <div className="w-full px-24 pb-24 pt-12">
        <h1 className="text-left text-lg mb-12">Whoville Whocoin Ledger</h1>
        <ul className="w-full max-w-5xl font-mono text-sm border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 lg:p-4">
          {accounts.map((account, index) => {
            return (
              <li key={index} className={`px-4 py-2 my-2 flex justify-between items-center ${account.id === user.id ? 'text-blue-400' : ''}`}>
                  {account.name} <span className="font-bold">{account.balance} Whocoins</span>
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  );
}
