import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task'
import { NgFor } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from '../../services/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgFor, TaskItemComponent, AddTaskComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (
      this.tasks = this.sortTasks(tasks)
    ));
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe((deletedTask) => (
      this.tasks = this.tasks.filter(t => t.id !== deletedTask.id)
    ));
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((newTask: Task) => {
      this.tasks.push(newTask);
      this.tasks = this.sortTasks(this.tasks);
    });
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;

    this.taskService.updateTask(task).subscribe((changedTask: Task) => {
      this.tasks = this.tasks.filter(t => t.id !== changedTask.id);
      this.tasks.push(changedTask);
      this.tasks = this.sortTasks(this.tasks);
    });
  }

  private sortTasks(tasks: Task[]): Task[] {
    return tasks.sort(function (a: Task, b: Task) {
      if (!a.id || !b.id) return 0;
      return a.id - b.id
    })
  }
}
