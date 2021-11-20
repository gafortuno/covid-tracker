import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { numberFormatter } from '../../utils.js';
import { countryInformationCardStyles } from './css/country-information.card.styles';

export class CountryInformationCard extends LitElement {
  @property() statistic: any = {};
  
  static get styles() {
    return [
        countryInformationCardStyles,
    ];
  } ;

  constructor() {
    super();

    this.statistic = {
        country: '',
    };
  }

  render() {
    return html`
        <div class="country-details">
            <h3 class="country">${this.statistic.country}</h3>
            <div class="population small-text">Population: ${this.statistic.population}</div>
        </div>
        <div class="content-separator"></div>
        <div class="cases">
            <div class="total-cases large-text">${numberFormatter.format(this.statistic.cases.total)} cases</div>
            <div class="new-cases small-text">(${numberFormatter.format(this.statistic.cases.new)} new)</div>
            <div class="active-cases small-text">(${numberFormatter.format(this.statistic.cases.active)} active)</div>
            <div class="critical-cases small-text">(${numberFormatter.format(this.statistic.cases.critical)} critical)</div>
        </div>
        <div class="recovered">
            <div class="recovered-total large-text light-green">${numberFormatter.format(this.statistic.cases.recovered)} recoveries</div>
        </div>
        <div class="deaths">
            <div class="deaths-total large-text">${numberFormatter.format(this.statistic.deaths.total)} deaths</div>
            <div class="deaths-new small-text">(${numberFormatter.format(this.statistic.deaths.new)} new)</div>
        </div>
        
    `;
  }
}
