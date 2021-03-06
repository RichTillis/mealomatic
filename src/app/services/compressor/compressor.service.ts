import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//https://zocada.com/compress-resize-images-javascript-browser/

@Injectable({
  providedIn: 'root'
})
export class CompressorService {

  constructor() { }

  compress(file: File, width: number, imageType: string): Observable<any> {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return Observable.create(observer => {
      reader.onload = ev => {
        const img = new Image();
        img.src = (ev.target as any).result;
        (img.onload = () => {
          const elem = document.createElement('canvas'); // Use Angular's Renderer2 method
          const scaleFactor = width / img.width;
          elem.width = width;
          elem.height = img.height * scaleFactor;
          const ctx = <CanvasRenderingContext2D>elem.getContext('2d');
          ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
          ctx.canvas.toBlob(
            blob => {
              observer.next(
                new File([blob], file.name, {
                  type: 'image/' + imageType,
                  lastModified: Date.now(),
                }),
              );
            },
            'image/' + imageType,
            1,
          );
        }),
          (reader.onerror = error => observer.error(error));
      };
    });
  }
}