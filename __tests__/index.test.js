import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Page from '../src/pages/index'
import { MockedProvider } from '@apollo/client/testing';
import GetCurrencyQuery from '../src/graphql/queries/getCurrency';

window.scrollTo = jest.fn();

const mocks = [
  {
    request: {
      query: GetCurrencyQuery,
      variables: {
        countryName: 'Sweden'
      }
    },
    result: {
      data: {
        countries: [{
          name: 'Sweden',
          currency: 'Swedish krona'
        }
      ]}
    }
  }
];

describe('Page', () => {
  it('renders initial page', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Page />
      </MockedProvider>
    );
    expect(await screen.findByText('Currency Search')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should return input value and currency selected', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Page />
      </MockedProvider>
    );

    const input = await screen.getByRole('textbox');

    //focus event without value
    await fireEvent.focus(input, { target: {}})

    //blur event without value
    await fireEvent.blur(input, { target: {}})

    //input event value
    await fireEvent.input(input, { target: { value: 'Sweden' }})

    //focus event with value
    await fireEvent.focus(input, { target: {}})

    //click event in currency collapse list
    const list = await screen.findByText('Swedish krona')
    await fireEvent.click(list)

    expect(input).toHaveValue('Sweden')
    expect(container).toMatchSnapshot();
  });
});