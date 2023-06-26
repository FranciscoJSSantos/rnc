import { Component, OnInit } from '@angular/core';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { ReportService } from 'src/app/services/report.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-rnc-chart-modal',
  templateUrl: './rnc-chart-modal.component.html',
  styleUrls: ['./rnc-chart-modal.component.css']
})
export class RncChartModalComponent implements OnInit {
  
  constructor(private _reportService: ReportService,
    private _alert: AlertComponent,) { }

  sendReportEmailById(occurrencesRegisterId: string) {
    this._reportService.sendReportEmailById(occurrencesRegisterId)
      .subscribe(() => {
        this._alert.show('Enviado', 'E-mail encaminhado com sucesso!', 'success');
      // }, error => {
      //   this._alert.show('Erro', error.error, 'error');
      })
  }

 

  ngOnInit(): void {
  }

}
