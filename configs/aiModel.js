const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const courseOutlineAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate the study material for  galaxies  for exam and level of difficulty will be medium  with summery of course, List of chapters along with summery and emoji icon for each chapter, topic list in list in chapter, all in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "courseTitle": "Galaxies: Formation, Evolution, and Diversity",\n  "courseSummary": "This course provides a comprehensive overview of galaxies, from their origins and formation to their diverse morphologies and active behaviors. We will explore the fundamental properties of galaxies, including their structure, stellar populations, and dark matter content. We will also delve into the processes that drive galaxy evolution, such as mergers, accretion, and feedback from supermassive black holes. The course aims to give students a solid understanding of the current state of knowledge in the field of extragalactic astronomy.",\n  "levelOfDifficulty": "Medium",\n  "chapters": [\n    {\n      "chapterNumber": 1,\n      "chapterTitle": "Introduction to Galaxies",\n      "emoji": "🌌",\n      "chapterSummary": "This chapter introduces the concept of galaxies as vast collections of stars, gas, dust, and dark matter. It covers the historical perspective of galaxy discovery, the different galaxy types, and key observational techniques used to study them.",\n       "topics": [\n          "What is a galaxy?",\n          "Historical perspective: From nebulae to galaxies",\n          "Hubble sequence: Elliptical, Spiral, and Irregular galaxies",\n          "Basic galaxy components: Bulge, Disk, Halo",\n          "Observational techniques in extragalactic astronomy",\n          "Distance measurements to galaxies"\n        ]\n    },\n    {\n      "chapterNumber": 2,\n      "chapterTitle": "Galaxy Structure and Morphology",\n      "emoji": "🌀",\n       "chapterSummary": "This chapter explores the detailed structure and morphology of different galaxy types, focusing on the characteristics that distinguish them. It delves into the physical properties of each component, like the bulge, disk, and halo, and their relations to galaxy evolution.",\n        "topics": [\n          "Elliptical galaxies: Properties and formation",\n          "Spiral galaxies: Arms, bulges, and disks",\n          "Barred spiral galaxies",\n           "Lenticular galaxies",\n          "Irregular galaxies: Characteristics and causes",\n          "Galaxy scaling relations (Tully-Fisher, Faber-Jackson)"\n        ]\n    },\n    {\n      "chapterNumber": 3,\n      "chapterTitle": "Stellar Populations in Galaxies",\n      "emoji": "🌟",\n      "chapterSummary": "This chapter focuses on the stellar populations within galaxies, discussing their ages, metallicities, and how they contribute to a galaxy\'s overall properties. It explores how stellar evolution helps trace galactic evolution.",\n      "topics":[\n          "Stellar populations: Population I, II, III",\n          "Color-magnitude diagrams for galaxies",\n          "Metallicity and chemical evolution in galaxies",\n          "Star formation history of galaxies",\n          "Stellar feedback and galaxy evolution"\n      ]\n    },\n    {\n      "chapterNumber": 4,\n      "chapterTitle": "Dark Matter and Galaxy Formation",\n      "emoji": "⚫",\n      "chapterSummary": "This chapter covers the crucial role of dark matter in galaxy formation and evolution. It explores the evidence for dark matter, its properties, and how it shapes the distribution of galaxies in the universe.",\n        "topics": [\n          "Evidence for dark matter in galaxies",\n           "Dark matter halos and their properties",\n           "The role of dark matter in galaxy formation",\n           "Hierarchical structure formation",\n           "The Lambda-CDM model of cosmology"\n         ]\n    },\n    {\n      "chapterNumber": 5,\n      "chapterTitle": "Galaxy Evolution and Active Galactic Nuclei",\n      "emoji": "💥",\n      "chapterSummary": "This chapter explores the processes that drive galaxy evolution, including mergers, interactions, and the influence of active galactic nuclei (AGN). It discusses how these processes shape the properties of galaxies over time.",\n       "topics": [\n          "Galaxy mergers and interactions",\n          "Environmental effects on galaxy evolution",\n          "Active galactic nuclei (AGN): Quasars, Seyferts, Radio Galaxies",\n           "Supermassive black holes in galaxies",\n          "AGN feedback on galaxy evolution",\n           "Galaxy evolution across cosmic time"\n        ]\n    },\n     {\n      "chapterNumber": 6,\n      "chapterTitle": "The Local Group and Galaxy Clusters",\n      "emoji": "🏘️",\n      "chapterSummary":"This chapter zooms out to explore the environment in which galaxies reside, covering the Local Group (our immediate neighborhood) and larger structures like galaxy clusters, focusing on their properties and influence on galaxy evolution",\n         "topics": [\n          "The Local Group: Our galactic neighborhood",\n          "Properties of galaxy clusters",\n          "Intracluster medium (ICM) and its impact",\n          "Environmental effects on galaxies in clusters",\n          "Large-scale structure of the universe"\n       ]\n     }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

export const notesGenAiModel2 = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'generate a detailed content or information on each of the topic in provided topic list, give some examples or formulas or any additional data if needed provide in clean json format  data only as(topics:[{topicTitle:"title",data:"data"}]) and don\'t add any specail symbols or \\n or any thing messy just provide clean text, use data -- [\n        "What is Space?",\n        "The Big Bang Theory",\n        "Evidence for the Big Bang (cosmic microwave background, redshift)",\n        "Expansion of the Universe",\n        "Formation of Galaxies and Galaxy Clusters",\n        "Dark Matter and Dark Energy"\n      ]',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "topics": [\n    {\n      "topicTitle": "What is Space?",\n      "data": "Space is the boundless three-dimensional extent in which objects and events have relative position and direction. It\'s the arena where all physical phenomena occur.  It\'s not just an empty void; it also includes the various fields and forces that permeate it, such as gravitational and electromagnetic fields. In a cosmological sense, space is often considered together with time, forming a four-dimensional continuum known as spacetime."\n    },\n    {\n      "topicTitle": "The Big Bang Theory",\n      "data": "The Big Bang theory is the prevailing cosmological model for the universe. It describes the universe as having originated from an extremely hot, dense state approximately 13.8 billion years ago. From this initial state, the universe has been expanding and cooling. It does not describe an explosion into pre-existing space but rather the expansion of space itself. The Big Bang theory is supported by a wealth of observational evidence.  It doesn\'t explain the initial singularity, just the evolution after it."\n    },\n    {\n      "topicTitle": "Evidence for the Big Bang (cosmic microwave background, redshift)",\n      "data": "Key evidence for the Big Bang includes: 1) Cosmic Microwave Background (CMB): This is the afterglow of the Big Bang, a faint radiation permeating the universe. It\'s remarkably uniform with small temperature fluctuations which correspond to variations in the early universe\'s density. 2) Redshift: The light from distant galaxies is shifted towards the red end of the electromagnetic spectrum. This redshift is interpreted as the galaxies moving away from us, with the speed increasing with distance.  Doppler effect causing this shift is calculated using formula: z = (λobserved - λemitted) / λemitted, where z is redshift, λobserved is observed wavelength and λemitted is emitted wavelength."\n    },\n     {\n      "topicTitle": "Expansion of the Universe",\n      "data": "The expansion of the universe is the observation that galaxies are moving away from each other. This expansion is not like an explosion, but rather a stretching of spacetime itself.  This is described by Hubble\'s Law: v = H₀d, where v is the recession velocity of a galaxy, d is its distance, and H₀ is the Hubble constant (a measure of the expansion rate).  The expansion is not uniform; regions of higher density (like galaxies) are more gravitationally bound and expand less than the empty space between them."\n     },\n      {\n      "topicTitle": "Formation of Galaxies and Galaxy Clusters",\n      "data": "Galaxies form from small fluctuations in the density of the early universe.  Gravity causes these denser regions to collapse, attracting more matter and eventually forming stars, planets and galaxies.  Galaxies then group together due to gravity to form galaxy clusters, which are the largest gravitationally bound structures in the universe.  This process involves a complex interplay of gravitational forces, dark matter halos, and gas dynamics. Galaxy types (spiral, elliptical, irregular) arise from varying formation conditions and interactions."\n     },\n     {\n      "topicTitle": "Dark Matter and Dark Energy",\n      "data":"Dark Matter is a mysterious substance that does not interact with light and therefore cannot be observed directly.  It is inferred from its gravitational effects on visible matter such as galaxies rotation curves and gravitational lensing.  Dark Energy is an even more mysterious force that is causing the accelerating expansion of the universe. Its nature is unknown and its effects are observed through the expansion rate of space.  Current theories suggest dark matter makes up about 27% of the universe while dark energy makes up about 68%, the rest is normal matter."\n     }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});
