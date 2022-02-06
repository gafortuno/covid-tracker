import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { numberFormatter, getCurrentDateTime } from '../../utils.js';
import { WorldWideCasesStyles } from './css/world-wide-cases.styles';

export class WorldWideCases extends LitElement {
  @property() statistics: any = [];

  static get styles() {
    return [WorldWideCasesStyles];
  }

  constructor() {
    super();

    this.statistics = [];
  }

  render() {
    return html`
      <span>
        <div class="large-text">Worldwide Cases</div>
        <div class="small-text">as of ${getCurrentDateTime()}</div>
      </span>
      <span>
        <div class="large-text">${this._getTotalCases('cases')}</div>
        <div class="small-text">total cases</div>
      </span>
      <span>
        <div class="large-text">${this._getTotalCases('recovered')}</div>
        <div class="small-text">recoveries</div>
      </span>
      <span>
        <div class="large-text">${this._getTotalCases('deaths')}</div>
        <div class="small-text">deaths</div>
      </span>
    `;
  }

  /**
   * Compute total number of cases per category.
   */
  _getTotalCases(type: string) {
    let total: number = 0;

    this.statistics?.forEach((statistic: any) => {
      switch (type) {
        case 'cases':
          total += statistic?.cases?.total;
          break;
        case 'recovered':
          total += statistic?.cases?.recovered;
          break;
        case 'deaths':
          total += statistic?.deaths?.total;
          break;
        default:
          break;
      }
    });
    return numberFormatter.format(total);
  }
}
