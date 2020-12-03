using Microsoft.EntityFrameworkCore;
using WebApiProxifyioTestdb.Models;

namespace WebApiProxifyioTestdb.DataAccessLayer
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) { }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Account> Accounts { get; set; }
    }
}