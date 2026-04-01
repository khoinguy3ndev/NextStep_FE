import { useRef, useState, type DragEvent } from "react";

const C = {
  brand: "#0041c8",
  brandHover: "#0038ab",
  brandLight: "#f1f5ff",
  brandBorder: "#c3c5d9",
  bg: "#f0edec",
  card: "#ffffff",
  stepDone: "#f1f5ff",
  stepInactive: "transparent",
  lineActive: "#0041c8",
  lineInactive: "#c3c5d9",
  textMain: "#1c1b1b",
  textMid: "#434656",
  textMuted: "#434656",
  textLight: "#8c8fa3",
  border: "#c3c5d9",
  scanDisabled: "#e6e8f0",
  scanDisabledText: "#9ca3b5",
  selectedBg: "#edf3ff",
  selectedText: "#0041c8",
  hoverBg: "#f5f8ff",
};

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

function CheckIcon({ size = 18, color = C.brand }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function UploadIcon({ size = 52, color = "#7da7ea" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="8" y="10" width="36" height="46" rx="4" fill="#edf3ff" />
      <rect x="14" y="18" width="24" height="3" rx="1.5" fill="#9bb7e8" />
      <rect x="14" y="25" width="18" height="3" rx="1.5" fill="#9bb7e8" />
      <rect x="14" y="32" width="20" height="3" rx="1.5" fill="#9bb7e8" />
      <circle cx="46" cy="46" r="13" fill={color} />
      <path
        d="M46 52V40M41 45l5-5 5 5"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FileIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={C.textMuted}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function Stepper({ current }: { current: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        marginBottom: 32,
      }}
    >
      {STEPS.map((step, index) => {
        const num = index + 1;
        const isDone = num < current;
        const isActive = num === current;

        return (
          <div
            key={step.label}
            style={{ display: "flex", alignItems: "flex-start" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 15,
                  background: isDone
                    ? C.stepDone
                    : isActive
                      ? C.brand
                      : C.stepInactive,
                  border: `2px solid ${isDone || isActive ? C.brand : C.lineInactive}`,
                  color: isDone ? C.brand : isActive ? "#fff" : C.textLight,
                  transition: "all .25s",
                }}
              >
                {isDone ? <CheckIcon size={18} color={C.brand} /> : num}
              </div>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  color: isDone || isActive ? C.textMain : C.textLight,
                }}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 ? (
              <div
                style={{
                  width: 96,
                  height: 2,
                  marginTop: 19,
                  flexShrink: 0,
                  background: num < current ? C.lineActive : C.lineInactive,
                  transition: "background .25s",
                }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function StepUpload({ onFile }: { onFile: (file: File) => void }) {
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
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <textarea
          autoFocus
          value={pasteText}
          onChange={(event) => setPasteText(event.target.value)}
          placeholder="Paste your resume text here..."
          style={{
            width: "100%",
            minHeight: 220,
            padding: "14px 16px",
            fontSize: 14,
            lineHeight: 1.7,
            color: C.textMain,
            border: `1.5px solid ${C.brandBorder}`,
            borderRadius: 10,
            outline: "none",
            resize: "vertical",
            fontFamily: "inherit",
          }}
        />
        <div style={{ display: "flex", gap: 10 }}>
          <button
            disabled={!pasteText.trim()}
            onClick={() => {
              const blob = new Blob([pasteText], { type: "text/plain" });
              onFile(new File([blob], "resume.txt", { type: "text/plain" }));
            }}
            style={{
              background: pasteText.trim() ? C.brand : C.scanDisabled,
              color: pasteText.trim() ? "#fff" : C.scanDisabledText,
              border: "none",
              borderRadius: 8,
              padding: "9px 24px",
              fontSize: 14,
              fontWeight: 600,
              cursor: pasteText.trim() ? "pointer" : "default",
            }}
          >
            Continue
          </button>
          <button
            onClick={() => {
              setPasting(false);
              setPasteText("");
            }}
            style={{
              background: "none",
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              padding: "9px 20px",
              fontSize: 14,
              color: C.textMid,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 18,
        alignItems: "center",
      }}
    >
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
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          minHeight: 280,
          border: `2px dashed ${dragging ? C.brand : C.brandBorder}`,
          borderRadius: 12,
          background: dragging ? C.brandLight : C.card,
          cursor: "pointer",
          transition: "all .18s",
          padding: "32px 20px",
          textAlign: "center",
        }}
      >
        <UploadIcon />
        <p
          style={{
            marginTop: 18,
            fontSize: 18,
            fontWeight: 600,
            color: C.textMain,
          }}
        >
          Drag & Drop or{" "}
          <span style={{ color: C.brand, textDecoration: "underline" }}>
            Choose file
          </span>{" "}
          to upload
        </p>
        <p style={{ marginTop: 6, fontSize: 13, color: C.textLight }}>
          as .pdf or .docx file
        </p>
        <input
          id="scan-resume-input"
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          style={{ display: "none" }}
          onChange={(event) => handleFile(event.target.files?.[0] ?? undefined)}
        />
      </label>

      <button
        onClick={() => setPasting(true)}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          color: C.brand,
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
          textDecoration: "none",
        }}
      >
        Or paste resume text
      </button>

      <button
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          padding: "9px 22px",
          fontSize: 14,
          fontWeight: 600,
          color: C.textMid,
          cursor: "pointer",
        }}
      >
        <FileIcon /> View sample report
      </button>
    </div>
  );
}

function StepJob({
  fileName,
  onScan,
}: {
  fileName?: string;
  onScan: () => void;
}) {
  const [jd, setJd] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const canScan = jd.trim().length > 0;

  const pickSample = (name: string) => {
    setSelected(name);
    setJd(JD_CONTENT[name] ?? "");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "center",
      }}
    >
      {fileName ? (
        <div
          style={{
            width: "100%",
            background: C.brandLight,
            border: `1px solid ${C.brandBorder}`,
            borderRadius: 8,
            padding: "7px 14px",
            fontSize: 13,
            color: "#1e3a5f",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <FileIcon size={14} /> Uploaded: {fileName}
        </div>
      ) : null}

      <div
        style={{
          width: "100%",
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          minHeight: 320,
          background: C.card,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              padding: "12px 16px",
              borderBottom: `1px solid ${C.border}`,
              fontSize: 15,
              fontWeight: 600,
              color: C.textMid,
            }}
          >
            Paste a Job Description below
          </div>
          <textarea
            value={jd}
            onChange={(event) => {
              setJd(event.target.value);
              setSelected(null);
            }}
            placeholder="Copy and paste a job description here"
            style={{
              flex: 1,
              padding: "14px 16px",
              fontSize: 14,
              lineHeight: 1.75,
              color: C.textMain,
              border: "none",
              outline: "none",
              resize: "none",
              fontFamily: "inherit",
              minHeight: 260,
            }}
          />
        </div>

        <div
          style={{
            width: 1,
            background: C.border,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              background: C.card,
              padding: "4px 0",
              color: C.textMuted,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.04em",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            OR
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              padding: "12px 16px",
              borderBottom: `1px solid ${C.border}`,
              fontSize: 15,
              fontWeight: 600,
              color: C.textMid,
            }}
          >
            Use a Job Description Sample
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {JD_SAMPLES.map((name) => {
              const active = selected === name;
              return (
                <button
                  key={name}
                  onClick={() => pickSample(name)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "11px 16px",
                    textAlign: "left",
                    background: active ? C.selectedBg : "transparent",
                    color: active ? C.selectedText : C.textMain,
                    border: "none",
                    borderBottom: `1px solid ${C.border}`,
                    fontSize: 14,
                    cursor: "pointer",
                    transition: "background .12s",
                  }}
                  onMouseEnter={(event) => {
                    if (!active) {
                      event.currentTarget.style.background = C.hoverBg;
                    }
                  }}
                  onMouseLeave={(event) => {
                    if (!active) {
                      event.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <span>{name}</span>
                  {active ? (
                    <CheckIcon size={15} color={C.selectedText} />
                  ) : null}
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
        style={{
          background: canScan ? C.brand : C.scanDisabled,
          color: canScan ? "#fff" : C.scanDisabledText,
          border: "none",
          borderRadius: 9,
          padding: "11px 52px",
          fontSize: 20,
          fontWeight: 700,
          cursor: canScan ? "pointer" : "default",
          transition: "background .15s",
          letterSpacing: "-0.01em",
        }}
        onMouseEnter={(event) => {
          if (canScan) {
            event.currentTarget.style.background = C.brandHover;
          }
        }}
        onMouseLeave={(event) => {
          if (canScan) {
            event.currentTarget.style.background = C.brand;
          }
        }}
      >
        Scan
      </button>

      <button
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          padding: "9px 22px",
          fontSize: 14,
          fontWeight: 600,
          color: C.textMid,
          cursor: "pointer",
        }}
      >
        <FileIcon /> View sample report
      </button>
    </div>
  );
}

type ScanWidgetProps = {
  onScanComplete: () => void;
};

export function ScanWidget({ onScanComplete }: ScanWidgetProps) {
  const [file, setFile] = useState<File | null>(null);
  const currentStep = file ? 2 : 1;

  return (
    <section id="how-it-works" style={{ width: "100%", padding: "72px 0" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 32px)",
              fontWeight: 800,
              color: C.textMain,
              letterSpacing: "-0.02em",
              marginBottom: 10,
            }}
          >
            Precision Job Matching in Minutes
          </h2>
          <p
            style={{
              fontSize: 16,
              color: C.textMuted,
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Our streamlined three-step process ensures your resume speaks the
            language of recruiters and ATS systems.
          </p>
        </div>

        <div
          style={{
            background: C.bg,
            borderRadius: 20,
            padding: "36px 40px",
            border: "1px solid #d8dbe7",
            boxShadow: "0 10px 30px rgba(28,27,27,0.06)",
          }}
        >
          <Stepper current={currentStep} />
          {currentStep === 1 ? (
            <StepUpload onFile={(selectedFile) => setFile(selectedFile)} />
          ) : null}
          {currentStep === 2 ? (
            <StepJob fileName={file?.name} onScan={onScanComplete} />
          ) : null}
        </div>
      </div>
    </section>
  );
}
