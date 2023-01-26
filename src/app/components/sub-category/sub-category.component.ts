import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent {

  AddSubCateForm: FormGroup;
  newSubCategory: any = {}
  deletedSubCate: any = {}
  editeSubcate: any = {}
  listOfSubcat:any=[]
   subcat={}
  constructor(private api: ApiService,private formBuilder: FormBuilder) {
    this.AddSubCateForm = formBuilder.group({
      EnsubCatName: (['', [Validators.required, Validators.pattern('[A-Za-z ]+')]]),
      ArsubCatName: (['', [Validators.required, Validators.pattern('[A-Za-z ]+')]]),

    } )  
  }
  ngOnInit() {
   
    this.getAllSubCate()
  }

  
 
  AddSubCategory() {
    
    let { ArsubCatName, EnsubCatName} = this.AddSubCateForm.value
  
    this.newSubCategory = { ArsubCatName, EnsubCatName}
    console.log(   this.newSubCategory)
    this.api.post('SubCategorie', this.newSubCategory).subscribe({
      next: (data) => {
        console.log(data)
        this.ngOnInit()
       
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  DeleteSubCate() {
    this.api.delete(`SubCategorie/${this.deletedSubCate._id}`).subscribe({
      next: (data) => {
        this.ngOnInit()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  Edite(ArsubCatName: string, EnsubCatName: string) {
  
    this.editeSubcate = { ...this.editeSubcate, ArsubCatName, EnsubCatName}
    this.api.put(`SubCategorie/${this.editeSubcate._id}`, this.editeSubcate).subscribe({
      next: (data) => {
        this.ngOnInit()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getAllSubCate(){
    this.api.get('SubCategorie').subscribe(data => {
      this.listOfSubcat = data
      console.log(data)
    })
  }



}
