import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import {
  addDays,
  addHours,
  endOfDay,
  endOfMonth,
  isSameDay,
  isSameMonth,
  startOfDay,
  subDays,
} from 'date-fns';
import { Subject } from 'rxjs';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { Setor } from 'src/app/models/setor.model';
import { NonConformitieService } from 'src/app/services/non-conformitie.service';
import { SetorService } from 'src/app/services/setor.service';
import { RncChartModalComponent } from '../authentication/rnc-login/components/rnc-chart-modal/rnc-chart-modal.component';
import { NonConformitieDetail } from './../../models/non-conformitie-detail';
import { ReportService } from './../../services/report.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-rnc-report-analysis',
  templateUrl: './rnc-report-analysis.component.html',
  styleUrls: ['./rnc-report-analysis.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RncReportAnalysisComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  locale: string = 'pt';
  public weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  CalendarView = CalendarView;
  report: string;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-external-link"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  setores: Setor[] = [];
  activeDayIsOpen: boolean = true;
  setorForm: FormGroup;
  occurrences: NonConformitieDetail[] = [];


  constructor(
    private modal: NgbModal,
    private _reportService: ReportService,
    private _alert: AlertComponent,
    private _setorService: SetorService,
    private _occurrencesService: NonConformitieService,
    private _fb: FormBuilder,
    private _http: HttpClient,
    private dialog: MatDialog) {
    registerLocaleData(localePt);
  }

  ngOnInit() {
    this.getAllSetor();
    this.createForm();
   }


  createForm() {
    this.setorForm = this._fb.group({
      setor: [null, Validators.required]
    });
  }

  getAllSetor(){
    this._setorService.getAllSetor()
      .subscribe(setores => {
        this.setores = setores;
        this.setorForm.get('setor').setValue(setores[0].id);
        this.findOccurrenceForReport();
      });
  }

  findReportById(occurrencesRegisterId: string) {
    this._reportService.findReportById(occurrencesRegisterId)
      .subscribe(report => {
        this.report = report
      // }, error => {
       // this._alert.show('Erro', error.error, 'error');
      })
  }

  sendReportEmailById(occurrencesRegisterId: string) {
    this._reportService.sendReportEmailById(occurrencesRegisterId)
      .subscribe(() => {
        this._alert.show('Enviado', 'E-mail encaminhado com sucesso!', 'success');
      // }, error => {
      //   this._alert.show('Erro', error.error, 'error');
      })
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.findReportById(event.id.toString());
    this.openModalShow();

  }

  openModalShow() {
    let dialogRef = this.dialog.open(RncChartModalComponent);
    dialogRef.afterClosed();
  }

  openModalAny() {
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  setEvents(occurrences: NonConformitieDetail[]) {
    this.events = [];
    this.events.push({
      start: startOfDay(new Date("2023-06-15")),
      end: startOfDay(new Date("2023-06-15")),
      title: "Coleta",
      id: "1",
      color: colors.red,
      actions: this.actions
    }, {
      start: startOfDay(new Date("2023-06-15")),
      end: startOfDay(new Date("2023-06-15")),
      title: "Microbiologia",
      id: "2",
      color: colors.red,
      actions: this.actions
    },{
      start: startOfDay(new Date("2023-06-15")),
      end: startOfDay(new Date("2023-06-15")),
      title: "Parasitologia",
      id: "3",
      color: colors.red,
      actions: this.actions
    }, {
      start: startOfDay(new Date("2023-06-14")),
      end: startOfDay(new Date("2023-06-14")),
      title: "Microbilogia",
      id: "4",
      color: colors.red,
      actions: this.actions
    },{
      start: startOfDay(new Date("2023-06-10")),
      end: startOfDay(new Date("2023-06-10")),
      title: "Microbilogia",
      id: "5",
      color: colors.red,
      actions: this.actions
    }, {
      start: startOfDay(new Date("2023-06-10")),
      end: startOfDay(new Date("2023-06-10")),
      title: "Microbilogia",
      id: "6",
      color: colors.red,
      actions: this.actions
    });

    this.refresh.next();
  }

  findOccurrenceForReport(){
    this._occurrencesService.findOccurrenceForReport(new Date(this.viewDate).toISOString().substr(0,10), this.setorForm.value.setor)
      .subscribe(res => {
        console.log(res);
        this.setEvents(res);
      })
  }


}
