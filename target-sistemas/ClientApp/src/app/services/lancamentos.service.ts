import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExtratoManutencaoComponent } from '../components/extrato-manutencao/extrato-manutencao.component';
import { ExtratoDTO } from '../dto/ExtratoDTO';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  added: EventEmitter<ExtratoDTO> = new EventEmitter<ExtratoDTO>();
  cancelado: EventEmitter<ExtratoDTO> = new EventEmitter<ExtratoDTO>();
  updated: EventEmitter<ExtratoDTO> = new EventEmitter<ExtratoDTO>();

  added_call(extrato: ExtratoDTO){
    this.added.emit(extrato);
  }

  updated_call(extrato: ExtratoDTO){
    this.updated.emit(extrato);
  }

  cancelado_call(extrato: ExtratoDTO){
    this.cancelado.emit(extrato);
  }

  constructor(private http: HttpClient, private matDialog: MatDialog) { }

  getLancamentos(startDate: Date, endDate: Date) {
    var url = `${environment.endpoint}/extrato/list?startDate=${startDate.toDateString()}&endDate=${endDate.toDateString()}`;
    return this.http.get<any>(url);
  }

  alterarIncluir(data: ExtratoDTO | null) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    dialogConfig.maxWidth = '80vw'; // 80% da largura da viewport
    dialogConfig.maxHeight = '80vh'; // 80% da altura da viewport

    const dialogRef = this.matDialog.open(ExtratoManutencaoComponent, dialogConfig);

    return dialogRef;
  }

  salvar(data: any) {

    let form_data: FormData = new FormData();

    form_data.append('Descricao', data.descricao);
    form_data.append('Valor', data.valor.toString());
    form_data.append('Avulso', (data.avulso == 'true' ? true : false).toString());
    form_data.append('Status', data.status);

    var url = `${environment.endpoint}/extrato`;

    return this.http.post<any>(url, form_data);
  }

  update(id: string, valor: number, data: Date) {

    let form_data: FormData = new FormData();
    form_data.append('Valor', valor.toString());
    form_data.append('Data', data.toDateString());

    var url = `${environment.endpoint}/extrato/${id}`;
    return this.http.put<any>(url, form_data);
  }

  cancelar(id: string) {
    var url = `${environment.endpoint}/extrato/${id}/cancelar`;
    return this.http.put<any>(url, null);
  }
}
