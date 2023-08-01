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
exports.warehouseScraper = void 0;
const event_1 = require("../event");
const jsdom_1 = require("jsdom");
const warehouseScraper = (today, oneWeekLaterDate) => __awaiter(void 0, void 0, void 0, function* () {
    const warehouseUrl = `https://www.warehouse-nantes.fr/event`;
    const warehouseResponse = yield fetch(warehouseUrl, { method: "GET" });
    const warehouseResponseDom = new jsdom_1.JSDOM(yield warehouseResponse.text());
    const document = warehouseResponseDom.window.document;
    const filteredDiv = Array.from(document.querySelectorAll("article.card.mb-2"));
    return filteredDiv
        .map((div) => {
        let event = new event_1.OukonvaEvent();
        event.fromWerehouseDom(div, today, oneWeekLaterDate);
        return event;
    })
        .filter((el) => Object.keys(el).length !== 0);
});
exports.warehouseScraper = warehouseScraper;
