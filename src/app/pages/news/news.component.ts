import { Component, OnInit } from "@angular/core";

import { UtilsService } from "../../core/services/utils/utils.service";
import { version } from "../../../../package.json";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.scss"]
})
export class NewsComponent implements OnInit {
  public version: string = version;

  constructor(public _utilsService: UtilsService) {}

  ngOnInit() {}
}
