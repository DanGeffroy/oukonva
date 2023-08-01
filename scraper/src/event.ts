export class OukonvaEvent {
  place?: string;
  title?: string;
  subtitle?: string;
  price?: string;
  artiste?: string;
  date?: string;
  link?: string;
  time?: string;
  map?: string;
  dates?: {
    start?: string;
    end?: string;
  };
  fromLuApi(data: any) {
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

  fromStationNuageDom(div: Element, today: Date, oneWeekLaterDate: Date) {
    const regex =
      /(\d{2}\.\d{2})\n\n([\s\S]+)\n(\d{2}:\d{2}) - (\d{2}:\d{1,2}) ([^\n︎]+)/;
    const matches = div.textContent?.match(regex);
    if (matches) {
      const [day, month] = matches[1].split(".");
      const startTime = matches[3];
      const [hours, minutes] = startTime.split(":");
      const endTime = matches[4];
      const dateObject = new Date(
        `${new Date().getFullYear()}/${parseInt(month)}/${parseInt(day)} UTC`
      );

      dateObject.setUTCHours(parseInt(hours));
      dateObject.setMinutes(parseInt(minutes));
      //  new Date(Date.now() - 86400000) === yesterday
      if (this.dateIsBetween(dateObject, today, oneWeekLaterDate)) {
        this.link = div.querySelector("a")?.getAttribute("href") as any;
        this.place = "Station nuage";
        this.date = dateObject.toISOString();
        this.title = matches[2].trim();

        this.artiste = matches[5].trim();
        this.time = `${startTime} - ${endTime}`;
        this.map = "47.2102635,-1.5146832";
      }
    }
  }
  fromWerehouseDom(div: Element, today: Date, oneWeekLaterDate: Date) {
    const dateString = div.querySelector("small")?.textContent as any;
    const regex =
      /(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\s+(\d+)\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+à\s+(\d+:\d+)/;
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

      const monthIndex = (monthsMapping as any)[month];
      const dateObject = new Date(
        `${new Date().getFullYear()}/${parseInt(monthIndex + 1)}/${day} UTC`
      );

      if (this.dateIsBetween(dateObject, today, oneWeekLaterDate)) {
        this.place = "Warehouse";
        this.link = `https://www.warehouse-nantes.fr${div
          .querySelector("a.stretched-link")
          ?.getAttribute("href")}`;

        this.title = div.querySelector("h2")?.textContent as any;
        this.date = dateObject.toISOString();
        this.time = time;
        this.price = div.querySelector("span.event-label")?.textContent as any;
        this.map = "47.2012136492942,-1.5729469373870897";
      }
    }
  }

  fromMacadamDom(div: Element, today: Date, oneWeekLaterDate: Date) {
    const dateString = div.querySelector("small")?.textContent as any;
    const regex =
      /(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\s+(\d+)\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+à\s+(\d+:\d+)/;
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

      const monthIndex = (monthsMapping as any)[month];
      const dateObject = new Date(
        `${new Date().getFullYear()}/${parseInt(monthIndex + 1)}/${day} UTC`
      );

      if (this.dateIsBetween(dateObject, today, oneWeekLaterDate)) {
        this.place = "Warehouse";
        this.link = `https://www.warehouse-nantes.fr${div
          .querySelector("a.stretched-link")
          ?.getAttribute("href")}`;

        this.title = div.querySelector("h2")?.textContent as any;
        this.date = dateObject.toISOString();
        this.time = time;
        this.price = div.querySelector("span.event-label")?.textContent as any;
        this.map = "47.2012136492942,-1.5729469373870897";
      }
    }
  }

  private dateIsBetween(
    date: Date,
    today: Date,
    oneWeekLaterDate: Date
  ): boolean {
    return (
      date.getTime() >= today.getTime() &&
      date.getTime() < oneWeekLaterDate.getTime()
    );
  }
}
