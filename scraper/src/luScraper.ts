import { OukonvaEvent } from "./event";

export const luScraper = async (): Promise<OukonvaEvent[]> => {
  const today = new Date();
  const oneWeekLaterDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  console.log(today.toISOString());
  console.log(oneWeekLaterDate.toISOString());
  const luUrl = `https://api.lelieuunique.com/api/events?locale=fr&sort[date]=asc&pagination[limit]=-1&populate[categories][populate]=*&populate[accessibilities][populate]=*&populate[image][populate]=*&populate[dates][populate]=*&populate[date_disable][populate]=*&filters[$or][0][calendar_display][$null]=true&filters[$or][1][calendar_display][$eq]=true&filters[dates][date_start][$lte]=${today.toISOString()}&filters[dates][date_end][$gte]=${oneWeekLaterDate.toISOString()}=`;

  const luResponse = await fetch(luUrl, { method: "GET" });
  const luData = await luResponse.json();
  return luData.data.map((d: any) => {
    let event = new OukonvaEvent();
    event.fromLuApi(d);
    return event;
  });
};
