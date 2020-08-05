import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CourseProvider {

  private url = 'https://d2507458caf0.ngrok.io';

  constructor(public http: HttpClient) {
  }

  public async register(fcmToken: string): Promise<Object> {
    const data = {
      token: fcmToken
    }
    return this.http.post(`${this.url}/course/register`, data).toPromise();
  }

  public async finish(fcmToken: string): Promise<Object> {
    const data = {
      token: fcmToken
    }
    return this.http.post(`${this.url}/course/finish`, data).toPromise();
  }

}
