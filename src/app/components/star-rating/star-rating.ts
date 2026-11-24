
import {
  Component,
  model,
  input,
  output
} from '@angular/core';

import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  template: `
    <div class="star-rating" role="group" aria-label="Skill rating">
      @for (star of stars; track star) {
        <button
          type="button"
          class="star"
          [class.active]="star <= value()"
          [disabled]="disabled()"
          [attr.aria-label]="'Rate ' + star + ' out of 5'"
          [attr.aria-pressed]="star === value()"
          (click)="value.set(star)"
          (blur)="touch.emit()">
          ★
        </button>
      }
      <span class="rating-value">{{ value() }}/5</span>
    </div>
  `,
  styles: [`
    .star-rating {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .star {
      border: none;
      background: transparent;
      color: #cbd5e1;
      font-size: 27px;
      cursor: pointer;
      padding: 2px;
    }

    .star.active {
      color: #f5a623;
    }

    .star:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .rating-value {
      margin-left: 8px;
      font-size: 13px;
      color: #64748b;
    }
  `]
})
export class StarRating implements FormValueControl<number> {

  value = model(1);

  disabled = input(false);

  touch = output<void>();

  stars = [1, 2, 3, 4, 5];
}
