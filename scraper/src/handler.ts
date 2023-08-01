import { luScraper } from "./scrapers/luScraper";
import { macadamScraper } from "./scrapers/macadamScraper";
import { stationNuageScraper } from "./scrapers/stationNuageScraper";
import { warehouseScraper } from "./scrapers/warehouseScraper";

export const oukouvaScrap = async (event: any) => {
  const today = new Date();
  const oneWeekLaterDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const luData = await luScraper(today, oneWeekLaterDate);
  const stationNuageData = await stationNuageScraper(today, oneWeekLaterDate);
  const warehouseData = await warehouseScraper(today, oneWeekLaterDate);
  const macadamData = await macadamScraper(today, oneWeekLaterDate);
  return {
    statusCode: 200,
    body: [...warehouseData, ...macadamData, ...luData, ...stationNuageData],
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
