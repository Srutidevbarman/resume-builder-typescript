export interface GenerateSummeryBody {
  experienceLevel: string;
  skills: string[];
  jobTitle: string;
}

export interface GenerateSkillsBody {
  experienceLevel: string;
  jobTitle: string;
}
export interface GenerateProjectDescriptionBody {
  projectTitle: string;
  technologies: string[];
  role: string;
  rawDescription: string;
}
