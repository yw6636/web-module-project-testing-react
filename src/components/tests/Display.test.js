import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import mockFetchShow from '../../api/fetchShow'
jest.mock('../../api/fetchShow');

const testShow = {
    name: "test show",
    summary: "test summary",
    seasons: [
        {
            id: 0,
            name: "Season 1",
            episodes:[]           
        },
        {
            id: 1,
            name: "Season 2",
            episodes:[]
        }
    ]
}

test('renders without errors', () => {
    render(<Display />);
})

test('renders Show component when the button is clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);

    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    const show = await screen.findByTestId('show-container')
    expect(show).toBeInTheDocument();
})

test('renders show season options matching your data when the button is clicked', async() => {
    mockFetchShow.mockResolvedValueOnce(testShow);

    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId('season-option');
        expect(seasonOptions).toHaveLength(2);
    })
});

test('displayFunc is called when the fetch button is pressed', async() => {
    mockFetchShow.mockResolvedValueOnce(testShow);
    const displayFunc = jest.fn();

    render(<Display displayFunc={displayFunc}/>);
    const button = screen.getByRole('button');
    userEvent.click(button);
    
    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled();
    })
})
