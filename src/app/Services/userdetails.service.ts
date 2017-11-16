import {
    Injectable
} from '@angular/core';
import {
    Http,
    Response
} from '@angular/http';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/filter";



@Injectable()
export class UserdetailsService {

  private _url: string = "/assets/userdetails.json";
  private _appserviceurl: string = "http://localhost:3000/appid";
    constructor(private _http: Http) {}

    getUserDetails() {
        return this._http.get(this._url).map((response: Response) => {
            let _response = response.json();
            return _response;
        });
    }
    getAppID() {
        return this._http.get(this._appserviceurl).map((response: Response) => {
            let _response = response.json();
            return _response;
        });
    }

}
