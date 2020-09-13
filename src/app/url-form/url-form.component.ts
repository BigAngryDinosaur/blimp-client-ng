import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface IUrlFormValues {
  url: string
}

interface IUrlResponse {
  code: string,
  url: string
}

@Component({
  selector: 'app-url-form',
  templateUrl: './url-form.component.html',
  styleUrls: ['./url-form.component.scss']
})
export class UrlFormComponent implements OnInit {

  urlForm!: FormGroup;
  shortUrl: string | undefined;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.urlForm = new FormGroup({
      url: new FormControl('')
    });
  }

  onSubmit(model: IUrlFormValues) {
    const url = "//localhost:8082/api/url";
    this.httpClient
      .post<IUrlResponse>(url, { url: model.url })
      .subscribe((urlResponse: IUrlResponse) => {
        this.shortUrl = `http://localhost:8082/${urlResponse.code}`;
      });
  }

}
