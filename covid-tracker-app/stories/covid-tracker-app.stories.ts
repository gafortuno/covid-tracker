import { html, TemplateResult } from 'lit';
import '../src/covid-tracker-app.js';

export default {
  title: 'CovidTrackerApp',
  component: 'covid-tracker-app',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  title?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({ title, backgroundColor = 'white' }: ArgTypes) => html`
  <covid-tracker-app style="--covid-tracker-app-background-color: ${backgroundColor}" .title=${title}></covid-tracker-app>
`;

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
