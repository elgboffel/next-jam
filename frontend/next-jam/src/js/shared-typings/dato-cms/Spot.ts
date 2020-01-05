import { BaseItem } from "./BaseItem";
import { Media } from "./Media";

export interface Spot extends BaseItem {
    lead: string,
    heading: string,
    media: Media,
    link: string
}