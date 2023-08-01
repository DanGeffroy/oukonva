import { OukonvaEvent } from "../event";
import { JSDOM } from "jsdom";

export const macadamScraper = async (
  today: Date,
  oneWeekLaterDate: Date
): Promise<OukonvaEvent[]> => {
  const macadamUrl = `https://ra.co/clubs/136779`;

  const macadamResponse = await fetch(macadamUrl, { method: "GET" });

  const macadamResponseDom = new JSDOM(await macadamResponse.text());
  const document = macadamResponseDom.window.document;
  console.log(macadamResponseDom);
  const filteredDiv = Array.from(
    document.querySelectorAll(
      "section div div div ul li div div ul li div[data-test-id]"
    )
  );
  console.log(filteredDiv);
  return filteredDiv
    .map((div) => {
      let event = new OukonvaEvent();
      event.fromWerehouseDom(div, today, oneWeekLaterDate);
      return event;
    })
    .filter((el) => Object.keys(el).length !== 0);
};
