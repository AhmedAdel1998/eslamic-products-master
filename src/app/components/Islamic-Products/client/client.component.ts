import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ClientService } from '../../../services/client.service';
import { client } from '../../../config/models/client';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientComponent implements OnInit {
  [x: string]: any;
  idform!: FormGroup;
  clientForm!:FormGroup;
  client: boolean = false;
  clientData!: client;
  newClient = false;
  cities!:any;
  regions!:any;
  villages!:any;
  nonvalid:any;
  constructor(private _formBuilder: FormBuilder, private service: ClientService) { }
  ngOnInit(): void {
    this.idform = this._formBuilder.group({
      idNo: ['', [Validators.required, Validators.maxLength(14), Validators.minLength(14)]],
      clientName: '', 
    }
  )
    this.clientForm = this._formBuilder.group({
      idNumber: "",
      fullName: "",
      idIssueDate: "",
      userType: null,
      titleCode: null,
      rstName: "",
      ndName: "",
      rdName: "",
      stName: "",
      nickName: "",
      birthDate: "",
      sex: null,
      idCountry: null,
      address1: "",
      cityCode1: null,
      cityName1: "",
      regionCode1: null,
      regionName1: "",
      villageCode1: null,
      villageName1: "",
      street1: "",
      buildingNo1: "",
      same: null,
      address2: "",
      cityCode2: 12,
      cityName2: "",
      regionCode2: null,
      regionName2: "",
      villageCode2: null,
      villageName2: "",
      street2: "",
      buildingNo2: "",
      homeMark1: "",
      addTxt: "",
      homeMark2: " ",
      phoneNo1: "",
      phoneNo2: ""
    })
  }
  get idNo() {
    return this.idform.get('idNo');  
  }
  searchForClient() {
    if (this.idform.valid) {
      this.service.getUserData(this.idform.value).subscribe(res => {
        ((res as any).statusCode === 200) ? this.clientData = (res as any).result : (this.clientData = {} as client);
       
        if((res as any).statusCode === 800){
          this.enterNewClientData()
        }
        this.idform.patchValue({
          clientName: this.clientData.fullName
        })
        this.clientForm.setValue(this.clientData)
      })
    }
  }
  goToclientData() {
    this.newClient = true
    this.clientForm.controls['idNumber'].disable();
    this.clientForm.controls['titleCode'].disable();
    this.clientForm.controls['userType'].disable();
    this.clientForm.controls['sex'].disable();
    this.clientForm.controls['birthDate'].disable(); 
    this.clientForm.controls['idCountry'].disable(); 
  }

  enterNewClientData(){
    let x=this.idNo?.value
    let month=x[3]+x[4]
    let day=x[5]+x[6]
    if(month <="12" && month>="1" && day <="31" && day>="1" && x[0]=="2" || x[0]=="3" ){  
     
      this.clientForm.patchValue({
        idNumber:x,
        userType:1,
        idCountry:1, 
      })
      alert(' هذا العميل غير موجود')
      this.nonvalid=false
    }
     
    else{
      alert(' برجاء ادخال رقم قومي صحيح ')
      this.nonvalid=true;
    }
    
    if(x[0]=="2"){
      let y= x[0].replace("2","19")
      let birthdate= y + x[1] + x[2] + "-" + x[3] + x[4] + "-" + x[5] + x[6]
      this.clientForm.patchValue({
        birthDate:birthdate
      }
    )
    }
    if(x[0]=="3"){
      let y= x[0].replace("3","20")
      let birthdate= y + x[1] + x[2] + "-" + x[3] + x[4] + "-" + x[5] + x[6]
      this.clientForm.patchValue({
        birthDate:birthdate
      })
    }
    if(x[12]%2==0){
      this.clientForm.patchValue({
        sex:2,
        titleCode:2
      })
    }
    if(x[12]%2!=0){
      this.clientForm.patchValue({
        sex:1,
        titleCode:1
      })
    }
  }
}
