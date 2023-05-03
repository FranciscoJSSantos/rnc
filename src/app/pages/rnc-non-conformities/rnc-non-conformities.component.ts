import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatStepper } from '@angular/material/stepper';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { Subject } from 'rxjs/internal/Subject';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { Classification } from 'src/app/models/classification.model';
import { OccurrenceRisk } from 'src/app/models/occurence-risk.model';
import { Setor } from 'src/app/models/setor.model';
import { TypesClassification } from 'src/app/models/types-classification.model';
import { Types } from 'src/app/models/types.model';
import { NonConformitieService } from 'src/app/services/non-conformitie.service';
import { SetorService } from 'src/app/services/setor.service';
import { Archive, NonConformitieRegister, Occurrence } from './../../models/non-conformitie-register';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/yyyy',
  },
  display: {
    dateInput: 'DD/MM/yyyy',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'rnc-non-conformities',
  templateUrl: './rnc-non-conformities.component.html',
  styleUrls: ['./rnc-non-conformities.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
})
export class RncNonConformitiesComponent implements OnInit {

  setores: Setor[] = [];
  risk: OccurrenceRisk[] = [];
  types: Types[] = [];
  typesClassification: TypesClassification[] = [];
  Classifications: Classification[] = [];
  archives: any[] = [];

  findAllTypes() {
    // this._occurrenceService.findTypes()
    //   .subscribe(types => {
        this.types = [
          {
            "id": "1",
            "name": "Analítica"
          },
          {
            "id": "2",
            "name": "Pré-Analítica"
          },
          {
            "id": "3",
            "name": "Pós-Analítica"
          }
        ];
      // }, error => {
      //   this._alert.show('Erro', error.error, 'error');
      // })
  }

  findAllTypesClassification() {
    // this._occurrenceService.findTypeOccurrences()
    //   .subscribe(findTypeOccurrences => {
        this.typesClassification = [
          {
            "id": "1",
            "description": "De Processo",
            "isExisting": true
          },
          {
            "id": "2",
            "description": "De Auditoria",
            "isExisting": true
          },
          {
            "id": "3",
            "description": "Reclamação de cliente",
            "isExisting": true
          },
          {
            "id": "4",
            "description": "De Indicador",
            "isExisting": true
          },
          {
            "id": "5",
            "description": "Análise de Risco",
            "isExisting": true
          }
        ];
      // }, error => {
      //   this._alert.show('Erro', error.error, 'error');
      // })
  }

  findAllClassifications() {
    // this._occurrenceService.findClassifications()
    //   .subscribe(findClassifications => {
        this.Classifications = [
          {
            "id": "1",
            "name": "Near miss"
          },
          {
            "id": "2",
            "name": "Evento adverso leve"
          },
          {
            "id": "3",
            "name": "Evento adverso moderado"
          },
          {
            "id": "4",
            "name": "Evento adverso grave"
          },
          {
            "id": "5",
            "name": "Evento sem dano"
          },
          {
            "id": "6",
            "name": "Sem risco"
          }
        ]
        ;
      // }, error => {
      //   this._alert.show('Erro', error.error, 'error');
      // })
  }


  principal: FormGroup;
  description: FormGroup;
  acaoImediata: FormGroup;
  evidence: FormGroup;
  occurrences: { id: string, typeNonComplianceId: string, description: string, nameNonCompliance: string}[] = [];
  isFormDisabled: boolean;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  @ViewChild('stepper') stepper: MatStepper;
  peopleInput$ = new Subject<string>();
  matcher = new MyErrorStateMatcher();

  response: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _alert: AlertComponent,
    private _occurrenceService: NonConformitieService,
    private _setorService: SetorService) {

    this.response = '';

  }

  ngOnInit(): void {
    this.findAllSetor();
    this.findAllOccurrences();
    this.createForm();
    this.findAllTypesClassification();
    this.findAllTypes();
    this.findAllClassifications();
  }

  setDate(value: string) {
    if (value && value.length === 10) {
      let ano = value.substring(6);
      let mes = value.substring(3, 5);
      let dia = value.substring(0, 2);
      this.description.get('registerDate').setValue(new Date(+ano, (+mes) - 1, +dia));
    } else {
      this.description.get('registerDate').setValue(value);
    }
  }

  createForm() {
    this.principal = this._formBuilder.group({
      occurrences: this._formBuilder.array([], Validators.required),
      occurrenceTypeId: [null, Validators.required],
      occurrenceClassification: [null, Validators.required],
    });

    this.description = this._formBuilder.group({
      setor: [null],
      peopleInvolved: [null],
      moreInformation: [null],
      registerHour: [null, Validators.required],
      registerDate: [null, Validators.required]
    });

    this.acaoImediata = this._formBuilder.group({
      immediateAction: [null, Validators.required]
    });
  }

  validatePrincipal() {
    this.principal.markAllAsTouched();
  }

  validateDescription() {
    this.description.markAllAsTouched();
  }

  validarCampo() {
    return (this.description.get('registerDate').dirty || this.description.get('registerDate').touched) && !this.description.get('registerDate').valid;
  }

  isMobile(): boolean {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return true;
    }
    return false;
  }

  saveOccurrence() {
    if (this.principal.valid && this.description.valid && this.acaoImediata.valid) {
      let occurrence: NonConformitieRegister = {
        occurrences: this.validateOC(),
        setor: this.description.value.setor,
        peopleInvolved: this.description.value.peopleInvolved,
        moreInformation: this.description.value.moreInformation,
        registerHour: this.description.value.registerHour,
        registerDate: this.description.value.registerDate,
        immediateAction: this.acaoImediata.value.immediateAction,
        occurrenceTypeId: this.principal.value.occurrenceTypeId,
        occurrenceClassification: this.principal.value.occurrenceClassification,// TODO: Ajustar quando sair a tarefa desse campo
      }

      // this._occurrenceService.save(occurrence)
      //   .subscribe(() => {
          this._alert.show('Cadastro', 'Ocorrência cadastrada com sucesso!', 'success');
          //this.stepper.reset();
          setTimeout(() => {window.location.reload();}, 1500);
          //sessionStorage
        // }, error => {
        //   this._alert.show('Cadastro', error.error, 'error');
        // });
    } else {
      this._alert.show('Aviso', 'Favor preencher os campos obrigatórios!', 'warning');
    }
  }


 findAllOccurrences() {
    // this._occurrenceService.findAllOccurrence()
    //   .subscribe(occurrences => {
        this.occurrences = [
          {
            "id": "1",
            "typeNonComplianceId": "coleta",
            "description": "dsada",
            "nameNonCompliance": "dsada"
          },
        ];
      // })
  }

  setValidators(occurrenceTypeId) {
    switch (occurrenceTypeId) {
      case 'Analitica':
        (this.principal.get('occurrencesAnalitica') as FormArray).setValidators([Validators.required, Validators.minLength(1)]);
        this.principal.get('occurrencesAnalitica').updateValueAndValidity();
        break;
      case 'PreAnalitica':
        this.principal.get('occurrencesPreAnalitica').setValidators([Validators.required, Validators.minLength(1)]);
        this.principal.get('occurrencesPreAnalitica').updateValueAndValidity();
        break;
      default:
        this.principal.get('occurrencesPosAnalitica').setValidators([Validators.required, Validators.minLength(1)]);
        this.principal.get('occurrencesPosAnalitica').updateValueAndValidity();
        break;
    }
  }

  pushOccurrences(formArray: FormArray, obj) {
    if (obj.hasOwnProperty('id')) {
      formArray.push(this._formBuilder.group(obj));
    } else {
      formArray.push(this._formBuilder.group({
        id: null,
        description: obj.description
      }));
    }
  }

  addEvent(obj) {
    this.pushOccurrences((this.principal.get('occurrences') as FormArray), obj);
  }

  findAllSetor() {
    // this._setorService.getAllSetor()
    //   .subscribe(setores => {
        this.setores = [
          {
            "id": "1",
            "name": "Coleta"
          },
          {
            "id": "2",
            "name": "Microbiologia"
          },
          {
            "id": "3",
            "name": "Parasitologia"
          },
          {
            "id": "4",
            "name": "Imuno-hematologia"
          },
          {
            "id": "5",
            "name": "Triagem"
          },
          {
            "id": "6",
            "name": "Recepção"
          },
          {
            "id": "7",
            "name": "Bioquímica"
          },
          {
            "id": "8",
            "name": "Urinálise"
          },
          {
            "id": "9",
            "name": "Administrativo"
          },
          {
            "id": "10",
            "name": "Assistencial"
          },
          {
            "id": "11",
            "name": "Prestadores de serviço"
          },
          {
            "id": "12",
            "name": "Fornecedores"
          }
        ]
        ;
      // }, erro => {
      //   this._alert.show('Erro', erro.error, 'error');
      // })
  }

  removeOC(obj, occurrenceTypeId: number) {
    let formArray: FormArray;
    formArray = (this.principal.get('occurrences') as FormArray);
    formArray.removeAt(formArray.controls.findIndex(item => item.value.description === obj.value.description));
  }

  refactOccurrences(value: any) {
    switch (value) {
      case 'Analitica':
        (this.principal.get('occurrencesAnalitica') as FormArray).clear();
        this.principal.get('occurrencesAnalitica').clearValidators();
        this.principal.get('occurrencesAnalitica').updateValueAndValidity();
        break;
      case 'PreAnalitica':
        (this.principal.get('occurrencesPreAnalitica') as FormArray).clear();
        this.principal.get('occurrencesPreAnalitica').clearValidators();
        this.principal.get('occurrencesPreAnalitica').updateValueAndValidity();
        break;
      default:
        (this.principal.get('occurrencesPosAnalitica') as FormArray).clear();
        this.principal.get('occurrencesPosAnalitica').clearValidators();
        this.principal.get('occurrencesPosAnalitica').updateValueAndValidity();
        break;
    }
  }

  resetOcurrences() {
    (this.principal.get('occurrences') as FormArray).clear();
  }

  validateOC() {
    if ((this.principal.get('occurrences') as FormArray).length) {
      return this.principal.value.occurrences;
    }

    return null;
  };
}

