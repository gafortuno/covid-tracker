import { LitElement, html } from 'lit';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { property } from 'lit/decorators.js';
import { covidTrackerStyles } from './css/covid-tracker.styles';

// components
import { CountryInformationCard } from './components/country-information-card/CountryInformationCard.js';

export class CovidTrackerApp extends ScopedElementsMixin(LitElement) {
  @property() statistics: any = [];

  @property() statisticsEndpoint = '';

  @property() requestHeaders = {};

  @property() currentDate: any = {};

  @property() dateTime = {};

  static get scopedElements() {
    return {
      'country-information-card': CountryInformationCard,
    };
  }

  static get styles() {
    return [
      covidTrackerStyles,
    ];
  } ;

  constructor() {
    super();

    this.statistics = [];
    this.statisticsEndpoint = 'https://covid-193.p.rapidapi.com/statistics';
    this.requestHeaders = {
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
      'x-rapidapi-key': '5af96d14dbmsh51fc4214ae8ceb1p1a3d43jsncd88f5576ae6',
    };
  }

  firstUpdated() {
    fetch(new Request(new Request(this.statisticsEndpoint), {
      headers: this.requestHeaders,
    }))
    .then(response => response.json())
    .then(data => {
      this.statistics = data;
    });
  }

  render() {
    return html`
      <main>
        <h1>Covid-19 Tracker</h1>
        <div>${this.statistics.results} countries</div>
        <div class="statictics-container">
          ${this.statistics.response?.map((statistic: any) =>
            html`
              <country-information-card .statistic=${statistic}>
              </country-information-card>
            `
          )}
        </div>
      </main>
    `;
  }
}
