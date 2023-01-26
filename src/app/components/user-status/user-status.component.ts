import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss']
})
export class UserStatusComponent {
listOfUsers:User[]=[]
SelectedItem:User={} as User
EditItem:User={} as User
DeletedItem:User={} as User
waiting=true
UserInfo:any


constructor(private api:ApiService){

}

ngOnInit(): void {
  this.GetAllUsers()
  this.Setwaiting()
  this.GetAllUserInfo()

  }

  GetAllUsers(){
    this.api.get('User').subscribe({
      next : (data)=>{
        const arr:any= data
        this.listOfUsers = arr
        console.log(data);
        

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
	GetAllUserInfo() {
		this.api.get('User/UserInfo').subscribe({
			next: (data) => {
				this.UserInfo = data
				console.log(this.UserInfo);


			},
			error: (err) => {
				console.log(err);
			}
		})
	}
  Edit(FirstName:string,LastName:string,Email:string){
  const UpdateObj={FirstName,LastName,Email}
    this.api.put(`User/${ this.EditItem._id}`,UpdateObj).subscribe({
      next: (data) => {
        this.ngOnInit()
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  Delete(){
    this.api.delete(`User/${ this.DeletedItem._id}`).subscribe({
      next: (data) => {
        this.ngOnInit()
      },
      error: (err) => {
        console.log(err);

      }
    })      
  }

  Setwaiting(){
    setTimeout(()=>{
      this.waiting=false
    },1000)
  }
}
