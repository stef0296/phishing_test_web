import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'phishing-tester-web';
  SERVER_URL = "http://localhost:5050/check_phish";

  entryUrl: string = '';
  result: string = 'Enter a URL to check if it is valid';
  resultColor: string = 'black';


  urlRegex = 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)';
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {

  }

  checkURL() {

    if (this.entryUrl === null || this.entryUrl === '') {
      alert('Please enter a URL!');
      return;
    }

    if (!this.validURL(this.entryUrl)) {
      alert('Please enter a valid URL!');
      return;
    }

    if (!this.entryUrl.startsWith('http://') && !this.entryUrl.startsWith('https://'))
      this.entryUrl = 'http://' + this.entryUrl;

    let params = '';
    params += 'url=' + encodeURIComponent(this.entryUrl) + '&';
    params += 'format=' + encodeURIComponent('json');

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }) };

    this.httpClient.post(this.SERVER_URL, params, httpOptions).subscribe((res) => {
      console.log(res);

      if (res['results']['verified'])
        if (res['results']['valid']) {
          this.result = 'This site is a phish.';
          this.resultColor = 'red';
        } else {
          this.result = 'This site is not a phishing site.'
          this.resultColor = 'green';
        }
      else {
        this.result = 'Status Unknown';
        this.resultColor = 'grey';
      }

    }, (error) => {
      console.error(error);
    });
  }

  validURL(str) {
    var res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  }
}
