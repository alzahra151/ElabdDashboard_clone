import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-setting-product',
  templateUrl: './setting-product.component.html',
  styleUrls: ['./setting-product.component.scss']
})
export class SettingProductComponent implements OnInit {
  listOfProducts: any = []
  TotalPices = 0
  listOfSubCat: any = []
  listOfCat: any = []
  DeletedItem: Product = {} as Product
  EditItem: Product = {} as Product
  SelectedItem: Product = {} as Product
  waiting = true
  ProductInfo:any


  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.GetAllProducts()
    this.GetAllCat()
    this.GetAllSubCat()
    this.Setwaiting()
    this.GetAllProductsInfo()
  }

  GetAllProducts() {
    this.api.get('Product').subscribe({
      next: (data) => {
        this.listOfProducts = data
        console.log(data);


      },
      error: (err) => {
        console.log(err);
      }
    })
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

  GetAllSubCat() {
    this.api.get('SubCategorie').subscribe({
      next: (data) => {
        this.listOfSubCat = data
        console.log(this.listOfSubCat);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
	GetAllProductsInfo() {
		this.api.get('Product/ProductInfo').subscribe({
			next: (data) => {
				this.ProductInfo = data
				console.log(this.ProductInfo);


			},
			error: (err) => {
				console.log(err);
			}
		})
	}
  Edit(EnName: string, ArName: string, Price: number, Amount: number) {
    this.EditItem = { ...this.EditItem, EnName, ArName, Price, Amount }
    this.api.put(`Product/${this.EditItem._id}`, this.EditItem).subscribe({
      next: (data) => {
        this.ngOnInit()
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  Delete() {
    this.api.delete(`Product/${this.DeletedItem._id}`).subscribe({
      next: (data) => {
        this.ngOnInit()
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  Setwaiting() {
    setTimeout(() => {
      this.waiting = false
    }, 1000)
  }
}
