import { Component } from '@angular/core';
import { Order } from 'src/app/models/order';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
listOfOrders:any=[]
SelectedOrder:Order={} as Order
TotalQuantity=0
TotalPrice=0
waiting=true
constructor(private api:ApiService){

}
GetAllOrders(){
this.api.get('Order').subscribe({
  next : (data)=>{
    this.listOfOrders = data
   for (const item of this.listOfOrders) {
    for(const i of item.Products){
      this.TotalQuantity+=i.Quantity
      this.TotalPrice+=  i.Quantity * i.ProductID.Price
      
    }
    
   }
  },
  error:(err)=>{
    console.log(err);
  }
})
}

ngOnInit(): void {
   this.GetAllOrders()
   this.Setwaiting()
}
ShowDetails(item:any){
this.SelectedOrder=item
console.log(this.SelectedOrder);

}

Setwaiting(){
  setTimeout(()=>{
    this.waiting=false
  },1000)
}
}


