import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, MatStepperModule } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map, min, shareReplay } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LoanService } from '../../../services/loan.service';
import { product } from '../../../config/models/product';
import { ClientComponent } from "../client/client.component";

@Component({
  selector: 'app-new-loan',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDatepickerModule,
    ClientComponent
],
  templateUrl: './new-loan.component.html',
  styleUrl: './new-loan.component.css'
})
export class NewLoanComponent implements OnInit {
  datepicker: any
  loanDataForm!: FormGroup;
  ClientData!: FormGroup;
  guarantorData!: FormGroup;
  organizationData!: FormGroup;
  stepperOrientation: Observable<StepperOrientation>;
  products$!: Observable<product[]>;
  selectedProduct!: product;
  tenor!: number;
  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private service: LoanService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));


  }
  ngOnInit(): void {

    this.loanDataForm = this._formBuilder.group({
      loanNumber: [{ value: '', disabled: true }],
      loanState: [{ value: '', disabled: true }, Validators.required],
      productType: ['', Validators.required],
      currency: [{ value: '', disabled: true }],
      loanValue: [{ value: '', disabled: true }, Validators.required],
      loanDuration: [{ value: '', disabled: true }, Validators.required],
      totalLoanDuration: [{ value: '', disabled: true }, Validators.required]
    });
    this.getProducts()
    this.handleProductTypeChanges()
    this.handleLoanDurayionChange()
  }
  getProducts() {
    this.products$ = this.service.getProducts().pipe(
      map(res => {
        return (res as any).result
      }),
      shareReplay(1)
    )
  }
  get currency() {
    return this.loanDataForm.get('currency');
  }
  get totalLoanDuration() {
    return this.loanDataForm.get('totalLoanDuration');
  }
  get loanValue() {
    return this.loanDataForm.get('loanValue');
  }
  get loanDuration() {
    return this.loanDataForm.get('loanDuration');
  }

  handleProductTypeChanges() {
    this.loanDataForm.get('productType')?.valueChanges.subscribe(value => {
      this.selectedProduct = value;
      this.currency?.patchValue('EGP');
      this.loanValue?.addValidators([Validators.min(value.minAmt), Validators.max(value.maxAmt)])
      this.loanValue?.enable();
      this.loanDuration?.enable();
      this.tenor = value.tenor;
      console.log(value);
      
    });
  }
  handleLoanDurayionChange() {
    this.loanDataForm.get('loanDuration')?.valueChanges.subscribe(value => {
      (value ==="")? this.totalLoanDuration?.patchValue("") : this.totalLoanDuration?.patchValue(parseInt(value) / this.tenor);
    })
  }
}
