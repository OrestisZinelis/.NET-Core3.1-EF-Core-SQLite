using System;
using System.Threading.Tasks;
using WebApiProxifyioTestdb.DataAccessLayer;
using WebApiProxifyioTestdb.Models;

namespace WebApiProxifyioTestdb.Services
{
    public class TransactionsService : ITransactionsService
    {
        private readonly ApplicationDBContext _context;
        public TransactionsService(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Transaction> GetTransaction(Guid id)
        {
            var transaction = await _context.Transactions.FindAsync(id);

            return transaction;
        }
    }
}
