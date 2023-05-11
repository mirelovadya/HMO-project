import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
declare var $: any;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent {
  constructor(private dataService: DataService) {

  }
  newCustomer: any = {}

  customers: any = [];
  currentIndex = -1

  ngOnInit() {
    this.getAllCustomers()
  }

  getAllCustomers() {
    return new Promise((resolve, reject) => {
      this.dataService.apiName = "api/get-customers";
      this.dataService.getDataByObject({}).subscribe(results => {
        this.customers = results.customers
        for (let i = 0; i < this.customers.length; i++) {
          let date = new Date(this.customers[i].dateOfBirthay)
          this.customers[i].dateOfBirthay = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
        }
        resolve(true);
      }, err => {
        console.log(err);
      })
    });
  }

  editCustomer(index: any) {
    this.currentIndex = index
  }

  addCustomer() {
    return new Promise((resolve, reject) => {
      this.dataService.apiName = "api/add-customer";
      this.dataService.getDataByObject(this.newCustomer).subscribe(results => {
        debugger
        $('#addCustomerModal').modal('hide');
        this.getAllCustomers()
        resolve(true);
      }, err => {
        console.log(err);
      })
    });
  }

  //open file
  public openUploadFile(index: any) {
    document.getElementById(`personImage${index}`)?.click();
  }

  //add image for customer
  addImageUpload(event: any, index: any) {
    let tempFile: File = event.target.files[0];
    let myReader: FileReader = new FileReader();
    if (tempFile) {
      myReader.readAsDataURL(tempFile);
    }
    myReader.onloadend = (e) => {
      this.compressImage(<any>myReader.result, 200, 200).then((compressed: any) => {
        console.log("aaa");

        this.customers[index].image = compressed;
        return new Promise((resolve, reject) => {
          this.dataService.apiName = "api/edit-custome-image";
          let data = {
            customerIndex: this.customers[index].customerIndex,
            image: this.customers[index].image
          }
          debugger
          this.dataService.getDataByObject(data).subscribe(results => {
            debugger
            resolve(true);
          }, err => {
            console.log(err);
          })
        });
      })
      console.log("nbb");

      this.customers[index].image = <any>myReader.result;
      return;
    }
  }

  //compressImage
  compressImage(src: any, newX: any, newY: any) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = newX;
        elem.height = newY;
        const ctx: any = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, newX, newY);
        const data = ctx.canvas.toDataURL();
        res(data);
      }
      img.onerror = error => rej(error);
    })
  }

}
