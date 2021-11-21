import { LitElement, html } from 'lit';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { property } from 'lit/decorators.js';
import { debounce } from './utils.js';
import { covidTrackerStyles } from './css/covid-tracker.styles';

// components
import { CountryInformationCard } from './components/country-information-card/CountryInformationCard.js';
import { WorldWideCases } from './components/world-wide-cases/WorldWideCases.js';
import { InputSearch } from './components/input-search/InputSearch.js';

export class CovidTrackerApp extends ScopedElementsMixin(LitElement) {
  @property() statistics: any = [];

  @property() statisticsDisplay: any = [];

  @property() isGetStatisticsLoading: any = [];

  @property() statisticsEndpoint = '';

  @property() requestHeaders = {};

  @property() currentDate: any = {};

  @property() dateTime = {};

  static get scopedElements() {
    return {
      'country-information-card': CountryInformationCard,
      'world-wide-cases': WorldWideCases,
      'input-search': InputSearch,
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
    this.statisticsDisplay = [];
    this.isGetStatisticsLoading = false;
    this.statisticsEndpoint = 'https://covid-193.p.rapidapi.com/statistics';
    this.requestHeaders = {
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
      'x-rapidapi-key': '5af96d14dbmsh51fc4214ae8ceb1p1a3d43jsncd88f5576ae6',
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('search-country', debounce(this._searchByCountries.bind(this), 500));
  }

  disconnectedCallback() {
    this.removeEventListener('search-country', this._searchByCountries);

    super.disconnectedCallback();
  }

  updated(changedProps: any) {
    if (changedProps.has('statistics')) {
      this.statisticsDisplay = JSON.parse(JSON.stringify(this.statistics));
    }
  }

  firstUpdated() {
    this._fetchStatistics();
  }

  render() {
    return html`
      <main>
        <h1>Covid-19 Tracker</h1>
        <div>
          ${this.statisticsDisplay.results}
          ${parseInt(this.statisticsDisplay.results, 10) > 1 ? html`countries` : html`country`}
        </div>
        <world-wide-cases .statistics="${this.statisticsDisplay.response}"></world-wide-cases>
        <input-search></input-search>
        <div class="statictics-container">
          ${this.isGetStatisticsLoading ? html`
          <div class="linear-activity">
            <div class="indeterminate"></div>
          </div>
          ` : html`
          ${this.statisticsDisplay.response && this.statisticsDisplay.response.length
            ? html`
              ${this.statisticsDisplay.response?.map((statistic: any) =>
                html`
                  <country-information-card .statistic=${statistic}>
                  </country-information-card>
                `
              )}
            ` : html`
                No result found.
            `}
          `}

        </div>
      </main>
    `;
  }

  _fetchStatistics() {
    this.isGetStatisticsLoading = true;

    fetch(new Request(new Request(this.statisticsEndpoint), {
      headers: this.requestHeaders,
    }))
    .then(response => response.json())
    .then(data => {
      this.statistics = data;
    })
    .finally(() => {
      this.isGetStatisticsLoading = false;
    });
  }

  _searchByCountries(event: any) {
    const { value } = event.detail.payload;

    if (value) {
      const regex = new RegExp(`${value.toLowerCase()}*`);
      const response = this.statistics.response.filter((data: any) =>
        regex.test(data?.country?.toLowerCase())
      );
      
      this.statisticsDisplay = {
        results: response.length,
        response,
      };
    } else {
      this.statisticsDisplay = JSON.parse(JSON.stringify(this.statistics));
    }
  }
}
