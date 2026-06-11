window.DBZ_ATLAS_DATA = {
  meta: {
    title: "Dragon Ball Atlas",
    subtitle: "Atlas cronologico interactivo"
  },
  sagas: [
    { id: "origenes", name: "Orígenes", color: "#8ae0ff" },
    { id: "clasico", name: "Dragon Ball clásico", color: "#f4c542" },
    { id: "saiyan", name: "Saiyan", color: "#ff7a59" },
    { id: "namek", name: "Namek", color: "#4be38b" },
    { id: "androides", name: "Androides / Cell", color: "#9d8cff" },
    { id: "buu", name: "Majin Buu", color: "#ff9bd1" },
    { id: "super", name: "Super", color: "#ffd166" }
  ],
  locations: [
    {
      id: "mount-paozu",
      name: "Montaña Paozu",
      saga: "origenes",
      year: 734,
      type: "home",
      region: "Tierra del Este",
      x: 430,
      y: 1035,
      description: "El refugio rural donde Goku crece lejos de la gran ciudad y empieza la leyenda.",
      characters: ["goku", "chi-chi", "gohan"],
      abilities: ["nimbus", "kamehameha"],
      events: ["goku-landed"]
    },
    {
      id: "west-city",
      name: "West City",
      saga: "clasico",
      year: 736,
      type: "home",
      region: "Megaopolis",
      x: 690,
      y: 1185,
      description: "El centro de operaciones de Bulma y Capsule Corp, punto de encuentro de casi toda la serie.",
      characters: ["bulma", "trunks", "android18"],
      abilities: ["capsule-tech", "energy-barrier"],
      events: ["bulma-search"]
    },
    {
      id: "kame-house",
      name: "Kame House",
      saga: "clasico",
      year: 736,
      type: "home",
      region: "Isla Tortuga",
      x: 270,
      y: 1390,
      description: "La casa de Muten Roshi y el punto de entrenamiento donde nace media historia de Dragon Ball.",
      characters: ["roshi", "krillin", "goku", "bulma"],
      abilities: ["kamehameha", "mafuba"],
      events: ["training-classic"]
    },
    {
      id: "tenkaichi-island",
      name: "Isla del Torneo",
      saga: "clasico",
      year: 750,
      type: "battle",
      region: "Papaya",
      x: 900,
      y: 1115,
      description: "La arena del Tenkaichi Budokai, escenario de duelos que definen la identidad de la saga.",
      characters: ["goku", "krillin", "roshi", "tien"],
      abilities: ["kamehameha", "destructo-disc"],
      events: ["tenkaichi-classic"]
    },
    {
      id: "red-ribbon-fort",
      name: "Fortaleza Red Ribbon",
      saga: "clasico",
      year: 749,
      type: "battle",
      region: "Bosque del Norte",
      x: 565,
      y: 985,
      description: "El antiguo bastión de la Red Ribbon Army, clave para las primeras aventuras de Goku.",
      characters: ["goku", "bulma"],
      abilities: ["power-pole", "dragon-radar"],
      events: ["red-ribbon-raid"]
    },
    {
      id: "korins-tower",
      name: "Torre de Karin",
      saga: "clasico",
      year: 752,
      type: "home",
      region: "Cielo de la Tierra",
      x: 840,
      y: 860,
      description: "El entrenamiento vertical que pule el ki y conecta la Tierra con el plano espiritual.",
      characters: ["goku", "korin", "yajirobe"],
      abilities: ["senzu", "ultra-instinct-foreshadow"],
      events: ["tower-training"]
    },
    {
      id: "kami-lookout",
      name: "Palacio de Kami",
      saga: "saiyan",
      year: 761,
      type: "cosmic",
      region: "Altura sagrada",
      x: 790,
      y: 770,
      description: "El mirador celestial donde se decide la defensa de la Tierra frente a amenazas mayores.",
      characters: ["piccolo", "goku", "gohan", "mr-satan"],
      abilities: ["special-beam-cannon", "spirit-bomb"],
      events: ["saiyan-arrival"]
    },
    {
      id: "namek-village",
      name: "Aldea de Namek",
      saga: "namek",
      year: 762,
      type: "cosmic",
      region: "Planeta Namek",
      x: 1735,
      y: 420,
      description: "Un mundo sereno y verde que se convierte en el tablero de una de las sagas mas tensas.",
      characters: ["goku", "piccolo", "krillin", "frieza", "dende"],
      abilities: ["regeneration", "death-beam", "instant-transmission"],
      events: ["namek-journey"]
    },
    {
      id: "planet-vegeta",
      name: "Planeta Vegeta",
      saga: "origenes",
      year: 732,
      type: "cosmic",
      region: "Sector Saiyan",
      x: 2140,
      y: 160,
      description: "El hogar perdido de los saiyans, cuyo eco sigue pesando sobre Goku y Vegeta.",
      characters: ["vegeta", "frieza", "broly"],
      abilities: ["galick-gun", "supernova"],
      events: ["planet-vegeta-fall"]
    },
    {
      id: "cell-games-arena",
      name: "Arena de Cell",
      saga: "androides",
      year: 767,
      type: "battle",
      region: "Llanura central",
      x: 860,
      y: 1148,
      description: "El escenario de la prueba definitiva de Gohan frente a Cell y el salto de poder de una generacion.",
      characters: ["gohan", "cell", "vegeta", "piccolo"],
      abilities: ["final-flash", "special-beam-cannon", "kamehameha"],
      events: ["cell-games"]
    },
    {
      id: "babidi-ship",
      name: "Nave de Babidi",
      saga: "buu",
      year: 774,
      type: "battle",
      region: "Desierto",
      x: 1125,
      y: 820,
      description: "El punto de ruptura de la saga de Majin Buu, donde la energia maldita vuelve a despertar.",
      characters: ["vegeta", "goku", "majin-buu", "babidi"],
      abilities: ["magic-control", "regeneration", "final-flash"],
      events: ["buu-awakens"]
    },
    {
      id: "sacred-world-kai",
      name: "Mundo Sagrado de Kaioshin",
      saga: "buu",
      year: 774,
      type: "cosmic",
      region: "Plano Divino",
      x: 1530,
      y: 875,
      description: "El espacio sagrado donde se aprende a mirar la serie desde la escala de los dioses.",
      characters: ["goku", "vegeta", "supreme-kai"],
      abilities: ["fusion-dance", "instant-transmission", "hakai"],
      events: ["kai-training"]
    },
    {
      id: "capsule-corp",
      name: "Capsule Corp",
      saga: "super",
      year: 778,
      type: "home",
      region: "West City",
      x: 730,
      y: 1235,
      description: "La base tecnocientifica de Bulma y uno de los centros neurálgicos del universo Super.",
      characters: ["bulma", "trunks", "vegeta", "beerus"],
      abilities: ["capsule-tech", "gravity-training"],
      events: ["battle-of-gods"]
    },
    {
      id: "beerus-planet",
      name: "Planeta de Beerus",
      saga: "super",
      year: 778,
      type: "cosmic",
      region: "Universo 7",
      x: 2200,
      y: 430,
      description: "La cima del silencio y la disciplina de combate divina, ligada al poder del Dios de la Destruccion.",
      characters: ["beerus", "whis", "goku", "vegeta"],
      abilities: ["hakai", "god-ki", "ultra-instinct"],
      events: ["god-training"]
    }
  ],
  characters: [
    {
      id: "goku",
      name: "Son Goku",
      alias: "Kakarot",
      role: "Protagonista",
      saga: "origenes",
      home: "mount-paozu",
      locations: ["mount-paozu", "kame-house", "tenkaichi-island", "kami-lookout", "namek-village", "cell-games-arena", "sacred-world-kai", "beerus-planet"],
      abilities: ["kamehameha", "kaio-ken", "instant-transmission", "spirit-bomb"],
      description: "De nino salvaje a referente absoluto del combate, Goku convierte cada escenario en una escuela."
    },
    {
      id: "bulma",
      name: "Bulma",
      alias: "Capsule Corp",
      role: "Inventora",
      saga: "clasico",
      home: "west-city",
      locations: ["west-city", "kame-house", "red-ribbon-fort", "capsule-corp", "namek-village"],
      abilities: ["dragon-radar", "capsule-tech", "energy-barrier"],
      description: "La mente estrategica que mueve la aventura y conecta la tecnologia con el mapa del universo."
    },
    {
      id: "vegeta",
      name: "Vegeta",
      alias: "Principe Saiyan",
      role: "Rival",
      saga: "saiyan",
      home: "planet-vegeta",
      locations: ["planet-vegeta", "kami-lookout", "cell-games-arena", "babidi-ship", "capsule-corp", "beerus-planet"],
      abilities: ["galick-gun", "final-flash", "big-bang-attack", "energy-wave"],
      description: "Orgullo saiyan, evolucion constante y una trayectoria que convierte el orgullo en disciplina."
    },
    {
      id: "piccolo",
      name: "Piccolo",
      alias: "Namekiano",
      role: "Estratega",
      saga: "saiyan",
      home: "kami-lookout",
      locations: ["kami-lookout", "cell-games-arena", "namek-village"],
      abilities: ["special-beam-cannon", "regeneration", "stretching"],
      description: "Maestro, protector y una de las voces mas serenas del frente de batalla."
    },
    {
      id: "krillin",
      name: "Krillin",
      alias: "Tenkaichi veteran",
      role: "Compañero",
      saga: "clasico",
      home: "kame-house",
      locations: ["kame-house", "tenkaichi-island", "namek-village", "cell-games-arena"],
      abilities: ["destructo-disc", "kamehameha", "solar-flare"],
      description: "El mejor ejemplo de coraje humano: no siempre el mas fuerte, pero casi nunca el menos valiente."
    },
    {
      id: "gohan",
      name: "Son Gohan",
      alias: "Great Saiyaman",
      role: "Herencia",
      saga: "androides",
      home: "mount-paozu",
      locations: ["mount-paozu", "kami-lookout", "cell-games-arena", "sacred-world-kai"],
      abilities: ["kamehameha", "masenko", "potential-unleashed"],
      description: "El puente entre el aprendizaje y la fuerza brutal; su momento decisivo define la saga Cell."
    },
    {
      id: "trunks",
      name: "Trunks",
      alias: "Del futuro",
      role: "Mensajero",
      saga: "androides",
      home: "capsule-corp",
      locations: ["capsule-corp", "west-city", "cell-games-arena", "sacred-world-kai"],
      abilities: ["burning-attack", "sword-mastery", "galick-gun"],
      description: "Viene del futuro con una advertencia, y termina convirtiendose en uno de los ejes emocionales de la serie."
    },
    {
      id: "frieza",
      name: "Freezer",
      alias: "Lord Freeza",
      role: "Antagonista",
      saga: "namek",
      home: "planet-vegeta",
      locations: ["planet-vegeta", "namek-village"],
      abilities: ["death-beam", "supernova", "telekinesis"],
      description: "La amenaza que da escala galactica al conflicto y marca un antes y un despues en la historia."
    },
    {
      id: "beerus",
      name: "Beerus",
      alias: "Dios de la Destruccion",
      role: "Divinidad",
      saga: "super",
      home: "beerus-planet",
      locations: ["beerus-planet", "capsule-corp"],
      abilities: ["hakai", "god-ki", "destruction-orb"],
      description: "La balanza divina que obliga a Goku y Vegeta a pensar en una escala completamente nueva."
    },
    {
      id: "android18",
      name: "Android 18",
      alias: "Lazuli",
      role: "Guerrera",
      saga: "androides",
      home: "west-city",
      locations: ["west-city", "cell-games-arena", "capsule-corp"],
      abilities: ["energy-barrier", "energy-barrage", "infinite-stamina"],
      description: "Precisa, fria y siempre eficaz; una pieza clave del periodo Androides / Cell."
    },
    {
      id: "majin-buu",
      name: "Majin Buu",
      alias: "Buu",
      role: "Catastrofe",
      saga: "buu",
      home: "babidi-ship",
      locations: ["babidi-ship", "sacred-world-kai"],
      abilities: ["regeneration", "candy-beam", "absorption"],
      description: "Un caos viviente que transforma el mapa en una secuencia de supervivencia y absurdo."
    },
    {
      id: "roshi",
      name: "Muten Roshi",
      alias: "Tortuga Genial",
      role: "Maestro",
      saga: "clasico",
      home: "kame-house",
      locations: ["kame-house", "tenkaichi-island"],
      abilities: ["kamehameha", "mafuba", "turtle-style"],
      description: "El origen de la tecnica, la disciplina y el humor que sostiene gran parte del ADN de Dragon Ball."
    },
    {
      id: "chi-chi",
      name: "Chi-Chi",
      alias: "Princesa del Fuego",
      role: "Guerrera",
      saga: "clasico",
      home: "mount-paozu",
      locations: ["mount-paozu", "kame-house", "tenkaichi-island"],
      abilities: ["turtle-style", "bansho-fan", "martial-arts"],
      description: "La energía disciplinada que conecta la vida familiar con el espíritu de combate de la serie."
    },
    {
      id: "tien",
      name: "Ten Shin Han",
      alias: "Tien",
      role: "Rival",
      saga: "clasico",
      home: "tenkaichi-island",
      locations: ["tenkaichi-island", "kami-lookout", "cell-games-arena"],
      abilities: ["tri-beam", "solar-flare", "energy-wave"],
      description: "Un rival que convierte la disciplina marcial en una identidad propia y durísima."
    },
    {
      id: "yajirobe",
      name: "Yajirobe",
      alias: "Espadachin Errante",
      role: "Aliado",
      saga: "clasico",
      home: "korins-tower",
      locations: ["korins-tower", "kami-lookout"],
      abilities: ["sword-play", "senzu"],
      description: "Contraste cómico y sorprendentemente útil en los momentos en que la Tierra se queda sin margen."
    },
    {
      id: "korin",
      name: "Korin",
      alias: "Torre de Karin",
      role: "Maestro",
      saga: "clasico",
      home: "korins-tower",
      locations: ["korins-tower"],
      abilities: ["senzu", "wisdom", "meditation"],
      description: "El guardián del entrenamiento y de los frijoles mágicos que sostienen la recuperación del equipo."
    },
    {
      id: "dende",
      name: "Dende",
      alias: "Guardian de Namek",
      role: "Sanador",
      saga: "namek",
      home: "namek-village",
      locations: ["namek-village", "kami-lookout", "sacred-world-kai"],
      abilities: ["healing", "dragon-creation", "telepathy"],
      description: "La voz tranquila que une la espiritualidad de Namek con la defensa de la Tierra."
    },
    {
      id: "cell",
      name: "Cell",
      alias: "Perfect Cell",
      role: "Antagonista",
      saga: "androides",
      home: "cell-games-arena",
      locations: ["cell-games-arena", "west-city"],
      abilities: ["absorption", "regeneration", "solar-flare", "stretching"],
      description: "La síntesis del horror biotecnológico: absorbe, muta y obliga a Gohan a dar el salto definitivo."
    },
    {
      id: "babidi",
      name: "Babidi",
      alias: "Brujo",
      role: "Villano",
      saga: "buu",
      home: "babidi-ship",
      locations: ["babidi-ship", "sacred-world-kai"],
      abilities: ["magic-control", "telekinesis", "mind-control"],
      description: "El hechicero que desata el caos y manipula a los combatientes para abrir la saga Buu."
    },
    {
      id: "supreme-kai",
      name: "Kaioshin Supremo",
      alias: "Shin",
      role: "Divinidad",
      saga: "buu",
      home: "sacred-world-kai",
      locations: ["sacred-world-kai", "kami-lookout"],
      abilities: ["god-ki", "telepathy", "healing"],
      description: "El guía divino que intenta contener amenazas que superan la lógica de los mortales."
    },
    {
      id: "whis",
      name: "Whis",
      alias: "Maestro de Beerus",
      role: "Mentor",
      saga: "super",
      home: "beerus-planet",
      locations: ["beerus-planet", "capsule-corp"],
      abilities: ["god-ki", "gravity-training", "time-rewind", "ultra-instinct"],
      description: "El mentor elegante y silencioso que empuja a Goku y Vegeta a comprender otra escala de poder."
    },
    {
      id: "broly",
      name: "Broly",
      alias: "Saiyan legendario",
      role: "Fuerza desatada",
      saga: "origenes",
      home: "planet-vegeta",
      locations: ["planet-vegeta", "beerus-planet"],
      abilities: ["supernova", "berserker", "energy-wave"],
      description: "Potencia brutal, crecimiento salvaje y una presencia que reescribe la escala de combate."
    },
    {
      id: "chi-chi",
      name: "Chi-Chi",
      alias: "Princesa del Fuego",
      role: "Guerrera",
      saga: "clasico",
      home: "mount-paozu",
      locations: ["mount-paozu", "kame-house", "tenkaichi-island"],
      abilities: ["turtle-style", "bansho-fan", "martial-arts"],
      description: "La energía disciplinada que conecta la vida familiar con el espíritu de combate de la serie."
    },
    {
      id: "tien",
      name: "Ten Shin Han",
      alias: "Tien",
      role: "Rival",
      saga: "clasico",
      home: "tenkaichi-island",
      locations: ["tenkaichi-island", "kami-lookout", "cell-games-arena"],
      abilities: ["tri-beam", "solar-flare", "energy-wave"],
      description: "Un rival que convierte la disciplina marcial en una identidad propia y durísima."
    },
    {
      id: "yajirobe",
      name: "Yajirobe",
      alias: "Espadachin Errante",
      role: "Aliado",
      saga: "clasico",
      home: "korins-tower",
      locations: ["korins-tower", "kami-lookout"],
      abilities: ["sword-play", "senzu"],
      description: "Contraste cómico y sorprendentemente útil en los momentos en que la Tierra se queda sin margen."
    },
    {
      id: "korin",
      name: "Korin",
      alias: "Torre de Karin",
      role: "Maestro",
      saga: "clasico",
      home: "korins-tower",
      locations: ["korins-tower"],
      abilities: ["senzu", "wisdom", "meditation"],
      description: "El guardián del entrenamiento y de los frijoles mágicos que sostienen la recuperación del equipo."
    },
    {
      id: "dende",
      name: "Dende",
      alias: "Guardián de Namek",
      role: "Sanador",
      saga: "namek",
      home: "namek-village",
      locations: ["namek-village", "kami-lookout", "sacred-world-kai"],
      abilities: ["healing", "dragon-creation", "telepathy"],
      description: "La voz tranquila que une la espiritualidad de Namek con la defensa de la Tierra."
    },
    {
      id: "cell",
      name: "Cell",
      alias: "Perfect Cell",
      role: "Antagonista",
      saga: "androides",
      home: "cell-games-arena",
      locations: ["cell-games-arena", "west-city"],
      abilities: ["absorption", "regeneration", "solar-flare", "stretching"],
      description: "La síntesis del horror biotecnológico: absorbe, muta y obliga a Gohan a dar el salto definitivo."
    },
    {
      id: "babidi",
      name: "Babidi",
      alias: "Brujo",
      role: "Villano",
      saga: "buu",
      home: "babidi-ship",
      locations: ["babidi-ship", "sacred-world-kai"],
      abilities: ["magic-control", "telekinesis", "mind-control"],
      description: "El hechicero que desata el caos y manipula a los combatientes para abrir la saga Buu."
    },
    {
      id: "supreme-kai",
      name: "Kaioshin Supremo",
      alias: "Shin",
      role: "Divinidad",
      saga: "buu",
      home: "sacred-world-kai",
      locations: ["sacred-world-kai", "kami-lookout"],
      abilities: ["god-ki", "telepathy", "healing"],
      description: "El guía divino que intenta contener amenazas que superan la lógica de los mortales."
    },
    {
      id: "whis",
      name: "Whis",
      alias: "Maestro de Beerus",
      role: "Mentor",
      saga: "super",
      home: "beerus-planet",
      locations: ["beerus-planet", "capsule-corp"],
      abilities: ["god-ki", "gravity-training", "time-rewind", "ultra-instinct"],
      description: "El mentor elegante y silencioso que empuja a Goku y Vegeta a comprender otra escala de poder."
    },
    {
      id: "broly",
      name: "Broly",
      alias: "Saiyan legendario",
      role: "Fuerza desatada",
      saga: "origenes",
      home: "planet-vegeta",
      locations: ["planet-vegeta", "beerus-planet"],
      abilities: ["supernova", "berserker", "energy-wave"],
      description: "Potencia brutal, crecimiento salvaje y una presencia que reescribe la escala de combate."
    },
    {
      id: "mr-satan",
      name: "Mr. Satan",
      alias: "Hercule",
      role: "Campeon",
      saga: "buu",
      home: "west-city",
      locations: ["west-city", "cell-games-arena", "babidi-ship"],
      abilities: ["charisma", "martial-arts", "survival-instinct"],
      description: "El heroe mediatico que consigue sobrevivir a la locura del mundo con carisma y suerte."
    },
    {
      id: "chi-chi",
      name: "Chi-Chi",
      alias: "Princesa del Fuego",
      role: "Guerrera",
      saga: "clasico",
      home: "mount-paozu",
      locations: ["mount-paozu", "kame-house", "tenkaichi-island"],
      abilities: ["turtle-style", "bansho-fan", "martial-arts"],
      description: "La energia disciplinada que conecta la vida familiar con el espiritu de combate de la serie."
    },
    {
      id: "tien",
      name: "Ten Shin Han",
      alias: "Tien",
      role: "Rival",
      saga: "clasico",
      home: "tenkaichi-island",
      locations: ["tenkaichi-island", "kami-lookout", "cell-games-arena"],
      abilities: ["tri-beam", "solar-flare", "energy-wave"],
      description: "Un rival que convierte la disciplina marcial en una identidad propia y durisima."
    },
    {
      id: "yajirobe",
      name: "Yajirobe",
      alias: "Espadachin Errante",
      role: "Aliado",
      saga: "clasico",
      home: "korins-tower",
      locations: ["korins-tower", "kami-lookout"],
      abilities: ["sword-play", "senzu"],
      description: "Contraste comico y sorprendentemente util en los momentos en que la Tierra se queda sin margen."
    },
    {
      id: "korin",
      name: "Korin",
      alias: "Torre de Karin",
      role: "Maestro",
      saga: "clasico",
      home: "korins-tower",
      locations: ["korins-tower"],
      abilities: ["senzu", "wisdom", "meditation"],
      description: "El guardián del entrenamiento y de los frijoles magicos que sostienen la recuperacion del equipo."
    },
    {
      id: "dende",
      name: "Dende",
      alias: "Guardian de Namek",
      role: "Sanador",
      saga: "namek",
      home: "namek-village",
      locations: ["namek-village", "kami-lookout", "sacred-world-kai"],
      abilities: ["healing", "dragon-creation", "telepathy"],
      description: "La voz tranquila que une la espiritualidad de Namek con la defensa de la Tierra."
    },
    {
      id: "cell",
      name: "Cell",
      alias: "Perfect Cell",
      role: "Antagonista",
      saga: "androides",
      home: "cell-games-arena",
      locations: ["cell-games-arena", "west-city"],
      abilities: ["absorption", "regeneration", "solar-flare", "stretching"],
      description: "La sintesis del horror biotecnologico: absorbe, muta y obliga a Gohan a dar el salto definitivo."
    },
    {
      id: "babidi",
      name: "Babidi",
      alias: "Brujo",
      role: "Villano",
      saga: "buu",
      home: "babidi-ship",
      locations: ["babidi-ship", "sacred-world-kai"],
      abilities: ["magic-control", "telekinesis", "mind-control"],
      description: "El hechicero que desata el caos y manipula a los combatientes para abrir la saga Buu."
    },
    {
      id: "supreme-kai",
      name: "Kaioshin Supremo",
      alias: "Shin",
      role: "Divinidad",
      saga: "buu",
      home: "sacred-world-kai",
      locations: ["sacred-world-kai", "kami-lookout"],
      abilities: ["god-ki", "telepathy", "healing"],
      description: "El guia divino que intenta contener amenazas que superan la logica de los mortales."
    },
    {
      id: "whis",
      name: "Whis",
      alias: "Maestro de Beerus",
      role: "Mentor",
      saga: "super",
      home: "beerus-planet",
      locations: ["beerus-planet", "capsule-corp"],
      abilities: ["god-ki", "gravity-training", "time-rewind", "ultra-instinct"],
      description: "El mentor elegante y silencioso que empuja a Goku y Vegeta a comprender otra escala de poder."
    }
  ],
  abilities: [
    {
      id: "kamehameha",
      name: "Kamehameha",
      category: "Ki",
      users: ["goku", "gohan", "krillin", "roshi", "bulma"],
      description: "La ola de energia mas reconocible de la serie, heredada y reinterpretada por varios personajes."
    },
    {
      id: "kaio-ken",
      name: "Kaio-ken",
      category: "Técnica",
      users: ["goku"],
      description: "Multiplica la potencia de combate a costa de una carga brutal sobre el cuerpo."
    },
    {
      id: "instant-transmission",
      name: "Teletransporte",
      category: "Ki",
      users: ["goku", "piccolo"],
      description: "Salto instantaneo entre puntos lejanos, clave para reposicionar la historia en segundos."
    },
    {
      id: "spirit-bomb",
      name: "Genkidama",
      category: "Ki",
      users: ["goku"],
      description: "Acumula la energia de otros seres para convertir la esperanza en un golpe final."
    },
    {
      id: "galick-gun",
      name: "Galick Gun",
      category: "Saiyan",
      users: ["vegeta", "trunks"],
      description: "La firma saiyan de Vegeta, una descarga de orgullo y presion ofensiva."
    },
    {
      id: "final-flash",
      name: "Final Flash",
      category: "Saiyan",
      users: ["vegeta"],
      description: "Uno de los ataques mas espectaculares del Principe Saiyan."
    },
    {
      id: "special-beam-cannon",
      name: "Makankosappo",
      category: "Técnica",
      users: ["piccolo"],
      description: "Un rayo perforante que simboliza precision, sacrificio y calculo."
    },
    {
      id: "destructo-disc",
      name: "Disco Destructor",
      category: "Ki",
      users: ["krillin"],
      description: "La tecnica de corte que recuerda que la creatividad tambien vence en combate."
    },
    {
      id: "hakai",
      name: "Hakai",
      category: "Divino",
      users: ["beerus"],
      description: "La anulacion absoluta de la materia, asociada al poder de los Dioses de la Destruccion."
    },
    {
      id: "god-ki",
      name: "Ki Divino",
      category: "Divino",
      users: ["goku", "vegeta", "beerus", "whis", "supreme-kai"],
      description: "La energia reservada a seres que han cruzado el umbral de lo mortal."
    },
    {
      id: "gravity-training",
      name: "Entrenamiento Gravitatorio",
      category: "Tecnica",
      users: ["goku", "vegeta", "whis"],
      description: "El ritual de endurecer el cuerpo en condiciones extremas para romper limites."
    },
    {
      id: "energy-wave",
      name: "Onda de Energia",
      category: "Ki",
      users: ["vegeta", "trunks", "tien", "broly"],
      description: "Una descarga de ki versatil que sirve tanto para presion ofensiva como para remate."
    },
    {
      id: "big-bang-attack",
      name: "Big Bang Attack",
      category: "Saiyan",
      users: ["vegeta"],
      description: "Golpe explosivo de Vegeta, directo y contundente."
    },
    {
      id: "burning-attack",
      name: "Burning Attack",
      category: "Saiyan",
      users: ["trunks"],
      description: "La combinacion de pose y energia caracteristica de Trunks."
    },
    {
      id: "candy-beam",
      name: "Candy Beam",
      category: "Magia",
      users: ["majin-buu"],
      description: "Un cambio de forma tan absurdo como peligroso."
    },
    {
      id: "absorption",
      name: "Absorption",
      category: "Biologia",
      users: ["majin-buu", "cell"],
      description: "La capacidad de incorporar poder ajeno y modificar el cuerpo."
    },
    {
      id: "death-beam",
      name: "Death Beam",
      category: "Ki",
      users: ["frieza", "cell"],
      description: "Rayo preciso y letal, asociado a antagonistas que atacan sin desperdicio."
    },
    {
      id: "telekinesis",
      name: "Telekinesis",
      category: "Psi",
      users: ["frieza", "babidi"],
      description: "Manipulacion a distancia de objetos y oponentes por pura fuerza mental."
    },
    {
      id: "magic-control",
      name: "Control Magico",
      category: "Magia",
      users: ["babidi"],
      description: "Hechiceria de dominacion y corrupcion."
    },
    {
      id: "mind-control",
      name: "Control Mental",
      category: "Magia",
      users: ["babidi"],
      description: "Dominacion psicologica para convertir aliados en amenazas."
    },
    {
      id: "healing",
      name: "Curacion",
      category: "Soporte",
      users: ["dende", "supreme-kai"],
      description: "Recuperacion de energia y cuerpo para sostener al equipo."
    },
    {
      id: "dragon-creation",
      name: "Creacion de Dragones",
      category: "Mistico",
      users: ["dende"],
      description: "La habilidad que redefine la relacion entre namekianos y las Dragon Balls."
    },
    {
      id: "tri-beam",
      name: "Kikoho",
      category: "Ki",
      users: ["tien"],
      description: "Ataque de enorme coste fisico y disciplina extrema."
    },
    {
      id: "bansho-fan",
      name: "Bansho Fan",
      category: "Herramienta",
      users: ["chi-chi"],
      description: "El abanico que transforma el combate y el estilo de Chi-Chi."
    },
    {
      id: "martial-arts",
      name: "Artes Marciales",
      category: "Estilo",
      users: ["chi-chi", "mr-satan"],
      description: "La base del combate humano y el lenguaje comun de la serie."
    },
    {
      id: "sword-play",
      name: "Espada Errante",
      category: "Arma",
      users: ["yajirobe"],
      description: "Golpes de espada improvisados y eficaces."
    },
    {
      id: "wisdom",
      name: "Sabiduria",
      category: "Mentoria",
      users: ["korin"],
      description: "La mezcla de calma, observacion y conocimiento tactico."
    },
    {
      id: "meditation",
      name: "Meditacion",
      category: "Espiritual",
      users: ["korin"],
      description: "El entrenamiento silencioso que prepara cuerpo y mente."
    },
    {
      id: "charisma",
      name: "Carisma",
      category: "Social",
      users: ["mr-satan"],
      description: "La habilidad de mover multitudes incluso cuando la situacion supera al combate."
    },
    {
      id: "survival-instinct",
      name: "Instinto de Supervivencia",
      category: "Psicologico",
      users: ["mr-satan"],
      description: "La clave para seguir en pie cuando la amenaza real aparece."
    },
    {
      id: "berserker",
      name: "Berserker",
      category: "Saiyan",
      users: ["broly"],
      description: "Potencia desatada y crecimiento violento en mitad del combate."
    },
    {
      id: "time-rewind",
      name: "Rebobinado Temporal",
      category: "Divino",
      users: ["whis"],
      description: "Manipulacion del tiempo para corregir un instante antes de que se cierre."
    },
    {
      id: "levitation",
      name: "Levitacion",
      category: "Ki",
      users: ["tien", "piccolo"],
      description: "Movimiento sostenido en el aire mediante control de ki."
    },
    {
      id: "ultra-instinct",
      name: "Ultra Instinto",
      category: "Divino",
      users: ["goku", "whis"],
      description: "Accion sin pensamiento consciente, afinada en el limite del combate."
    },
    {
      id: "ultra-instinct-foreshadow",
      name: "Destello de Ultra Instinto",
      category: "Divino",
      users: ["goku"],
      description: "Senal temprana de una forma de pelea que desborda el control normal."
    },
    {
      id: "power-pole",
      name: "Baston Sagrado",
      category: "Arma",
      users: ["goku"],
      description: "El baston que acompana las primeras aventuras de Goku."
    },
    {
      id: "nimbus",
      name: "Nube Kinto",
      category: "Viaje",
      users: ["goku"],
      description: "El medio de transporte clasico que define la infancia de Goku."
    },
    {
      id: "potential-unleashed",
      name: "Potencial Desatado",
      category: "Ki",
      users: ["gohan"],
      description: "Liberacion de la reserva interna de poder hasta el maximo."
    },
    {
      id: "energy-barrage",
      name: "Rafaga de Energia",
      category: "Ki",
      users: ["android18"],
      description: "Disparo continuo y eficiente para presionar al rival."
    },
    {
      id: "infinite-stamina",
      name: "Energia Infinita",
      category: "Biologia",
      users: ["android18", "cell"],
      description: "Resistencia excepcional que mantiene el combate en marcha."
    },
    {
      id: "supernova",
      name: "Supernova",
      category: "Ki",
      users: ["frieza", "broly"],
      description: "Explosion de gran escala y amenaza absoluta."
    },
    {
      id: "solar-flare",
      name: "Solar Flare",
      category: "Ki",
      users: ["krillin", "tien", "cell"],
      description: "Flash cegador para romper la orientacion del enemigo."
    },
    {
      id: "stretching",
      name: "Estiramiento",
      category: "Biologia",
      users: ["piccolo", "cell"],
      description: "Adaptacion fisica que permite alcance y esquiva sobrenaturales."
    },
    {
      id: "senzu",
      name: "Frijol Senzu",
      category: "Soporte",
      users: ["korin", "yajirobe", "roshi"],
      description: "Recuperacion instantanea para volver al combate sin perder tiempo."
    },
    {
      id: "masenko",
      name: "Masenko",
      category: "Ki",
      users: ["gohan"],
      description: "La tecnica de palma cargada que acompana el crecimiento de Gohan."
    },
    {
      id: "telepathy",
      name: "Telepatia",
      category: "Psi",
      users: ["dende", "supreme-kai", "babidi"],
      description: "Comunicacion mental a distancia para orientar, avisar o manipular."
    },
    {
      id: "turtle-style",
      name: "Estilo Tortuga",
      category: "Estilo",
      users: ["roshi", "goku", "chi-chi"],
      description: "La escuela clasica que da forma al entrenamiento de los primeros arcos."
    },
    {
      id: "fusion-dance",
      name: "Danza de la Fusión",
      category: "Fusion",
      users: ["goku", "vegeta"],
      description: "La coreografia mas delicada del universo y una de las soluciones mas memorables de la serie."
    },
    {
      id: "regeneration",
      name: "Regeneracion",
      category: "Raza",
      users: ["piccolo", "majin-buu"],
      description: "Capacidad de recomponer el cuerpo o persistir tras un dano extremo."
    },
    {
      id: "dragon-radar",
      name: "Dragon Radar",
      category: "Tecnologia",
      users: ["bulma"],
      description: "La herramienta que hace del mundo un tablero visible y rastreable."
    },
    {
      id: "capsule-tech",
      name: "Tecnologia Capsule",
      category: "Tecnologia",
      users: ["bulma"],
      description: "La base tecnica de toda la logistica del viaje y la exploracion."
    },
    {
      id: "energy-barrier",
      name: "Barrera de Energia",
      category: "Defensa",
      users: ["bulma", "android18"],
      description: "Proteccion rapida frente a impacto, energia o presión."
    },
    {
      id: "sword-mastery",
      name: "Esgrima Saiyan",
      category: "Tecnica",
      users: ["trunks"],
      description: "El estilo de Trunks mezcla espada, ki y la precision de la linea temporal."
    },
    {
      id: "destruction-orb",
      name: "Esfera de Destrucción",
      category: "Divino",
      users: ["beerus"],
      description: "Una manifestacion directa del poder de borrar materia con una sola intencion."
    },
    {
      id: "mafuba",
      name: "Mafuba",
      category: "Sellado",
      users: ["roshi"],
      description: "La tecnica de contencion definitiva para sellar amenazas que no pueden vencer por pura fuerza."
    }
  ],
  events: [
    {
      id: "planet-vegeta-fall",
      year: 732,
      saga: "origenes",
      location: "planet-vegeta",
      title: "Caida de Planeta Vegeta",
      summary: "El origen del exilio saiyan y la primera gran sombra que recae sobre Vegeta y Goku."
    },
    {
      id: "goku-landed",
      year: 734,
      saga: "origenes",
      location: "mount-paozu",
      title: "Goku cae en la Tierra",
      summary: "Un bebe saiyan aterriza en la Tierra y abre la linea temporal que lo cambiara todo."
    },
    {
      id: "bulma-search",
      year: 736,
      saga: "clasico",
      location: "west-city",
      title: "Bulma inicia la busqueda de las Dragon Balls",
      summary: "La tecnologia, el deseo y la aventura se encuentran por primera vez."
    },
    {
      id: "red-ribbon-raid",
      year: 749,
      saga: "clasico",
      location: "red-ribbon-fort",
      title: "Asalto a la Red Ribbon Army",
      summary: "Una de las primeras grandes confrontaciones contra una organizacion militar completa."
    },
    {
      id: "tenkaichi-classic",
      year: 750,
      saga: "clasico",
      location: "tenkaichi-island",
      title: "Torneo Mundial de Artes Marciales",
      summary: "La arena donde Goku y sus rivales convierten el combate en ritual narrativo."
    },
    {
      id: "tower-training",
      year: 752,
      saga: "clasico",
      location: "korins-tower",
      title: "Entrenamiento en la Torre de Karin",
      summary: "El salto de tecnica y resistencia que afina el futuro del equipo."
    },
    {
      id: "training-classic",
      year: 751,
      saga: "clasico",
      location: "kame-house",
      title: "Entrenamiento clasico en Kame House",
      summary: "El grupo afina tecnica y convivencia antes de que la escala del conflicto cambie."
    },
    {
      id: "saiyan-arrival",
      year: 761,
      saga: "saiyan",
      location: "kami-lookout",
      title: "Llegada de los saiyans",
      summary: "La Tierra descubre que su amenaza ya no es local sino espacial."
    },
    {
      id: "namek-journey",
      year: 762,
      saga: "namek",
      location: "namek-village",
      title: "Viaje a Namek",
      summary: "El conflicto se desplaza a otro planeta y la escala se vuelve galactica."
    },
    {
      id: "cell-games",
      year: 767,
      saga: "androides",
      location: "cell-games-arena",
      title: "Los Cell Games",
      summary: "La batalla que convierte a Gohan en heredero simbolico de la serie."
    },
    {
      id: "buu-awakens",
      year: 774,
      saga: "buu",
      location: "babidi-ship",
      title: "Despierta Majin Buu",
      summary: "La magia oscura rompe los limites del conflicto y distorsiona el mapa entero."
    },
    {
      id: "kai-training",
      year: 774,
      saga: "buu",
      location: "sacred-world-kai",
      title: "Entrenamiento en el Mundo Sagrado de Kaioshin",
      summary: "La serie se reordena alrededor de la esfera divina y las fusiones."
    },
    {
      id: "battle-of-gods",
      year: 778,
      saga: "super",
      location: "capsule-corp",
      title: "Llega Beerus a Capsule Corp",
      summary: "El universo obliga a elevar el techo del poder y reescribir la jerarquia."
    },
    {
      id: "god-training",
      year: 778,
      saga: "super",
      location: "beerus-planet",
      title: "Entrenamiento divino",
      summary: "Goku y Vegeta empiezan a pensar en energia y tecnica como algo mas que fuerza bruta."
    }
  ]
};
