using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.DB.CW
{
    [Table("CC_EXTRATO")]
    public class ExtratoCW
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Id")]
        public string Id { get; internal set; }

        [Column("Descricao")]
        public string Descricao { get; set; }

        [Column("Valor")]
        public decimal Valor { get; set; }

        [Column("Avulso")]
        public bool Avulso { get; set; }

        [Column("Status")]
        public string Status { get; set; }

        [Column("Data", TypeName = "datetime2")]
        public DateTime Data { get; set; }
    }
}