import { BaseItem } from "./BaseItem";
import { Media } from "./Media";

export interface ISpot extends BaseItem {
    name: string,
    lead: string,
    heading: string,
    media: Media,
    link: string
}