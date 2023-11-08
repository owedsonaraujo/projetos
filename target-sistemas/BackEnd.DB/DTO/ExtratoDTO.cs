using BackEnd.DB.CW;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.DB.DTO
{
    public class ExtratoDTO
    {
        public ExtratoDTO(ExtratoCW extratoCW)
        {
            this.Id = extratoCW.Id;
            this.Descricao = extratoCW.Descricao;
            this.Valor = extratoCW.Valor;
            this.Avulso = extratoCW.Avulso;
            this.Status = extratoCW.Status;
            this.Data = extratoCW.Data;
        }

        [JsonProperty("id")]
        public string Id { get; private set; }

        [JsonProperty("descricao")]
        public string Descricao { get; private set; }

        [JsonProperty("data")]
        public DateTime Data { get; private set; }

        [JsonProperty("valor")]
        public decimal Valor { get; private set; }

        [JsonProperty("avulso")]
        public bool Avulso { get; private set; }

        [JsonProperty("status")]
        public string Status { get; private set; }
    }
}