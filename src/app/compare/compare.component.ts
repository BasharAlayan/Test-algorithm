import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../services/data.service';
import {Data} from '../model/data';
import {Contact} from '../model/contact';
import {ContactService} from '../services/contact.service';
import {map} from 'rxjs/operators';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  id;
  number;
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
  allData: { image_algo_1: string; image_algo_2: string; problem: boolean; time_algo_1: string; time_algo_2: string; id: string; note_algo1: number; note_algo2: number; key: string; status: boolean; option: string }[];
  nextImage: { image_algo_1: string; image_algo_2: string; problem: boolean; time_algo_1: string; time_algo_2: string; id: string; note_algo1: number; note_algo2: number; key: string; status: boolean; option: string }[];



  // allData: { image_algo_1: string; image_algo_2: string; time_algo1: string; time_algo2: string; note_algo_1: number; note_algo_2: number; key: string; status: boolean; option: string }[]
  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService, private fb: FormBuilder, private contact: ContactService) {
  }

  data: Data;
  next: Data;

  image_algo_1: string;
  image_algo_2: string;
  time_algo1: string;
  time_algo2: string;
  option: string;
  note_algo_1: string;
  note_algo_2: string;
  status: string;
  problem: boolean;
  revese: string;


  ngOnInit() {
    this.selectForm = this.fb.group({
      selectOptions: ['', [Validators.required]]
    });
    this.route.url.subscribe(params => {
      this.id = params[1];
      this.number = params[2].path;
      this.revese = params[3].path;
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
        this.problem = params.problem;
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
        console.log('=================');
      });


    if (this.isSubmitted) {
      this.status = 'true';
    }
  }

  onSubmit(data, index) {
    this.isSubmitted = true;
    if (!this.selectForm.valid) {
      return false;
    } else {
      if(this.revese=="true"){

        const noteAlgo1 = this.selectForm.get('selectOptions').value.note_algo_2;
        const noteAlgo2 = this.selectForm.get('selectOptions').value.note_algo_1;
        const option = this.selectForm.get('selectOptions').value.option;
        data.note_algo1 = noteAlgo1;
        data.note_algo2 = noteAlgo2;
        data.option = option;
        data.status = true;
        data.image_algo_1 = this.image_algo_2;
        data.image_algo_2 = this.image_algo_1;
        data.time_algo_1 = this.time_algo2;
        data.time_algo_2 = this.time_algo1;
        data.id = this.id.path;
        data.revese=this.revese;
        this.dataService.update(this.id.path, data);
        this.result = 'Votre option : "<' + option + '>" est  validée';
      }
      else{

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
        data.id = this.id.path;
        data.revese=this.revese;
        this.dataService.update(this.id.path, data);
        this.result = 'Votre option : "<' + option + '>" est  validée';
      }



      Swal.fire({
          icon: 'success',
          title: 'Votre choix pour l\'image ' + index + ' a été envoyé',
        confirmButtonColor: '#141f29',
        showCancelButton: true,
        cancelButtonColor: '#213343',
        cancelButtonText: 'Retour à l\'accueil',
        confirmButtonText: "Suivant",
        }
      ).then((result) => {

        if (result.isConfirmed) {

          this.dataService.getAll().snapshotChanges().pipe(
            map(changes =>
              changes.map(c =>
                ({key: c.payload.key, ...c.payload.val()})
              )
            )).subscribe(data => {
              this.allData = data.filter(it => !(it.status) && !(it.problem));


              if (this.allData.length > 0) {
                const index = Math.floor(Math.random() * this.allData.length);
                {
                  this.router.navigate(['/detail/' + String(this.allData[index].key) + '/' + (this.allData[index].key[this.allData[index].key.length - 2] + this.allData[index].key[this.allData[index].key.length - 1])], {
                    queryParams: {
                      'key': String(this.allData[index].key),
                      'image_algo_1': this.allData[index].image_algo_1,
                      'image_algo_2': this.allData[index].image_algo_2,
                      'note_algo_1': this.allData[index].note_algo1,
                      'note_algo_2': this.allData[index].note_algo2,
                      'option': this.allData[index].option,
                      'status': this.allData[index].status,
                      'time_algo_1': this.allData[index].time_algo_1,
                      'time_algo_2': this.allData[index].time_algo_2,
                      'problem': this.allData[index].problem,
                    }
                  }).then(() => {
                    window.location.reload();
                  });
                }
              }
            }
          );
        }
        else{
          this.router.navigate(['notTested'])
        }
      });

//  option=&status=false&time_algo1=0.023186445236206055&time_algo2=0.02792501449584961
//  note_algo1=&note_algo2=&option=&status=false&time_algo_1=0.023186445236206055&time_algo_2=0.02792501449584961
      /*
           let newImage = this.getImageNotTested();
           if(newImage.id==""){
             console.log("Vide");
           }
           else{
             console.log(newImage.id)
             console.log(newImage.image_algo_1)
             console.log('//////////////////');
           }*

            */
      //this.router.navigate(['/notTested'])
    }
  }

  SendProblem(id, index) {
    const contactObject = new Contact('Erreur Technique : image : ' + this.id.path, new Date().toISOString(), 'Erreur image : ' + this.id.path);
    this.contact.add(contactObject);
    this.dataService.update(this.id.path, {'problem': true});
    Swal.fire({
        icon: 'success',
        title: 'Votre signale pour l\'image ' + index + ' a été envoyé',


      }
    );
    this.router.navigate(['/notTested']);
  }

  getImageNotTested(): Data {
    let result;
    result = new Data(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    );

    this.dataService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )).subscribe(data => {
      this.allData = data.filter(it => !(it.status) && !(it.problem));
      if (this.allData.length > 0) {
        //console.log(this.allData);
        //this.allData[0];


        console.log(this.allData[0].key.toString());
        this.next = new Data(
          String(this.allData[0].status),
          this.allData[0].image_algo_1,
          this.allData[0].image_algo_2,
          String(this.allData[0].note_algo1),
          String(this.allData[0].note_algo2),
          this.allData[0].option,
          this.allData[0].time_algo_1,
          this.allData[0].time_algo_2,
          this.allData[0].key
        );
      }

    });
    return result;
  }
}

/*
 this.next = new Data(
              String(this.allData[0].status),
              this.allData[0].image_algo_1,
              this.allData[0].image_algo_2,
              String(this.allData[0].note_algo_1),
              String(this.allData[0].note_algo_2),
              this.allData[0].option,
              this.allData[0].time_algo1,
              this.allData[0].time_algo2,
              this.allData[0].key
            );
 */
