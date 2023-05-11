import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private baseUrl: string;
    public apiName: string = "";

    constructor(private http: HttpClient) {
        this.baseUrl = "http://localhost:3309/";
    }

    //get data
    public getData(): Observable<any> {
        return this.http.get(this.baseUrl + this.apiName);
    }

    //get data by params
    public getDataByParam(paramValue: string | number): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        return this.http.get(this.baseUrl + this.apiName + '/' + paramValue, httpOptions);
    }

    //get data by object
    public getDataByObject(data: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        return this.http.post(this.baseUrl + this.apiName, JSON.stringify(data), httpOptions);
    }

    //save data
    public saveData(data: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        return this.http.post(this.baseUrl + this.apiName, JSON.stringify(data), httpOptions);
    }

    //update data
    public updateData(paramValue: string | number, data: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        return this.http.put(this.baseUrl + this.apiName + '/' + paramValue, JSON.stringify(data), httpOptions);
    }

    //delete data
    public deleteData(data: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
            }),
        };

        return this.http.put(this.baseUrl + this.apiName, JSON.stringify(data), httpOptions);
    }

}