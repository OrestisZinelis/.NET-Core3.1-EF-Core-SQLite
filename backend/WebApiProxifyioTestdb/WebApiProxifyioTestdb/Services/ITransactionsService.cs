using System;
using System.Threading.Tasks;
using WebApiProxifyioTestdb.Models;

namespace WebApiProxifyioTestdb.Services
{
    public interface ITransactionsService
    {
        Task<Transaction> GetTransaction(Guid id);
    }
}