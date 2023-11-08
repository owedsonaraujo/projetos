import { Component, OnInit } from '@angular/core';
import { LancamentosService } from '../services/lancamentos.service';
import { ExtratoDTO } from '../dto/ExtratoDTO';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css']
})
export class LancamentosComponent implements OnInit {

  constructor(private lancamentos: LancamentosService) { }

  ngOnInit() {
  }

  btnIncluir_click(){
    this.lancamentos.alterarIncluir(null);
  }
}
