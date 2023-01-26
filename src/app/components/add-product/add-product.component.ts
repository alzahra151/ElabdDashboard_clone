import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';
import { ProductsService } from 'src/app/services/products.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  itemStringsLeft = [
    'Windstorm',
    'Bombasto',
    'Magneta',
    'Tornado'
  ];
  AddProductForm: FormGroup
  exellFileForm: FormGroup;
  ExcelData: any
  listOfCat: any
  listOfSubcat: any
  newProduct:Product={} as Product
  AvailableSelectSubCat=true

  constructor( formBulider: FormBuilder, private api: ApiService) {
    this.AddProductForm = formBulider.group({

      EnName: (['', [Validators.required, Validators.pattern('[A-Za-z ]+')]]),
      ArName: (['', [Validators.required, Validators.pattern('[\u0621-\u064A ]+')]]),
      Image: (['', [Validators.required]]),
      Price: (['', [Validators.required, Validators.pattern('[0-9]+')]]),
      Amount: (['', [Validators.required, Validators.pattern('[0-9]+')]]),
      CategorieID: (['', [Validators.required]]),
      SubCategID: (['', [Validators.required]])

    })

  


  this.exellFileForm = formBulider.group({
      ExcelDataInput: (['', [Validators.required]]),
    })
  }

  get ExcelDataInput() {
    return this.exellFileForm.get('ExcelDataInput')
  }

  get EnName() {
    return this.AddProductForm.get('EnName')
  }
  get ArName() {
    return this.AddProductForm.get('ArName')
  }

  get Image() {
    return this.AddProductForm.get('Image')
  }
  get Price() {
    return this.AddProductForm.get('Price')
  }
  get CategorieID() {
    return this.AddProductForm.get('CategorieID')
  }
  get SubCategID() {
    return this.AddProductForm.get('SubCategID')
  }
  get Amount() {
    return this.AddProductForm.get('Amount')
  }
  readExcel(event: any) {
    let file = event.target.files[0]
    let fileReader = new FileReader()
    fileReader.readAsBinaryString(file)
    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary' })
      var sheetNames = workBook.SheetNames
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])
      console.log(this.ExcelData);
    }
  }


AddProductExcel(){
  for (const item of this.ExcelData) {
    this.api.post('Product',item).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
  ngOnInit(): void {
    this.GetAllCat()
  }
  GetAllCat() {
    this.api.get('Categorie').subscribe({
      next: (data) => {
        this.listOfCat = data


      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  GetAllSubCat(id : string) {
   const selectCat=this.listOfCat.filter((item : any)=> item._id === id)
   this.listOfSubcat=selectCat[0].SubCategorieID
  }
  AddProduct(){
    let {EnName,ArName,Price,CategorieID,SubCategID,Amount,Image}=this.AddProductForm.value
  
    SubCategID = SubCategID===''? null : SubCategID

    
    this.newProduct={EnName,ArName,Price,CategorieID,SubCategID,Amount,Image,NumberOfCarts:0,NumberOfFav:0}
    this.api.post('Product',this.newProduct).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    })


  }
  SelectSubCat(event:any){
   let id =  event.target.value
    this.GetAllSubCat(id)
    
  }
}
