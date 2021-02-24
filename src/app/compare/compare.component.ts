import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../services/data.service';
import {Data} from '../model/data';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {HomeComponent} from '../home/home.component';
import {Contact} from '../model/contact';
import {ContactService} from '../services/contact.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  id;
  isSubmitted = false;

  result = '';

  options = [
    {option: 'Le point de fuite 1 est beaucoup plus précis que le point de fuite 2', note_algo_1: 10, note_algo_2: 0},
    {option: 'Le point de fuite 1 est plus précis que le point de fuite 2', note_algo_1: 7, note_algo_2: 3},
    {option: 'Le point de fuite 1 et  le point de fuite 2 sont aussi précis l\'un que l\'autre', note_algo_1: 5, note_algo_2: 5},
    {option: 'Le point de fuite 2 et le point de fuite 1 ne sont pas précis', note_algo_1: 0, note_algo_2: 0},
    {option: 'Le point de fuite 2 est plus précis que le point de fuite 1', note_algo_1: 3, note_algo_2: 7},
    {option: 'Le point de fuite 2 est beaucoup plus précis que le point de fuite 1', note_algo_1: 0, note_algo_2: 10},
  ];

  currentdata = null;
  currentIndex = -1;
  selectForm: FormGroup;

  // allData: { image_algo_1: string; image_algo_2: string; time_algo1: string; time_algo2: string; note_algo_1: number; note_algo_2: number; key: string; status: boolean; option: string }[]
  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService, private fb: FormBuilder, private contact: ContactService) {
  }

  data: Data;

  image_algo_1: string;
  image_algo_2: string;
  time_algo1: string;
  time_algo2: string;
  option: string;
  note_algo_1: string;
  note_algo_2: string;
  status: string;
  problem: boolean;


  ngOnInit() {
    this.selectForm = this.fb.group({
      selectOptions: ['', [Validators.required]]
    });
    this.route.url.subscribe(params => {
      this.id = params[1];

    });
    this.route.queryParams.subscribe(params => {
      this.image_algo_1 = params.image_algo_1;
      this.image_algo_2 = params.image_algo_2;
      this.time_algo1 = params.time_algo_1;
      this.time_algo2 = params.time_algo_2;
      this.option = params.option;
      this.note_algo_1 = params.note_algo_1;
      this.note_algo_2 = params.note_algo_2;
      this.status = params.status;
      this.problem=params.problem;
      this.data = new Data(
        this.status,
        this.image_algo_1,
        this.image_algo_2,
        this.note_algo_1,
        this.note_algo_2,
        this.option,
        this.time_algo1,
        this.time_algo2,
        this.id);
      console.log("=================")
    });
    if (this.isSubmitted){
      this.status="true";
    }
  }

  onSubmit(data) {
    this.isSubmitted = true;
    if (!this.selectForm.valid) {
      return false;
    } else {
      const noteAlgo1 = this.selectForm.get('selectOptions').value.note_algo_1;
      const noteAlgo2 = this.selectForm.get('selectOptions').value.note_algo_2;
      const option = this.selectForm.get('selectOptions').value.option;
      data.note_algo1 = noteAlgo1;
      data.note_algo2 = noteAlgo2;
      data.option = option;
      data.status = true;
      data.image_algo_1 = this.image_algo_1;
      data.image_algo_2 = this.image_algo_2;
      data.time_algo_1 = this.time_algo1;
      data.time_algo_2 = this.time_algo2;
      data.id=this.id.path;
      this.dataService.update(this.id.path, data);
      this.result = 'Votre option : "<' + option + '>" est  validée';
      this.router.navigate(['/notTested'])
      swal({
          icon: 'success',
          title: 'Votre test pour l\'image '+ this.id.path+' a été envoyé',
        }
      );

    }
  }

  SendProblem(id) {
    const contactObject = new Contact("Erreur Technique : image : "+this.id.path, new Date().toISOString(), "Erreur image : "+this.id.path);
    this.contact.add(contactObject);
    this.dataService.update(this.id.path, {"problem":true});
    this.router.navigate(['/notTested'])
    swal({
        icon: 'success',
        title: 'Votre signale pour l\'image '+ this.id.path+' a été envoyé',
      }
    );
  }
}
