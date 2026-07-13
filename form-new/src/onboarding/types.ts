export interface IntakeFormData {
  clientType: 'Company' | 'Individual';
  projectName: string;
  ownerName: string;
  email: string;
  repoUrl: string;
  mainBranch: string;
  cloudProvider: string;
  trafficProfile: string;
  domainName: string;
  domainStatus: string;
  stack: string[];
  stackDetails: Record<string, string>;
  lifecycleServices: string[];
  databaseInfo: string;
  configFiles: string;
  buildInstructions: string;
  accessControl: string;
  retentionPolicy: string;
  remarks: string;
}

export const initialFormData: IntakeFormData = {
  clientType: 'Company',
  projectName: '',
  ownerName: '',
  email: '',
  repoUrl: '',
  mainBranch: '',
  cloudProvider: 'Unsure',
  trafficProfile: '',
  domainName: '',
  domainStatus: 'Already_Owned',
  stack: [],
  stackDetails: {},
  lifecycleServices: [],
  databaseInfo: '',
  configFiles: '',
  buildInstructions: '',
  accessControl: '',
  retentionPolicy: '',
  remarks: '',
};

export const STACK_OPTIONS = [
  { id: 'nodejs', label: 'Node.js', icon: 'Node', fields: [
    { key: 'version', label: 'Node version', placeholder: 'e.g. 20.x LTS' },
    { key: 'pkgManager', label: 'Package manager', placeholder: 'npm / yarn / pnpm' },
    { key: 'framework', label: 'Framework', placeholder: 'Express / NestJS / Next.js' },
  ]},
  { id: 'python', label: 'Python', icon: 'Python', fields: [
    { key: 'version', label: 'Python version', placeholder: 'e.g. 3.12' },
    { key: 'pkgManager', label: 'Dependency manager', placeholder: 'pip / poetry / pipenv' },
    { key: 'framework', label: 'Framework', placeholder: 'Django / FastAPI / Flask' },
  ]},
  { id: 'go', label: 'Go', icon: 'Go', fields: [
    { key: 'version', label: 'Go version', placeholder: 'e.g. 1.22' },
    { key: 'modulePath', label: 'Module path', placeholder: 'e.g. github.com/org/repo' },
    { key: 'framework', label: 'Framework', placeholder: 'net/http / Gin / Echo' },
  ]},
  { id: 'php', label: 'PHP', icon: 'PHP', fields: [
    { key: 'version', label: 'PHP version', placeholder: 'e.g. 8.3' },
    { key: 'pkgManager', label: 'Dependency manager', placeholder: 'Composer' },
    { key: 'framework', label: 'Framework', placeholder: 'Laravel / Symfony' },
  ]},
  { id: 'ruby', label: 'Ruby', icon: 'Ruby', fields: [
    { key: 'version', label: 'Ruby version', placeholder: 'e.g. 3.3' },
    { key: 'pkgManager', label: 'Dependency manager', placeholder: 'Bundler' },
    { key: 'framework', label: 'Framework', placeholder: 'Rails / Sinatra' },
  ]},
  { id: 'java', label: 'Java', icon: 'Java', fields: [
    { key: 'version', label: 'Java version', placeholder: 'e.g. 21 LTS' },
    { key: 'buildTool', label: 'Build tool', placeholder: 'Maven / Gradle' },
    { key: 'framework', label: 'Framework', placeholder: 'Spring Boot / Quarkus' },
  ]},
] as const;

export const LIFECYCLE_OPTIONS = [
  { value: 'Version_Control', label: 'Version Control', icon: 'GitBranch', hint: 'Git/GitLab repository setup and branching workflows' },
  { value: 'Agile_Tools', label: 'Agile Tooling', icon: 'KanbanSquare', hint: 'Jira/Linear integration for sprint tracking' },
  { value: 'Coding_Standards', label: 'Coding Standards', icon: 'FileCode', hint: 'Linting, formatting, and peer review rules' },
  { value: 'Branching_Strategy', label: 'Branching Strategy', icon: 'GitPullRequest', hint: 'GitFlow, trunk-based, or custom workflow' },
  { value: 'Build_Automation', label: 'Build Automation', icon: 'Hammer', hint: 'Automated build scripts and compilation' },
  { value: 'CI_Pipelines', label: 'CI/CD Pipelines', icon: 'Workflow', hint: 'GitHub Actions / GitLab CI pipeline setup' },
  { value: 'Automated_Triggers', label: 'Automated Triggers', icon: 'Zap', hint: 'Build triggers on push, PR, or schedule' },
  { value: 'Artifact_Repo', label: 'Artifact Repository', icon: 'Package', hint: 'Docker registry / npm / PyPI storage' },
  { value: 'Rollback_Strategy', label: 'Rollback Strategy', icon: 'Undo2', hint: 'Automated deployment rollback on failure' },
  { value: 'Backup_Strategy', label: 'Backup Strategy', icon: 'DatabaseBackup', hint: 'Scheduled database and volume backups' },
  { value: 'IaC_Tools', label: 'Infrastructure as Code', icon: 'FileCode2', hint: 'Terraform / Pulumi for reproducible infra' },
  { value: 'Containerization', label: 'Containerization', icon: 'Container', hint: 'Docker image builds and multi-stage builds' },
  { value: 'Orchestration', label: 'Orchestration', icon: 'Boxes', hint: 'Kubernetes / Docker Swarm deployment' },
  { value: 'Performance_Monitoring', label: 'Monitoring', icon: 'Activity', hint: 'Prometheus / Grafana / Datadog dashboards' },
  { value: 'Code_Scanning', label: 'Security Scanning', icon: 'ShieldCheck', hint: 'SAST/dependency scanning in CI' },
  { value: 'Secrets_Management', label: 'Secrets Management', icon: 'KeyRound', hint: 'Vault / AWS Secrets Manager integration' },
] as const;

export const TRAFFIC_PROFILES = [
  { value: 'Startup', label: 'Startup / Low Traffic', recommendation: 'DigitalOcean', reason: 'Cost-effective, simple to manage' },
  { value: 'Growing', label: 'Growing Business', recommendation: 'AWS', reason: 'Scalable services, mature ecosystem' },
  { value: 'High_Traffic', label: 'High Traffic / Enterprise', recommendation: 'GCP', reason: 'Global load balancing, autoscaling' },
  { value: 'Enterprise', label: 'Enterprise / Compliance', recommendation: 'Azure', reason: 'Microsoft ecosystem, compliance tools' },
] as const;
