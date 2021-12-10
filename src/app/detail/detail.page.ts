import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService, Feed} from "../api.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  feed: Feed;
  source: string;
  article_id : string;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.source = this.activatedRoute.snapshot.paramMap.get('source');
    this.article_id = this.activatedRoute.snapshot.paramMap.get('article_id');
    this.apiService.getFeed(this.source,this.article_id).subscribe((response) => {
      console.log(response, response[3])
      this.feed = response;
    })
  }

}
