
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using BackEnd.DB;
using BackEnd.DB.Model;
using BackEnd.DB.DTO;
using BackEnd.DB.CW;

namespace BackEnd.Controllers
{
    [Route("extrato")]
    [ApiController]
    public class ExtratoController : ControllerBase
    {
        private readonly BackDbContext _dbContext; // Injete o seu DbContext aqui

        public ExtratoController(BackDbContext backDbContext)
        {
            this._dbContext = backDbContext;
        }

        [HttpGet("/extrato/list")]
        public async Task<IActionResult> ListAsync([FromQuery] DateTime? startDate = null, [FromQuery] DateTime? endDate = null)
        {
            if (!startDate.HasValue)
                startDate = DateTime.Now.AddDays(-2);

            // Verifica se endDate não foi fornecido e define o padrão como a data atual
            if (!endDate.HasValue)
                endDate = DateTime.Now;

            var extratoCWs = await this._dbContext.CC_EXTRATO
                .Where(extrato => extrato.Data >= startDate && extrato.Data <= endDate)
                .OrderByDescending(order => order.Data)
                .ToListAsync();

            var extratoDTOs = new List<ExtratoDTO>();

            extratoCWs.ForEach(extratoCW =>
            {
                extratoDTOs.Add(new ExtratoDTO(extratoCW));
            });

            var extrato = new
            {
                startDate = startDate,
                endDate = endDate,
                lancamentos = extratoDTOs
            };

            return Ok(extrato);
        }

        [HttpPost("/extrato")]
        public async Task<IActionResult> PostAsync([FromForm] ExtratoModel model, [FromForm] bool avulso)
        {
            try
            {
                var add = new ExtratoCW()
                {
                    Avulso = avulso,
                    Descricao = model.Descricao,
                    Valor = model.Valor,
                    Status = "Válido",
                    Data = DateTime.Now
                };

                var id = await this._dbContext.AddAsync(add);

                return await this.GetAsync(id);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("/extrato/avulso")]
        public async Task<IActionResult> PostAsync([FromForm] ExtratoModel model)
        {
            try
            {
                var add = new ExtratoCW()
                {
                    Avulso = true,
                    Descricao = model.Descricao,
                    Valor = model.Valor,
                    Status = "Válido",
                    Data = DateTime.Now
                };

                var id = await this._dbContext.AddAsync(add);

                return await this.GetAsync(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("/extrato/{id}")]
        public async Task<IActionResult> GetAsync([FromRoute] string id)
        {
            var extratoCW = await this._dbContext.CC_EXTRATO
                .FirstOrDefaultAsync(e => e.Id == id);

            if (extratoCW == null)
                return NotFound();

            var extratoDTO = new ExtratoDTO(extratoCW);

            return Ok(extratoDTO);
        }

        [HttpPut("/extrato/{id}")]
        public async Task<IActionResult> UpdateAsync([FromRoute]string id, [FromForm] decimal valor, [FromForm] DateTime data)
        {
            try
            {
                var update = await this._dbContext.UpdateAsync(id, valor, data);

                var extratoDTO = new ExtratoDTO(update);

                return await this.GetAsync(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpPut("/extrato/{id}/cancelar")]
        public async Task<IActionResult> CancelAsync([FromRoute] string id)
        {
            try
            {
                var update = await this._dbContext.CancelAsync(id);

                var extratoDTO = new ExtratoDTO(update);

                return await this.GetAsync(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
