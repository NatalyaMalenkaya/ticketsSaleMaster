import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TechnicService } from 'src/app/services/tickets/tickets.service';
import { ITour } from 'src/app/models/tours';

@Component({
  selector: 'app-for-admin',
  templateUrl: './for-admin.component.html',
  styleUrls: ['./for-admin.component.scss']
})
export class ForAdminComponent implements OnInit {
  tourForm: FormGroup;
  constructor(private technicService: TechnicService) { }

  ngOnInit(): void {
    this.tourForm = new FormGroup({
      name:  new FormControl('', {validators: Validators.required}),
      tonnazh: new FormControl('', [Validators.required, Validators.minLength(2)]),
      type: new FormControl(),
      price: new FormControl(),
      img: new FormControl()
    })
  }

  createTour(): void {
    const tourDataRow = this.tourForm.getRawValue();
    let formParams = new FormData();
    if (typeof tourDataRow === "object") {
      for ( let prop in tourDataRow){
        formParams.append( prop , tourDataRow[prop]);
      }
    }
    this.technicService.createTour(formParams).subscribe((data) => {});
  }


  selectFile(ev: any): void {
    if (ev.target.files.length > 0) {
      const file= ev.target.files[0];
      this.tourForm.patchValue({
        img: file
      });
    }
  }
}

