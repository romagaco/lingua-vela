/**
 * LinguaVela — Section 2: Interactive Dialogue & Next-Reply Challenge Data
 * (js/listening-extra-dialogue.js)
 * Inspired by Busuu, Babbel & Duolingo Stories.
 * 10 exercises per Crew Rank (a0 through c2) = 70 exercises.
 */

window.LINGUAVELA_LISTENING_DIALOGUE = {
  a0: [
    {
      context: { es: "👋 Primer encuentro", en: "👋 First Meeting" },
      speakerALine: "Hi there! My name is Lucas. What is your name?",
      options: [
        "Hello Lucas! My name is Sofia. Nice to meet you.",
        "I am twenty-two years old.",
        "Yes, it is a blue book.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! Lucas se presentó y preguntó «What is your name?», así que respondes con tu nombre y «Nice to meet you».",
        en: "Correct! Lucas introduced himself and asked 'What is your name?', so you reply with your name and 'Nice to meet you'.",
      },
    },
    {
      context: { es: "☕ En la cafetería", en: "☕ At the Coffee Shop" },
      speakerALine: "Good morning! Here is your tea and your sandwich.",
      options: [
        "Thank you very much!",
        "My name is Roberto.",
        "Where is the hospital?",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! Cuando te entregan tu pedido («Here is your tea...»), la respuesta cortés es «Thank you very much!».",
        en: "Well done! When someone hands you your order ('Here is your tea...'), the natural polite reply is 'Thank you very much!'.",
      },
    },
    {
      context: { es: "🌎 Preguntando el origen", en: "🌎 Asking Where You Are From" },
      speakerALine: "Excuse me, are you from Colombia?",
      options: [
        "Yes, I am! I am from Bogota.",
        "It is three o'clock.",
        "No, I have two brothers.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! A la pregunta «Are you from Colombia?» respondes con «Yes, I am!» (o «No, I'm not»).",
        en: "Exactly! To 'Are you from Colombia?', you reply 'Yes, I am!' and share your city.",
      },
    },
    {
      context: { es: "🏫 En la recepción de la escuela", en: "🏫 At the School Front Desk" },
      speakerALine: "How do you spell your last name, please?",
      options: [
        "G - A - R - C - I - A.",
        "My phone number is five-five-five.",
        "Good night, see you tomorrow.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! «How do you spell...» pide deletrear letra por letra.",
        en: "Correct! 'How do you spell...' asks you to spell your name letter by letter.",
      },
    },
    {
      context: { es: "🤝 Cortesía diaria", en: "🤝 Everyday Courtesy" },
      speakerALine: "Thank you so much for your help today!",
      options: [
        "You're welcome! Have a great day.",
        "One coffee, please.",
        "I am a new student.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! Cuando alguien te agradece («Thank you so much...»), respondes «You're welcome!».",
        en: "Well done! When someone thanks you, the natural reply is 'You're welcome!'.",
      },
    },
    {
      context: { es: "🕒 Preguntando la hora", en: "🕒 Asking for the Time" },
      speakerALine: "Excuse me, what time is it now?",
      options: [
        "It is nine o'clock.",
        "It is on Monday.",
        "Yes, my bag is red.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! «What time is it?» pregunta la hora («It is nine o'clock»).",
        en: "Exactly! 'What time is it?' asks for the clock time ('It is nine o'clock').",
      },
    },
    {
      context: { es: "📞 Datos de contacto", en: "📞 Contact Details" },
      speakerALine: "What is your phone number?",
      options: [
        "It is five-five-five, two-four-nine.",
        "I live in a small house.",
        "She is my English teacher.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! Respondes dando los dígitos de tu teléfono uno por uno.",
        en: "Correct! You reply by giving your phone digits clearly.",
      },
    },
    {
      context: { es: "🍎 En la tienda de frutas", en: "🍎 At the Fruit Stand" },
      speakerALine: "How much is this red apple?",
      options: [
        "It is one dollar.",
        "They are from Canada.",
        "My favorite color is green.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! «How much is...» pregunta el precio («It is one dollar»).",
        en: "Well done! 'How much is...' asks for the price ('It is one dollar').",
      },
    },
    {
      context: { es: "🌤️ Saludo por la mañana", en: "🌤️ Morning Greeting" },
      speakerALine: "Good morning, Ana! How are you today?",
      options: [
        "I'm doing well, thank you! And you?",
        "My class is in Room 4.",
        "No, it isn't my umbrella.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! A «How are you today?» respondes «I'm doing well, thank you! And you?».",
        en: "Exactly! To 'How are you today?', you reply 'I'm doing well, thank you! And you?'.",
      },
    },
    {
      context: { es: "🌙 Despedida al final del día", en: "🌙 Saying Goodbye" },
      speakerALine: "Goodbye! See you in class on Wednesday.",
      options: [
        "See you on Wednesday! Have a good evening.",
        "Nice to meet you, what is your name?",
        "Here is your passport.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Excelente! Confirmas el día de clase y te despides cordialmente.",
        en: "Excellent! You confirm the day and say goodbye warmly.",
      },
    },
  ],
  a1: [
    {
      context: { es: "🗺️ Pidiendo indicaciones en la calle", en: "🗺️ Asking for Directions" },
      speakerALine: "Excuse me, is there a supermarket near here?",
      options: [
        "Yes, there is one on Main Street, right across from the bank.",
        "I usually eat cereal for breakfast.",
        "No, the train leaves at seven.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! Indicas dónde está el supermercado usando referencias claras («on Main Street, across from the bank»).",
        en: "Correct! You give clear street directions ('on Main Street, right across from the bank').",
      },
    },
    {
      context: { es: "🍽️ Ordenando en un restaurante", en: "🍽️ Ordering at a Restaurant" },
      speakerALine: "Are you ready to order, or do you need a few more minutes?",
      options: [
        "I'm ready! I'd like the grilled chicken salad and a glass of water, please.",
        "The restaurant closes at ten o'clock on Sundays.",
        "Yes, I can cook pasta at home.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! «I'd like...» es la forma más natural y cortés de pedir comida en un restaurante.",
        en: "Well done! 'I'd like...' is the polite, natural way to order food at a restaurant.",
      },
    },
    {
      context: { es: "🗓️ Invitación de fin de semana", en: "🗓️ Weekend Invitation" },
      speakerALine: "Do you want to go for a walk in the park this Saturday morning?",
      options: [
        "Sure, that sounds great! What time should we meet?",
        "I walked in the park last year.",
        "My brother works on Mondays.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! Aceptas la invitación («Sure, that sounds great!») y preguntas la hora de encuentro.",
        en: "Exactly! You accept warmly ('Sure, that sounds great!') and ask what time to meet.",
      },
    },
    {
      context: { es: "🚌 En la parada de autobús", en: "🚌 At the Bus Stop" },
      speakerALine: "How often does the downtown bus come?",
      options: [
        "It comes every fifteen minutes.",
        "The ticket costs two dollars.",
        "I go to work by bicycle.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! «How often...» pregunta por la frecuencia («every fifteen minutes»).",
        en: "Correct! 'How often...' asks about frequency ('It comes every fifteen minutes').",
      },
    },
    {
      context: { es: "🩺 En el consultorio médico", en: "🩺 At the Doctor's Office" },
      speakerALine: "Good afternoon. Do you have an appointment with Doctor Miller?",
      options: [
        "Yes, I have a three o'clock appointment under the name Rivera.",
        "She works at a big hospital.",
        "Take this medicine after dinner.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! Confirmas la hora de tu cita médica y das tu apellido.",
        en: "Well done! You confirm your appointment time and give your last name.",
      },
    },
    {
      context: { es: "🛍️ Pagando en una tienda", en: "🛍️ Paying at a Store" },
      speakerALine: "That will be eighteen dollars and fifty cents. Cash or card?",
      options: [
        "By card, please. Can I tap here?",
        "Yes, the sweater is medium.",
        "The store opens at nine.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! El cajero preguntó «Cash or card?» (¿Efectivo o tarjeta?), así que eliges tu método de pago.",
        en: "Exactly! The cashier asked 'Cash or card?', so you state how you'd like to pay.",
      },
    },
    {
      context: { es: "🌦️ Charla sobre el clima", en: "🌦️ Small Talk About Weather" },
      speakerALine: "It looks like it's going to rain soon. Do you have an umbrella?",
      options: [
        "Oh no, I left mine at home! Can I share yours?",
        "Summer is my favorite season of the year.",
        "It snowed a lot in January.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! Respondes directamente sobre el paraguas ante la lluvia inminente.",
        en: "Correct! You respond directly about the umbrella as rain approaches.",
      },
    },
    {
      context: { es: "👨‍👩‍👧 Hablando de la familia", en: "👨‍👩‍👧 Talking About Family" },
      speakerALine: "What does your sister do for a living?",
      options: [
        "She's a graphic designer at a local studio.",
        "She is watching a movie right now.",
        "She likes apples and oranges.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! «What does she do for a living?» pregunta por su profesión u ocupación.",
        en: "Well done! 'What does she do for a living?' asks about her job or profession.",
      },
    },
    {
      context: { es: "📚 En la biblioteca", en: "📚 At the Library" },
      speakerALine: "Can I borrow this pen for a second to fill out the form?",
      options: [
        "Of course, go right ahead!",
        "I read three books every month.",
        "The library is on the second floor.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! «Of course, go right ahead!» es una forma muy natural de prestar algo con amabilidad.",
        en: "Exactly! 'Of course, go right ahead!' is a friendly, natural way to say yes.",
      },
    },
    {
      context: { es: "🏋️ Rutina diaria", en: "🏋️ Daily Routine" },
      speakerALine: "When do you usually exercise during the week?",
      options: [
        "I usually go for a run on Tuesday and Thursday mornings.",
        "The gym is next to the bakery.",
        "Yes, I like playing basketball.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Excelente! «When do you usually...» pide los días o momentos de tu rutina.",
        en: "Excellent! 'When do you usually...' asks for the days and times of your routine.",
      },
    },
  ],
  a2: [
    {
      context: { es: "✈️ En el mostrador del aeropuerto", en: "✈️ At the Airport Check-In Desk" },
      speakerALine: "Good morning! Are you checking any luggage today, or just bringing a carry-on?",
      options: [
        "I have one suitcase to check and this backpack as my carry-on.",
        "My flight arrived two hours ago.",
        "I'd like a window seat in the restaurant.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! Especificas qué maleta vas a documentar («to check») y cuál llevas en cabina («carry-on»).",
        en: "Correct! You clearly state which bag you're checking and which is your carry-on.",
      },
    },
    {
      context: { es: "🧾 Devolución en una tienda", en: "🧾 Returning an Item at a Store" },
      speakerALine: "Hi! How can I help you with this toaster?",
      options: [
        "I bought it yesterday, but it doesn't heat up. Could I get a refund? Here's my receipt.",
        "I'm going to bake bread next weekend.",
        "It's on sale for twenty dollars.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! Explicas el problema en pasado, pides el reembolso («refund») y muestras tu recibo.",
        en: "Well done! You explain the defect, ask for a refund, and offer your receipt.",
      },
    },
    {
      context: { es: "🏨 Recepción de hotel", en: "🏨 Hotel Front Desk" },
      speakerALine: "Welcome to the Harbor Hotel! What time would you like a wake-up call tomorrow?",
      options: [
        "At six-thirty in the morning, please. We have an early ferry.",
        "We checked out yesterday afternoon.",
        "The room has a great view of the sea.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! Indicas la hora exacta para la llamada de despertador («wake-up call»).",
        en: "Exactly! You give the exact time for your morning wake-up call.",
      },
    },
    {
      context: { es: "👕 Probadores de ropa", en: "👕 Clothing Fitting Rooms" },
      speakerALine: "How did that blue jacket fit you?",
      options: [
        "The sleeves are a little too short. Do you have it in a larger size?",
        "I always wear a coat in winter.",
        "The fitting room is over there.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! Explicas cómo te quedó («a little too short») y preguntas por una talla más grande.",
        en: "Correct! You explain how it fit ('a little too short') and ask for a larger size.",
      },
    },
    {
      context: { es: "🤒 Llamando al trabajo por enfermedad", en: "🤒 Calling In Sick to Work" },
      speakerALine: "Oh, you sound terrible! Are you coming into the office today?",
      options: [
        "I don't think I can make it today. I woke up with a high fever and a sore throat.",
        "I finished the report last Friday.",
        "The office is on the fifth floor.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! «I don't think I can make it today» es la frase natural para avisar que no podrás asistir.",
        en: "Well done! 'I don't think I can make it today' is the natural phrase when calling in sick.",
      },
    },
    {
      context: { es: "🏖️ Contando qué hiciste el fin de semana", en: "🏖️ Sharing Weekend Plans & Stories" },
      speakerALine: "How was your trip to the coast last weekend?",
      options: [
        "It was wonderful! We went kayaking and ate fresh seafood by the pier.",
        "We are going to leave next Thursday.",
        "I have never seen the ocean.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! Respondes en Pasado Simple («It was... We went... and ate...») sobre el viaje del fin de semana pasado.",
        en: "Exactly! You reply in the Past Simple ('It was... We went... and ate...') about last weekend.",
      },
    },
    {
      context: { es: "🚆 En la estación de tren", en: "🚆 At the Train Station" },
      speakerALine: "Attention passengers: the 4:15 train to Chicago is delayed by thirty minutes.",
      options: [
        "Let's grab a coffee while we wait—it looks like we have extra time.",
        "Hurry up, the train is leaving right now!",
        "We already arrived in Chicago.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! Como el tren está retrasado 30 minutos («delayed»), propones tomar un café mientras esperan.",
        en: "Correct! Since the train is delayed by 30 minutes, grabbing a coffee while waiting makes sense.",
      },
    },
    {
      context: { es: "🍜 Hablando de experiencias culinarias", en: "🍜 Talking About Food Experiences" },
      speakerALine: "Have you ever been to that new Thai restaurant on Oak Street?",
      options: [
        "Not yet, but I've heard their green curry is amazing. Want to go Friday?",
        "Yes, I go there tomorrow evening.",
        "I was cooking rice at home.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! A «Have you ever been...» respondes «Not yet, but I've heard...» en Present Perfect.",
        en: "Well done! To 'Have you ever been...', 'Not yet, but I've heard...' is a natural Present Perfect reply.",
      },
    },
    {
      context: { es: "💻 Comparando dos laptops", en: "💻 Comparing Two Laptops" },
      speakerALine: "Which of these two laptops do you think is better for traveling?",
      options: [
        "The silver one is much lighter and its battery lasts longer.",
        "I bought a desktop computer three years ago.",
        "Both laptops are on the desk.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! Usas comparativos («much lighter», «lasts longer») para justificar cuál conviene más para viajar.",
        en: "Exactly! You use comparatives ('much lighter', 'lasts longer') to compare the two options.",
      },
    },
    {
      context: { es: "🔋 Pidiendo ayuda en la oficina", en: "🔋 Asking for Help at the Office" },
      speakerALine: "My phone battery is almost dead. Do you happen to have a USB-C charger?",
      options: [
        "Yeah, I have one right here in my desk drawer. You can plug it in next to mine.",
        "My phone number is in the directory.",
        "I called the client this morning.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Excelente! Ofreces el cargador que tienes en el cajón de forma natural y servicial.",
        en: "Excellent! You offer the charger from your drawer in a helpful, natural way.",
      },
    },
  ],
  b1: [
    {
      context: { es: "📅 Reprogramando una reunión", en: "📅 Rescheduling a Meeting" },
      speakerALine: "Something urgent just came up with a client. Could we put off our review until tomorrow morning?",
      options: [
        "No problem at all. Does ten o'clock tomorrow work for you?",
        "Yes, the review went really well yesterday.",
        "We should cancel the project permanently.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! «Put off» significa posponer, así que aceptas con flexibilidad y propones una hora para mañana.",
        en: "Correct! 'Put off' means postpone, so you agree and propose a specific time for tomorrow.",
      },
    },
    {
      context: { es: "💼 Entrevista de trabajo", en: "💼 Job Interview" },
      speakerALine: "Why did you decide to apply for this coordinator role at our company?",
      options: [
        "I've been following your sustainability projects for years, and this role matches my logistics background.",
        "My commute takes about twenty-five minutes by subway.",
        "I used to work in retail when I was in college.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! Conectas tu interés por la empresa con tu experiencia relevante usando Present Perfect Continuous.",
        en: "Well done! You connect your interest in the company with your relevant professional background.",
      },
    },
    {
      context: { es: "🌧️ Plan B por mal clima", en: "🌧️ Backup Plan for Bad Weather" },
      speakerALine: "The forecast says there's an eighty percent chance of thunderstorms during our Saturday barbecue.",
      options: [
        "If it pours, we can move the food indoors and host a board-game night in the living room.",
        "It rained a lot last November too.",
        "I wish I had brought sunscreen yesterday.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! Usas el Primer Condicional («If it pours, we can move...») para proponer un plan B práctico.",
        en: "Exactly! You use the First Conditional ('If it pours, we can move...') to offer a practical backup plan.",
      },
    },
    {
      context: { es: "🖨️ Imprevisto en la oficina", en: "🖨️ Office Supply Shortage" },
      speakerALine: "Heads up—we just ran out of toner for the main printer, and the brochures are due at noon.",
      options: [
        "Let's send the PDF to the print shop down the street so we still meet the deadline.",
        "The printer was bought two years ago.",
        "I printed my boarding pass at home.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! Ante «ran out of toner» (se acabó el tóner), propones una solución inmediata para cumplir el plazo.",
        en: "Correct! Since you 'ran out of toner', sending the file to a local print shop solves the problem before noon.",
      },
    },
    {
      context: { es: "📊 Pidiendo retroalimentación", en: "📊 Asking for Presentation Feedback" },
      speakerALine: "What did you think of my rehearsal for tomorrow's client pitch?",
      options: [
        "Your examples were super clear! If I were you, I'd just slow down a bit on the pricing slide.",
        "The client office is in Seattle.",
        "We met the client three months ago.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! Das retroalimentación constructiva combinando un elogio concreto con un consejo en Segundo Condicional («If I were you, I'd...»).",
        en: "Well done! You give constructive feedback by pairing praise with polite Second Conditional advice ('If I were you, I'd...').",
      },
    },
    {
      context: { es: "🏠 Buscando apartamento", en: "🏠 Apartment Hunting" },
      speakerALine: "This two-bedroom apartment is spacious, although it's twenty minutes farther from the subway.",
      options: [
        "Given how affordable the rent is, I think the extra walk is totally worthwhile.",
        "The building was painted white.",
        "I have lived here since 2018.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! Evalúas el contraste usando vocabulario B1 («affordable», «worthwhile»).",
        en: "Exactly! You weigh the pros and cons naturally using B1 vocabulary ('affordable', 'worthwhile').",
      },
    },
    {
      context: { es: "🤝 Resolviendo un malentendido", en: "🤝 Clearing Up a Misunderstanding" },
      speakerALine: "I thought you said the draft was due on Friday, not Thursday!",
      options: [
        "Sorry for the confusion—I meant Thursday afternoon so we'd have Friday to proofread it together.",
        "Friday is my favorite day of the week.",
        "I haven't checked my email yet.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! Aclaras el malentendido con cortesía («Sorry for the confusion—I meant...») y explicas el motivo.",
        en: "Correct! You politely clarify what you meant and explain the reasoning behind the timeline.",
      },
    },
    {
      context: { es: "💡 Lluvia de ideas en equipo", en: "💡 Team Brainstorming" },
      speakerALine: "We need a fresh way to welcome new users without overwhelming them on day one.",
      options: [
        "What if we came up with a three-minute interactive tour instead of a long PDF manual?",
        "We welcomed ten users last week.",
        "The manual has forty pages.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! «What if we came up with...» propone una idea creativa de forma colaborativa.",
        en: "Well done! 'What if we came up with...' proposes a creative solution collaboratively.",
      },
    },
    {
      context: { es: "🎸 Conversación sobre pasatiempos pasados", en: "🎸 Talking About Past Hobbies" },
      speakerALine: "I didn't know you knew so much about sailing! How did you learn?",
      options: [
        "When I lived near the bay, I used to crew on a small sailboat every weekend.",
        "I am going to buy a ticket tomorrow.",
        "The water is very calm today.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! Usas «used to» para explicar un hábito del pasado que explica tu conocimiento actual.",
        en: "Exactly! You use 'used to' to describe a past habit that explains your current knowledge.",
      },
    },
    {
      context: { es: "✉️ Cierre de llamada con un socio", en: "✉️ Wrapping Up a Partner Call" },
      speakerALine: "I'll email you the updated contract terms before five o'clock today.",
      options: [
        "Sounds good! I look forward to reviewing them and finalizing everything tomorrow.",
        "I already signed it last month.",
        "Please call the front desk.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Excelente! Cierras la conversación con la estructura profesional «I look forward to reviewing...».",
        en: "Excellent! You close the call professionally with 'I look forward to reviewing...'.",
      },
    },
  ],
  b2: [
    {
      context: { es: "💼 Gestión de carga de trabajo (US Workplace)", en: "💼 Managing Workload (US Workplace)" },
      speakerALine: "Hey Maya, do you have the bandwidth to lead the vendor audit this Thursday?",
      options: [
        "I'm swamped with the Q3 launch this week, but I could take it on next Tuesday if that timeline works.",
        "Yes, our office Wi-Fi connection is super fast today.",
        "The vendor sent an invoice last month.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! «Bandwidth» se refiere a tu disponibilidad de tiempo; respondes con honestidad profesional ofreciendo una alternativa viable.",
        en: "Correct! 'Bandwidth' means available time and capacity; you set a clear boundary while offering a constructive alternative.",
      },
    },
    {
      context: { es: "⚖️ Evaluando ventajas y desventajas", en: "⚖️ Weighing Pros and Cons" },
      speakerALine: "Switching to a four-day workweek sounds appealing, but what's the main drawback?",
      options: [
        "On the one hand, morale rises; on the other hand, compressing client support into four days can strain the team.",
        "Friday is usually quieter than Monday.",
        "Everyone enjoys having a longer weekend.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! Articulas el «trade-off» y el «drawback» con la estructura de debate B2 «On the one hand... on the other hand...».",
        en: "Well done! You articulate the trade-off using the balanced B2 debate structure 'On the one hand... on the other hand...'.",
      },
    },
    {
      context: { es: "🔍 Deducción lógica sobre un retraso", en: "🔍 Logical Deduction About a Delay" },
      speakerALine: "It's already ten-fifteen and David still hasn't joined the video call. That's unusual for him.",
      options: [
        "His earlier flight from Denver must have been delayed—let's message him and start with item two.",
        "He should arrive yesterday morning.",
        "He always joins ten minutes early.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! Usas un modal pasado de deducción («must have been delayed») y propones cómo avanzar con la reunión.",
        en: "Exactly! You use a past modal of logical deduction ('must have been delayed') and suggest a practical next step.",
      },
    },
    {
      context: { es: "🛠️ Evaluando viabilidad técnica", en: "🛠️ Assessing Technical Feasibility" },
      speakerALine: "Sales is asking if we can ship the offline sync feature before Friday's demo. Is that feasible?",
      options: [
        "Honestly, building full offline sync in three days isn't feasible without cutting testing, which is too risky.",
        "The demo is scheduled for two o'clock.",
        "Yes, the feature was released last year.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! Evalúas la viabilidad («isn't feasible») explicando el riesgo técnico de apresurar las pruebas.",
        en: "Correct! You address feasibility directly and explain the technical risk of rushing QA.",
      },
    },
    {
      context: { es: "🛡️ Mitigación de riesgos", en: "🛡️ Risk Mitigation Strategy" },
      speakerALine: "If our single packaging supplier has another strike, our holiday shipments will stall completely.",
      options: [
        "To mitigate that risk, we should onboard a backup regional supplier before peak season starts.",
        "I wish we didn't sell physical products.",
        "The strike ended three weeks ago.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! Respondes con una medida concreta para mitigar el riesgo («To mitigate that risk, we should...»).",
        en: "Well done! You propose a concrete contingency plan to mitigate the single-supplier risk.",
      },
    },
    {
      context: { es: "🤝 Desacuerdo técnico diplomático", en: "🤝 Diplomatic Technical Disagreement" },
      speakerALine: "I think we should rewrite the entire mobile app from scratch before adding new lessons.",
      options: [
        "I see where you're coming from, though a full rewrite might stall new features for months. What if we refactor module by module?",
        "That's a terrible idea and a waste of time.",
        "The mobile app has a blue icon.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! Aplicas mitigación diplomática (hedging): validas la intención («I see where you're coming from, though...») y propones una alternativa gradual.",
        en: "Exactly! You use diplomatic US hedging ('I see where you're coming from, though...') and offer an incremental alternative.",
      },
    },
    {
      context: { es: "📉 Analizando una decisión pasada", en: "📉 Reflecting on a Past Decision" },
      speakerALine: "Looking back, launching in three new markets at the same time stretched our support team too thin.",
      options: [
        "Agreed. If we had staggered the rollout one region at a time, our response times wouldn't be lagging now.",
        "We will launch in three markets next year.",
        "Our support team works on the third floor.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! Usas un Condicional Mixto («If we had staggered..., our response times wouldn't be lagging now») para conectar causa pasada y efecto actual.",
        en: "Correct! You use a Mixed Conditional to link the past rollout choice with the current support bottleneck.",
      },
    },
    {
      context: { es: "🏗️ Estructura causativa en un proyecto", en: "🏗️ Arranging External Specialist Work" },
      speakerALine: "Are we translating all the legal terms in-house, or hiring an external specialist?",
      options: [
        "Given the compliance requirements, we're having the contracts reviewed by a certified legal translator.",
        "We translated the menu ourselves yesterday.",
        "Legal terms are often long.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! Usas la estructura causativa «having the contracts reviewed by...» con naturalidad profesional.",
        en: "Well done! You use the causative structure 'having the contracts reviewed by...' accurately.",
      },
    },
    {
      context: { es: "📈 Tomando factores en cuenta", en: "📈 Factoring In Variables" },
      speakerALine: "Why is Q1 revenue projected to dip slightly compared to Q4?",
      options: [
        "We have to take seasonal shopping patterns into account—Q4 always spikes during the holidays.",
        "Q1 starts in January every year.",
        "We hired two new analysts.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! «Take seasonal patterns into account» explica con precisión la variación proyectada.",
        en: "Exactly! 'Take seasonal shopping patterns into account' explains the projection clearly.",
      },
    },
    {
      context: { es: "🎯 Rindiendo cuentas en una retrospectiva", en: "🎯 Team Retrospective & Accountability" },
      speakerALine: "How can we make sure action items from our retrospectives don't fall through the cracks?",
      options: [
        "Every action item needs a single owner who's held accountable for reporting progress at Friday's check-in.",
        "Retrospectives usually last forty-five minutes.",
        "We had a great discussion last month.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Excelente! Usas «held accountable for» para proponer responsabilidad clara y seguimiento.",
        en: "Excellent! You use 'held accountable for' to establish clear ownership and follow-through.",
      },
    },
  ],
  c1: [
    {
      context: { es: "🏛️ Reunión de junta directiva (Subjuntivo Mandativo)", en: "🏛️ Board Meeting (Mandative Subjunctive)" },
      speakerALine: "Given the audit's findings, what is the compliance committee's formal recommendation?",
      options: [
        "We recommend that every third-party vendor be vetted annually before any contract renewal is signed.",
        "We recommended that the vendor was vetted last week.",
        "Audits take place every autumn.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! Empleas el Subjuntivo Mandativo («recommend that every vendor be vetted») propio del registro ejecutivo en EE. UU.",
        en: "Correct! You use the formal US Mandative Subjunctive ('recommend that every vendor be vetted').",
      },
    },
    {
      context: { es: "🧭 Leyendo entre líneas en una negociación", en: "🧭 Reading Between the Lines in Negotiation" },
      speakerALine: "Their director said they're 'broadly aligned in principle, subject to a few minor structural caveats.'",
      options: [
        "Reading between the lines, they're likely pushing back on exclusivity—let's prepare a fallback clause.",
        "That means they already signed the contract without changes.",
        "They don't want to meet with us ever again.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! Interpretas el lenguaje diplomático («caveats») leyendo entre líneas y preparando una cláusula alternativa.",
        en: "Well done! You decode the diplomatic hedging ('caveats') by reading between the lines and preparing a contingency.",
      },
    },
    {
      context: { es: "🎓 Seminario académico sobre evidencia", en: "🎓 Academic Seminar on Empirical Evidence" },
      speakerALine: "Do the longitudinal data actually corroborate the author's hypothesis on remote productivity?",
      options: [
        "Only partially—while output rose initially, the data appear to indicate a plateau after eighteen months.",
        "Yes, the author wrote a very long book about it.",
        "Remote work uses laptops and video calls.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! Respondes con mitigación académica precisa («Only partially... the data appear to indicate...»).",
        en: "Exactly! You respond with nuanced academic hedging ('Only partially... the data appear to indicate...').",
      },
    },
    {
      context: { es: "⚡ Enfatizando resultados con inversión", en: "⚡ Highlighting Results with Inversion" },
      speakerALine: "Did the new caching architecture actually reduce server latency as promised?",
      options: [
        "Not only did it cut latency in half, but it also lowered our monthly cloud bill by thirty percent.",
        "Yes, the servers are located in Virginia.",
        "We updated the software on Tuesday.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! «Not only did it cut..., but it also lowered...» utiliza inversión negativa C1 para destacar un logro doble.",
        en: "Correct! 'Not only did it cut..., but it also lowered...' uses C1 negative inversion for persuasive emphasis.",
      },
    },
    {
      context: { es: "🎯 Enfocando la prioridad con oración hendida (Cleft)", en: "🎯 Spotlighting Priorities with a Wh-Cleft" },
      speakerALine: "We're debating whether to redesign the logo or fix the onboarding flow first. Where do you stand?",
      options: [
        "What really matters right now is reducing onboarding friction; visual polish can wait until Q2.",
        "Logos are usually designed by the branding team.",
        "We debated this topic yesterday too.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! La oración hendida «What really matters right now is...» enfoca la decisión estratégica con autoridad.",
        en: "Well done! The Wh-cleft 'What really matters right now is...' spotlights the strategic priority.",
      },
    },
    {
      context: { es: "🌊 Evaluando un riesgo que podría agravar el problema", en: "🌊 Warning Against Exacerbating a Problem" },
      speakerALine: "What if we raise late fees to discourage overdue invoices?",
      options: [
        "With one caveat: punitive fees might exacerbate cash-flow strain for small clients and hurt retention.",
        "Invoices are sent on the first of the month.",
        "Fees are paid in US dollars.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! Introduces una salvedad («With one caveat») y adviertes sobre consecuencias no deseadas usando «exacerbate».",
        en: "Exactly! You introduce a caveat and warn of unintended consequences using 'exacerbate'.",
      },
    },
    {
      context: { es: "🤝 Construyendo consenso en un panel dividido", en: "🤝 Building Consensus in a Divided Panel" },
      speakerALine: "We've been deadlocked for an hour on whether to prioritize enterprise or self-serve users.",
      options: [
        "To reach a consensus, could we pilot the enterprise tier with three clients while keeping core resources on self-serve?",
        "Let's just cancel the meeting and never mention it again.",
        "Enterprise clients usually have larger teams.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! Propones una vía pragmática («pilot... while keeping...») para destrabar el debate y lograr consenso.",
        en: "Correct! You propose a pragmatic synthesis to break the deadlock and reach a consensus.",
      },
    },
    {
      context: { es: "🏙️ Análisis de políticas urbanas", en: "🏙️ Urban Policy Analysis" },
      speakerALine: "Did the congestion pricing pilot actually alleviate downtown gridlock?",
      options: [
        "Having analyzed six months of sensor data, transit authorities confirmed a twenty-two percent drop in peak delays.",
        "Downtown has many tall office buildings.",
        "Cars have four wheels.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! Usas una cláusula de participio perfecto («Having analyzed...») y evidencia concreta para responder.",
        en: "Well done! You open with a C1 perfect participle clause ('Having analyzed...') backed by concrete metrics.",
      },
    },
    {
      context: { es: "⏰ Urgencia estratégica ('It's high time')", en: "⏰ Strategic Urgency ('It's high time')" },
      speakerALine: "Our legacy backup script failed again during last night's maintenance window.",
      options: [
        "It's high time we decommissioned that script and migrated to automated snapshots.",
        "The maintenance window is at midnight.",
        "Scripts are written in code.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! «It's high time we decommissioned...» (con Past Simple de subjuntivo) expresa urgencia impostergable.",
        en: "Exactly! 'It's high time we decommissioned...' uses the past subjunctive to express overdue urgency.",
      },
    },
    {
      context: { es: "📩 Oferta condicional formal", en: "📩 Formal Conditional Offer" },
      speakerALine: "Thank you for walking us through the regulatory framework. We may have follow-up questions from legal.",
      options: [
        "Should you require any supporting briefs or raw compliance logs, please don't hesitate to reach out.",
        "Yes, laws are very important.",
        "We walked through the park earlier.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Excelente! «Should you require...» es la inversión condicional formal perfecta para cerrar una reunión de alto nivel.",
        en: "Excellent! 'Should you require...' is the polished inverted conditional for formal executive follow-up.",
      },
    },
  ],
  c2: [
    {
      context: { es: "☸️ Análisis retrospectivo de crisis (Inversión C2)", en: "☸️ Crisis Post-Mortem (C2 Inversion)" },
      speakerALine: "How close did the liquidity crunch come to triggering a broader systemic default?",
      options: [
        "Were it not for the emergency swap facility announced at dawn, several regional clearinghouses would have frozen.",
        "Banks open at nine in the morning.",
        "Liquidity is important for finance.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! «Were it not for...» demuestra dominio absoluto de la inversión contrafactual de nivel Capitán (C2).",
        en: "Correct! 'Were it not for...' demonstrates effortless command of C2 counterfactual conditional inversion.",
      },
    },
    {
      context: { es: "🎙️ Decodificando evasivas diplomáticas", en: "🎙️ Decoding Diplomatic Evasiveness" },
      speakerALine: "Did the minister commit to a binding emissions cap, or was her statement another exercise in hedging?",
      options: [
        "Her remarks were masterfully equivocal—ostensibly endorsing the target while leaving every enforcement mechanism voluntary.",
        "She spoke for twenty minutes at the podium.",
        "The conference took place in Geneva.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! Combinas «equivocal» y «ostensibly» para diseccionar la brecha entre la retórica oficial y el compromiso real.",
        en: "Well done! You pair 'equivocal' and 'ostensibly' to dissect the gap between rhetoric and binding enforcement.",
      },
    },
    {
      context: { es: "⚖️ Evaluando una victoria costosa", en: "⚖️ Evaluating a Costly Legal Triumph" },
      speakerALine: "They finally won the patent injunction after four years of litigation. Are investors celebrating?",
      options: [
        "Hardly—burning through their entire R&D reserve to block a product that's already obsolete looks like a textbook Pyrrhic victory.",
        "Yes, patents protect inventions for twenty years.",
        "Lawyers work in courtrooms.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! Identificas por qué ganar el litigio agotando sus reservas constituye una «Pyrrhic victory».",
        en: "Exactly! You articulate why winning the injunction at the expense of R&D reserves is a textbook Pyrrhic victory.",
      },
    },
    {
      context: { es: "🏛️ Debate sobre política económica", en: "🏛️ Economic Policy Debate" },
      speakerALine: "Proponents claim algorithmic pricing alone will eliminate supply-chain bottlenecks. Do you buy that thesis?",
      options: [
        "Be that as it may in simulations, software is no panacea for physical port congestion and institutional friction.",
        "Algorithms run on fast computers.",
        "Ports are located near the ocean.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! Usas la fórmula subjuntiva «Be that as it may» y «no panacea for» con precisión argumentativa C2.",
        en: "Correct! You deploy the formulaic subjunctive 'Be that as it may' alongside 'no panacea for' with C2 precision.",
      },
    },
    {
      context: { es: "📑 Crítica editorial de alto nivel", en: "📑 High-Level Editorial Critique" },
      speakerALine: "What set Dr. Lin's monograph apart from the rest of the symposium papers?",
      options: [
        "Ambitious as her thesis was, she backed every claim with a cogent synthesis of archival and econometric evidence.",
        "Her paper had thirty-two pages and a blue cover.",
        "She presented on Wednesday afternoon.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! Empleas inversión concesiva («Ambitious as her thesis was...») y el adjetivo culto «cogent».",
        en: "Well done! You combine concessive fronting ('Ambitious as her thesis was...') with 'cogent'.",
      },
    },
    {
      context: { es: "🤝 Negociando con una facción intransigente", en: "🤝 Mediating With an Unyielding Faction" },
      speakerALine: "All major stakeholders have signed the accord except the northern shipping coalition, which still refuses to budge.",
      options: [
        "All prior concessions having been exhausted, we may need an escrow clause to bring a recalcitrant coalition to the table.",
        "Ships carry containers across the sea.",
        "The meeting room has twelve chairs.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! Integras una construcción absoluta («All prior concessions having been exhausted») con «recalcitrant».",
        en: "Exactly! You pair an absolute phrase ('All prior concessions having been exhausted') with 'recalcitrant'.",
      },
    },
    {
      context: { es: "📉 Volatilidad vs. Tendencias pasajeras", en: "📉 Distinguishing Structural Shifts from Fleeting Trends" },
      speakerALine: "Should we pivot our entire curriculum around this week's viral micro-credential trend?",
      options: [
        "I'd advise against overreacting—most viral formats prove ephemeral, whereas deep communicative competence endures.",
        "Social media apps are very popular.",
        "We updated the website yesterday.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Correcto! Contrastas lo efímero («ephemeral») de las modas virales con lo duradero («endures»).",
        en: "Correct! You contrast 'ephemeral' viral formats with enduring competence.",
      },
    },
    {
      context: { es: "⚓ Liderazgo sereno bajo tormenta", en: "⚓ Composed Leadership Under Pressure" },
      speakerALine: "With Q2 freight rates swinging wildly, how is the leadership team holding up?",
      options: [
        "Little did we anticipate such volatility in March, yet the team remains sanguine because our long-term contracts are hedged.",
        "Freight rates change every week.",
        "The leadership team has six members.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Muy bien! Combinas inversión negativa («Little did we anticipate...») con «remains sanguine» y cobertura de riesgo.",
        en: "Well done! You combine negative inversion ('Little did we anticipate...') with 'remains sanguine'.",
      },
    },
    {
      context: { es: "🖋️ Revisión rigurosa de manuscrito", en: "🖋️ Rigorous Manuscript Review" },
      speakerALine: "Did the external reviewer flag any methodological blind spots in Chapter Four?",
      options: [
        "She offered a trenchant critique of our sampling window, and her fastidious notes will make the final paper far stronger.",
        "Chapter Four comes after Chapter Three.",
        "She read the paper on her tablet.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Exacto! Usas «trenchant» (incisiva) y «fastidious» (meticulosa) con su verdadero valor en registro académico culto.",
        en: "Exactly! You use 'trenchant' (incisive) and 'fastidious' (meticulous) accurately in academic register.",
      },
    },
    {
      context: { es: "🏛️ Clausura formal de sesión plenaria", en: "🏛️ Formal Adjournment of a Plenary Session" },
      speakerALine: "Unless any delegate wishes to raise a final procedural objection, we are ready to conclude.",
      options: [
        "All amendments having been duly ratified, I move that the assembly adjourn until the autumn session.",
        "Goodbye everyone, see you later!",
        "The assembly hall has large windows.",
      ],
      correctIndex: 0,
      feedback: {
        es: "¡Excelente! «All amendments having been duly ratified, I move that the assembly adjourn...» combina cláusula absoluta y subjuntivo parlamentario C2.",
        en: "Excellent! 'All amendments having been duly ratified, I move that the assembly adjourn...' combines an absolute phrase with parliamentary subjunctive.",
      },
    },
  ],
};
