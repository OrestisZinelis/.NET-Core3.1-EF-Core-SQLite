using System;
using System.Threading.Tasks;
using WebApiProxifyioTestdb.Models;

namespace WebApiProxifyioTestdb.Services
{
    public interface IAccountService
    {
        Task<Account> GetAccountById(Guid id);
    }
}