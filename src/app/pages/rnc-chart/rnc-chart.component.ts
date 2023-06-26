import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ChartService } from 'src/app/services/chart.service';
import { AlertComponent } from './../../components/alert/alert.component';
import { Setor } from './../../models/setor.model';
import { SetorService } from './../../services/setor.service';

@Component({
  selector: 'app-rnc-chart',
  templateUrl: './rnc-chart.component.html',
  styleUrls: ['./rnc-chart.component.css']
})
export class RncChartComponent implements OnInit {

  chartForm: FormGroup;
  setores: Setor[] = [];
  chart: string;
  meses: {id: number, name: string}[] = [
    {
      id: 1,
      name: 'Janeiro'
    },
    {
      id: 2,
      name: 'Fevereiro'
    },
    {
      id: 3,
      name: 'Março'
    },
    {
      id: 4,
      name: 'Abril'
    },
    {
      id: 5,
      name: 'Maio'
    },
    {
      id: 6,
      name: 'Junho'
    },
    {
      id: 7,
      name: 'Julho'
    },
    {
      id: 8,
      name: 'Agosto'
    },
    {
      id: 9,
      name: 'Setembro'
    },
    {
      id: 10,
      name: 'Outubro'
    },
    {
      id: 11,
      name: 'Novembro'
    },
    {
      id: 12,
      name: 'Dezembro'
    }
  ];

  constructor(
    private _alert: AlertComponent,
    private _chartService: ChartService,
    private _setorService: SetorService,
    private sanitizer: DomSanitizer,
    private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllSetor();
    this.createForm();
  }

  getAllSetor(){
    this._setorService.getAllSetor()
      .subscribe(setores => {
        this.setores = setores;
      });
  }

  createForm() {
    this.chartForm = this._fb.group({
      setor: [null, Validators.required],
      month: [null, Validators.required]
    });
  }

  urlPdf: String = "../assets/grafico.pdf";

  findReport() {
    if(this.chartForm.valid) {
      this._chartService.findChart(+this.chartForm.value.setor, +this.chartForm.value.month)
        .subscribe(chartBase64 => {
          this.createForm();
          let pdfWindow = window.open("")
            pdfWindow.document.write(
              `<iframe width='100%' height='100%' src=${this.urlPdf} />`)
        })
    } else {
      this._alert.show('Inválido','Favor preencher os campos obrigatórios!', 'warning');
    }
  }

  sendChartEmailById() {
    if(this.chartForm.valid) {
      this._chartService.sendChartEmailById(+this.chartForm.value.setor, +this.chartForm.value.month)
        .subscribe(() => {
          this.createForm();
          this._alert.show('Sucesso', 'Gráfico encaminhado com sucesso para seu e-mail!', 'success');
        }, erro => {
          this._alert.show('Erro','Não foi possível encaminhar e-mail!', 'error');
        })
    } else {
      this._alert.show('Inválido','Favor preencher os campos obrigatórios!', 'warning');
    }
  }
}
