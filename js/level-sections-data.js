/**
 * LinguaVela — 3 New Interactive Sections per Level Data (js/level-sections-data.js)
 *
 * Modeled on top English-learning platforms across all 7 Crew Ranks (Pre-A1 a0 -> C2):
 *   1. Reading & News Capsule (British Council LearnEnglish / VOA Learning English style)
 *   2. Real-World Expressions & "False Friends" (BBC "The English We Speak" / Busuu style)
 *   3. Everyday Situational Roleplay (BBC "English at Work" / British Council style)
 *
 * Instructions, glossary notes, roleplay goals, and feedback follow LinguaVela's
 * progressive Spanglish-to-English immersion curve (15% EN at a0 -> 100% EN at c1/c2).
 */

window.LINGUAVELA_LEVEL_SECTIONS = {
  /* ==========================================================================
     LEVEL 1: PRE-A1 (a0 — Terrícola / Landlubber · ~15% English Spanglish)
     ========================================================================== */
  a0: {
    reading: {
      eyebrow: {
        spanglish: "NUEVA SECCIÓN 1 · READING CAPSULE (ESTILO VOA / BRITISH COUNCIL)",
        en: "NEW SECTION 1 · READING CAPSULE (VOA / BRITISH COUNCIL STYLE)",
      },
      title: {
        spanglish: "Lectura Inicial: Un Nuevo Amigo en el Puerto",
        en: "Starter Reading: A New Friend at the Port",
      },
      instruction: {
        spanglish:
          "Instrucciones: Primero haz click en 🔊 para listen la historia corta. Toca las key words de abajo y luego elige la correct answer en las 3 preguntas.",
        en: "Instructions: Click 🔊 to listen to the short story first. Review the key words below and choose the correct answer for all 3 questions.",
      },
      meta: "Pre-A1 Starter Dispatch · 55 words",
      articleTitle: "Welcome to Harbor Café!",
      paragraphs: [
        "Hello! My name is Mateo, and I am twenty-two years old. I am from Lima, Peru, and today is my first day in Boston.",
        "Right now, I am at the Harbor Café near the water. My teacher is Ms. Clark. Her email is s.clark@harbor.org. She is very friendly, and my coffee is hot!",
      ],
      glossary: [
        {
          word: "first day",
          ipa: "/fɝːst deɪ/",
          meaning: {
            spanglish: "primer día (tu day número uno en un lugar)",
            en: "day number one in a new place or activity",
          },
        },
        {
          word: "near",
          ipa: "/nɪr/",
          meaning: {
            spanglish: "cerca de (a poca distancia del water)",
            en: "close to; a short distance away",
          },
        },
        {
          word: "friendly",
          ipa: "/ˈfrend.li/",
          meaning: {
            spanglish: "amable / simpática (una person agradable)",
            en: "kind, warm, and pleasant to talk to",
          },
        },
        {
          word: "hot",
          ipa: "/hɑːt/",
          meaning: {
            spanglish: "caliente (lo opuesto de cold)",
            en: "having a high temperature; opposite of cold",
          },
        },
      ],
      questions: [
        {
          prompt: {
            spanglish: "¿De qué país (country) es Mateo?",
            en: "Which country is Mateo from?",
          },
          options: ["He is from Peru.", "He is from Boston.", "He is from Canada."],
          correct: 0,
          feedback: {
            spanglish: "¡Correct! En el texto Mateo dice: «I am from Lima, Peru.»",
            en: "Correct! In the text, Mateo says: 'I am from Lima, Peru.'",
          },
        },
        {
          prompt: {
            spanglish: "¿Dónde está Mateo ahora mismo (right now)?",
            en: "Where is Mateo right now?",
          },
          options: ["At the airport", "At the Harbor Café", "At a hospital"],
          correct: 1,
          feedback: {
            spanglish: "¡Very good! Él dice: «Right now, I am at the Harbor Café.»",
            en: "Well done! He says: 'Right now, I am at the Harbor Café.'",
          },
        },
        {
          prompt: {
            spanglish: "¿Cómo se lee el punto «.» en el email «s.clark@harbor.org»?",
            en: "How do we say the '.' symbol in 's.clark@harbor.org'?",
          },
          options: ["dash", "at", "dot"],
          correct: 2,
          feedback: {
            spanglish: "¡Exact! En un email, el punto «.» siempre se dice «dot» y «@» se dice «at».",
            en: "Exact! In an email address, '.' is pronounced 'dot' and '@' is 'at'.",
          },
        },
      ],
    },
    expressions: {
      eyebrow: {
        spanglish: "NUEVA SECCIÓN 2 · EXPRESSIONS Y FALSE FRIENDS (ESTILO BBC / BUSUU)",
        en: "NEW SECTION 2 · EXPRESSIONS & FALSE FRIENDS (BBC / BUSUU STYLE)",
      },
      title: {
        spanglish: "Frases Reales y Primeras Trampas del Español",
        en: "Starter Expressions & Classic Spanish Traps",
      },
      instruction: {
        spanglish:
          "Instrucciones: Explora estas 4 cards con expresiones reales y false friends (palabras engañosas). Haz click en 🔊 para listen cada example y resuelve el mini-quiz.",
        en: "Instructions: Explore these 4 cards featuring everyday expressions and false friends. Click 🔊 to hear each example and complete the mini-quiz.",
      },
      cards: [
        {
          type: "expression",
          term: "Nice to meet you!",
          ipa: "/naɪs tə ˈmiːt juː/",
          trap: {
            spanglish: "💡 Úsala la primera vez que conoces a una person nueva.",
            en: "💡 Use this the very first time you are introduced to someone.",
          },
          realMeaning: {
            spanglish: "✓ Significa: «¡Mucho gusto en conocerte!»",
            en: "✓ Meaning: Pleased to meet you for the first time.",
          },
          example: "Hi Ana! I am Lucas. Nice to meet you!",
        },
        {
          type: "expression",
          term: "How's it going?",
          ipa: "/haʊz ɪt ˈɡoʊ.ɪŋ/",
          trap: {
            spanglish: "💡 Saludo diario muy natural en EE. UU. (más común que «How do you do?»).",
            en: "💡 Natural everyday US greeting, much more casual than 'How do you do?'.",
          },
          realMeaning: {
            spanglish: "✓ Significa: «¿Cómo te va? / ¿Qué tal todo?»",
            en: "✓ Meaning: How are you doing today?",
          },
          example: "Hey Marco, how's it going? Good to see you!",
        },
        {
          type: "falseFriend",
          term: "Library",
          ipa: "/ˈlaɪ.brer.i/",
          trap: {
            spanglish: "⚠️ False Friend: NO significa «librería» (tienda donde compras books = bookstore).",
            en: "⚠️ False Friend: Does NOT mean a shop where you buy books (that is a 'bookstore').",
          },
          realMeaning: {
            spanglish: "✓ Significa: «Biblioteca» (donde lees o pides books prestados).",
            en: "✓ Meaning: A public or school building where you borrow and read books.",
          },
          example: "I study English at the city library every Tuesday.",
        },
        {
          type: "falseFriend",
          term: "Actually",
          ipa: "/ˈæk.tʃu.ə.li/",
          trap: {
            spanglish: "⚠️ False Friend: NO significa «actualmente / hoy en día» (eso es right now / nowadays).",
            en: "⚠️ False Friend: Does NOT mean 'currently' or 'nowadays'.",
          },
          realMeaning: {
            spanglish: "✓ Significa: «En realidad / de hecho» (para aclarar un dato).",
            en: "✓ Meaning: In fact; in reality (used to politely clarify something).",
          },
          example: "I am not from Spain; actually, I am from Colombia.",
        },
      ],
      quiz: [
        {
          prompt: {
            spanglish: "Quieres comprar un cuaderno y un book nuevo. ¿A qué lugar vas?",
            en: "You want to buy a new book to keep. Where do you go?",
          },
          options: ["To the bookstore", "To the library", "To the kitchen"],
          correct: 0,
          feedback: {
            spanglish: "¡Correct! Compras libros en una «bookstore»; «library» es biblioteca.",
            en: "Correct! You buy books at a 'bookstore'; a 'library' is for borrowing or studying.",
          },
        },
        {
          prompt: {
            spanglish: "Alguien cree que te llamas Mario, pero te llamas Darío. ¿Cómo corriges con cortesía?",
            en: "Someone thinks your name is Mario, but it is Dario. How do you clarify politely?",
          },
          options: [
            "Actually, my name is Dario.",
            "Library, my name is Dario.",
            "Goodbye, my name is Dario.",
          ],
          correct: 0,
          feedback: {
            spanglish: "¡Very good! «Actually» significa «en realidad / de hecho».",
            en: "Well done! 'Actually' means 'in fact' and is great for polite corrections.",
          },
        },
        {
          prompt: {
            spanglish: "Ves a tu compañero en la mañana y quieres decir «¿Cómo te va?». Elige la mejor frase:",
            en: "You see your classmate in the morning and want to say a friendly 'How are things?':",
          },
          options: ["How's it going?", "Spell your name.", "See you tomorrow."],
          correct: 0,
          feedback: {
            spanglish: "¡Exact! «How's it going?» es el saludo casual favorito en EE. UU.",
            en: "Exact! 'How's it going?' is one of the most natural everyday US greetings.",
          },
        },
        {
          prompt: {
            spanglish: "Acabas de conocer a tu nueva profesora Ms. Kim. ¿Qué dices?",
            en: "You are meeting your new teacher Ms. Kim for the first time. What do you say?",
          },
          options: ["Nice to meet you!", "Good night!", "Thank you for the coffee."],
          correct: 0,
          feedback: {
            spanglish: "¡Excellent! «Nice to meet you!» es ideal al conocer a alguien.",
            en: "Excellent! 'Nice to meet you!' is the standard polite greeting when meeting someone.",
          },
        },
      ],
    },
    roleplay: {
      eyebrow: {
        spanglish: "NUEVA SECCIÓN 3 · SITUATIONAL ROLEPLAY (ESTILO BBC ENGLISH AT WORK)",
        en: "NEW SECTION 3 · SITUATIONAL ROLEPLAY (BBC ENGLISH AT WORK STYLE)",
      },
      title: {
        spanglish: "Roleplay en 3 Pasos: Tu Primer Café y Registro",
        en: "3-Turn Roleplay: Your First Coffee Counter Check-In",
      },
      instruction: {
        spanglish:
          "Instrucciones: Imagina que estás en una cafetería en Seattle. Haz click en 🔊 para listen a la barista y elige tu mejor reply en cada turno (1, 2 y 3).",
        en: "Instructions: Imagine you are at a Seattle coffee shop. Click 🔊 to listen to the barista and choose your best reply in turns 1, 2, and 3.",
      },
      scenarioBadge: {
        spanglish: "☕ Escenario: Mostrador de cafetería en EE. UU.",
        en: "☕ Scenario: US Coffee Shop Counter",
      },
      turns: [
        {
          speaker: "Barista (Maya)",
          line: "Good morning! Welcome to Dockside Coffee. How can I help you today?",
          goal: {
            spanglish: "Tu meta: Saluda con cortesía y pide un tea o coffee usando «please».",
            en: "Your goal: Greet politely and order a drink using 'please'.",
          },
          options: [
            "Good morning! Can I have a small coffee, please?",
            "Give me coffee fast.",
            "My name are Carlos.",
          ],
          correct: 0,
          feedback: {
            spanglish: "¡Correct! «Can I have..., please?» suena educado, claro y natural.",
            en: "Correct! 'Can I have..., please?' is friendly, clear, and polite.",
          },
        },
        {
          speaker: "Barista (Maya)",
          line: "Sure thing! What is your name for the cup, and how do you spell it?",
          goal: {
            spanglish: "Tu meta: Di que te llamas «Elena» y deletrea la primera y doble letra bien.",
            en: "Your goal: Give the name 'Elena' and spell it clearly in English.",
          },
          options: [
            "Elena: E - L - E - N - A.",
            "I have twenty years.",
            "Yes, thank you goodbye.",
          ],
          correct: 0,
          feedback: {
            spanglish: "¡Very good! Deletreaste cada letra de «Elena» directamente y sin dudar.",
            en: "Well done! You gave your name and spelled each letter cleanly.",
          },
        },
        {
          speaker: "Barista (Maya)",
          line: "Got it, Elena! Here is your coffee. Have a wonderful day!",
          goal: {
            spanglish: "Tu meta: Agradece y despídete amablemente.",
            en: "Your goal: Thank the barista and wish her a good day too.",
          },
          options: [
            "Where is the bathroom?",
            "Thank you very much! You too!",
            "No, I am not a teacher.",
          ],
          correct: 1,
          feedback: {
            spanglish: "¡Excellent! «Thank you very much! You too!» es la respuesta perfecta.",
            en: "Excellent! 'Thank you very much! You too!' is the most natural friendly closing.",
          },
        },
      ],
    },
  },

  /* ==========================================================================
     LEVEL 2: A1 (a1 — Grumete / Cabin Mate · ~30% English Spanglish)
     ========================================================================== */
  a1: {
    reading: {
      eyebrow: {
        spanglish: "NUEVA SECCIÓN 1 · READING & NEWS CAPSULE (BRITISH COUNCIL / VOA STYLE)",
        en: "NEW SECTION 1 · READING & NEWS CAPSULE (BRITISH COUNCIL / VOA STYLE)",
      },
      title: {
        spanglish: "Reading Corto: La Daily Routine de una Enfermera en Chicago",
        en: "Short Feature: A Nurse's Daily Routine in Chicago",
      },
      instruction: {
        spanglish:
          "Instrucciones (Spanglish A1): Listen al artículo con 🔊, revisa las new words del glosario y choose la correct option en las 3 questions de comprensión.",
        en: "Instructions: Listen to the article with 🔊, review the glossary words, and choose the correct option in all 3 comprehension questions.",
      },
      meta: "A1 Lifestyle Capsule · 85 words",
      articleTitle: "Night Shift in the Windy City",
      paragraphs: [
        "Valeria is twenty-eight years old, and she works as a nurse at a busy hospital in Chicago. Most people wake up at seven in the morning, but Valeria has a different schedule.",
        "She usually starts work at seven in the evening and finishes at seven in the morning. During her break at midnight, she eats a warm soup and drinks green tea with her coworkers.",
        "When she gets home at eight o'clock, she walks her dog Bruno, takes a shower, and sleeps until three in the afternoon.",
      ],
      glossary: [
        {
          word: "schedule",
          ipa: "/ˈskedʒ.uːl/",
          meaning: {
            spanglish: "horario (las hours en que trabajas o estudias)",
            en: "a plan of times when work or activities happen",
          },
        },
        {
          word: "break",
          ipa: "/breɪk/",
          meaning: {
            spanglish: "descanso corto durante el work",
            en: "a short rest period during work or study",
          },
        },
        {
          word: "coworkers",
          ipa: "/ˈkoʊˌwɝː.kɚz/",
          meaning: {
            spanglish: "compañeros de trabajo (people who work with you)",
            en: "people who work at the same place as you",
          },
        },
        {
          word: "until",
          ipa: "/ʌnˈtɪl/",
          meaning: {
            spanglish: "hasta (marca cuándo termina una action)",
            en: "up to a specific time",
          },
        },
      ],
      questions: [
        {
          prompt: {
            spanglish: "¿A qué hora empieza Valeria su work normalmente?",
            en: "What time does Valeria usually start work?",
          },
          options: ["At 7:00 a.m.", "At 7:00 p.m.", "At midnight"],
          correct: 1,
          feedback: {
            spanglish: "Correct! El texto dice «seven in the evening» (7:00 p.m.).",
            en: "Correct! The text states 'seven in the evening' (7:00 p.m.).",
          },
        },
        {
          prompt: {
            spanglish: "¿Qué hace Valeria durante su break de medianoche?",
            en: "What does Valeria do during her midnight break?",
          },
          options: [
            "She walks her dog Bruno.",
            "She sleeps for two hours.",
            "She eats soup and drinks green tea.",
          ],
          correct: 2,
          feedback: {
            spanglish: "Well done! En su break de medianoche «she eats a warm soup and drinks green tea».",
            en: "Well done! At midnight she eats warm soup and drinks green tea with coworkers.",
          },
        },
        {
          prompt: {
            spanglish: "¿Por qué lleva «-s» el verb en «she walks her dog»?",
            en: "Why does the verb take '-s' in 'she walks her dog'?",
          },
          options: [
            "Because 'she' is third-person singular in the Present Simple",
            "Because she has two dogs",
            "Because it happened last year",
          ],
          correct: 0,
          feedback: {
            spanglish: "Spot on! Con he/she/it en Present Simple añadimos -s al verb.",
            en: "Spot on! Third-person singular (he/she/it) takes -s in the Present Simple.",
          },
        },
      ],
    },
    expressions: {
      eyebrow: {
        spanglish: "NUEVA SECCIÓN 2 · REAL EXPRESSIONS & FALSE FRIENDS (BBC / BUSUU STYLE)",
        en: "NEW SECTION 2 · REAL EXPRESSIONS & FALSE FRIENDS (BBC / BUSUU STYLE)",
      },
      title: {
        spanglish: "Expresiones de Supervivencia y False Friends A1",
        en: "Survival Expressions & A1 False Friends",
      },
      instruction: {
        spanglish:
          "Instrucciones: Read cada card, listen a la pronunciación con 🔊 y fíjate bien en los false friends para no caer en trampas comunes. Luego responde las 4 questions.",
        en: "Instructions: Read each card, listen with 🔊, and watch out for false friends before answering the 4 quiz questions.",
      },
      cards: [
        {
          type: "expression",
          term: "I'm running late",
          ipa: "/aɪm ˈrʌn.ɪŋ leɪt/",
          trap: {
            spanglish: "💡 No significa correr físicamente; se usa cuando vas con retraso.",
            en: "💡 Idiomatic phrase used when you are behind schedule.",
          },
          realMeaning: {
            spanglish: "✓ Significa: «Voy tarde / Se me hizo tarde».",
            en: "✓ Meaning: I am going to arrive later than planned.",
          },
          example: "Sorry, I'm running late! The bus is very slow today.",
        },
        {
          type: "expression",
          term: "Grab a bite",
          ipa: "/ɡræb ə baɪt/",
          trap: {
            spanglish: "💡 Muy común entre friends y coworkers a la hora del lunch.",
            en: "💡 Everyday casual phrase used around lunchtime or after work.",
          },
          realMeaning: {
            spanglish: "✓ Significa: «Ir a comer algo rápido».",
            en: "✓ Meaning: Get something quick and casual to eat.",
          },
          example: "Are you hungry? Let's grab a bite after class.",
        },
        {
          type: "falseFriend",
          term: "Embarrassed",
          ipa: "/ɪmˈber.əst/",
          trap: {
            spanglish: "⚠️ ¡Trampa clásica! NUNCA significa «embarazada» (eso es pregnant).",
            en: "⚠️ Classic trap! NEVER means expecting a baby (that word is 'pregnant').",
          },
          realMeaning: {
            spanglish: "✓ Significa: «Avergonzado/a / Con pena».",
            en: "✓ Meaning: Feeling shy, awkward, or ashamed about a mistake.",
          },
          example: "He felt embarrassed when he forgot his neighbor's name.",
        },
        {
          type: "falseFriend",
          term: "Carpet",
          ipa: "/ˈkɑːr.pɪt/",
          trap: {
            spanglish: "⚠️ False Friend: NO significa «carpeta» para papeles (eso es folder).",
            en: "⚠️ False Friend: Does NOT mean a paper file holder (that is a 'folder').",
          },
          realMeaning: {
            spanglish: "✓ Significa: «Alfombra / Moqueta» en el piso.",
            en: "✓ Meaning: Thick fabric covering the floor of a room.",
          },
          example: "Please take off your wet shoes; the living room carpet is clean.",
        },
      ],
      quiz: [
        {
          prompt: {
            spanglish: "Tu autobús tiene tráfico y llegarás 10 minutos tarde. ¿Qué mensaje envías?",
            en: "Your bus is stuck in traffic and you'll arrive 10 minutes late. What do you text?",
          },
          options: [
            "Hey! Sorry, I'm running late.",
            "Hey! Sorry, I have a carpet.",
            "Hey! Let's grab a bite yesterday.",
          ],
          correct: 0,
          feedback: {
            spanglish: "Correct! «I'm running late» es la frase exacta para avisar que vas tarde.",
            en: "Correct! 'I'm running late' is the natural phrase to text when delayed.",
          },
        },
        {
          prompt: {
            spanglish: "¿Dónde guardas tus documentos de la oficina? (Cuidado con el false friend)",
            en: "Where do you keep your printed office papers?",
          },
          options: ["In a blue folder", "In a blue carpet", "In a library bite"],
          correct: 0,
          feedback: {
            spanglish: "Well done! Papeles van en un «folder»; «carpet» es la alfombra del piso.",
            en: "Well done! Papers go in a 'folder'; 'carpet' covers the floor.",
          },
        },
        {
          prompt: {
            spanglish: "Derramaste agua en la mesa y sentiste un poco de vergüenza. ¿Cómo lo dices?",
            en: "You spilled water on the table and felt shy/awkward. What do you say?",
          },
          options: ["I was so pregnant!", "I was so embarrassed!", "I was running late!"],
          correct: 1,
          feedback: {
            spanglish: "Spot on! «Embarrassed» = avergonzado/a; «pregnant» = embarazada.",
            en: "Spot on! 'Embarrassed' means feeling awkward or ashamed.",
          },
        },
        {
          prompt: {
            spanglish: "Terminas tu clase a la 1:00 p.m. y quieres invitar a un friend a comer algo rápido:",
            en: "Class ends at 1:00 p.m. and you want to invite a friend for a quick meal:",
          },
          options: [
            "Do you want to grab a bite?",
            "Do you want to clean the carpet?",
            "Are you embarrassed right now?",
          ],
          correct: 0,
          feedback: {
            spanglish: "Excellent! «Do you want to grab a bite?» suena 100% natural.",
            en: "Excellent! 'Do you want to grab a bite?' is warm and natural.",
          },
        },
      ],
    },
    roleplay: {
      eyebrow: {
        spanglish: "NUEVA SECCIÓN 3 · EVERYDAY SITUATIONAL ROLEPLAY (BRITISH COUNCIL STYLE)",
        en: "NEW SECTION 3 · EVERYDAY SITUATIONAL ROLEPLAY (BRITISH COUNCIL STYLE)",
      },
      title: {
        spanglish: "Roleplay A1: Ordenar Almuerzo y Preguntar una Dirección",
        en: "A1 Roleplay: Ordering Lunch & Asking for Directions",
      },
      instruction: {
        spanglish:
          "Instrucciones: Listen cada línea del diálogo con 🔊 y choose la mejor answer para sobrevivir con éxito en un restaurante local.",
        en: "Instructions: Listen to each dialogue line with 🔊 and choose the most polite, accurate reply at a neighborhood diner.",
      },
      scenarioBadge: {
        spanglish: "🥪 Escenario: Almuerzo rápido en el centro",
        en: "🥪 Scenario: Downtown Lunch Counter",
      },
      turns: [
        {
          speaker: "Server (Leo)",
          line: "Hi there! Are you ready to order, or do you need a few more minutes?",
          goal: {
            spanglish: "Tu meta: Pide con cortesía un chicken sandwich y un vaso de water.",
            en: "Your goal: Politely order a chicken sandwich and a glass of water.",
          },
          options: [
            "I want chicken sandwich now.",
            "I'd like a chicken sandwich and a glass of water, please.",
            "Yes, I am ready yesterday.",
          ],
          correct: 1,
          feedback: {
            spanglish: "Correct! «I'd like..., please» es la forma más cortés para pedir comida.",
            en: "Correct! 'I'd like..., please' is the polite standard when ordering food.",
          },
        },
        {
          speaker: "Server (Leo)",
          line: "Coming right up! Would you like that for here or to go?",
          goal: {
            spanglish: "Tu meta: Di que es para comer aquí mismo en el restaurante.",
            en: "Your goal: Say that you will eat inside the restaurant.",
          },
          options: [
            "For here, please.",
            "In my carpet, please.",
            "I don't like food.",
          ],
          correct: 0,
          feedback: {
            spanglish: "Well done! En EE. UU. dicen «For here» (para comer aquí) y «To go» (para llevar).",
            en: "Well done! In US English, 'For here' means dine-in and 'To go' means takeout.",
          },
        },
        {
          speaker: "Server (Leo)",
          line: "All set! Anything else I can help you find today?",
          goal: {
            spanglish: "Tu meta: Pregunta con educación dónde queda la estación de metro (subway station).",
            en: "Your goal: Politely ask where the nearest subway station is.",
          },
          options: [
            "Tell me subway where!",
            "Excuse me, is there a subway station near here?",
            "There are a subway station in my pocket?",
          ],
          correct: 1,
          feedback: {
            spanglish: "Excellent! «Excuse me, is there a ... near here?» usa «There is» en question de forma impecable.",
            en: "Excellent! 'Excuse me, is there a ... near here?' is polite and grammatically spot-on.",
          },
        },
      ],
    },
  },

  /* ==========================================================================
     LEVEL 3: A2 (a2 — Marinero de Cubierta / Deckhand · 50/50 Spanglish)
     ========================================================================== */
  a2: {
    reading: {
      eyebrow: {
        spanglish: "NEW SECTION 1 · READING & NEWS CAPSULE (VOA / BRITISH COUNCIL STYLE)",
        en: "NEW SECTION 1 · READING & NEWS CAPSULE (VOA / BRITISH COUNCIL STYLE)",
      },
      title: {
        spanglish: "Travel Story: El Tren Perdido que Cambió el Fin de Semana",
        en: "Travel Dispatch: The Missed Train That Saved the Weekend",
      },
      instruction: {
        spanglish:
          "Instructions (Spanglish 50/50): Listen to the story a velocidad 1.0x o 0.75x, check the key vocabulary y select the correct answer en cada question.",
        en: "Instructions: Listen to the travel story at 1.0x or 0.75x, check the key vocabulary, and select the correct answer for each question.",
      },
      meta: "A2 Travel & Past Simple Capsule · 115 words",
      articleTitle: "A Surprise Stop in Portland",
      paragraphs: [
        "Last Saturday, Sofia and her brother Daniel planned a weekend trip from Seattle to Vancouver. However, traffic on the highway was worse than usual, so they arrived at the station ten minutes after their train left.",
        "At first, Daniel was upset, but the ticket agent helped them book seats on an afternoon bus to Portland instead. The bus ticket was actually cheaper than the train!",
        "In Portland, they rented bikes, tried famous local food trucks, and visited the largest independent bookstore in the country. Have they ever had a better accidental trip? Sofia says no!",
      ],
      glossary: [
        {
          word: "worse than",
          ipa: "/wɝːs ðæn/",
          meaning: {
            spanglish: "peor que (comparative irregular de bad)",
            en: "irregular comparative form of 'bad'",
          },
        },
        {
          word: "instead",
          ipa: "/ɪnˈsted/",
          meaning: {
            spanglish: "en su lugar / en vez de eso (a different choice)",
            en: "in place of the original plan",
          },
        },
        {
          word: "book seats",
          ipa: "/bʊk siːts/",
          meaning: {
            spanglish: "reservar asientos (aquí «book» funciona como verb)",
            en: "reserve places on a train, bus, or plane",
          },
        },
        {
          word: "food trucks",
          ipa: "/ˈfuːd trʌks/",
          meaning: {
            spanglish: "puestos móviles de street food muy populares en EE. UU.",
            en: "mobile vehicles that cook and sell street food",
          },
        },
      ],
      questions: [
        {
          prompt: {
            spanglish: "Why did Sofia y Daniel perder su train original?",
            en: "Why did Sofia and Daniel miss their original train?",
          },
          options: [
            "Because highway traffic was worse than usual",
            "Because they forgot their passports at home",
            "Because the station was closed on Saturday",
          ],
          correct: 0,
          feedback: {
            spanglish: "Correct! Highway traffic was worse than usual, así que llegaron 10 minutos tarde.",
            en: "Correct! Highway traffic was worse than usual, so they arrived ten minutes late.",
          },
        },
        {
          prompt: {
            spanglish: "How did the bus ticket compare con el boleto de tren?",
            en: "How did the bus ticket compare to the train ticket?",
          },
          options: [
            "It was more expensive than the train.",
            "It was cheaper than the train.",
            "It cost the exact same price.",
          ],
          correct: 1,
          feedback: {
            spanglish: "Well done! The text says: «The bus ticket was actually cheaper than the train!»",
            en: "Well done! The text says: 'The bus ticket was actually cheaper than the train!'",
          },
        },
        {
          prompt: {
            spanglish: "In «help them book seats», ¿qué función cumple la word «book»?",
            en: "In 'helped them book seats', what does the verb 'book' mean?",
          },
          options: ["Read a novel", "Reserve / buy tickets in advance", "Cancel a trip"],
          correct: 1,
          feedback: {
            spanglish: "Spot on! Como verb en viajes, «to book» significa reservar (tickets, hotels, seats).",
            en: "Spot on! As a travel verb, 'to book' means to reserve tickets, rooms, or seats.",
          },
        },
      ],
    },
    expressions: {
      eyebrow: {
        spanglish: "NEW SECTION 2 · EXPRESSIONS & FALSE FRIENDS (BBC / BUSUU STYLE)",
        en: "NEW SECTION 2 · EXPRESSIONS & FALSE FRIENDS (BBC / BUSUU STYLE)",
      },
      title: {
        spanglish: "Phrasal Verbs Cotidianos y A2 False Friends",
        en: "Everyday Phrasal Verbs & A2 False Friends",
      },
      instruction: {
        spanglish:
          "Instructions: Study each card en Spanglish, listen to the US pronunciation con 🔊 y complete the 4-question check.",
        en: "Instructions: Study each card, listen to the US pronunciation with 🔊, and complete the 4-question check.",
      },
      cards: [
        {
          type: "expression",
          term: "Figure out",
          ipa: "/ˈfɪɡ.jɚ aʊt/",
          trap: {
            spanglish: "💡 Phrasal verb esencial en EE. UU. para resolver un problem o entender cómo funciona algo.",
            en: "💡 Essential US phrasal verb for solving a problem or understanding how something works.",
          },
          realMeaning: {
            spanglish: "✓ Significa: «Descifrar / Resolver / Entender».",
            en: "✓ Meaning: Understand or find the solution to something.",
          },
          example: "Don't worry, we will figure out the train map together.",
        },
        {
          type: "expression",
          term: "Keep in touch",
          ipa: "/kiːp ɪn tʌtʃ/",
          trap: {
            spanglish: "💡 Se usa al despedirse de amigos o colegas después de un trip o curso.",
            en: "💡 Warm phrase used when saying goodbye after a trip, class, or event.",
          },
          realMeaning: {
            spanglish: "✓ Significa: «Mantenerse en contacto / Seguir hablándose».",
            en: "✓ Meaning: Continue communicating by phone, text, or email.",
          },
          example: "It was great working with you! Let's definitely keep in touch.",
        },
        {
          type: "falseFriend",
          term: "Realize",
          ipa: "/ˈriː.ə.laɪz/",
          trap: {
            spanglish: "⚠️ False Friend: NO significa «realizar / llevar a cabo una tarea» (eso es carry out / complete / do).",
            en: "⚠️ False Friend: Does NOT mean 'perform or complete a task' (use 'complete' or 'carry out').",
          },
          realMeaning: {
            spanglish: "✓ Significa: «Darse cuenta de algo» (en tu mente).",
            en: "✓ Meaning: Become aware of or suddenly understand a fact.",
          },
          example: "When I got to the airport, I realized my passport was at home!",
        },
        {
          type: "falseFriend",
          term: "Sensible",
          ipa: "/ˈsen.sə.bəl/",
          trap: {
            spanglish: "⚠️ False Friend: NO significa «sensible / emocional» (eso en inglés es sensitive).",
            en: "⚠️ False Friend: Does NOT mean 'emotionally sensitive' (that word is 'sensitive').",
          },
          realMeaning: {
            spanglish: "✓ Significa: «Sensato / Práctico / Razonable».",
            en: "✓ Meaning: Practical, reasonable, showing good judgment.",
          },
          example: "Wearing comfortable shoes on a long city walk is a very sensible idea.",
        },
      ],
      quiz: [
        {
          prompt: {
            spanglish: "Llegaste a la tienda y «te diste cuenta» de que olvidaste tu billetera. Choose the best sentence:",
            en: "You arrived at the store and suddenly noticed you forgot your wallet:",
          },
          options: [
            "I realized I left my wallet at home.",
            "I kept in touch my wallet at home.",
            "I was very sensible my wallet.",
          ],
          correct: 0,
          feedback: {
            spanglish: "Correct! «Realize» significa darse cuenta mentalmente de algo.",
            en: "Correct! 'Realize' means to suddenly notice or become aware of a fact.",
          },
        },
        {
          prompt: {
            spanglish: "Tu amiga toma decisiones prácticas y con buen juicio. Ella es muy ___:",
            en: "Your friend makes practical, smart decisions with good judgment. She is very ___:",
          },
          options: ["sensible", "embarrassed", "late"],
          correct: 0,
          feedback: {
            spanglish: "Spot on! «Sensible» = sensata y práctica; «sensitive» = emocionalmente sensible.",
            en: "Spot on! 'Sensible' means practical and reasonable.",
          },
        },
        {
          prompt: {
            spanglish: "No entiendes cómo usar la máquina de boletos, pero vas a «resolverlo»:",
            en: "You don't know how the ticket machine works yet, but you'll solve it:",
          },
          options: [
            "I'll figure it out in a minute.",
            "I'll keep in touch the machine.",
            "I'll realize the task tomorrow.",
          ],
          correct: 0,
          feedback: {
            spanglish: "Well done! «Figure it out» = entender o resolver cómo funciona.",
            en: "Well done! 'Figure it out' means work out the solution.",
          },
        },
        {
          prompt: {
            spanglish: "Te despides de un compañero al terminar un viaje y quieres seguir hablando por mensaje:",
            en: "You say goodbye to a travel friend and want to stay connected:",
          },
          options: [
            "Let's keep in touch! Here's my number.",
            "Let's figure out your name.",
            "You are very sensitive shoes.",
          ],
          correct: 0,
          feedback: {
            spanglish: "Excellent! «Let's keep in touch!» es cálido y súper común.",
            en: "Excellent! 'Let's keep in touch!' is the natural way to stay connected.",
          },
        },
      ],
    },
    roleplay: {
      eyebrow: {
        spanglish: "NEW SECTION 3 · SITUATIONAL ROLEPLAY (BBC / BRITISH COUNCIL STYLE)",
        en: "NEW SECTION 3 · SITUATIONAL ROLEPLAY (BBC / BRITISH COUNCIL STYLE)",
      },
      title: {
        spanglish: "Roleplay A2: Cambiar una Talla en una Tienda de Ropa",
        en: "A2 Roleplay: Exchanging a Jacket Size at a Clothing Store",
      },
      instruction: {
        spanglish:
          "Instructions: Listen to the store associate con 🔊 y select the best reply usando Past Simple, comparatives y polite requests.",
        en: "Instructions: Listen to the store associate with 🔊 and select the best reply using Past Simple, comparatives, and polite requests.",
      },
      scenarioBadge: {
        spanglish: "🧥 Scenario: Mostrador de cambios (Customer Service)",
        en: "🧥 Scenario: Retail Store Exchange Counter",
      },
      turns: [
        {
          speaker: "Associate (Hannah)",
          line: "Hi! Welcome back. How can I help you with that jacket today?",
          goal: {
            spanglish: "Your goal: Explica en Past Simple que compraste la chaqueta ayer, pero te queda muy pequeña.",
            en: "Your goal: Explain in the Past Simple that you bought it yesterday, but it is too small.",
          },
          options: [
            "Hi! I bought this jacket yesterday, but it's a bit too small for me.",
            "Hi! I buyed this jacket yesterday and is more small.",
            "Give me other jacket because yesterday.",
          ],
          correct: 0,
          feedback: {
            spanglish: "Correct! Usaste el irregular past «bought» y «too small» con naturalidad.",
            en: "Correct! You used the irregular past 'bought' and 'too small' naturally.",
          },
        },
        {
          speaker: "Associate (Hannah)",
          line: "No problem at all! Would you like a refund, or would you prefer to exchange it for a larger size?",
          goal: {
            spanglish: "Your goal: Pide cambiarla por una talla más grande (a bigger / larger size).",
            en: "Your goal: Politely ask to exchange it for a larger size (Medium -> Large).",
          },
          options: [
            "I'd like to exchange it for a larger size, please. Do you have a Large?",
            "I want more big size right now.",
            "Yes, I have ever visited Chicago.",
          ],
          correct: 0,
          feedback: {
            spanglish: "Well done! «Larger size» (o «bigger size») es el comparative exacto aquí.",
            en: "Well done! 'Exchange it for a larger size' is polite and accurate.",
          },
        },
        {
          speaker: "Associate (Hannah)",
          line: "We do have one Large left! Do you happen to have the receipt with you?",
          goal: {
            spanglish: "Your goal: Confirma que ya tienes el recibo listo en tu teléfono o bolso.",
            en: "Your goal: Confirm that you brought the receipt in your bag.",
          },
          options: [
            "No, I mustn't wear jackets.",
            "Yes, here it is! I kept the receipt in my bag.",
            "I didn't went to the store.",
          ],
          correct: 1,
          feedback: {
            spanglish: "Excellent! «I kept the receipt» usa el Past Simple de «keep» perfectamente.",
            en: "Excellent! 'Here it is! I kept the receipt' closes the exchange smoothly.",
          },
        },
      ],
    },
  },

  /* ==========================================================================
     LEVEL 4: B1 (b1 — Marinero / Sailor · ~70% English Spanglish)
     ========================================================================== */
  b1: {
    reading: {
      eyebrow: {
        spanglish: "NEW SECTION 1 · READING & NEWS CAPSULE (BRITISH COUNCIL / VOA STYLE)",
        en: "NEW SECTION 1 · READING & NEWS CAPSULE (BRITISH COUNCIL / VOA STYLE)",
      },
      title: {
        spanglish: "Workplace Feature: Why 'Four-Day Workweeks' Are Gaining Momentum",
        en: "Workplace Feature: Why Four-Day Workweeks Are Gaining Momentum",
      },
      instruction: {
        spanglish:
          "Instructions (70% English): Read and listen to the article con 🔊, revisa el vocabulary in context, and answer all 3 comprehension questions.",
        en: "Instructions: Read and listen to the article with 🔊, review the vocabulary in context, and answer all 3 comprehension questions.",
      },
      meta: "B1 Workplace & Society Briefing · 140 words",
      articleTitle: "Shorter Weeks, Sharper Focus?",
      paragraphs: [
        "Over the past three years, dozens of mid-sized companies in North America have been testing a four-day workweek without cutting employee pay. When the pilot program began, many managers worried that productivity would drop if teams worked fewer hours.",
        "Surprisingly, most participating firms reported the opposite result. Because employees had an extra day to rest and handle personal errands, burnout fell sharply while project completion rates stayed steady.",
        "Still, researchers point out that the model does not work automatically. Teams that succeeded had already redesigned their meetings—replacing hour-long status calls with brief written updates so everyone could focus on deep work.",
      ],
      glossary: [
        {
          word: "burnout",
          ipa: "/ˈbɝːn.aʊt/",
          meaning: {
            spanglish: "agotamiento extremo por exceso de work prolongado",
            en: "physical or mental exhaustion caused by prolonged work stress",
          },
        },
        {
          word: "errands",
          ipa: "/ˈer.əndz/",
          meaning: {
            spanglish: "mandados o diligencias cotidianas (banco, compras, citas)",
            en: "short everyday tasks outside home, such as banking or grocery shopping",
          },
        },
        {
          word: "steady",
          ipa: "/ˈsted.i/",
          meaning: {
            spanglish: "estable / constante, sin caídas bruscas",
            en: "stable, regular, and not dropping",
          },
        },
        {
          word: "pilot program",
          ipa: "/ˈpaɪ.lət ˈproʊ.ɡræm/",
          meaning: {
            spanglish: "prueba piloto inicial antes de adoptar un cambio permanente",
            en: "a small-scale test conducted before launching a full policy",
          },
        },
      ],
      questions: [
        {
          prompt: {
            spanglish: "What have dozens of companies been testing durante los últimos tres años?",
            en: "What have dozens of companies been testing over the past three years?",
          },
          options: [
            "A four-day workweek with the same pay",
            "Longer daily meetings with lower salaries",
            "Eliminating all written updates",
          ],
          correct: 0,
          feedback: {
            spanglish: "¡Correcto! Notice the Present Perfect Continuous: 'have been testing a four-day workweek without cutting pay'.",
            en: "Correct! Notice the Present Perfect Continuous: 'have been testing a four-day workweek without cutting pay'.",
          },
        },
        {
          prompt: {
            spanglish: "According to researchers, qué habían hecho primero los equipos exitosos (Past Perfect)?",
            en: "According to researchers, what had successful teams already done?",
          },
          options: [
            "They had hired twice as many managers.",
            "They had redesigned their meetings and cut long status calls.",
            "They had closed their offices permanently.",
          ],
          correct: 1,
          feedback: {
            spanglish: "¡Exacto! 'Teams that succeeded had already redesigned their meetings' usa Past Perfect para mostrar el paso previo clave.",
            en: "Exactly! 'Teams that succeeded had already redesigned their meetings' uses the Past Perfect to highlight the prior step.",
          },
        },
        {
          prompt: {
            spanglish: "Why did managers use 'would drop' in 'worried that productivity would drop'?",
            en: "Why is 'would drop' used in 'managers worried that productivity would drop'?",
          },
          options: [
            "Reported speech / future-in-the-past after the past verb 'worried'",
            "Zero conditional for scientific facts",
            "Passive voice in the present",
          ],
          correct: 0,
          feedback: {
            spanglish: "¡Muy bien! After 'worried' in the past, 'will' shifts back to 'would' (Reported Speech).",
            en: "Well done! After the past reporting verb 'worried', 'will' shifts to 'would'.",
          },
        },
      ],
    },
    expressions: {
      eyebrow: {
        spanglish: "NEW SECTION 2 · REAL-WORLD EXPRESSIONS & FALSE FRIENDS (BBC / BUSUU STYLE)",
        en: "NEW SECTION 2 · REAL-WORLD EXPRESSIONS & FALSE FRIENDS (BBC / BUSUU STYLE)",
      },
      title: {
        spanglish: "Workplace Idioms & B1 False Friends",
        en: "Workplace Idioms & B1 False Friends",
      },
      instruction: {
        spanglish:
          "Instructions: Review each idiom y false friend card, play the audio con 🔊 to practice connected speech, and complete the 4 challenges.",
        en: "Instructions: Review each idiom and false friend card, play the audio with 🔊, and complete the 4 challenges.",
      },
      cards: [
        {
          type: "expression",
          term: "On the same page",
          ipa: "/ɑːn ðə seɪm peɪdʒ/",
          trap: {
            spanglish: "💡 Idiom clave en proyectos para confirmar que todos entienden el mismo plan.",
            en: "💡 Core workplace idiom used to confirm shared understanding across a team.",
          },
          realMeaning: {
            spanglish: "✓ Meaning: «Estar en sintonía / De acuerdo en el plan».",
            en: "✓ Meaning: Having the same understanding and agreement about a plan.",
          },
          example: "Let's review the timeline before Friday so we're all on the same page.",
        },
        {
          type: "expression",
          term: "Call it a day",
          ipa: "/kɔːl ɪt ə deɪ/",
          trap: {
            spanglish: "💡 Con Flap T suena /kɔːl ɪɾ ə deɪ/. Úsalo al cerrar la jornada de trabajo.",
            en: "💡 Spoken with smooth linking (/kɔːl ɪɾ ə deɪ/) when wrapping up work for the day.",
          },
          realMeaning: {
            spanglish: "✓ Meaning: «Dejarlo por hoy / Terminar la jornada».",
            en: "✓ Meaning: Stop working on something for the rest of the day.",
          },
          example: "We've finished all the main slides—let's call it a day and rest.",
        },
        {
          type: "falseFriend",
          term: "Assist",
          ipa: "/əˈsɪst/",
          trap: {
            spanglish: "⚠️ False Friend: NO significa «asistir a una reunión o clase» (eso es attend a meeting/class!).",
            en: "⚠️ False Friend: Does NOT mean 'be present at an event or meeting' (use 'attend'!).",
          },
          realMeaning: {
            spanglish: "✓ Meaning: «Ayudar / Brindar apoyo» (= help).",
            en: "✓ Meaning: Help or support someone with a task.",
          },
          example: "Could you assist me with the client report? Afterwards, I have to attend a 3 p.m. call.",
        },
        {
          type: "falseFriend",
          term: "Eventually",
          ipa: "/ɪˈven.tʃu.ə.li/",
          trap: {
            spanglish: "⚠️ False Friend: NO significa «eventualmente / tal vez / ocasionalmente» (eso es possibly / occasionally).",
            en: "⚠️ False Friend: Does NOT mean 'maybe' or 'occasionally'.",
          },
          realMeaning: {
            spanglish: "✓ Meaning: «Finalmente / Con el tiempo» (tras un proceso largo).",
            en: "✓ Meaning: In the end, especially after a long delay or effort.",
          },
          example: "It took six months of practice, but she eventually felt confident speaking on calls.",
        },
      ],
      quiz: [
        {
          prompt: {
            spanglish: "You want to say 'Mañana asistiré a la conferencia anual'. Choose the natural English sentence:",
            en: "Choose the natural sentence meaning 'I will be present at the annual conference tomorrow':",
          },
          options: [
            "I'm going to attend the annual conference tomorrow.",
            "I'm going to assist the annual conference tomorrow.",
            "I'm going to call it a day tomorrow morning.",
          ],
          correct: 0,
          feedback: {
            spanglish: "¡Correcto! You 'attend' a meeting, class, or conference; 'assist' means to help.",
            en: "Correct! You 'attend' a conference or meeting; 'assist' means to help someone.",
          },
        },
        {
          prompt: {
            spanglish: "After three hours of debugging, your team finally found the bug. Which adverb fits?",
            en: "After three hours of debugging, your team finally found the bug. Which adverb fits?",
          },
          options: ["eventually", "actually", "sensibly"],
          correct: 0,
          feedback: {
            spanglish: "¡Exacto! 'Eventually' means 'in the end / finally' después de esfuerzo o espera.",
            en: "Exactly! 'Eventually' means 'in the end' after sustained effort or time.",
          },
        },
        {
          prompt: {
            spanglish: "It is 6:15 p.m. and your team has completed the sprint goals. What can you suggest?",
            en: "It is 6:15 p.m. and your team has completed the sprint goals. What can you suggest?",
          },
          options: [
            "Great work, everyone—let's call it a day!",
            "Great work, everyone—let's assist the building!",
            "Let's be embarrassed until Monday!",
          ],
          correct: 0,
          feedback: {
            spanglish: "¡Muy bien! 'Let's call it a day' es la forma natural de cerrar la jornada.",
            en: "Well done! 'Let's call it a day' naturally signals wrapping up work for today.",
          },
        },
        {
          prompt: {
            spanglish: "Before launching a project, you want to make sure everyone shares the same plan:",
            en: "Before launching a project, you want to confirm everyone shares the same plan:",
          },
          options: [
            "I just want to make sure we're all on the same page.",
            "I just want to make sure we're on the same carpet.",
            "Let's eventually miss the meeting.",
          ],
          correct: 0,
          feedback: {
            spanglish: "¡Excelente! 'On the same page' es indispensable en reuniones en inglés.",
            en: "Excellent! 'On the same page' is a staple phrase for team alignment.",
          },
        },
      ],
    },
    roleplay: {
      eyebrow: {
        spanglish: "NEW SECTION 3 · SITUATIONAL ROLEPLAY (BBC ENGLISH AT WORK STYLE)",
        en: "NEW SECTION 3 · SITUATIONAL ROLEPLAY (BBC ENGLISH AT WORK STYLE)",
      },
      title: {
        spanglish: "B1 Roleplay: Solucionar un Imprevisto en una Llamada Remota",
        en: "B1 Roleplay: Solving a Schedule Clash on a Remote Team Call",
      },
      instruction: {
        spanglish:
          "Instructions: Listen to your project lead con 🔊 and select the most collaborative, polite B1 response in each turn.",
        en: "Instructions: Listen to your project lead with 🔊 and select the most collaborative, polite B1 response in each turn.",
      },
      scenarioBadge: {
        spanglish: "💻 Scenario: Weekly Remote Stand-Up Call",
        en: "💻 Scenario: Weekly Remote Stand-Up Call",
      },
      turns: [
        {
          speaker: "Project Lead (Devon)",
          line: "Hey! How has the website redesign been going since Monday?",
          goal: {
            spanglish: "Your goal: Usa Present Perfect Continuous para contar el avance y mencionar un detalle pendiente.",
            en: "Your goal: Use Present Perfect Continuous to report progress and mention one remaining step.",
          },
          options: [
            "We have been testing the new mobile layout since Monday, and it's almost ready.",
            "We are test the layout since Monday yesterday.",
            "It went tomorrow very good.",
          ],
          correct: 0,
          feedback: {
            spanglish: "¡Correcto! 'Have been testing ... since Monday' comunica duración activa hasta ahora con claridad.",
            en: "Correct! 'Have been testing ... since Monday' clearly communicates ongoing progress.",
          },
        },
        {
          speaker: "Project Lead (Devon)",
          line: "Nice! Can you attend the client demo at 2:00 p.m. tomorrow?",
          goal: {
            spanglish: "Your goal: Explica con cortesía que ya tienes cita médica agendada (Present Continuous) y ofrece alternativa.",
            en: "Your goal: Politely explain you have a scheduled doctor's appointment and offer a First Conditional solution.",
          },
          options: [
            "No, I don't assist meetings at 2:00.",
            "I'm actually seeing the dentist at 2:00, but if we move it to 3:30, I'll happily join!",
            "If I will finish at 2:00, I join maybe.",
          ],
          correct: 1,
          feedback: {
            spanglish: "¡Exacto! Combinaste Present Continuous para citas agendadas ('I'm seeing') + First Conditional ('if we move..., I'll join')!",
            en: "Spot on! You combined Present Continuous for a fixed appointment with a clean First Conditional offer.",
          },
        },
        {
          speaker: "Project Lead (Devon)",
          line: "3:30 works for everyone! Should we send the client a preview link beforehand?",
          goal: {
            spanglish: "Your goal: Da un consejo positivo con 'should' y usa 'on the same page'.",
            en: "Your goal: Agree and give constructive advice using 'should' and 'on the same page'.",
          },
          options: [
            "Definitely—we should send it this afternoon so everyone is on the same page.",
            "Yes, we must to send it for assist them.",
            "No, we shouldn't to do nothing.",
          ],
          correct: 0,
          feedback: {
            spanglish: "¡Excelente! 'We should send it ... so everyone is on the same page' suena profesional y colaborativo.",
            en: "Excellent! Collaborative, idiomatic, and grammatically accurate.",
          },
        },
      ],
    },
  },

  /* ==========================================================================
     LEVEL 5: B2 (b2 — Contramaestre / Bosun · ~85% English Immersion)
     ========================================================================== */
  b2: {
    reading: {
      eyebrow: {
        spanglish: "NEW SECTION 1 · READING & NEWS CAPSULE (BBC / GUARDIAN BRIEFING STYLE)",
        en: "NEW SECTION 1 · READING & NEWS CAPSULE (BBC / GUARDIAN BRIEFING STYLE)",
      },
      title: {
        spanglish: "Editorial Analysis: The Hidden Cost of 'Always-On' Digital Workplaces",
        en: "Editorial Analysis: The Hidden Cost of 'Always-On' Digital Workplaces",
      },
      instruction: {
        spanglish:
          "Instructions (85% English): Listen to or read the editorial below, presta atención a las estructuras de distanciamiento y hedging, then answer all 3 comprehension prompts.",
        en: "Instructions: Listen to or read the editorial below, note the distancing and hedging structures, and answer all 3 comprehension prompts.",
      },
      meta: "B2 Upper-Intermediate Op-Ed · 165 words",
      articleTitle: "Why Instant Replies Rarely Mean Better Work",
      paragraphs: [
        "It is widely assumed that instant messaging tools make modern teams faster and more collaborative. Yet recent organizational studies suggest that constant notifications may actually be fragmenting employees' attention into ten-minute slivers.",
        "Had companies established clear 'quiet hours' when remote chat platforms were first rolled out, engineers and writers might have avoided the expectation of replying within seconds. Instead, workers often feel pressured to stay visibly active online rather than tackling complex problems that require uninterrupted concentration.",
        "On balance, the solution is neither banning chat apps nor ignoring colleagues, but having team norms redesigned around asynchronous updates—reserving urgent pings strictly for genuine emergencies.",
      ],
      glossary: [
        {
          word: "slivers",
          ipa: "/ˈslɪv.ɚz/",
          meaning: {
            spanglish: "fragmentos muy pequeños (tiny narrow pieces of time)",
            en: "very small, narrow pieces or fragments",
          },
        },
        {
          word: "rolled out",
          ipa: "/roʊld aʊt/",
          meaning: {
            spanglish: "lanzado / implementado oficialmente (launched across a company)",
            en: "officially launched or introduced for widespread use",
          },
        },
        {
          word: "on balance",
          ipa: "/ɑːn ˈbæl.əns/",
          meaning: {
            spanglish: "en conjunto / tras sopesar pros y contras (weighing all factors)",
            en: "after weighing all advantages and disadvantages",
          },
        },
        {
          word: "asynchronous",
          ipa: "/eɪˈsɪŋ.krə.nəs/",
          meaning: {
            spanglish: "asíncrono; communication not requiring an immediate real-time reply",
            en: "communication that does not require all participants to respond simultaneously",
          },
        },
      ],
      questions: [
        {
          prompt: {
            spanglish: "Why does the author write 'It is widely assumed that...' in the opening sentence?",
            en: "Why does the author write 'It is widely assumed that...' in the opening sentence?",
          },
          options: [
            "To introduce a common belief objectively before challenging it (impersonal passive)",
            "To prove beyond doubt that chat tools are flawless",
            "To express a personal childhood memory",
          ],
          correct: 0,
          feedback: {
            spanglish: "¡Correcto! — 'It is widely assumed that...' uses an impersonal passive to distance the writer from a common assumption before contrasting it with 'Yet...'.",
            en: "Correct! 'It is widely assumed that...' uses an impersonal passive to distance the writer from a popular belief before contrasting it with 'Yet...'.",
          },
        },
        {
          prompt: {
            spanglish: "What nuance does 'Had companies established clear quiet hours..., engineers might have avoided...' express?",
            en: "What nuance does 'Had companies established clear quiet hours..., engineers might have avoided...' express?",
          },
          options: [
            "A guaranteed future schedule for next Monday",
            "An inverted Third Conditional reflecting on an unrealized past precaution",
            "A habitual routine in the Present Simple",
          ],
          correct: 1,
          feedback: {
            spanglish: "¡Exacto! — 'Had companies established...' (= If companies had established...) reflects on a past opportunity that was missed.",
            en: "Exactly! 'Had companies established...' (= If companies had established...) reflects on an unrealized past precaution.",
          },
        },
        {
          prompt: {
            spanglish: "What balanced solution does the editorial recommend (fíjate en la causativa)?",
            en: "What balanced solution does the editorial recommend?",
          },
          options: [
            "Deleting all workplace messaging software immediately",
            "Replying to every message within thirty seconds",
            "Having team norms redesigned around asynchronous updates",
          ],
          correct: 2,
          feedback: {
            spanglish: "¡Muy bien! — Notice the causative structure 'having team norms redesigned' paired with 'neither... nor'.",
            en: "Well done! Notice the causative structure 'having team norms redesigned' paired with 'neither... nor'.",
          },
        },
      ],
    },
    expressions: {
      eyebrow: {
        spanglish: "NEW SECTION 2 · IDIOMS & SUBTLE FALSE FRIENDS (BBC / CAMBRIDGE STYLE)",
        en: "NEW SECTION 2 · IDIOMS & SUBTLE FALSE FRIENDS (BBC / CAMBRIDGE STYLE)",
      },
      title: {
        spanglish: "B2 Nuanced Idioms & High-Frequency False Friends",
        en: "B2 Nuanced Idioms & High-Frequency False Friends",
      },
      instruction: {
        spanglish:
          "Instructions: Study each B2 expression and subtle false friend (ojo con el matiz frente al español), listen with 🔊, and complete the 4-question check.",
        en: "Instructions: Study each B2 expression and subtle false friend, listen with 🔊, and complete the 4-question check.",
      },
      cards: [
        {
          type: "expression",
          term: "Cut corners",
          ipa: "/kʌt ˈkɔːr.nɚz/",
          trap: {
            spanglish: "💡 Carries a negative connotation in quality/safety discussions.",
            en: "💡 Carries a negative connotation in quality, engineering, and safety discussions.",
          },
          realMeaning: {
            spanglish: "✓ Meaning: Do something the cheapest or fastest way by sacrificing quality (hacerlo a medias / ahorrar mal).",
            en: "✓ Meaning: Do something quickly or cheaply at the expense of quality or rules.",
          },
          example: "If we cut corners on security testing now, we'll pay for it later.",
        },
        {
          type: "expression",
          term: "Play it by ear",
          ipa: "/pleɪ ɪt baɪ ˈɪr/",
          trap: {
            spanglish: "💡 Originally from music; used when plans depend on how things unfold.",
            en: "💡 Originally from music; used when plans depend on how a situation unfolds.",
          },
          realMeaning: {
            spanglish: "✓ Meaning: Decide how to deal with a situation as it develops (improvisar sobre la marcha).",
            en: "✓ Meaning: Decide what to do step by step as events develop, rather than sticking to a fixed plan.",
          },
          example: "We're not sure when the storm will clear, so let's play it by ear this afternoon.",
        },
        {
          type: "falseFriend",
          term: "Compromise",
          ipa: "/ˈkɑːm.prə.maɪz/",
          trap: {
            spanglish: "⚠️ False Friend: Does NOT mean 'obligation / commitment' (compromiso = commitment) or wedding engagement!",
            en: "⚠️ False Friend: Does NOT mean 'personal commitment/dedication' (use 'commitment') or 'engagement'.",
          },
          realMeaning: {
            spanglish: "✓ Meaning: A mutual middle-ground agreement where both sides concede something (acuerdo mutuo / punto medio).",
            en: "✓ Meaning: An agreement reached by each side making concessions.",
          },
          example: "After a long negotiation, both teams reached a fair compromise on the budget.",
        },
        {
          type: "falseFriend",
          term: "Sympathetic",
          ipa: "/ˌsɪm.pəˈθet̬.ɪk/",
          trap: {
            spanglish: "⚠️ False Friend: Does NOT mean 'friendly / charming' (simpático = friendly, likable, nice).",
            en: "⚠️ False Friend: Does NOT mean generally 'friendly or charming' (use 'friendly' or 'likable').",
          },
          realMeaning: {
            spanglish: "✓ Meaning: Showing compassion and understanding when someone is going through a hard time (compasivo / comprensivo).",
            en: "✓ Meaning: Caring and compassionate toward someone experiencing hardship.",
          },
          example: "Her manager was very sympathetic when she needed time off for a family emergency.",
        },
      ],
      quiz: [
        {
          prompt: {
            spanglish: "Selecciona / Select the sentence that expresses strong dedication to a project ('compromiso'):",
            en: "Select the sentence that expresses strong dedication to a project:",
          },
          options: [
            "We really admire her commitment to quality.",
            "We really admire her compromise to quality.",
            "She cut corners to quality.",
          ],
          correct: 0,
          feedback: {
            spanglish: "¡Correcto! — 'Commitment' means dedication/obligation; 'compromise' means meeting halfway in a negotiation.",
            en: "Correct! 'Commitment' means dedication; 'compromise' means mutual concession.",
          },
        },
        {
          prompt: {
            spanglish: "The contractor used cheap materials and skipped inspections. What did they do?",
            en: "The contractor used cheap materials and skipped safety inspections. What did they do?",
          },
          options: [
            "They cut corners on safety.",
            "They were very sympathetic.",
            "They attended a folder.",
          ],
          correct: 0,
          feedback: {
            spanglish: "¡Exacto! — 'Cut corners' means skipping proper steps to save time or money.",
            en: "Exactly! 'Cut corners' means sacrificing standards to save time or money.",
          },
        },
        {
          prompt: {
            spanglish: "Your coworker suffered a minor injury, and the team showed genuine care and compassion:",
            en: "Your coworker suffered an injury, and the team showed genuine care and compassion:",
          },
          options: [
            "Everyone was really sympathetic and offered to cover his shifts.",
            "Everyone cut corners on his shifts.",
            "Everyone was embarrassed by the weather.",
          ],
          correct: 0,
          feedback: {
            spanglish: "¡Muy bien! — 'Sympathetic' specifically conveys compassion during someone's difficulty.",
            en: "Well done! 'Sympathetic' specifically conveys compassion during someone's difficulty.",
          },
        },
        {
          prompt: {
            spanglish: "Flight delays might change your arrival time, so you don't want a rigid dinner reservation:",
            en: "Flight delays might change your arrival time, so you prefer a flexible evening plan:",
          },
          options: [
            "Let's not book a strict table—let's just play it by ear when I land.",
            "Let's cut corners when I land.",
            "Let's reach a sympathetic carpet.",
          ],
          correct: 0,
          feedback: {
            spanglish: "¡Excelente! — 'Play it by ear' fits flexible, real-time decision-making.",
            en: "Excellent! 'Play it by ear' is ideal for flexible plans.",
          },
        },
      ],
    },
    roleplay: {
      eyebrow: {
        spanglish: "NEW SECTION 3 · DIPLOMATIC ROLEPLAY (BBC ENGLISH AT WORK STYLE)",
        en: "NEW SECTION 3 · DIPLOMATIC ROLEPLAY (BBC ENGLISH AT WORK STYLE)",
      },
      title: {
        spanglish: "B2 Roleplay: Negotiating a Realistic Deadline Without Cutting Corners",
        en: "B2 Roleplay: Negotiating a Realistic Deadline Without Cutting Corners",
      },
      instruction: {
        spanglish:
          "Instructions: Listen to the client stakeholder with 🔊 and choose the most diplomatic US workplace reply (usando hedging y B2 conditionals).",
        en: "Instructions: Listen to the client stakeholder with 🔊 and choose the most diplomatic US workplace reply using hedging and B2 conditionals.",
      },
      scenarioBadge: {
        spanglish: "🤝 Scenario: Client Scope & Deadline Negotiation",
        en: "🤝 Scenario: Client Scope & Deadline Negotiation",
      },
      turns: [
        {
          speaker: "Client Director (Nolan)",
          line: "We'd love to add two extra analytics dashboards and still launch everything this Friday. Is that doable?",
          goal: {
            spanglish: "Your goal: Push back diplomatically (hedging) explaining that rushing by Friday would sacrifice quality.",
            en: "Your goal: Push back diplomatically using hedging and explain the risk to quality.",
          },
          options: [
            "No, that's impossible. You asked too late.",
            "I see how valuable those dashboards would be; however, launching both by Friday would force us to cut corners on testing.",
            "If we will launch Friday, everything breaks.",
          ],
          correct: 1,
          feedback: {
            spanglish: "¡Correcto! — Acknowledge value first ('I see how valuable...'), then reframe diplomatically with 'however' and 'would'.",
            en: "Correct! Acknowledging the client's goal before introducing the trade-off is classic US diplomatic hedging.",
          },
        },
        {
          speaker: "Client Director (Nolan)",
          line: "Fair point—we definitely don't want bugs on launch day. What compromise would you suggest?",
          goal: {
            spanglish: "Your goal: Propose a phased compromise using a Second Conditional structure.",
            en: "Your goal: Propose a phased compromise using a clean Second Conditional.",
          },
          options: [
            "If we launched the core platform this Friday and rolled out the two extra dashboards next Wednesday, we could guarantee full QA.",
            "If we would launch Friday, we will do the rest someday.",
            "You should have told us last month.",
          ],
          correct: 0,
          feedback: {
            spanglish: "¡Exacto! — 'If we launched..., we could guarantee...' frames a win-win compromise smoothly.",
            en: "Spot on! 'If we launched..., we could guarantee...' frames a clear, constructive compromise.",
          },
        },
        {
          speaker: "Client Director (Nolan)",
          line: "Phasing it like that makes total sense. Could you send over a revised schedule this afternoon?",
          goal: {
            spanglish: "Your goal: Confirm professionally using 'look forward to + -ing' or a causative confirmation.",
            en: "Your goal: Confirm professionally using accurate B2 gerund/preposition syntax.",
          },
          options: [
            "Absolutely—I'll have the updated timeline sent over by 4:00 p.m., and I look forward to reviewing it with you.",
            "Sure, I look forward to review it with you.",
            "Yes, I'll assist the calendar.",
          ],
          correct: 0,
          feedback: {
            spanglish: "¡Excelente! — You combined causative ('have the timeline sent over') + 'look forward to reviewing' flawlessly.",
            en: "Excellent! You combined causative syntax with 'look forward to reviewing' seamlessly.",
          },
        },
      ],
    },
  },

  /* ==========================================================================
     LEVEL 6: C1 (c1 — Navegante / Navigator · 100% Full English Immersion)
     ========================================================================== */
  c1: {
    reading: {
      eyebrow: {
        spanglish: "NEW SECTION 1 · ADVANCED READING & BRIEFING (CAMBRIDGE / ECONOMIST STYLE)",
        en: "NEW SECTION 1 · ADVANCED READING & BRIEFING (CAMBRIDGE / ECONOMIST STYLE)",
      },
      title: {
        spanglish: "Policy Briefing: Urban Micro-Transit and the Paradox of Induced Demand",
        en: "Policy Briefing: Urban Micro-Transit and the Paradox of Induced Demand",
      },
      instruction: {
        spanglish:
          "C1 Immersion Instructions (100% English): Read or play the briefing aloud, examine the stylistic inversions, cleft structures, and nominalizations, then complete all 3 analytical questions.",
        en: "C1 Immersion Instructions (100% English): Read or play the briefing aloud, examine the stylistic inversions, cleft structures, and nominalizations, then complete all 3 analytical questions.",
      },
      meta: "C1 Analytical Policy Briefing · 185 words",
      articleTitle: "Why Wider Highways Rarely Cure Congestion",
      paragraphs: [
        "Rarely has an urban planning intuition proved harder to dislodge than the belief that adding highway lanes eliminates traffic jams. For decades, metropolitan authorities invested billions in road expansion, only to witness rush-hour speeds return to their previous crawl within five years.",
        "What transportation economists call 'induced demand' explains this apparent paradox: no sooner does road capacity expand than commuters who previously carpooled, took rail transit, or traveled off-peak gravitate back onto the highway.",
        "Cities that have achieved lasting reductions in congestion have instead prioritized dedicated bus corridors, protected cycling networks, and congestion pricing. Not only do such measures move far more people per square meter, but they also revitalize neighborhood commerce by reclaiming street space from bumper-to-bumper traffic.",
      ],
      glossary: [
        {
          word: "dislodge",
          ipa: "/dɪsˈlɑːdʒ/",
          meaning: {
            spanglish: "remove or shift an entrenched idea or object from its fixed position",
            en: "remove or shift an entrenched idea or object from its fixed position",
          },
        },
        {
          word: "induced demand",
          ipa: "/ɪnˈduːst dɪˈmænd/",
          meaning: {
            spanglish: "economic phenomenon in which increasing supply attracts latent consumption",
            en: "economic phenomenon in which increasing supply attracts latent consumption",
          },
        },
        {
          word: "off-peak",
          ipa: "/ˌɔːfˈpiːk/",
          meaning: {
            spanglish: "outside the busiest, highest-traffic hours of the day",
            en: "outside the busiest, highest-traffic hours of the day",
          },
        },
        {
          word: "reclaiming",
          ipa: "/rɪˈkleɪm.ɪŋ/",
          meaning: {
            spanglish: "recovering space or resources for a more productive public purpose",
            en: "recovering space or resources for a more productive public purpose",
          },
        },
      ],
      questions: [
        {
          prompt: {
            spanglish: "Why does the opening sentence invert the auxiliary ('Rarely has an urban planning intuition proved...')?",
            en: "Why does the opening sentence invert the auxiliary ('Rarely has an urban planning intuition proved...')?",
          },
          options: [
            "Negative/restrictive adverbials placed at the front require subject-auxiliary inversion for rhetorical emphasis",
            "It is a typographical question missing a question mark",
            "It expresses an informal spoken imperative",
          ],
          correct: 0,
          feedback: {
            spanglish: "Correct! Fronting a restrictive adverbial ('Rarely', 'No sooner', 'Not only') triggers subject-auxiliary inversion in formal C1 prose.",
            en: "Correct! Fronting a restrictive adverbial ('Rarely', 'No sooner', 'Not only') triggers subject-auxiliary inversion in formal C1 prose.",
          },
        },
        {
          prompt: {
            spanglish: "What syntactic device is 'What transportation economists call induced demand explains this apparent paradox'?",
            en: "What syntactic device is 'What transportation economists call induced demand explains this apparent paradox'?",
          },
          options: [
            "A Wh-cleft / nominal relative clause focusing attention on the core explanatory concept",
            "A dangling participle clause",
            "A zero conditional",
          ],
          correct: 0,
          feedback: {
            spanglish: "Spot on! Fronting a Wh-clause ('What economists call...') packages complex information as the grammatical subject for sharp discourse focus.",
            en: "Spot on! Fronting a Wh-clause ('What economists call...') packages complex information as the grammatical subject for sharp discourse focus.",
          },
        },
        {
          prompt: {
            spanglish: "According to the briefing, why does highway expansion fail to solve congestion long-term?",
            en: "According to the briefing, why does highway expansion fail to solve congestion long-term?",
          },
          options: [
            "Construction crews permanently close half the lanes",
            "Expanded capacity draws latent drivers off transit and off-peak schedules back onto the road",
            "Commuters refuse to drive on newly paved asphalt",
          ],
          correct: 1,
          feedback: {
            spanglish: "Exactly! 'No sooner does road capacity expand than commuters ... gravitate back onto the highway.'",
            en: "Exactly! 'No sooner does road capacity expand than commuters ... gravitate back onto the highway.'",
          },
        },
      ],
    },
    expressions: {
      eyebrow: {
        spanglish: "NEW SECTION 2 · ADVANCED IDIOMS & DECEPTIVE COGNATES (CAMBRIDGE C1 STYLE)",
        en: "NEW SECTION 2 · ADVANCED IDIOMS & DECEPTIVE COGNATES (CAMBRIDGE C1 STYLE)",
      },
      title: {
        spanglish: "C1 Executive Idioms & High-Level Cognate Traps",
        en: "C1 Executive Idioms & High-Level Cognate Traps",
      },
      instruction: {
        spanglish:
          "Instructions (100% English): Examine the pragmatic nuance and connotation of each C1 expression and deceptive cognate, play the audio examples, and complete the 4-item precision check.",
        en: "Instructions (100% English): Examine the pragmatic nuance and connotation of each C1 expression and deceptive cognate, play the audio examples, and complete the 4-item precision check.",
      },
      cards: [
        {
          type: "expression",
          term: "Read between the lines",
          ipa: "/riːd bɪˈtwiːn ðə laɪnz/",
          trap: {
            spanglish: "💡 Essential when interpreting diplomatic emails, press releases, or understated feedback.",
            en: "💡 Essential when interpreting diplomatic emails, press releases, or understated feedback.",
          },
          realMeaning: {
            spanglish: "✓ Meaning: Discern an unstated, implicit attitude or message beneath polite surface wording.",
            en: "✓ Meaning: Discern an unstated, implicit attitude or message beneath polite surface wording.",
          },
          example: "The CFO's memo sounded upbeat, but if you read between the lines, hiring will freeze next quarter.",
        },
        {
          type: "expression",
          term: "Play devil's advocate",
          ipa: "/pleɪ ˈdev.əlz ˈæd.və.kət/",
          trap: {
            spanglish: "💡 Signals constructive stress-testing of an idea without personal hostility.",
            en: "💡 Signals constructive stress-testing of an idea without personal hostility.",
          },
          realMeaning: {
            spanglish: "✓ Meaning: Argue against a proposal deliberately in order to expose weaknesses and test its strength.",
            en: "✓ Meaning: Argue against a proposal deliberately in order to expose weaknesses and test its strength.",
          },
          example: "Just to play devil's advocate for a moment—what happens if our primary supplier misses the Q3 quota?",
        },
        {
          type: "falseFriend",
          term: "Comprehensive",
          ipa: "/ˌkɑːm.prəˈhen.sɪv/",
          trap: {
            spanglish: "⚠️ Cognate Trap: Does NOT mean 'empathetic or understanding toward people' (use 'understanding' or 'empathetic').",
            en: "⚠️ Cognate Trap: Does NOT mean 'empathetic or understanding toward people' (use 'understanding' or 'empathetic').",
          },
          realMeaning: {
            spanglish: "✓ Meaning: Thorough, exhaustive, covering nearly all aspects of a subject.",
            en: "✓ Meaning: Thorough, exhaustive, covering nearly all aspects of a subject.",
          },
          example: "The audit team submitted a comprehensive 60-page review of our supply chain.",
        },
        {
          type: "falseFriend",
          term: "Notorious",
          ipa: "/noʊˈtɔːr.i.əs/",
          trap: {
            spanglish: "⚠️ Connotation Trap: Does NOT mean 'notable, prominent, or prestigious'—it carries a strictly negative connotation!",
            en: "⚠️ Connotation Trap: Does NOT mean 'notable, prominent, or prestigious'—it carries a strictly negative connotation!",
          },
          realMeaning: {
            spanglish: "✓ Meaning: Famous or well-known specifically for something bad, flawed, or unfavorable (= infamous).",
            en: "✓ Meaning: Famous or well-known specifically for something bad, flawed, or unfavorable (= infamous).",
          },
          example: "That mountain pass is notorious for sudden whiteout blizzards in November.",
        },
      ],
      quiz: [
        {
          prompt: {
            spanglish: "You want to praise a keynote speaker as 'prominent and widely respected'. Which adjective is appropriate?",
            en: "You want to praise a keynote speaker as 'prominent and widely respected'. Which adjective is appropriate?",
          },
          options: [
            "She is a renowned researcher in renewable storage.",
            "She is a notorious researcher in renewable storage.",
            "She is a comprehensive researcher toward her students.",
          ],
          correct: 0,
          feedback: {
            spanglish: "Correct! 'Renowned' or 'prominent' praises reputation; calling a scholar 'notorious' implies scandal or misconduct.",
            en: "Correct! 'Renowned' or 'prominent' praises reputation; calling a scholar 'notorious' implies scandal or misconduct.",
          },
        },
        {
          prompt: {
            spanglish: "Which sentence uses 'comprehensive' with accurate C1 collocation?",
            en: "Which sentence uses 'comprehensive' with accurate C1 collocation?",
          },
          options: [
            "My supervisor was very comprehensive when I caught the flu.",
            "The report provides a comprehensive overview of regulatory risks.",
            "Please be comprehensive with the new intern's mistakes.",
          ],
          correct: 1,
          feedback: {
            spanglish: "Spot on! 'A comprehensive overview / audit / study' means thorough and complete.",
            en: "Spot on! 'A comprehensive overview / audit / study' means thorough and complete.",
          },
        },
        {
          prompt: {
            spanglish: "In a strategy meeting, you agree with the team's goal, yet want to test a potential risk politely:",
            en: "In a strategy meeting, you agree with the team's goal, yet want to test a potential risk politely:",
          },
          options: [
            "Let me play devil's advocate here: how resilient is this forecast if interest rates rise?",
            "Let me be notorious here: your forecast is wrong.",
            "Let's cut corners between the lines.",
          ],
          correct: 0,
          feedback: {
            spanglish: "Excellent! 'Let me play devil's advocate...' depersonalizes critique and invites analytical rigor.",
            en: "Excellent! 'Let me play devil's advocate...' depersonalizes critique and invites analytical rigor.",
          },
        },
        {
          prompt: {
            spanglish: "A vendor writes, 'While we remain enthusiastic about our partnership, Q4 capacity is tightly constrained.' What should you do?",
            en: "A vendor writes, 'While we remain enthusiastic about our partnership, Q4 capacity is tightly constrained.' What should you do?",
          },
          options: [
            "Read between the lines—they are signaling they likely cannot take on extra Q4 orders.",
            "Assume they have unlimited staff available immediately.",
            "Praise their notorious punctuality.",
          ],
          correct: 0,
          feedback: {
            spanglish: "Exactly! Reading between the lines catches diplomatic corporate understatement.",
            en: "Exactly! Reading between the lines catches diplomatic corporate understatement.",
          },
        },
      ],
    },
    roleplay: {
      eyebrow: {
        spanglish: "NEW SECTION 3 · EXECUTIVE ROLEPLAY (CAMBRIDGE / FT BUSINESS ENGLISH STYLE)",
        en: "NEW SECTION 3 · EXECUTIVE ROLEPLAY (CAMBRIDGE / FT BUSINESS ENGLISH STYLE)",
      },
      title: {
        spanglish: "C1 Roleplay: Leading a Blameless Post-Mortem After an Outage",
        en: "C1 Roleplay: Leading a Blameless Post-Mortem After an Outage",
      },
      instruction: {
        spanglish:
          "Instructions (100% English): Listen to each stakeholder prompt and select the response demonstrating C1 register control, nominalization, and constructive hedging.",
        en: "Instructions (100% English): Listen to each stakeholder prompt and select the response demonstrating C1 register control, nominalization, and constructive hedging.",
      },
      scenarioBadge: {
        spanglish: "📊 Scenario: Cross-Functional Architecture Post-Mortem",
        en: "📊 Scenario: Cross-Functional Architecture Post-Mortem",
      },
      turns: [
        {
          speaker: "VP of Operations (Marcus)",
          line: "Walk us through yesterday's twenty-minute checkout outage. Who dropped the ball on the database migration?",
          goal: {
            spanglish: "Your goal: Reframe away from personal blame toward systemic process using nominalization and impersonal structure.",
            en: "Your goal: Reframe away from personal blame toward systemic process using nominalization and impersonal structure.",
          },
          options: [
            "Sam forgot to check the script, so it's Sam's fault.",
            "Rather than a single individual's oversight, the outage stemmed from a gap in our automated pre-deployment validation.",
            "Nobody knows nothing about why it crashed.",
          ],
          correct: 1,
          feedback: {
            spanglish: "Correct! Nominalizations ('oversight', 'validation') and 'stemmed from a gap' keep the post-mortem objective and constructive.",
            en: "Correct! Nominalizations ('oversight', 'validation') and 'stemmed from a gap' keep the post-mortem objective and constructive.",
          },
        },
        {
          speaker: "VP of Operations (Marcus)",
          line: "Understood. Could we have caught that configuration mismatch earlier in staging?",
          goal: {
            spanglish: "Your goal: Use an inverted conditional ('Had our staging environment mirrored...') to explain how recurrence will be prevented.",
            en: "Your goal: Use an inverted conditional ('Had our staging environment mirrored...') to explain how recurrence will be prevented.",
          },
          options: [
            "Had our staging environment mirrored production traffic volumes, the bottleneck would have surfaced immediately—which we are configuring today.",
            "If it mirrored yesterday, we will catch it.",
            "Yes, we must to have seen it.",
          ],
          correct: 0,
          feedback: {
            spanglish: "Spot on! 'Had our staging environment mirrored..., the bottleneck would have surfaced' pairs C1 precision with immediate ownership.",
            en: "Spot on! 'Had our staging environment mirrored..., the bottleneck would have surfaced' pairs C1 precision with immediate ownership.",
          },
        },
        {
          speaker: "VP of Operations (Marcus)",
          line: "Good. What should we communicate to enterprise clients who experienced failed transactions?",
          goal: {
            spanglish: "Your goal: Recommend transparent outreach using a Wh-cleft and precise reporting/hedging.",
            en: "Your goal: Recommend transparent outreach using a Wh-cleft and precise C1 phrasing.",
          },
          options: [
            "Tell them nothing happened.",
            "What I'd recommend is issuing a concise root-cause summary alongside proactive SLA credits by noon.",
            "I regret telling you we failed forever.",
          ],
          correct: 1,
          feedback: {
            spanglish: "Excellent! 'What I'd recommend is issuing...' uses a Wh-cleft to focus executive action cleanly and diplomatically.",
            en: "Excellent! 'What I'd recommend is issuing...' uses a Wh-cleft to focus executive action cleanly and diplomatically.",
          },
        },
      ],
    },
  },

  /* ==========================================================================
     LEVEL 7: C2 (c2 — Capitán / Captain · 100% Full English Mastery)
     ========================================================================== */
  c2: {
    reading: {
      eyebrow: {
        spanglish: "NEW SECTION 1 · MASTERY ESSAY & CRITIQUE (NEW YORKER / ATLANTIC STYLE)",
        en: "NEW SECTION 1 · MASTERY ESSAY & CRITIQUE (NEW YORKER / ATLANTIC STYLE)",
      },
      title: {
        spanglish: "Critical Essay: The Illusion of Frictionless Fluency in the Algorithmic Age",
        en: "Critical Essay: The Illusion of Frictionless Fluency in the Algorithmic Age",
      },
      instruction: {
        spanglish:
          "C2 Mastery Instructions (100% English): Listen to or read the critical excerpt, attending to absolute constructions, mandative subjunctive, and rhetorical understatement, then answer all 3 mastery questions.",
        en: "C2 Mastery Instructions (100% English): Listen to or read the critical excerpt, attending to absolute constructions, mandative subjunctive, and rhetorical understatement, then answer all 3 mastery questions.",
      },
      meta: "C2 Mastery Essay Excerpt · 205 words",
      articleTitle: "In Praise of Productive Cognitive Friction",
      paragraphs: [
        "Every interface in contemporary life seems engineered to abolish hesitation: predictive keyboards finish our clauses before we have quite weighed their candor, and summaries arrive stripped of the very ambiguities that made the original argument worth grappling with.",
        "Convenient though such frictionless prose may be for routine correspondence, seldom does genuine insight emerge without a measure of intellectual resistance. Their rough edges polished away by templates, corporate memos increasingly read as though nobody in particular wrote them—and nobody in particular is accountable for what they imply.",
        "Were educators and leaders to insist that high-stakes deliberation remain unhurried—that a writer wrestle with competing premises rather than outsource nuance—public discourse might yet recover some of its rigor and unmistakable human voice.",
      ],
      glossary: [
        {
          word: "candor",
          ipa: "/ˈkæn.dɚ/",
          meaning: {
            spanglish: "frankness, open honesty, and unguarded sincerity in expression",
            en: "frankness, open honesty, and unguarded sincerity in expression",
          },
        },
        {
          word: "grappling with",
          ipa: "/ˈɡræp.lɪŋ wɪð/",
          meaning: {
            spanglish: "wrestling intellectually with a complex or stubborn problem",
            en: "wrestling intellectually with a complex or stubborn problem",
          },
        },
        {
          word: "frictionless",
          ipa: "/ˈfrɪk.ʃən.ləs/",
          meaning: {
            spanglish: "effortless and smooth to the point of removing deliberate thought or pause",
            en: "effortless and smooth to the point of removing deliberate thought or pause",
          },
        },
        {
          word: "deliberation",
          ipa: "/dɪˌlɪb.əˈreɪ.ʃən/",
          meaning: {
            spanglish: "careful, unhurried consideration before reaching a weighty judgment",
            en: "careful, unhurried consideration before reaching a weighty judgment",
          },
        },
      ],
      questions: [
        {
          prompt: {
            spanglish: "Identify the two advanced C2 structures combined in Paragraph 2 ('Convenient though such frictionless prose may be..., seldom does genuine insight emerge...'):",
            en: "Identify the two advanced C2 structures combined in Paragraph 2 ('Convenient though such frictionless prose may be..., seldom does genuine insight emerge...'):",
          },
          options: [
            "Adjective fronting with concessive 'though' + negative-adverbial inversion ('seldom does...')",
            "Colloquial ellipsis + imperative tag",
            "Past Continuous backgrounding + zero article",
          ],
          correct: 0,
          feedback: {
            spanglish: "Masterful! Fronting the predicative adjective before 'though' ('Convenient though X may be') paired with 'seldom does...' creates classic C2 rhetorical balance.",
            en: "Masterful! Fronting the predicative adjective before 'though' ('Convenient though X may be') paired with 'seldom does...' creates classic C2 rhetorical balance.",
          },
        },
        {
          prompt: {
            spanglish: "What grammatical construction is 'Their rough edges polished away by templates, corporate memos increasingly read...'?",
            en: "What grammatical construction is 'Their rough edges polished away by templates, corporate memos increasingly read...'?",
          },
          options: [
            "An absolute phrase (noun phrase + past participle) supplying compact causal/circumstantial framing",
            "A mandative subjunctive clause",
            "A fused relative clause",
          ],
          correct: 0,
          feedback: {
            spanglish: "Exact! An absolute construction has its own overt subject ('Their rough edges') plus a non-finite participle ('polished away'), compressing an entire subordinate clause.",
            en: "Exact! An absolute construction has its own overt subject ('Their rough edges') plus a non-finite participle ('polished away'), compressing an entire subordinate clause.",
          },
        },
        {
          prompt: {
            spanglish: "In Paragraph 3, why are 'remain' and 'wrestle' uninflected after 'insist that high-stakes deliberation remain... —that a writer wrestle...'?",
            en: "In Paragraph 3, why are 'remain' and 'wrestle' uninflected after 'insist that high-stakes deliberation remain... —that a writer wrestle...'?",
          },
          options: [
            "They are mandative subjunctives governed by 'insist that', preceded by a formal inverted hypothetical ('Were educators... to insist')",
            "Both nouns are plural in British English",
            "They represent informal spoken ellipsis of 'will'",
          ],
          correct: 0,
          feedback: {
            spanglish: "Spot on! 'Were X to insist that Y remain / that a writer wrestle' layers formal conditional inversion with parallel mandative subjunctives.",
            en: "Spot on! 'Were X to insist that Y remain / that a writer wrestle' layers formal conditional inversion with parallel mandative subjunctives.",
          },
        },
      ],
    },
    expressions: {
      eyebrow: {
        spanglish: "NEW SECTION 2 · NEAR-NATIVE IDIOMS & LEXICAL PRECISION (CAMBRIDGE C2 STYLE)",
        en: "NEW SECTION 2 · NEAR-NATIVE IDIOMS & LEXICAL PRECISION (CAMBRIDGE C2 STYLE)",
      },
      title: {
        spanglish: "C2 Rhetorical Idioms & Subtle Lexical Distinctions",
        en: "C2 Rhetorical Idioms & Subtle Lexical Distinctions",
      },
      instruction: {
        spanglish:
          "Instructions (100% English): Study these C2 rhetorical expressions and fine-grained usage distinctions that even proficient speakers frequently conflate, then complete the 4-question mastery check.",
        en: "Instructions (100% English): Study these C2 rhetorical expressions and fine-grained usage distinctions that even proficient speakers frequently conflate, then complete the 4-question mastery check.",
      },
      cards: [
        {
          type: "expression",
          term: "Move the goalposts",
          ipa: "/muːv ðə ˈɡoʊl.poʊsts/",
          trap: {
            spanglish: "💡 Used in governance, law, and negotiations to critique unfair rule changes mid-process.",
            en: "💡 Used in governance, law, and negotiations to critique unfair rule changes mid-process.",
          },
          realMeaning: {
            spanglish: "✓ Meaning: Unfairly alter the criteria or targets of an agreement after the other party has already met the original ones.",
            en: "✓ Meaning: Unfairly alter the criteria or targets of an agreement after the other party has already met the original ones.",
          },
          example: "Every time the engineering team hits the latency benchmark, the committee moves the goalposts.",
        },
        {
          type: "expression",
          term: "Damning with faint praise",
          ipa: "/ˈdæm.ɪŋ wɪð feɪnt preɪz/",
          trap: {
            spanglish: "💡 Classic pragmatic understatement: complimenting something so lukewarmly that it signals disapproval.",
            en: "💡 Classic pragmatic understatement: complimenting something so lukewarmly that it signals disapproval.",
          },
          realMeaning: {
            spanglish: "✓ Meaning: Praise someone or something so minimally or trivially that the remark functions as covert criticism.",
            en: "✓ Meaning: Praise someone or something so minimally or trivially that the remark functions as covert criticism.",
          },
          example: "Calling a 400-page biography 'remarkably free of typos' is damning it with faint praise.",
        },
        {
          type: "falseFriend",
          term: "Disinterested vs. Uninterested",
          ipa: "/dɪsˈɪn.trə.stɪd/",
          trap: {
            spanglish: "⚠️ Precision Trap: In rigorous C2 usage, 'disinterested' does NOT mean 'bored' (that is 'uninterested').",
            en: "⚠️ Precision Trap: In rigorous C2 usage, 'disinterested' does NOT mean 'bored' (that is 'uninterested').",
          },
          realMeaning: {
            spanglish: "✓ Meaning: Impartial, unbiased, having no personal financial or emotional stake in the outcome.",
            en: "✓ Meaning: Impartial, unbiased, having no personal financial or emotional stake in the outcome.",
          },
          example: "Because neither arbitrator held shares in the firm, the panel rendered a genuinely disinterested verdict.",
        },
        {
          type: "falseFriend",
          term: "Ostensibly",
          ipa: "/ɑːˈsten.sə.bli/",
          trap: {
            spanglish: "⚠️ Subtle Cognate Trap: Does NOT mean 'visibly / noticeably / ostentatiously' (unlike Spanish 'ostensiblemente'!).",
            en: "⚠️ Subtle Cognate Trap: Does NOT mean 'visibly / noticeably'—it signals skepticism about the stated motive!",
          },
          realMeaning: {
            spanglish: "✓ Meaning: Outwardly or officially stated to be true, though an unspoken ulterior motive likely exists.",
            en: "✓ Meaning: Outwardly or officially stated to be true, though an unspoken ulterior motive likely exists.",
          },
          example: "He resigned ostensibly to spend more time consulting, though insiders cited a boardroom rift.",
        },
      ],
      quiz: [
        {
          prompt: {
            spanglish: "A regulator must have zero financial stake in the companies it audits. Which phrasing is precise?",
            en: "A regulator must have zero financial stake in the companies it audits. Which phrasing is precise?",
          },
          options: [
            "Oversight requires a strictly disinterested third-party auditor.",
            "Oversight requires a strictly uninterested third-party auditor who ignores the files.",
            "Oversight requires a notorious auditor.",
          ],
          correct: 0,
          feedback: {
            spanglish: "Correct! 'Disinterested' means impartial and free from conflict of interest; 'uninterested' means bored or indifferent.",
            en: "Correct! 'Disinterested' means impartial and free from conflict of interest; 'uninterested' means bored or indifferent.",
          },
        },
        {
          prompt: {
            spanglish: "Which sentence uses 'ostensibly' with idiomatic C2 skepticism?",
            en: "Which sentence uses 'ostensibly' with idiomatic C2 skepticism?",
          },
          options: [
            "Sales grew ostensibly by 40% thanks to everyone's hard work!",
            "The summit was convened ostensibly to harmonize standards, yet its real aim was delaying tariffs.",
            "She wore an ostensibly bright yellow coat in the rain.",
          ],
          correct: 1,
          feedback: {
            spanglish: "Spot on! 'Ostensibly' contrasts the official surface pretext with a deeper underlying reality.",
            en: "Spot on! 'Ostensibly' contrasts the official surface pretext with a deeper underlying reality.",
          },
        },
        {
          prompt: {
            spanglish: "Asked whether a candidate should be promoted to partner, a director replies only: 'Well, he certainly arrives on time.' Pragmatically, this is:",
            en: "Asked whether a candidate should be promoted to partner, a director replies only: 'Well, he certainly arrives on time.' Pragmatically, this is:",
          },
          options: [
            "Damning with faint praise (conversational implicature signaling inadequacy)",
            "Wholehearted endorsement",
            "Mandative subjunctive",
          ],
          correct: 0,
          feedback: {
            spanglish: "Exact! Highlighting only trivial punctuality when asked about executive leadership implicates that stronger qualifications are lacking.",
            en: "Exact! Highlighting only trivial punctuality when asked about executive leadership implicates that stronger qualifications are lacking.",
          },
        },
        {
          prompt: {
            spanglish: "After your team met every agreed milestone, the buyer suddenly demanded three uncontracted certifications before paying:",
            en: "After your team met every agreed milestone, the buyer suddenly demanded three uncontracted certifications before paying:",
          },
          options: [
            "With respect, introducing new prerequisites at sign-off amounts to moving the goalposts.",
            "With respect, you are playing it by ear sympathetically.",
            "Let's grab a bite on the carpet.",
          ],
          correct: 0,
          feedback: {
            spanglish: "Masterful! 'Amounts to moving the goalposts' names the unfair shift firmly while maintaining composed register.",
            en: "Masterful! 'Amounts to moving the goalposts' names the unfair shift firmly while maintaining composed register.",
          },
        },
      ],
    },
    roleplay: {
      eyebrow: {
        spanglish: "NEW SECTION 3 · BOARDROOM PRAGMATICS ROLEPLAY (C2 MASTERY)",
        en: "NEW SECTION 3 · BOARDROOM PRAGMATICS ROLEPLAY (C2 MASTERY)",
      },
      title: {
        spanglish: "C2 Roleplay: Navigating Boardroom Pushback, Implicature & Register",
        en: "C2 Roleplay: Navigating Boardroom Pushback, Implicature & Register",
      },
      instruction: {
        spanglish:
          "Instructions (100% English): Listen to the board chair's remarks, decode the pragmatic subtext, and choose the response that commands C2 diplomacy, subjunctive precision, and register authority.",
        en: "Instructions (100% English): Listen to the board chair's remarks, decode the pragmatic subtext, and choose the response that commands C2 diplomacy, subjunctive precision, and register authority.",
      },
      scenarioBadge: {
        spanglish: "🏛️ Scenario: Quarterly Board Governance Review",
        en: "🏛️ Scenario: Quarterly Board Governance Review",
      },
      turns: [
        {
          speaker: "Board Chair (Claire)",
          line: "Your expansion proposal is certainly... ambitious, given how eventful our last two quarters have been.",
          goal: {
            spanglish: "Your goal: Decode her understatement ('ambitious' / 'eventful' = risky after recent turbulence) and acknowledge the concern with concessive elegance.",
            en: "Your goal: Decode her understatement ('ambitious' / 'eventful' = risky after recent turbulence) and acknowledge the concern with concessive elegance.",
          },
          options: [
            "Thanks! I'm glad you love how ambitious it is!",
            "Ambitious though the timeline may appear at first glance, we have ring-fenced the capital exposure so core operations remain insulated.",
            "Last quarter wasn't my fault anyway.",
          ],
          correct: 1,
          feedback: {
            spanglish: "Masterful! You caught the polite skepticism behind 'certainly... ambitious' and answered with concessive fronting ('Ambitious though... may appear').",
            en: "Masterful! You caught the polite skepticism behind 'certainly... ambitious' and answered with concessive fronting ('Ambitious though... may appear').",
          },
        },
        {
          speaker: "Board Chair (Claire)",
          line: "That ring-fencing helps. Still, several members worry that an internal steering group might be overly optimistic when auditing its own milestones.",
          goal: {
            spanglish: "Your goal: Propose an impartial ('disinterested') review mechanism using the formal mandative subjunctive.",
            en: "Your goal: Propose an impartial ('disinterested') review mechanism using the formal mandative subjunctive.",
          },
          options: [
            "To address that concern, we propose that a disinterested external auditor review each milestone before tranche two is released.",
            "We propose that an uninterested friend reviews it.",
            "Don't worry, we are very sympathetic with milestones.",
          ],
          correct: 0,
          feedback: {
            spanglish: "Spot on! 'Propose that a disinterested external auditor review...' deploys both lexical precision ('disinterested') and mandative subjunctive ('review').",
            en: "Spot on! 'Propose that a disinterested external auditor review...' deploys both lexical precision ('disinterested') and mandative subjunctive ('review').",
          },
        },
        {
          speaker: "Board Chair (Claire)",
          line: "With an independent gatekeeper in place, you have my support. When would we see the finalized charter?",
          goal: {
            spanglish: "Your goal: Close with poised C2 concision using polite Future Continuous or inverted assurance.",
            en: "Your goal: Close with poised C2 concision using polite Future Continuous and formal conditional inversion.",
          },
          options: [
            "We'll be circulating the final charter by Thursday noon; should any board member wish to suggest amendments beforehand, my door is open.",
            "I send it Thursday if somebody will want.",
            "Okay, let's call it a carpet.",
          ],
          correct: 0,
          feedback: {
            spanglish: "Impeccable C2 command! Polite Future Continuous ('We'll be circulating') + inverted conditional ('should any board member wish') closes the room with authority.",
            en: "Impeccable C2 command! Polite Future Continuous ('We'll be circulating') + inverted conditional ('should any board member wish') closes the room with authority.",
          },
        },
      ],
    },
  },
};
