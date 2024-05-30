import { Component, ViewChild, ElementRef } from '@angular/core';
import html2canvas from 'html2canvas';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-screenshot',
  standalone: true,
  templateUrl: './screenshot.component.html',
  styleUrls: ['./screenshot.component.css']
})
export class Screenshot {
  @ViewChild('screenshotDiv', { static: false }) screenshotDiv!: ElementRef;

  constructor(private clipboardService: ClipboardService) {}

  takeScreenshot() {
    html2canvas(this.screenshotDiv.nativeElement).then((canvas: HTMLCanvasElement) => {
      const imageData = canvas.toDataURL('image/png');
      
      const anchor = document.createElement('a');
      anchor.href = imageData;
      anchor.download = 'screenshot.png';
      anchor.click();
    });
  }
  
  copyToClipboard() {
    html2canvas(this.screenshotDiv.nativeElement).then((canvas: HTMLCanvasElement) => {
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const clipboardItem = new ClipboardItem({ 'image/png': blob });
          navigator.clipboard.write([clipboardItem]);
        }
      });
    });
  }  
}
