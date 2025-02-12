import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-response-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" [ngClass]="{'text-success': type === 'success', 'text-danger': type === 'error'}">
        {{ title }}
      </h4>
    </div>
    <div class="modal-body">
      <p>{{ message }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.close()">Close</button>
    </div>
  `,
})
export class ResponseModalComponent {
  @Input() title!: string;
  @Input() message!: string;
  @Input() type!: 'success' | 'error';

  constructor(public activeModal: NgbActiveModal) {}
}