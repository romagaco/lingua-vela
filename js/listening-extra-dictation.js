/**
 * LinguaVela — Section 1: Micro-Dictation & Connected Speech Cloze Data
 * (js/listening-extra-dictation.js)
 *Inspired by Duolingo, Rachel's English & Speechling.
 * 10 exercises per Crew Rank (a0 through c2) = 70 exercises.
 */

window.LINGUAVELA_LISTENING_DICTATION = {
  a0: [
    {
      audioText: "Hello, my name is Elena and I am from Mexico.",
      clozeTemplate: "Hello, my ___ is Elena and I am from Mexico.",
      answer: "name",
      wordBank: ["name", "nine", "time", "game"],
      phoneticTip: {
        es: "Enfoque fonético: «name» (/neɪm/) tiene el diptongo /eɪ/ y termina cerrando ambos labios en /m/.",
        en: "Phonetic focus: 'name' (/neɪm/) uses the /eɪ/ diphthong and closes both lips cleanly on /m/.",
      },
      feedback: {
        es: "¡Correcto! Escuchaste «my name is Elena» (/maɪ neɪm ɪz/).",
        en: "Correct! You heard 'my name is Elena' (/maɪ neɪm ɪz/).",
      },
    },
    {
      audioText: "Good morning! Can I have a cup of coffee, please?",
      clozeTemplate: "Good morning! Can I have a cup of ___, please?",
      answer: "coffee",
      wordBank: ["coffee", "copy", "cookie", "toffee"],
      phoneticTip: {
        es: "Connected Speech: «cup of» suele enlazarse rápido como /ˈkʌp.əv/ antes de «coffee» (/ˈkɔː.fi/).",
        en: "Connected Speech: 'cup of' links smoothly as /ˈkʌp.əv/ right before 'coffee' (/ˈkɔː.fi/).",
      },
      feedback: {
        es: "¡Muy bien! «A cup of coffee, please» es una frase esencial de cortesía.",
        en: "Well done! 'A cup of coffee, please' is an essential everyday polite request.",
      },
    },
    {
      audioText: "My phone number is five five five, zero one eight.",
      clozeTemplate: "My ___ number is five five five, zero one eight.",
      answer: "phone",
      wordBank: ["phone", "four", "home", "form"],
      phoneticTip: {
        es: "Fonética: «ph» en «phone» (/foʊn/) siempre suena como /f/.",
        en: "Phonetics: 'ph' in 'phone' (/foʊn/) always sounds like /f/.",
      },
      feedback: {
        es: "¡Exacto! «My phone number» (/maɪ foʊn ˈnʌm.bɚ/).",
        en: "Exactly! 'My phone number' (/maɪ foʊn ˈnʌm.bɚ/).",
      },
    },
    {
      audioText: "Thank you very much for your help today.",
      clozeTemplate: "___ you very much for your help today.",
      answer: "Thank",
      wordBank: ["Thank", "Tank", "Think", "Bank"],
      phoneticTip: {
        es: "Sonido /θ/: «Thank» (/θæŋk/) empieza con la punta de la lengua entre los dientes.",
        en: "The /θ/ sound: 'Thank' (/θæŋk/) begins with the tongue tip lightly between the teeth.",
      },
      feedback: {
        es: "¡Correcto! Distinguiste el sonido interdental /θ/ de «Thank you».",
        en: "Correct! You caught the voiceless dental /θ/ in 'Thank you'.",
      },
    },
    {
      audioText: "There are three books on the wooden table.",
      clozeTemplate: "There are ___ books on the wooden table.",
      answer: "three",
      wordBank: ["three", "tree", "free", "six"],
      phoneticTip: {
        es: "Contraste clásico: «three» (/θriː/, número 3) vs. «tree» (/triː/, árbol).",
        en: "Classic contrast: 'three' (/θriː/, number 3) vs. 'tree' (/triː/).",
      },
      feedback: {
        es: "¡Muy bien! Escuchaste «three books» (tres libros).",
        en: "Well done! You heard 'three books'.",
      },
    },
    {
      audioText: "Excuse me, where is the nearest bus stop?",
      clozeTemplate: "Excuse me, ___ is the nearest bus stop?",
      answer: "where",
      wordBank: ["where", "what", "who", "when"],
      phoneticTip: {
        es: "Enlace: «where is» se une naturalmente en el habla como /wer.ɪz/.",
        en: "Linking: 'where is' links naturally in speech as /wer.ɪz/.",
      },
      feedback: {
        es: "¡Exacto! «Where is...» se usa para preguntar por ubicaciones.",
        en: "Exactly! 'Where is...' asks for a location.",
      },
    },
    {
      audioText: "I have an apple and a bottle of water.",
      clozeTemplate: "I have an apple and a bottle of ___.",
      answer: "water",
      wordBank: ["water", "butter", "letter", "weather"],
      phoneticTip: {
        es: "Flap T estadounidense: tanto «bottle» como «water» (/ˈwɔː.t̬ɚ/) usan la /t̬/ suave.",
        en: "American Flap T: both 'bottle' and 'water' (/ˈwɔː.t̬ɚ/) use the soft alveolar tap /t̬/.",
      },
      feedback: {
        es: "¡Correcto! Identificaste el Flap T de «water» en inglés estadounidense.",
        en: "Correct! You identified the US English Flap T in 'water'.",
      },
    },
    {
      audioText: "Our English class is on Monday and Wednesday.",
      clozeTemplate: "Our English class is on Monday and ___.",
      answer: "Wednesday",
      wordBank: ["Wednesday", "Thursday", "Tuesday", "Friday"],
      phoneticTip: {
        es: "Letra muda: en «Wednesday» (/ˈwenz.deɪ/) la primera «d» no se pronuncia.",
        en: "Silent letter: in 'Wednesday' (/ˈwenz.deɪ/), the first 'd' is completely silent.",
      },
      feedback: {
        es: "¡Muy bien! «Wednesday» se pronuncia en dos sílabas: /ˈwenz.deɪ/.",
        en: "Well done! 'Wednesday' has only two spoken syllables: /ˈwenz.deɪ/.",
      },
    },
    {
      audioText: "She is wearing a bright blue jacket today.",
      clozeTemplate: "She is wearing a bright ___ jacket today.",
      answer: "blue",
      wordBank: ["blue", "black", "brown", "green"],
      phoneticTip: {
        es: "Vocal larga /uː/: «blue» (/bluː/) tiene un sonido vocálico largo y limpio.",
        en: "Long vowel /uː/: 'blue' (/bluː/) ends with a clean rounded /uː/.",
      },
      feedback: {
        es: "¡Exacto! Escuchaste «a bright blue jacket».",
        en: "Exactly! You heard 'a bright blue jacket'.",
      },
    },
    {
      audioText: "Nice to meet you! Welcome to our school.",
      clozeTemplate: "Nice to ___ you! Welcome to our school.",
      answer: "meet",
      wordBank: ["meet", "need", "see", "read"],
      phoneticTip: {
        es: "Asimilación en habla rápida: «meet you» suele sonar como /ˈmiːtʃ.juː/.",
        en: "Connected speech assimilation: 'meet you' often blends into /ˈmiːtʃ.juː/.",
      },
      feedback: {
        es: "¡Excelente! «Nice to meet you!» es el saludo clave al conocer a alguien.",
        en: "Excellent! 'Nice to meet you!' is the standard phrase when meeting someone.",
      },
    },
  ],
  a1: [
    {
      audioText: "I usually wake up at six thirty on weekdays.",
      clozeTemplate: "I usually wake up at six ___ on weekdays.",
      answer: "thirty",
      wordBank: ["thirty", "thirteen", "forty", "three"],
      phoneticTip: {
        es: "Acento y Flap T: «thirty» (/ˈθɜːr.t̬i/) lleva el acento en la primera sílaba y Flap T en la segunda.",
        en: "Stress & Flap T: 'thirty' (/ˈθɜːr.t̬i/) stresses the first syllable and taps the 't'.",
      },
      feedback: {
        es: "¡Correcto! «Six thirty» (6:30) tiene el acento inicial de las decenas.",
        en: "Correct! 'Six thirty' (6:30) carries first-syllable stress.",
      },
    },
    {
      audioText: "My brother works at a hospital in the city center.",
      clozeTemplate: "My brother works at a hospital in the ___ center.",
      answer: "city",
      wordBank: ["city", "pretty", "busy", "civic"],
      phoneticTip: {
        es: "Flap T clásico: «city» suena como /ˈsɪt̬.i/ en inglés de EE. UU.",
        en: "Classic Flap T: 'city' is pronounced /ˈsɪt̬.i/ in US English.",
      },
      feedback: {
        es: "¡Muy bien! «City center» con Flap T en «city».",
        en: "Well done! You caught 'city center' with the American Flap T.",
      },
    },
    {
      audioText: "Do you want to grab lunch at noon?",
      clozeTemplate: "Do you ___ grab lunch at noon?",
      answer: "want to",
      wordBank: ["want to", "went to", "walk to", "wait to"],
      phoneticTip: {
        es: "Reducción natural: «want to» suele sonar cercano a /ˈwɑː.nə/ en conversación cotidiana, pero siempre se escribe «want to».",
        en: "Natural reduction: 'want to' often reduces toward /ˈwɑː.nə/ in casual speech, written 'want to'.",
      },
      feedback: {
        es: "¡Exacto! «Do you want to grab lunch» es una invitación cotidiana muy natural.",
        en: "Exactly! 'Do you want to grab lunch' is a common everyday invitation.",
      },
    },
    {
      audioText: "The pharmacy is right across from the train station.",
      clozeTemplate: "The pharmacy is right ___ from the train station.",
      answer: "across",
      wordBank: ["across", "around", "along", "above"],
      phoneticTip: {
        es: "Schwa inicial: «across» (/əˈkrɔːs/) empieza con una vocal neutra corta /ə/.",
        en: "Initial schwa: 'across' (/əˈkrɔːs/) starts with an unstressed schwa /ə/.",
      },
      feedback: {
        es: "¡Correcto! «Across from» significa justo enfrente, al otro lado de la calle.",
        en: "Correct! 'Across from' means directly opposite on the other side.",
      },
    },
    {
      audioText: "She doesn't drink coffee in the evening.",
      clozeTemplate: "She ___ drink coffee in the evening.",
      answer: "doesn't",
      wordBank: ["doesn't", "don't", "isn't", "didn't"],
      phoneticTip: {
        es: "Contracción negativa: en «doesn't» (/ˈdʌz.ənt/) la /t/ final suele detenerse suavemente.",
        en: "Negative contraction: in 'doesn't' (/ˈdʌz.ənt/), the final /t/ is often unreleased.",
      },
      feedback: {
        es: "¡Muy bien! «She doesn't drink» es el negativo de tercera persona en Present Simple.",
        en: "Well done! 'She doesn't drink' is the third-person singular Present Simple negative.",
      },
    },
    {
      audioText: "We need to buy some fresh vegetables for dinner.",
      clozeTemplate: "We need to buy some fresh ___ for dinner.",
      answer: "vegetables",
      wordBank: ["vegetables", "vitamins", "beverages", "breakfasts"],
      phoneticTip: {
        es: "Reducción de sílabas: «vegetables» se pronuncia en 3 sílabas (/ˈvedʒ.tə.bəlz/), no 4.",
        en: "Syllable reduction: 'vegetables' is spoken in 3 syllables (/ˈvedʒ.tə.bəlz/), not 4.",
      },
      feedback: {
        es: "¡Exacto! «Vegetables» omite la segunda «e» al hablar: /ˈvedʒ.tə.bəlz/.",
        en: "Exactly! In natural speech, 'vegetables' drops the second 'e': /ˈvedʒ.tə.bəlz/.",
      },
    },
    {
      audioText: "Can I borrow your umbrella for a few minutes?",
      clozeTemplate: "Can I ___ your umbrella for a few minutes?",
      answer: "borrow",
      wordBank: ["borrow", "follow", "bring", "buy"],
      phoneticTip: {
        es: "Enlace C+V: «Can I» se enlaza sin pausa como /ˈkæn.aɪ/.",
        en: "C+V Linking: 'Can I' links seamlessly as /ˈkæn.aɪ/.",
      },
      feedback: {
        es: "¡Correcto! «Can I borrow your umbrella» (¿Puedo tomar prestado tu paraguas?).",
        en: "Correct! 'Can I borrow your umbrella' asks to use something temporarily.",
      },
    },
    {
      audioText: "It is a little chilly outside, so bring a sweater.",
      clozeTemplate: "It is a little ___ outside, so bring a sweater.",
      answer: "chilly",
      wordBank: ["chilly", "sunny", "cloudy", "windy"],
      phoneticTip: {
        es: "Enlace: «a little» (/ə ˈlɪt̬.əl/) conecta con Flap T antes de «chilly» (/ˈtʃɪl.i/).",
        en: "Linking: 'a little' (/ə ˈlɪt̬.əl/) uses a Flap T right before 'chilly' (/ˈtʃɪl.i/).",
      },
      feedback: {
        es: "¡Muy bien! «Chilly» significa fresco o algo frío.",
        en: "Well done! 'Chilly' means noticeably cool.",
      },
    },
    {
      audioText: "This armchair is really comfortable for reading.",
      clozeTemplate: "This armchair is really ___ for reading.",
      answer: "comfortable",
      wordBank: ["comfortable", "colorful", "convenient", "careful"],
      phoneticTip: {
        es: "Elisión natural: «comfortable» se pronuncia en 3 sílabas: /ˈkʌmf.tɚ.bəl/.",
        en: "Natural elision: 'comfortable' reduces to 3 syllables: /ˈkʌmf.tɚ.bəl/.",
      },
      feedback: {
        es: "¡Exacto! Captaste la pronunciación reducida de «comfortable».",
        en: "Exactly! You caught the natural 3-syllable pronunciation of 'comfortable'.",
      },
    },
    {
      audioText: "Please keep your receipt in case you need a change.",
      clozeTemplate: "Please keep your ___ in case you need a change.",
      answer: "receipt",
      wordBank: ["receipt", "recipe", "ticket", "seat"],
      phoneticTip: {
        es: "Consonante muda: la «p» de «receipt» (/rɪˈsiːt/) nunca se pronuncia (a diferencia de «recipe» /ˈres.ə.pi/).",
        en: "Silent consonant: the 'p' in 'receipt' (/rɪˈsiːt/) is silent (unlike 'recipe' /ˈres.ə.pi/).",
      },
      feedback: {
        es: "¡Excelente! Distinguiste «receipt» (/rɪˈsiːt/, recibo) con «p» muda.",
        en: "Excellent! You distinguished 'receipt' (/rɪˈsiːt/) with its silent 'p'.",
      },
    },
  ],
  a2: [
    {
      audioText: "We are going to visit our cousins in Boston next month.",
      clozeTemplate: "We are ___ visit our cousins in Boston next month.",
      answer: "going to",
      wordBank: ["going to", "gone to", "got to", "trying to"],
      phoneticTip: {
        es: "Connected Speech: «going to» antes de un verbo suele reducirse a /ˈɡʌn.ə/ (gonna) al hablar, pero se escribe «going to».",
        en: "Connected Speech: 'going to' before a verb often sounds like /ˈɡʌn.ə/ in speech, written 'going to'.",
      },
      feedback: {
        es: "¡Correcto! «We are going to visit» expresa un plan futuro ya decidido.",
        en: "Correct! 'We are going to visit' expresses a decided future plan.",
      },
    },
    {
      audioText: "Our flight was delayed by two hours because of the snow.",
      clozeTemplate: "Our flight was ___ by two hours because of the snow.",
      answer: "delayed",
      wordBank: ["delayed", "deleted", "decided", "delivered"],
      phoneticTip: {
        es: "Terminación -ed sonora: tras el diptongo /eɪ/, «delayed» termina en /d/ suave (/dɪˈleɪd/).",
        en: "Voiced -ed ending: after the vowel /eɪ/, 'delayed' ends with a smooth /d/ (/dɪˈleɪd/).",
      },
      feedback: {
        es: "¡Muy bien! «Our flight was delayed» (Nuestro vuelo se retrasó).",
        en: "Well done! 'Our flight was delayed' is essential travel English.",
      },
    },
    {
      audioText: "Yesterday I bought a warm coat at a great bargain.",
      clozeTemplate: "Yesterday I ___ a warm coat at a great bargain.",
      answer: "bought",
      wordBank: ["bought", "brought", "caught", "thought"],
      phoneticTip: {
        es: "Dígrafo «gh» mudo: «bought» (/bɔːt/) es el pasado de «buy» (sin /r/, a diferencia de «brought»).",
        en: "Silent 'gh': 'bought' (/bɔːt/) is the past of 'buy' (no /r/, unlike 'brought').",
      },
      feedback: {
        es: "¡Exacto! Distinguiste «bought» (compré) de «brought» (traje).",
        en: "Exactly! You distinguished 'bought' (past of buy) from 'brought'.",
      },
    },
    {
      audioText: "Please show your boarding pass and ID at the gate.",
      clozeTemplate: "Please show your ___ pass and ID at the gate.",
      answer: "boarding",
      wordBank: ["boarding", "morning", "parking", "booking"],
      phoneticTip: {
        es: "Compuesto de aeropuerto: «boarding pass» (/ˈbɔːr.dɪŋ pæs/) lleva el acento principal en «boarding».",
        en: "Compound noun stress: 'boarding pass' (/ˈbɔːr.dɪŋ pæs/) stresses the first word.",
      },
      feedback: {
        es: "¡Correcto! «Boarding pass» es el pase de abordar.",
        en: "Correct! 'Boarding pass' is what you show at the airport gate.",
      },
    },
    {
      audioText: "Have you ever tried authentic street tacos in Mexico City?",
      clozeTemplate: "Have you ___ tried authentic street tacos in Mexico City?",
      answer: "ever",
      wordBank: ["ever", "never", "even", "already"],
      phoneticTip: {
        es: "Enlace vocal: «Have you ever» fluye como /hæv.juˈev.ɚ/.",
        en: "Smooth linking: 'Have you ever' flows as /hæv.juˈev.ɚ/.",
      },
      feedback: {
        es: "¡Muy bien! «Have you ever + participio» pregunta por experiencias de vida.",
        en: "Well done! 'Have you ever + past participle' asks about life experiences.",
      },
    },
    {
      audioText: "The subway was so crowded that we decided to walk.",
      clozeTemplate: "The subway was so ___ that we decided to walk.",
      answer: "crowded",
      wordBank: ["crowded", "clouded", "closed", "quiet"],
      phoneticTip: {
        es: "Sílaba extra -ed: tras /d/ en «crowd», la terminación «-ed» añade la sílaba /ɪd/: /ˈkraʊ.dɪd/.",
        en: "Extra -ed syllable: after /d/ in 'crowd', '-ed' adds a full syllable /ɪd/: /ˈkraʊ.dɪd/.",
      },
      feedback: {
        es: "¡Exacto! «Crowded» (/ˈkraʊ.dɪd/) significa lleno de gente.",
        en: "Exactly! 'Crowded' (/ˈkraʊ.dɪd/) means packed with people.",
      },
    },
    {
      audioText: "I was cooking dinner when the courier knocked on the door.",
      clozeTemplate: "I ___ cooking dinner when the courier knocked on the door.",
      answer: "was",
      wordBank: ["was", "were", "am", "had"],
      phoneticTip: {
        es: "Forma débil (weak form): «was» sin énfasis se reduce a /wəz/ en «I was cooking».",
        en: "Weak form: unstressed 'was' reduces to /wəz/ in 'I was cooking'.",
      },
      feedback: {
        es: "¡Correcto! Captaste la forma reducida /wəz/ del Past Continuous.",
        en: "Correct! You caught the reduced weak form /wəz/ in Past Continuous.",
      },
    },
    {
      audioText: "Could I get a refund on this defective charger?",
      clozeTemplate: "Could I get a ___ on this defective charger?",
      answer: "refund",
      wordBank: ["refund", "return", "receipt", "repair"],
      phoneticTip: {
        es: "Enlace con Flap T: «get a» suena como /ˈɡet̬.ə/ justo antes de «refund» (/ˈriː.fʌnd/).",
        en: "Flap T linking: 'get a' links as /ˈɡet̬.ə/ right before 'refund' (/ˈriː.fʌnd/).",
      },
      feedback: {
        es: "¡Muy bien! «Get a refund» es solicitar un reembolso.",
        en: "Well done! 'Get a refund' means getting your money back.",
      },
    },
    {
      audioText: "We need to check out of the hotel before eleven.",
      clozeTemplate: "We need to ___ out of the hotel before eleven.",
      answer: "check",
      wordBank: ["check", "walk", "take", "look"],
      phoneticTip: {
        es: "Enlace de phrasal verb: «check out of» se une como /tʃekˈaʊ.t̬əv/.",
        en: "Phrasal verb linking: 'check out of' links together as /tʃekˈaʊ.t̬əv/.",
      },
      feedback: {
        es: "¡Exacto! «Check out of the hotel» es entregar la habitación al salir.",
        en: "Exactly! 'Check out of the hotel' is leaving at the end of your stay.",
      },
    },
    {
      audioText: "The express train is much faster than the local bus.",
      clozeTemplate: "The express train is much ___ than the local bus.",
      answer: "faster",
      wordBank: ["faster", "farther", "first", "fastest"],
      phoneticTip: {
        es: "Reducción de «than»: en comparativos, «faster than» suena como /ˈfæs.tɚ.ðən/.",
        en: "Reduction of 'than': in comparatives, 'faster than' sounds like /ˈfæs.tɚ.ðən/.",
      },
      feedback: {
        es: "¡Excelente! «Much faster than» compara velocidades con claridad.",
        en: "Excellent! 'Much faster than' is a clear comparative structure.",
      },
    },
  ],
  b1: [
    {
      audioText: "We had to put off the meeting until Friday morning.",
      clozeTemplate: "We had to ___ off the meeting until Friday morning.",
      answer: "put",
      wordBank: ["put", "call", "pull", "cut"],
      phoneticTip: {
        es: "Flap T en enlace: «put off» se enlaza con /t̬/ suave como /pʊˈt̬ɔːf/ (posponer).",
        en: "Flap T linking: 'put off' links with a soft tap as /pʊˈt̬ɔːf/ (to postpone).",
      },
      feedback: {
        es: "¡Correcto! «Put off» significa posponer para más adelante.",
        en: "Correct! 'Put off' means to postpone to a later time.",
      },
    },
    {
      audioText: "I have been working on this proposal since Tuesday.",
      clozeTemplate: "I have ___ working on this proposal since Tuesday.",
      answer: "been",
      wordBank: ["been", "begin", "be", "done"],
      phoneticTip: {
        es: "Pronunciación en EE. UU.: «been» en Present Perfect Continuous suena corto como /bɪn/ («I've been» /aɪv bɪn/).",
        en: "US pronunciation: unstressed 'been' sounds like short /bɪn/ ('I've been' /aɪv bɪn/).",
      },
      feedback: {
        es: "¡Muy bien! En EE. UU., «been» rima con «pin» (/bɪn/).",
        en: "Well done! In US English, 'been' rhymes with 'pin' (/bɪn/).",
      },
    },
    {
      audioText: "If I had more free time, I would learn to play the cello.",
      clozeTemplate: "If I had more free time, I ___ learn to play the cello.",
      answer: "would",
      wordBank: ["would", "will", "could", "should"],
      phoneticTip: {
        es: "Letra «l» muda: «would» se pronuncia /wʊd/ (igual que «wood»).",
        en: "Silent 'l': 'would' is pronounced /wʊd/ (a homophone of 'wood').",
      },
      feedback: {
        es: "¡Exacto! Segundo condicional: «If I had ..., I would learn...».",
        en: "Exactly! Second Conditional: 'If I had ..., I would learn...'.",
      },
    },
    {
      audioText: "We ran out of printer paper right before the presentation.",
      clozeTemplate: "We ___ out of printer paper right before the presentation.",
      answer: "ran",
      wordBank: ["ran", "run", "rang", "rain"],
      phoneticTip: {
        es: "Enlace en cadena: «ran out of» se conecta como /rænˈaʊ.t̬əv/.",
        en: "Chain linking: 'ran out of' connects smoothly as /rænˈaʊ.t̬əv/.",
      },
      feedback: {
        es: "¡Correcto! «Ran out of» significa que se nos acabó por completo.",
        en: "Correct! 'Ran out of' means we used up the entire supply.",
      },
    },
    {
      audioText: "I look forward to hearing your thoughts on the draft.",
      clozeTemplate: "I look forward to ___ your thoughts on the draft.",
      answer: "hearing",
      wordBank: ["hearing", "hear", "heard", "sharing"],
      phoneticTip: {
        es: "Gramática auditiva: tras «look forward to», siempre suena un gerundio en «-ing» («hearing»).",
        en: "Grammar by ear: 'look forward to' is always followed by an '-ing' gerund ('hearing').",
      },
      feedback: {
        es: "¡Muy bien! «Look forward to hearing» es una fórmula profesional impecable.",
        en: "Well done! 'Look forward to hearing' is standard professional English.",
      },
    },
    {
      audioText: "Our team came up with a sensible solution to the problem.",
      clozeTemplate: "Our team came up with a ___ solution to the problem.",
      answer: "sensible",
      wordBank: ["sensible", "sensitive", "simple", "similar"],
      phoneticTip: {
        es: "Falso amigo: «sensible» (/ˈsen.sə.bəl/) significa sensato o práctico.",
        en: "False friend alert: 'sensible' (/ˈsen.sə.bəl/) means practical and well-reasoned.",
      },
      feedback: {
        es: "¡Exacto! «A sensible solution» es una solución sensata y práctica.",
        en: "Exactly! 'A sensible solution' means a practical, wise solution.",
      },
    },
    {
      audioText: "When I was younger, I used to ride my bike to school.",
      clozeTemplate: "When I was younger, I ___ to ride my bike to school.",
      answer: "used",
      wordBank: ["used", "use", "usually", "using"],
      phoneticTip: {
        es: "Asimilación sorda: en «used to» (/ˈjuːs.tuː/), la «d» y la «t» se funden en un solo sonido /t/.",
        en: "Devoicing assimilation: in 'used to' (/ˈjuːs.tuː/), 'd' and 't' merge into a single /t/.",
      },
      feedback: {
        es: "¡Correcto! Aunque suena como /ˈjuːs.tə/, en afirmativo se escribe «used to».",
        en: "Correct! Even though it sounds like /ˈjuːs.tə/, in affirmative statements it is spelled 'used to'.",
      },
    },
    {
      audioText: "Although the traffic was heavy, we met the deadline.",
      clozeTemplate: "Although the traffic was heavy, we met the ___.",
      answer: "deadline",
      wordBank: ["deadline", "headline", "guideline", "timeline"],
      phoneticTip: {
        es: "Colocación clave: «meet the deadline» (/miːt ðə ˈded.laɪn/) significa cumplir con la fecha límite.",
        en: "Key collocation: 'meet the deadline' (/miːt ðə ˈded.laɪn/) means finishing on time.",
      },
      feedback: {
        es: "¡Muy bien! «We met the deadline» (Cumplimos con el plazo).",
        en: "Well done! 'We met the deadline' means we finished before the due time.",
      },
    },
    {
      audioText: "The historic bridge was built more than a century ago.",
      clozeTemplate: "The historic bridge was ___ more than a century ago.",
      answer: "built",
      wordBank: ["built", "build", "billed", "building"],
      phoneticTip: {
        es: "Pasiva en pasado: distingue la /t/ final sorda de «built» (/bɪlt/) frente al verbo base «build» (/bɪld/).",
        en: "Past passive: notice the crisp final /t/ in 'built' (/bɪlt/) vs. base 'build' (/bɪld/).",
      },
      feedback: {
        es: "¡Exacto! «Was built» es voz pasiva en Pasado Simple.",
        en: "Exactly! 'Was built' is the Past Simple Passive.",
      },
    },
    {
      audioText: "Could you give me some constructive feedback on my slides?",
      clozeTemplate: "Could you give me some constructive ___ on my slides?",
      answer: "feedback",
      wordBank: ["feedback", "flashback", "fallback", "drawback"],
      phoneticTip: {
        es: "Asimilación: «Could you» suena como /ˈkʊdʒ.uː/ en conversación fluida.",
        en: "Palatalization: 'Could you' naturally blends into /ˈkʊdʒ.uː/ in connected speech.",
      },
      feedback: {
        es: "¡Excelente! «Constructive feedback» es retroalimentación constructiva.",
        en: "Excellent! 'Constructive feedback' is actionable advice for improvement.",
      },
    },
  ],
  b2: [
    {
      audioText: "She must have left the office early because her desk is clear.",
      clozeTemplate: "She ___ have left the office early because her desk is clear.",
      answer: "must",
      wordBank: ["must", "might", "should", "would"],
      phoneticTip: {
        es: "Reducción de «have» en modales pasados: «must have» suena como /ˈmʌs.təv/ antes del participio.",
        en: "Past modal reduction: 'must have' sounds like /ˈmʌs.təv/ before a past participle.",
      },
      feedback: {
        es: "¡Correcto! «Must have left» (/ˈmʌs.təv left/) expresa una deducción lógica sobre el pasado.",
        en: "Correct! 'Must have left' (/ˈmʌs.təv left/) expresses strong logical deduction about the past.",
      },
    },
    {
      audioText: "I don't have the bandwidth to take on another project this week.",
      clozeTemplate: "I don't have the ___ to take on another project this week.",
      answer: "bandwidth",
      wordBank: ["bandwidth", "balance", "budget", "background"],
      phoneticTip: {
        es: "Inglés corporativo de EE. UU.: «bandwidth» (/ˈbænd.wɪdθ/) significa tiempo y capacidad mental disponible.",
        en: "US workplace idiom: 'bandwidth' (/ˈbænd.wɪdθ/) means available time and mental capacity.",
      },
      feedback: {
        es: "¡Muy bien! «Bandwidth» es el término estándar en equipos de EE. UU. para hablar de disponibilidad.",
        en: "Well done! 'Bandwidth' is the go-to US workplace term for capacity.",
      },
    },
    {
      audioText: "We need to take seasonal demand into account before ordering.",
      clozeTemplate: "We need to take seasonal demand into ___ before ordering.",
      answer: "account",
      wordBank: ["account", "amount", "action", "advance"],
      phoneticTip: {
        es: "Enlace vocal-vocal: «into account» se une con un suave deslizamiento /w/: /ˈɪn.tu.wəˈkaʊnt/.",
        en: "Vowel-to-vowel linking: 'into account' links with a subtle /w/ glide: /ˈɪn.tu.wəˈkaʊnt/.",
      },
      feedback: {
        es: "¡Exacto! «Take into account» significa tener en cuenta o considerar.",
        en: "Exactly! 'Take into account' means to consider as an important factor.",
      },
    },
    {
      audioText: "Diversifying our suppliers will help mitigate supply chain risks.",
      clozeTemplate: "Diversifying our suppliers will help ___ supply chain risks.",
      answer: "mitigate",
      wordBank: ["mitigate", "motivate", "navigate", "indicate"],
      phoneticTip: {
        es: "Flap T en verbo académico: «mitigate» se pronuncia /ˈmɪt̬.ə.ɡeɪt/ en inglés de EE. UU.",
        en: "Flap T in formal verbs: 'mitigate' is pronounced /ˈmɪt̬.ə.ɡeɪt/ in US English.",
      },
      feedback: {
        es: "¡Correcto! «Mitigate risks» es la colocación precisa para mitigar o reducir riesgos.",
        en: "Correct! 'Mitigate risks' is the standard professional collocation.",
      },
    },
    {
      audioText: "The main drawback of remote work is feeling isolated from peers.",
      clozeTemplate: "The main ___ of remote work is feeling isolated from peers.",
      answer: "drawback",
      wordBank: ["drawback", "feedback", "setback", "cutback"],
      phoneticTip: {
        es: "Acento inicial en sustantivo compuesto: «drawback» (/ˈdrɔː.bæk/, desventaja) acentúa la primera sílaba.",
        en: "Compound noun stress: 'drawback' (/ˈdrɔː.bæk/, disadvantage) stresses the first syllable.",
      },
      feedback: {
        es: "¡Muy bien! «Drawback» significa desventaja o inconveniente.",
        en: "Well done! 'Drawback' means a disadvantage or downside.",
      },
    },
    {
      audioText: "If I had accepted that offer, I would be living in Chicago now.",
      clozeTemplate: "If I had accepted that offer, I ___ be living in Chicago now.",
      answer: "would",
      wordBank: ["would", "will", "had", "should"],
      phoneticTip: {
        es: "Condicional mixto: en habla rápida, «I would be» suele contraerse a «I'd be» (/aɪd bi/).",
        en: "Mixed conditional: in fluent speech, 'I would be' often contracts toward /aɪd bi/.",
      },
      feedback: {
        es: "¡Exacto! Condicional mixto: condición pasada («had accepted») con resultado presente («would be living ... now»).",
        en: "Exactly! Mixed Conditional linking a past decision to a present result.",
      },
    },
    {
      audioText: "Launching the platform in two weeks simply isn't feasible.",
      clozeTemplate: "Launching the platform in two weeks simply isn't ___.",
      answer: "feasible",
      wordBank: ["feasible", "flexible", "visible", "physical"],
      phoneticTip: {
        es: "Sonido /z/ intervocálico: la «s» de «feasible» suena sonora como /z/: /ˈfiː.zə.bəl/.",
        en: "Voiced /z/ sound: the 's' in 'feasible' is voiced as /z/: /ˈfiː.zə.bəl/.",
      },
      feedback: {
        es: "¡Correcto! «Feasible» significa factible o viable en la práctica.",
        en: "Correct! 'Feasible' means realistic and achievable in practice.",
      },
    },
    {
      audioText: "Every policy decision involves a trade-off between speed and cost.",
      clozeTemplate: "Every policy decision involves a ___ between speed and cost.",
      answer: "trade-off",
      wordBank: ["trade-off", "takeoff", "payoff", "layoff"],
      phoneticTip: {
        es: "Enlace consonante-vocal: «trade-off» une la /d/ con la vocal como /ˈtreɪ.dɔːf/.",
        en: "Consonant-to-vowel link: 'trade-off' links the /d/ directly into /ɔːf/: /ˈtreɪ.dɔːf/.",
      },
      feedback: {
        es: "¡Muy bien! «A trade-off» es el equilibrio o costo de ceder una ventaja para obtener otra.",
        en: "Well done! A 'trade-off' balances two competing priorities.",
      },
    },
    {
      audioText: "The research team announced a major breakthrough in solar storage.",
      clozeTemplate: "The research team announced a major ___ in solar storage.",
      answer: "breakthrough",
      wordBank: ["breakthrough", "breakdown", "breakout", "background"],
      phoneticTip: {
        es: "Transición /k/ → /θr/: «breakthrough» (/ˈbreɪk.θruː/) combina oclusiva /k/ con fricativa interdental /θ/.",
        en: "Cluster /k/ → /θr/: 'breakthrough' (/ˈbreɪk.θruː/) transitions from /k/ directly into /θr/.",
      },
      feedback: {
        es: "¡Exacto! «A major breakthrough» es un avance o descubrimiento decisivo.",
        en: "Exactly! A 'major breakthrough' is an important discovery that overcomes a barrier.",
      },
    },
    {
      audioText: "Could you tell me when the quarterly report will be ready?",
      clozeTemplate: "Could you tell me when the quarterly ___ will be ready?",
      answer: "report",
      wordBank: ["report", "resort", "record", "result"],
      phoneticTip: {
        es: "Orden en preguntas indirectas: tras «Could you tell me when...», el sujeto precede al verbo («the quarterly report will»).",
        en: "Indirect question rhythm: after 'Could you tell me when...', subject precedes auxiliary ('the quarterly report will').",
      },
      feedback: {
        es: "¡Excelente! Mantuviste la estructura y el léxico de una consulta ejecutiva cortés.",
        en: "Excellent! You caught the indirect question structure and vocabulary.",
      },
    },
  ],
  c1: [
    {
      audioText: "The board recommended that the safety protocol be updated immediately.",
      clozeTemplate: "The board recommended that the safety protocol ___ updated immediately.",
      answer: "be",
      wordBank: ["be", "is", "was", "were"],
      phoneticTip: {
        es: "Subjuntivo Mandativo (EE. UU.): tras «recommended that», se usa la forma base invariable «be» (/bi/).",
        en: "US Mandative Subjunctive: after 'recommended that', US English uses the bare infinitive 'be'.",
      },
      feedback: {
        es: "¡Correcto! Captaste el Subjuntivo Mandativo «that the protocol be updated».",
        en: "Correct! You identified the Mandative Subjunctive 'that the protocol be updated'.",
      },
    },
    {
      audioText: "Not only did she meet the target, but she also streamlined the workflow.",
      clozeTemplate: "Not only ___ she meet the target, but she also streamlined the workflow.",
      answer: "did",
      wordBank: ["did", "had", "does", "was"],
      phoneticTip: {
        es: "Inversión negativa: «Not only» al inicio exige énfasis y orden invertido auxiliar + sujeto («did she meet»).",
        en: "Negative inversion: fronted 'Not only' triggers auxiliary-subject inversion ('did she meet').",
      },
      feedback: {
        es: "¡Muy bien! «Not only did she meet...» es inversión enfática de nivel C1.",
        en: "Well done! 'Not only did she meet...' uses C1 negative inversion.",
      },
    },
    {
      audioText: "Independent audits corroborated the preliminary economic findings.",
      clozeTemplate: "Independent audits ___ the preliminary economic findings.",
      answer: "corroborated",
      wordBank: ["corroborated", "collaborated", "celebrated", "calibrated"],
      phoneticTip: {
        es: "Par mínimo académico: distingue «corroborate» (/kəˈrɑː.bə.reɪt/, confirmar con pruebas) de «collaborate» (/kəˈlæb.ə.reɪt/, colaborar).",
        en: "Academic minimal pair: distinguish 'corroborate' (/kəˈrɑː.bə.reɪt/, confirm with evidence) from 'collaborate' (/kəˈlæb.ə.reɪt/).",
      },
      feedback: {
        es: "¡Exacto! «Corroborated» significa corroboraron o respaldaron con evidencia.",
        en: "Exactly! 'Corroborated' means confirmed with supporting evidence.",
      },
    },
    {
      audioText: "I endorse the expansion plan, with one important caveat.",
      clozeTemplate: "I endorse the expansion plan, with one important ___.",
      answer: "caveat",
      wordBank: ["caveat", "concept", "contract", "context"],
      phoneticTip: {
        es: "Pronunciación culta: «caveat» tiene tres sílabas claras en inglés: /ˈkæv.i.æt/.",
        en: "Advanced pronunciation: 'caveat' has three distinct syllables: /ˈkæv.i.æt/.",
      },
      feedback: {
        es: "¡Correcto! «Caveat» (/ˈkæv.i.æt/) significa salvedad o advertencia condicional.",
        en: "Correct! A 'caveat' is an important qualification or warning.",
      },
    },
    {
      audioText: "A skilled negotiator captures every subtle nuance in tone.",
      clozeTemplate: "A skilled negotiator captures every subtle ___ in tone.",
      answer: "nuance",
      wordBank: ["nuance", "notice", "notion", "neutral"],
      phoneticTip: {
        es: "Contraste fonético: en «subtle» (/ˈsʌt̬.əl/) la «b» es muda, seguida de «nuance» (/ˈnuː.ɑːns/).",
        en: "Phonetic detail: the 'b' in 'subtle' (/ˈsʌt̬.əl/) is silent right before 'nuance' (/ˈnuː.ɑːns/).",
      },
      feedback: {
        es: "¡Muy bien! «Subtle nuance» es la colocación natural para un matiz sutil.",
        en: "Well done! 'Subtle nuance' is the classic collocation for fine distinctions.",
      },
    },
    {
      audioText: "Mobile payments have become ubiquitous across urban markets.",
      clozeTemplate: "Mobile payments have become ___ across urban markets.",
      answer: "ubiquitous",
      wordBank: ["ubiquitous", "unanimous", "ambiguous", "Simultaneous"],
      phoneticTip: {
        es: "Sonido inicial /juː/: «ubiquitous» empieza con semivocal /juːˈbɪk.wə.t̬əs/, con Flap T en la última sílaba.",
        en: "Initial /juː/ glide: 'ubiquitous' begins with /juːˈbɪk.wə.t̬əs/, with a Flap T before '-ous'.",
      },
      feedback: {
        es: "¡Exacto! «Ubiquitous» significa omnipresente o presente en todas partes.",
        en: "Exactly! 'Ubiquitous' means found everywhere.",
      },
    },
    {
      audioText: "Supply bottlenecks only exacerbated the inflationary pressure.",
      clozeTemplate: "Supply bottlenecks only ___ the inflationary pressure.",
      answer: "exacerbated",
      wordBank: ["exacerbated", "exaggerated", "accelerated", "evaluated"],
      phoneticTip: {
        es: "Acento en segunda sílaba: «exacerbated» (/ɪɡˈzæs.ɚ.beɪ.t̬ɪd/, agravaron) frente a «exaggerated» (/ɪɡˈzædʒ.ə.reɪ.t̬ɪd/).",
        en: "Consonant contrast: notice /s/ in 'exacerbated' (/ɪɡˈzæs.ɚ.beɪ.t̬ɪd/, worsened) vs. /dʒ/ in 'exaggerated'.",
      },
      feedback: {
        es: "¡Correcto! Distinguiste «exacerbated» (agravaron) de «exaggerated» (exageraron).",
        en: "Correct! You distinguished 'exacerbated' (made worse) from 'exaggerated'.",
      },
    },
    {
      audioText: "Having reviewed the telemetry, the navigator altered course.",
      clozeTemplate: "___ reviewed the telemetry, the navigator altered course.",
      answer: "Having",
      wordBank: ["Having", "Had", "Have", "Being"],
      phoneticTip: {
        es: "Cláusula de participio perfecto: «Having reviewed» (/ˈhæv.ɪŋ rɪˈvjuːd/) condensa causa y anterioridad temporal.",
        en: "Perfect participle clause: 'Having reviewed' (/ˈhæv.ɪŋ rɪˈvjuːd/) signals a completed prior action.",
      },
      feedback: {
        es: "¡Muy bien! «Having reviewed...» es una cláusula participial concisa y elegante.",
        en: "Well done! 'Having reviewed...' is a concise C1 participle clause.",
      },
    },
    {
      audioText: "The coastal region experienced unprecedented rainfall this autumn.",
      clozeTemplate: "The coastal region experienced ___ rainfall this autumn.",
      answer: "unprecedented",
      wordBank: ["unprecedented", "unpredictable", "unproductive", "unprotected"],
      phoneticTip: {
        es: "Acento secundario y principal: «unprecedented» (/ʌnˈpres.ə.den.t̬ɪd/) enfatiza la sílaba «-pres-».",
        en: "Word stress: 'unprecedented' (/ʌnˈpres.ə.den.t̬ɪd/) places primary stress on '-pres-'.",
      },
      feedback: {
        es: "¡Exacto! «Unprecedented rainfall» significa lluvias sin precedentes.",
        en: "Exactly! 'Unprecedented' means never experienced or recorded before.",
      },
    },
    {
      audioText: "After lengthy deliberation, the committee reached a consensus.",
      clozeTemplate: "After lengthy deliberation, the committee reached a ___.",
      answer: "consensus",
      wordBank: ["consensus", "concession", "conclusion", "consequence"],
      phoneticTip: {
        es: "Colocación formal: «reach a consensus» (/riːtʃ ə kənˈsen.səs/) lleva schwa en la primera y última sílaba.",
        en: "Formal collocation: 'reach a consensus' (/riːtʃ ə kənˈsen.səs/) stresses the middle syllable '-sen-'.",
      },
      feedback: {
        es: "¡Excelente! «Reached a consensus» es la colocación precisa para lograr un consenso.",
        en: "Excellent! 'Reached a consensus' is the standard formal collocation.",
      },
    },
  ],
  c2: [
    {
      audioText: "Had it not been for the early warning, the vessel would have capsized.",
      clozeTemplate: "___ it not been for the early warning, the vessel would have capsized.",
      answer: "Had",
      wordBank: ["Had", "Were", "Should", "Did"],
      phoneticTip: {
        es: "Inversión condicional tipo 3: «Had it not been for» se enlaza rápido como /ˈhæd.ɪt.nɑːt.bɪn.fɔːr/.",
        en: "Inverted Third Conditional: 'Had it not been for' links rapidly as /ˈhæd.ɪt.nɑːt.bɪn.fɔːr/.",
      },
      feedback: {
        es: "¡Correcto! «Had it not been for...» es la inversión contrafactual de pasado más elevada.",
        en: "Correct! 'Had it not been for...' is a high-register counterfactual conditional inversion.",
      },
    },
    {
      audioText: "The envoy offered an equivocal response to avoid a diplomatic rift.",
      clozeTemplate: "The envoy offered an ___ response to avoid a diplomatic rift.",
      answer: "equivocal",
      wordBank: ["equivocal", "equivalent", "unequivocal", "emotional"],
      phoneticTip: {
        es: "Precisión léxica: «an equivocal» (/ən ɪˈkwɪv.ə.kəl/, ambiguo) vs. «unequivocal» (/ˌʌn.ɪˈkwɪv.ə.kəl/, inequívoco).",
        en: "Lexical precision: distinguish 'an equivocal' (/ən ɪˈkwɪv.ə.kəl/, ambiguous) from 'unequivocal'.",
      },
      feedback: {
        es: "¡Muy bien! «An equivocal response» es una respuesta deliberadamente ambigua.",
        en: "Well done! 'An equivocal response' is deliberately open to multiple interpretations.",
      },
    },
    {
      audioText: "She delivered a cogent critique of the central bank's monetary stance.",
      clozeTemplate: "She delivered a ___ critique of the central bank's monetary stance.",
      answer: "cogent",
      wordBank: ["cogent", "coherent", "urgent", "divergent"],
      phoneticTip: {
        es: "Diptongo /oʊ/ + /dʒ/: «cogent» (/ˈkoʊ.dʒənt/) significa claro, lógico y sumamente convincente.",
        en: "Diphthong /oʊ/ + /dʒ/: 'cogent' (/ˈkoʊ.dʒənt/) means clear, logical, and compelling.",
      },
      feedback: {
        es: "¡Exacto! «A cogent critique» describe una crítica incisiva, lógica y persuasiva.",
        en: "Exactly! 'A cogent critique' is logically rigorous and highly convincing.",
      },
    },
    {
      audioText: "The tariff was ostensibly introduced to protect domestic steel.",
      clozeTemplate: "The tariff was ___ introduced to protect domestic steel.",
      answer: "ostensibly",
      wordBank: ["ostensibly", "obviously", "ostentatiously", "objectively"],
      phoneticTip: {
        es: "Matiz escéptico: «ostensibly» (/ɑːˈsten.sə.bli/) indica el motivo declarado, insinuando que el motivo real puede ser otro.",
        en: "Skeptical nuance: 'ostensibly' (/ɑːˈsten.sə.bli/) signals a stated reason that may mask the true motive.",
      },
      feedback: {
        es: "¡Correcto! «Ostensibly» aporta el matiz de «aparentemente / según se declaró oficialmente».",
        en: "Correct! 'Ostensibly' conveys 'stated as the reason, though perhaps not the actual one'.",
      },
    },
    {
      audioText: "Viral digital trends are notoriously ephemeral by nature.",
      clozeTemplate: "Viral digital trends are notoriously ___ by nature.",
      answer: "ephemeral",
      wordBank: ["ephemeral", "empirical", "ethereal", "perpetual"],
      phoneticTip: {
        es: "Fricativa /f/: «ephemeral» (/ɪˈfem.ɚ.əl/, efímero) acentúa la segunda sílaba «-fem-».",
        en: "Stress on '-phem-': 'ephemeral' (/ɪˈfem.ɚ.əl/, fleeting/short-lived) stresses the second syllable.",
      },
      feedback: {
        es: "¡Muy bien! «Ephemeral» significa efímero o pasajero.",
        en: "Well done! 'Ephemeral' means lasting for a very brief time.",
      },
    },
    {
      audioText: "Mediators struggled to persuade the recalcitrant delegation.",
      clozeTemplate: "Mediators struggled to persuade the ___ delegation.",
      answer: "recalcitrant",
      wordBank: ["recalcitrant", "reluctant", "resilient", "redundant"],
      phoneticTip: {
        es: "Acento en «-cal-»: «recalcitrant» (/rɪˈkæl.sɪ.trənt/) describe resistencia obstinada a la autoridad o al acuerdo.",
        en: "Second-syllable stress: 'recalcitrant' (/rɪˈkæl.sɪ.trənt/) means stubbornly resistant to authority or compromise.",
      },
      feedback: {
        es: "¡Exacto! «Recalcitrant» pertenece al registro culto para describir rebeldía u obstinación.",
        en: "Exactly! 'Recalcitrant' describes stubborn uncooperativeness.",
      },
    },
    {
      audioText: "Despite volatile headwinds, the captain remained sanguine about the voyage.",
      clozeTemplate: "Despite volatile headwinds, the captain remained ___ about the voyage.",
      answer: "sanguine",
      wordBank: ["sanguine", "solemn", "skeptical", "stringent"],
      phoneticTip: {
        es: "Grupo /ŋɡw/: «sanguine» se pronuncia /ˈsæŋ.ɡwɪn/ y significa serenamente optimista en medio de dificultades.",
        en: "Cluster /ŋɡw/: 'sanguine' (/ˈsæŋ.ɡwɪn/) means confidently optimistic despite difficulties.",
      },
      feedback: {
        es: "¡Correcto! «Remained sanguine» significa que mantuvo un optimismo sereno.",
        en: "Correct! 'Remained sanguine' means staying cheerfully optimistic under pressure.",
      },
    },
    {
      audioText: "Monetary stimulus alone is no panacea for structural stagnation.",
      clozeTemplate: "Monetary stimulus alone is no ___ for structural stagnation.",
      answer: "panacea",
      wordBank: ["panacea", "paradigm", "paradox", "parameter"],
      phoneticTip: {
        es: "Cuatro sílabas: «panacea» (/ˌpæn.əˈsiː.ə/, remedio universal) lleva el acento principal en «-ce-» (/ˈsiː/).",
        en: "Four syllables: 'panacea' (/ˌpæn.əˈsiː.ə/, universal cure-all) stresses the third syllable /ˈsiː/.",
      },
      feedback: {
        es: "¡Muy bien! «No panacea for...» significa que no es una panacea ni solución mágica universal.",
        en: "Well done! 'No panacea for...' means not a universal cure-all.",
      },
    },
    {
      audioText: "Her editorial provided a trenchant analysis of institutional inertia.",
      clozeTemplate: "Her editorial provided a ___ analysis of institutional inertia.",
      answer: "trenchant",
      wordBank: ["trenchant", "transient", "transparent", "tolerant"],
      phoneticTip: {
        es: "Africada /tʃ/: «trenchant» (/ˈtren.tʃənt/, incisivo/mordaz) contrasta con «transient» (/ˈtræn.zi.ənt/, transitorio).",
        en: "Affricate /tʃ/: distinguish 'trenchant' (/ˈtren.tʃənt/, sharp/incisive) from 'transient' (/ˈtræn.zi.ənt/).",
      },
      feedback: {
        es: "¡Exacto! «A trenchant analysis» es un análisis agudo, penetrante y contundente.",
        en: "Exactly! 'A trenchant analysis' is sharp, incisive, and vigorously articulate.",
      },
    },
    {
      audioText: "Winning the lawsuit at the cost of solvency proved a Pyrrhic victory.",
      clozeTemplate: "Winning the lawsuit at the cost of solvency proved a ___ victory.",
      answer: "Pyrrhic",
      wordBank: ["Pyrrhic", "public", "historic", "civic"],
      phoneticTip: {
        es: "Expresión clásica: «Pyrrhic victory» (/ˈpɪr.ɪk ˈvɪk.tɚ.i/) es una victoria obtenida a un costo devastador.",
        en: "Classical idiom: 'Pyrrhic victory' (/ˈpɪr.ɪk ˈvɪk.tɚ.i/) is a victory won at too great a cost.",
      },
      feedback: {
        es: "¡Excelente! Dominaste el dictado de nivel Capitán (C2): «a Pyrrhic victory».",
        en: "Excellent! You mastered the Captain-level (C2) dictation: 'a Pyrrhic victory'.",
      },
    },
  ],
};
