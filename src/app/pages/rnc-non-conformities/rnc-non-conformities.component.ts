import { Archive, NonConformitieRegister, Occurrence } from './../../models/non-conformitie-register';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { NonConformitieService } from 'src/app/services/non-conformitie.service';
import { SetorService } from 'src/app/services/setor.service';
import { Setor } from 'src/app/models/setor.model';
import { MatStepper } from '@angular/material/stepper';
import { Subject } from 'rxjs/internal/Subject';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, ErrorStateMatcher } from '@angular/material/core';
import { OccurrenceRisk } from 'src/app/models/occurence-risk.model';
import { Types } from 'src/app/models/types.model';
import { TypesClassification } from 'src/app/models/types-classification.model';
import { Classification } from 'src/app/models/classification.model';

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
    this._occurrenceService.findTypes()
      .subscribe(types => {
        this.types = types;
      }, error => {
        this._alert.show('Erro', error.error, 'error');
      })
  }

  findAllTypesClassification() {
    this._occurrenceService.findTypeOccurrences()
      .subscribe(findTypeOccurrences => {
        this.typesClassification = findTypeOccurrences;
      }, error => {
        this._alert.show('Erro', error.error, 'error');
      })
  }

  findAllClassifications() {
    this._occurrenceService.findClassifications()
      .subscribe(findClassifications => {
        this.Classifications = findClassifications;
      }, error => {
        this._alert.show('Erro', error.error, 'error');
      })
  }


  principal: FormGroup;
  description: FormGroup;
  acaoImediata: FormGroup;
  evidence: FormGroup;
  occurrences: { id: string, typeNonComplianceId: string, description: string, nameNonCompliance: string, archives: Archive[] }[] = [];
  isFormDisabled: boolean;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  @ViewChild('stepper') stepper: MatStepper;
  peopleInput$ = new Subject<string>();
  matcher = new MyErrorStateMatcher();
  public uploader: FileUploader;
  response: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _alert: AlertComponent,
    private _occurrenceService: NonConformitieService,
    private _setorService: SetorService) {
    this.uploader = new FileUploader({
      url: "teste",
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });
    this.response = '';

    this.uploader.response.subscribe(res => this.response = res);
  }

  ngOnInit(): void {
    this.findAllSetor();
    this.findAllOccurrences();
    this.createForm();
    this.findAllTypesClassification();
    this.findAllTypes();
    this.findAllClassifications();
  }

  abrirAnexos() {
    document.getElementById('anexo').click();
  }

  uploadFile(event: InputEvent) {
    const fileUpload = event[0];

    const reader = new FileReader();
    reader.readAsDataURL(fileUpload);

    const occurrenceDescription = this.evidence.get("description").value;

    if (!occurrenceDescription) {
      this._alert.show('Aviso', 'Necessário informar qual ocorrência!', 'warning');
      return;
    }

    const occurrences: Occurrence[] = this.principal.get("occurrences").value;

    reader.onload = () => {
      let base64 = reader.result.toString();
      base64 = base64.slice(base64.indexOf(',') + 1);

      const occurrence: Occurrence = Array.from(occurrences).filter((occur: Occurrence) => occur.description == occurrenceDescription)[0];

      if (!occurrence.archives)
        occurrence.archives = [];

      const archive: any = { file: base64, fileName: fileUpload.name, fileType: fileUpload.type };


      this.archives.push({ ...archive, occurrenceDescription: occurrence.description, size: fileUpload.size });
      occurrence.archives.push(archive);
    }
  }

  removeFile(item: any) {
    if (item) {
      const occurrenceDescription = this.evidence.get("description").value;
      const occurrences: Occurrence[] = this.principal.get("occurrences").value;
      const occurrence: Occurrence = Array.from(occurrences).filter((occur: Occurrence) => occur.description == occurrenceDescription)[0];

      const fileName = item.fileName;

      if (occurrence && occurrence.archives) {
        this.archives = this.archives.filter(f => f.fileName !== fileName);
        occurrence.archives = occurrence.archives.filter(f => f.fileName !== fileName);
      }
    }
  }

  removeFileModal(item: any) {
    this._alert.confirmacao("Confirmação", "Deseja remover esse anexo?", "Confirmar", "O anexo foi removido.", "Removido")
      .then(() => {
        this.removeFile(item);
      })
      .catch(() => false);
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

    this.evidence = this._formBuilder.group({
      archive: [null],
      description: [null]
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

  validateEvidence() {
    this.evidence.markAllAsTouched();
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
    if (this.principal.valid && this.description.valid && this.acaoImediata.valid && this.evidence.valid) {
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

      this._occurrenceService.save(occurrence)
        .subscribe(() => {
          this._alert.show('Cadastro', 'Ocorrência cadastrada com sucesso!', 'success');
          //this.stepper.reset();
          setTimeout(() => {window.location.reload();}, 1500);
          //sessionStorage
        }, error => {
          this._alert.show('Cadastro', error.error, 'error');
        });
    } else {
      this._alert.show('Aviso', 'Favor preencher os campos obrigatórios!', 'warning');
    }
  }



  findAllOccurrences() {
    this._occurrenceService.findAllOccurrence()
      .subscribe(occurrences => {
        this.occurrences = occurrences;
      })
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
    this._setorService.getAllSetor()
      .subscribe(setores => {
        this.setores = setores;
      }, erro => {
        this._alert.show('Erro', erro.error, 'error');
      })
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

