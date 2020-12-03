using System;
using System.Threading.Tasks;
using WebApiProxifyioTestdb.DataAccessLayer;
using WebApiProxifyioTestdb.Models;

namespace WebApiProxifyioTestdb.Services
{
    public class AccountService : IAccountService
    {

        private readonly ApplicationDBContext _context;

        public AccountService(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Account> GetAccountById(Guid id)
        {
            Account account = await _context.Accounts.FindAsync(id);

            return account;
        }

    }
}
