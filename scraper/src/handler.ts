import { OukonvaEvent } from "./event";
import { luScraper } from "./luScraper";
import { stationNuageScraper } from "./stationNuageScraper";

export const oukouvaScrap = async (event: any) => {
  const luData = await luScraper();
  const stationNuageData = await stationNuageScraper();
  return {
    statusCode: 200,
    body: [...luData, ...stationNuageData],
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
