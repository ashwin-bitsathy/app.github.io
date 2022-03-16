import { Component, VERSION, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import {DatePipe} from '@angular/common';
import { Board } from './models/board.model';
import { Column } from './models/column.model';
import { Task } from './models/task.model';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers:[DatePipe]
})
export class AppComponent implements OnInit  {

  rec:any = 'RECEIVED ORDERS TEMP';
  progressOrder:string ="ORDER IN PROGRESS TEMP";
  orderReady:string = "ORDER READY FOR DELIVERY TEMP";
  orderPicked:string="ORDER PICKED UP TEMP";
  public board: Board = new Board('Test Board', [
    new Column(this.rec, '1', [
      new Task('#26',"#456",new Date(),"Paratha Side Dish (2Nos),plain Dosa",'Ashwin'),
      new Task('#27',"#457",new Date(),"Paratha Side Dish (2Nos),plain Dosa",'Ashwin'),
      new Task('#28',"#458",new Date(),"Paratha Side Dish (2Nos),plain Dosa",'Ashwin'),
      new Task('#29',"#459",new Date(),"Paratha Side Dish (2Nos),plain Dosa",'Ashwin')
    ]),
    new Column(this.progressOrder, '2', [
      new Task('#27',"#45",new Date(),"Paratha Side Dish (2Nos),plain Dosa",'Ashwin')
    ]),
    new Column(this.orderReady, '3', [
      new Task('#28',"#451",new Date(),"Paratha Side Dish (2Nos),plain Dosa",'Ashwin')
    ]),
    new Column(this.orderPicked, '4', [
      new Task('#29',"#458",new Date(),"Paratha Side Dish (2Nos),plain Dosa",'Ashwin')
    ])
    
  ]);

  constructor(private datePipe: DatePipe){}

  public ngOnInit(): void {
    console.log(this.board);
    this.updateCount();
  }

  dateConvert(data:any)
  {
    return this.datePipe.transform(data, 'dd/MM/YYYY');
  }
  public updateCount()
  {
    this.board.columns.forEach(d=>{
        let name = d.tasks.length;
        let nn = d.name.split(' ');
        nn[nn.length-1] = "("+name+")";
        d.name = nn.join(" ")


    });
  }

  public dropGrid(event: CdkDragDrop<Task[]>): void {
    moveItemInArray(this.board.columns, event.previousIndex, event.currentIndex);
  }

  public drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
    this.updateCount();
    console.log(this.board);
  }
}
