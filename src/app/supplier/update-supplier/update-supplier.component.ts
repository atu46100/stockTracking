import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.css'],
  providers: [SupplierService]
})
export class UpdateSupplierComponent implements OnInit {

  supplierObject: any;

  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const supplierId = params.get('supplierId');
      this.supplierService.getSupplierById(supplierId).subscribe(
        res => {
          this.supplierObject = res;
        },
        err => {
          throw err;
        }
      )
    });
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      f.value.id = this.supplierObject.id;
      this.supplierService.putSupplier(f.value).subscribe(
        res => {
          console.log(res);

        },
        err => {
          throw err
        }
      );
    };
  }
}
