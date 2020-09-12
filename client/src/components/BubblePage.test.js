import React from 'react';
import { render, screen } from '@testing-library/react';
import BubblePage from './BubblePage';

const colorsArray = [
	{
		color: 'aliceblue',
		code: {
			hex: '#f0f8ff',
		},
		id: 1,
	},
	{
		color: 'limegreen',
		code: {
			hex: '#99ddbc',
		},
		id: 2,
	},
	{
		color: 'aqua',
		code: {
			hex: '#00ffff',
		},
		id: 3,
	},
];

test('Fetches data and renders the bubbles', async () => {
	const { getAllByTestId, queryAllByTestId, rerender } = render(
		<BubblePage colors={[]} />
	);

	const colorList = queryAllByTestId(/color/i);
	expect(colorList).toHaveLength(0);

	rerender(<BubblePage colors={colorsArray} />);
	const colors = getAllByTestId(/color/i);
	expect(colors).toHaveLength(3);
});
