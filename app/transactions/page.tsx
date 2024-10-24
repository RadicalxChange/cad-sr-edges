import { getAccounts } from "@/lib/getAccounts";
import { getTransactions } from "@/lib/getTransactions";
import { getUser } from "@/lib/getUser";
import { Account } from "@/types/account";
import { Transaction } from "@/types/transaction";
import { Claims } from "@auth0/nextjs-auth0";
import styles from "@/styles/contents.module.css";
import Link from "next/link";

export default async function Transactions() {
    
  const user: Claims | null = await getUser()
  const accounts: Account[] = await getAccounts()
  var transactions: Transaction[] = await getTransactions()

  const account: Account | null | undefined = user && accounts.find((account) => account.email === user.email)

  // checks if user has permission to view the transaction
  const isViewable = (transaction: Transaction) => {
    return account?.is_member || transaction.sender_id === user?.account_id || transaction.recipient_id === user?.account_id
  };

  const getName = (thisId: number) => {
    const thisAccount: Account | undefined = accounts.find((account) => account.id === thisId)
    return thisAccount ? thisAccount.name : "Unknown"
  };

  return (
    <main className="px-4 pb-4 lg:px-24 pt-12 min-h-screen-minus-header">
      <h1 className="text-left text-lg mb-12">Transactions</h1>
      {!account?.is_member ? (
        <p className="max-w-5xl text-left text-sm text-gray-300 mb-8">Transaction details are hidden if you&apos;re not a community member. If you&apos;d like to be registered as a community member, <Link href="/onboard" className="underline hover:no-underline">fill out the form</Link></p>
      ) : null}
      <ul className={styles.contentBox}>
        {transactions.reverse().map((transaction, index) => {
          if (user && isViewable(transaction)) {
            return (
              <li key={index} className={`px-4 py-2 my-2 flex justify-between items-center ${transaction.sender_id === user.account_id ? 'text-red-400' : ''} ${transaction.recipient_id === user.account_id ? 'text-green-400' : ''}`}>
                  {getName(transaction.sender_id)} sent {transaction.amount} ɖears to {getName(transaction.recipient_id)} for {transaction.message}
              </li>
            )
          } else {
            return (
               <li key={index} className="px-4 py-2 my-2 items-center">
                   <span className="text-gray-400">Community Member</span> sent {transaction.amount} ɖears to <span className="text-gray-400">Community Member</span> for <span className="text-gray-400">Purpose</span>
               </li>
             )
          }
        })}
      </ul>
    </main>
  );
}
