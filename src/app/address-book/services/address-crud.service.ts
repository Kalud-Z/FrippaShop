import { Injectable } from '@angular/core';
import { Address } from '../address.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { DataStorageService } from 'src/app/tasks/services/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AddressCrudService { //#########################################################################################################

  // addressList : Address[] = [
  //   new Address(1 ,  'Ghaylen Bouachir', 'Bagneux' , 'France' , 92220 , 'villa des iris' , 27 , '0755366969'),
  //   new Address(2 , 'Hichem Ouertani', 'Versailles' , 'France' , 78000 , 'Chemin de Fausses Reposes' , 3 , '0033638184027'),
  //   new Address(3 , 'Fairouz Barket', 'Cergy, Ile-de-France' , 'France' , 95000 , ' les cerclades tour bleue' , 37 , '0695069681'),
  //   new Address(4 , 'Mohamed Feki', 'Aix en provence' , 'France' , 13290 , 'rue albert Einstein' , 135 , '000000000'),
  //   new Address(5 , 'Seif Ferjéni', 'antibes' , 'France' , 0o6160 , 'avenue de cannes, Villa Pablo' , 51 , '0612952846'),
  //   new Address(6 , 'Mohamed Zahi', 'Köln' , 'Germany' , 51103 , 'Kalker Hauptstr' , 217 , '000000000'),
  //   new Address(7 , 'Lassaad Mnif', 'Meudon' , 'France' , 92190 , 'Rue des Vignes' , 11 , '000000000')
  // ]


  addressList: Address[] = [];

  // addressSubject = new BehaviorSubject<Address[]>(null);
  addressSubject = new Subject<Address[]>();

  sentDataToAddressNow = false;


  constructor(private dataStorageService: DataStorageService) { }
  

  private addressListUpdatedNotify()  {
    console.log('addressListUpdatedNotify is called and thisi the list : ' , this.addressList)
    this.addressSubject.next(this.addressList.slice());
  }


  addAddress(name: string , city : string , country : string , postalCode : number , street : string , houseNr : number , phone : string) {
    this.createNewAddressAndPush(name , city, country , postalCode, street, houseNr, phone);

    this.dataStorageService.storeAddressList(this.addressList).subscribe(data => {
      localStorage.removeItem("addressList");
      localStorage.setItem('addressList', JSON.stringify(this.addressList));

    })
  }


  getAddress(id : number): Address {
      let correctItem : Address;
      this.addressList.forEach(el => {
        if(el.id === id) correctItem = el;
      })
      return correctItem;
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



  getAddressList() {
    if(this.addressList.length === 0) {
      const localStorageData = JSON.parse(localStorage.getItem('addressList'));
      if(localStorageData && localStorageData.length !== 0) {
        this.pushToList(localStorageData , 'fromLocalStorage');
        console.log('we just loaded from localsotrage');
      }
      else {
        console.log('we just loaded from API')
          this.dataStorageService.fetchAddressList().subscribe(data => {
          this.pushToList(data , 'fromAPI');
          localStorage.setItem('addressList', JSON.stringify(this.addressList));
          this.addressListUpdatedNotify();
        })
      }
    }//outer if
    else if(this.addressList.length > 0) { this.addressListUpdatedNotify();
      console.log('we just loaded from service array')
    }
  }



  adjustIDs() {
    this.addressList.forEach( (el,index) => {
      el.id = index+1;
    })
    this.addressListUpdatedNotify();
  } 



  createNewAddress(name: string , city : string , country : string , postalCode : number , street : string , houseNr : number , phone : string , id: number) {
      return  new Address(id , name , city, country , postalCode, street, houseNr, phone);
  }


  
  createNewAddressAndPush(name: string , city : string , country : string , postalCode : number , street : string , houseNr : number , phone : string , id?: number) {
    let correctId : number;
    if(!id) {
      correctId = this.addressList[this.addressList.length - 1].id + 1;
    } else {
      correctId = id;
    }

    const address = this.createNewAddress(name , city, country , postalCode, street, houseNr, phone , correctId)
    this.addressList.push(address);


    if(this.sentDataToAddressNow) {
      this.addressListUpdatedNotify();
    }

  }



  private pushToList(data: any[] , type : string) {
    console.log('we in pushToList');
    console.log(data);

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


      if(index === arrayLength-1) {
        this.sentDataToAddressNow = true;
      } 
      this.createNewAddressAndPush(name , city , country , postalCode , street , houseNr , phone , id);
    })

  }














  
}   // class ##################################################################################################################################




