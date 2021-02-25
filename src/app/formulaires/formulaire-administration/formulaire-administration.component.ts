import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Chantier} from '../../shared/model/chantier';
import {ChantierGet} from '../../shared/model/chantierGet';
import {FormControl, FormGroup} from '@angular/forms';
import {FormulaireEstimationComponent} from '../formulaire-estimation/formulaire-estimation.component';
import {FormulaireCommercialComponent} from '../formulaire-commercial/formulaire-commercial.component';

@Component({
  selector: 'app-formulaire-administration',
  templateUrl: './formulaire-administration.component.html',
  styleUrls: ['./formulaire-administration.component.css']
})
export class FormulaireAdministrationComponent implements OnInit {
  @Input() chantier: ChantierGet;
  @ViewChild(FormulaireCommercialComponent, {static: false}) child;
  formAdministration: FormGroup;
  numbers: number[] = [];
  constructor() {
  }

  ngOnInit(): void {
      this.formAdministration = new FormGroup({
              conducteur: new FormControl(''),
              }
      );
      for (let i = 0; i < this.chantier.nbOuvrier; i++){
          this.numbers.push(i);
          this.formAdministration.addControl(String(i), new FormControl(''));
      }
  }

    onSubmit(): void {
        this.child.onSubmit();
    }
}
