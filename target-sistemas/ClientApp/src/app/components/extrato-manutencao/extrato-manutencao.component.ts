import { Component, OnInit, Inject, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { LancamentosService } from 'src/app/services/lancamentos.service';
import { ExtratoDTO } from 'src/app/dto/ExtratoDTO';

@Component({
  selector: 'app-extrato-manutencao',
  templateUrl: './extrato-manutencao.component.html',
  styleUrls: ['./extrato-manutencao.component.css'],
})
export class ExtratoManutencaoComponent implements OnInit, AfterViewInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ExtratoManutencaoComponent>,
    private lancamentos: LancamentosService
    , private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadData();

    this.cdr.detectChanges();
  }

  dataSend: any = {
    descricao: '',
    valor: 0,
    avulso: true,
    status: 'Válido',
  };

  isUpdate: boolean = false;

  loadData() {

    const dataAtual = new Date();

    if (this.data) {
      this.isUpdate = true;

      this.dataSend = {
        descricao: this.data.descricao,
        valor: this.data.valor,
        avulso: this.data.avulso,
        status: this.data.status,
        data: this.data.data
      };

      console.log(this.dataSend);
    }
  }

  btnIncluir_click() {
    this.lancamentos.salvar(this.dataSend)?.subscribe(
      (response: any) => {
        this.lancamentos.added_call(response as ExtratoDTO);
        this.dialogRef.close();
      },
      (error: any) => {
      }
    );
  }

  btnAtualizar_click() {
    this.lancamentos.update(this.data.id, this.dataSend.valor, this.dataSend.data)?.subscribe(
      (response: any) => {
        this.lancamentos.updated_call(response as ExtratoDTO);
        this.dialogRef.close();
      },
      (error: any) => {
      }
    );
  }
}
