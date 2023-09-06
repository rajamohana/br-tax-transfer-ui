import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent {
  dataSource1: any[] = []; // Initialize as an empty array or with your default data
  dataSource2: any[] = [];
  dataSource3: any[] = []; 
  // Define the displayed columns and page size for each section
  displayedColumns1: string[] = ['taskId', 'taskName', 'taskStatus']; // Adjust column names as needed
  displayedColumns2: string[] = ['taskId', 'taskName', 'taskStatus']; // Adjust column names as needed
  displayedColumns3: string[] = ['taskId', 'taskName', 'taskStatus']; // Adjust column names as needed
  pageSize: number = 10; // Adjust page size as needed
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TaskDetailComponent>
  ) {
    // Populate dataSource1 and dataSource2 with dummy data
    this.dataSource1 = [
      { taskId: 1, taskName: 'Task 1', taskStatus: 'Open' },
      { taskId: 2, taskName: 'Task 2', taskStatus: 'Closed' },
      // Add more data as needed
    ];

    this.dataSource2 = [
      { taskId: 3, taskName: 'Task 3', taskStatus: 'Open' },
      { taskId: 4, taskName: 'Task 4', taskStatus: 'Closed' },
      // Add more data as needed
    ];
    this.dataSource3 = [
      { taskId: 3, taskName: 'Task 3', taskStatus: 'Open' },
      { taskId: 4, taskName: 'Task 4', taskStatus: 'Closed' },
      // Add more data as needed
    ];
  }
  

  closeDialog(): void {
    this.dialogRef.close();
  }

}
