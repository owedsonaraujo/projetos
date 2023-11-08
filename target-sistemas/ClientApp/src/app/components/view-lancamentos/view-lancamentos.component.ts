import { Component, OnInit, Input } from '@angular/core';
import { ExtratoDTO } from 'src/app/dto/ExtratoDTO';
import { MatTableDataSource } from '@angular/material/table';
import { LancamentosService } from 'src/app/services/lancamentos.service';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-view-lancamentos',
  templateUrl: './view-lancamentos.component.html',
  styleUrls: ['./view-lancamentos.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
})
export class ViewLancamentosComponent implements OnInit {

  @Input() displayedColumns: string[] = [
    'data',
    'id',
    'descricao',
    'valor',
    'avulso',
    'status',
    'actions',
  ];

  dataSource = new MatTableDataSource<ExtratoDTO>([]);

  startDate: Date = new Date(); // Data atual
  endDate: Date = new Date();

  constructor(private lancamentos: LancamentosService,
    private dateAdapter: DateAdapter<Date>) {

    this.dateAdapter.setLocale('pt-BR');
   }

  ngOnInit() {

    const dataAtual = new Date();
    this.startDate = new Date(dataAtual.setDate(dataAtual.getDate() - 2));

    this.loadLancamentos();

    this.lancamentos.added.subscribe(extrato => {
      this.dataSource.data.splice(0, 0, extrato);
      this.dataSource.data = this.dataSource.data;
    });

    this.lancamentos.cancelado.subscribe(extrato => {
      var find = this.dataSource.data.find(e => e.id == extrato.id);

      if (find) {
        find.status = extrato.status;
      }

      this.dataSource.data = this.dataSource.data;
    });

    this.lancamentos.updated.subscribe(extrato => {
      var find = this.dataSource.data.find(e => e.id == extrato.id);
      if (find) {
        find.valor = extrato.valor;
        find.data = extrato.data;
      }
      this.dataSource.data = this.dataSource.data;
    });
  }

  loadLancamentos() {
    this.lancamentos.getLancamentos(this.startDate, this.endDate)?.subscribe(
      (response: any) => {

        if (Array.isArray(response.lancamentos)) {
          this.dataSource = new MatTableDataSource<ExtratoDTO>(response.lancamentos);
        }

        this.startDate = new Date(response.startDate);
        this.endDate = new Date(response.endDate);
      },
      (error: any) => {
      }
    );
  }

  btnAlterar_click(sender: ExtratoDTO) {
    this.lancamentos.alterarIncluir(sender);
  }

  btnCancelar_click(id: string) {
    this.lancamentos.cancelar(id)?.subscribe(
      (response: any) => {
        this.lancamentos.cancelado_call(response as ExtratoDTO);
      },
      (error: any) => {
      }
    );
  }

  formatarMoeda(valor: number): string {
    const options = {
      style: 'currency',
      currency: 'BRL'
    };

    return valor.toLocaleString('pt-BR', options);
  }

  formatarData(date: string): string {
   

    return new Date(date).toLocaleDateString('pt-BR');
  }

  totalLancamentos() {
    const dataSource = this.dataSource.data;
    const valores = dataSource.map(item => item.valor);
    const totalSomado = valores.reduce((acumulador, valor) => acumulador + valor, 0);

    return this.formatarMoeda(totalSomado);
  }
}
