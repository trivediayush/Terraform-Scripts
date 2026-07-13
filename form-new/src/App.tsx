import { useState, useCallback } from 'react';
import {
  ArrowRight, ArrowLeft, Check, Loader2, Terminal, ShieldCheck,
} from 'lucide-react';
import { supabase } from './lib/supabase';
import { initialFormData, type IntakeFormData } from './onboarding/types';
import {
  StepBasics, StepStack, StepMaturity, StepInfrastructure, SuccessState,
} from './onboarding/steps';

const STEPS = [
  { id: 0, title: 'The Basics', subtitle: 'High-level project info', icon: Terminal },
  { id: 1, title: 'Architecture & Stack', subtitle: 'The meat of the work', icon: Terminal },
  { id: 2, title: 'DevOps Maturity', subtitle: 'Services to configure', icon: ShieldCheck },
  { id: 3, title: 'Infrastructure & Access', subtitle: 'Final technical details', icon: ShieldCheck },
];

type Phase = 'form' | 'submitting' | 'success' | 'error';

export default function App() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [data, setData] = useState<IntakeFormData>(initialFormData);
  const [phase, setPhase] = useState<Phase>('form');
  const [errorMsg, setErrorMsg] = useState('');

  const update = useCallback((patch: Partial<IntakeFormData>) => {
    setData((prev) => ({ ...prev, ...patch }));
  }, []);

  const validateStep = (s: number): boolean => {
    if (s === 0) return data.projectName.trim() !== '' && data.ownerName.trim() !== '' && data.email.trim() !== '';
    return true;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setDirection('forward');
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setDirection('backward');
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    setPhase('submitting');
    setErrorMsg('');
    try {
      const { error } = await supabase.from('devops_intake').insert({
        client_type: data.clientType,
        project_name: data.projectName,
        owner_name: data.ownerName,
        email: data.email,
        repo_url: data.repoUrl || null,
        main_branch: data.mainBranch || null,
        cloud_provider: data.cloudProvider || null,
        traffic_profile: data.trafficProfile || null,
        domain_name: data.domainName || null,
        domain_status: data.domainStatus || null,
        stack: data.stack,
        stack_details: data.stackDetails,
        lifecycle_services: data.lifecycleServices,
        database_info: data.databaseInfo || null,
        config_files: data.configFiles || null,
        build_instructions: data.buildInstructions || null,
        access_control: data.accessControl || null,
        retention_policy: data.retentionPolicy || null,
        remarks: data.remarks || null,
      });
      if (error) throw error;
      setPhase('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setPhase('error');
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
            <Terminal className="h-3.5 w-3.5" />
            DevOps Onboarding Portal
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Infrastructure Discovery
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Tell us about your project and we'll design your DevOps pipeline.
          </p>
        </header>

        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50">
          {phase === 'success' ? (
            <div className="px-6 py-8 sm:px-10">
              <SuccessState projectName={data.projectName} />
            </div>
          ) : phase === 'error' ? (
            <div className="px-6 py-12 text-center sm:px-10">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                <span className="text-3xl">!</span>
              </div>
              <h2 className="mb-2 text-xl font-bold text-slate-900">Submission Failed</h2>
              <p className="mb-6 text-sm text-slate-500">{errorMsg}</p>
              <button
                onClick={() => setPhase('form')}
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Back to Form
              </button>
            </div>
          ) : (
            <>
              {/* Progress Bar */}
              <div className="border-b border-slate-100 px-6 py-5 sm:px-10">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Step {step + 1} of {STEPS.length}
                  </span>
                  <span className="text-xs font-semibold text-blue-600">
                    {Math.round(progress)}% complete
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {/* Step indicators */}
                <div className="mt-4 hidden grid-cols-4 gap-2 sm:grid">
                  {STEPS.map((s) => {
                    const done = s.id < step;
                    const current = s.id === step;
                    return (
                      <div
                        key={s.id}
                        className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium transition-all duration-300 ${
                          current
                            ? 'bg-blue-50 text-blue-700'
                            : done
                            ? 'text-slate-400'
                            : 'text-slate-300'
                        }`}
                      >
                        <div
                          className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all ${
                            done
                              ? 'bg-green-500 text-white'
                              : current
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200 text-slate-400'
                          }`}
                        >
                          {done ? <Check className="h-3 w-3" /> : s.id + 1}
                        </div>
                        <span className="truncate">{s.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step Content with slide animation */}
              <div className="px-6 py-8 sm:px-10">
                <div key={step} className={`animate-[slideIn_${direction}_0.4s_ease-out]`}>
                  <h2 className="mb-1 text-xl font-bold text-slate-900">{STEPS[step].title}</h2>
                  <p className="mb-6 text-sm text-slate-400">{STEPS[step].subtitle}</p>

                  {step === 0 && <StepBasics data={data} update={update} />}
                  {step === 1 && <StepStack data={data} update={update} />}
                  {step === 2 && <StepMaturity data={data} update={update} />}
                  {step === 3 && <StepInfrastructure data={data} update={update} />}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between border-t border-slate-100 px-6 py-5 sm:px-10">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 0 || phase === 'submitting'}
                  className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!validateStep(step)}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={phase === 'submitting'}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30 disabled:opacity-70"
                  >
                    {phase === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Initialize Infrastructure Request
                      </>
                    )}
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        <footer className="mt-6 text-center text-xs text-slate-400">
          Your data is stored securely and reviewed by our DevOps engineering team.
        </footer>
      </div>
    </div>
  );
}
