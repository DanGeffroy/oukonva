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
    }
    fromStationNuageDom(div) {
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
            if (dateObject.getTime() >= new Date(Date.now() - 86400000).getTime() &&
                dateObject.getTime() <
                    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime()) {
                this.link = (_b = div.querySelector("a")) === null || _b === void 0 ? void 0 : _b.getAttribute("href");
                this.place = "Station nuage";
                this.date = dateObject.toISOString();
                this.title = matches[2].trim();
                this.artiste = matches[5].trim();
                this.time = `${startTime} - ${endTime}`;
            }
        }
    }
}
exports.OukonvaEvent = OukonvaEvent;
