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
exports.macadamScraper = void 0;
const event_1 = require("../event");
const jsdom_1 = require("jsdom");
const macadamScraper = (today, oneWeekLaterDate) => __awaiter(void 0, void 0, void 0, function* () {
    const macadamUrl = `https://ra.co/clubs/136779`;
    const macadamResponse = yield fetch(macadamUrl, { method: "GET" });
    const macadamResponseDom = new jsdom_1.JSDOM(yield macadamResponse.text());
    const document = macadamResponseDom.window.document;
    console.log(macadamResponseDom);
    const filteredDiv = Array.from(document.querySelectorAll("section div div div ul li div div ul li div[data-test-id]"));
    console.log(filteredDiv);
    return filteredDiv
        .map((div) => {
        let event = new event_1.OukonvaEvent();
        event.fromWerehouseDom(div, today, oneWeekLaterDate);
        return event;
    })
        .filter((el) => Object.keys(el).length !== 0);
});
exports.macadamScraper = macadamScraper;
