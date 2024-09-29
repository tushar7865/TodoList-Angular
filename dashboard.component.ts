import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { Task } from '../../model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  } 

  taskObj: Task = new Task();
  taskArr: Task[] = [];
  editTaskValue : string = '';

  addTaskValue : string = '';

  constructor(private crudService : CrudService) {}
  ngOnInit(): void { 
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new  Task();
    this.taskArr = [];
    this.getAllTask();   
  }
  getAllTask() {
    this.crudService.getAllTask().subscribe(res=> {
            this.taskArr = res;
    }, err=> {
        alert("Unable to get list of tasks");
    })
  }
addTask(){
  this.taskObj.task_name = this.addTaskValue
  this.crudService.addTask(this.taskObj).subscribe(res => {
        this.ngOnInit();
        this.addTaskValue = '';
  }, err => {
    alert(err)
  })
}

editTask() {
  this.taskObj.task_name = this.editTaskValue;
  this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
  }, err => {
alert("Failed to update task");
  })
}

deleteTask(etask: Task) {
  this.crudService.deleteTask(etask).subscribe(res => {
            this.ngOnInit();
  }, err=>{
    alert("Failed to delete task");
  });
}
}
