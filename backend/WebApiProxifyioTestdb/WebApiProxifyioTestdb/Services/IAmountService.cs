using System.Threading.Tasks;
using WebApiProxifyioTestdb.Models;

namespace WebApiProxifyioTestdb.Services
{
    public interface IAmountService
    {
        Task<bool> CreateTransaction(Transaction transaction);

        MaxTransactionVolume GetMaxTransactionVolume();
    }
}