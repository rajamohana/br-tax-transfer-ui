import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { ClientDataService } from 'src/app/services/client-data.service';

interface Client {
  value: string;
  viewValue: string;
}

interface ClientData {
  taxTaskId: number;
  taxStatus: string;
  taxName: string;
  taskSubject: string;
  taskOwner: string;
  taskCreatedDate: string;
  clientCode: string;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  clients: Client[] = [];
  selectedRadio = 'Open';
  selectedClient = '';
  clientData: ClientData[] = [];
  displayedColumns: string[] = [
    'action',
    'Task Id',
    'Task Status<',
    'Task Name',
    'Task Subject',
    'Task Owner',
    'Created Date',
  ];
  dataSource = new MatTableDataSource<ClientData>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  checkedElement!: ClientData;

  constructor(
    private dialog: MatDialog,
    private clientDetailsApi: ClientDataService
  ) {}

  ngOnInit(): void {
    this.getClientDropdownValues();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getClientDropdownValues() {
    // const clientCodeData = [
    //   {
    //     clientCode: 'EDJ',
    //   },
    //   {
    //     clientCode: 'BNS',
    //   },
    //   {
    //     clientCode: 'PFS',
    //   },
    //   {
    //     clientCode: 'BMO',
    //   },
    //   {
    //     clientCode: 'QUEST',
    //   },
    //   {
    //     clientCode: 'RBC',
    //   },
    //   {
    //     clientCode: 'CIBC',
    //   },
    // ];

    // this.clients = clientCodeData.map((item: any) => ({
    //   value: item.clientCode,
    //   viewValue: item.clientCode,
    // }));
    this.clientDetailsApi.getCustomerCodes().subscribe((res: any) => {
      if (res && res.length > 0) {
        const clientCodeData = res; //it need to replace with the res.
        // remove below code once checked
        
        this.clients = clientCodeData.map((item: any) => ({
          value: item.clientCode,
          viewValue: item.clientCode,
        }));
      }
    });
  }

  getOpenTaskDetails(selectedCliemtCode: string) {
    
    this.clientDetailsApi
      .getlistAllTaxOpenTasks(selectedCliemtCode)
      .subscribe((res: any) => {
        if (res && res.length > 0) {
          this.clientData = res;
          this.dataSource = new MatTableDataSource<ClientData>(this.clientData);
        }
      });
  }

  getClosedTaskDetails(selectedStatus: string, selectedCliemtCode: string) {
      
    this.clientDetailsApi
      .getlistAllTaxClosedTasks(selectedStatus, selectedCliemtCode)
      .subscribe((res: any) => {
        if (res && res.length > 0) {
          this.clientData = res;
          this.dataSource = new MatTableDataSource<ClientData>(this.clientData);
        }
      });
  }

  radioChange(event: MatRadioChange): void {
    this.selectedRadio = event.value;
    this.getTaskDetails();
  }

  onChangeClient(event: MatSelectChange): void {
    this.clientData = [];
    this.selectedClient = event.value;
    this.getTaskDetails();
  }

  private getTaskDetails() {
    if (this.selectedRadio === 'Open') {
      this.getOpenTaskDetails(this.selectedClient);
    } else {
      this.getClosedTaskDetails(this.selectedRadio, this.selectedClient);
    }
  }
  
  checkboxChange(element: ClientData): void {
    // this.dataSource.data.forEach(
    //   (t) => (t.selected = t.id !== element.id ? false : element.selected)
    // );
    // this.checkedElement = element;
  }

  complete(): void {
    // this.dataSource.data.forEach((t) => {
    //   if (t.id === this.checkedElement.id) {
    //     t.status = 'Closed';
    //   }
    // });
  }

  claim(): void {
    // this.dataSource.data.forEach((t) => {
    //   if (t.id === this.checkedElement.id) {
    //     t.status = 'Claimed';
    //   }
    // });
  }

  release(): void {
    // this.dataSource.data.forEach((t) => {
    //   if (t.id === this.checkedElement.id) {
    //     t.status = 'Unclaimed';
    //   }
    // });
  }

  openTaskDetailDialog(taskId: number): void {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '1000px',
      height: '600px',
      data: { taskId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed with result:', result);
    });
  }
}
