import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';

  constructor(private http: Http){
    
  }

  ngOnInit() {
      this.auth();
  }

  auth() {

    let params: URLSearchParams = new URLSearchParams();
        params.set('Username', "afms");
        params.set('password', "password123");
    let headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set("Accept","application/json");
    // headers.set("Access-Control-Allow-Origin", "localhost:4200");
    let options = new RequestOptions({ headers: headers});
    let text = "";

    this.http.post("http://dwdoctrix5754.cloudapp.net/sdkigb/igbwebAPI.asmx/IGB_Authenticate", params, options)
            .map((res:Response) => res.text())
            .subscribe(
                data => {
                    text = data;
                    console.log(text);
                 });
  }

  profile() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('UserID', "4237a566-ef4b-4ee2-9c8a-e3e8ce01414a");
    let headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    // headers.set("Accept","text/xml");
    // headers.set("Access-Control-Allow-Origin", "localhost:4200");
    let options = new RequestOptions({ headers: headers});
    let text = "";

    this.http.post("http://dwdoctrix5754.cloudapp.net/sdkigb/igbwebAPI.asmx/IGB_GetUserProfile", params, options)
            .map((res:Response) => res.text())
            .subscribe(
                data => {
                    text = data;
                    console.log(text);
                  });
  }
    
  hello() {
    let params: URLSearchParams = new URLSearchParams();
    // params.set('UserID', "Jason");
    let headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    // headers.set("Accept","text/xml,application/json");
    // headers.set("Access-Control-Allow-Origin", "localhost:4200");
    let options = new RequestOptions({ headers: headers});
    let text = "";

    // this.http.get("http://dwdoctrix5754.cloudapp.net/sdkigb/igbwebAPI.asmx/IGB_HelloDoctrix", options)
    //         .map((res:Response) => res.text())
    //         .subscribe(
    //             data => {
    //                 text = data;
    //                 console.log(text);
    //               });
    return this.http.post("http://dwdoctrix5754.cloudapp.net/sdkigb/igbwebAPI.asmx/IGB_HelloDoctrix", params, options)
            .map((res:Response) => res.text())
            .subscribe(
                data => {
                    text = data;
                    console.log(text);
                  });
  }

  post_auth() {
    let headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded' );
    // headers.set("Accept","text/xml");
    let options = new RequestOptions({ headers: headers });
    let text = "";
    let params: URLSearchParams = new URLSearchParams();
    params.set("Username", "afms");
    params.set("password", "password123");
    return this.http.post("http://dwdoctrix5754.cloudapp.net/sdkigb/igbwebAPI.asmx/IGB_Authenticate", params, options)
            .map((res:Response) => res.text())
            .subscribe(
                data => {
                    text = data;
                    console.log(text);
                  });
  }

  private extractData(res: Response) {
    let body = res.text();
    console.log(body)
    return body;
  }
 
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    let binaryString: string;
    var encStr; 
    var filename;
    let arrayBuffer;
    var byteArray;
    let text;
    var reader = new FileReader();
    
    if(fileList.length > 0) {
        let file: File = fileList[0];
        if (file) {
          filename = file.name;
            
           
            reader.onload  = (): void => {
              
              arrayBuffer = reader.result;
              // console.log(reader.result);
              // let str = reader.result;
              // let new_str = str.substring(13);
              // console.log(new_str);
              // byteArray = new Uint8Array(new_str);

              // console.log(reader.result); 
              // arrayBuffer = this.str2ab(new_str);
              // console.log(arrayBuffer);
              // byteArray = new Uint16Array(arrayBuffer);
              // byteArray = reader.result;
              // byteArray = new Uint8Array(arrayBuffer);
              // arrayBuffer = arrayBuffer.replace("data:;base64,","");
              
              // arrayBuffer = this.str2ab(arrayBuffer);
              console.log(arrayBuffer);
              var uint8 = new Uint8Array(arrayBuffer); // Assuming the binary format should be read in unsigned 8-byte chunks
                    // If you're on ES6 or polyfilling
                    // var result = Array.from(uint8);
                    // Otherwise, good old loop
                    let params: URLSearchParams = new URLSearchParams();
                    var result = [];
                    for (var i = 0; i < uint8.length; i++) {
                      result.push(uint8[i]);
                      params.append("FileBytes", (uint8[i].toString()));
                    }
              // byteArray = this.str2ab(arrayBuffer);
              // byteArray = this.base64ArrayBuffer(arrayBuffer);
              console.log(result);
              
              
              params.set("FileName", filename);
              
              params.set("LibraryID", "5022aee1-401f-4335-ae67-a6f79e5297e9");
              params.set("FolderID", "a219ae59-8381-4d99-b700-b16c5f7b421b");
              params.set("Category", "AFMS");
              params.set("UserID", "4237a566-ef4b-4ee2-9c8a-e3e8ce01414a");
              params.set("Remarks", "1");
      
              let headers = new Headers();
              headers.append('Content-Type', 'application/x-www-form-urlencoded');
              // console.log(params)
              let options = new RequestOptions({ headers: headers });
              this.http.post('http://dwdoctrix5754.cloudapp.net/sdkigb/igbwebAPI.asmx/IGB_UploadNewFile', params, options)
                  .map((res:Response) => res.text())
                  .subscribe(
                      data => {
                          text = data;
                          console.log(text);
                        });

            }
            reader.readAsArrayBuffer(file);
    
           
        }
         
        // console.log(imageData)
        
    }
    //  encStr = new Uint16Array(text);
    
            
  }

  downloadForm() {
    let text;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let params: URLSearchParams = new URLSearchParams();
    params.set("UserID", "4237a566-ef4b-4ee2-9c8a-e3e8ce01414a");
    params.set("DocumentID", "4dc8d59e-b2b2-42d3-8a60-b1e1274e21db");
    params.set("DocumentVersionID", "dc334fb8-ed3e-4397-b338-d053533f1ac7");
    
              // console.log(params)
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://dwdoctrix5754.cloudapp.net/sdkigb/igbwebAPI.asmx/IGB_DownloadFileVersion', params, options)
        .map((res:Response) => res.text())
        .subscribe(
            data => {
                text = data;
                console.log(text);
              });
  }
  
  
}


