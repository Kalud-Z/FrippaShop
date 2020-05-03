import { Injectable } from '@angular/core';
import { Address } from '../address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressCrudService { //#########################################################################################################

  addressList : Address[] = [
    new Address(1 ,  'Ghaylen Bouachir', 'Bagneux' , 'France' , 92220 , 'villa des iris' , 27 , '0755366969'),
    new Address(2 , 'Hichem Ouertani', 'Versailles' , 'France' , 78000 , 'Chemin de Fausses Reposes' , 3 , '0033638184027'),
    new Address(3 , 'Fairouz Barket', 'Cergy, Ile-de-France' , 'France' , 95000 , ' les cerclades tour bleue' , 37 , '0695069681'),
    new Address(4 , 'Mohamed Feki', 'Aix en provence' , 'France' , 13290 , 'rue albert Einstein' , 135 , '000000000'),
    new Address(5 , 'Seif Ferjéni', 'antibes' , 'France' , 0o6160 , 'avenue de cannes, Villa Pablo' , 51 , '0612952846'),
    new Address(6 , 'Mohamed Zahi', 'Köln' , 'Germany' , 51103 , 'Kalker Hauptstr' , 217 , '000000000'),
    new Address(7 , 'Lassaad Mnif', 'Meudon' , 'France' , 92190 , 'Rue des Vignes' , 11 , '000000000')
  ]


  constructor() { }


  getAddressList(): Address[] {
    return this.addressList.slice();
  }



  








  
}   // class ##################################################################################################################################




