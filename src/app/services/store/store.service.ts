import { CanvasState } from '@/types';
import { canvasUi } from '@/utils/canvas';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  #stateSignal = signal<CanvasState>({
    backgroundColor: canvasUi.backgroundColor,
    borderColor: canvasUi.borderColor,
    primaryTextColor: canvasUi.primaryTextColor,
    secondaryTextColor: canvasUi.secondaryTextColor,
  });

  public readonly state = this.#stateSignal.asReadonly();

  updateState(state: Partial<CanvasState>) {
    this.#stateSignal.set({
      backgroundColor: state.backgroundColor ?? this.#stateSignal().backgroundColor,
      borderColor: state.borderColor ?? this.#stateSignal().borderColor,
      primaryTextColor: state.primaryTextColor ?? this.#stateSignal().primaryTextColor,
      secondaryTextColor: state.secondaryTextColor ?? this.#stateSignal().secondaryTextColor,
    });
  }
}
