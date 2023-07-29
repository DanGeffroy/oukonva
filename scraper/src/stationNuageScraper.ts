import { OukonvaEvent } from "./event";
import { JSDOM } from "jsdom";

export const stationNuageScraper = async (): Promise<OukonvaEvent[]> => {
  const stationNuageUrl = `https://station-nuage.fr/Agenda`;

  const stationNuageResponse = await fetch(stationNuageUrl, { method: "GET" });
  const stationNuageResponseDom = new JSDOM(await stationNuageResponse.text());

  const document = stationNuageResponseDom.window.document;
  const filteredDiv = Array.from(
    document.querySelectorAll('[grid-col="x7"] span span')
  );
  return filteredDiv
    .map((div) => {
      let event = new OukonvaEvent();
      event.fromStationNuageDom(div);
      return event;
    })
    .filter((el) => Object.keys(el).length !== 0);
};
