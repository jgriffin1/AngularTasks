import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms'
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit{
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  newTask: Task = {
    text: '',
    day: '',
    reminder: false
  };
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(
      (value) => (this.showAddTask = value)
    )
  }

  ngOnInit(): void {}

  onSubmit() {
    if(!this.newTask.day) {
      alert("Day is required");
      return;
    }
    if(!this.newTask.text) {
      alert("Task text is required");
      return;
    }

    this.onAddTask.emit(this.newTask);

    //reset
    this.newTask = {
      text: '',
      day: '',
      reminder: false
    }
  }
}
