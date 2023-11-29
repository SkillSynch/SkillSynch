import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import JobsTable from './JobsTable';

describe('JobsTable', () => {
  const jobs = [
    {
      match: 100,
      title: 'Senior Software Engineer',
      company: 'Apple',
      location: 'San Francisco',
      salary: '$150,000',
      skills: ['React', 'TypeScript', 'Node.js'],
    },
    {
      match: 90,
      title: 'Software Engineer',
      company: 'Google',
      location: 'Mountain View',
      salary: '$100,000',
      skills: ['React', 'JavaScript', 'Node.js'],
    },
  ];
  // test that the JobsTable component renders a table with the correct number of rows
  it('renders a table with the correct number of rows', () => {
    render(<JobsTable jobs={jobs} />);
    expect(screen.getAllByRole('row')).toHaveLength(3);
  });

  // test that the JobsTable component renders a table with the correct number of columns
  it('renders a table with the correct number of columns', () => {
    render(<JobsTable jobs={jobs} />);
    expect(screen.getAllByRole('columnheader')).toHaveLength(6);
  });

  // test that the JobsTable component renders the correct values
  it('renders the correct values', () => {
    render(<JobsTable jobs={jobs} />);
    expect(screen.queryByText('Senior Software Engineer')).not.toBeNull();
    expect(screen.queryByText('Apple')).not.toBeNull();
    expect(screen.queryByText('San Francisco')).not.toBeNull();
    expect(screen.queryByText('$150,000')).not.toBeNull();
  });
});
