import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';


describe('Pokémon Battle Simulator', () => {
  // Test case 1: Renders without crashing
  test('renders the Pokémon Battle Simulator without crashing', () => {
    render(<App />);
    expect(screen.getByText('Pokémon Battle Simulator')).toBeInTheDocument();
  });

  // Test case 2: Get Random Pokémon button exists
  test('renders the Get Random Pokémon button', () => {
    render(<App />);
    expect(screen.getByText('Get Random Pokémon')).toBeInTheDocument();
  });

  // Test case 3: Start Battle button exists
  test('renders the Start Battle button', () => {
    render(<App />);
    expect(screen.getByText('Start Battle!')).toBeInTheDocument();
  });

  // Test case 4: Click Get Random Pokémon updates the UI
  test('clicking Get Random Pokémon displays Pokémon data', async () => {
    render(<App />);
    
    // Click the Get Random Pokémon button
    fireEvent.click(screen.getByText('Get Random Pokémon'));

    // Wait for Pokémon data to load
    const pokemonCards = await screen.findAllByRole('img');
    
    // Check that Pokémon data is rendered (at least two Pokémon images should be displayed)
    expect(pokemonCards.length).toBe(2);
  });

});