using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiProxifyioTestdb.DataAccessLayer;
using WebApiProxifyioTestdb.Models;

namespace WebApiProxifyioTestdb.Services
{
    public class AmountService : IAmountService
    {

        private readonly ApplicationDBContext _context;

        public AmountService(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateTransaction(Transaction transaction)
        {
            var account = await _context.Accounts.FindAsync(transaction.account_id);
            if (account == null)
                account = _context.Accounts.Add(new Account { id = transaction.account_id, balance = 0 }).Entity;

            Transaction foundTransaction = await _context.Transactions.FindAsync(transaction.id);
            if (foundTransaction == null)
            {
                _context.Transactions.Add(transaction);

                account.balance += transaction.amount.GetValueOrDefault();
                await _context.SaveChangesAsync();
                _context.Accounts.Update(account);
                var save = await _context.SaveChangesAsync();
                return save > 0;
            }
            return true;
        }

        public MaxTransactionVolume GetMaxTransactionVolume()
        {
            string sqlQuery = @"SELECT account_id,id, COUNT(account_id)  as amount
                              FROM 'Transactions'   GROUP BY account_id
                              HAVING COUNT(account_id) = (
                              SELECT MAX(mycount)
                              FROM(
                              SELECT account_id, COUNT(account_id) mycount
                              FROM 'Transactions'
                              GROUP BY account_id))";

            List<Transaction> transactions = _context.Transactions.FromSqlRaw(sqlQuery).ToList();

            var d = transactions.Select(x => x.account_id);

            var obj = new MaxTransactionVolume();
            obj.accounts = transactions.Select(x => x.account_id).ToList();
            obj.maxVolume = transactions.FirstOrDefault().amount.GetValueOrDefault();

            return obj;
        }
    }
}
