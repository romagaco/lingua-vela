/**
 * LinguaVela — Real-World Error Detective & Tone/Register Sorter Data
 * (js/practice-realworld-data.js)
 *
 * Covers all 7 Crew Ranks (a0 Pre-A1 -> c2 Mastery) with:
 *   - detectiveCases: 3 inline Click-to-Fix proofreading messages per rank (21 total)
 *   - registerBoard: 6 realistic phrases to drag-and-drop into Casual / Workplace / Formal zones (7 boards)
 */

window.LINGUAVELA_REALWORLD_DATA = {
  /* ==========================================================================
     LEVEL 1: PRE-A1 (a0 — Terrícola / Landlubber)
     ========================================================================== */
  a0: {
    detectiveCases: [
      {
        channel: "💬 Welcome Text Message",
        sender: "Diego · 9:14 AM",
        segments: [
          { text: "Hello!" },
          { text: "My name" },
          { text: "are", isError: true },
          { text: "Diego," },
          { text: "and I am from" },
          { text: "Guatemala." },
        ],
        fixes: ["is", "am", "be"],
        correctFix: "is",
        feedback: {
          spanglish: "¡Correct! «My name» es singular, así que decimos «My name is Diego.»",
          en: "Correct! 'My name' is singular, so we say 'My name is Diego.'",
        },
      },
      {
        channel: "☕ Coffee Order Note",
        sender: "Counter Ticket",
        segments: [
          { text: "Good morning!" },
          { text: "Can I have" },
          { text: "a apple", isError: true },
          { text: "and a hot tea," },
          { text: "please?" },
        ],
        fixes: ["an apple", "two apple", "the apples"],
        correctFix: "an apple",
        feedback: {
          spanglish: "¡Very good! Antes de sonido vocal («apple») siempre usamos «an».",
          en: "Well done! Before a vowel sound ('apple'), we always use 'an'.",
        },
      },
      {
        channel: "🏫 Class Introduction",
        sender: "Student Profile",
        segments: [
          { text: "Hi everyone!" },
          { text: "I have", isError: true },
          { text: "twenty-five years old," },
          { text: "and I live in" },
          { text: "Boston." },
        ],
        fixes: ["I am", "I are", "I is"],
        correctFix: "I am",
        feedback: {
          spanglish: "¡Exact! En inglés la edad siempre usa «to be»: «I am 25 years old» (no «I have»).",
          en: "Exact! In English, age always uses 'to be': 'I am 25 years old.'",
        },
      },
    ],
    registerBoard: {
      scenario: {
        spanglish: "Escenario: Saludar y pedir ayuda básica (arrastra cada frase a su zona de tono).",
        en: "Scenario: Greeting someone and asking for basic help.",
      },
      items: [
        { id: "r1", text: "Hey! What's up?", zone: "casual" },
        { id: "r2", text: "Thanks a ton!", zone: "casual" },
        { id: "r3", text: "Hi Maya, can you help me for a minute?", zone: "workplace" },
        { id: "r4", text: "Thanks so much for your help today!", zone: "workplace" },
        { id: "r5", text: "Good morning, Ms. Clark. Excuse me, could you assist me?", zone: "formal" },
        { id: "r6", text: "Thank you very much for your assistance.", zone: "formal" },
      ],
      feedback: {
        spanglish: "¡Excellent! Ya distingues cuándo saludar casual a un friend y cuándo usar cortesía formal.",
        en: "Excellent! You can already tell apart casual friend greetings from workplace and formal politeness.",
      },
    },
  },

  /* ==========================================================================
     LEVEL 2: A1 (a1 — Grumete / Cabin Mate)
     ========================================================================== */
  a1: {
    detectiveCases: [
      {
        channel: "📱 Daily Routine Chat",
        sender: "Camila · 7:45 AM",
        segments: [
          { text: "My sister" },
          { text: "work", isError: true },
          { text: "at a hospital" },
          { text: "near downtown" },
          { text: "every morning." },
        ],
        fixes: ["works", "working", "is work"],
        correctFix: "works",
        feedback: {
          spanglish: "Correct! Con tercera persona singular («My sister» = she) agregamos «-s»: «works».",
          en: "Correct! Third-person singular ('My sister' = she) takes '-s': 'works'.",
        },
      },
      {
        channel: "🏠 Roommate Note",
        sender: "Fridge Sticky Note",
        segments: [
          { text: "Hey Leo!" },
          { text: "There is", isError: true },
          { text: "three cold bottles" },
          { text: "of water" },
          { text: "in the fridge." },
        ],
        fixes: ["There are", "They is", "There have"],
        correctFix: "There are",
        feedback: {
          spanglish: "Well done! Para objetos en plural («three cold bottles») usamos «There are».",
          en: "Well done! For plural nouns ('three cold bottles'), we use 'There are'.",
        },
      },
      {
        channel: "📅 Appointment Reminder",
        sender: "Clinic SMS",
        segments: [
          { text: "Your dentist appointment" },
          { text: "is on Tuesday" },
          { text: "in 9:30 a.m.", isError: true },
          { text: "Please arrive" },
          { text: "ten minutes early." },
        ],
        fixes: ["at 9:30 a.m.", "on 9:30 a.m.", "for 9:30 a.m."],
        correctFix: "at 9:30 a.m.",
        feedback: {
          spanglish: "Spot on! Horas exactas siempre usan la preposición «at» («at 9:30 a.m.»).",
          en: "Spot on! Exact clock times always take 'at' ('at 9:30 a.m.').",
        },
      },
    ],
    registerBoard: {
      scenario: {
        spanglish: "Scenario: Pedir comida o bebidas según el lugar (arrastra cada frase a Casual, Workplace o Formal).",
        en: "Scenario: Ordering food or coffee across different social settings.",
      },
      items: [
        { id: "r1", text: "Yo, grab me a coffee too!", zone: "casual" },
        { id: "r2", text: "Let's grab a quick bite!", zone: "casual" },
        { id: "r3", text: "Hi! Could I get a medium latte, please?", zone: "workplace" },
        { id: "r4", text: "Would you like to join us for lunch at noon?", zone: "workplace" },
        { id: "r5", text: "Good evening. I would like the grilled salmon, please.", zone: "formal" },
        { id: "r6", text: "May I have the check whenever you have a moment?", zone: "formal" },
      ],
      feedback: {
        spanglish: "Awesome! Clasificaste perfectamente el tono casual, el de oficina y el formal de restaurante.",
        en: "Awesome! You accurately separated casual, workplace, and formal restaurant registers.",
      },
    },
  },

  /* ==========================================================================
     LEVEL 3: A2 (a2 — Marinero de Cubierta / Deckhand)
     ========================================================================== */
  a2: {
    detectiveCases: [
      {
        channel: "✈️ Travel Recap Text",
        sender: "Daniel · Yesterday",
        segments: [
          { text: "We arrived in Portland" },
          { text: "at noon and" },
          { text: "buyed", isError: true },
          { text: "two bike passes" },
          { text: "near the river." },
        ],
        fixes: ["bought", "buy", "buying"],
        correctFix: "bought",
        feedback: {
          spanglish: "Correct! El Past Simple irregular de «buy» es «bought» (nunca «buyed»).",
          en: "Correct! The irregular Past Simple of 'buy' is 'bought' (never 'buyed').",
        },
      },
      {
        channel: "🛍️ Online Support Chat",
        sender: "Customer Inquiry",
        segments: [
          { text: "Hi! Did you" },
          { text: "sent", isError: true },
          { text: "the tracking number" },
          { text: "for my jacket order" },
          { text: "this morning?" },
        ],
        fixes: ["send", "sending", "sended"],
        correctFix: "send",
        feedback: {
          spanglish: "Well done! Después del auxiliar «Did», el verb siempre vuelve a su base form («send»).",
          en: "Well done! After the auxiliary 'Did', the main verb stays in its base form ('send').",
        },
      },
      {
        channel: "🏨 Hotel Review Draft",
        sender: "Trip Note",
        segments: [
          { text: "The room was" },
          { text: "clean, and the location" },
          { text: "was" },
          { text: "more cheap", isError: true },
          { text: "than the downtown hotel." },
        ],
        fixes: ["cheaper", "cheapest", "more cheaper"],
        correctFix: "cheaper",
        feedback: {
          spanglish: "Spot on! Adjetivos de 1 sílaba como «cheap» forman el comparative con «-er»: «cheaper».",
          en: "Spot on! One-syllable adjectives like 'cheap' form the comparative with '-er': 'cheaper'.",
        },
      },
    ],
    registerBoard: {
      scenario: {
        spanglish: "Scenario: Avisar que llegarás tarde (drag & drop each phrase into its register zone).",
        en: "Scenario: Letting someone know you are running late.",
      },
      items: [
        { id: "r1", text: "OMG stuck in traffic, be there in 10!", zone: "casual" },
        { id: "r2", text: "My bad! Running a bit late.", zone: "casual" },
        { id: "r3", text: "Hi team, I'm running 10 minutes behind—feel free to start without me.", zone: "workplace" },
        { id: "r4", text: "Sorry for the delay; I'll hop on the call shortly.", zone: "workplace" },
        { id: "r5", text: "Please accept my apologies for the delay in my arrival.", zone: "formal" },
        { id: "r6", text: "I sincerely apologize for any inconvenience this delay may cause.", zone: "formal" },
      ],
      feedback: {
        spanglish: "Great job! Ahora sabes exactamente cómo disculparte por un retraso según con quién hables.",
        en: "Great job! You matched each lateness message to the right social register.",
      },
    },
  },

  /* ==========================================================================
     LEVEL 4: B1 (b1 — Marinero / Sailor)
     ========================================================================== */
  b1: {
    detectiveCases: [
      {
        channel: "💻 Slack Project Channel",
        sender: "Marco · 11:02 AM",
        segments: [
          { text: "If I" },
          { text: "will finish", isError: true },
          { text: "the slide deck" },
          { text: "before 3 p.m.," },
          { text: "I will share it" },
          { text: "with the whole team." },
        ],
        fixes: ["finish", "finished", "finishing"],
        correctFix: "finish",
        feedback: {
          spanglish: "¡Correcto! In the First Conditional, never use 'will' right after 'if'—use Present Simple ('If I finish...').",
          en: "Correct! In the First Conditional, never use 'will' in the 'if' clause—use Present Simple ('If I finish...').",
        },
      },
      {
        channel: "📧 Team Attendance Email",
        sender: "Project Coordinator",
        segments: [
          { text: "Thanks for the invite!" },
          { text: "I'm excited to" },
          { text: "assist", isError: true },
          { text: "the annual design summit" },
          { text: "in Chicago next Thursday." },
        ],
        fixes: ["attend", "assisted", "figure out"],
        correctFix: "attend",
        feedback: {
          spanglish: "¡Exacto! False friend alert: you 'attend' a summit or meeting; 'assist' means to help someone.",
          en: "Exactly! False friend alert: you 'attend' a summit or meeting; 'assist' means to help.",
        },
      },
      {
        channel: "📝 Sprint Recap Note",
        sender: "QA Lead",
        segments: [
          { text: "Although", isError: true },
          { text: "the heavy rain" },
          { text: "and power outage," },
          { text: "the support crew" },
          { text: "kept every server online." },
        ],
        fixes: ["Despite", "However", "Because"],
        correctFix: "Despite",
        feedback: {
          spanglish: "¡Muy bien! Before a noun phrase ('the heavy rain'), use 'Despite' or 'In spite of'—'Although' requires a full clause.",
          en: "Well done! Before a noun phrase ('the heavy rain'), use 'Despite'—'Although' needs a full subject + verb clause.",
        },
      },
    ],
    registerBoard: {
      scenario: {
        spanglish: "Scenario: Proponer un cambio de horario o dar sugerencias (drag into Casual / Workplace / Formal).",
        en: "Scenario: Suggesting a schedule change or making a request.",
      },
      items: [
        { id: "r1", text: "Can we push it to 4? I'm swamped!", zone: "casual" },
        { id: "r2", text: "How about tomorrow instead?", zone: "casual" },
        { id: "r3", text: "Would 3:30 work on your end instead of 2:00?", zone: "workplace" },
        { id: "r4", text: "If it's alright with everyone, let's move the sync to Thursday.", zone: "workplace" },
        { id: "r5", text: "Would it be possible to reschedule our consultation to Thursday afternoon?", zone: "formal" },
        { id: "r6", text: "I kindly request that we defer the review until all documentation is finalized.", zone: "formal" },
      ],
      feedback: {
        spanglish: "¡Excelente! Mastering register shifts makes your everyday and work English sound genuinely fluent.",
        en: "Excellent! Mastering register shifts makes your everyday and workplace English sound genuinely fluent.",
      },
    },
  },

  /* ==========================================================================
     LEVEL 5: B2 (b2 — Contramaestre / Bosun)
     ========================================================================== */
  b2: {
    detectiveCases: [
      {
        channel: "📧 Client Proposal Email",
        sender: "Account Manager",
        segments: [
          { text: "Thank you for" },
          { text: "sending the draft." },
          { text: "I look forward to" },
          { text: "review", isError: true },
          { text: "the final numbers" },
          { text: "with your team tomorrow." },
        ],
        fixes: ["reviewing", "reviewed", "have review"],
        correctFix: "reviewing",
        feedback: {
          spanglish: "¡Correcto! — Here 'to' is a preposition, so 'look forward to' always takes the gerund ('reviewing').",
          en: "Correct! Here 'to' is a preposition, so 'look forward to' always requires the gerund ('reviewing').",
        },
      },
      {
        channel: "💬 Engineering Retro",
        sender: "Tech Lead · 4:18 PM",
        segments: [
          { text: "If we" },
          { text: "would have", isError: true },
          { text: "run load tests" },
          { text: "last Thursday," },
          { text: "we would have caught" },
          { text: "the memory leak early." },
        ],
        fixes: ["had", "have", "were"],
        correctFix: "had",
        feedback: {
          spanglish: "¡Exacto! — Never put 'would have' inside the 'if' clause of a Third Conditional; use Past Perfect ('If we had run...').",
          en: "Exactly! Never put 'would have' in the 'if' clause of a Third Conditional; use Past Perfect ('If we had run...').",
        },
      },
      {
        channel: "🤝 HR & Team Feedback",
        sender: "Manager Note",
        segments: [
          { text: "We deeply value" },
          { text: "your strong" },
          { text: "compromise", isError: true },
          { text: "to mentoring junior" },
          { text: "developers this quarter." },
        ],
        fixes: ["commitment", "sympathetic", "corner"],
        correctFix: "commitment",
        feedback: {
          spanglish: "¡Muy bien! — False friend trap: 'commitment' = dedication/compromiso; 'compromise' = mutual concession.",
          en: "Well done! False friend trap: 'commitment' means dedication; 'compromise' means mutual concession.",
        },
      },
    ],
    registerBoard: {
      scenario: {
        spanglish: "Scenario: Expressing disagreement or pushing back on an idea (sort all 6 phrases by register).",
        en: "Scenario: Expressing disagreement or pushing back on an idea.",
      },
      items: [
        { id: "r1", text: "No way—that's gonna backfire!", zone: "casual" },
        { id: "r2", text: "Honestly, I don't think that makes sense.", zone: "casual" },
        { id: "r3", text: "I see where you're coming from, though I have one concern about the timeline.", zone: "workplace" },
        { id: "r4", text: "Could we weigh the trade-offs before locking in Friday's launch?", zone: "workplace" },
        { id: "r5", text: "While the proposal has clear merit, we must respectfully express reservations regarding compliance.", zone: "formal" },
        { id: "r6", text: "It may be advisable to reassess the risk exposure prior to formal ratification.", zone: "formal" },
      ],
      feedback: {
        spanglish: "¡Excelente! — You nailed the boundary between blunt casual talk, diplomatic US workplace hedging, and formal writing.",
        en: "Excellent! You nailed the boundary between casual talk, diplomatic workplace hedging, and formal writing.",
      },
    },
  },

  /* ==========================================================================
     LEVEL 6: C1 (c1 — Navegante / Navigator · 100% English)
     ========================================================================== */
  c1: {
    detectiveCases: [
      {
        channel: "📊 Executive Summary",
        sender: "VP Strategy Draft",
        segments: [
          { text: "Not only" },
          { text: "the new routing engine reduced", isError: true },
          { text: "delivery times," },
          { text: "but it also lowered" },
          { text: "fuel costs across" },
          { text: "every regional hub." },
        ],
        fixes: [
          "did the new routing engine reduce",
          "had the new routing engine reduce",
          "was the new routing engine reduced",
        ],
        correctFix: "did the new routing engine reduce",
        feedback: {
          spanglish: "Correct! Fronted 'Not only' requires subject-auxiliary inversion: 'Not only did the new routing engine reduce...'.",
          en: "Correct! Fronted 'Not only' requires subject-auxiliary inversion: 'Not only did the new routing engine reduce...'.",
        },
      },
      {
        channel: "📰 Press Release Draft",
        sender: "Communications Team",
        segments: [
          { text: "Dr. Morales is" },
          { text: "a" },
          { text: "notorious", isError: true },
          { text: "climate scientist" },
          { text: "honored with three" },
          { text: "international awards." },
        ],
        fixes: ["renowned", "ostensible", "comprehensive"],
        correctFix: "renowned",
        feedback: {
          spanglish: "Spot on! 'Notorious' implies infamy or scandal; 'renowned' praises distinguished positive reputation.",
          en: "Spot on! 'Notorious' implies infamy or scandal; 'renowned' praises distinguished positive reputation.",
        },
      },
      {
        channel: "📑 Legal & Ops Memo",
        sender: "Compliance Review",
        segments: [
          { text: "Having audited" },
          { text: "all vendor invoices," },
          { text: "the discrepancies were flagged", isError: true },
          { text: "before the quarterly" },
          { text: "close." },
        ],
        fixes: [
          "the finance team flagged the discrepancies",
          "the invoices flagged themselves",
          "flagging the discrepancies occurred",
        ],
        correctFix: "the finance team flagged the discrepancies",
        feedback: {
          spanglish: "Excellent! Eliminating the dangling participle ensures the main subject ('the finance team') actually performed 'Having audited'.",
          en: "Excellent! Eliminating the dangling participle ensures the main subject ('the finance team') actually performed 'Having audited'.",
        },
      },
    ],
    registerBoard: {
      scenario: {
        spanglish: "Scenario: Flagging a critical project risk across Casual, Executive Workplace, and Formal Governance registers.",
        en: "Scenario: Flagging a critical project risk across Casual, Executive Workplace, and Formal Governance registers.",
      },
      items: [
        { id: "r1", text: "Heads up—this rollout is a ticking time bomb.", zone: "casual" },
        { id: "r2", text: "Honestly, we're cutting it way too close on QA.", zone: "casual" },
        { id: "r3", text: "Just to play devil's advocate, how resilient is this timeline if QA flags a blocker?", zone: "workplace" },
        { id: "r4", text: "What I'd recommend is building a 48-hour buffer before the public release.", zone: "workplace" },
        { id: "r5", text: "Seldom has an accelerated deployment schedule carried such material operational exposure.", zone: "formal" },
        { id: "r6", text: "Should regulatory clearance be delayed, contingency protocols shall take immediate effect.", zone: "formal" },
      ],
      feedback: {
        spanglish: "Spot on! You demonstrated effortless C1 command of register calibration from Slack to executive governance.",
        en: "Spot on! You demonstrated effortless C1 command of register calibration from Slack to executive governance.",
      },
    },
  },

  /* ==========================================================================
     LEVEL 7: C2 (c2 — Capitán / Captain · 100% English)
     ========================================================================== */
  c2: {
    detectiveCases: [
      {
        channel: "🏛️ Board Resolution Draft",
        sender: "General Counsel",
        segments: [
          { text: "The audit committee" },
          { text: "insists that" },
          { text: "every subsidiary" },
          { text: "submits", isError: true },
          { text: "an independent verification" },
          { text: "prior to June 30." },
        ],
        fixes: ["submit", "submitted", "submitting"],
        correctFix: "submit",
        feedback: {
          spanglish: "Masterful! Formal mandative subjunctive after 'insists that' takes the uninflected base verb ('submit').",
          en: "Masterful! Formal mandative subjunctive after 'insists that' takes the uninflected base verb ('submit').",
        },
      },
      {
        channel: "⚖️ Arbitration Brief",
        sender: "Panel Chair",
        segments: [
          { text: "To preserve credibility," },
          { text: "the dispute must be" },
          { text: "adjudicated by an" },
          { text: "uninterested", isError: true },
          { text: "third-party mediator" },
          { text: "with no financial ties." },
        ],
        fixes: ["disinterested", "notorious", "empathetic"],
        correctFix: "disinterested",
        feedback: {
          spanglish: "Exact! 'Disinterested' means impartial and unbiased; 'uninterested' means bored or indifferent.",
          en: "Exact! 'Disinterested' means impartial and unbiased; 'uninterested' means bored or indifferent.",
        },
      },
      {
        channel: "📰 Editorial Column",
        sender: "Senior Editor",
        segments: [
          { text: "It is high time" },
          { text: "municipal planners" },
          { text: "rethink", isError: true },
          { text: "their reliance on" },
          { text: "highway widening as a" },
          { text: "cure for congestion." },
        ],
        fixes: ["rethought", "will rethink", "are rethinking"],
        correctFix: "rethought",
        feedback: {
          spanglish: "Impeccable! 'It is (high) time + subject' governs the unreal past ('rethought') to signal overdue action.",
          en: "Impeccable! 'It is (high) time + subject' governs the unreal past ('rethought') to signal overdue action.",
        },
      },
    ],
    registerBoard: {
      scenario: {
        spanglish: "Scenario: Delivering critical evaluation—distinguish Casual candor, Nuanced Executive understatement, and Formal Board prose.",
        en: "Scenario: Delivering critical evaluation—distinguish Casual candor, Nuanced Executive understatement, and Formal Board prose.",
      },
      items: [
        { id: "r1", text: "Let's be real—that pitch totally missed the mark.", zone: "casual" },
        { id: "r2", text: "They totally moved the goalposts on us at the last second.", zone: "casual" },
        { id: "r3", text: "Ambitious though the forecast may appear, it rests on fairly optimistic churn assumptions.", zone: "workplace" },
        { id: "r4", text: "Reading between the lines, the vendor appears reluctant to commit to Q4 volume.", zone: "workplace" },
        { id: "r5", text: "Were the committee to ratify the charter unamended, fiduciary oversight would be materially weakened.", zone: "formal" },
        { id: "r6", text: "Its primary safeguards having been diluted, the resolution warrants immediate reconsideration.", zone: "formal" },
      ],
      feedback: {
        spanglish: "Captain-level mastery! You calibrated idiomatic candor, executive understatement, and formal governance prose without a single slip.",
        en: "Captain-level mastery! You calibrated idiomatic candor, executive understatement, and formal governance prose without a single slip.",
      },
    },
  },
};
