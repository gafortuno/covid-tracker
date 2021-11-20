import { css } from 'lit';

export const countryInformationCardStyles = css`
    :host {
        display: flex;
        flex-direction: column;
        padding: 10px;
        background: white;
        border-radius: 4px;
        flex-basis: 20%;
        padding: 2%;
        margin: 0.5%;
        background: #1E1E1E;
    }

    .large-text {
        font-size: 19px;
    }

    .small-text {
        font-size: 12px;
        color: #BDBDBD;
    }

    .recovered-total {
        color: #C5E1A5;
    }

    .deaths-total {
        color: #546E7A;
    }

    .cases {
        margin: 20px 0;
    }

    .critical-cases {
        color: #ff6961;
    }

    .total-cases {
        color: #FFE082;
    }

    .active-cases {
        color: #C5E1A5;
    }

    .deaths {
        margin: 20px 0;
    }

    .country {
        margin-bottom: 0;
    }

    .country-details {
        margin-bottom: 20px;
    }

    .content-separator {
        height: 1px;
        background:  #ffffff;
    }
    
    @media (max-width: 1023px) {
        :host {
            flex-basis: 45%;
        }
    }

    @media (max-width: 767px) {
        :host {
            flex-basis: 100%;
        }
    }
`;
