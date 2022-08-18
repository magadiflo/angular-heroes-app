import { HttpErrorResponse } from '@angular/common/http';
import { Hero } from './heroes.interface';

export interface AppResponse {
    appState: string;
    appData?: Hero;
    error?: HttpErrorResponse;
}