import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SkillsDisplay from './SkillsDisplay';
import { SkillItem } from '../types';
import { describe, it, expect } from 'vitest';

describe('SkillsDisplay', () => {
  // sample skills
  const skills: SkillItem[] = [
    { skill: 'Python', level: 'Senior' },
    { skill: 'React', level: 'Mid' },
    { skill: 'Django', level: 'Junior' },
    { skill: 'Flask', level: 'Junior' },
    { skill: 'Node.js', level: 'Mid' },
    { skill: 'Express', level: 'Mid' },
    { skill: 'MongoDB', level: 'Mid' },
    { skill: 'PostgreSQL', level: 'Mid' },
  ];

  // create a mock store with the initial state
  const store = configureStore({
    reducer: (state) => state, // dummy reducer
    preloadedState: { skills: skills }, // initial state
  });

  // test that the component renders the correct skills
  it('renders the correct number of skills', () => {
    render(
      <Provider store={store}>
        <SkillsDisplay />
      </Provider>
    );
    expect(screen.queryByText('Python: Senior')).not.toBeNull();
    expect(screen.queryByText('React: Mid')).not.toBeNull();
    expect(screen.queryByText('Django: Junior')).not.toBeNull();
    expect(screen.queryByText('Flask: Junior')).not.toBeNull();
    expect(screen.queryByText('Node.js: Mid')).not.toBeNull();
    expect(screen.queryByText('Express: Mid')).not.toBeNull();
    expect(screen.queryByText('MongoDB: Mid')).not.toBeNull();
    expect(screen.queryByText('PostgreSQL: Mid')).not.toBeNull();
  });
});