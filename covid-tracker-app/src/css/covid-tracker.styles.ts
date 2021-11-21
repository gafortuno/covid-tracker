import { css } from 'lit';

export const covidTrackerStyles = css`
    main {
        margin: auto;
        max-width: 1000px;
        padding: 72px 24px;
    }

    main h1 {
        margin-bottom: 0;
    }

    .statictics-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin-top: 20px;
    }

    .linear-activity {
        overflow: hidden;
        width: 50%;
        height: 4px;
        background-color: #B0BEC5;
        margin: 20px auto;
    }
    
    .indeterminate {
        position: relative;
        width: 100%;
        height: 100%;
    }
    
    .indeterminate:before {
        content: '';
        position: absolute;
        height: 100%;
        background-color: #546E7A;
        animation: indeterminate_first 1.5s infinite ease-out;
    }
    
    .indeterminate:after {
        content: '';
        position: absolute;
        height: 100%;
        background-color: #757575;
        animation: indeterminate_second 1.5s infinite ease-in;
    }
    
    @keyframes indeterminate_first {
        0% {
            left: -100%;
            width: 100%;
        }
        100% {
            left: 100%;
            width: 10%;
        }
    }
    
    @keyframes indeterminate_second {
        0% {
            left: -150%;
            width: 100%;
        }
        100% {
            left: 100%;
            width: 10%;
        }
    }
`;
