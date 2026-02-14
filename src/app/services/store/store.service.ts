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
    backgroundColorAlpha: canvasUi.backgroundColorAlpha,
    borderColorAlpha: canvasUi.borderColorAlpha,
    primaryTextColorAlpha: canvasUi.primaryTextColorAlpha,
    secondaryTextColorAlpha: canvasUi.secondaryTextColorAlpha,
  });

  public readonly state = this.#stateSignal.asReadonly();

  updateState(state: Partial<CanvasState>) {
    this.#stateSignal.set({
      backgroundColor: state.backgroundColor ?? this.#stateSignal().backgroundColor,
      borderColor: state.borderColor ?? this.#stateSignal().borderColor,
      primaryTextColor: state.primaryTextColor ?? this.#stateSignal().primaryTextColor,
      secondaryTextColor: state.secondaryTextColor ?? this.#stateSignal().secondaryTextColor,
      backgroundColorAlpha: state.backgroundColorAlpha ?? this.#stateSignal().backgroundColorAlpha,
      borderColorAlpha: state.borderColorAlpha ?? this.#stateSignal().borderColorAlpha,
      primaryTextColorAlpha: state.primaryTextColorAlpha ?? this.#stateSignal().primaryTextColorAlpha,
      secondaryTextColorAlpha: state.secondaryTextColorAlpha ?? this.#stateSignal().secondaryTextColorAlpha,
    });
  }
}
