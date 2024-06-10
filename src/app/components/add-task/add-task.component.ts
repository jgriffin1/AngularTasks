import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms'
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit{
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  newTask: Task = {
    text: '',
    day: '',
    reminder: false
  }

  constructor(private taskService: TaskService) {}

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
