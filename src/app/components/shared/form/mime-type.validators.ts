import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export const mimeType = (
  control: AbstractControl,
  http: HttpClient
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  if (typeof control.value === 'string') {
    return of({ err: null });
  }
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = new Observable((observer: Observer<{ [key: string]: any }>) => {
    fileReader.addEventListener('loadend', () => {
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(
        0,
        4
      );
      let header = '';
      let isValid = false;
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }
      switch (header) {
        case '89504e47':
          isValid = true;
          break;
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
          isValid = true;
          break;
        default:
          isValid = false; // Or you can use the blob.type as fallback
          break;
      }
      if (isValid) {
        observer.next({ key: null });
      } else {
        observer.next({ invalidMimeType: true });
      }
      observer.complete();
    });
    fileReader.readAsArrayBuffer(file);
  });

  return frObs.pipe(
    map(() => {
      // Here, you can make an HTTP request if needed using the HttpClient module
      // For example, you might want to check if the file's MIME type is supported on the server.
      // Replace 'YOUR_BACKEND_API_ENDPOINT' with the actual API endpoint on your server.
      return http.get<{ valid: boolean }>('YOUR_BACKEND_API_ENDPOINT').pipe(
        map((responseData) => {
          if (responseData.valid) {
            return null; // File's MIME type is valid
          } else {
            return { invalidMimeType: true }; // File's MIME type is invalid
          }
        })
      );
    })
  );
};
