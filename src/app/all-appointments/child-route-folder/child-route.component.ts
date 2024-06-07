import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-child-route',
  templateUrl: './child-route.component.html',
  styleUrls: ['./child-route.component.scss'],
})
export class ChildRouteComponent implements OnInit {
  id!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve the 'id' parameter from the route
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam !== null ? idParam : ''; // Handle null case
  }
}
