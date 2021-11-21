import { css } from 'lit';

export const InputSearchStyles = css`
    :host {
        position: relative;
        margin: 20px 0;
    }

    .search-country {
        position: relative;
        margin: 20px 0;
    }

    .search-country img {
        position: absolute;
        left: 12px;
        top: 4px;
    }

    .input-search {
        padding: 5px;
        width: 100%;
        background: #1E1E1E;
        border-radius: 2px;
        box-sizing: border-box;
        font-family: "Roboto Mono", monospace;
        padding: 8px 16px 8px 52px;
        width: 100%;
        border: none;
        color: #F5F5F5;
    }

    .input-search:focus {
        outline: none;
    }
`;
