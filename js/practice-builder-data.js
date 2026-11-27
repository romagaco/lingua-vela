/**
 * LinguaVela — Real-World Builder & Live Document Lab Data (js/practice-builder-data.js)
 *
 * Covers all 7 Crew Ranks (a0 Pre-A1 -> c2 Mastery) with:
 *   - builderTasks: 3 Drag-and-Drop Sentence/Message Builder challenges per rank (21 total)
 *   - documentLab: 1 interactive real-life document/form with 4 drag-and-drop slots per rank (7 total)
 */

window.LINGUAVELA_BUILDER_DATA = {
  /* ==========================================================================
     LEVEL 1: PRE-A1 (a0 — Terrícola / Landlubber)
     ========================================================================== */
  a0: {
    builderTasks: [
      {
        channel: "☕ Coffee Shop Counter",
        goal: {
          spanglish: "Arma una frase educada para pedir un café con leche (drag & drop o click).",
          en: "Assemble a polite sentence to order a coffee with milk.",
        },
        tiles: ["Can", "I", "have", "a coffee", "with milk,", "please?"],
        feedback: {
          spanglish: "¡Correct! «Can I have a coffee with milk, please?» es la frase real más usada en EE. UU.",
          en: "Correct! 'Can I have a coffee with milk, please?' is the most natural everyday order.",
        },
      },
      {
        channel: "🏨 Hotel Front Desk",
        goal: {
          spanglish: "Preséntate y di tu nombre completo al llegar al hotel.",
          en: "Introduce yourself clearly when checking in at a hotel.",
        },
        tiles: ["Hello,", "my name", "is", "Sofia", "and I am", "from Peru."],
        feedback: {
          spanglish: "¡Very good! Usaste «my name is» + «I am from» en el orden natural.",
          en: "Well done! You used 'my name is' and 'I am from' in natural order.",
        },
      },
      {
        channel: "🚌 City Bus Stop",
        goal: {
          spanglish: "Pregunta con cortesía dónde está la parada de autobús más cercana.",
          en: "Politely ask where the nearest bus stop is.",
        },
        tiles: ["Excuse me,", "where", "is", "the nearest", "bus stop?"],
        feedback: {
          spanglish: "¡Exact! «Excuse me, where is...» abre cualquier pregunta de dirección con respeto.",
          en: "Exact! 'Excuse me, where is...' politely opens any directions request.",
        },
      },
    ],
    documentLab: {
      docType: "HOTEL CHECK-IN CARD",
      docTitle: "Harbor View Inn — Guest Registration",
      docCode: "FORM #A0-CHECKIN",
      instruction: {
        spanglish: "Arrastra (o haz click en) cada English chip hacia el campo correcto de tu tarjeta de registro de hotel.",
        en: "Drag (or click) each English chip into the matching field on your hotel check-in card.",
      },
      fields: [
        { label: "Greeting & Name", before: "Hello! ", blankId: "f1", after: " Mateo Silva.", answer: "My name is" },
        { label: "Origin", before: "I am ", blankId: "f2", after: " Lima, Peru.", answer: "from" },
        { label: "Contact Email", before: "mateo ", blankId: "f3", after: " mail dot com", answer: "at" },
        { label: "Room Request", before: "Can I have a ", blankId: "f4", after: " near the elevator, please?", answer: "quiet room" },
      ],
      extraDistractor: "three apples",
      feedback: {
        spanglish: "¡Excellent! Tu Hotel Check-In Card está completa y lista para entregar en recepción.",
        en: "Excellent! Your Hotel Check-In Card is complete and ready for the front desk.",
      },
    },
  },

  /* ==========================================================================
     LEVEL 2: A1 (a1 — Grumete / Cabin Mate)
     ========================================================================== */
  a1: {
    builderTasks: [
      {
        channel: "📱 Text to a Friend",
        goal: {
          spanglish: "Arma un mensaje rápido avisando a qué hora terminas tu trabajo hoy.",
          en: "Build a quick text message explaining when you finish work today.",
        },
        tiles: ["I usually", "finish work", "at six,", "so let's", "grab a bite", "at seven!"],
        feedback: {
          spanglish: "Correct! Adverbio «usually» antes del verb + «at» para la hora exacta.",
          en: "Correct! Frequency adverb 'usually' before the verb + 'at' for exact times.",
        },
      },
      {
        channel: "🍽️ Diner Order",
        goal: {
          spanglish: "Ordena tu lunch y pide el agua sin hielo de forma cortés.",
          en: "Order your lunch and ask for water without ice politely.",
        },
        tiles: ["I'd like", "a chicken sandwich", "and", "water", "without ice,", "please."],
        feedback: {
          spanglish: "Well done! «I'd like...» + «without ice, please» suena natural y educado.",
          en: "Well done! 'I'd like...' + 'without ice, please' is polite and clear.",
        },
      },
      {
        channel: "🏠 Describing Your Apartment",
        goal: {
          spanglish: "Describe tu apartamento usando «There is» y una preposición de lugar.",
          en: "Describe your apartment using 'There is' and a location phrase.",
        },
        tiles: ["There is", "a small", "coffee shop", "right across", "from my", "apartment."],
        feedback: {
          spanglish: "Spot on! «There is + singular» describe lugares cercanos con claridad.",
          en: "Spot on! 'There is + singular' naturally introduces nearby places.",
        },
      },
    ],
    documentLab: {
      docType: "CAFÉ DELIVERY ORDER SLIP",
      docTitle: "Greenleaf Bistro — Lunch Delivery",
      docCode: "ORDER #A1-409",
      instruction: {
        spanglish: "Drag & drop o toca los chips para completar tu orden real de almuerzo a domicilio.",
        en: "Drag and drop or tap the chips to complete your real-life lunch delivery slip.",
      },
      fields: [
        { label: "Main Item", before: "1x Grilled ", blankId: "f1", after: " (no onions).", answer: "chicken sandwich" },
        { label: "Delivery Time", before: "Please deliver ", blankId: "f2", after: " 12:30 p.m.", answer: "at" },
        { label: "Building Note", before: "The entrance is ", blankId: "f3", after: " the blue bookstore.", answer: "next to" },
        { label: "Polite Note", before: "I'm ", blankId: "f4", after: " a meeting, so please leave it at reception.", answer: "in" },
      ],
      extraDistractor: "under yesterday",
      feedback: {
        spanglish: "Awesome! Tu orden de almuerzo quedó 100% clara para el repartidor.",
        en: "Awesome! Your lunch delivery slip is clear and ready to dispatch.",
      },
    },
  },

  /* ==========================================================================
     LEVEL 3: A2 (a2 — Marinero de Cubierta / Deckhand)
     ========================================================================== */
  a2: {
    builderTasks: [
      {
        channel: "🚆 Customer Support Chat",
        goal: {
          spanglish: "Build a real message explicando que perdiste el tren ayer y pidiendo cambio.",
          en: "Build a real support message explaining you missed your train and asking to rebook.",
        },
        tiles: ["I missed", "the 9 a.m. train", "because of traffic,", "so could I", "switch to", "the next one?"],
        feedback: {
          spanglish: "Correct! Past Simple («missed») + «because of» + polite request («could I switch to...»).",
          en: "Correct! Past Simple ('missed') + 'because of' + polite 'could I switch to...'.",
        },
      },
      {
        channel: "🛍️ Store Return Counter",
        goal: {
          spanglish: "Assemble the sentence para comparar dos tallas en una tienda.",
          en: "Assemble the sentence comparing two sizes while shopping.",
        },
        tiles: ["This blue jacket", "is more comfortable", "than the gray one,", "and it's", "cheaper too."],
        feedback: {
          spanglish: "Well done! Combinaste comparative largo («more comfortable») y corto («cheaper»).",
          en: "Well done! You paired a long comparative ('more comfortable') with a short one ('cheaper').",
        },
      },
      {
        channel: "✈️ Weekend Plans Text",
        goal: {
          spanglish: "Usa «going to» para un plan decidido y «should» para dar advice.",
          en: "Use 'going to' for a planned trip and 'should' for friendly advice.",
        },
        tiles: ["We are going to", "visit Portland", "this Saturday,", "so you should", "bring a light", "rain jacket."],
        feedback: {
          spanglish: "Spot on! «Going to» = plan previo; «should + base verb» = recomendación práctica.",
          en: "Spot on! 'Going to' expresses a prior plan and 'should' gives helpful advice.",
        },
      },
    ],
    documentLab: {
      docType: "TRAIN TICKET EXCHANGE FORM",
      docTitle: "Pacific Rail — Schedule Change Request",
      docCode: "TICKET #A2-772",
      instruction: {
        spanglish: "Drag & drop each English chip en el campo correcto del formulario para cambiar tu boleto de tren.",
        en: "Drag and drop each English chip into the right field to change your train ticket.",
      },
      fields: [
        { label: "Reason for Change", before: "Yesterday I ", blankId: "f1", after: " the wrong departure date online.", answer: "booked" },
        { label: "New Plan", before: "I ", blankId: "f2", after: " travel on Sunday morning instead.", answer: "am going to" },
        { label: "Seat Preference", before: "I would prefer a ", blankId: "f3", after: " than the middle row.", answer: "quieter seat" },
        { label: "Confirmation", before: "Please email my new ticket ", blankId: "f4", after: " it is ready.", answer: "as soon as" },
      ],
      extraDistractor: "buyed tomorrow",
      feedback: {
        spanglish: "Approved! Tu solicitud de cambio de boleto usa Past Simple, Going to y comparatives con precisión.",
        en: "Approved! Your ticket exchange form uses Past Simple, Going to, and comparatives accurately.",
      },
    },
  },

  /* ==========================================================================
     LEVEL 4: B1 (b1 — Marinero / Sailor)
     ========================================================================== */
  b1: {
    builderTasks: [
      {
        channel: "💬 Slack Team Update",
        goal: {
          spanglish: "Build a B1 status update usando Present Perfect Continuous + First Conditional.",
          en: "Build a B1 status update using Present Perfect Continuous and First Conditional.",
        },
        tiles: ["I've been testing", "the checkout page", "since Monday;", "if we fix", "one last bug,", "we'll launch tomorrow."],
        feedback: {
          spanglish: "¡Correcto! 'Have been testing since Monday' + 'if we fix..., we'll launch' es inglés laboral B1 impecable.",
          en: "Correct! Present Perfect Continuous + First Conditional reads like a real Slack update.",
        },
      },
      {
        channel: "📧 Follow-Up Email",
        goal: {
          spanglish: "Assemble a polite email sentence usando Reported Speech para resumir una llamada.",
          en: "Assemble a polite email sentence using Reported Speech to summarize a call.",
        },
        tiles: ["During yesterday's call,", "Elena said", "that the client", "would review", "the revised draft", "by Friday."],
        feedback: {
          spanglish: "¡Exacto! Backshift natural en Reported Speech: 'will review' → 'would review'.",
          en: "Exactly! Natural backshift in Reported Speech: 'will review' -> 'would review'.",
        },
      },
      {
        channel: "📝 Project Retrospective",
        goal: {
          spanglish: "Combine contrast ('Despite') y Passive Voice para un resumen profesional.",
          en: "Combine a contrast connector ('Despite') with Passive Voice.",
        },
        tiles: ["Despite", "the tight deadline,", "all three reports", "were submitted", "ahead of", "schedule."],
        feedback: {
          spanglish: "¡Muy bien! 'Despite + noun phrase' + past passive ('were submitted') suena limpio y profesional.",
          en: "Well done! 'Despite + noun phrase' paired with past passive is concise and professional.",
        },
      },
    ],
    documentLab: {
      docType: "REMOTE MEETING INVITATION",
      docTitle: "Calendar Invite — Q2 Mobile Redesign Sync",
      docCode: "INVITE #B1-SYNC",
      instruction: {
        spanglish: "Drag & drop the 4 workplace phrases into the live calendar invite para enviarla al equipo.",
        en: "Drag and drop the 4 workplace phrases into the live calendar invite before sending it to the team.",
      },
      fields: [
        { label: "Meeting Purpose", before: "Let's sync for 20 minutes so everyone is ", blankId: "f1", after: " before launch.", answer: "on the same page" },
        { label: "Pre-Read Action", before: "If you ", blankId: "f2", after: " any questions beforehand, add them to the doc.", answer: "have" },
        { label: "Attendance Note", before: "I can't ", blankId: "f3", after: " the 2 p.m. slot, so I moved it to 3:30.", answer: "attend" },
        { label: "Preparation", before: "The latest mockups ", blankId: "f4", after: " updated this morning.", answer: "were" },
      ],
      extraDistractor: "assist the meeting",
      feedback: {
        spanglish: "¡Excelente! Your calendar invite is clear, natural, and completely free of B1 traps.",
        en: "Excellent! Your calendar invite is clear, natural, and free of common B1 traps.",
      },
    },
  },

  /* ==========================================================================
     LEVEL 5: B2 (b2 — Contramaestre / Bosun)
     ========================================================================== */
  b2: {
    builderTasks: [
      {
        channel: "📧 Diplomatic Client Email",
        goal: {
          spanglish: "Build a diplomatic pushback email usando US workplace hedging (evita sonar brusco).",
          en: "Build a diplomatic pushback email using US workplace hedging.",
        },
        tiles: ["While I appreciate", "the urgency,", "compressing QA", "would risk", "introducing regressions", "on launch day."],
        feedback: {
          spanglish: "¡Correcto! — 'While I appreciate..., compressing QA would risk...' frames pushback constructively.",
          en: "Correct! 'While I appreciate..., compressing QA would risk...' frames pushback constructively.",
        },
      },
      {
        channel: "📊 Stakeholder Update",
        goal: {
          spanglish: "Assemble a sentence combining a Mixed Conditional y una reflexión estratégica.",
          en: "Assemble a sentence combining a Mixed Conditional and strategic reflection.",
        },
        tiles: ["If we had", "standardized", "our onboarding docs", "last year,", "new hires", "would be ramping up faster today."],
        feedback: {
          spanglish: "¡Exacto! — Past condition ('had standardized') + present result ('would be ramping up faster today').",
          en: "Exactly! Past condition ('had standardized') linked to a present result ('would be ramping up faster today').",
        },
      },
      {
        channel: "🤝 Vendor Follow-Up",
        goal: {
          spanglish: "Construct a polished email closing con causative ('have X reviewed') + 'look forward to + -ing'.",
          en: "Construct a polished email closing with causative syntax and 'look forward to + -ing'.",
        },
        tiles: ["We will have", "the contract reviewed", "by legal tomorrow", "and look forward", "to finalizing", "our partnership."],
        feedback: {
          spanglish: "¡Muy bien! — Causative ('have the contract reviewed') + preposition 'to' + gerund ('finalizing').",
          en: "Well done! Causative ('have the contract reviewed') + 'look forward to finalizing'.",
        },
      },
    ],
    documentLab: {
      docType: "CLIENT SCOPE & SLA BRIEF",
      docTitle: "Northstar Digital — Phased Delivery Proposal",
      docCode: "BRIEF #B2-SLA",
      instruction: {
        spanglish: "Drag & drop each upper-intermediate phrase into the client brief (cuida el registro y la gramática B2).",
        en: "Drag and drop each upper-intermediate phrase into the client brief with accurate B2 grammar and register.",
      },
      fields: [
        { label: "Risk Assessment", before: "It is ", blankId: "f1", after: " that rushing both integrations could destabilize checkout.", answer: "widely recognized" },
        { label: "Proposed Trade-Off", before: "Rather than ", blankId: "f2", after: " on testing, we propose a two-stage rollout.", answer: "cutting corners" },
        { label: "Legal Sign-Off", before: "We will ", blankId: "f3", after: " by our compliance lead before Friday.", answer: "have the terms approved" },
        { label: "Closing Line", before: "We ", blankId: "f4", after: " your feedback on this revised milestone plan.", answer: "look forward to hearing" },
      ],
      extraDistractor: "look forward to hear",
      feedback: {
        spanglish: "¡Excelente! — Your B2 Client Brief is diplomatic, structured, and ready for stakeholder review.",
        en: "Excellent! Your B2 Client Brief is diplomatic, structured, and ready for stakeholder review.",
      },
    },
  },

  /* ==========================================================================
     LEVEL 6: C1 (c1 — Navegante / Navigator · 100% English)
     ========================================================================== */
  c1: {
    builderTasks: [
      {
        channel: "🏛️ Executive Briefing",
        goal: {
          spanglish: "Assemble a formal C1 sentence using negative-adverbial inversion ('Not only... but also').",
          en: "Assemble a formal C1 sentence using negative-adverbial inversion ('Not only... but also').",
        },
        tiles: ["Not only", "did the redesign", "reduce latency", "by forty percent,", "but it also", "cut cloud spend."],
        feedback: {
          spanglish: "Spot on! Fronting 'Not only' requires subject-auxiliary inversion ('did the redesign reduce...').",
          en: "Spot on! Fronting 'Not only' requires subject-auxiliary inversion ('did the redesign reduce...').",
        },
      },
      {
        channel: "📑 Root-Cause Analysis",
        goal: {
          spanglish: "Construct an inverted Third Conditional ('Had our team...') for an executive post-mortem.",
          en: "Construct an inverted Third Conditional ('Had our team...') for an executive post-mortem.",
        },
        tiles: ["Had", "the staging cluster", "mirrored", "live traffic,", "the bottleneck", "would have surfaced immediately."],
        feedback: {
          spanglish: "Correct! Dropping 'if' and inverting 'Had + subject' elevates precision and conciseness.",
          en: "Correct! Dropping 'if' and inverting 'Had + subject' elevates precision and conciseness.",
        },
      },
      {
        channel: "🎙️ Strategy Keynote",
        goal: {
          spanglish: "Build a Wh-cleft sentence to sharpen focus on your core recommendation.",
          en: "Build a Wh-cleft sentence to sharpen focus on your core recommendation.",
        },
        tiles: ["What", "our enterprise clients", "value most", "is", "transparent communication", "during unplanned outages."],
        feedback: {
          spanglish: "Excellent! A Wh-cleft highlights 'transparent communication' with unmistakable rhetorical clarity.",
          en: "Excellent! A Wh-cleft highlights 'transparent communication' with unmistakable rhetorical clarity.",
        },
      },
    ],
    documentLab: {
      docType: "EXECUTIVE POST-MORTEM MEMO",
      docTitle: "Incident Review #418 — Checkout Latency Spike",
      docCode: "MEMO #C1-RCA",
      instruction: {
        spanglish: "Drag and drop the 4 C1 phrases into the executive post-mortem memo to achieve objective, blameless register.",
        en: "Drag and drop the 4 C1 phrases into the executive post-mortem memo to achieve objective, blameless register.",
      },
      fields: [
        { label: "Executive Summary", before: "", blankId: "f1", after: " has a single config flag triggered such wide downstream latency.", answer: "Seldom" },
        { label: "Systemic Cause", before: "The incident ", blankId: "f2", after: " an unvalidated schema change in staging.", answer: "stemmed from" },
        { label: "Audit Scope", before: "Engineering completed a ", blankId: "f3", after: " review of all deployment pipelines.", answer: "comprehensive" },
        { label: "Next Step", before: "", blankId: "f4", after: " is automating canary rollbacks prior to Q3.", answer: "What we recommend" },
      ],
      extraDistractor: "notorious",
      feedback: {
        spanglish: "Approved! Your C1 Executive Memo exemplifies inversion, nominalized objectivity, and precise collocation.",
        en: "Approved! Your C1 Executive Memo exemplifies inversion, nominalized objectivity, and precise collocation.",
      },
    },
  },

  /* ==========================================================================
     LEVEL 7: C2 (c2 — Capitán / Captain · 100% English)
     ========================================================================== */
  c2: {
    builderTasks: [
      {
        channel: "⚖️ Governance Proposal",
        goal: {
          spanglish: "Assemble a C2 sentence pairing inverted 'Were... to' with a formal mandative subjunctive.",
          en: "Assemble a C2 sentence pairing inverted 'Were... to' with a formal mandative subjunctive.",
        },
        tiles: ["Were the board", "to insist", "that an external auditor", "review each tranche,", "investor confidence", "would strengthen markedly."],
        feedback: {
          spanglish: "Masterful! Inverted hypothetical ('Were the board to insist') + mandative subjunctive ('review').",
          en: "Masterful! Inverted hypothetical ('Were the board to insist') + mandative subjunctive ('review').",
        },
      },
      {
        channel: "📰 Editorial Commentary",
        goal: {
          spanglish: "Build a concessive fronted-adjective clause with nuanced C2 cadence.",
          en: "Build a concessive fronted-adjective clause with nuanced C2 cadence.",
        },
        tiles: ["Compelling though", "the preliminary metrics", "may appear,", "they scarcely justify", "an irreversible", "capital commitment."],
        feedback: {
          spanglish: "Impeccable! Adjective fronting before 'though' + restrained understatement ('scarcely justify').",
          en: "Impeccable! Adjective fronting before 'though' + restrained understatement ('scarcely justify').",
        },
      },
      {
        channel: "📜 Policy Synthesis",
        goal: {
          spanglish: "Construct a compact sentence opening with an absolute participial phrase.",
          en: "Construct a compact sentence opening with an absolute participial phrase.",
        },
        tiles: ["Regulatory approval", "having been secured,", "the consortium", "proceeded to finalize", "its cross-border", "distribution charter."],
        feedback: {
          spanglish: "Spot on! The absolute phrase ('Regulatory approval having been secured') compresses background cleanly.",
          en: "Spot on! The absolute phrase ('Regulatory approval having been secured') compresses background cleanly.",
        },
      },
    ],
    documentLab: {
      docType: "BOARD GOVERNANCE CHARTER",
      docTitle: "Resolution 2026-09 — Independent Oversight Mandate",
      docCode: "CHARTER #C2-GOV",
      instruction: {
        spanglish: "Drag and drop the 4 C2 mastery clauses into the governance charter to finalize board-ready prose.",
        en: "Drag and drop the 4 C2 mastery clauses into the governance charter to finalize board-ready prose.",
      },
      fields: [
        { label: "Mandate Clause", before: "The committee insists that every audit ", blankId: "f1", after: " by an external panel.", answer: "be conducted" },
        { label: "Impartiality Standard", before: "Oversight requires strictly ", blankId: "f2", after: " advisors with zero equity stake.", answer: "disinterested" },
        { label: "Contingency", before: "", blankId: "f3", after: " any material variance arise, trading shall pause.", answer: "Should" },
        { label: "Closing Cadence", before: "It is high time governance ", blankId: "f4", after: " pace with our global footprint.", answer: "kept" },
      ],
      extraDistractor: "uninterested",
      feedback: {
        spanglish: "Ratified! Your C2 Governance Charter commands mandative subjunctive, lexical precision, and unreal past.",
        en: "Ratified! Your C2 Governance Charter commands mandative subjunctive, lexical precision, and unreal past.",
      },
    },
  },
};
