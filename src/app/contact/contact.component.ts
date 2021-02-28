import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../model/contact';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../services/contact.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private contact: ContactService) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  submitted = false;

  onSubmit() {
    this.submitted = true;
    const value = this.formGroup.value;
    const name = value['name'];
    const message = value['message'];
    console.log(name);
    const contactObject = new Contact(name, new Date().toISOString(), message);
    this.contact.add(contactObject);
    this.formGroup.reset();

    Swal.fire({
        icon: 'success',
        title: 'Votre message a été envoyé',
      }
    );


  }

}
