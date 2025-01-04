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
    // Create the overlay
    const overlay = this.renderer.createElement('div');
    this.renderer.addClass(overlay, 'modal-overlay');

    // Create the modal
    const modal = this.renderer.createElement('div');
    this.renderer.addClass(modal, 'modal-dialog');

    // Create the header
    const header = this.renderer.createElement('div');
    this.renderer.addClass(header, 'modal-header');
    const headerText = this.renderer.createText(title);
    this.renderer.appendChild(header, headerText);

    // Create the content
    const body = this.renderer.createElement('div');
    this.renderer.addClass(body, 'modal-body');
    const bodyContent = this.renderer.createText(content);
    this.renderer.appendChild(body, bodyContent);

    // Create the footer with buttons
    const footer = this.renderer.createElement('div');
    this.renderer.addClass(footer, 'modal-footer');

    // Accept button
    const acceptButton = this.renderer.createElement('button');
    this.renderer.addClass(acceptButton, 'modal-accept-button');
    const acceptButtonText = this.renderer.createText('Accept');
    this.renderer.appendChild(acceptButton, acceptButtonText);
    this.renderer.listen(acceptButton, 'click', () => {
      if (onAccept) onAccept();
      this.close(overlay);
    });

    // Cancel button
    const cancelButton = this.renderer.createElement('button');
    this.renderer.addClass(cancelButton, 'modal-cancel-button');
    const cancelButtonText = this.renderer.createText('Cancel');
    this.renderer.appendChild(cancelButton, cancelButtonText);
    this.renderer.listen(cancelButton, 'click', () => {
      if (onCancel) onCancel();
      this.close(overlay);
    });

    this.renderer.appendChild(footer, acceptButton);
    this.renderer.appendChild(footer, cancelButton);

    // Append header, body, and footer to modal
    this.renderer.appendChild(modal, header);
    this.renderer.appendChild(modal, body);
    this.renderer.appendChild(modal, footer);

    // Append modal to overlay
    this.renderer.appendChild(overlay, modal);

    // Append overlay to the document body
    this.renderer.appendChild(this.document.body, overlay);
  }

  // TODO: Needs a lot of refactoring

  info(
    content: string,
    title: string = 'Modal Title',
    onOk?: () => void
  ): void {
    // Create the overlay
    const overlay = this.renderer.createElement('div');
    this.renderer.addClass(overlay, 'modal-overlay');

    // Create the modal
    const modal = this.renderer.createElement('div');
    this.renderer.addClass(modal, 'modal-dialog');

    // Create the header
    const header = this.renderer.createElement('div');
    this.renderer.addClass(header, 'modal-header');
    const headerText = this.renderer.createText(title);
    this.renderer.appendChild(header, headerText);

    // Create the content
    const body = this.renderer.createElement('div');
    this.renderer.addClass(body, 'modal-body');
    const bodyContent = this.renderer.createText(content);
    this.renderer.appendChild(body, bodyContent);

    // Create the footer with buttons
    const footer = this.renderer.createElement('div');
    this.renderer.addClass(footer, 'modal-footer');

    // Ok button
    const okButton = this.renderer.createElement('button');
    this.renderer.addClass(okButton, 'modal-accept-button');
    const okButtonText = this.renderer.createText('Ok');
    this.renderer.appendChild(okButton, okButtonText);
    this.renderer.listen(okButton, 'click', () => {
      if (onOk) onOk();
      this.close(overlay);
    });

    this.renderer.appendChild(footer, okButton);

    // Append header, body, and footer to modal
    this.renderer.appendChild(modal, header);
    this.renderer.appendChild(modal, body);
    this.renderer.appendChild(modal, footer);

    // Append modal to overlay
    this.renderer.appendChild(overlay, modal);

    // Append overlay to the document body
    this.renderer.appendChild(this.document.body, overlay);
  }

  close(overlay: HTMLElement): void {
    this.renderer.removeChild(this.document.body, overlay);
  }
}
