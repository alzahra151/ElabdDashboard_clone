import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { CategoryComponent } from './components/category/category.component';
import { LoginComponent } from './components/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { OrderComponent } from './components/order/order.component';
import { ProductChartComponent } from './components/product-chart/product-chart.component';
import { SettingProductComponent } from './components/setting-product/setting-product.component';
import { SideOffcanvasComponent } from './components/side-offcanvas/side-offcanvas.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserStatusComponent } from './components/user-status/user-status.component';
import { AuthGuard } from './gaurds/auth.guard';
import { LoginGuard } from './gaurds/login.guard';

const routes: Routes = [
  {path:"" ,component:LoginComponent,  },
  {path:"Elabd" ,component:MainLayoutComponent,

  children:[
    {path:"" ,component:ProductChartComponent,},
    {path:"home" ,component:ProductChartComponent, },
    {path:"products" ,component:AddProductComponent, },
    {path:"settingProduct" ,component:SettingProductComponent,  },
    {path:"AddUser" ,component:AddUserComponent,  },
     {path:"orders" ,component:OrderComponent,  },
     {path:"userProfile" ,component:UserProfileComponent,  },
    {path:"userinfo" ,component:UserStatusComponent,  },
    {path:"category" ,component:CategoryComponent,  },
    {path:"SubCategorie" ,component:SubCategoryComponent,  },
  ]
},
 {path:"login" ,component:LoginComponent ,canActivate:[LoginGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
