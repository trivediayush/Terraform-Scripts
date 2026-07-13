import { useState } from 'react';
import {
  Building2, User, Github, GitBranch, Globe, Cloud, Server, ChevronDown,
  CheckCircle2, Container, Boxes, KeyRound, Database, FileCog, Hammer,
  Lock, Archive, MessageSquare, Layers, Zap,
} from 'lucide-react';
import { Field, inputClass, selectClass } from './ui';
import {
  type IntakeFormData,
  STACK_OPTIONS, LIFECYCLE_OPTIONS, TRAFFIC_PROFILES,
} from './types';

/* ── Step 1: The Basics ────────────────────────────────────── */

export function StepBasics({ data, update }: {
  data: IntakeFormData;
  update: (patch: Partial<IntakeFormData>) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className="mb-3 block text-sm font-semibold text-slate-700">Are you a company or an individual?</label>
        <div className="grid grid-cols-2 gap-3">
          {(['Company', 'Individual'] as const).map((t) => {
            const active = data.clientType === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => update({ clientType: t })}
                className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-4 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                }`}
              >
                {t === 'Company' ? <Building2 className="h-5 w-5" /> : <User className="h-5 w-5" />}
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <Field label="Project Name" hint="The name of the project or product you want us to set up infrastructure for.">
        <input
          className={inputClass}
          type="text"
          value={data.projectName}
          onChange={(e) => update({ projectName: e.target.value })}
          placeholder="e.g. Acme Mobile App"
          required
        />
      </Field>

      <Field label={data.clientType === 'Company' ? 'Project Owner / Manager' : 'Your Name'} hint="The primary contact person for this project.">
        <input
          className={inputClass}
          type="text"
          value={data.ownerName}
          onChange={(e) => update({ ownerName: e.target.value })}
          placeholder="e.g. Jane Smith"
          required
        />
      </Field>

      <Field label="Email Address" hint="We'll use this to send you the infrastructure proposal and follow up.">
        <input
          className={inputClass}
          type="email"
          value={data.email}
          onChange={(e) => update({ email: e.target.value })}
          placeholder="jane@company.com"
          required
        />
      </Field>

      <Field label="Repository URL" hint="Where is your code stored? GitHub, GitLab, or Bitbucket.">
        <div className="relative">
          <Github className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            className={inputClass + ' pl-11'}
            type="url"
            value={data.repoUrl}
            onChange={(e) => update({ repoUrl: e.target.value })}
            placeholder="https://github.com/org/repo"
          />
        </div>
      </Field>

      <Field label="Target Deployment Branch" hint="Which branch should be used for production deployments?">
        <div className="relative">
          <GitBranch className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            className={inputClass + ' pl-11'}
            type="text"
            value={data.mainBranch}
            onChange={(e) => update({ mainBranch: e.target.value })}
            placeholder="e.g. main or master"
          />
        </div>
      </Field>
    </div>
  );
}

/* ── Step 2: Architecture & Stack ───────────────────────────── */

export function StepStack({ data, update }: {
  data: IntakeFormData;
  update: (patch: Partial<IntakeFormData>) => void;
}) {
  const toggleStack = (id: string) => {
    const next = data.stack.includes(id)
      ? data.stack.filter((s) => s !== id)
      : [...data.stack, id];
    update({ stack: next });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-3 flex items-center text-sm font-semibold text-slate-700">
          <Layers className="mr-2 h-4 w-4 text-blue-600" />
          Select your tech stack
          <span className="ml-2 text-xs font-normal text-slate-400">Click all that apply — we'll tailor the fields</span>
        </label>
        <div className="flex flex-wrap gap-2.5">
          {STACK_OPTIONS.map((s) => {
            const active = data.stack.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => toggleStack(s.id)}
                className={`flex items-center gap-2 rounded-lg border-2 px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm scale-105'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {active && <CheckCircle2 className="h-4 w-4" />}
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {data.stack.length > 0 && (
        <div className="space-y-5 rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
          {data.stack.map((stackId) => {
            const stack = STACK_OPTIONS.find((s) => s.id === stackId)!;
            return (
              <div key={stackId} className="animate-[fadeInUp_0.3s_ease-out]">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
                    {stack.label[0]}
                  </span>
                  {stack.label} Configuration
                </h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {stack.fields.map((f) => (
                    <div key={f.key}>
                      <label className="mb-1.5 block text-xs font-medium text-slate-500">{f.label}</label>
                      <input
                        className={inputClass + ' py-2.5 text-sm'}
                        type="text"
                        value={data.stackDetails[`${stackId}_${f.key}`] || ''}
                        onChange={(e) =>
                          update({
                            stackDetails: {
                              ...data.stackDetails,
                              [`${stackId}_${f.key}`]: e.target.value,
                            },
                          })
                        }
                        placeholder={f.placeholder}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Field label="Database & Data Management" hint="What database(s) are you using? PostgreSQL, MySQL, MongoDB, Redis, etc. Include any ORM or migration tools.">
        <div className="relative">
          <Database className="pointer-events-none absolute left-3.5 top-4 h-5 w-5 text-slate-400" />
          <textarea
            className={inputClass + ' min-h-[80px] pl-11 pt-3'}
            value={data.databaseInfo}
            onChange={(e) => update({ databaseInfo: e.target.value })}
            placeholder="e.g. PostgreSQL 16 with Prisma ORM, Redis for caching"
          />
        </div>
      </Field>
    </div>
  );
}

/* ── Step 3: DevOps Maturity ───────────────────────────────── */

export function StepMaturity({ data, update }: {
  data: IntakeFormData;
  update: (patch: Partial<IntakeFormData>) => void;
}) {
  const toggle = (value: string) => {
    const next = data.lifecycleServices.includes(value)
      ? data.lifecycleServices.filter((s) => s !== value)
      : [...data.lifecycleServices, value];
    update({ lifecycleServices: next });
  };

  return (
    <div>
      <p className="mb-4 text-sm text-slate-500">
        Select the DevOps services you'd like configured for this project. Hover any item for details.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {LIFECYCLE_OPTIONS.map((opt) => {
          const active = data.lifecycleServices.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              className={`group flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                active
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div
                className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                  active ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'
                }`}
              >
                {active && <CheckCircle2 className="h-4 w-4 text-white" />}
              </div>
              <div className="min-w-0">
                <div className={`text-sm font-semibold ${active ? 'text-blue-700' : 'text-slate-700'}`}>
                  {opt.label}
                </div>
                <div className="mt-0.5 text-xs text-slate-400">{opt.hint}</div>
              </div>
            </button>
          );
        })}
      </div>
      {data.lifecycleServices.length > 0 && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700 animate-[fadeInUp_0.3s_ease-out]">
          <CheckCircle2 className="h-4 w-4" />
          {data.lifecycleServices.length} service{data.lifecycleServices.length > 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  );
}

/* ── Step 4: Infrastructure & Access ───────────────────────── */

export function StepInfrastructure({ data, update }: {
  data: IntakeFormData;
  update: (patch: Partial<IntakeFormData>) => void;
}) {
  const showTraffic = data.cloudProvider === 'Unsure';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Cloud Provider Preference" hint="Where would you like to host your application? Choose 'Unsure' and we'll recommend based on your traffic profile.">
          <div className="relative">
            <Cloud className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <select
              className={selectClass + ' pl-11'}
              value={data.cloudProvider}
              onChange={(e) => update({ cloudProvider: e.target.value })}
            >
              <option value="Unsure">I am unsure (recommend for me)</option>
              <option value="AWS">AWS (Amazon Web Services)</option>
              <option value="GCP">Google Cloud Platform</option>
              <option value="Azure">Microsoft Azure</option>
              <option value="DigitalOcean">DigitalOcean</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          </div>
        </Field>

        {showTraffic && (
          <Field label="Traffic Profile" hint="Tell us about your expected traffic and we'll recommend the best provider.">
            <div className="relative">
              <Zap className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <select
                className={selectClass + ' pl-11 animate-[fadeInUp_0.3s_ease-out]'}
                value={data.trafficProfile}
                onChange={(e) => update({ trafficProfile: e.target.value })}
              >
                <option value="">Select your profile...</option>
                {TRAFFIC_PROFILES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>
          </Field>
        )}
      </div>

      {showTraffic && data.trafficProfile && (
        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 animate-[fadeInUp_0.4s_ease-out]">
          <Server className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
          <div className="text-sm">
            <span className="font-semibold text-blue-700">Our recommendation: </span>
            <span className="text-slate-700">
              {TRAFFIC_PROFILES.find((p) => p.value === data.trafficProfile)?.recommendation} —{' '}
              {TRAFFIC_PROFILES.find((p) => p.value === data.trafficProfile)?.reason}
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Target Domain Name" hint="Do you have a registered domain (e.g., example.com)?">
          <div className="relative">
            <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              className={inputClass + ' pl-11'}
              type="text"
              value={data.domainName}
              onChange={(e) => update({ domainName: e.target.value })}
              placeholder="e.g. myapp.com"
            />
          </div>
        </Field>

        <Field label="Domain Management Status" hint="Do you already own the domain, or do you need help acquiring one?">
          <div className="relative">
            <select
              className={selectClass}
              value={data.domainStatus}
              onChange={(e) => update({ domainStatus: e.target.value })}
            >
              <option value="Already_Owned">I already own the domain</option>
              <option value="Need_Purchase">I need help purchasing a domain</option>
              <option value="Need_Transfer">I want to transfer a domain</option>
              <option value="Unsure">Unsure / need help deciding</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          </div>
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Environment Configurations" hint="Any .env files, config maps, or environment-specific settings we should know about.">
          <div className="relative">
            <FileCog className="pointer-events-none absolute left-3.5 top-4 h-5 w-5 text-slate-400" />
            <textarea
              className={inputClass + ' min-h-[80px] pl-11 pt-3'}
              value={data.configFiles}
              onChange={(e) => update({ configFiles: e.target.value })}
              placeholder="e.g. .env files, docker-compose overrides"
            />
          </div>
        </Field>

        <Field label="Build & Deployment Instructions" hint="Any existing build scripts, Makefiles, or deployment commands.">
          <div className="relative">
            <Hammer className="pointer-events-none absolute left-3.5 top-4 h-5 w-5 text-slate-400" />
            <textarea
              className={inputClass + ' min-h-[80px] pl-11 pt-3'}
              value={data.buildInstructions}
              onChange={(e) => update({ buildInstructions: e.target.value })}
              placeholder="e.g. npm run build, docker build, make deploy"
            />
          </div>
        </Field>

        <Field label="Access Control" hint="Who should have access? List roles or team members that need deploy/admin access.">
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              className={inputClass + ' pl-11'}
              type="text"
              value={data.accessControl}
              onChange={(e) => update({ accessControl: e.target.value })}
              placeholder="e.g. 3 developers, 1 admin"
            />
          </div>
        </Field>

        <Field label="Build Retention Policy" hint="How many build artifacts / images should we keep before pruning?">
          <div className="relative">
            <Archive className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              className={inputClass + ' pl-11'}
              type="text"
              value={data.retentionPolicy}
              onChange={(e) => update({ retentionPolicy: e.target.value })}
              placeholder="e.g. keep last 10 builds"
            />
          </div>
        </Field>
      </div>

      <Field label="Special Considerations / Remarks" hint="Anything else we should know? Compliance requirements, legacy systems, specific constraints." fullWidth>
        <div className="relative">
          <MessageSquare className="pointer-events-none absolute left-3.5 top-4 h-5 w-5 text-slate-400" />
          <textarea
            className={inputClass + ' min-h-[80px] pl-11 pt-3'}
            value={data.remarks}
            onChange={(e) => update({ remarks: e.target.value })}
            placeholder="Any additional context, constraints, or requirements..."
          />
        </div>
      </Field>
    </div>
  );
}

/* ── Success State ─────────────────────────────────────────── */

export function SuccessState({ projectName }: { projectName: string }) {
  const [showCheck, setShowCheck] = useState(false);
  setTimeout(() => setShowCheck(true), 1400);

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="relative mb-8 h-24 w-24">
        {!showCheck ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center animate-[popIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)]">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/30">
              <CheckCircle2 className="h-12 w-12 text-white" />
            </div>
          </div>
        )}
      </div>
      <h2 className="mb-2 text-2xl font-bold text-slate-900">Request Received!</h2>
      <p className="max-w-md text-slate-500">
        {projectName
          ? `We've received the infrastructure request for "${projectName}". Our team will review your requirements and reach out within 24 hours.`
          : "We've received your infrastructure request. Our team will review your requirements and reach out within 24 hours."}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {[
          { icon: Container, label: 'Containerization' },
          { icon: Boxes, label: 'Orchestration' },
          { icon: KeyRound, label: 'Secrets' },
          { icon: Server, label: 'Infrastructure' },
        ].map((item, i) => (
          <div
            key={item.label}
            className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 animate-[fadeInUp_0.4s_ease-out]"
            style={{ animationDelay: `${i * 100 + 600}ms`, animationFillMode: 'both' }}
          >
            <item.icon className="h-4 w-4 text-blue-600" />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
