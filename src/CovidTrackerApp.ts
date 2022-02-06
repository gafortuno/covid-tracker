import { LitElement, html, nothing } from 'lit';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { property } from 'lit/decorators.js';
import { debounce } from './utils.js';
import { covidTrackerStyles } from './css/covid-tracker.styles';

// components
import { CountryInformationCard } from './components/country-information-card/CountryInformationCard.js';
import { WorldWideCases } from './components/world-wide-cases/WorldWideCases.js';
import { InputSearch } from './components/input-search/InputSearch.js';

export class CovidTrackerApp extends ScopedElementsMixin(LitElement) {
  @property() statistics: any = {};

  @property() statisticsDisplay: any = {};

  @property() isGetStatisticsLoading: boolean = false;

  @property() statisticsEndpoint: string = '';

  @property() requestHeaders: any = {};

  @property() itemsPerPage: number = 0;

  static get scopedElements() {
    return {
      'country-information-card': CountryInformationCard,
      'world-wide-cases': WorldWideCases,
      'input-search': InputSearch,
    };
  }

  static get styles() {
    return [covidTrackerStyles];
  }

  constructor() {
    super();

    this.statistics = {};
    this.statisticsDisplay = {};
    this.isGetStatisticsLoading = false;
    this.statisticsEndpoint = 'https://covid-193.p.rapidapi.com/statistics';
    this.requestHeaders = {
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
      'x-rapidapi-key': '5af96d14dbmsh51fc4214ae8ceb1p1a3d43jsncd88f5576ae6',
    };
    this.itemsPerPage = 10;
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener(
      'search-country',
      debounce(this._searchByCountries.bind(this), 500)
    );
  }

  disconnectedCallback() {
    this.removeEventListener('search-country', this._searchByCountries);

    super.disconnectedCallback();
  }

  updated(changedProps: any) {
    if (changedProps.has('statistics')) {
      this.statisticsDisplay = JSON.parse(JSON.stringify(this.statistics));
    }

    if (
      changedProps.has('statisticsDisplay') &&
      this.statisticsDisplay &&
      Object.keys(this.statisticsDisplay).length
    ) {
      this._observeCardList();
    }

    if (changedProps.has('itemsPerPage')) {
      if (this.itemsPerPage > 10) {
        this._observeCardList();
      }
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
          ${this.statisticsDisplay.results || '0'}
          ${parseInt(this.statisticsDisplay.results, 10) > 1
            ? html`countries`
            : html`country`}
        </div>
        <world-wide-cases
          .statistics="${this.statisticsDisplay.response}"
        ></world-wide-cases>
        <input-search></input-search>
        <div class="statictics-container">
          ${this.isGetStatisticsLoading
            ? html`
                <div class="linear-activity">
                  <div class="indeterminate"></div>
                </div>
              `
            : html`
                ${this.statisticsDisplay.response &&
                this.statisticsDisplay.response.length
                  ? html`
                      ${this.statisticsDisplay.response?.map(
                        (statistic: any, index: number) =>
                          this.itemsPerPage > index + 1
                            ? html`
                                <country-information-card
                                  .statistic=${statistic}
                                >
                                </country-information-card>
                              `
                            : nothing
                      )}
                    `
                  : html` No result found. `}
              `}
        </div>
      </main>
    `;
  }

  /**
   * Observe card list items for lazy loading.
   */
  _observeCardList() {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting === true) {
          if (this.itemsPerPage <= this.statisticsDisplay?.response?.length) {
            this.itemsPerPage += 10;
          }
        }
      },
      { threshold: [0] }
    );

    observer.observe(
      this.shadowRoot!.querySelector('country-information-card:last-of-type')!
    );
  }

  /**
   * Get statistics data.
   */
  _fetchStatistics() {
    this.isGetStatisticsLoading = true;

    fetch(
      new Request(new Request(this.statisticsEndpoint), {
        headers: this.requestHeaders,
      })
    )
      .then(response => response.json())
      .then(data => {
        this.statistics = data;
      })
      .finally(() => {
        this.isGetStatisticsLoading = false;
      });
  }

  /**
   * Handle event when search is triggered.
   */
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
