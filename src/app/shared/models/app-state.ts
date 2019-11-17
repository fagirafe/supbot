import { Profile } from "./profile";
import { Item } from "./item";
import { Settings } from "./settings";
import { EntityState } from "@ngrx/entity";

export interface AppState {
  readonly items: EntityState<Item>;
  readonly profile: Profile;
  readonly settings: Settings;
}
