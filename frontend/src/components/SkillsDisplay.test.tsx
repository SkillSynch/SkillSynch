import React from 'react';
import { render, screen } from '@testing-library/react';
import SkillsDisplay from './SkillsDisplay';
import { Skillitem } from './Skillitem';
import { describe, it, expect } from 'vitest';

describe('SkillsDisplay', () => {
  // sample skills
  const skills: Skillitem[] = [
    { skill: 'Python', level: 'Senior' },
    { skill: 'React', level: 'Mid' },
    { skill: 'Django', level: 'Junior' },
    { skill: 'Flask', level: 'Junior' },
    { skill: 'Node.js', level: 'Mid' },
    { skill: 'Express', level: 'Mid' },
    { skill: 'MongoDB', level: 'Mid' },
    { skill: 'PostgreSQL', level: 'Mid' },
  ];
  // test that the component renders the correct skills
  it('renders the correct number of skills', () => {
    render(<SkillsDisplay skills={skills} />);
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
