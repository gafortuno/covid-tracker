import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { numberFormatter } from '../../utils.js';
import { WorldWideCasesStyles } from './css/world-wide-cases.styles';

export class WorldWideCases extends LitElement {
  @property() statistics: any = {};
  
  static get styles() {
    return [
        WorldWideCasesStyles,
    ];
  } ;

  constructor() {
    super();

    this.statistics = [];
  }

  render() {
    return html`
        <div>
            <div class="large-text"> Worldwide Cases</div>
            <div class="small-text">as of ${this._getCurrentDateTime()}</div>

        </div>
        <div>
            <div class="large-text"> ${this._getTotalCases('cases')}</div>
            <div class="small-text">total cases</div>
        </div>
        <div>
            <div class="large-text"> ${this._getTotalCases('recovered')}</div>
            <div class="small-text">recoveries</div>
        </div>
        <div>
            <div class="large-text"> ${this._getTotalCases('deaths')}</div>
            <div class="small-text">deaths</div>
        </div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  _getCurrentDateTime() {
    const dt = new Date();
    const DD = (`0${dt.getDate()}`).slice(-2);
    const MM = (`0${(dt.getMonth() + 1)}`).slice(-2);
    const YYYY = dt.getFullYear();
    const hh = (`0${dt.getHours()}`).slice(-2);
    const mm = (`0${dt.getMinutes()}`).slice(-2);
    const ss = (`0${dt.getSeconds()}`).slice(-2);
    
    return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
  }

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
      })
      return numberFormatter.format(total);
  }
}
