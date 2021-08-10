import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {map} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isSubmitted = false;

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
  allData: { image_algo_1: string; image_algo_2: string; problem: boolean; time_algo_1: string; time_algo_2: string; id: string; note_algo1: number; note_algo2: number; key: string; status: boolean; option: string }[];
  all: { image_algo_1: string; image_algo_2: string; problem: boolean; time_algo_1: string; time_algo_2: string; id: string; note_algo1: number; note_algo2: number; key: string; status: boolean; option: string }[];

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
      this.all = this.allData.filter(it => !it.status);
//      console.log(this.all)
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
