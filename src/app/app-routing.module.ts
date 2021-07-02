import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DataComponent} from "./data/data.component";
import {EthereumComponent} from "./ethereum/ethereum.component";
import {VechainComponent} from "./vechain/vechain.component";
import {IotaComponent} from "./iota/iota.component";
import {SensorsComponent} from "./sensors/sensors.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path: 'data', component: DataComponent, children: [
      {path: 'ethereum', component: EthereumComponent},
      {path: 'vechain', component: VechainComponent},
      {path: 'iota', component: IotaComponent},
    ]
  },
  {path: '', redirectTo: '/home', pathMatch: "full"},
  {path: 'sensors', component: SensorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
