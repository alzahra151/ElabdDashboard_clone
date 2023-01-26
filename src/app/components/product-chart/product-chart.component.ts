import { Component, OnInit } from '@angular/core';
// import Chart from 'chart.js';
import Chart from 'chart.js/auto';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
@Component({
	selector: 'app-product-chart',
	templateUrl: './product-chart.component.html',
	styleUrls: ['./product-chart.component.scss']
})
export class ProductChartComponent implements OnInit {
	public chart: any;
	listOfUsers: User[] = []
	listOfOrders: Order[] = []
	listOfProducts: Product[] = []
	listOfCat: any = []
	listOfSubCat: any = []
	ProductInfo: any
	UserInfo: any
	ProductStats: any
	UsersStats: any
	OrderStats: any
	waiting = true
	constructor(private api: ApiService) { }
	ngOnInit(): void {
		this.createChart();
		this.GetAllUsers()
		this.GetAllOrders()
		this.GetAllCat()
		this.GetAllProducts()
		this.GetAllSubCat()
		this.GetAllProductsInfo()
		this.GetAllUserInfo()
		this.GetAllProductsStats()
		this.GetAllUersStats()
		this.GetAllOrderStats()
		this.Setwaiting()


	}
	createChart() {

		this.chart = new Chart("MyChart5", {
			type: 'doughnut',
			data: {
				labels: [
					'AddToFav',
					'Edit',
					'Delete',
					"Search",
					"AddToCart"
				],
				datasets: [{
					label: 'My First Dataset',
					data: [300, 50, 100, 60, 120],
					backgroundColor: [
						'rgb(255, 99, 132)',
						'rgb(54, 162, 235)',
						'rgb(255, 205, 86)',
						'rgb(75, 51, 126)',
						'rgb(0, 128, 0)',

					],
					hoverOffset: 4
				}]
			},
			options: {
				elements: {
					line: {
						borderWidth: 1
					}
				},

			}
		})






		this.chart = new Chart("MyChart10", {
			type: 'radar',
			data: {
				labels: [
					'Add',
					'Delete',
					'Update',
					'Sreach',
					'Available'
				],
				datasets: [{
					label: 'Users',
					data: [65, 59, 90, 81, 57],
					fill: true,
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
					borderColor: 'rgb(255, 99, 132)',
					pointBackgroundColor: 'rgb(255, 99, 132)',
					pointBorderColor: '#fff',
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: 'rgb(255, 99, 132)'
				}, {
					label: 'Products',
					data: [28, 48, 40, 19, 39],
					fill: true,
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					borderColor: 'rgb(54, 162, 235)',
					pointBackgroundColor: 'rgb(54, 162, 235)',
					pointBorderColor: '#fff',
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: 'rgb(54, 162, 235)'
				}]
			},
			options: {
				elements: {
					line: {
						borderWidth: 1
					}
				},

			}
		})


		this.chart = new Chart("MyChart0", {
			type: 'line',
			data: {
				labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
				datasets: [{
					label: 'Add To Cart',
					data: [20, 40, 80, 81, 56, 55, 30],
					fill: false,
					borderColor: 'rgb(255, 205, 86)',
					tension: 0.1
				},
				{
					label: 'Order',
					data: [65, 59, 80, 81, 56, 80, 10],
					fill: false,
					borderColor: 'rgb(0, 128, 0)',
					tension: 0.1
				},
				{
					label: 'Add To Fav',
					data: [80, 70, 30, 81, 56, 20, 60],
					fill: false,
					borderColor: 'rgb(255, 99, 132)',
					tension: 0.1
				}],

			}
		})

	}
	GetAllUsers() {
		this.api.get('User').subscribe({
			next: (data) => {
				const arr: any = data
				this.listOfUsers = arr
				console.log(data);


			},
			error: (err) => {
				console.log(err);
			}
		})
	}
	GetAllOrders() {
		this.api.get('Order').subscribe({
			next: (data) => {
				const arr: any = data
				this.listOfOrders = arr
			},
			error: (err) => {
				console.log(err);
			}
		})
	}
	GetAllProducts() {
		this.api.get('Product').subscribe({
			next: (data) => {
				const arr: any = data
				this.listOfProducts = arr
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
	GetAllProductsStats() {
		this.api.get('Product/Stats/Results').subscribe({
			next: (data) => {
				this.ProductStats = data
				console.log(this.ProductStats);


			},
			error: (err) => {
				console.log(err);
			}
		})
	}
	GetAllUersStats() {
		this.api.get('User/Stats/Results').subscribe({
			next: (data) => {
				this.UsersStats = data
				console.log(this.UsersStats);


			},
			error: (err) => {
				console.log(err);
			}
		})
	}
	GetAllOrderStats() {
		this.api.get('Order/Stats/Results').subscribe({
			next: (data) => {
				this.OrderStats = data
				console.log(this.OrderStats);


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
