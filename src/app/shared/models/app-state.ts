import { Profile } from "./profile";
import { EntityState } from "@ngrx/entity";
import { Item } from "./item";
import { Settings } from "./settings";

export interface AppState {
  readonly items: EntityState<Item>;
  readonly profile: Profile;
  readonly settings: Settings;
}
