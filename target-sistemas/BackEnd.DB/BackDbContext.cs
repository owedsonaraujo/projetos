using BackEnd.DB.CW;
using BackEnd.DB.DTO;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.DB
{
    public class BackDbContext : DbContext
    {
        public BackDbContext(DbContextOptions<BackDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ExtratoCW>().ToTable("CC_EXTRATO");

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<ExtratoCW> CC_EXTRATO { get; set; } 

        public async Task<string> AddAsync(ExtratoCW extrato)
        {
            extrato.Id = Guid.NewGuid().ToString().ToUpper();

            CC_EXTRATO.Add(extrato);

            await SaveChangesAsync();

            return extrato.Id;
        }

        public async Task<ExtratoCW> UpdateAsync(string id, decimal valor, DateTime data)
        {
            var find = await this.CC_EXTRATO.FirstOrDefaultAsync(x => x.Id == id);

            if (find != null)
            {
                find.Data =DateTime.Now;
                find.Valor = valor;
                find.Data = data;

                await SaveChangesAsync();
            }

            return find;
        }

        public async Task<ExtratoCW> CancelAsync(string id)
        {
            var find = await this.CC_EXTRATO.FirstOrDefaultAsync(x => x.Id == id);

            if(find != null)
            {
                find.Status = "Cancelado";

                await SaveChangesAsync();
            }

            return find;
        }
    }
}
