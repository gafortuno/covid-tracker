import { css } from 'lit';

export const WorldWideCasesStyles = css`
  :host {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin-top: 20px;
    border-radius: 4px;
    padding: 2%;
    background: #1e1e1e;
  }

  .large-text {
    font-size: 19px;
  }

  .small-text {
    font-size: 12px;
    color: #bdbdbd;
  }

  @media only screen and (max-width: 840px) {
    :host {
      flex-direction: column;
    }
  }
`;
