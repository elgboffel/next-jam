import { BaseItem } from "./BaseItem";
import { Media } from "./Media";
import { ILink } from "./Link";

export interface ISpot extends BaseItem {
    name: string,
    lead: string,
    heading: string,
    media: Media,
    link: ILink
}