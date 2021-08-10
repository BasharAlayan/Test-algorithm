import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../services/data.service';
import {map} from 'rxjs/operators';
import {ResultService} from '../services/result.service';
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from '@angular/router';
import {ContactService} from '../services/contact.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

  currentdata = null;
  currentIndex = -1;
  selectForm: FormGroup;
  allData: { image_algo_1: string; image_algo_2: string; problem: boolean; time_algo_1: string; time_algo_2: string; id: string; note_algo1: number; note_algo2: number; key: string; status: boolean; option: string }[];
  all: { image_algo_1: string; image_algo_2: string; problem: boolean; time_algo_1: string; time_algo_2: string; id: string; note_algo1: number; note_algo2: number; key: string; status: boolean; option: string }[];
  newIsBetter: { image_algo_1: string; image_algo_2: string; problem: boolean; time_algo_1: string; time_algo_2: string; id: string; note_algo1: number; note_algo2: number; key: string; status: boolean; option: string }[];
  same: { image_algo_1: string; image_algo_2: string; problem: boolean; time_algo_1: string; time_algo_2: string; id: string; note_algo1: number; note_algo2: number; key: string; status: boolean; option: string }[];
  bothBad: { image_algo_1: string; image_algo_2: string; problem: boolean; time_algo_1: string; time_algo_2: string; id: string; note_algo1: number; note_algo2: number; key: string; status: boolean; option: string }[];
  all10BAD: { image_algo_1: string; image_algo_2: string; problem: boolean; time_algo_1: string; time_algo_2: string; id: string; note_algo1: number; note_algo2: number; key: string; status: boolean; option: string }[];
  all7BAD: { image_algo_1: string; image_algo_2: string; problem: boolean; time_algo_1: string; time_algo_2: string; id: string; note_algo1: number; note_algo2: number; key: string; status: boolean; option: string }[];

   constructor(private router: Router, private route: ActivatedRoute, private dataService: ResultService, private fb: FormBuilder, private contact: ContactService) {

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
      this.all = this.allData.filter(it => it.note_algo2 >= 7);
      this.newIsBetter = this.allData.filter(it => it.note_algo1 >= 7);
      this.same = this.allData.filter(it => it.note_algo1 == 5 && it.note_algo2 == 5);
      this.bothBad = this.allData.filter(it => it.note_algo1 == 0 && it.note_algo2 == 0);
      this.all10BAD = this.allData.filter(it => it.note_algo2 == 10);
      this.all7BAD = this.allData.filter(it => it.note_algo2 == 7);


    });
  }

  details(index,data): void{

    Swal.fire({
      imageUrl: data.image_algo_1,
      imageWidth:1900,


        title: 'New algorithm with image:' + index ,
        confirmButtonColor: '#141f29',
        confirmButtonText: "Suivant",
      }
    ).then((result) => {
      Swal.fire({
        imageUrl: data.image_algo_2,
        imageWidth:900,

        title: 'Old algorithm with image:' + index,
        confirmButtonColor: '#141f29',
        confirmButtonText: "Close",
      });
    });
  }

}
