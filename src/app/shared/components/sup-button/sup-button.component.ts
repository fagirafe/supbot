import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "sup-button",
  templateUrl: "./sup-button.component.html",
  styleUrls: ["./sup-button.component.scss"]
})
export class SupButtonComponent implements OnInit {
  @Input() label: String;
  @Input() size: String = "small";
  @Input() color: String = "black";
  @Output() onClickEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}
}
