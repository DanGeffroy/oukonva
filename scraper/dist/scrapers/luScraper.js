"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.luScraper = void 0;
const event_1 = require("../event");
const luScraper = (today, oneWeekLaterDate) => __awaiter(void 0, void 0, void 0, function* () {
    const luUrl = `https://api.lelieuunique.com/api/events?locale=fr&sort[date]=asc&pagination[limit]=-1&populate[categories][populate]=*&populate[accessibilities][populate]=*&populate[image][populate]=*&populate[dates][populate]=*&populate[date_disable][populate]=*&filters[$or][0][calendar_display][$null]=true&filters[$or][1][calendar_display][$eq]=true&filters[dates][date_start][$lte]=${today.toISOString()}&filters[dates][date_end][$gte]=${oneWeekLaterDate.toISOString()}=`;
    const luResponse = yield fetch(luUrl, { method: "GET" });
    const luData = yield luResponse.json();
    return luData.data.map((d) => {
        let event = new event_1.OukonvaEvent();
        event.fromLuApi(d);
        return event;
    });
});
exports.luScraper = luScraper;
