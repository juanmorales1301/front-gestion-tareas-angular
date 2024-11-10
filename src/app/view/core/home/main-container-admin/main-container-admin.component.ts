import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';
import { FooterAdminComponent } from '../footer-admin/footer-admin.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-main-container-admin',
  standalone: true,
  imports: [
    RouterModule, 
    HeaderAdminComponent,
    MenuAdminComponent,
    FooterAdminComponent
  ],
  templateUrl: './main-container-admin.component.html',
  styleUrl: './main-container-admin.component.scss',
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0%)', flex: '0 1 300px' })),
      state('out', style({ transform: 'translateX(-100%)', flex: '0 0 0px'})),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
    trigger('expand', [
      state('in', style({ flex: '1' })),
      state('out', style({ flex: '1', width: '100%' })),
      transition('* => *', animate('400ms ease-in-out')),
    ]),
  ]
})
export class MainContainerAdminComponent {
  public menuState: string = 'in';

  constructor(){    
    this.adjustMenuStateOnResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustMenuStateOnResize();
  }

  adjustMenuStateOnResize() {
    if (window.innerWidth < 700) {
      this.menuState = 'out';
    } else {
      this.menuState = 'in';
    }
  }

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  selectOpc(Evento: any){
    if (window.innerWidth < 700) {
      this.menuState = 'out';
    }
  }

}
