import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Navbar } from './core/components/navbar/navbar';
import { TblPropertySharedservice } from './shared/services/tbl-property-shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    FormsModule,],
    
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected readonly title = signal('Biztracks360UI');


  constructor(
    private tblPropertySharedService: TblPropertySharedservice
  ) { }

  ngOnInit(): void {

    this.tblPropertySharedService.initProperties();

  }
}
