import { useRef, useState, type DragEvent } from "react";
import { Check, CloudUpload, FileText } from "lucide-react";

const JD_SAMPLES = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Product Designer",
  "Data Analyst",
  "DevOps Engineer",
  "Mobile Developer",
  "Software Engineer",
  "QA Engineer",
  "Machine Learning Engineer",
];

const JD_CONTENT: Record<string, string> = {
  "Full Stack Developer":
    "We are looking for a highly skilled Full Stack Developer comfortable with both front-end and back-end programming.\n\nResponsibilities:\n• Develop front-end website architecture\n• Design user interactions on web pages\n• Build and maintain back-end APIs\n• Collaborate with product and design teams\n\nRequirements:\n• 3+ years with React and Node.js\n• Strong TypeScript and REST API knowledge\n• Experience with SQL/NoSQL databases\n• CI/CD and cloud deployment familiarity",
  "Frontend Developer":
    "Seeking a Frontend Developer to translate product requirements into clean, performant web interfaces.\n\nResponsibilities:\n• Build responsive UIs with React\n• Collaborate closely with designers\n• Maintain component libraries\n\nRequirements:\n• 2+ years React experience\n• Strong CSS and accessibility knowledge\n• Experience with design systems",
  "Backend Developer":
    "Join our backend team to build reliable APIs and services.\n\nResponsibilities:\n• Design and maintain microservices\n• Optimise database queries\n• Write API documentation\n\nRequirements:\n• 3+ years Node.js or Python\n• PostgreSQL / MongoDB experience\n• REST & GraphQL API design",
  "Product Designer":
    "We need a Product Designer to own user flows, wireframes, and high-fidelity prototypes.\n\nResponsibilities:\n• Create wireframes and prototypes in Figma\n• Conduct user research and usability tests\n• Collaborate with engineering for smooth delivery\n\nRequirements:\n• 3+ years product design experience\n• Proficiency in Figma\n• Strong portfolio demonstrating end-to-end design",
  "Data Analyst":
    "Looking for a Data Analyst to build dashboards and provide insights.\n\nResponsibilities:\n• Build and maintain BI dashboards\n• Perform exploratory data analysis\n• Present findings to stakeholders\n\nRequirements:\n• Proficiency in SQL and Python (pandas)\n• Experience with Tableau or Looker\n• Strong statistical reasoning",
  "DevOps Engineer":
    "Hiring a DevOps Engineer to improve deployment pipelines and ensure reliability.\n\nResponsibilities:\n• Manage CI/CD pipelines (GitHub Actions, Jenkins)\n• Maintain Kubernetes clusters\n• Implement observability solutions\n\nRequirements:\n• 3+ years DevOps/SRE experience\n• Terraform and cloud IaC proficiency\n• Linux administration skills",
  "Mobile Developer":
    "Seeking a Mobile Developer for iOS/Android features.\n\nResponsibilities:\n• Build cross-platform features in React Native\n• Optimise for performance and battery usage\n• Collaborate with QA on release testing\n\nRequirements:\n• 2+ years React Native experience\n• Familiarity with native APIs\n• App Store / Play Store deployment experience",
  "Software Engineer":
    "Hiring a Software Engineer to design and maintain scalable product features.\n\nResponsibilities:\n• Design, develop, test, and deploy features\n• Participate in code reviews\n• Contribute to architecture decisions\n\nRequirements:\n• 3+ years software engineering\n• Proficiency in at least one backend language\n• Strong fundamentals in data structures and algorithms",
  "QA Engineer":
    "We are hiring a QA Engineer to ensure product quality across web and mobile.\n\nResponsibilities:\n• Write and maintain automated test suites\n• Perform manual and exploratory testing\n• Report and track bugs to resolution\n\nRequirements:\n• 2+ years QA experience\n• Proficiency with Cypress or Playwright\n• Experience with API testing tools",
  "Machine Learning Engineer":
    "Seeking an ML Engineer to design and deploy machine learning models.\n\nResponsibilities:\n• Train and fine-tune ML models\n• Build data pipelines for model training\n• Deploy and monitor models in production\n\nRequirements:\n• 3+ years ML engineering experience\n• Proficiency in Python, PyTorch or TensorFlow\n• Experience with MLOps tooling (MLflow, SageMaker)",
};

const STEPS = [
  { label: "Upload Resume" },
  { label: "Add Job" },
  { label: "View Results" },
];

function Stepper({ current }: { current: number }) {
  return (
    <div className="mb-8 flex items-start justify-center">
      {STEPS.map((step, index) => {
        const num = index + 1;
        const isDone = num < current;
        const isActive = num === current;

        return (
          <div key={step.label} className="flex items-start">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-[15px] font-bold transition-colors ${
                  isDone
                    ? "border-primary bg-muted text-primary"
                    : isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-transparent text-muted-foreground"
                }`}
              >
                {isDone ? <Check className="h-4 w-4" /> : num}
              </div>
              <span
                className={`whitespace-nowrap text-[13px] font-semibold ${
                  isDone || isActive
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>

            {index < STEPS.length - 1 ? (
              <div
                className={`mt-[19px] h-[2px] w-24 flex-shrink-0 transition-colors ${
                  num < current ? "bg-foreground" : "bg-border"
                }`}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function StepUpload({
  onFile,
  onViewSampleReport,
}: {
  onFile: (file: File) => void;
  onViewSampleReport?: () => void;
}) {
  const [dragging, setDragging] = useState(false);
  const [pasting, setPasting] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file?: File) => {
    if (!file) return;
    const ok = /\.(pdf|doc|docx)$/i.test(file.name);
    if (ok) onFile(file);
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  };

  if (pasting) {
    return (
      <div className="flex flex-col gap-3">
        <textarea
          autoFocus
          value={pasteText}
          onChange={(event) => setPasteText(event.target.value)}
          placeholder="Paste your resume text here..."
          className="min-h-[220px] w-full resize-y rounded-[10px] border border-border px-4 py-3.5 text-sm leading-7 text-foreground outline-none"
        />
        <div className="flex gap-2.5">
          <button
            disabled={!pasteText.trim()}
            onClick={() => {
              const blob = new Blob([pasteText], { type: "text/plain" });
              onFile(new File([blob], "resume.txt", { type: "text/plain" }));
            }}
            className="rounded-md bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
          >
            Continue
          </button>
          <button
            onClick={() => {
              setPasting(false);
              setPasteText("");
            }}
            className="rounded-md border border-border bg-card px-5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-[18px]">
      <label
        htmlFor="scan-resume-input"
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragging(false);
        }}
        onDrop={handleDrop}
        className={`flex min-h-[280px] w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-5 py-8 text-center transition-all ${
          dragging ? "border-primary bg-muted" : "border-border bg-card"
        }`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CloudUpload className="h-7 w-7" />
        </div>
        <p className="mt-4 text-lg font-semibold text-foreground">
          Drag & Drop or{" "}
          <span className="text-primary underline">Choose file</span> to upload
        </p>
        <p className="mt-1.5 text-sm text-muted-foreground">
          as .pdf or .docx file
        </p>
        <input
          id="scan-resume-input"
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(event) => handleFile(event.target.files?.[0] ?? undefined)}
        />
      </label>

      <button
        onClick={() => setPasting(true)}
        className="cursor-pointer text-sm font-semibold text-primary"
      >
        Or paste resume text
      </button>

      <button
        type="button"
        onClick={onViewSampleReport}
        className="cursor-pointer inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        View sample report
      </button>
    </div>
  );
}

function StepJob({
  fileName,
  onScan,
  onViewSampleReport,
}: {
  fileName?: string;
  onScan: () => void;
  onViewSampleReport?: () => void;
}) {
  const [jd, setJd] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const canScan = jd.trim().length > 0;

  const pickSample = (name: string) => {
    setSelected(name);
    setJd(JD_CONTENT[name] ?? "");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {fileName ? (
        <div className="flex w-full items-center gap-2 rounded-lg border border-border bg-muted px-3.5 py-2 text-sm text-foreground">
          <FileText className="h-4 w-4 text-muted-foreground" /> Uploaded:{" "}
          {fileName}
        </div>
      ) : null}

      <div className="grid min-h-[320px] w-full grid-cols-[1fr_auto_1fr] overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex flex-col">
          <div className="border-b border-border px-4 py-3 text-sm font-semibold text-muted-foreground">
            Paste a Job Description below
          </div>
          <textarea
            value={jd}
            onChange={(event) => {
              setJd(event.target.value);
              setSelected(null);
            }}
            placeholder="Copy and paste a job description here"
            className="min-h-[260px] flex-1 resize-none border-none px-4 py-3.5 text-sm leading-7 text-foreground outline-none"
          />
        </div>

        <div className="relative w-px bg-border">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-card px-2 py-1 text-xs font-semibold tracking-wide text-muted-foreground">
            OR
          </div>
        </div>

        <div className="flex flex-col">
          <div className="border-b border-border px-4 py-3 text-sm font-semibold text-muted-foreground">
            Use a Job Description Sample
          </div>
          <div className="flex-1 overflow-y-auto">
            {JD_SAMPLES.map((name) => {
              const active = selected === name;
              return (
                <button
                  key={name}
                  onClick={() => pickSample(name)}
                  className={`flex w-full items-center justify-between border-b border-border px-4 py-2.5 text-left text-sm transition-colors ${
                    active
                      ? "bg-muted text-foreground"
                      : "bg-transparent text-foreground hover:bg-background"
                  }`}
                >
                  <span>{name}</span>
                  {active ? <Check className="h-4 w-4" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button
        disabled={!canScan}
        onClick={() => {
          if (canScan) onScan();
        }}
        className="rounded-md bg-primary px-8 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
      >
        Scan
      </button>

      <button
        type="button"
        onClick={onViewSampleReport}
        className="cursor-pointer inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <FileText className="h-4 w-4" /> View sample report
      </button>
    </div>
  );
}

type ScanWidgetProps = {
  onScanComplete: () => void;
  onViewSampleReport?: () => void;
};

export function ScanWidget({
  onScanComplete,
  onViewSampleReport,
}: ScanWidgetProps) {
  const [file, setFile] = useState<File | null>(null);
  const currentStep = file ? 2 : 1;

  return (
    <section id="how-it-works" className="w-full py-[72px]">
      <div className="mx-auto max-w-[860px] px-6">
        <div className="mb-10 text-center">
          <h2 className="mb-2.5 text-[clamp(24px,4vw,32px)] font-extrabold tracking-[-0.02em] text-foreground">
            Precision Job Matching in Minutes
          </h2>
          <p className="mx-auto max-w-[520px] text-base leading-relaxed text-muted-foreground">
            Our streamlined three-step process ensures your resume speaks the
            language of recruiters and ATS systems.
          </p>
        </div>

        <div className="rounded-[20px] border border-border bg-muted px-10 py-9">
          <Stepper current={currentStep} />

          {currentStep === 1 ? (
            <StepUpload
              onFile={(selectedFile) => setFile(selectedFile)}
              onViewSampleReport={onViewSampleReport}
            />
          ) : null}

          {currentStep === 2 ? (
            <StepJob
              fileName={file?.name}
              onScan={onScanComplete}
              onViewSampleReport={onViewSampleReport}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
