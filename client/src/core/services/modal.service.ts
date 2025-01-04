import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private renderer: Renderer2;
  
  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }
  
  open(
    content: string,
    title: string = 'Modal Title',
    onAccept?: () => void,
    onCancel?: () => void
  ): void {
    const overlay = this.createOverlay();
    const modal = this.createModal(title, content);

    // Footer with buttons
    const footer = this.renderer.createElement('div');
    this.renderer.addClass(footer, 'modal-footer');

    // Accept Button
    const acceptButton = this.createButton('Accept', 'modal-accept-button', () => {
      if (onAccept) onAccept();
      this.close(overlay);
    });

    // Cancel Button
    const cancelButton = this.createButton('Cancel', 'modal-cancel-button', () => {
      if (onCancel) onCancel();
      this.close(overlay);
    });

    this.renderer.appendChild(footer, acceptButton);
    this.renderer.appendChild(footer, cancelButton);
    this.renderer.appendChild(modal, footer);
    this.renderer.appendChild(overlay, modal);
    this.renderer.appendChild(this.document.body, overlay);
  }

  // Info modal with only an OK button
  info(content: string, title: string = 'Information', onOk?: () => void): void {
    const overlay = this.createOverlay();
    const modal = this.createModal(title, content);

    // Footer with OK button
    const footer = this.renderer.createElement('div');
    this.renderer.addClass(footer, 'modal-footer');

    const okButton = this.createButton('OK', 'modal-accept-button', () => {
      if (onOk) onOk();
      this.close(overlay);
    });

    this.renderer.appendChild(footer, okButton);
    this.renderer.appendChild(modal, footer);
    this.renderer.appendChild(overlay, modal);
    this.renderer.appendChild(this.document.body, overlay);
  }

  private createOverlay(): HTMLElement {
    const overlay = this.renderer.createElement('div');
    this.renderer.addClass(overlay, 'modal-overlay');
    return overlay;
  }

  // Utility: Create a modal
  private createModal(title: string, content: string): HTMLElement {
    const modal = this.renderer.createElement('div');
    this.renderer.addClass(modal, 'modal-dialog');

    const header = this.renderer.createElement('div');
    this.renderer.addClass(header, 'modal-header');
    this.renderer.appendChild(header, this.renderer.createText(title));

    const body = this.renderer.createElement('div');
    this.renderer.addClass(body, 'modal-body');
    this.renderer.appendChild(body, this.renderer.createText(content));

    this.renderer.appendChild(modal, header);
    this.renderer.appendChild(modal, body);
    return modal;
  }

  // Utility: Create a button
  private createButton(
    text: string,
    cssClass: string,
    onClick: () => void
  ): HTMLElement {
    const button = this.renderer.createElement('button');
    this.renderer.setAttribute(button, 'type', 'button');
    this.renderer.addClass(button, cssClass);
    this.renderer.appendChild(button, this.renderer.createText(text));
    this.renderer.listen(button, 'click', onClick);
    return button;
  }


  close(overlay: HTMLElement): void {
    this.renderer.removeChild(this.document.body, overlay);
  }
}
