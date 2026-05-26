import { Component } from '@angular/core';
import { SideBar } from "../core/layout/sidebar/side-bar.component";
import { CardsMetasComponent } from '../shared/cards-metas/cards-metas.component';

@Component({
  selector: 'app-metas',
  standalone: true,
  imports: [SideBar, CardsMetasComponent],
  templateUrl: './metas.component.html',
  styleUrl: './metas.component.scss'
})
export class MetasComponent {

}
