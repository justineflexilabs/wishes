import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WishItem } from 'src/shared/models/wishItem';
import { EventService } from 'src/shared/services/EventService';

@Component({
  selector: 'app-wish-list-item',
  templateUrl: './wish-list-item.component.html',
  styleUrls: ['./wish-list-item.component.css'],
})
export class WishListItemComponent {
  @Input() wish!: WishItem;

  get cssClasses() {
    return {
      'strikeout text-muted': this.wish.isComplete,
    };
  }

  constructor(private events: EventService) {}

  ngOnInit(): void {}

  removeWish() {
    this.events.emit('removeWish', this.wish);
  }

  toggleFulfilled() {
    this.wish.isComplete = !this.wish.isComplete;
  }
}
