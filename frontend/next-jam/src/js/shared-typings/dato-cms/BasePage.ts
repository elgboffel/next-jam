import { BaseItem } from "./BaseItem";
import { Media } from "./Media";

export interface BasePage extends BaseItem {
    position: number,
    children: string[],
    name: string,
    slug: string
    objectID: string,
    template: string,
    url: string,
    image: Media,    
}