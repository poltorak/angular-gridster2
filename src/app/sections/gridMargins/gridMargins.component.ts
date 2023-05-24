import { NgForOf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import {
  DisplayGrid,
  GridsterComponent,
  GridsterComponentInterface,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponent,
  GridType
} from 'angular-gridster2';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-grid-margins',
  templateUrl: './gridMargins.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,

    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,

    MarkdownModule,

    GridsterComponent,
    GridsterItemComponent
  ]
})
export class GridMarginsComponent implements OnInit {
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  public gridsterApi!: GridsterConfig['api'];

  ngOnInit(): void {
    this.options = {
      gridType: GridType.VerticalFixed,
      displayGrid: DisplayGrid.Always,
      disableScrollHorizontal: true,
      margin: 16,
      minCols: 4,
      minRows: 2,
      maxCols: 4,
      maxRows: 40,
      fixedRowHeight: 210,
      outerMarginBottom: 0,
      outerMarginTop: 0,
      outerMarginLeft: 0,
      outerMarginRight: 0,
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: true
      },
      swap: true,
      scrollToNewItems: true,
      initCallback: (gridster: GridsterComponentInterface) => {
        this.gridsterApi = gridster.options.api;
        this.setMargin();
      }
    };

    this.dashboard = [
      { cols: 1, rows: 1, y: 0, x: 0 },
      { cols: 2, rows: 2, y: 0, x: 2 },
      { cols: 1, rows: 1, y: 0, x: 3 }
    ];
  }

  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event: MouseEvent | TouchEvent, item): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
  }

  private setMargin(): void {
    const width = window.innerWidth;
    if (width < 1920) {
      this.options.margin = 8;
    } else {
      this.options.margin = 16;
    }
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }
}
