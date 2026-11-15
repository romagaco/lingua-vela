/**
 * LinguaVela — Vocabulary Module: Animals Flashcards (40 Animals)
 * Category under Lessons -> Vocabulary -> Animals
 * Pure Vanilla JavaScript (ES6+).
 * Features:
 *   - 40 animal flashcards with Fun Fact, Country, and Population
 *   - Information visible ONLY when clicked on (flip interaction)
 *   - Web Speech API audio pronunciation (US English)
 *   - Bilingual support (ES / EN) reacting to <html lang> changes
 *   - Keyboard accessible (Tab + Enter/Space to flip)
 *   - Search / filter by animal name
 *   - Flip All / Hide All actions & study counter
 */

(() => {
  "use strict";

  const ANIMALS_DATA = [
    {
      id: 1,
      name: "African Elephant",
      nameEs: "Elefante Africano",
      icon: "🐘",
      funFact: {
        en: "An African elephant can eat 150 kg of food in one day",
        es: "Un elefante africano puede comer 150 kg de comida en un solo día",
      },
      country: {
        en: "Botswana",
        es: "Botsuana",
      },
      population: {
        en: "415,000",
        es: "415,000",
      },
    },
    {
      id: 2,
      name: "Arctic Fox",
      nameEs: "Zorro Ártico",
      icon: "🦊",
      funFact: {
        en: "Its fur changes color, white in winter and brown in summer",
        es: "Su pelaje cambia de color: blanco en invierno y marrón en verano",
      },
      country: {
        en: "Canada",
        es: "Canadá",
      },
      population: {
        en: "200,000",
        es: "200,000",
      },
    },
    {
      id: 3,
      name: "Axolotl",
      nameEs: "Ajolote",
      icon: "🦎",
      funFact: {
        en: "It can regrow its legs, heart, and even parts of its brain",
        es: "Puede regenerar sus patas, corazón e incluso partes de su cerebro",
      },
      country: {
        en: "Mexico",
        es: "México",
      },
      population: {
        en: "Fewer than 1,000 in wild",
        es: "Menos de 1,000 en estado salvaje",
      },
    },
    {
      id: 4,
      name: "Bengal Tiger",
      nameEs: "Tigre de Bengala",
      icon: "🐅",
      funFact: {
        en: "Each tiger has a unique stripe pattern, like a fingerprint",
        es: "Cada tigre tiene un patrón de rayas único, como una huella dactilar",
      },
      country: {
        en: "India",
        es: "India",
      },
      population: {
        en: "3,600 in India",
        es: "3,600 en India",
      },
    },
    {
      id: 5,
      name: "Blue Whale",
      nameEs: "Ballena Azul",
      icon: "🐋",
      funFact: {
        en: "It is the biggest animal that has ever lived, its heart is as big as a car",
        es: "Es el animal más grande que jamás ha vivido; su corazón es del tamaño de un auto",
      },
      country: {
        en: "Worldwide oceans",
        es: "Océanos de todo el mundo",
      },
      population: {
        en: "10,000 to 25,000",
        es: "10,000 a 25,000",
      },
    },
    {
      id: 6,
      name: "Capybara",
      nameEs: "Capibara",
      icon: "🦫",
      funFact: {
        en: "It is the biggest rodent in the world and it loves to swim",
        es: "Es el roedor más grande del mundo y le encanta nadar",
      },
      country: {
        en: "Brazil",
        es: "Brasil",
      },
      population: {
        en: "Unknown, millions, stable",
        es: "Desconocida, millones, estable",
      },
    },
    {
      id: 7,
      name: "Cheetah",
      nameEs: "Guepardo",
      icon: "🐆",
      funFact: {
        en: "It is the fastest land animal, it can run 100 km per hour",
        es: "Es el animal terrestre más veloz: puede correr a 100 km por hora",
      },
      country: {
        en: "Namibia",
        es: "Namibia",
      },
      population: {
        en: "6,500 to 7,000",
        es: "6,500 a 7,000",
      },
    },
    {
      id: 8,
      name: "Dolphin",
      nameEs: "Delfín",
      icon: "🐬",
      funFact: {
        en: "Dolphins talk with whistles and they can recognize their own name",
        es: "Los delfines se comunican con silbidos y pueden reconocer su propio nombre",
      },
      country: {
        en: "Worldwide oceans",
        es: "Océanos de todo el mundo",
      },
      population: {
        en: "600,000",
        es: "600,000",
      },
    },
    {
      id: 9,
      name: "Emperor Penguin",
      nameEs: "Pingüino Emperador",
      icon: "🐧",
      funFact: {
        en: "The male penguin keeps the egg warm on his feet in freezing winter",
        es: "El macho mantiene el huevo caliente sobre sus patas en el gélido invierno",
      },
      country: {
        en: "Antarctica",
        es: "Antártida",
      },
      population: {
        en: "600,000",
        es: "600,000",
      },
    },
    {
      id: 10,
      name: "Fennec Fox",
      nameEs: "Zorro Fénec",
      icon: "🦊",
      funFact: {
        en: "It has huge ears that help it hear and stay cool in the desert",
        es: "Tiene orejas enormes que le ayudan a oír y mantenerse fresco en el desierto",
      },
      country: {
        en: "Morocco",
        es: "Marruecos",
      },
      population: {
        en: "Unknown, stable",
        es: "Desconocida, estable",
      },
    },
    {
      id: 11,
      name: "Flamingo",
      nameEs: "Flamenco",
      icon: "🦩",
      funFact: {
        en: "Flamingos are pink because of the food they eat, they are born gray",
        es: "Los flamencos son rosas por los alimentos que comen; nacen de color gris",
      },
      country: {
        en: "Kenya",
        es: "Kenia",
      },
      population: {
        en: "500,000 to 600,000",
        es: "500,000 a 600,000",
      },
    },
    {
      id: 12,
      name: "Giraffe",
      nameEs: "Jirafa",
      icon: "🦒",
      funFact: {
        en: "A giraffe has a tongue 45 cm long and it can clean its own ears",
        es: "Una jirafa tiene una lengua de 45 cm de largo y puede limpiarse sus propias orejas",
      },
      country: {
        en: "Kenya",
        es: "Kenia",
      },
      population: {
        en: "117,000",
        es: "117,000",
      },
    },
    {
      id: 13,
      name: "Gorilla",
      nameEs: "Gorila",
      icon: "🦍",
      funFact: {
        en: "Gorillas share about 98 percent of their DNA with humans",
        es: "Los gorilas comparten cerca del 98 por ciento de su ADN con los humanos",
      },
      country: {
        en: "Rwanda",
        es: "Ruanda",
      },
      population: {
        en: "1,063 mountain gorillas",
        es: "1,063 gorilas de montaña",
      },
    },
    {
      id: 14,
      name: "Hedgehog",
      nameEs: "Erizo",
      icon: "🦔",
      funFact: {
        en: "When it is scared, it rolls into a ball of spikes",
        es: "Cuando tiene miedo, se enrolla formando una bola de púas",
      },
      country: {
        en: "United Kingdom",
        es: "Reino Unido",
      },
      population: {
        en: "1 million in UK, declining",
        es: "1 millón en el Reino Unido, en declive",
      },
    },
    {
      id: 15,
      name: "Hippopotamus",
      nameEs: "Hipopótamo",
      icon: "🦛",
      funFact: {
        en: "Hippos cannot swim, they walk on the bottom of rivers",
        es: "Los hipopótamos no pueden nadar: caminan sobre el fondo de los ríos",
      },
      country: {
        en: "Zambia",
        es: "Zambia",
      },
      population: {
        en: "115,000 to 130,000",
        es: "115,000 a 130,000",
      },
    },
    {
      id: 16,
      name: "Iguana",
      nameEs: "Iguana",
      icon: "🦎",
      funFact: {
        en: "Iguanas can drop their tail to escape and grow a new one",
        es: "Las iguanas pueden desprenderse de su cola para escapar y luego regenerar una nueva",
      },
      country: {
        en: "Mexico",
        es: "México",
      },
      population: {
        en: "Unknown, common, millions",
        es: "Desconocida, común, millones",
      },
    },
    {
      id: 17,
      name: "Jaguar",
      nameEs: "Jaguar",
      icon: "🐆",
      funFact: {
        en: "A jaguar has the strongest bite of all big cats",
        es: "El jaguar tiene la mordida más fuerte de todos los grandes felinos",
      },
      country: {
        en: "Brazil",
        es: "Brasil",
      },
      population: {
        en: "64,000",
        es: "64,000",
      },
    },
    {
      id: 18,
      name: "Kangaroo",
      nameEs: "Canguro",
      icon: "🦘",
      funFact: {
        en: "Kangaroos cannot walk backwards, they only hop forward",
        es: "Los canguros no pueden caminar hacia atrás; solo saltan hacia adelante",
      },
      country: {
        en: "Australia",
        es: "Australia",
      },
      population: {
        en: "8 to 10 million",
        es: "8 a 10 millones",
      },
    },
    {
      id: 19,
      name: "Koala",
      nameEs: "Koala",
      icon: "🐨",
      funFact: {
        en: "Koalas sleep 18 to 20 hours a day and eat only eucalyptus leaves",
        es: "Los koalas duermen de 18 a 20 horas al día y comen únicamente hojas de eucalipto",
      },
      country: {
        en: "Australia",
        es: "Australia",
      },
      population: {
        en: "300,000 to 600,000",
        es: "300,000 a 600,000",
      },
    },
    {
      id: 20,
      name: "Lion",
      nameEs: "León",
      icon: "🦁",
      funFact: {
        en: "A lion's roar can be heard 8 km away",
        es: "El rugido de un león se puede escuchar a 8 km de distancia",
      },
      country: {
        en: "Tanzania",
        es: "Tanzania",
      },
      population: {
        en: "23,000 to 25,000",
        es: "23,000 a 25,000",
      },
    },
    {
      id: 21,
      name: "Llama",
      nameEs: "Llama",
      icon: "🦙",
      funFact: {
        en: "Llamas hum to talk to each other and they spit when they are angry",
        es: "Las llamas tararean para comunicarse entre sí y escupen cuando están enojadas",
      },
      country: {
        en: "Peru",
        es: "Perú",
      },
      population: {
        en: "3 million domesticated",
        es: "3 millones domesticadas",
      },
    },
    {
      id: 22,
      name: "Manatee",
      nameEs: "Manatí",
      icon: "🦭",
      funFact: {
        en: "Manatees are gentle giants and they have no natural enemies",
        es: "Los manatíes son gigantes bondadosos y no tienen depredadores naturales",
      },
      country: {
        en: "United States",
        es: "Estados Unidos",
      },
      population: {
        en: "13,000",
        es: "13,000",
      },
    },
    {
      id: 23,
      name: "Meerkat",
      nameEs: "Suricata",
      icon: "🐾",
      funFact: {
        en: "Meerkats take turns watching for danger while others eat",
        es: "Los suricatas se turnan para vigilar el peligro mientras los demás comen",
      },
      country: {
        en: "South Africa",
        es: "Sudáfrica",
      },
      population: {
        en: "Unknown, common, 100,000 plus",
        es: "Desconocida, común, más de 100,000",
      },
    },
    {
      id: 24,
      name: "Narwhal",
      nameEs: "Narval",
      icon: "🐋",
      funFact: {
        en: "The narwhal's tusk is actually a tooth that can be 3 meters long",
        es: "El colmillo del narval es en realidad un diente que puede medir 3 metros de largo",
      },
      country: {
        en: "Canada",
        es: "Canadá",
      },
      population: {
        en: "80,000 to 170,000",
        es: "80,000 a 170,000",
      },
    },
    {
      id: 25,
      name: "Octopus",
      nameEs: "Pulpo",
      icon: "🐙",
      funFact: {
        en: "An octopus has three hearts and blue blood",
        es: "Un pulpo tiene tres corazones y sangre azul",
      },
      country: {
        en: "Worldwide oceans",
        es: "Océanos de todo el mundo",
      },
      population: {
        en: "Unknown, common",
        es: "Desconocida, común",
      },
    },
    {
      id: 26,
      name: "Orangutan",
      nameEs: "Orangután",
      icon: "🦧",
      funFact: {
        en: "Orangutans use tools and share 97 percent of DNA with humans",
        es: "Los orangutanes usan herramientas y comparten el 97 por ciento de su ADN con los humanos",
      },
      country: {
        en: "Indonesia",
        es: "Indonesia",
      },
      population: {
        en: "100,000 Bornean",
        es: "100,000 de Borneo",
      },
    },
    {
      id: 27,
      name: "Panda",
      nameEs: "Panda",
      icon: "🐼",
      funFact: {
        en: "Pandas eat bamboo for 12 hours a day and they do not hibernate",
        es: "Los pandas comen bambú durante 12 horas al día y no hibernan",
      },
      country: {
        en: "China",
        es: "China",
      },
      population: {
        en: "1,864 in wild",
        es: "1,864 en estado salvaje",
      },
    },
    {
      id: 28,
      name: "Polar Bear",
      nameEs: "Oso Polar",
      icon: "🐻‍❄️",
      funFact: {
        en: "Polar bears have black skin under their white fur",
        es: "Los osos polares tienen piel negra debajo de su pelaje blanco",
      },
      country: {
        en: "Canada",
        es: "Canadá",
      },
      population: {
        en: "26,000",
        es: "26,000",
      },
    },
    {
      id: 29,
      name: "Quokka",
      nameEs: "Quokka",
      icon: "🦘",
      funFact: {
        en: "Quokkas always look like they are smiling, people call them the happiest animal",
        es: "Los quokkas siempre parecen sonreír; la gente los llama los animales más felices del mundo",
      },
      country: {
        en: "Australia",
        es: "Australia",
      },
      population: {
        en: "7,500 to 15,000",
        es: "7,500 a 15,000",
      },
    },
    {
      id: 30,
      name: "Raccoon",
      nameEs: "Mapache",
      icon: "🦝",
      funFact: {
        en: "Raccoons wash their food in water before they eat it",
        es: "Los mapaches lavan su comida en agua antes de comerla",
      },
      country: {
        en: "United States",
        es: "Estados Unidos",
      },
      population: {
        en: "10 to 20 million",
        es: "10 a 20 millones",
      },
    },
    {
      id: 31,
      name: "Red Panda",
      nameEs: "Panda Rojo",
      icon: "🦊",
      funFact: {
        en: "Red pandas are not pandas, they are more related to raccoons",
        es: "Los pandas rojos no son pandas: están más emparentados con los mapaches",
      },
      country: {
        en: "Nepal",
        es: "Nepal",
      },
      population: {
        en: "10,000",
        es: "10,000",
      },
    },
    {
      id: 32,
      name: "Sloth",
      nameEs: "Perezoso",
      icon: "🦥",
      funFact: {
        en: "Sloths move so slowly that algae grows on their fur",
        es: "Los perezosos se mueven tan despacio que les crecen algas en el pelaje",
      },
      country: {
        en: "Costa Rica",
        es: "Costa Rica",
      },
      population: {
        en: "Unknown, common",
        es: "Desconocida, común",
      },
    },
    {
      id: 33,
      name: "Snow Leopard",
      nameEs: "Leopardo de las Nieves",
      icon: "🐆",
      funFact: {
        en: "Snow leopards cannot roar, they are called the ghost of the mountains",
        es: "Los leopardos de las nieves no rugen; se les conoce como el fantasma de las montañas",
      },
      country: {
        en: "Mongolia",
        es: "Mongolia",
      },
      population: {
        en: "4,000 to 6,500",
        es: "4,000 a 6,500",
      },
    },
    {
      id: 34,
      name: "Toucan",
      nameEs: "Tucán",
      icon: "🦜",
      funFact: {
        en: "A toucan's beak looks heavy but it is very light",
        es: "El pico del tucán parece pesado, pero en realidad es muy ligero",
      },
      country: {
        en: "Brazil",
        es: "Brasil",
      },
      population: {
        en: "Unknown, common",
        es: "Desconocida, común",
      },
    },
    {
      id: 35,
      name: "Uakari",
      nameEs: "Uakarí Calvo",
      icon: "🐵",
      funFact: {
        en: "Bald uakaris have bright red faces because of blood flow",
        es: "Los uakarís calvos tienen la cara de color rojo brillante debido al flujo sanguíneo",
      },
      country: {
        en: "Brazil",
        es: "Brasil",
      },
      population: {
        en: "Unknown, declining",
        es: "Desconocida, en declive",
      },
    },
    {
      id: 36,
      name: "Vulture",
      nameEs: "Buitre",
      icon: "🦅",
      funFact: {
        en: "Vultures can eat rotten meat without getting sick",
        es: "Los buitres pueden comer carne podrida sin enfermarse",
      },
      country: {
        en: "Spain",
        es: "España",
      },
      population: {
        en: "80,000",
        es: "80,000",
      },
    },
    {
      id: 37,
      name: "Wolf",
      nameEs: "Lobo",
      icon: "🐺",
      funFact: {
        en: "Wolves howl to talk to their pack, not to the moon",
        es: "Los lobos aúllan para comunicarse con su manada, no a la luna",
      },
      country: {
        en: "Canada",
        es: "Canadá",
      },
      population: {
        en: "200,000 to 250,000",
        es: "200,000 a 250,000",
      },
    },
    {
      id: 38,
      name: "Xenopus Frog",
      nameEs: "Rana Xenopus",
      icon: "🐸",
      funFact: {
        en: "This frog has no tongue, it uses its hands to push food into its mouth",
        es: "Esta rana no tiene lengua: usa sus patas delanteras para meter la comida en su boca",
      },
      country: {
        en: "South Africa",
        es: "Sudáfrica",
      },
      population: {
        en: "Unknown, common",
        es: "Desconocida, común",
      },
    },
    {
      id: 39,
      name: "Yak",
      nameEs: "Yak",
      icon: "🐂",
      funFact: {
        en: "Yaks have long hair to survive cold mountains and they grunt, not moo",
        es: "Los yaks tienen pelaje largo para resistir las montañas heladas y gruñen en vez de mugir",
      },
      country: {
        en: "China",
        es: "China",
      },
      population: {
        en: "14 million domesticated",
        es: "14 millones domesticados",
      },
    },
    {
      id: 40,
      name: "Zebra",
      nameEs: "Cebra",
      icon: "🦓",
      funFact: {
        en: "Each zebra has a unique stripe pattern, no two are the same",
        es: "Cada cebra tiene un patrón de rayas único; no hay dos idénticas",
      },
      country: {
        en: "Kenya",
        es: "Kenia",
      },
      population: {
        en: "500,000 to 600,000 plains zebras",
        es: "500,000 a 600,000 cebras de llanura",
      },
    },
  ];

  /* ==========================================================================
     State & Utilities
     ========================================================================== */

  // Set of animal IDs that are currently flipped (revealing information)
  const flippedIds = new Set();
  let searchTerm = "";

  const lang = () => (document.documentElement.lang === "en" ? "en" : "es");

  const t = (value) =>
    value && typeof value === "object" && !Array.isArray(value) && "es" in value
      ? value[lang()]
      : value;

  // Web Speech API for pronunciation
  const speechSupported = "speechSynthesis" in window;

  function speak(text, rate = 0.85) {
    if (!speechSupported) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = rate;
      const voices = window.speechSynthesis.getVoices();
      const voice =
        voices.find((v) => v.lang === "en-US") ||
        voices.find((v) => v.lang && v.lang.startsWith("en"));
      if (voice) utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
    }
  }

  /* ==========================================================================
     Rendering
     ========================================================================== */

  function renderStats() {
    const totalEl = document.getElementById("animals-total-count");
    const revealedEl = document.getElementById("animals-revealed-count");
    if (totalEl) totalEl.textContent = ANIMALS_DATA.length;
    if (revealedEl) revealedEl.textContent = flippedIds.size;
  }

  function getFilteredAnimals() {
    if (!searchTerm.trim()) return ANIMALS_DATA;
    const q = searchTerm.trim().toLowerCase();
    return ANIMALS_DATA.filter((a) => {
      const matchNameEn = a.name.toLowerCase().includes(q);
      const matchNameEs = a.nameEs.toLowerCase().includes(q);
      const matchCountry =
        a.country.en.toLowerCase().includes(q) ||
        a.country.es.toLowerCase().includes(q);
      const matchNum = String(a.id) === q;
      return matchNameEn || matchNameEs || matchCountry || matchNum;
    });
  }

  function renderCard(animal) {
    const isFlipped = flippedIds.has(animal.id);
    const isEs = lang() === "es";

    const clickToRevealHint = isEs
      ? "👆 Haz clic para ver información"
      : "👆 Click to reveal information";
    const clickToHideHint = isEs
      ? "↺ Haz clic para voltear"
      : "↺ Click to flip back";

    const funFactLabel = isEs ? "Dato curioso" : "Fun Fact";
    const countryLabel = isEs ? "País" : "Country";
    const populationLabel = isEs ? "Población" : "Population";

    return `
      <article
        class="flashcard ${isFlipped ? "is-flipped" : ""}"
        tabindex="0"
        role="button"
        aria-pressed="${isFlipped ? "true" : "false"}"
        aria-label="${animal.name} (${animal.nameEs}). ${
          isFlipped
            ? isEs
              ? "Información visible. Haz clic para ocultar."
              : "Information visible. Click to hide."
            : isEs
              ? "Haz clic para ver información."
              : "Click to reveal information."
        }"
        data-animal-id="${animal.id}"
      >
        <div class="flashcard-inner">
          <!-- FRONT SIDE (Visible initially) -->
          <div class="flashcard-front">
            <div class="flashcard-header">
              <span class="flashcard-number">#${animal.id}</span>
              <button
                type="button"
                class="flashcard-audio-btn"
                data-speak-animal="${animal.name}"
                aria-label="${isEs ? "Escuchar pronunciación" : "Listen to pronunciation"}: ${animal.name}"
                title="${isEs ? "Escuchar pronunciación nativa" : "Listen to native pronunciation"}"
              >
                <span aria-hidden="true">🔊</span>
              </button>
            </div>

            <div class="flashcard-body">
              <span class="flashcard-icon" aria-hidden="true">${animal.icon}</span>
              <h3 class="flashcard-title">${animal.name}</h3>
              ${
                isEs
                  ? `<span class="flashcard-subtitle">${animal.nameEs}</span>`
                  : ""
              }
            </div>

            <div class="flashcard-footer">
              <span class="flashcard-hint">
                <span aria-hidden="true">👆</span>
                <span>${clickToRevealHint}</span>
              </span>
            </div>
          </div>

          <!-- BACK SIDE (Visible ONLY when clicked on) -->
          <div class="flashcard-back" ${isFlipped ? "" : 'aria-hidden="true"'}>
            <div class="flashcard-header">
              <span class="flashcard-number">#${animal.id}</span>
              <div class="flashcard-back-title-wrap">
                <span class="flashcard-back-icon" aria-hidden="true">${animal.icon}</span>
                <span class="flashcard-back-title">${animal.name}</span>
              </div>
              <button
                type="button"
                class="flashcard-audio-btn"
                data-speak-animal="${animal.name}"
                aria-label="${isEs ? "Escuchar pronunciación" : "Listen to pronunciation"}: ${animal.name}"
                title="${isEs ? "Escuchar pronunciación" : "Listen"}"
              >
                <span aria-hidden="true">🔊</span>
              </button>
            </div>

            <div class="flashcard-info-list">
              <div class="flashcard-info-item">
                <div class="flashcard-info-label">
                  <span aria-hidden="true">💡</span>
                  <strong>${funFactLabel}</strong>
                </div>
                <p class="flashcard-info-text">${t(animal.funFact)}</p>
              </div>

              <div class="flashcard-info-grid">
                <div class="flashcard-info-item">
                  <div class="flashcard-info-label">
                    <span aria-hidden="true">🌍</span>
                    <strong>${countryLabel}</strong>
                  </div>
                  <p class="flashcard-info-text">${t(animal.country)}</p>
                </div>

                <div class="flashcard-info-item">
                  <div class="flashcard-info-label">
                    <span aria-hidden="true">📊</span>
                    <strong>${populationLabel}</strong>
                  </div>
                  <p class="flashcard-info-text">${t(animal.population)}</p>
                </div>
              </div>
            </div>

            <div class="flashcard-footer">
              <span class="flashcard-hint flashcard-hint-back">
                <span aria-hidden="true">↺</span>
                <span>${clickToHideHint}</span>
              </span>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderGrid() {
    const grid = document.getElementById("animals-flashcards-grid");
    if (!grid) return;

    const filtered = getFilteredAnimals();
    if (filtered.length === 0) {
      const isEs = lang() === "es";
      grid.innerHTML = `
        <div class="flashcards-empty-state">
          <span class="empty-icon" aria-hidden="true">🔍</span>
          <h4>${isEs ? "No se encontraron animales" : "No animals found"}</h4>
          <p>${
            isEs
              ? `No hay animales que coincidan con «${searchTerm}». Prueba con otro término.`
              : `No animals match "${searchTerm}". Try another search term.`
          }</p>
          <button type="button" id="clear-search-btn" class="btn btn-light">
            ${isEs ? "Limpiar búsqueda" : "Clear search"}
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(renderCard).join("");
    renderStats();
  }

  /* ==========================================================================
     Card Interaction: Flip on click, audio, controls
     ========================================================================== */

  function toggleFlip(animalId) {
    if (flippedIds.has(animalId)) {
      flippedIds.delete(animalId);
    } else {
      flippedIds.add(animalId);
    }

    // Update DOM directly for smooth transition without re-rendering whole list
    const card = document.querySelector(`.flashcard[data-animal-id="${animalId}"]`);
    if (card) {
      const isFlipped = flippedIds.has(animalId);
      card.classList.toggle("is-flipped", isFlipped);
      card.setAttribute("aria-pressed", isFlipped ? "true" : "false");

      const back = card.querySelector(".flashcard-back");
      if (back) {
        if (isFlipped) back.removeAttribute("aria-hidden");
        else back.setAttribute("aria-hidden", "true");
      }
    }
    renderStats();
  }

  function flipAll() {
    ANIMALS_DATA.forEach((a) => flippedIds.add(a.id));
    renderGrid();
  }

  function hideAll() {
    flippedIds.clear();
    renderGrid();
  }

  function shuffleCards() {
    // Fisher-Yates shuffle
    for (let i = ANIMALS_DATA.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ANIMALS_DATA[i], ANIMALS_DATA[j]] = [ANIMALS_DATA[j], ANIMALS_DATA[i]];
    }
    renderGrid();
  }

  /* ==========================================================================
     Event Listeners
     ========================================================================== */

  function setupEvents() {
    const grid = document.getElementById("animals-flashcards-grid");

    if (grid) {
      // Delegated click handler on flashcards
      grid.addEventListener("click", (event) => {
        // If clicking speech button, speak and don't flip
        const audioBtn = event.target.closest("[data-speak-animal]");
        if (audioBtn) {
          event.stopPropagation();
          const word = audioBtn.getAttribute("data-speak-animal");
          if (word) speak(word);
          return;
        }

        // If clicking clear search button in empty state
        const clearBtn = event.target.closest("#clear-search-btn");
        if (clearBtn) {
          const searchInput = document.getElementById("animals-search-input");
          if (searchInput) {
            searchInput.value = "";
            searchTerm = "";
            renderGrid();
          }
          return;
        }

        // Flashcard clicked
        const card = event.target.closest(".flashcard");
        if (card) {
          const id = Number(card.getAttribute("data-animal-id"));
          if (id) toggleFlip(id);
        }
      });

      // Keyboard support: Enter / Space to flip
      grid.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          const card = event.target.closest(".flashcard");
          if (card && event.target === card) {
            event.preventDefault();
            const id = Number(card.getAttribute("data-animal-id"));
            if (id) toggleFlip(id);
          }
        }
      });
    }

    // Action toolbar buttons
    const flipAllBtn = document.getElementById("animals-flip-all-btn");
    if (flipAllBtn) {
      flipAllBtn.addEventListener("click", flipAll);
    }

    const hideAllBtn = document.getElementById("animals-hide-all-btn");
    if (hideAllBtn) {
      hideAllBtn.addEventListener("click", hideAll);
    }

    const shuffleBtn = document.getElementById("animals-shuffle-btn");
    if (shuffleBtn) {
      shuffleBtn.addEventListener("click", shuffleCards);
    }

    // Search input
    const searchInput = document.getElementById("animals-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchTerm = e.target.value;
        renderGrid();
      });
    }

    // Observe language changes on <html lang="...">
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "lang"
        ) {
          renderGrid();
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true });
  }

  // Initial load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      renderGrid();
      setupEvents();
    });
  } else {
    renderGrid();
    setupEvents();
  }
})();
