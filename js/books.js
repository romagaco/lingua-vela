/**
 * LinguaVela — Books & Extensive Reading Module (js/books.js)
 * Renders 4 illustrated English reading stories with optional US English audio,
 * optional Spanish translation toggle, key vocabulary, and comprehension checks.
 * Pure vanilla JS. Bilingual UI (ES/EN), synced with <html lang>.
 */

(() => {
  const root = document.getElementById("books-root");
  if (!root) return;

  const STORAGE_KEY = "linguavela-books-progress";
  const lang = () => (document.documentElement.lang === "en" ? "en" : "es");
  const L = (es, en) => (lang() === "es" ? es : en);
  const speechSupported = "speechSynthesis" in window;

  function pickVoice() {
    const voices = speechSupported ? window.speechSynthesis.getVoices() : [];
    return (
      voices.find((v) => v.lang === "en-US") ||
      voices.find((v) => v.lang && v.lang.startsWith("en")) ||
      null
    );
  }

  function speak(text, rate = 0.9) {
    if (!speechSupported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;
    const voice = pickVoice();
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeech() {
    if (speechSupported) window.speechSynthesis.cancel();
  }

  /* ==========================================================================
     4 Illustrated Extensive Reading Stories
     ========================================================================== */

  const STORIES = [
    {
      id: "elena-grocery",
      image: "../resources/BooksIcons/Elena_grocery_store.webp",
      imageAlt: {
        es: "Elena con delantal verde acomodando naranjas, manzanas y plátanos en una tienda de comestibles luminosa.",
        en: "Elena in a green apron arranging oranges, apples, and bananas in a bright grocery store.",
      },
      title: {
        es: "Elena's Morning at the Grocery Store",
        en: "Elena's Morning at the Grocery Store",
      },
      subtitle: {
        es: "Una mañana ocupada entre frutas frescas, pan y vecinos amables",
        en: "A busy morning among fresh fruit, bread, and friendly neighbors",
      },
      readTime: { es: "3 min de lectura", en: "3 min read" },
      paragraphs: [
        {
          en: "Every morning at seven o'clock, Elena puts on her green apron and opens the neighborhood grocery store. Sunlight shines through the big front windows while she arranges fresh oranges, yellow bananas, and shiny red apples in a wooden crate.",
          es: "Todas las mañanas a las siete, Elena se pone su delantal verde y abre la tienda de comestibles del barrio. La luz del sol entra por los grandes ventanales mientras ella acomoda naranjas frescas, plátanos amarillos y manzanas rojas brillantes en una caja de madera.",
        },
        {
          en: "Across the aisle, shelves are full of crisp carrots, green broccoli, bell peppers, and purple eggplants. Near the counter, there are glass bottles of cold milk, warm loaves of bread, a wedge of yellow cheese, and cartons of brown eggs.",
          es: "Al otro lado del pasillo, los estantes están llenos de zanahorias crujientes, brócoli verde, pimientos y berenjenas moradas. Cerca del mostrador hay botellas de vidrio con leche fría, hogazas de pan tibio, un trozo de queso amarillo y cartones de huevos.",
        },
        {
          en: "By nine o'clock, families and neighbors arrive with woven baskets. A young boy with a blue backpack points at the red apples, and Elena smiles and hands him the freshest one. She loves knowing that the food she prepares helps bring her community together around the dinner table.",
          es: "Para las nueve, las familias y los vecinos llegan con cestas tejidas. Un niño con una mochila azul señala las manzanas rojas, y Elena sonríe y le entrega la más fresca. Le encanta saber que la comida que prepara ayuda a reunir a su comunidad alrededor de la mesa.",
        },
      ],
      vocab: [
        { word: "apron", meaning: { es: "delantal", en: "apron" } },
        { word: "wooden crate", meaning: { es: "caja de madera", en: "wooden crate" } },
        { word: "aisle", meaning: { es: "pasillo (de tienda)", en: "aisle" } },
        { word: "loaf of bread", meaning: { es: "hogaza de pan", en: "loaf of bread" } },
        { word: "woven basket", meaning: { es: "cesta tejida", en: "woven basket" } },
      ],
      questions: [
        {
          prompt: {
            es: "What time does Elena open the grocery store?",
            en: "What time does Elena open the grocery store?",
          },
          options: ["At six o'clock", "At seven o'clock", "At nine o'clock"],
          correct: 1,
          feedback: {
            es: "¡Correcto! Elena abre la tienda todos los días a las siete («seven o'clock»).",
            en: "Correct! Elena opens the store every morning at seven o'clock.",
          },
        },
        {
          prompt: {
            es: "Which fruits is Elena placing in the wooden crate?",
            en: "Which fruits is Elena placing in the wooden crate?",
          },
          options: [
            "Oranges, bananas, and apples",
            "Carrots, broccoli, and peppers",
            "Bread, cheese, and eggs",
          ],
          correct: 0,
          feedback: {
            es: "¡Muy bien! En la caja de madera acomoda naranjas, plátanos y manzanas.",
            en: "Well done! She arranges oranges, bananas, and apples in the wooden crate.",
          },
        },
        {
          prompt: {
            es: "Why does Elena enjoy her job?",
            en: "Why does Elena enjoy her job?",
          },
          options: [
            "Because she works alone all day",
            "Because the food brings her community together",
            "Because she closes the store at noon",
          ],
          correct: 1,
          feedback: {
            es: "¡Exacto! Le encanta saber que su trabajo ayuda a reunir a la comunidad.",
            en: "Exactly! She loves knowing the food helps bring her community together.",
          },
        },
      ],
    },
    {
      id: "girl-and-cat",
      image: "../resources/BooksIcons/girlcat.webp",
      imageAlt: {
        es: "Una niña con gafas dibujando en su escritorio junto a su gato blanco de ojos verdes y dibujos de gatos en la pared.",
        en: "A girl with glasses drawing at her desk beside her white cat with green eyes and cat drawings on the wall.",
      },
      title: {
        es: "Mia and Snowball's Art Studio",
        en: "Mia and Snowball's Art Studio",
      },
      subtitle: {
        es: "Tardes de lápices de colores, acuarelas y una musa muy peluda",
        en: "Afternoons of colored pencils, watercolors, and a very furry muse",
      },
      readTime: { es: "3 min de lectura", en: "3 min read" },
      paragraphs: [
        {
          en: "Every afternoon after school, Mia sits at her wooden desk beside the sunny window. She adjusts her round glasses, opens her sketchbook, and reaches for a jar full of bright colored pencils and a small tray of watercolors.",
          es: "Todas las tardes después de la escuela, Mia se sienta en su escritorio de madera junto a la ventana soleada. Se acomoda sus gafas redondas, abre su cuaderno de dibujo y toma un frasco lleno de lápices de colores y una pequeña caja de acuarelas.",
        },
        {
          en: "Her fluffy white cat, Snowball, always jumps onto the table to keep her company. Snowball has bright green eyes and wears a soft pink collar with a tiny gold bell. Sometimes Snowball naps near a gray toy mouse, and other times she watches Mia's pencil move across the paper.",
          es: "Su esponjoso gato blanco, Snowball, siempre salta sobre la mesa para hacerle compañía. Snowball tiene ojos verdes brillantes y lleva un collar rosa suave con un cascabel dorado. A veces Snowball duerme cerca de un ratón de juguete gris y otras veces observa cómo se mueve el lápiz de Mia sobre el papel.",
        },
        {
          en: "Behind the desk, the wall looks like a mini art gallery. Seven drawings of Snowball hang neatly in a row—playing with red yarn, stretching, and sleeping peacefully. On the shelf above them sit Mia's favorite books about pets and hobbies.",
          es: "Detrás del escritorio, la pared parece una mini galería de arte. Siete dibujos de Snowball cuelgan ordenados en fila: jugando con estambre rojo, estirándose y durmiendo tranquilamente. En el estante de arriba descansan los libros favoritos de Mia sobre mascotas y pasatiempos.",
        },
      ],
      vocab: [
        { word: "sketchbook", meaning: { es: "cuaderno de dibujo", en: "sketchbook" } },
        { word: "watercolors", meaning: { es: "acuarelas", en: "watercolors" } },
        { word: "fluffy", meaning: { es: "esponjoso / peludo", en: "fluffy" } },
        { word: "yarn", meaning: { es: "estambre / lana", en: "yarn" } },
        { word: "neatly in a row", meaning: { es: "ordenados en fila", en: "neatly in a row" } },
      ],
      questions: [
        {
          prompt: {
            es: "What does Mia use to make her art?",
            en: "What does Mia use to make her art?",
          },
          options: [
            "Colored pencils and watercolors",
            "Clay and wooden blocks",
            "A camera and a laptop",
          ],
          correct: 0,
          feedback: {
            es: "¡Correcto! Mia usa lápices de colores y acuarelas en su escritorio.",
            en: "Correct! Mia uses colored pencils and watercolors at her desk.",
          },
        },
        {
          prompt: {
            es: "What color are Snowball's eyes?",
            en: "What color are Snowball's eyes?",
          },
          options: ["Blue", "Brown", "Green"],
          correct: 2,
          feedback: {
            es: "¡Así es! Snowball es blanco y tiene ojos verdes brillantes.",
            en: "That's right! Snowball is white and has bright green eyes.",
          },
        },
        {
          prompt: {
            es: "What is hanging on the wall behind Mia's desk?",
            en: "What is hanging on the wall behind Mia's desk?",
          },
          options: [
            "Maps of the ocean",
            "Seven drawings of Snowball",
            "School calendars",
          ],
          correct: 1,
          feedback: {
            es: "¡Perfecto! En la pared hay siete dibujos de Snowball en diferentes poses.",
            en: "Perfect! Seven drawings of Snowball in different poses hang on the wall.",
          },
        },
      ],
    },
    {
      id: "weekend-hobbies",
      image: "../resources/BooksIcons/hobbies.webp",
      imageAlt: {
        es: "Tres escenas de pasatiempos: leer un libro de aventuras en la cama, jugar videojuegos en línea con amigos y cocinar pasta el domingo.",
        en: "Three hobby scenes: reading an adventure book in bed, playing online games with friends, and cooking pasta on Sunday.",
      },
      title: {
        es: "Three Friends, Three Favorite Hobbies",
        en: "Three Friends, Three Favorite Hobbies",
      },
      subtitle: {
        es: "Lectura nocturna, partidas en línea y cocina de domingo",
        en: "Nighttime reading, online gaming, and Sunday cooking",
      },
      readTime: { es: "3 min de lectura", en: "3 min read" },
      paragraphs: [
        {
          en: "Everyone needs a favorite way to relax after a long week. When night falls and the moon appears outside his bedroom window, Leo turns on his warm bedside lamp, wears his star-patterned pajamas, and opens an adventure book filled with dragons and hidden treasure.",
          es: "Todos necesitamos una forma favorita de relajarnos después de una semana larga. Cuando cae la noche y aparece la luna fuera de su ventana, Leo enciende la lámpara cálida de su mesa de noche, se pone su pijama de estrellas y abre un libro de aventuras lleno de dragones y tesoros escondidos.",
        },
        {
          en: "On Saturday afternoons, Maya, Sam, and Diego gather around a laptop with colorful headsets and racing controllers. With bowls of popcorn on the desk, they connect online, laugh loudly, and cheer as their red race car speeds toward the finish line.",
          es: "Los sábados por la tarde, Maya, Sam y Diego se reúnen alrededor de una laptop con audífonos de colores y controles de carreras. Con tazones de palomitas sobre el escritorio, se conectan en línea, ríen fuerte y celebran mientras su auto rojo acelera hacia la meta.",
        },
        {
          en: "Sunday morning belongs to Clara and her sunny kitchen. With a yellow apron and fresh herbs growing on the windowsill, she stirs two steaming pots of pasta with garlic, olive oil, and ripe tomatoes. Reading, playing games with friends, and cooking on weekends make every week complete.",
          es: "La mañana del domingo le pertenece a Clara y a su cocina soleada. Con un delantal amarillo y hierbas frescas creciendo en el alféizar de la ventana, revuelve dos ollas humeantes de pasta con ajo, aceite de oliva y tomates maduros. Leer, jugar con amigos y cocinar los fines de semana completan la semana.",
        },
      ],
      vocab: [
        { word: "bedside lamp", meaning: { es: "lámpara de mesa de noche", en: "bedside lamp" } },
        { word: "hidden treasure", meaning: { es: "tesoro escondido", en: "hidden treasure" } },
        { word: "headsets", meaning: { es: "audífonos con micrófono", en: "headsets" } },
        { word: "windowsill", meaning: { es: "alféizar de la ventana", en: "windowsill" } },
        { word: "steaming pots", meaning: { es: "ollas humeantes", en: "steaming pots" } },
      ],
      questions: [
        {
          prompt: {
            es: "What kind of book does Leo read at night?",
            en: "What kind of book does Leo read at night?",
          },
          options: [
            "A cooking magazine",
            "An adventure book about dragons and treasure",
            "A math textbook",
          ],
          correct: 1,
          feedback: {
            es: "¡Correcto! Leo lee un libro de aventuras con dragones y tesoros escondidos.",
            en: "Correct! Leo reads an adventure book with dragons and hidden treasure.",
          },
        },
        {
          prompt: {
            es: "What do Maya, Sam, and Diego eat while playing racing games?",
            en: "What do Maya, Sam, and Diego eat while playing racing games?",
          },
          options: ["Popcorn", "Soup", "Apples"],
          correct: 0,
          feedback: {
            es: "¡Bien! Tienen palomitas de maíz («popcorn») sobre el escritorio.",
            en: "Nice! They have bowls of popcorn on the desk.",
          },
        },
        {
          prompt: {
            es: "On which day does Clara cook pasta in her sunny kitchen?",
            en: "On which day does Clara cook pasta in her sunny kitchen?",
          },
          options: ["Monday", "Wednesday", "Sunday"],
          correct: 2,
          feedback: {
            es: "¡Exacto! Clara cocina su pasta el domingo por la mañana («Sunday morning»).",
            en: "Exactly! Clara cooks her pasta on Sunday morning.",
          },
        },
      ],
    },
    {
      id: "max-the-dog",
      image: "../resources/BooksIcons/max%20the%20dog.webp",
      imageAlt: {
        es: "Max, un cachorro marrón con collar azul y una pelota roja en el hocico, jugando con otros perros en un parque soleado.",
        en: "Max, a brown puppy with a blue collar holding a red ball in his mouth, playing with other dogs in a sunny park.",
      },
      title: {
        es: "Max's Sunny Day at the Park",
        en: "Max's Sunny Day at the Park",
      },
      subtitle: {
        es: "Una pelota roja, un frisbee azul y nuevos amigos entre los árboles",
        en: "A red ball, a blue frisbee, and new friends among the trees",
      },
      readTime: { es: "3 min de lectura", en: "3 min read" },
      paragraphs: [
        {
          en: "Max is a cheerful brown puppy with floppy ears and a bright blue collar. His favorite place in the whole world is the green park down the street, especially on warm mornings when the sun shines high above the tall trees.",
          es: "Max es un cachorro marrón muy alegre, con orejas caídas y un collar azul brillante. Su lugar favorito en todo el mundo es el parque verde al final de la calle, especialmente en las mañanas cálidas cuando el sol brilla alto sobre los árboles.",
        },
        {
          en: "Today, Max carries his favorite shiny red ball gently in his mouth. Wild white daisies and little four-leaf clovers dot the soft grass beside the winding dirt path. Max wags his tail quickly because he sees his friends arriving.",
          es: "Hoy, Max lleva suavemente en el hocico su pelota roja brillante favorita. Margaritas blancas silvestres y pequeños tréboles salpican el césped suave junto al sendero de tierra. Max mueve la cola rápido porque ve llegar a sus amigos.",
        },
        {
          en: "First, a small white puppy with black spots dashes across the lawn. Soon after, a golden dog races down the path with a blue frisbee while a tiny black pup trots happily behind. Together they run, chase balls, and enjoy the sunshine until it is time to walk home.",
          es: "Primero, un cachorro blanco con manchas negras corre por el prado. Poco después, un perro dorado baja corriendo por el sendero con un frisbee azul mientras un cachorrito negro trota feliz detrás. Juntos corren, persiguen pelotas y disfrutan del sol hasta que es hora de volver a casa.",
        },
      ],
      vocab: [
        { word: "floppy ears", meaning: { es: "orejas caídas", en: "floppy ears" } },
        { word: "winding dirt path", meaning: { es: "sendero de tierra sinuoso", en: "winding dirt path" } },
        { word: "wags his tail", meaning: { es: "mueve la cola", en: "wags his tail" } },
        { word: "dashes across", meaning: { es: "corre rápidamente por", en: "dashes across" } },
        { word: "daisies and clovers", meaning: { es: "margaritas y tréboles", en: "daisies and clovers" } },
      ],
      questions: [
        {
          prompt: {
            es: "What is Max holding in his mouth?",
            en: "What is Max holding in his mouth?",
          },
          options: ["A blue frisbee", "A red ball", "A yellow flower"],
          correct: 1,
          feedback: {
            es: "¡Correcto! Max lleva su pelota roja («red ball») en el hocico.",
            en: "Correct! Max is holding his favorite red ball in his mouth.",
          },
        },
        {
          prompt: {
            es: "Which dog is carrying a blue frisbee?",
            en: "Which dog is carrying a blue frisbee?",
          },
          options: [
            "The golden dog",
            "The white spotted puppy",
            "The tiny black pup",
          ],
          correct: 0,
          feedback: {
            es: "¡Muy bien! El perro dorado corre por el sendero con un frisbee azul.",
            en: "Well done! The golden dog races down the path with a blue frisbee.",
          },
        },
        {
          prompt: {
            es: "What flowers and plants grow beside the dirt path?",
            en: "What flowers and plants grow beside the dirt path?",
          },
          options: [
            "Red roses and cacti",
            "White daisies and clovers",
            "Sunflowers and pine cones",
          ],
          correct: 1,
          feedback: {
            es: "¡Exacto! Hay margaritas blancas y tréboles junto al sendero.",
            en: "Exactly! White daisies and clovers grow beside the dirt path.",
          },
        },
      ],
    },
  ];

  /* ==========================================================================
     State
     ========================================================================== */

  let activeStoryId = STORIES[0].id;
  let showSpanish = false;
  const quizAnswers = {}; // { [storyId]: { [qIndex]: { value, correct } } }

  function loadCompleted() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function markCompleted(storyId) {
    const done = loadCompleted();
    done[storyId] = true;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
    } catch {
      // ignore storage errors
    }
  }

  /* ==========================================================================
     Rendering
     ========================================================================== */

  function renderLibraryCards() {
    const done = loadCompleted();
    return `
      <section class="books-library" aria-label="${L("Colección de historias", "Story collection")}">
        ${STORIES.map((s) => {
          const isActive = s.id === activeStoryId;
          const isDone = Boolean(done[s.id]);
          return `
            <button type="button" class="book-card ${isActive ? "active" : ""}" data-select-story="${s.id}" aria-pressed="${isActive}">
              <div class="book-cover-wrap">
                <img src="${s.image}" alt="${s.imageAlt[lang()]}" class="book-cover-img" loading="lazy" />
                ${isDone ? `<span class="book-done-badge">✓ ${L("Completada", "Completed")}</span>` : ""}
              </div>
              <div class="book-card-body">
                <span class="book-meta">${s.readTime[lang()]}</span>
                <h2 class="book-card-title">${s.title[lang()]}</h2>
                <p class="book-card-sub">${s.subtitle[lang()]}</p>
              </div>
            </button>
          `;
        }).join("")}
      </section>
    `;
  }

  function renderActiveReader() {
    const story = STORIES.find((s) => s.id === activeStoryId) || STORIES[0];
    const fullEnglishText = story.paragraphs.map((p) => p.en).join(" ");
    const storyAnswers = quizAnswers[story.id] || {};
    const letters = ["A", "B", "C", "D"];

    const paragraphsHtml = story.paragraphs
      .map(
        (p) => `
        <div class="story-paragraph-block">
          <p class="story-en">${p.en}</p>
          ${showSpanish ? `<p class="story-es">${p.es}</p>` : ""}
        </div>`
      )
      .join("");

    const vocabHtml = story.vocab
      .map(
        (v) => `
        <button type="button" class="vocab-chip" data-speak="${v.word}" title="${L("Escuchar pronunciación", "Listen to pronunciation")}">
          <span aria-hidden="true">🔊</span>
          <strong>${v.word}</strong>
          <span class="vocab-chip-sep">—</span>
          <span>${v.meaning[lang()]}</span>
        </button>`
      )
      .join("");

    const questionsHtml = story.questions
      .map((q, idx) => {
        const state = storyAnswers[idx];
        const opts = q.options
          .map((opt, optIdx) => {
            let cls = "option-btn";
            if (state && state.value === optIdx) {
              cls += state.correct ? " selected-correct" : " selected-wrong";
            }
            return `
              <button type="button" class="${cls}" data-story="${story.id}" data-q="${idx}" data-opt="${optIdx}">
                <span class="option-letter" aria-hidden="true">${letters[optIdx]}</span>
                <span>${opt}</span>
              </button>`;
          })
          .join("");

        let feedback = "";
        if (state) {
          feedback = state.correct
            ? `<div class="feedback-banner visible success" role="status">✓ ${q.feedback[lang()]}</div>`
            : `<div class="feedback-banner visible error" role="status">✕ ${L("No es esa. Relee la historia e inténtalo de nuevo.", "Not quite. Re-read the story and try again.")}</div>`;
        }

        return `
          <li class="quiz-item">
            <p class="quiz-prompt"><span class="quiz-num">${idx + 1}</span>${q.prompt[lang()]}</p>
            <div class="options-list" role="group" aria-label="${L("Opciones de respuesta", "Answer options")}">${opts}</div>
            ${feedback}
          </li>`;
      })
      .join("");

    const correctCount = Object.values(storyAnswers).filter((a) => a.correct).length;

    return `
      <article class="card story-reader" aria-labelledby="active-story-title">
        <div class="story-hero-grid">
          <div class="story-art-frame">
            <img src="${story.image}" alt="${story.imageAlt[lang()]}" class="story-art-img" />
          </div>

          <div class="story-header-info">
            <span class="card-eyebrow">${L("LECTURA EXTENSA • SIN NIVELES", "EXTENSIVE READING • ALL LEVELS")}</span>
            <h2 id="active-story-title" class="theory-title">${story.title[lang()]}</h2>
            <p class="theory-explanation">${story.subtitle[lang()]}</p>

            <div class="story-controls">
              ${
                speechSupported
                  ? `<button type="button" class="btn btn-primary" data-speak-story="${story.id}">🔊 ${L("Escuchar historia", "Listen to story")}</button>
                     <button type="button" class="btn btn-light" data-stop-speech="true">⏹ ${L("Detener audio", "Stop")}</button>`
                  : ""
              }
              <button type="button" class="btn btn-dark" data-toggle-translation="true" aria-pressed="${showSpanish}">
                ${showSpanish ? L("Ocultar traducción (ES)", "Hide Spanish translation") : L("Ver traducción (ES)", "Show Spanish translation")}
              </button>
            </div>
          </div>
        </div>

        <div class="story-body" lang="en">
          ${paragraphsHtml}
        </div>

        <div class="lesson-step">
          <span class="example-box-label">${L("VOCABULARIO CLAVE (TOCA PARA ESCUCHAR)", "KEY VOCABULARY (TAP TO LISTEN)")}</span>
          <div class="vocab-chips">${vocabHtml}</div>
        </div>

        <div class="lesson-quiz">
          <div class="quiz-header">
            <div>
              <span class="card-eyebrow">${L("COMPRENSIÓN LECTORA", "READING CHECK")}</span>
              <h3 class="quiz-title">${L("Preguntas sobre la historia", "Questions about the story")}</h3>
            </div>
            <div class="quiz-score" aria-live="polite">
              <span class="badge badge-teal">${L("Correctas", "Correct")}: ${correctCount} / ${story.questions.length}</span>
            </div>
          </div>
          <ol class="quiz-list">${questionsHtml}</ol>
        </div>
      </article>
    `;
  }

  function render() {
    const scrollY = window.scrollY;
    root.innerHTML = `
      ${renderLibraryCards()}
      ${renderActiveReader()}
    `;
    window.scrollTo(0, scrollY);
  }

  /* ==========================================================================
     Events
     ========================================================================== */

  root.addEventListener("click", (event) => {
    const selectBtn = event.target.closest("[data-select-story]");
    if (selectBtn) {
      stopSpeech();
      activeStoryId = selectBtn.dataset.selectStory;
      render();
      const reader = root.querySelector(".story-reader");
      if (reader) reader.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const speakStoryBtn = event.target.closest("[data-speak-story]");
    if (speakStoryBtn) {
      const story = STORIES.find((s) => s.id === speakStoryBtn.dataset.speakStory);
      if (story) speak(story.paragraphs.map((p) => p.en).join(" "), 0.88);
      return;
    }

    if (event.target.closest("[data-stop-speech]")) {
      stopSpeech();
      return;
    }

    if (event.target.closest("[data-toggle-translation]")) {
      showSpanish = !showSpanish;
      render();
      return;
    }

    const speakWordBtn = event.target.closest("[data-speak]");
    if (speakWordBtn) {
      speak(speakWordBtn.dataset.speak, 0.85);
      return;
    }

    const optBtn = event.target.closest(".option-btn[data-story]");
    if (optBtn) {
      const { story: storyId, q, opt } = optBtn.dataset;
      const qIdx = Number(q);
      const optIdx = Number(opt);
      const storyObj = STORIES.find((s) => s.id === storyId);
      if (!storyObj) return;
      const isCorrect = optIdx === storyObj.questions[qIdx].correct;
      if (!quizAnswers[storyId]) quizAnswers[storyId] = {};
      if (quizAnswers[storyId][qIdx] && quizAnswers[storyId][qIdx].correct) return;
      quizAnswers[storyId][qIdx] = { value: optIdx, correct: isCorrect };
      const allCorrect = storyObj.questions.every(
        (_, i) => quizAnswers[storyId][i] && quizAnswers[storyId][i].correct
      );
      if (allCorrect) markCompleted(storyId);
      render();
    }
  });

  if (speechSupported) window.speechSynthesis.onvoiceschanged = pickVoice;

  new MutationObserver(render).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });

  render();
})();
