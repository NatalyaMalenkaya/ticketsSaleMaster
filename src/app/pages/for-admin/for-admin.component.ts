import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TechnicService } from 'src/app/services/techmodels/techmodels.service';
import { ITechnic } from 'src/app/models/technics';
@Component({
  selector: 'app-for-admin',
  templateUrl: './for-admin.component.html',
  styleUrls: ['./for-admin.component.scss']
})
export class ForAdminComponent implements OnInit {
  technicForm: FormGroup;
  constructor(private technicService: TechnicService) { }
  ngOnInit(): void {
    this.technicForm = new FormGroup({
      name:  new FormControl('', {validators: Validators.required}),
      tonnazh: new FormControl('', [Validators.required, Validators.minLength(2)]),
      type: new FormControl(),
      price: new FormControl(),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
      img: new FormControl()
    })
  }
  createTour(): void {
    const technicDataRow = this.technicForm.getRawValue();
    let formParams = new FormData();
    if (typeof technicDataRow === "object") {
      for ( let prop in technicDataRow){
        formParams.append( prop , technicDataRow[prop]);
      }
    }
    this.technicService.createTour(formParams).subscribe((data) => {});
  }
  selectFile(ev: any): void {
    if (ev.target.files.length > 0) {
      const file= ev.target.files[0];
      this.technicForm.patchValue({
        img: file
      });
    }
  }
}

