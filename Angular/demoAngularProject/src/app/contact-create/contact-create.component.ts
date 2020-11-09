import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit, OnDestroy {
  form: FormGroup;
  editContactSub: Subscription;
  editContact = undefined;
  @Input() contact;
  constructor(private dataService: DataService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.contact ? this.contact.name : null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      email: new FormControl(this.contact ? this.contact.email : null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      description: new FormControl(this.contact ? this.contact.description : null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      age: new FormControl(this.contact ? this.contact.age : null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      })
    });
  }

  onCreateContact() {
    if (!this.form.valid) {
      return;
    }
    if (!this.contact) {
      return this.dataService.createContact(
        this.form.value.name,
        this.form.value.email,
        this.form.value.description,
        this.form.value.age
      ).subscribe(() => {
        this.form.reset();
        this.activeModal.close();
      });
    } else {
      return this.dataService.updateContact(
        this.contact.id,
        this.form.value.name,
        this.form.value.email,
        this.form.value.description,
        this.form.value.age
      ).subscribe(() => {
        this.form.reset();
        this.activeModal.close();
      });
    }
  }



  ngOnDestroy() {
    if (this.editContactSub) {
      this.editContactSub.unsubscribe();
    }
  }



}
