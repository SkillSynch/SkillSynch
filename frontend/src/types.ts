export type SkillItem = {
  skill: string;
  level: 'Junior' | 'Mid' | 'Senior';
};

export type JobItem = {
  match: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  skills: SkillItem[];
  url: string;
  about?: string;
};

export type SkillsDisplayProps = {
  skills: SkillItem[];
};

export interface AppState {
  jobs: JobItem[];
  skills: SkillItem[];
}