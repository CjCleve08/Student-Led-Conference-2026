import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);
const EDIT_STORAGE_KEY = 'student-led-portfolio-edits-v1';

// Class data
const selectedPog = {
  name: 'Class-Based POG Alignment',
  definition:
    'Each class is aligned to the Profile of a Graduate competency that best matches the skills demonstrated in that unit.',
  competencies: [
    'Communication',
    'Perseverance',
    'Responsibility',
    'Critical Thinking',
    'Digital Literacy',
  ],
};

const classes = [
  {
    id: 'speech',
    name: 'Speech',
    artifact: 'Persuasive speech unit portfolio',
    artifactTrail: [
      'Start: topic proposal + first outline',
      'Middle: evidence packet + rehearsal feedback',
      'End: final speech video + reflection',
    ],
    learned:
      'I learned to organize my ideas, adjust delivery, and communicate to a specific audience.',
    pogConnection:
      'This unit demonstrates Communication through speech structure, audience awareness, and revision.',
    pog: 'Communication',
    unit: 'Rhetoric & Argumentation',
    bgImage: '/images/bg_speech.jpg',
    collageImages: ['/images/speech_collage_1.jpg', '/images/speech_collage_2.jpg', '/images/speech_collage_3.jpg'],
    quote: null,
  },
  {
    id: 'forensics',
    name: 'Forensics',
    artifact: 'Crime-scene analysis unit portfolio',
    artifactTrail: [
      'Start: scene sketch + evidence log',
      'Middle: fingerprint and trace analysis notes',
      'End: final case report + defense',
    ],
    learned:
      'I learned how to report technical evidence clearly and defend conclusions with data.',
    pogConnection:
      'This unit demonstrates Critical Thinking through evidence analysis and logical conclusions.',
    pog: 'Critical Thinking',
    unit: 'Criminalistics & Crime-Scene Processing',
    bgImage: '/images/bg_forensics.jpg',
    collageImages: ['/images/forensics_collage_1.jpg', '/images/forensics_collage_2.jpg', '/images/forensics_collage_3.jpg'],
    quote: null,
  },
  {
    id: 'physics',
    name: 'Physics',
    artifact: 'Kinematics lab unit portfolio',
    artifactTrail: [
      'Start: hypothesis + formula planning',
      'Middle: data tables + graph revisions',
      'End: final lab report with CER',
    ],
    learned:
      'I learned to explain data trends and write stronger scientific conclusions.',
    pogConnection:
      'This unit demonstrates Critical Thinking through data analysis, modeling, and justification.',
    pog: 'Critical Thinking',
    unit: 'Kinematics & Motion',
    bgImage: '/images/bg_physics.jpg',
    collageImages: ['/images/physics_collage_1.jpg', '/images/physics_collage_2.jpg', '/images/physics_collage_3.jpg'],
    quote: null,
  },
  {
    id: 'english',
    name: 'English',
    artifact: 'Literary analysis unit portfolio',
    artifactTrail: [
      'Start: annotation set + thesis planning',
      'Middle: paragraph drafts + peer edits',
      'End: final literary analysis essay',
    ],
    learned:
      'I learned to develop stronger claims and support ideas with direct evidence.',
    pogConnection:
      'This unit demonstrates Communication through thesis clarity, textual evidence, and structured writing.',
    pog: 'Communication',
    unit: 'American Literature',
    bgImage: '/images/bg_english.jpg',
    collageImages: ['/images/english_collage_1.jpg', '/images/english_collage_2.jpg', '/images/english_collage_3.jpg'],
    quote: '"The writer\'s job is to tell the truth." — Ernest Hemingway',
  },
  {
    id: 'childdev',
    name: 'Child Development',
    artifact: 'Development observation unit portfolio',
    artifactTrail: [
      'Start: theory notes + observation plan',
      'Middle: journal entries + milestone updates',
      'End: final case summary presentation',
    ],
    learned:
      'I learned to connect theory to behavior and communicate observations professionally.',
    pogConnection:
      'This unit demonstrates Responsibility through consistent reflection, professional communication, and follow-through.',
    pog: 'Responsibility',
    unit: 'Early Childhood Development',
    bgImage: '/images/bg_childdev.jpg',
    collageImages: ['/images/childdev_collage_1.jpg', '/images/childdev_collage_2.jpg', '/images/childdev_collage_3.jpg'],
    quote: null,
  },
  {
    id: 'precalc',
    name: 'Pre-Calculus',
    artifact: 'Functions unit portfolio',
    artifactTrail: [
      'Start: function-family notes + guided practice',
      'Middle: graph drafts + error analysis',
      'End: final transformation explanation project',
    ],
    learned:
      'I learned to explain mathematical reasoning and communicate each step more clearly.',
    pogConnection:
      'This unit demonstrates Perseverance through persistence, practice, and independent problem-solving.',
    pog: 'Perseverance',
    unit: 'Functions & Transformations',
    bgImage: '/images/bg_precalc.jpg',
    collageImages: ['/images/precalc_collage_1.jpg', '/images/precalc_collage_2.jpg', '/images/precalc_collage_3.jpg'],
    quote: null,
  },
  {
    id: 'ushistory',
    name: 'US History',
    artifact: 'DBQ writing unit portfolio',
    artifactTrail: [
      'Start: source analysis organizer',
      'Middle: DBQ outline + evidence matrix',
      'End: final essay + reflection',
    ],
    learned:
      'I learned to compare source perspectives and communicate evidence-backed arguments.',
    pogConnection:
      'This unit demonstrates Critical Thinking through source evaluation and evidence-based historical argument.',
    pog: 'Critical Thinking',
    unit: 'The Constitution & Early Republic',
    bgImage: '/images/bg_ushistory.jpg',
    collageImages: ['/images/ushistory_collage_1.jpg', '/images/ushistory_collage_2.jpg', '/images/ushistory_collage_3.jpg'],
    quote: null,
  },
  {
    id: 'worldag',
    name: 'World Agriculture',
    artifact: 'Sustainability case study portfolio',
    artifactTrail: [
      'Start: research question + source list',
      'Middle: case analysis notes + stakeholder chart',
      'End: final presentation + executive summary',
    ],
    learned:
      'I learned to explain complex systems and present practical recommendations to an audience.',
    pogConnection:
      'This unit demonstrates Digital Literacy through research tools, source evaluation, and data-supported recommendations.',
    pog: 'Digital Literacy',
    unit: 'Sustainable Agriculture & Food Systems',
    bgImage: '/images/bg_worldag.jpg',
    collageImages: ['/images/worldag_collage_1.jpg', '/images/worldag_collage_2.jpg', '/images/worldag_collage_3.jpg'],
    quote: null,
  },
];

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const thankYouRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    const ctx = gsap.context(() => {
      // Hero entrance animation
      const heroTl = gsap.timeline();
      heroTl
        .fromTo('.hero-collage', 
          { opacity: 0, scale: 0.92, y: 18 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power2.out' }
        )
        .fromTo('.hero-bracket', 
          { opacity: 0, scaleX: 0, scaleY: 0 },
          { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo('.hero-text', 
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out' },
          '-=0.4'
        );

      // Lock baseline state so first scroll pass matches later passes.
      gsap.set('.hero-collage', { x: 0, opacity: 1, scale: 1 });
      gsap.set('.hero-bracket', { opacity: 1, scale: 1, scaleX: 1, scaleY: 1 });
      gsap.set('.hero-text', { y: 0, opacity: 1 });

      // Hero scroll exit animation
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.hero-collage', { x: -18 * exitProgress + 'vw', opacity: 1 - exitProgress * 0.75 });
            gsap.set('.hero-bracket', { opacity: 1 - exitProgress * 0.65, scale: 1 - exitProgress * 0.02 });
            gsap.set('.hero-text', { y: 6 * exitProgress + 'vh', opacity: 1 - exitProgress * 0.75 });
          }
        },
        onLeaveBack: () => {
          gsap.set('.hero-collage', { x: 0, opacity: 1 });
          gsap.set('.hero-bracket', { opacity: 1, scale: 1 });
          gsap.set('.hero-text', { y: 0, opacity: 1 });
        }
      });

      // Class sections animations
      sectionRefs.current.forEach((section) => {
        if (!section) return;
        
        const textBlock = section.querySelector('.class-text');
        const collageCard = section.querySelector('.class-collage');
        const brackets = section.querySelectorAll('.frame-bracket');

        gsap.set(textBlock, { x: '-55vw', opacity: 0 });
        gsap.set(collageCard, { x: '55vw', opacity: 0, scale: 0.96 });
        gsap.set(brackets, { opacity: 0, scaleX: 0, scaleY: 0 });

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Entrance (0-30%)
            if (progress <= 0.3) {
              const entranceProgress = progress / 0.3;
              gsap.set(textBlock, { 
                x: -55 * (1 - entranceProgress) + 'vw', 
                opacity: entranceProgress 
              });
              gsap.set(collageCard, { 
                x: 55 * (1 - entranceProgress) + 'vw', 
                opacity: entranceProgress,
                scale: 0.96 + 0.04 * entranceProgress
              });
              gsap.set(brackets, { 
                opacity: entranceProgress,
                scaleX: entranceProgress,
                scaleY: entranceProgress
              });
            }
            // Settle (30-70%)
            else if (progress <= 0.7) {
              gsap.set(textBlock, { x: 0, opacity: 1 });
              gsap.set(collageCard, { x: 0, opacity: 1, scale: 1 });
              gsap.set(brackets, { opacity: 1, scaleX: 1, scaleY: 1 });
            }
            // Exit (70-100%)
            else {
              const exitProgress = (progress - 0.7) / 0.3;
              gsap.set(textBlock, { 
                x: -18 * exitProgress + 'vw', 
                opacity: 1 - exitProgress * 0.75 
              });
              gsap.set(collageCard, { 
                x: 18 * exitProgress + 'vw', 
                opacity: 1 - exitProgress * 0.75 
              });
              gsap.set(brackets, { 
                opacity: 1 - exitProgress * 0.65 
              });
            }
          }
        });
      });

      // Thank You section animation (flowing)
      gsap.fromTo('.thank-you-content',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: thankYouRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.highlight-card',
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.highlight-cards',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Disabled global snap so users can freely read all content.

      // Temporary inline editing support with persistent local save.
      let savedEdits: Record<string, string> = {};
      try {
        savedEdits = JSON.parse(window.localStorage.getItem(EDIT_STORAGE_KEY) ?? '{}') as Record<string, string>;
      } catch {
        savedEdits = {};
      }

      const editableNodes = mainRef.current?.querySelectorAll<HTMLElement>('h1, h2, h3, p, li, span');
      const listeners: Array<{ node: HTMLElement; onInput: () => void }> = [];

      const applyEditMap = (editMap: Record<string, string>) => {
        editableNodes?.forEach((node, idx) => {
          const key = node.getAttribute('data-edit-key') ?? `editable-node-${idx}`;
          node.setAttribute('data-edit-key', key);
          const savedValue = editMap[key];
          if (typeof savedValue === 'string') {
            node.textContent = savedValue;
          }
        });
      };

      editableNodes?.forEach((node) => {
        node.contentEditable = 'true';
        node.setAttribute('data-editable', 'true');
        node.spellcheck = false;

        const key = node.getAttribute('data-edit-key') ?? `editable-node-${listeners.length}`;
        node.setAttribute('data-edit-key', key);

        const savedValue = savedEdits[key];
        if (typeof savedValue === 'string') {
          node.textContent = savedValue;
        }

        const onInput = () => {
          savedEdits[key] = node.textContent ?? '';
          window.localStorage.setItem(EDIT_STORAGE_KEY, JSON.stringify(savedEdits));
        };

        node.addEventListener('input', onInput);
        listeners.push({ node, onInput });
      });

      applyEditMap(savedEdits);

      // If no browser-local edits exist, load your saved edit file for deploy consistency.
      if (Object.keys(savedEdits).length === 0) {
        fetch('/portfolio-text-edits.json')
          .then((res) => (res.ok ? res.json() : null))
          .then((fileEdits) => {
            if (!fileEdits || typeof fileEdits !== 'object') return;
            const normalized = fileEdits as Record<string, string>;
            window.localStorage.setItem(EDIT_STORAGE_KEY, JSON.stringify(normalized));
            savedEdits = normalized;
            applyEditMap(savedEdits);
            ScrollTrigger.refresh();
          })
          .catch(() => {
            // Ignore if file is missing.
          });
      }

      ScrollTrigger.refresh();
      return () => {
        listeners.forEach(({ node, onInput }) => {
          node.removeEventListener('input', onInput);
        });
      };
    }, mainRef);

    window.addEventListener('load', handleLoad);
    if (document.readyState === 'complete') handleLoad();

    return () => {
      window.removeEventListener('load', handleLoad);
      ctx.revert();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const trigger = ScrollTrigger.getAll().find(
        (st) => st.vars.trigger === element && st.vars.pin
      );
      if (trigger) {
        window.scrollTo({ top: trigger.start, behavior: 'smooth' });
        return;
      }
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={mainRef} className="relative bg-[#0B0C10]">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] px-6 py-4 flex justify-between items-center bg-gradient-to-b from-[#0B0C10]/80 to-transparent">
        <div className="font-heading font-bold text-[#F4F6FF] text-lg tracking-wide">
          Caiden Cleveland
        </div>
        <div className="hidden lg:flex gap-6">
          {classes.map((cls) => (
            <button
              key={cls.id}
              onClick={() => scrollToSection(cls.id)}
              className="text-[#A7ACBF] text-sm hover:text-[#F4F6FF] transition-colors duration-200 font-mono uppercase tracking-wider"
            >
              {cls.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="section-pinned z-section-1">
        <div className="bg-image-overlay" style={{ backgroundImage: 'url(/images/hero_collage_1.jpg)' }} />
        
        {/* Frame brackets */}
        <div className="hero-bracket frame-bracket frame-bracket-tl absolute left-[6vw] top-[14vh] w-[18vw] h-[22vh]" />
        <div className="hero-bracket frame-bracket frame-bracket-br absolute right-[6vw] bottom-[14vh] w-[18vw] h-[22vh]" />

        {/* Collage Card */}
        <div className="hero-collage collage-card absolute right-[6vw] top-[50%] -translate-y-1/2 w-[48vw] max-w-[900px] h-[54vh] max-h-[680px] p-3">
          <div className="grid grid-cols-2 grid-rows-2 gap-2.5 h-full">
            <div className="overflow-hidden rounded-lg">
              <img src="/images/hero_collage_1.jpg" alt="Student studying" className="w-full h-full object-cover img-hover" />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img src="/images/hero_collage_2.jpg" alt="Notes and books" className="w-full h-full object-cover img-hover" />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img src="/images/hero_collage_3.jpg" alt="Collaboration" className="w-full h-full object-cover img-hover" />
            </div>
            <div className="flex items-center justify-center p-6 bg-[#14161B]/50 rounded-lg">
              <p className="font-mono text-xs text-[#A7ACBF] uppercase tracking-widest leading-relaxed">
                A collection of work from my academic journey this year
              </p>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="absolute left-[6vw] bottom-[8vh] w-[40vw] max-w-[700px] hero-text">
          <div className="collage-card p-5 md:p-6">
            <h1 className="font-heading font-bold text-[clamp(34px,4.2vw,68px)] text-[#F4F6FF] leading-tight tracking-tight text-shadow mb-3">
              My Learning Journey
            </h1>
            <p className="text-[#A7ACBF] text-[clamp(13px,1.1vw,17px)] leading-relaxed mb-3">
              Introduction: This portfolio highlights what I learned from start to finish in each class unit using artifacts and reflection.
            </p>
            <p className="text-[#A7ACBF] text-[clamp(12px,0.95vw,14px)] leading-relaxed">
              POG Alignment: <span className="text-[#F4F6FF]">Each class uses the competency that best matches that unit&apos;s learning.</span>
            </p>
            <button
              onClick={() => scrollToSection('speech')}
              className="btn-hover mt-4 px-5 py-2.5 bg-[#4F6DF5] text-[#F4F6FF] font-mono text-xs uppercase tracking-wider rounded-lg"
            >
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* Class Sections */}
      {classes.map((cls, index) => (
        <section
          key={cls.id}
          id={cls.id}
          ref={(el) => { sectionRefs.current[index] = el; }}
          className={`section-pinned z-section-${index + 2}`}
        >
          <div className="bg-image-overlay" style={{ backgroundImage: `url(${cls.bgImage})` }} />

          {/* Frame brackets around collage */}
          <div className="frame-bracket frame-bracket-tr absolute right-[5vw] top-[12vh] w-[16vw] h-[18vh]" style={{ transformOrigin: 'top right' }} />
          <div className="frame-bracket frame-bracket-bl absolute left-[38vw] bottom-[12vh] w-[16vw] h-[18vh]" style={{ transformOrigin: 'bottom left' }} />

          {/* Left text block */}
          <div className="class-text absolute left-[6vw] top-1/2 -translate-y-1/2 w-[42vw] pr-1 collage-card p-4">
            <span className="font-mono text-xs text-[#4F6DF5] uppercase tracking-[0.12em] mb-4 block">
              CLASS
            </span>
            <h2 className="font-heading font-bold text-[clamp(28px,3vw,44px)] text-[#F4F6FF] leading-tight tracking-tight mb-4 text-shadow">
              {cls.name}
            </h2>
            <div className="space-y-2">
              <div>
                <span className="font-mono text-xs text-[#A7ACBF] uppercase tracking-[0.12em] block mb-1">
                  Artifact
                </span>
                <p className="text-[#F4F6FF] text-[clamp(12px,0.95vw,14px)] leading-relaxed">
                  {cls.artifact}
                </p>
              </div>
              <div>
                <span className="font-mono text-xs text-[#A7ACBF] uppercase tracking-[0.12em] block mb-1">
                  Unit Artifact Progress
                </span>
                <ul className="text-[#F4F6FF] text-[clamp(11px,0.88vw,13px)] leading-relaxed list-disc pl-5 space-y-0.5">
                  {cls.artifactTrail.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-mono text-xs text-[#A7ACBF] uppercase tracking-[0.12em] block mb-1">
                  POG
                </span>
                <p className="text-[#F4F6FF] text-[clamp(12px,0.95vw,14px)] leading-relaxed">
                  {cls.pog}
                </p>
              </div>
              <div>
                <span className="font-mono text-xs text-[#A7ACBF] uppercase tracking-[0.12em] block mb-1">
                  POG Connection
                </span>
                <p className="text-[#F4F6FF] text-[clamp(12px,0.95vw,14px)] leading-relaxed">
                  {cls.pogConnection}
                </p>
              </div>
              <div>
                <span className="font-mono text-xs text-[#A7ACBF] uppercase tracking-[0.12em] block mb-1">
                  Unit
                </span>
                <p className="text-[#F4F6FF] text-[clamp(12px,0.95vw,14px)] leading-relaxed">
                  {cls.unit}
                </p>
              </div>
              <div>
                <span className="font-mono text-xs text-[#A7ACBF] uppercase tracking-[0.12em] block mb-1">
                  What I Learned
                </span>
                <p className="text-[#F4F6FF] text-[clamp(12px,0.95vw,14px)] leading-relaxed">
                  {cls.learned}
                </p>
              </div>
            </div>
          </div>

          {/* Right collage card */}
          <div className="class-collage collage-card absolute right-[6vw] top-[50%] -translate-y-1/2 w-[44vw] h-[56vh] p-3">
            {cls.quote ? (
              <div className="grid grid-cols-2 grid-rows-2 gap-2.5 h-full">
                <div className="overflow-hidden rounded-lg">
                  <img src={cls.collageImages[0]} alt={`${cls.name} 1`} className="w-full h-full object-cover img-hover" />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <img src={cls.collageImages[1]} alt={`${cls.name} 2`} className="w-full h-full object-cover img-hover" />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <img src={cls.collageImages[2]} alt={`${cls.name} 3`} className="w-full h-full object-cover img-hover" />
                </div>
                <div className="flex items-center justify-center p-6 bg-[#14161B]/70 rounded-lg">
                  <p className="font-heading text-[#F4F6FF] text-sm italic leading-relaxed text-center">
                    {cls.quote}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-[1.2fr_1fr] grid-rows-2 gap-2.5 h-full">
                <div className="row-span-2 overflow-hidden rounded-lg">
                  <img src={cls.collageImages[0]} alt={`${cls.name} 1`} className="w-full h-full object-cover img-hover" />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <img src={cls.collageImages[1]} alt={`${cls.name} 2`} className="w-full h-full object-cover img-hover" />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <img src={cls.collageImages[2]} alt={`${cls.name} 3`} className="w-full h-full object-cover img-hover" />
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Thank You Section */}
      <section 
        id="thank-you" 
        ref={thankYouRef}
        className="relative min-h-screen bg-[#14161B] py-20 px-[6vw] z-section-10"
      >
        <div className="thank-you-content max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="font-heading font-bold text-[clamp(34px,3.6vw,56px)] text-[#F4F6FF] leading-tight tracking-tight">
                Conclusion and Graduation Evidence
              </h2>
            </div>
            <div className="flex items-center">
              <p className="text-[#A7ACBF] text-[clamp(14px,1.2vw,18px)] leading-relaxed">
                This section includes class-based POG alignment, test results, unit-of-study details, behavior reflection, and SMART goals for a golf-related career path.
              </p>
            </div>
          </div>

          {/* POG competency definition cards */}
          <div className="highlight-cards grid md:grid-cols-3 gap-6 mb-16">
            <div className="highlight-card collage-card p-6">
              <span className="font-mono text-xs text-[#4F6DF5] uppercase tracking-[0.12em] block mb-3">
                POG Competency
              </span>
              <p className="text-[#F4F6FF] text-sm leading-relaxed">
                {selectedPog.name}
              </p>
            </div>
            <div className="highlight-card collage-card p-6">
              <span className="font-mono text-xs text-[#4F6DF5] uppercase tracking-[0.12em] block mb-3">
                Definition
              </span>
              <p className="text-[#F4F6FF] text-sm leading-relaxed">
                {selectedPog.definition}
              </p>
            </div>
            <div className="highlight-card collage-card p-6">
              <span className="font-mono text-xs text-[#4F6DF5] uppercase tracking-[0.12em] block mb-3">
                Competency Focus
              </span>
              <ul className="text-[#F4F6FF] text-sm leading-relaxed list-disc pl-5 space-y-1">
                {selectedPog.competencies.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Added sections for easy picture drop-in */}
          <div className="grid lg:grid-cols-2 gap-6 mb-16">
            <div className="collage-card p-6">
              <span className="font-mono text-xs text-[#4F6DF5] uppercase tracking-[0.12em] block mb-3">
                Test Results Section
              </span>
              <p className="text-[#A7ACBF] text-sm leading-relaxed mb-4">
                Add your PRE ACT, ACT, ASVAB, and ND A+ reading/math results here with short notes on what each score shows.
              </p>
              <div className="border border-dashed border-[#4F6DF5]/60 rounded-lg p-6 text-center bg-[#0F1116]">
                <p className="text-[#A7ACBF] text-xs uppercase tracking-wider">Picture Placeholder: Test Results</p>
              </div>
            </div>
            <div className="collage-card p-6">
              <span className="font-mono text-xs text-[#4F6DF5] uppercase tracking-[0.12em] block mb-3">
                Unit of Study Section (Single Class Focus)
              </span>
              <p className="text-[#A7ACBF] text-sm leading-relaxed mb-3">
                Class: Pre-Calculus
              </p>
              <p className="text-[#A7ACBF] text-sm leading-relaxed mb-3">
                Unit: Conic Sections (circles, parabolas, ellipses, and hyperbolas)
              </p>
              <ul className="text-[#A7ACBF] text-sm leading-relaxed list-disc pl-5 space-y-2 mb-3">
                <li>Start: I could recognize conic shapes, but I mixed up the equations and what each value meant.</li>
                <li>Middle: I practiced rewriting equations into standard form and graphing by using center, vertices, and foci.</li>
                <li>End: I can now identify the conic quickly, graph it correctly, and explain each part in context.</li>
              </ul>
              <p className="text-[#A7ACBF] text-sm leading-relaxed">
                What I learned: This unit helped me break down harder math problems step by step and explain my reasoning clearly, not just give an answer.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-16">
            <div className="collage-card p-6">
              <span className="font-mono text-xs text-[#4F6DF5] uppercase tracking-[0.12em] block mb-3">
                Graduation Requirements Section
              </span>
              <ul className="text-[#A7ACBF] text-sm leading-relaxed list-disc pl-5 space-y-2 mb-4">
                <li>Graduation requirement sheet</li>
                <li>Transcript and required credits</li>
                <li>Scholarship requirement checklist</li>
                <li>Completed application evidence</li>
              </ul>
              <div className="border border-dashed border-[#4F6DF5]/60 rounded-lg p-6 text-center bg-[#0F1116]">
                <p className="text-[#A7ACBF] text-xs uppercase tracking-wider">Picture Placeholder: Requirements Docs</p>
              </div>
            </div>
            <div className="collage-card p-6">
              <span className="font-mono text-xs text-[#4F6DF5] uppercase tracking-[0.12em] block mb-3">
                Behavior Section
              </span>
              <p className="text-[#A7ACBF] text-sm leading-relaxed mb-2">
                At the start of the year I was doing things kind of last minute, and that made school more stressful than it needed to be.
              </p>
              <p className="text-[#A7ACBF] text-sm leading-relaxed mb-4">
                As the year went on, I got better at turning stuff in on time, asking questions when I was confused, and actually using feedback instead of ignoring it. In my practice session with my assigned teacher, I fixed my pacing and explained my artifacts way clearer, which made my presentation feel more confident.
              </p>
              <p className="text-[#A7ACBF] text-sm leading-relaxed">
                Biggest behavior growth: being more consistent, more respectful with communication, and more responsible with my work.
              </p>
            </div>
          </div>

          <div className="collage-card p-6 mb-16">
            <span className="font-mono text-xs text-[#4F6DF5] uppercase tracking-[0.12em] block mb-3">
              SMART Goals: Golf Career Path
            </span>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-[#F4F6FF] text-sm mb-1">Specific</p>
                <p className="text-[#A7ACBF] text-sm">Apply for jobs around golf (pro shop, range staff, clubhouse support).</p>
              </div>
              <div>
                <p className="text-[#F4F6FF] text-sm mb-1">Measurable</p>
                <p className="text-[#A7ACBF] text-sm">Submit at least 5 applications and complete at least 2 interviews.</p>
              </div>
              <div>
                <p className="text-[#F4F6FF] text-sm mb-1">Achievable</p>
                <p className="text-[#A7ACBF] text-sm">Use my resume, cover letter, and teacher feedback to improve applications.</p>
              </div>
              <div>
                <p className="text-[#F4F6FF] text-sm mb-1">Relevant and Time-Bound</p>
                <p className="text-[#A7ACBF] text-sm">Complete this plan by the end of summer with biweekly progress checks.</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center pb-8">
            <p className="font-mono text-sm text-[#A7ACBF] mb-4">
              Final conclusion: my class artifacts show start-to-finish growth and demonstrate Wilton&apos;s Profile of a Graduate through class-specific competencies.
            </p>
            <button className="btn-hover px-6 py-3 bg-[#4F6DF5] text-[#F4F6FF] font-mono text-sm uppercase tracking-wider rounded-lg">
              Presentation Ready
            </button>
          </div>

          {/* Footer */}
          <div className="border-t border-[#2A2D35] pt-8 text-center">
            <p className="font-mono text-xs text-[#A7ACBF]">
              © 2026 Student Name
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
