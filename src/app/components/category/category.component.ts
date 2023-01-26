import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubCate } from 'src/app/models/sub-cate';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  listOfCategories: any = []
  AddCateForm: FormGroup;
  newCategory: any = {}
  deletedCate: any = {}
  editecate: any = {}
  listOfSubcat:any=[]
   subcat={}
  constructor(private api: ApiService,private formBuilder: FormBuilder) {
    this.AddCateForm = formBuilder.group({
      CatArName: (['', [Validators.required, Validators.pattern('[A-Za-z ]+')]]),
      CatEnName: (['', [Validators.required, Validators.pattern('[A-Za-z ]+')]]),
      CatArSize: (['', [Validators.required]]),
      CatEnSize: (['', [Validators.required]]),
      SubCategorieID:formBuilder.array([formBuilder.control('')])

    } )  
  }
  ngOnInit() {
    this.getAllCategories()
    this.getAllSubCate()
  }
  get CatEnSize(){
    return  this.AddCateForm.get('CatEnSize') as FormArray
   }
  get SubCategorieID(){
   return  this.AddCateForm.get('SubCategorieID') as FormArray
  }
  get CatArSize(){
    return  this.AddCateForm.get('CatArSize') as FormArray
   }
  
  // createMemberGroup(member:SubCate){
  //   return this.formBuilder.group({
  //     ...member,
  //     SubCat: [this.formBuilder.control('')],
  //   });
  // }
  addSubCate(){
    this.SubCategorieID.push(this.formBuilder.control(''));
  }
  addArSize(){
    this.CatArSize.push(this.formBuilder.control(''));
  }
  addEnSize(){
    this.CatEnSize.push(this.formBuilder.control(''));
  }
  getAllCategories() {
    this.api.get('Categorie').subscribe(data => {
      this.listOfCategories = data
      console.log(data)
    })
  }
  AddCategory() {
    
    let { CatArName, CatEnName, CatArSize, CatEnSize ,SubCategorieID} = this.AddCateForm.value
    SubCategorieID={
      "SubCat":SubCategorieID
    }
    this.newCategory = { CatArName, CatEnName, CatArSize, CatEnSize ,SubCategorieID}
    console.log(   this.newCategory)
    this.api.post('Categorie', this.newCategory).subscribe({
      next: (data) => {
        console.log(data)
        this. ngOnInit()
       
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  DeleteCate() {
    this.api.delete(`Categorie/${this.deletedCate._id}`).subscribe({
      next: (data) => {
        this.getAllCategories()

      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  Edite(CatArName: string, CatEnName: string, CatArSize: string, CatEnSize: string) {
  
    this.editecate = { ...this.editecate, CatArName, CatEnName, CatArSize, CatEnSize }
    this.api.put(`Categorie/${this.editecate._id}`, this.editecate).subscribe({
      next: (data) => {
        this.getAllCategories()
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
