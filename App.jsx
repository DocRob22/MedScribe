import { useState } from "react";

const ACCENT = "#0EA5E9";
const ACCENT_DARK = "#0284C7";
const PRO_COLOR = "#F59E0B";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
  html { font-size: 16px; scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: #F0F4F8; color: #1E293B; -webkit-font-smoothing: antialiased; min-height: 100vh; }

  /* ── Shell ── */
  .shell { min-height: 100vh; display: flex; flex-direction: column; }

  /* ── Topbar ── */
  .topbar {
    background: #fff;
    border-bottom: 1px solid #E2E8F0;
    padding: 0 16px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 200;
    gap: 10px;
  }
  .logo {
    font-size: 19px;
    font-weight: 600;
    letter-spacing: -0.6px;
    color: #0F172A;
    display: flex;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
    line-height: 1;
  }
  .logo em { color: #0EA5E9; font-style: normal; }
  .logo-dot { width: 6px; height: 6px; border-radius: 50%; background: #0EA5E9; margin-left: 2px; margin-bottom: 10px; }
  .beta-pill {
    background: #FEF3C7;
    color: #92400E;
    font-size: 10px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 20px;
    border: 1px solid #FCD34D;
    letter-spacing: .3px;
    flex-shrink: 0;
  }

  /* ── Nav tabs — horizontally scrollable on mobile ── */
  .nav-wrap {
    display: flex;
    background: #F1F5F9;
    padding: 3px;
    border-radius: 10px;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    gap: 2px;
    min-width: 0;
    flex: 1;
    max-width: 520px;
  }
  .nav-wrap::-webkit-scrollbar { display: none; }
  .ntab {
    padding: 6px 11px;
    border-radius: 7px;
    font-size: 12.5px;
    font-weight: 500;
    color: #64748B;
    cursor: pointer;
    border: none;
    background: transparent;
    transition: background .12s, color .12s;
    white-space: nowrap;
    flex-shrink: 0;
    font-family: inherit;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .ntab.on { background: #fff; color: #0F172A; box-shadow: 0 1px 3px rgba(0,0,0,.09); }
  .ntab:hover:not(.on) { background: rgba(255,255,255,.6); color: #334155; }
  .ai-pip {
    font-size: 9px;
    font-weight: 700;
    color: #F59E0B;
    letter-spacing: .2px;
  }

  /* ── Page ── */
  .page { flex: 1; padding: 22px 14px 60px; width: 100%; max-width: 820px; margin: 0 auto; }

  /* ── Tool header ── */
  .tool-hd { margin-bottom: 22px; }
  .tool-title { font-size: 22px; font-weight: 600; letter-spacing: -0.5px; color: #0F172A; margin-bottom: 5px; }
  .tool-desc { font-size: 14px; color: #64748B; line-height: 1.65; max-width: 540px; }

  /* ── Cards ── */
  .card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #E2E8F0;
    padding: 20px;
    margin-bottom: 14px;
    transition: box-shadow .15s;
  }
  .card-lbl {
    font-size: 11.5px;
    font-weight: 600;
    color: #94A3B8;
    letter-spacing: .6px;
    text-transform: uppercase;
    margin-bottom: 14px;
  }

  /* ── Chips ── */
  .chips { display: flex; flex-wrap: wrap; gap: 7px; }
  .chip {
    padding: 7px 14px;
    border-radius: 9px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    border: 1.5px solid #E2E8F0;
    background: #fff;
    color: #475569;
    transition: border-color .12s, color .12s, background .12s;
    font-family: inherit;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    touch-action: manipulation;
  }
  .chip:hover { border-color: #0EA5E9; color: #0EA5E9; }
  .chip.on { background: #EFF6FF; border-color: #0EA5E9; color: #0284C7; }
  .chip.locked { opacity: .5; cursor: not-allowed; border-style: dashed; }
  .pro-tag { font-size: 9px; font-weight: 700; color: #F59E0B; }

  /* ── Form elements ── */
  .lbl { font-size: 12px; font-weight: 600; color: #64748B; letter-spacing: .2px; margin-bottom: 6px; display: block; }
  .field {
    width: 100%;
    padding: 10px 13px;
    border-radius: 9px;
    border: 1.5px solid #E2E8F0;
    font-size: 14px;
    color: #1E293B;
    font-family: inherit;
    background: #fff;
    transition: border-color .12s;
    appearance: none;
  }
  .field:focus { outline: none; border-color: #0EA5E9; }
  textarea.field { resize: vertical; min-height: 76px; line-height: 1.6; }

  /* ── Buttons ── */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 11px 20px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: background .12s, opacity .12s, transform .08s;
    font-family: inherit;
    line-height: 1;
    touch-action: manipulation;
  }
  .btn:active { transform: scale(.97); }
  .btn.primary { background: #0EA5E9; color: #fff; }
  .btn.primary:hover { background: #0284C7; }
  .btn.primary:disabled { background: #CBD5E1; color: #94A3B8; cursor: not-allowed; transform: none; }
  .btn.ghost { background: #F1F5F9; color: #475569; border: 1px solid #E2E8F0; }
  .btn.ghost:hover { background: #E2E8F0; }
  .btn.w { width: 100%; }
  .btn-row { display: flex; gap: 10px; }
  .btn-row .btn { flex: 1; }

  /* ── Setting toggle ── */
  .seg { display: inline-flex; background: #F1F5F9; padding: 3px; border-radius: 9px; gap: 2px; }
  .seg-opt {
    padding: 7px 14px;
    border-radius: 7px;
    font-size: 13px;
    font-weight: 500;
    color: #64748B;
    cursor: pointer;
    border: none;
    background: transparent;
    transition: all .12s;
    font-family: inherit;
    touch-action: manipulation;
  }
  .seg-opt.on { background: #fff; color: #0F172A; box-shadow: 0 1px 2px rgba(0,0,0,.08); }

  /* ── Checklist ── */
  .check-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: background .1s;
    user-select: none;
    touch-action: manipulation;
  }
  .check-item:hover { background: #F8FAFC; }
  .check-box {
    width: 19px;
    height: 19px;
    border-radius: 5px;
    border: 2px solid #CBD5E1;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .12s;
  }
  .check-box.done { background: #0EA5E9; border-color: #0EA5E9; }
  .check-txt { font-size: 13.5px; color: #334155; line-height: 1.4; }
  .check-txt.done { text-decoration: line-through; color: #94A3B8; }
  .sec-hd { font-size: 11px; font-weight: 700; color: #94A3B8; letter-spacing: 1px; text-transform: uppercase; padding: 12px 10px 5px; }

  /* ── Toggle rows (ROS/PE) ── */
  .tog-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    border-radius: 8px;
    transition: background .1s;
    gap: 12px;
  }
  .tog-row:hover { background: #F8FAFC; }
  .tog-lbl { font-size: 13px; color: #334155; flex: 1; min-width: 0; }
  .tog-btns { display: flex; gap: 5px; flex-shrink: 0; }
  .tog {
    padding: 5px 12px;
    border-radius: 7px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: 1.5px solid #E2E8F0;
    background: #fff;
    color: #94A3B8;
    transition: all .1s;
    font-family: inherit;
    min-width: 38px;
    touch-action: manipulation;
  }
  .tog.pos { background: #DCFCE7; border-color: #86EFAC; color: #166534; }
  .tog.neg { background: #FEE2E2; border-color: #FCA5A5; color: #991B1B; }

  /* ── Live preview ── */
  .preview {
    background: #F0F9FF;
    border: 1px solid #BAE6FD;
    border-radius: 11px;
    padding: 14px 16px;
    font-size: 13.5px;
    color: #0C4A6E;
    line-height: 1.75;
    min-height: 56px;
  }
  .preview.empty { color: #94A3B8; font-style: italic; }

  /* ── Output box ── */
  .output {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 11px;
    padding: 16px;
    font-family: 'DM Mono', monospace;
    font-size: 12.5px;
    line-height: 1.85;
    color: #334155;
    white-space: pre-wrap;
    overflow-x: auto;
  }

  /* ── Banners ── */
  .warn-banner {
    background: #FFFBEB;
    border: 1px solid #FCD34D;
    border-radius: 11px;
    padding: 12px 15px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 14px;
    font-size: 13px;
    color: #78350F;
    line-height: 1.55;
  }
  .warn-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
  .success-banner {
    background: #F0FDF4;
    border: 1px solid #BBF7D0;
    border-radius: 10px;
    padding: 11px 14px;
    font-size: 13px;
    color: #166534;
    line-height: 1.5;
    margin-top: 12px;
  }

  /* ── Usage bar ── */
  .usage-bar {
    background: #FFF7ED;
    border: 1px solid #FED7AA;
    border-radius: 9px;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-top: 12px;
    flex-wrap: wrap;
  }
  .usage-txt { font-size: 13px; color: #9A3412; font-weight: 500; }
  .upgrade-link { font-size: 13px; color: #0EA5E9; font-weight: 600; cursor: pointer; white-space: nowrap; }

  /* ── Loading ── */
  .loading-wrap { display: flex; flex-direction: column; align-items: center; padding: 40px 20px; gap: 14px; }
  .spinner {
    width: 22px; height: 22px;
    border: 2.5px solid #E2E8F0;
    border-top-color: #0EA5E9;
    border-radius: 50%;
    animation: spin .65s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-txt { font-size: 14px; color: #64748B; }

  /* ── Toast ── */
  .toast {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: #0F172A;
    color: #fff;
    padding: 11px 22px;
    border-radius: 11px;
    font-size: 13.5px;
    font-weight: 500;
    z-index: 9999;
    pointer-events: none;
    white-space: nowrap;
    animation: toastIn .2s ease;
    box-shadow: 0 4px 20px rgba(0,0,0,.25);
  }
  @keyframes toastIn { from { opacity:0; transform:translateX(-50%) translateY(10px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }

  /* ── Modal ── */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(15,23,42,.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 500;
    padding: 20px;
    backdrop-filter: blur(2px);
  }
  .modal {
    background: #fff;
    border-radius: 18px;
    padding: 28px 24px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 20px 60px rgba(0,0,0,.15);
  }
  .modal-title { font-size: 18px; font-weight: 600; color: #0F172A; margin-bottom: 6px; }
  .modal-sub { font-size: 14px; color: #64748B; line-height: 1.6; margin-bottom: 18px; }
  .no-item { display: flex; align-items: center; gap: 9px; padding: 6px 0; font-size: 13.5px; color: #334155; }
  .no-dot { width: 18px; height: 18px; border-radius: 50%; background: #FEE2E2; color: #DC2626; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

  /* ── Grid ── */
  .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .div { height: 1px; background: #F1F5F9; margin: 16px 0; }

  /* ── Responsive ── */
  @media (max-width: 540px) {
    .topbar { padding: 0 12px; height: 52px; }
    .logo { font-size: 17px; }
    .page { padding: 16px 10px 72px; }
    .card { padding: 16px 14px; border-radius: 14px; }
    .tool-title { font-size: 19px; }
    .g2 { grid-template-columns: 1fr; gap: 10px; }
    .btn-row { flex-direction: column; }
    .btn-row .btn { width: 100%; }
    .chips { gap: 6px; }
    .chip { font-size: 12.5px; padding: 6px 11px; }
    .tog { padding: 5px 9px; font-size: 12px; }
    .output { font-size: 11.5px; }
    .usage-bar { flex-direction: column; align-items: flex-start; gap: 6px; }
    .modal { padding: 22px 18px; }
  }
`;

const NOTE_PROMPTS = {
  "Emergency": {
    "H&P": {
      "Chief Complaint": ["Onset & duration","Quality / character","Severity (0–10)","Location & radiation","Aggravating / alleviating factors","Associated symptoms"],
      "History": ["Relevant PMH","Allergies","Current medications","Last meal / drink","Pertinent social history","Mechanism (if trauma)"],
      "Review of Systems": ["Cardiovascular (CP, palpitations, SOB)","Respiratory (dyspnea, cough, hemoptysis)","Neurologic (headache, vision, weakness)","GI (nausea, vomiting, pain, bleeding)","GU (dysuria, hematuria)","Constitutional (fever, chills, fatigue)"],
      "Physical Exam": ["Vital signs (T, HR, BP, RR, SpO2)","General appearance","HEENT","Cardiovascular","Pulmonary","Abdomen","Extremities","Neurologic"],
      "Assessment / Plan": ["Primary diagnosis / differential","Diagnostic workup ordered","Treatments initiated","Disposition plan","Discharge instructions given","Follow-up arranged"],
    },
    "SOAP": {
      "Subjective": ["Chief complaint in patient's words","HPI with OLDCARTS","Pertinent PMH/PSH","Current medications & allergies","ROS positives & pertinent negatives"],
      "Objective": ["Vital signs","General appearance","Focused physical exam findings","Pertinent lab / imaging results"],
      "Assessment": ["Primary diagnosis","Differential diagnoses considered","Clinical reasoning summary"],
      "Plan": ["Diagnostic orders","Therapeutic interventions","Disposition & follow-up","Patient education provided"],
    },
    "Progress Note": {
      "Interval History": ["Changes since last assessment","New complaints or concerns","Response to treatment"],
      "Objective": ["Current vital signs","Exam changes from baseline","New results"],
      "Assessment / Plan": ["Updated clinical impression","Plan modifications","Reassessment timeline"],
    },
  },
  "Internal Medicine": {
    "H&P": {
      "Chief Complaint": ["Onset, duration, course","Severity & functional impact","Associated symptoms","Pertinent negatives"],
      "History": ["PMH (chronic conditions)","PSH","Family history (cardiovascular, malignancy)","Social history (smoking, alcohol, occupation)","Medications & allergies","Recent labs / imaging"],
      "ROS (14-system)": ["Constitutional","Eyes","ENT","Cardiovascular","Respiratory","GI","GU","MSK","Skin","Neurologic","Psychiatric","Endocrine","Hematologic/Lymphatic","Allergic/Immunologic"],
      "Physical Exam": ["Complete vital signs","General appearance & nutrition","HEENT","Neck / lymph nodes","Cardiovascular","Pulmonary","Abdomen","Extremities / vascular","Skin","Neurologic"],
      "Assessment / Plan": ["Problem list with priorities","Diagnostic workup plan","Medication reconciliation","Consult requests","Patient education","Follow-up plan"],
    },
    "SOAP": {
      "Subjective": ["Chief complaint","Full HPI","PMH / PSH / FH / SH","Medications & allergies","Pertinent ROS"],
      "Objective": ["Vital signs","Physical exam by system","Current lab and imaging data"],
      "Assessment": ["Active problem list","Clinical reasoning","Risk stratification"],
      "Plan": ["Per-problem management plan","Medication changes","Pending studies","Consults","Discharge planning"],
    },
  },
  "Family Medicine": {
    "SOAP": {
      "Subjective": ["Chief complaint (patient's words)","HPI — onset, duration, severity","Pertinent PMH / chronic conditions","Current medications & allergies","Relevant ROS"],
      "Objective": ["Vital signs including BMI","Focused physical exam","Relevant screening results"],
      "Assessment": ["Primary diagnosis","Active chronic conditions addressed","Preventive care status"],
      "Plan": ["Acute treatment plan","Chronic disease management updates","Preventive care ordered","Patient education","Return precautions / follow-up"],
    },
    "Progress Note": {
      "Interval History": ["Reason for today's visit","Interval changes in symptoms","Medication adherence / side effects","Changes in health / lifestyle"],
      "Objective": ["Vital signs","Relevant exam findings","Lab review"],
      "Assessment / Plan": ["Problem-by-problem update","Medication adjustments","Referrals placed","Follow-up timeline"],
    },
  },
  "OB/GYN": {
    "H&P": {
      "Chief Complaint": ["Presenting complaint","Gestational age (if applicable)","LMP and cycle regularity","Contraceptive history"],
      "OB History": ["Gravida / Para / Abortus","Prior delivery modes","Complications in prior pregnancies","Current pregnancy course"],
      "GYN History": ["Last Pap and result","STI history","Pelvic / breast symptoms"],
      "Physical Exam": ["Vital signs","General appearance","Breast exam","Abdominal exam","Pelvic exam","Fetal heart tones (if pregnant)"],
      "Assessment / Plan": ["Diagnosis / EDD","Prenatal / GYN plan","Labs / imaging ordered","Patient education","Return precautions"],
    },
  },
  "Psychiatry": {
    "H&P": {
      "Chief Complaint": ["Presenting symptoms in patient's words","Duration and onset","Precipitating stressors","Prior similar episodes"],
      "Psychiatric History": ["Prior diagnoses","Prior hospitalizations","Suicide attempts / self-harm history","Current outpatient treatment"],
      "Mental Status Exam": ["Appearance & behavior","Speech","Mood & affect","Thought process & content","Perceptions (hallucinations)","Cognition","Insight & judgment"],
      "Safety Assessment": ["Suicidal ideation (active/passive)","Homicidal ideation","Means access","Protective factors"],
      "Assessment / Plan": ["DSM diagnosis / differential","Disposition (inpatient / outpatient)","Medication plan","Therapy referral","Safety plan reviewed"],
    },
  },
};

const ROS_PE = {
  "Cardiovascular": {
    ros: ["Chest pain","Palpitations","Dyspnea on exertion","Orthopnea","Leg swelling / edema","Syncope / near-syncope"],
    pe: ["Regular rate and rhythm","Murmur present","S3 / S4 gallop","JVD elevated","Peripheral pulses symmetric","Capillary refill < 2s"],
  },
  "Respiratory": {
    ros: ["Shortness of breath","Cough (productive / dry)","Hemoptysis","Wheezing","Pleuritic chest pain","Snoring / sleep apnea"],
    pe: ["Clear to auscultation bilaterally","Wheezes present","Crackles / rhonchi","Diminished breath sounds","Accessory muscle use","Trachea midline"],
  },
  "Gastrointestinal": {
    ros: ["Abdominal pain","Nausea / vomiting","Diarrhea","Constipation","Melena / hematochezia","Dysphagia","Heartburn / regurgitation"],
    pe: ["Abdomen soft, non-tender","Tenderness to palpation","Voluntary guarding","Rigidity","Bowel sounds present","Organomegaly"],
  },
  "Neurologic": {
    ros: ["Headache","Dizziness / vertigo","Focal weakness","Numbness / tingling","Vision changes","Speech changes","Seizure activity","Memory changes"],
    pe: ["Alert and oriented x4","Cranial nerves II–XII intact","Motor strength 5/5 all extremities","Sensation intact to light touch","Coordination intact","Gait normal"],
  },
  "Musculoskeletal": {
    ros: ["Joint pain","Joint swelling","Morning stiffness > 30 min","Limited range of motion","Back pain","Muscle weakness","Myalgias"],
    pe: ["Full range of motion","No joint swelling / warmth","No tenderness to palpation","Muscle strength symmetric","Gait normal","No spinal tenderness"],
  },
  "Constitutional": {
    ros: ["Fever / chills","Night sweats","Unintentional weight loss","Fatigue","Decreased appetite","Malaise"],
    pe: ["Appears well / ill / distressed","Afebrile","BMI within normal limits","No diaphoresis","Ambulatory without difficulty"],
  },
};

function Tick() {
  return (
    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
      <path d="M1 4L4.5 7.5L10 1" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Toast({ msg }) {
  return <div className="toast">{msg}</div>;
}

function UsageBar({ used, max, onUpgrade }) {
  return (
    <div className="usage-bar">
      <span className="usage-txt">{max - used} of {max} free uses remaining today</span>
      <span className="upgrade-link" onClick={onUpgrade}>Upgrade for unlimited →</span>
    </div>
  );
}

/* ─────────────────────────────────────────
   APP 1 — Note Prompt Builder
───────────────────────────────────────── */
function PromptBuilder({ showToast }) {
  const [setting, setSetting] = useState("Emergency");
  const [noteType, setNoteType] = useState("");
  const [step, setStep] = useState(1);
  const [checked, setChecked] = useState({});

  const specialties = Object.keys(NOTE_PROMPTS);
  const noteTypes = NOTE_PROMPTS[setting] ? Object.keys(NOTE_PROMPTS[setting]) : [];
  const proTypes = ["Discharge Summary", "Procedure Note", "Consult Note"];
  const allTypes = [...noteTypes, ...proTypes];
  const sections = setting && noteType ? NOTE_PROMPTS[setting]?.[noteType] : null;

  const toggle = (k) => setChecked(p => ({ ...p, [k]: !p[k] }));

  const copyText = () => {
    if (!sections) return "";
    return Object.entries(sections).map(([s, items]) =>
      `${s.toUpperCase()}\n${items.map(i => `[ ] ${i}`).join("\n")}`
    ).join("\n\n");
  };

  return (
    <div>
      <div className="tool-hd">
        <div className="tool-title">Note prompt builder</div>
        <div className="tool-desc">Pick your specialty and note type — get a ready-to-reference documentation checklist. No patient data, no friction.</div>
      </div>

      <div className="card">
        <div className="card-lbl">Clinical setting</div>
        <div className="seg" style={{ flexWrap: "wrap", gap: 3 }}>
          {["Emergency", "Inpatient", "Outpatient"].map(s => (
            <button key={s} className={`seg-opt${setting === s ? " on" : ""}`}
              onClick={() => { setSetting(s); setNoteType(""); setStep(1); }}>{s}</button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-lbl">Specialty</div>
        <div className="chips">
          {specialties.map(sp => (
            <button key={sp} className={`chip${setting === sp ? " on" : ""}`}
              onClick={() => { setSetting(sp); setNoteType(""); setStep(1); }}>{sp}</button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-lbl">Note type</div>
        <div className="chips">
          {allTypes.map(t => {
            const locked = proTypes.includes(t);
            return (
              <button key={t} className={`chip${noteType === t ? " on" : ""}${locked ? " locked" : ""}`}
                onClick={() => { if (!locked) { setNoteType(t); setChecked({}); setStep(2); } }}>
                {t}{locked && <span className="pro-tag">PRO</span>}
              </button>
            );
          })}
        </div>
        <div className="div" />
        <button className="btn primary w" onClick={() => setStep(2)} disabled={!noteType}>
          {noteType ? `Generate ${noteType} checklist →` : "Select a note type to continue"}
        </button>
      </div>

      {step >= 2 && sections && (
        <div className="card">
          <div className="card-lbl">{setting} — {noteType}</div>
          {Object.entries(sections).map(([sec, items]) => (
            <div key={sec}>
              <div className="sec-hd">{sec}</div>
              {items.map(item => {
                const k = `${sec}:${item}`;
                const done = !!checked[k];
                return (
                  <div key={k} className="check-item" onClick={() => toggle(k)}>
                    <div className={`check-box${done ? " done" : ""}`}>{done && <Tick />}</div>
                    <span className={`check-txt${done ? " done" : ""}`}>{item}</span>
                  </div>
                );
              })}
            </div>
          ))}
          <div className="div" />
          <div className="btn-row">
            <button className="btn primary" onClick={() => { navigator.clipboard?.writeText(copyText()); showToast("Checklist copied — paste into your EHR"); }}>
              Copy for EHR
            </button>
            <button className="btn ghost" onClick={() => { setNoteType(""); setChecked({}); setStep(1); }}>
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   APP 2 — Note Scaffold
───────────────────────────────────────── */
function ScaffoldBuilder({ showToast }) {
  const [complaint, setComplaint] = useState("");
  const [setting, setSetting] = useState("Inpatient");
  const [format, setFormat] = useState("SOAP");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [uses, setUses] = useState(3);

  const proFormats = ["Focused ED Note", "Condensed (1-page)"];
  const formats = ["SOAP", "H&P", "Progress Note", ...proFormats];

  const generate = async () => {
    if (!complaint.trim() || uses <= 0) return;
    setUses(u => u - 1);
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are a clinical documentation expert. Generate a professional ${format} note scaffold for a ${setting.toLowerCase()} patient presenting with: "${complaint}".

Instructions:
- Use [BLANK] or [describe finding] placeholders for all actual clinical values — never invent specific numbers or findings
- Structure by standard ${format} sections with clear section headers in ALL CAPS
- Include all elements a provider needs to complete this note type for this complaint
- Use proper medical documentation language and terminology  
- Keep it concise but complete
- Output plain text only — no markdown, no asterisks, no bullet symbols beyond standard medical formatting`
          }]
        })
      });
      const data = await res.json();
      setOutput(data.content?.map(b => b.text || "").join("\n") || "Unable to generate. Please try again.");
    } catch {
      setOutput("Connection error. Check your network and try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="tool-hd">
        <div className="tool-title">Chief complaint → note scaffold</div>
        <div className="tool-desc">Type any presenting complaint and get a structured, EHR-ready note outline in seconds. All blanks are filled by you in your own system.</div>
      </div>

      <div className="warn-banner">
        <span className="warn-icon">⚠️</span>
        <span>No patient names, dates of birth, MRNs, or insurance IDs. Use clinical descriptors only — age, sex, and complaint.</span>
      </div>

      <div className="card">
        <div className="card-lbl">Presenting complaint</div>
        <textarea className="field" rows={3} placeholder="e.g. 62yo M with acute onset chest pain radiating to left arm, onset 90 min ago..."
          value={complaint} onChange={e => setComplaint(e.target.value)} />
        <div className="div" />
        <div className="g2">
          <div>
            <span className="lbl">Setting</span>
            <div className="seg">
              {["Inpatient", "Outpatient"].map(s => (
                <button key={s} className={`seg-opt${setting === s ? " on" : ""}`} onClick={() => setSetting(s)}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <span className="lbl">Note format</span>
            <select className="field" value={format} onChange={e => setFormat(e.target.value)}>
              {formats.map(f => <option key={f} value={f} disabled={proFormats.includes(f)}>{proFormats.includes(f) ? `${f} (PRO)` : f}</option>)}
            </select>
          </div>
        </div>
        <button className="btn primary w" style={{ marginTop: 14 }}
          onClick={generate} disabled={!complaint.trim() || uses <= 0 || loading}>
          {loading ? <><div className="spinner" /> Generating…</> : uses <= 0 ? "No free uses remaining" : "Generate scaffold →"}
        </button>
      </div>

      {(loading || output) && (
        <div className="card">
          <div className="card-lbl">{format} — {setting}</div>
          {loading ? (
            <div className="loading-wrap">
              <div className="spinner" />
              <div className="loading-txt">Building your note scaffold…</div>
            </div>
          ) : (
            <>
              <div className="output">{output}</div>
              <div className="btn-row" style={{ marginTop: 12 }}>
                <button className="btn primary" onClick={() => { navigator.clipboard?.writeText(output); showToast("Scaffold copied — paste into your EHR"); }}>
                  Copy to EHR
                </button>
                <button className="btn ghost" onClick={() => { setOutput(""); setComplaint(""); }}>
                  New scaffold
                </button>
              </div>
              <UsageBar used={3 - uses} max={3} onUpgrade={() => showToast("Upgrade coming in Phase 2!")} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   APP 4 — ROS / PE Builder
───────────────────────────────────────── */
function ROSBuilder({ showToast }) {
  const [selected, setSelected] = useState([]);
  const [step, setStep] = useState(1);
  const [togs, setTogs] = useState({});

  const toggle = (sys) => setSelected(p => p.includes(sys) ? p.filter(s => s !== sys) : [...p, sys]);

  const setTog = (key, val) => setTogs(p => {
    const next = { ...p };
    if (p[key] === val) delete next[key]; else next[key] = val;
    return next;
  });

  const preview = (() => {
    const lines = [];
    selected.forEach(sys => {
      const d = ROS_PE[sys];
      if (!d) return;
      const pr = d.ros.filter((_, i) => togs[`${sys}:r:${i}`] === "+");
      const nr = d.ros.filter((_, i) => togs[`${sys}:r:${i}`] === "-");
      const pp = d.pe.filter((_, i) => togs[`${sys}:p:${i}`] === "+");
      const np = d.pe.filter((_, i) => togs[`${sys}:p:${i}`] === "-");
      if (pr.length || nr.length) {
        let l = `ROS ${sys}: `;
        if (pr.length) l += `Positive for ${pr.join(", ").toLowerCase()}. `;
        if (nr.length) l += `Negative for ${nr.join(", ").toLowerCase()}.`;
        lines.push(l.trim());
      }
      if (pp.length || np.length) {
        let l = `PE ${sys}: `;
        if (pp.length) l += pp.join(". ") + ". ";
        if (np.length) l += `No ${np.join(", ").toLowerCase()}.`;
        lines.push(l.trim());
      }
    });
    return lines.join("\n");
  })();

  return (
    <div>
      <div className="tool-hd">
        <div className="tool-title">ROS & PE quick-click</div>
        <div className="tool-desc">Tap positive or negative for each finding. Watch your note language assemble in real time — then copy straight into your EHR.</div>
      </div>

      {step === 1 && (
        <div className="card">
          <div className="card-lbl">Select body systems</div>
          <div className="chips">
            {Object.keys(ROS_PE).map(sys => (
              <button key={sys} className={`chip${selected.includes(sys) ? " on" : ""}`} onClick={() => toggle(sys)}>{sys}</button>
            ))}
          </div>
          <div className="div" />
          <button className="btn primary w" onClick={() => setStep(2)} disabled={selected.length === 0}>
            {selected.length > 0 ? `Review ${selected.length} system${selected.length > 1 ? "s" : ""} →` : "Select at least one system"}
          </button>
        </div>
      )}

      {step === 2 && (
        <>
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span className="card-lbl" style={{ margin: 0 }}>Toggle findings</span>
              <button className="btn ghost" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => setStep(1)}>← Edit systems</button>
            </div>
            {selected.map(sys => {
              const d = ROS_PE[sys];
              return (
                <div key={sys}>
                  <div className="sec-hd">{sys} — Review of systems</div>
                  {d.ros.map((item, i) => {
                    const k = `${sys}:r:${i}`;
                    return (
                      <div key={k} className="tog-row">
                        <span className="tog-lbl">{item}</span>
                        <div className="tog-btns">
                          <button className={`tog${togs[k] === "+" ? " pos" : ""}`} onClick={() => setTog(k, "+")}>+</button>
                          <button className={`tog${togs[k] === "-" ? " neg" : ""}`} onClick={() => setTog(k, "-")}>–</button>
                        </div>
                      </div>
                    );
                  })}
                  <div className="sec-hd" style={{ marginTop: 4 }}>{sys} — Physical exam</div>
                  {d.pe.map((item, i) => {
                    const k = `${sys}:p:${i}`;
                    return (
                      <div key={k} className="tog-row">
                        <span className="tog-lbl">{item}</span>
                        <div className="tog-btns">
                          <button className={`tog${togs[k] === "+" ? " pos" : ""}`} onClick={() => setTog(k, "+")}>+</button>
                          <button className={`tog${togs[k] === "-" ? " neg" : ""}`} onClick={() => setTog(k, "-")}>–</button>
                        </div>
                      </div>
                    );
                  })}
                  <div className="div" />
                </div>
              );
            })}
          </div>

          <div className="card">
            <div className="card-lbl">Live note preview</div>
            <div className={`preview${!preview ? " empty" : ""}`}>
              {preview || "Toggle findings above — your note text will appear here…"}
            </div>
            <div className="btn-row" style={{ marginTop: 12 }}>
              <button className="btn primary" disabled={!preview}
                onClick={() => { navigator.clipboard?.writeText(preview); showToast("ROS/PE copied — paste into your EHR"); }}>
                Copy to EHR
              </button>
              <button className="btn ghost" onClick={() => { setTogs({}); showToast("All toggles reset"); }}>
                Reset
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   APP 5 — Prior Auth Generator
───────────────────────────────────────── */
function PriorAuth({ showToast }) {
  const [modal, setModal] = useState(true);
  const [form, setForm] = useState({ dx: "", service: "", justification: "", prior: "" });
  const [letterType, setLetterType] = useState("Prior Authorization");
  const [payer, setPayer] = useState("Commercial Insurance");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [uses, setUses] = useState(3);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const valid = form.dx.trim() && form.service.trim() && form.justification.trim();
  const proTypes = ["Appeal Letter"];
  const letterTypes = ["Prior Authorization", "Referral Letter", "Appeal Letter"];
  const payers = ["Commercial Insurance", "Medicare / Medicaid", "Workers Comp", "VA / TriCare"];

  const generate = async () => {
    if (!valid || uses <= 0) return;
    setUses(u => u - 1);
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Write a professional ${letterType} letter for ${payer}.

Clinical details:
- Diagnosis: ${form.dx}
- Requested service: ${form.service}  
- Medical justification: ${form.justification}
- Prior treatments attempted: ${form.prior || "Not specified"}

Requirements:
- Professional medical letter format
- Start with: Re: Request for ${letterType}
- Use [PATIENT NAME], [DATE OF BIRTH], [MRN], [DATE], [PROVIDER NAME, CREDENTIALS], [PRACTICE NAME], [NPI] as placeholders
- Clinically persuasive language citing medical necessity and evidence-based guidelines where appropriate
- Reference diagnosis codes if ICD-10 format was provided
- End with signature block using the placeholders above
- 200–320 words, assertive but professional tone
- Plain text only — no markdown formatting`
          }]
        })
      });
      const data = await res.json();
      setOutput(data.content?.map(b => b.text || "").join("\n") || "Unable to generate. Please try again.");
    } catch {
      setOutput("Connection error. Check your network and try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      {modal && (
        <div className="overlay">
          <div className="modal">
            <div style={{ fontSize: 30, marginBottom: 10 }}>🔒</div>
            <div className="modal-title">Before you begin</div>
            <div className="modal-sub">This tool generates de-identified clinical letters. Do not enter any of the following:</div>
            {["Patient name", "Date of birth", "MRN / Account number", "Insurance ID / Member ID", "Social Security number"].map(item => (
              <div key={item} className="no-item">
                <div className="no-dot">✕</div>
                <span>{item}</span>
              </div>
            ))}
            <div style={{ fontSize: 13, color: "#64748B", marginTop: 14, marginBottom: 20, lineHeight: 1.6 }}>
              Use ICD-10 codes, age/sex, and clinical descriptors only. Add patient identifiers locally after copying or downloading.
            </div>
            <button className="btn primary w" onClick={() => setModal(false)}>I understand — let's go</button>
          </div>
        </div>
      )}

      <div className="tool-hd">
        <div className="tool-title">Prior auth & referral generator</div>
        <div className="tool-desc">Generate a clinically persuasive prior authorization or referral letter in 30 seconds. Add patient identifiers locally before sending.</div>
      </div>

      <div className="card">
        <div className="card-lbl">Clinical information — no patient identifiers</div>
        <span className="lbl">Diagnosis (ICD-10 preferred)</span>
        <input className="field" style={{ marginBottom: 12 }} placeholder="e.g. I25.10 — Ischemic heart disease, unspecified"
          value={form.dx} onChange={e => set("dx", e.target.value)} />
        <span className="lbl">Requested service or procedure</span>
        <input className="field" style={{ marginBottom: 12 }} placeholder="e.g. Cardiac catheterization — left heart"
          value={form.service} onChange={e => set("service", e.target.value)} />
        <span className="lbl">Medical necessity justification</span>
        <textarea className="field" rows={3} style={{ marginBottom: 12 }}
          placeholder="e.g. 65yo M with progressive stable angina refractory to max medical therapy x3mo, positive nuclear stress test, EF 45%..."
          value={form.justification} onChange={e => set("justification", e.target.value)} />
        <span className="lbl">Prior treatments attempted (optional)</span>
        <input className="field" placeholder="e.g. Metoprolol, isosorbide mononitrate, aspirin — inadequate symptom control"
          value={form.prior} onChange={e => set("prior", e.target.value)} />
        <div className="div" />
        <div className="g2">
          <div>
            <span className="lbl">Letter type</span>
            <select className="field" value={letterType} onChange={e => setLetterType(e.target.value)}>
              {letterTypes.map(t => <option key={t} value={t} disabled={proTypes.includes(t)}>{proTypes.includes(t) ? `${t} (PRO)` : t}</option>)}
            </select>
          </div>
          <div>
            <span className="lbl">Payer type</span>
            <select className="field" value={payer} onChange={e => setPayer(e.target.value)}>
              {payers.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <button className="btn primary w" style={{ marginTop: 14 }}
          onClick={generate} disabled={!valid || uses <= 0 || loading}>
          {loading ? <><div className="spinner" /> Generating letter…</> : uses <= 0 ? "No free uses remaining" : `Generate ${letterType} →`}
        </button>
      </div>

      {(loading || output) && (
        <div className="card">
          <div className="card-lbl">{letterType} — {payer}</div>
          {loading ? (
            <div className="loading-wrap">
              <div className="spinner" />
              <div className="loading-txt">Writing your {letterType.toLowerCase()}…</div>
            </div>
          ) : (
            <>
              <div className="output">{output}</div>
              <div className="success-banner">
                Add patient identifiers (name, DOB, MRN) locally before sending. Nothing was stored on MedScribe's servers.
              </div>
              <div className="btn-row" style={{ marginTop: 10 }}>
                <button className="btn primary" onClick={() => { navigator.clipboard?.writeText(output); showToast("Letter copied — fill in patient details locally"); }}>
                  Copy letter
                </button>
                <button className="btn ghost" onClick={() => { setOutput(""); setForm({ dx: "", service: "", justification: "", prior: "" }); }}>
                  New letter
                </button>
              </div>
              <UsageBar used={3 - uses} max={3} onUpgrade={() => showToast("Upgrade coming in Phase 2!")} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   ROOT — MedScribe
───────────────────────────────────────── */
export default function MedScribe() {
  const [tab, setTab] = useState("prompts");
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  const tabs = [
    { id: "prompts", label: "Prompt builder" },
    { id: "scaffold", label: "Note scaffold", ai: true },
    { id: "ros", label: "ROS / PE" },
    { id: "auth", label: "Prior auth", ai: true },
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="shell">
        <header className="topbar">
          <div className="logo">
            Med<em>Scribe</em>
            <div className="logo-dot" />
          </div>
          <nav className="nav-wrap" aria-label="Tools">
            {tabs.map(t => (
              <button key={t.id} className={`ntab${tab === t.id ? " on" : ""}`} onClick={() => setTab(t.id)}>
                {t.label}
                {t.ai && <span className="ai-pip">AI</span>}
              </button>
            ))}
          </nav>
          <span className="beta-pill">BETA</span>
        </header>

        <main className="page">
          {tab === "prompts" && <PromptBuilder showToast={showToast} />}
          {tab === "scaffold" && <ScaffoldBuilder showToast={showToast} />}
          {tab === "ros" && <ROSBuilder showToast={showToast} />}
          {tab === "auth" && <PriorAuth showToast={showToast} />}
        </main>
      </div>

      {toast && <Toast msg={toast} />}
    </>
  );
}
