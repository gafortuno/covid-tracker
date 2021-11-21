import { LitElement, html } from 'lit';
import { InputSearchStyles } from './css/input-search.styles';
import { searchIcon } from '../../svg/search.svg.js';

export class InputSearch extends LitElement {
  static get styles() {
    return [
        InputSearchStyles,
    ];
  } ;

  render() {
    return html`
        <div class="search-country">
          ${searchIcon}
          <input type="text" class="input-search" placeholder="Search country..." @input=${this.searchCountry} />
        </div>
        
    `;
  }

  searchCountry(event: any) {
    this.dispatchEvent(new CustomEvent('search-country', {
      detail: {
        payload: {
          value: event.target.value,
        }
      },
      bubbles: true,
      composed: true,
    }));
  }
}
