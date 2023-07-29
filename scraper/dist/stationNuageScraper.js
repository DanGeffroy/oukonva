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
exports.stationNuageScraper = void 0;
const event_1 = require("./event");
const jsdom_1 = require("jsdom");
const stationNuageScraper = () => __awaiter(void 0, void 0, void 0, function* () {
    const stationNuageUrl = `https://station-nuage.fr/Agenda`;
    const stationNuageResponse = yield fetch(stationNuageUrl, { method: "GET" });
    const stationNuageResponseDom = new jsdom_1.JSDOM(yield stationNuageResponse.text());
    const document = stationNuageResponseDom.window.document;
    const filteredDiv = Array.from(document.querySelectorAll('[grid-col="x7"] span span'));
    return filteredDiv
        .map((div) => {
        let event = new event_1.OukonvaEvent();
        event.fromStationNuageDom(div);
        return event;
    })
        .filter((el) => Object.keys(el).length !== 0);
});
exports.stationNuageScraper = stationNuageScraper;
