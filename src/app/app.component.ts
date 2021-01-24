import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireObject, SnapshotAction} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {log} from 'util';
import {Data} from './model/data';
import {DataService} from './services/data.service';
import {map} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isSubmitted = false;

  options = [
    {option: 'Le point de fuite 1 est beaucoup plus précis que le point de fuite 2', note_algo_1: 10, note_algo_2: 0},
    {option: 'Le point de fuite 1 est plus précis que le point de fuite 2', note_algo_1: 7, note_algo_2: 3},
    {option: 'Le point de fuite 1 et  le point de fuite 2 sont aussi précis l\'un que l\'autre', note_algo_1: 10, note_algo_2: 10},
    {option: 'Le point de fuite 2 est plus précis que le point de fuite 1', note_algo_1: 3, note_algo_2: 7},
    {option: 'Le point de fuite 2 est beaucoup plus précis que le point de fuite 1', note_algo_1: 0, note_algo_2: 10},
    {option: 'Le point de fuite 2 et le point de fuite 1 ne sont pas précis', note_algo_1: 0, note_algo_2: 0}
  ];

  allData: { img_algo_1: string; img_algo_2: string; note_algo2: number; key: string; status: boolean; note_algo1: number; option: string }[];
  currentdata = null;
  currentIndex = -1;
  selectForm: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.selectForm = this.fb.group({
      selectOptions: ['', [Validators.required]]
    });
    this.retrieveData();
  }

  retrieveData(): void {
    this.dataService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )).subscribe(data => {
      this.allData = data;
    });
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
      console.log(data);
      this.dataService.update(data.key, data);
    }
  }

  // Getter method to access formcontrols
  get optionSelected() {
    return this.selectForm.get('selectOptions');
  }

}
