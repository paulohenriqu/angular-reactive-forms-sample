import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public sampleForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.sampleForm = this.formBuilder.group({
      name: [null, [Validators.required,Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
      age: [null, [Validators.required]],
      responsible: [null]
    });

    this.formChange();
  }

  formChange() {
    this.sampleForm.get('age').valueChanges.subscribe(
      age => {
        if (age <= 16) {
          this.sampleForm.get('responsible').setValidators([Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]);
        } else {
          this.sampleForm.get('responsible').clearValidators();
        }

        this.sampleForm.get('responsible').updateValueAndValidity();
      });
  }

  submitFunction(){
    console.log("Submit form");
    this.sampleForm.reset();
  }
}
