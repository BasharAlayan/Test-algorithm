import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../services/data.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-tested',
  templateUrl: './tested.component.html',
  styleUrls: ['./tested.component.css']
})
export class TestedComponent implements OnInit {
  isSubmitted = false;


  options = [
    {option: 'Le point de fuite 1 est beaucoup plus précis que le point de fuite 2', note_algo_1: 10, note_algo_2: 0},
    {option: 'Le point de fuite 1 est plus précis que le point de fuite 2', note_algo_1: 7, note_algo_2: 3},
    {option: 'Le point de fuite 1 et  le point de fuite 2 sont aussi précis l\'un que l\'autre', note_algo_1: 10, note_algo_2: 10},
    {option: 'Le point de fuite 2 est plus précis que le point de fuite 1', note_algo_1: 3, note_algo_2: 7},
    {option: 'Le point de fuite 2 est beaucoup plus précis que le point de fuite 1', note_algo_1: 0, note_algo_2: 10},
    {option: 'Le point de fuite 2 et le point de fuite 1 ne sont pas précis', note_algo_1: 0, note_algo_2: 0}
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
      this.all = this.allData.filter(it => it.status );
    });
  }

}
