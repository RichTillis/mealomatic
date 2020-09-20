import { Observable } from 'rxjs';

export interface Meal {
  id?: string;
  title: string;
  accompaniments?: string;
  imageURL?: Observable<string>;
  description?: string;
}
