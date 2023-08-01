import { OukonvaEvent } from "../event";
import { JSDOM } from "jsdom";

export const warehouseScraper = async (
  today: Date,
  oneWeekLaterDate: Date
): Promise<OukonvaEvent[]> => {
  const warehouseUrl = `https://www.warehouse-nantes.fr/event`;

  const warehouseResponse = await fetch(warehouseUrl, { method: "GET" });
  const warehouseResponseDom = new JSDOM(await warehouseResponse.text());

  const document = warehouseResponseDom.window.document;
  const filteredDiv = Array.from(
    document.querySelectorAll("article.card.mb-2")
  );
  return filteredDiv
    .map((div) => {
      let event = new OukonvaEvent();
      event.fromWerehouseDom(div, today, oneWeekLaterDate);
      return event;
    })
    .filter((el) => Object.keys(el).length !== 0);
};
