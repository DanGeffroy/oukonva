"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OukonvaEvent = void 0;
class OukonvaEvent {
    fromLuApi(data) {
        this.place = "Lieu unique";
        this.title = data.attributes.title;
        this.subtitle = data.attributes.subtitle;
        this.price = data.attributes.price;
        this.date = data.attributes.date_auto;
        this.dates = {
            start: data.attributes.dates[0].date_start,
            end: data.attributes.dates[0].date_end,
        };
        this.link = `https://www.lelieuunique.com/evenement/${data.attributes.slug}`;
        this.map = "47.2152915,-1.545618";
    }
    fromStationNuageDom(div, today, oneWeekLaterDate) {
        var _a, _b;
        const regex = /(\d{2}\.\d{2})\n\n([\s\S]+)\n(\d{2}:\d{2}) - (\d{2}:\d{1,2}) ([^\n︎]+)/;
        const matches = (_a = div.textContent) === null || _a === void 0 ? void 0 : _a.match(regex);
        if (matches) {
            const [day, month] = matches[1].split(".");
            const startTime = matches[3];
            const [hours, minutes] = startTime.split(":");
            const endTime = matches[4];
            const dateObject = new Date(`${new Date().getFullYear()}/${parseInt(month)}/${parseInt(day)} UTC`);
            dateObject.setUTCHours(parseInt(hours));
            dateObject.setMinutes(parseInt(minutes));
            //  new Date(Date.now() - 86400000) === yesterday
            if (this.dateIsBetween(dateObject, today, oneWeekLaterDate)) {
                this.link = (_b = div.querySelector("a")) === null || _b === void 0 ? void 0 : _b.getAttribute("href");
                this.place = "Station nuage";
                this.date = dateObject.toISOString();
                this.title = matches[2].trim();
                this.artiste = matches[5].trim();
                this.time = `${startTime} - ${endTime}`;
                this.map = "47.2102635,-1.5146832";
            }
        }
    }
    fromWerehouseDom(div, today, oneWeekLaterDate) {
        var _a, _b, _c, _d;
        const dateString = (_a = div.querySelector("small")) === null || _a === void 0 ? void 0 : _a.textContent;
        const regex = /(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\s+(\d+)\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+à\s+(\d+:\d+)/;
        const match = dateString.match(regex);
        if (match) {
            const day = parseInt(match[2]);
            const month = match[3];
            const time = match[4];
            // Conversion de la date en objet Date JavaScript
            const monthsMapping = {
                janvier: 0,
                février: 1,
                mars: 2,
                avril: 3,
                mai: 4,
                juin: 5,
                juillet: 6,
                août: 7,
                septembre: 8,
                octobre: 9,
                novembre: 10,
                décembre: 11,
            };
            const monthIndex = monthsMapping[month];
            const dateObject = new Date(`${new Date().getFullYear()}/${parseInt(monthIndex + 1)}/${day} UTC`);
            if (this.dateIsBetween(dateObject, today, oneWeekLaterDate)) {
                this.place = "Warehouse";
                this.link = `https://www.warehouse-nantes.fr${(_b = div
                    .querySelector("a.stretched-link")) === null || _b === void 0 ? void 0 : _b.getAttribute("href")}`;
                this.title = (_c = div.querySelector("h2")) === null || _c === void 0 ? void 0 : _c.textContent;
                this.date = dateObject.toISOString();
                this.time = time;
                this.price = (_d = div.querySelector("span.event-label")) === null || _d === void 0 ? void 0 : _d.textContent;
                this.map = "47.2011869,-1.5755363";
            }
        }
    }
    fromMacadamDom(div, today, oneWeekLaterDate) {
        var _a, _b, _c, _d;
        const dateString = (_a = div.querySelector("small")) === null || _a === void 0 ? void 0 : _a.textContent;
        const regex = /(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\s+(\d+)\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+à\s+(\d+:\d+)/;
        const match = dateString.match(regex);
        if (match) {
            const day = parseInt(match[2]);
            const month = match[3];
            const time = match[4];
            // Conversion de la date en objet Date JavaScript
            const monthsMapping = {
                janvier: 0,
                février: 1,
                mars: 2,
                avril: 3,
                mai: 4,
                juin: 5,
                juillet: 6,
                août: 7,
                septembre: 8,
                octobre: 9,
                novembre: 10,
                décembre: 11,
            };
            const monthIndex = monthsMapping[month];
            const dateObject = new Date(`${new Date().getFullYear()}/${parseInt(monthIndex + 1)}/${day} UTC`);
            if (this.dateIsBetween(dateObject, today, oneWeekLaterDate)) {
                this.place = "Warehouse";
                this.link = `https://www.warehouse-nantes.fr${(_b = div
                    .querySelector("a.stretched-link")) === null || _b === void 0 ? void 0 : _b.getAttribute("href")}`;
                this.title = (_c = div.querySelector("h2")) === null || _c === void 0 ? void 0 : _c.textContent;
                this.date = dateObject.toISOString();
                this.time = time;
                this.price = (_d = div.querySelector("span.event-label")) === null || _d === void 0 ? void 0 : _d.textContent;
                this.map = "47.2012178,-1.5935609";
            }
        }
    }
    dateIsBetween(date, today, oneWeekLaterDate) {
        return (date.getTime() >= today.getTime() &&
            date.getTime() < oneWeekLaterDate.getTime());
    }
}
exports.OukonvaEvent = OukonvaEvent;
