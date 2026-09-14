import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart2,
  Check,
  ChevronDown,
  Clock3,
  HelpCircle,
  ListOrdered,
  MessageCircle,
  ShieldAlert,
  ShieldCheck,
  Target,
  Users,
  Volume2,
  VolumeX,
  Wrench,
  X,
  Zap
} from 'lucide-react';
import { useLessonAudio } from '../../shared/useLessonAudio';
import './styles.css';

import hookArt from './assets/illustrations/hook-intervention-options.png';
import hookModalArt from './assets/illustrations/modal-intervention-discipline.png';
import examArt from './assets/illustrations/exam-faucet-checked.png';
import examModalArt from './assets/illustrations/modal-exam.png';

// Section 1: 6 Ladder Rungs with custom illustrations
import rung1Art from './assets/illustrations/rung-remove-directly.png';
import rung2Art from './assets/illustrations/rung-negotiate-coordinate.png';
import rung3Art from './assets/illustrations/rung-workaround.png';
import rung4Art from './assets/illustrations/rung-swarm.png';
import rung5Art from './assets/illustrations/rung-escalate.png';
import rung6Art from './assets/illustrations/rung-accept-monitor.png';

// Section 2: 6 Reassessment Steps with custom illustrations
import step1Art from './assets/illustrations/step-visualize-impediments.png';
import step2Art from './assets/illustrations/step-regular-checkins.png';
import step3Art from './assets/illustrations/step-monitor-backlog.png';
import step4Art from './assets/illustrations/step-shield-team.png';
import step5Art from './assets/illustrations/step-track-flow.png';
import step6Art from './assets/illustrations/step-keep-asking-questions.png';

const tabs = [
  'The leaky faucet',
  'The intervention ladder',
  'Reassess continually',
  'Exam lens'
];

const ladderRungs = [
  {
    title: '1. Remove Directly',
    tag: 'Tier 1 · Lowest Cost (Default)',
    text: 'Clear it yourself or guide the team to clear it — the cheapest, fastest option, and the default first look.',
    icon: Wrench,
    image: rung1Art
  },
  {
    title: '2. Negotiate or Coordinate',
    tag: 'Tier 2 · Peer Coordination',
    text: 'Resolve a dependency with another team, trade resources, resequence shared work — costs time and goodwill, but keeps the problem at peer level.',
    icon: Users,
    image: rung2Art
  },
  {
    title: '3. Workaround',
    tag: 'Tier 3 · Iron Rule (Document & Re-date)',
    text: 'A temporary fix that lets work resume while the root cause gets resolved. Iron rule: a workaround must be documented, the issue kept open, and re-dated to a permanent fix. Undocumented workarounds become technical debt.',
    icon: ShieldAlert,
    image: rung3Art
  },
  {
    title: '4. Swarm',
    tag: 'Tier 4 · Concentrated Capacity',
    text: 'Concentrate multiple people on the blocker to break it open — expensive in redirected capacity, but worth it when the critical path is stopped.',
    icon: Zap,
    image: rung4Art
  },
  {
    title: '5. Escalate',
    tag: 'Tier 5 · Authority Boundary',
    text: 'Beyond your authority or influence — handled with its own dedicated craft elsewhere in this course.',
    icon: AlertTriangle,
    image: rung5Art
  },
  {
    title: '6. Accept and Monitor',
    tag: 'Tier 6 · Explicit Decision',
    text: 'The cost of removal exceeds the cost of living with it — a legitimate, explicit decision with a review date, which is the opposite of ignoring.',
    icon: Clock3,
    image: rung6Art
  }
];

const reassessSteps = [
  {
    title: '1. Visualize Impediments',
    tag: 'Shared Team Ownership',
    text: 'Make issues visible — task boards, graphs, information radiators, big visible charts showing what’s slowing the team down. Visibility creates shared ownership and may even invite help from stakeholders.',
    icon: BarChart2,
    image: step1Art
  },
  {
    title: '2. Regular Check-Ins',
    tag: 'Routine Reassessment',
    text: 'Build reassessment into the routine — daily stand-ups, retrospectives, review meetings. Ask powerful, open-ended questions like "if you had a magic wand, what would you change to help us move faster?" or "where do we need the most help?"',
    icon: MessageCircle,
    image: step2Art
  },
  {
    title: '3. Monitor Impediment Backlog',
    tag: 'Dedicated Tracking',
    text: 'Just like tasks live in a backlog, impediments should have one too. Reviewing it regularly ensures issues aren’t forgotten and that critical blockers get priority.',
    icon: ListOrdered,
    image: step3Art
  },
  {
    title: '4. Shield the Team',
    tag: 'Noise Reduction',
    text: 'Sometimes the biggest blockers aren’t technical — they’re constant interruptions. Act as a shield: be the single point of contact for external requests, manage competing priorities, reduce noise.',
    icon: ShieldCheck,
    image: step4Art
  },
  {
    title: '5. Track Performance and Flow',
    tag: 'Theory of Constraints',
    text: 'Use value stream mapping or flow metrics — the ratio of value-adding to non-value-adding activities, task age to see if work is stalling. Remember the Theory of Constraints: remove one bottleneck, and another will surface. Continuous reassessment keeps flow steady.',
    icon: Activity,
    image: step5Art
  },
  {
    title: '6. Keep Asking Questions',
    tag: 'Continuous Inquiry',
    text: 'Never assume the absence of complaints means the absence of problems. Ask "what’s slowing us down?" and "how can we improve?" — this mindset fosters continuous improvement and prevents small issues from snowballing.',
    icon: HelpCircle,
    image: step6Art
  }
];

const reveals = {
  hook: {
    image: hookModalArt,
    title: 'Choosing the right response at the right cost, then checking back later.',
    text: 'This lesson combines two enablers: determining and applying an intervention strategy to remove or minimize impediments, and reassessing continually to make sure impediments, obstacles, and blockers actually stay addressed. Choosing the right response, at the right cost, and then checking back on it later — that’s the whole discipline.'
  },
  exam: {
    image: examModalArt,
    title: 'The cheapest rung that clears the blocker, and checking back continuously.',
    text: 'The intervention ladder runs from cheap to heavy: remove directly, negotiate or coordinate, workaround (documented, kept open, re-dated), swarm, escalate, or accept and monitor explicitly. The selection rule is the cheapest rung that actually clears the blocker — never dignity, never heroism. And impediments don’t stay fixed on their own: visualize them, build reassessment into routine check-ins, monitor the impediment backlog, shield the team from distractions, track flow against the Theory of Constraints, and keep asking whether anything is quietly slowing things down — because silence is never proof that nothing’s wrong.',
    bullets: [
      'Six rungs, cheapest to heaviest: remove directly, negotiate/coordinate, workaround, swarm, escalate, accept and monitor',
      'Selection rule: the cheapest rung that actually clears the blocker',
      'A workaround must stay documented and open, re-dated to a permanent fix — never allowed to quietly become permanent',
      'Reassessment never stops: visualize, regular check-ins, monitor the impediment backlog, shield the team, track flow (Theory of Constraints), and keep asking questions — absence of complaints is not absence of problems'
    ]
  }
};

const quizzes = {
  ladder: {
    question:
      'Scenario: A team hits a blocker and applies a quick workaround so work can resume immediately. Six months later, the workaround is still in place, was never documented as an open issue, and nobody remembers there was ever supposed to be a permanent fix. What does this scenario illustrate?',
    answers: [
      'A successful application of the "remove directly" rung, since the blocker stopped affecting the team’s work',
      'A violation of the workaround’s iron rule — it should have been documented with the issue kept open and re-dated to a permanent fix, not allowed to quietly become permanent',
      'Correct use of "accept and monitor," since the team is living with the situation long-term',
      'An appropriate use of escalation, since the issue has now existed for six months'
    ],
    correct: 1,
    good: 'Correct! This is exactly the failure the iron rule exists to prevent — a workaround is supposed to stay documented and open, re-dated toward a real fix, not fade into permanence unnoticed. An undocumented workaround that becomes permanent is exactly how technical debt and audit findings are born.',
    bad: 'Reconsider — this wasn’t a genuine fix (remove directly), it wasn’t an explicit, reviewed decision (accept and monitor), and simply persisting for six months isn’t itself an escalation. The core problem is a workaround that was never documented or kept open.'
  },
  reassess: {
    question:
      'Scenario: A project manager clears a significant bottleneck in the team’s workflow. Throughput improves immediately, and the team goes several weeks without raising any new complaints, so the project manager assumes everything is now running smoothly and stops actively monitoring flow. What does this scenario overlook?',
    answers: [
      'The Theory of Constraints, which suggests that removing one bottleneck typically causes another to surface — and the absence of complaints doesn’t mean the absence of problems',
      'Nothing — an absence of complaints for several weeks is a reliable sign the team has no remaining impediments',
      'The workaround iron rule, since the original bottleneck fix was never documented',
      'The need to shield the team from distractions, which is unrelated to this scenario'
    ],
    correct: 0,
    good: 'Correct! The Theory of Constraints predicts that removing one bottleneck typically reveals another one — and this lesson explicitly warns against assuming silence means everything is fine. Reassessment has to stay active, not pause the moment things look quiet.',
    bad: 'Reconsider — an absence of complaints is exactly the false signal this lesson warns against; this isn’t a workaround-documentation issue, since removing a bottleneck directly isn’t a workaround; and shielding the team from distractions isn’t what’s being tested here.'
  }
};

function Modal({ data, onClose, onDone }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <motion.section
        className="focus-modal"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-x" onClick={onClose} aria-label="Close">
          <X />
        </button>
        {step === 0 ? (
          <>
            <img className="modal-illustration" src={data.image} alt="" />
            <h3>{data.title}</h3>
            <div className="modal-copy">
              <p>{data.text}</p>
            </div>
          </>
        ) : (
          <div className="memory-step">
            <p className="eyebrow">EXAM-RELEVANT ENABLERS TO REMEMBER</p>
            <h3>Cheapest rung to clear, and continual reassessment.</h3>
            <ul>
              {data.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {data.bullets && step === 0 ? (
          <button className="modal-action" onClick={() => setStep(1)}>
            Next <ArrowRight />
          </button>
        ) : (
          <button className="modal-action" onClick={onDone}>
            Mark as read <Check />
          </button>
        )}
      </motion.section>
    </div>,
    document.body
  );
}

function Quiz({ data, onFinish }) {
  const [picked, setPicked] = useState(null);

  return createPortal(
    <div className="knowledge-backdrop">
      <section className="knowledge-modal">
        <p className="quiz-label">
          <Target /> MICRO KNOWLEDGE CHECK
        </p>
        <h3>{data.question}</h3>
        <div className="answers">
          {data.answers.map((answer, i) => (
            <button
              key={answer}
              className={picked === i ? (i === data.correct ? 'correct' : 'wrong') : ''}
              onClick={() => setPicked(i)}
            >
              <span>{String.fromCharCode(65 + i)}</span>
              {answer}
            </button>
          ))}
        </div>
        {picked !== null && (
          <>
            <p className={`feedback ${picked === data.correct ? 'good' : 'bad'}`}>
              {picked === data.correct ? data.good : data.bad}
            </p>
            <button className="finish-check" onClick={onFinish}>
              Finish check <ArrowRight />
            </button>
          </>
        )}
      </section>
    </div>,
    document.body
  );
}

function CardGridPage({
  eyebrow,
  title,
  lead,
  items,
  read,
  setRead,
  selectionNote,
  after,
  typeLabel = 'ITEM'
}) {
  const [activeModal, setActiveModal] = useState(null);

  const openCard = (index) => {
    setActiveModal(index);
    setRead((prev) => prev.map((v, j) => (j === index ? true : v)));
  };

  return (
    <div className="wide-page">
      <div className="header-clean">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="lead">{lead}</p>
      </div>

      <div className="card-grid three">
        {items.map((item, i) => {
          const Icon = item.icon;
          const isRead = read[i];
          return (
            <button
              key={item.title}
              className={`click-card ${isRead ? 'read' : ''}`}
              onClick={() => openCard(i)}
            >
              <span className="card-icon">
                <Icon size={28} />
              </span>
              <strong>{item.title}</strong>
              {isRead ? (
                <Check className="card-arrow check" size={20} />
              ) : (
                <ArrowRight className="card-arrow" size={20} />
              )}
            </button>
          );
        })}
      </div>

      {selectionNote && (
        <div className="selection-rule-banner">
          <strong>Selection Rule:</strong> {selectionNote}
        </div>
      )}

      {activeModal !== null && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <section
            className="focus-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-x"
              onClick={() => setActiveModal(null)}
              aria-label="Close"
            >
              <X />
            </button>
            <img
              className="modal-illustration"
              src={items[activeModal].image}
              alt={items[activeModal].title}
            />
            <h3>{items[activeModal].title}</h3>
            <div className="modal-copy">
              <p style={{ fontSize: '16px', lineHeight: 1.68 }}>
                {items[activeModal].text}
              </p>
            </div>
            <button
              className="modal-action"
              onClick={() => setActiveModal(null)}
            >
              Mark as read <Check />
            </button>
          </section>
        </div>
      )}

      {read.every(Boolean) && after}
    </div>
  );
}

function App() {
  const [page, setPage] = useState(0);
  const [done, setDone] = useState(Array(4).fill(false));
  const [modal, setModal] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [sound, setSound] = useState(true);

  const [ladderRead, setLadderRead] = useState(Array(6).fill(false));
  const [reassessRead, setReassessRead] = useState(Array(6).fill(false));

  useLessonAudio(sound);

  const mark = (i) =>
    setDone((values) => values.map((value, index) => (index === i ? true : value)));

  const go = (i) => {
    if (i >= 0 && i < 4 && (i <= page + 1 || done[i - 1])) {
      setPage(i);
    }
  };

  const finishModal = () => {
    mark(page);
    setModal(null);
  };

  const finishQuiz = () => {
    mark(page);
    setQuiz(null);
  };

  let content;

  if (page === 0) {
    content = (
      <div className="hero-layout">
        <div>
          <p className="eyebrow">LESSON 6.3.2 · INTERVENE AND REASSESS</p>
          <h1>
            A leaky faucet gives you options. <span>In order of cost.</span>
          </h1>
          <p className="lead">
            A leaky faucet gives you options, in order of cost: tighten it yourself, call the
            building’s maintenance service, jam a bucket under it and live with the drip, or just
            replace the whole fixture. And even once it’s fixed, a smart homeowner checks back on
            it — because leaks have a way of coming back.
          </p>
          <button
            className="primary-cta"
            disabled={done[0]}
            onClick={() => setModal('hook')}
          >
            {done[0] ? 'Intervention principle reviewed' : 'Reveal the intervention discipline'}{' '}
            <ArrowRight />
          </button>
        </div>
        <img className="lesson-art" src={hookArt} alt="" />
      </div>
    );
  }

  if (page === 1) {
    content = (
      <CardGridPage
        eyebrow="THE INTERVENTION LADDER"
        title="Choosing the strategy is the skill. The menu runs from cheap to heavy."
        lead="Choosing the strategy IS the skill, and the menu runs from cheap to heavy. Click each rung to explore."
        items={ladderRungs}
        read={ladderRead}
        setRead={setLadderRead}
        typeLabel="STRATEGY"
        selectionNote="The cheapest rung that actually clears the blocker. Dignity is not a selection criterion, and neither is heroism."
        after={
          <button
            className="knowledge-cta centered"
            disabled={done[1]}
            onClick={() => !done[1] && setQuiz('ladder')}
          >
            {done[1] ? (
              <><Check /> Knowledge check completed</>
            ) : (
              <><Target /> Start knowledge check <ArrowRight /></>
            )}
          </button>
        }
      />
    );
  }

  if (page === 2) {
    content = (
      <CardGridPage
        eyebrow="REASSESS CONTINUALLY: SIX STEPS"
        title="Impediments do not disappear forever. They can grow back."
        lead="Impediments don’t disappear forever the moment you fix them. Like weeds in a garden, they can grow back — or new ones can pop up in unexpected places. Click each step to explore."
        items={reassessSteps}
        read={reassessRead}
        setRead={setReassessRead}
        typeLabel="STEP"
        after={
          <button
            className="knowledge-cta centered"
            disabled={done[2]}
            onClick={() => !done[2] && setQuiz('reassess')}
          >
            {done[2] ? (
              <><Check /> Knowledge check completed</>
            ) : (
              <><Target /> Start knowledge check <ArrowRight /></>
            )}
          </button>
        }
      />
    );
  }

  if (page === 3) {
    content = (
      <div className="exam-layout">
        <div className="exam-visual">
          <img src={examArt} alt="" />
        </div>
        <div>
          <p className="eyebrow">SYNTHESIS (EXAM LENS)</p>
          <h2>Back to that leaky faucet one more time —</h2>
          <p className="lead">
            because fixing it once was never the end of the story. Checking back on it was always part of the job.
          </p>
          <button
            className="primary-cta"
            disabled={done[3]}
            onClick={() => setModal('exam')}
          >
            {done[3] ? 'Exam lens reviewed' : 'Reveal the exam lens'} <ArrowRight />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="course-select">
          <Award />
          <span>PMP Project Management Professional</span>
          <ChevronDown />
        </button>
        <div className="module-progress">
          <div>
            {Array.from({ length: 10 }, (_, i) => (
              <span
                className={`progress-dot ${i < 5 ? 'done' : i === 5 ? 'active' : ''}`}
                key={i}
              >
                {i < 5 ? <Check size={10} /> : <span />}
              </span>
            ))}
          </div>
        </div>
        <div className="top-actions">
          <button className="ghost-button" onClick={() => setSound((v) => !v)}>
            {sound ? <Volume2 /> : <VolumeX />}
            <span>{sound ? 'Sound on' : 'Sound off'}</span>
          </button>
          <button className="ghost-button">
            <X />
            <span>Quit</span>
          </button>
        </div>
      </header>
      <main className="workspace">
        <section className="lesson-stage">
          <article className="lesson-card">
            <div className="section-tabs">
              <p>SECTION {page + 1} OF 4</p>
              <div>
                {tabs.map((tab, i) => (
                  <button
                    key={tab}
                    className={`${done[i] ? 'done' : ''} ${page === i ? 'active' : ''}`}
                    onClick={() => go(i)}
                  >
                    {done[i] && <Check />}
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="lesson-content">{content}</div>
            {done[page] && (
              <p className="completion">
                <Check /> Interaction complete — continue when ready.
              </p>
            )}
            <footer className="nav-footer">
              <button
                className="secondary-button"
                disabled={!page}
                onClick={() => go(page - 1)}
              >
                <ArrowLeft /> Previous
              </button>
              <button
                className={`primary-button ${done[page] ? 'unlocked' : ''}`}
                disabled={!done[page]}
                onClick={() => page < 3 && go(page + 1)}
              >
                {page === 3 ? 'Continue to next lesson' : 'Continue'} <ArrowRight />
              </button>
            </footer>
          </article>
        </section>
      </main>
      {modal && (
        <Modal data={reveals[modal]} onClose={() => setModal(null)} onDone={finishModal} />
      )}
      {quiz && <Quiz data={quizzes[quiz]} onFinish={finishQuiz} />}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
