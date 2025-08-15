import type { Texture } from "three";
import type { ImageSrc } from "./config";

export interface ImageTexture extends ImageSrc {
  id: string;
  texture: Texture;
}
