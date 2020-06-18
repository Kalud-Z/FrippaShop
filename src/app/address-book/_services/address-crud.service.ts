import { Injectable } from '@angular/core';
import { Address } from '../address.model';
import { Subject } from 'rxjs';
import { DataStorageService } from 'src/app/shared/_services/data-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressCrudService { //#########################################################################################################
  addressList: Address[] = [];
  addressSubject = new Subject<Address[]>();
  sentDataToAddressNow = false;

  constructor(private dataStorageService: DataStorageService) { }
  
  private addressListUpdatedNotify()  { this.addressSubject.next(this.addressList.slice()) }


  addAddress(name: string , city : string , country : string , postalCode : number , street : string , houseNr : number , phone : string) {
    this.createNewAddressAndPush(name , city, country , postalCode, street, houseNr, phone);

    this.dataStorageService.storeAddressList(this.addressList).subscribe(data => {
      localStorage.removeItem("addressList");
      localStorage.setItem('addressList', JSON.stringify(this.addressList));
    })
  }



  deleteAddress(id : number) {
    this.addressList.forEach( (el, index) => {
      if(el.id === id) {
        if(el.id === id) { this.addressList.splice(index, 1) }
      }
    })

    this.addressListUpdatedNotify();
    this.dataStorageService.storeAddressList(this.addressList).subscribe(data => {
      localStorage.removeItem("addressList");
      localStorage.setItem('addressList', JSON.stringify(this.addressList));
    });
  }


  updateAddress(id : number , name: string , city : string , country : string , postalCode : number , street : string , houseNr : number , phone : string) {
    this.addressList.forEach(el => {
      if(el.id === id) {
       el.country = country;
       el.city = city;
       el.houseNr = houseNr;
       el.name = name;
       el.phone = phone;
       el.postalCode = postalCode;
       el.street = street;
      }
    })

    this.addressListUpdatedNotify();
    this.dataStorageService.storeAddressList(this.addressList).subscribe( data => {
      localStorage.removeItem("addressList");
      localStorage.setItem('addressList', JSON.stringify(this.addressList));
    });
  }



  getAddress(id : number): Address {
      let correctItem : Address;
      this.addressList.forEach(el => { if(el.id === id) correctItem = el })
      return correctItem;
  }



  getAddressList() {
    if(this.addressList.length === 0 && environment.useLocalStorage) { // memory still empty . we fetch from localStorage (if we are allowed)
      const localStorageData = JSON.parse(localStorage.getItem('addressList'));
      if(localStorageData && localStorageData.length !== 0) {  this.pushToList(localStorageData) }
    }

    if(this.addressList.length > 0) {console.log('we just fetched from Memory') ;  this.addressListUpdatedNotify() }
    else {  // fetch stuff from dataBase
        this.dataStorageService.fetchAddressList().subscribe(data => {
          this.pushToList(data);
          localStorage.setItem('addressList', JSON.stringify(this.addressList));
      })
    }
  } //getAddressList



  createNewAddressAndPush(name: string , city : string , country : string , postalCode : number , street : string , houseNr : number , phone : string , id?: number) {
    let correctId : number;
    if(!id) { correctId = this.addressList[this.addressList.length - 1].id + 1 } 
    else { correctId = id }

    const address = this.createNewAddress(name , city, country , postalCode, street, houseNr, phone , correctId)
    this.addressList.push(address);

    if(this.sentDataToAddressNow) { this.addressListUpdatedNotify() }
  }


  // #######################################################################   PRIVATE    #############################################################

  
  private createNewAddress(name: string , city : string , country : string , postalCode : number , street : string , houseNr : number , phone : string , id: number) {
    return  new Address(id , name , city, country , postalCode, street, houseNr, phone);
  }


  private pushToList(data: any[]) {
    const arrayLength = data.length;

    data.forEach((el, index) => {
      let city : string       = el.city;
      let country : string    = el.country;
      let name : string       = el.name;
      let street : string     = el.street;
      let phone : string      = el.phone;
      let postalCode : number = el.postalCode;
      let houseNr : number    = el.houseNr;
      let id : number         = el.id;

      if(index === arrayLength-1) { this.sentDataToAddressNow = true } 
      this.createNewAddressAndPush(name , city , country , postalCode , street , houseNr , phone , id);
    })

  }


  
}   // class ############################################################################################################################################
// #####################################################################################################################################################











/* 

/ addressList : Address[] = [
  //   new Address(1 ,  'Ghaylen Bouachir', 'Bagneux' , 'France' , 92220 , 'villa des iris' , 27 , '0755366969'),
  //   new Address(2 , 'Hichem Ouertani', 'Versailles' , 'France' , 78000 , 'Chemin de Fausses Reposes' , 3 , '0033638184027'),
  //   new Address(3 , 'Fairouz Barket', 'Cergy, Ile-de-France' , 'France' , 95000 , ' les cerclades tour bleue' , 37 , '0695069681'),
  //   new Address(4 , 'Mohamed Feki', 'Aix en provence' , 'France' , 13290 , 'rue albert Einstein' , 135 , '000000000'),
  //   new Address(5 , 'Seif Ferjéni', 'antibes' , 'France' , 0o6160 , 'avenue de cannes, Villa Pablo' , 51 , '0612952846'),
  //   new Address(6 , 'Mohamed Zahi', 'Köln' , 'Germany' , 51103 , 'Kalker Hauptstr' , 217 , '000000000'),
  //   new Address(7 , 'Lassaad Mnif', 'Meudon' , 'France' , 92190 , 'Rue des Vignes' , 11 , '000000000')
  // ]

 */