import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ApiService, Feed} from '../api.service'
import {Observable} from "rxjs";
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public current_feed: object;
  public feed_sources = {
    'lemonde': {
      name: 'Le monde',
      source: "lemonde"
    }
  }
  public feeds: Feed[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.current_feed = this.feed_sources[this.folder]
    this.apiService.getFeeds(this.current_feed['source']).subscribe((response) => {
      this.feeds = response;
    })
  }

  readArticle(article:Feed)
  {

  }
}
