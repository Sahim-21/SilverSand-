import type { StaticImageData } from "next/image";

import beach from "../../../public/tourist_places/beach.jpg";
import idagunji from "../../../public/tourist_places/idagunji_temple.jpg";
import jetty from "../../../public/tourist_places/murudeshwar_jetty.jpg";
import temple from "../../../public/tourist_places/murudeshwar_temple.jpg";
import netrani from "../../../public/tourist_places/Netrani.jpg";
import yana from "../../../public/tourist_places/yana.jpeg";

export const ATTRACTION_STATIC: Record<string, StaticImageData> = {
  "/tourist_places/murudeshwar_temple.jpg": temple,
  "/tourist_places/beach.jpg": beach,
  "/tourist_places/Netrani.jpg": netrani,
  "/tourist_places/idagunji_temple.jpg": idagunji,
  "/tourist_places/yana.jpeg": yana,
  "/tourist_places/murudeshwar_jetty.jpg": jetty,
};
