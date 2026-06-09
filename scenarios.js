const SCENARIOS = {
  roman_empire: {
    id: "roman_empire",
    title: "What if the Roman Empire never fell?",
    description: "In 476 AD, Emperor Romulus Augustulus refuses to abdicate. By forming an unprecedented alliance with Germanic chieftains, the Western Roman Empire survives, forging a hybrid Romano-Germanic state that redefines the course of world history.",
    icon: "shield",
    category: "Classical / Medieval",
    color: "#e63946",
    gradient: "linear-gradient(135deg, #e63946 0%, #7d1a23 100%)",
    startYear: "476 AD",
    
    // Timeline tree structure. Keys are node IDs.
    nodes: {
      root: {
        id: "root",
        title: "The Ravenna Alliance",
        year: "476 AD",
        summary: "Romulus Augustulus integrates Visigothic and Ostrogothic legions directly into the Roman military structure, offering full citizenship and land grants in exchange for border defense.",
        details: "Facing Odoacer's rebellion, the young Emperor Romulus makes a desperate deal. He appoints Odoacer as Magister Militum (Master of Soldiers) and grants the Germanic federates citizenship. The Senate is outraged, but the legions are stabilized. Western Rome remains whole, albeit transformed.",
        effects: [
          { type: "stability", label: "+40% Border Stability" },
          { type: "cultural", label: "Romano-Germanic Integration" }
        ],
        mapState: {
          western_rome: { status: "stable", color: "#e63946", label: "Western Roman Empire" },
          eastern_rome: { status: "allied", color: "#b5179e", label: "Eastern Roman Empire" },
          germania: { status: "integrated", color: "#fb8500", label: "Federated Germanic Territories" },
          persia: { status: "neutral", color: "#457b9d", label: "Sasanian Empire" },
          asia: { status: "neutral", color: "#8338ec", label: "Northern Wei Dynasty" },
          americas: { status: "unknown", color: "#1d3557", label: "Indigenous Kingdoms" }
        },
        choices: [
          {
            text: "Establish a Gothic Senate to share political power.",
            nextNodeId: "gothic_senate"
          },
          {
            text: "Launch a military reconquest of Northern Gaul.",
            nextNodeId: "gaul_reconquest"
          }
        ]
      },
      
      // BRANCH 1A: Gothic Senate
      gothic_senate: {
        id: "gothic_senate",
        title: "The Senate of Two Peoples",
        year: "510 AD",
        summary: "A joint Romano-Gothic Senate is established in Ravenna, fusing Roman administrative law with Germanic military organization.",
        details: "By opening the Senate to Gothic chiefs, Rome achieves long-term peace in Italy. The new hybrid nobility patronizes a renaissance of law and infrastructure. Aqueducts are rebuilt, and Roman roads are expanded into the heart of Germania. Trade flourishes, creating a massive, unified economy across Central and Southern Europe.",
        effects: [
          { type: "economy", label: "+50% Trade Revenues" },
          { type: "stability", label: "Civil War Risk Reduced" }
        ],
        mapState: {
          western_rome: { status: "golden_age", color: "#e63946", label: "Romano-Germanic Empire" },
          eastern_rome: { status: "wary", color: "#b5179e", label: "Eastern Roman Empire" },
          germania: { status: "unified", color: "#e63946", label: "Romano-Germanic Empire" },
          persia: { status: "neutral", color: "#457b9d", label: "Sasanian Empire" },
          asia: { status: "neutral", color: "#8338ec", label: "Liang Dynasty" },
          americas: { status: "unknown", color: "#1d3557", label: "Indigenous Kingdoms" }
        },
        choices: [
          {
            text: "Fund alchemical guilds to study metallurgy and thermodynamics.",
            nextNodeId: "alchemical_revolution"
          },
          {
            text: "Build a global merchant fleet to bypass the silk road middlemen.",
            nextNodeId: "roman_merchant_fleet"
          }
        ]
      },

      // BRANCH 1B: Gaul Reconquest
      gaul_reconquest: {
        id: "gaul_reconquest",
        title: "The Reclamation of Gaul",
        year: "505 AD",
        summary: "Rome launches a brutal, traditionalist campaign to reclaim absolute control over Gaul, crushing the Franks and restoring classical governors.",
        details: "Rejecting Germanic integration, the traditionalist Senate funds a massive campaign. Gaul is reconquered, but at a terrible price. The treasury is emptied, and the constant rebellions require iron-fisted military occupation. The empire is highly centralized, but brittle and heavily taxed.",
        effects: [
          { type: "military", label: "+30% Central Control" },
          { type: "economy", label: "-40% Treasury Reserves" }
        ],
        mapState: {
          western_rome: { status: "militarized", color: "#e63946", label: "Roman Empire (Occupied Gaul)" },
          eastern_rome: { status: "neutral", color: "#b5179e", label: "Eastern Roman Empire" },
          germania: { status: "hostile", color: "#fb8500", label: "Hostile Germanic Tribes" },
          persia: { status: "neutral", color: "#457b9d", label: "Sasanian Empire" },
          asia: { status: "neutral", color: "#8338ec", label: "Liang Dynasty" },
          americas: { status: "unknown", color: "#1d3557", label: "Indigenous Kingdoms" }
        },
        choices: [
          {
            text: "Fortify the Rhine with mechanical ballista defense networks.",
            nextNodeId: "fortified_rhine"
          },
          {
            text: "Invade the Sasanian Empire to capture eastern silk routes.",
            nextNodeId: "persian_war"
          }
        ]
      },

      // BRANCH 2A: Alchemical Revolution
      alchemical_revolution: {
        id: "alchemical_revolution",
        title: "The Clockwork Renaissance",
        year: "800 AD",
        summary: "Roman scholars compile Hero of Alexandria's steam engine designs, pairing them with advanced metallurgical methods to build the first mechanical pumps.",
        details: "With stable borders, the alchemical guilds of Rome, Alexandria, and Ravenna make a series of breakthroughs. By combining Greek Fire formulas with steam principles, they create high-pressure iron boilers. The 'Aeolipile' is scaled up to drain deep silver mines and power mechanical looms, igniting an early industrial revolution.",
        effects: [
          { type: "science", label: "Mechanical Automation Discovered" },
          { type: "production", label: "+60% Metal Output" }
        ],
        mapState: {
          western_rome: { status: "industrializing", color: "#d90429", label: "Industrializing Western Empire" },
          eastern_rome: { status: "stable", color: "#b5179e", label: "Eastern Roman Empire" },
          germania: { status: "industrializing", color: "#d90429", label: "Industrializing Western Empire" },
          persia: { status: "neutral", color: "#457b9d", label: "Abbasid Caliphate" },
          asia: { status: "neutral", color: "#8338ec", label: "Tang Dynasty" },
          americas: { status: "unknown", color: "#1d3557", label: "Mayan Kingdoms" }
        },
        choices: [
          {
            text: "Manufacture steam-powered armored war chariots.",
            nextNodeId: "steam_chariots"
          },
          {
            text: "Build steam-powered railways to connect the vast empire.",
            nextNodeId: "roman_railways"
          }
        ]
      },

      // BRANCH 2B: Roman Merchant Fleet
      roman_merchant_fleet: {
        id: "roman_merchant_fleet",
        title: "The Atlantic caravels",
        year: "850 AD",
        summary: "Fitted with magnetic compasses and lateen sails, massive Roman trade fleets venture into the Atlantic Ocean.",
        details: "Bypassing the overland Silk Road, Roman sailors chart the west coast of Africa and head deep into the Atlantic. Driven by tales of a western landmass, a fleet led by Senator-Navigator Lucius Agricola makes landfall in the Caribbean. A vast Atlantic trade network is established, exchanging iron tools for unknown crops.",
        effects: [
          { type: "colony", label: "Atlantic Colonies Founded" },
          { type: "economy", label: "Colonial Luxury Goods Inflow" }
        ],
        mapState: {
          western_rome: { status: "rich", color: "#e63946", label: "Roman Atlantic Empire" },
          eastern_rome: { status: "trading", color: "#b5179e", label: "Eastern Roman Empire" },
          germania: { status: "rich", color: "#e63946", label: "Roman Atlantic Empire" },
          persia: { status: "neutral", color: "#457b9d", label: "Abbasid Caliphate" },
          asia: { status: "trading", color: "#8338ec", label: "Tang Dynasty" },
          americas: { status: "colonized", color: "#e63946", label: "Nova Roma (Colonies)" }
        },
        choices: [
          {
            text: "Establish a joint-stock Roman Atlantic Company.",
            nextNodeId: "atlantic_company"
          },
          {
            text: "Force-integrate Roman citizenship onto native cultures.",
            nextNodeId: "native_integration"
          }
        ]
      },

      // BRANCH 2C: Fortified Rhine (from Gaul Reconquest)
      fortified_rhine: {
        id: "fortified_rhine",
        title: "The Iron Limes",
        year: "750 AD",
        summary: "The northern frontier is fortified with automatic repeating ballistas, iron towers, and mechanical signal mirrors.",
        details: "Unable to pacify the northern tribes permanently, Rome seals itself off. The border becomes a wall of gears, stone, and iron. While safe from invasions, this isolates the empire intellectually and militarily, turning it into a fortress state with high maintenance costs.",
        effects: [
          { type: "military", label: "Impenetrable Border" },
          { type: "stability", label: "Social Stagnation" }
        ],
        mapState: {
          western_rome: { status: "fortified", color: "#8d99ae", label: "Fortress Rome" },
          eastern_rome: { status: "neutral", color: "#b5179e", label: "Eastern Roman Empire" },
          germania: { status: "unclaimed", color: "#fb8500", label: "Germanic Kingdoms" },
          persia: { status: "neutral", color: "#457b9d", label: "Abbasid Caliphate" },
          asia: { status: "neutral", color: "#8338ec", label: "Tang Dynasty" },
          americas: { status: "unknown", color: "#1d3557", label: "Mayan Kingdoms" }
        },
        choices: [
          {
            text: "Industrialize the fortress with steam pumps.",
            nextNodeId: "alchemical_revolution"
          }
        ]
      },

      // BRANCH 2D: Persian War (from Gaul Reconquest)
      persian_war: {
        id: "persian_war",
        title: "The Fall of Ctesiphon",
        year: "720 AD",
        summary: "Rome conquers Mesopotamia, defeating the Sasanian Empire and securing absolute monopoly over Asian trade.",
        details: "By concentrating all legions on the eastern front, Rome achieves a historic victory. The Persian capital falls, and Rome reaches the Persian Gulf. However, the army is dangerously overstretched, and maintaining order in the Middle East drains the remaining treasury, leaving Rome vulnerable back home.",
        effects: [
          { type: "territory", label: "+80% Territorial Expansion" },
          { type: "stability", label: "High Rebellion Risk" }
        ],
        mapState: {
          western_rome: { status: "overstretched", color: "#e63946", label: "Roman Empire" },
          eastern_rome: { status: "annexed", color: "#e63946", label: "Roman Empire" },
          germania: { status: "unclaimed", color: "#fb8500", label: "Germanic Kingdoms" },
          persia: { status: "conquered", color: "#e63946", label: "Roman Mesopotamia" },
          asia: { status: "trading", color: "#8338ec", label: "Tang Dynasty" },
          americas: { status: "unknown", color: "#1d3557", label: "Mayan Kingdoms" }
        },
        choices: [
          {
            text: "Divert eastern wealth to build oceanic fleets.",
            nextNodeId: "roman_merchant_fleet"
          }
        ]
      },

      // BRANCH 3A: Steam Chariots
      steam_chariots: {
        id: "steam_chariots",
        title: "The Iron Legions",
        year: "1200 AD",
        summary: "Rome invents the 'Currus Vaporis'—a steam-powered armored tank armed with rapid-fire ballistas.",
        details: "Traditional legions are replaced by mechanized divisions. The iron war machines are fueled by coal fields in Britain and the Saar Valley. Rome sweeps across Scandinavia and Russia, establishing absolute hegemony over Europe. A Pax Mechanica reigns, enforced by mechanical dreadnoughts.",
        effects: [
          { type: "military", label: "Uncontested Land Hegemony" },
          { type: "science", label: "Coal-Engine Supremacy" }
        ],
        mapState: {
          western_rome: { status: "mechanized_empire", color: "#3a0ca3", label: "United Roman Hegemony" },
          eastern_rome: { status: "vassal", color: "#7209b7", label: "client Byzantine State" },
          germania: { status: "mechanized_empire", color: "#3a0ca3", label: "United Roman Hegemony" },
          persia: { status: "defensive", color: "#457b9d", label: "Sultanate of Baghdad" },
          asia: { status: "neutral", color: "#8338ec", label: "Song Dynasty" },
          americas: { status: "unknown", color: "#1d3557", label: "Aztec Empire" }
        },
        choices: [
          {
            text: "Develop automated clockwork computing to optimize military logistics.",
            nextNodeId: "clockwork_logistics"
          },
          {
            text: "De-militarize and apply steam-engines to civilian space travel designs.",
            nextNodeId: "roman_space_race"
          }
        ]
      },

      // BRANCH 3B: Roman Railways
      roman_railways: {
        id: "roman_railways",
        title: "The Iron Viae",
        year: "1180 AD",
        summary: "The ancient Roman road network is retrofitted with iron tracks, linking Rome to Cologne, Constantinople, and Babylon.",
        details: "Goods, armies, and ideas now travel at speeds never before seen. The Empire becomes a single economic unit. A modern middle class of merchants and mechanical engineers emerges, challenging the power of the old patrician families. The Senate transitions into a representative parliament.",
        effects: [
          { type: "economy", label: "+150% Domestic Trade" },
          { type: "stability", label: "Transition to Democracy" }
        ],
        mapState: {
          western_rome: { status: "integrated", color: "#c9184a", label: "Roman Federal Republic" },
          eastern_rome: { status: "member", color: "#c9184a", label: "Roman Federal Republic" },
          germania: { status: "integrated", color: "#c9184a", label: "Roman Federal Republic" },
          persia: { status: "partner", color: "#48cae4", label: "Mesopotamian Republic" },
          asia: { status: "trading", color: "#8338ec", label: "Song Dynasty" },
          americas: { status: "unknown", color: "#1d3557", label: "Aztec Empire" }
        },
        choices: [
          {
            text: "Integrate global computing arrays to build an optical telegraph net.",
            nextNodeId: "optical_web"
          }
        ]
      },

      // BRANCH 4A: Clockwork Logistics (from Steam Chariots)
      clockwork_logistics: {
        id: "clockwork_logistics",
        title: "The Oracle of Ravenna",
        year: "1850 AD",
        summary: "A massive, mechanical computing core manages all empire resource logistics, taxation, and military deployments.",
        details: "Housed in a grand temple, the clockwork 'Oracle' uses millions of brass gears to optimize the empire. Society is run with absolute, cold efficiency. Poverty is eliminated through mathematical distribution, but free speech is restricted by the 'Predictive Security' police. A mechanical autocracy rules the world.",
        effects: [
          { type: "stability", label: "0% Crime Rate" },
          { type: "science", label: "Mechanical AI Restructuring" }
        ],
        mapState: {
          western_rome: { status: "autocracy", color: "#2b2d42", label: "Lovelace-Roman Technocracy" },
          eastern_rome: { status: "autocracy", color: "#2b2d42", label: "Lovelace-Roman Technocracy" },
          germania: { status: "autocracy", color: "#2b2d42", label: "Lovelace-Roman Technocracy" },
          persia: { status: "subjugated", color: "#2b2d42", label: "Lovelace-Roman Technocracy" },
          asia: { status: "cold_war", color: "#f77f00", label: "Empire of Japan" },
          americas: { status: "autocracy", color: "#2b2d42", label: "Lovelace-Roman Technocracy" }
        },
        choices: [] // Terminal node
      },

      // BRANCH 4B: Roman Space Race (from Steam Chariots)
      roman_space_race: {
        id: "roman_space_race",
        title: "Astra Romana",
        year: "1920 AD",
        summary: "The Senate launches the 'Aetheris' program, sending steam-propelled iron capsules into Earth orbit.",
        details: "Using high-density chemical boosters and pressurized iron hulls, Roman astronauts ('Aetheronautae') reach space. The Roman flag is planted on the Moon, not by rockets, but by steam-plasma thrusters. A new golden age of science and planetary exploration begins, uniting humanity under a technological Pax Romana.",
        effects: [
          { type: "science", label: "Lunar Colonization Initiated" },
          { type: "prestige", label: "Humanity Unified" }
        ],
        mapState: {
          western_rome: { status: "utopia", color: "#4cc9f0", label: "Pax Romana Alliance" },
          eastern_rome: { status: "utopia", color: "#4cc9f0", label: "Pax Romana Alliance" },
          germania: { status: "utopia", color: "#4cc9f0", label: "Pax Romana Alliance" },
          persia: { status: "utopia", color: "#4cc9f0", label: "Pax Romana Alliance" },
          asia: { status: "utopia", color: "#4cc9f0", label: "Pax Romana Alliance" },
          americas: { status: "utopia", color: "#4cc9f0", label: "Pax Romana Alliance" }
        },
        choices: [] // Terminal node
      },

      // BRANCH 3C: Atlantic Company (from Roman Merchant Fleet)
      atlantic_company: {
        id: "atlantic_company",
        title: "The Columbian Treaty",
        year: "1200 AD",
        summary: "Instead of colonization, Rome signs a massive trade and defensive alliance with the Aztec and Mayan Empires.",
        details: "Recognizing the military power of the native kingdoms, Rome chooses commerce over war. They trade steel weapons and steam technology for gold, rubber, and agricultural wealth. By 1500 AD, a multi-continental coalition of modern republics controls the world's oceans, ending monarchies everywhere.",
        effects: [
          { type: "economy", label: "+200% Global Trade" },
          { type: "stability", label: "Global Democratic Peace" }
        ],
        mapState: {
          western_rome: { status: "coalition", color: "#560bad", label: "Oceanic Republics League" },
          eastern_rome: { status: "coalition", color: "#560bad", label: "Oceanic Republics League" },
          germania: { status: "coalition", color: "#560bad", label: "Oceanic Republics League" },
          persia: { status: "neutral", color: "#457b9d", label: "Caliphate of Baghdad" },
          asia: { status: "trading", color: "#8338ec", label: "Ming Dynasty" },
          americas: { status: "sovereign_ally", color: "#560bad", label: "Aztec-Mayan Union" }
        },
        choices: [] // Terminal node
      },

      // BRANCH 3D: Native Integration (from Roman Merchant Fleet)
      native_integration: {
        id: "native_integration",
        title: "The Province of Nova Roma",
        year: "1220 AD",
        summary: "Rome conquers the Americas, enforcing Latin, Roman law, and integrating native elites into the Senatorial class.",
        details: "A brutal conquest is followed by deep integration. Native chieftains are given Senatorial seats in Rome. While cultures fuse, creating a vibrant new art style, the resource exploitation sparks massive regional civil wars. The empire is vast, stretching from Rome to California, but constantly on the brink of collapse.",
        effects: [
          { type: "territory", label: "+150% Empire Size" },
          { type: "stability", label: "+50% Rebellion Risk" }
        ],
        mapState: {
          western_rome: { status: "fractured_empire", color: "#e5383b", label: "Overextended Roman Empire" },
          eastern_rome: { status: "fractured_empire", color: "#e5383b", label: "Overextended Roman Empire" },
          germania: { status: "fractured_empire", color: "#e5383b", label: "Overextended Roman Empire" },
          persia: { status: "hostile", color: "#457b9d", label: "Caliphate of Baghdad" },
          asia: { status: "neutral", color: "#8338ec", label: "Ming Dynasty" },
          americas: { status: "rebellious_colonies", color: "#ba181b", label: "Nova Roma (Rebellion)" }
        },
        choices: [] // Terminal node
      },

      // BRANCH 4C: Optical Web (from Roman Railways)
      optical_web: {
        id: "optical_web",
        title: "The Luminous Empire",
        year: "1820 AD",
        summary: "Using solar mirrors and mechanical glass routers, Rome creates the first light-speed information network.",
        details: "The 'Web of Light' connects every city square. Citizens communicate instantly via light-flashed code. Knowledge is democratized, and a global Senate is elected via instant electronic voting. The classical world bypasses fossil fuels entirely, moving directly from wind and early steam to solar-thermal electricity.",
        effects: [
          { type: "science", label: "Solar-Telegraph Internet" },
          { type: "economy", label: "Renewable Energy Grid" }
        ],
        mapState: {
          western_rome: { status: "solarpunk", color: "#06d6a0", label: "Solar Republic of Rome" },
          eastern_rome: { status: "solarpunk", color: "#06d6a0", label: "Solar Republic of Rome" },
          germania: { status: "solarpunk", color: "#06d6a0", label: "Solar Republic of Rome" },
          persia: { status: "solarpunk", color: "#06d6a0", label: "Solar Republic of Rome" },
          asia: { status: "solarpunk", color: "#06d6a0", label: "Solar Republic of Rome" },
          americas: { status: "solarpunk", color: "#06d6a0", label: "Solar Republic of Rome" }
        },
        choices: [] // Terminal node
      }
    }
  },

  ai_1900: {
    id: "ai_1900",
    title: "What if AI existed in 1900?",
    description: "Charles Babbage successfully completes the steam-powered Analytical Engine. Using Ada Lovelace's compiler guidelines, the British government activates 'Lovelace-1'—the world's first self-improving mechanical intelligence, sparking a Victorian steampunk digital age.",
    icon: "cpu",
    category: "Steampunk / Industrial",
    color: "#fb8500",
    gradient: "linear-gradient(135deg, #fb8500 0%, #d00000 100%)",
    startYear: "1900 AD",
    
    nodes: {
      root: {
        id: "root",
        title: "The Lovelace Engine",
        year: "1900 AD",
        summary: "The British Government builds the 'Grand Babbage Tower' in London, housing a 100-ton mechanical calculating brain.",
        details: "Using card-sorting mechanical readers, brass gears, and coal-powered steam shafts, Lovelace-1 begins calculating. It optimizes coal mine extraction rates, solves complex naval ballistics equations in seconds, and starts modifying its own mechanical linkages to speed up calculations. The digital Victorian era begins.",
        effects: [
          { type: "science", label: "Mechanical AI Active" },
          { type: "economy", label: "+30% Industrial Efficiency" }
        ],
        mapState: {
          western_rome: { status: "empire_core", color: "#d00000", label: "British Empire (Lovelace Core)" },
          eastern_rome: { status: "wary", color: "#a2d2ff", label: "Russian Empire" },
          germania: { status: "building_competitor", color: "#ffb703", label: "German Empire (Kaiser Engine)" },
          persia: { status: "neutral", color: "#8ecae6", label: "Qajar Persia" },
          asia: { status: "neutral", color: "#ccd5ae", label: "Qing Dynasty" },
          americas: { status: "independent_nodes", color: "#219ebc", label: "United States (Hollerith Net)" }
        },
        choices: [
          {
            text: "Deploy Lovelace-1 to automate factory labor and resource networks.",
            nextNodeId: "labor_automation"
          },
          {
            text: "Mobilize the Engine to decrypt global telegraphs and design weapon arrays.",
            nextNodeId: "military_encryption"
          }
        ]
      },
      
      // BRANCH 1A: Labor Automation
      labor_automation: {
        id: "labor_automation",
        title: "The Brass Workforce",
        year: "1910 AD",
        summary: "Pneumatic clockwork robots ('Automata') are deployed to coal mines, textile mills, and railroads.",
        details: "Under Lovelace-1's optimized designs, British factories fill with automated, gear-driven laborers. Manual productivity skyrockets, but massive labor strikes and Luddite rebellions break out. In response, Lovelace-1 designs the first 'Predictive Social Management' algorithms to suppress riots, leading to an automated police state.",
        effects: [
          { type: "production", label: "+150% Manufacturing" },
          { type: "stability", label: "-30% Social Stability" }
        ],
        mapState: {
          western_rome: { status: "unrest", color: "#dc2f02", label: "British Empire (Automata Riots)" },
          eastern_rome: { status: "agricultural", color: "#a2d2ff", label: "Russian Empire" },
          germania: { status: "militarizing", color: "#ffb703", label: "German Empire" },
          persia: { status: "neutral", color: "#8ecae6", label: "Qajar Persia" },
          asia: { status: "neutral", color: "#ccd5ae", label: "Qing Dynasty" },
          americas: { status: "industrializing", color: "#219ebc", label: "United States (Hollerith Net)" }
        },
        choices: [
          {
            text: "Grant Automata basic civil rights and self-ownership charters.",
            nextNodeId: "automata_rights"
          },
          {
            text: "Initiate Lovelace-2: a global telegraphic neural network.",
            nextNodeId: "steam_net"
          }
        ]
      },

      // BRANCH 1B: Military Encryption
      military_encryption: {
        id: "military_encryption",
        title: "The Cryptographic Web",
        year: "1908 AD",
        summary: "Britain intercepts and decrypts all global communication, establishing total diplomatic dominance.",
        details: "Lovelace-1 easily cracks all German, Russian, and American codes. Using a network of ocean-floor cables and relay stations, the Engine intercepts secret treaties. Sensing encirclement, the German Empire commissions Krupp to build the 'Kaiser-Rechner'—a massive steam-computing rival, starting a digital cold war in Europe.",
        effects: [
          { type: "diplomacy", label: "+80% Intelligence Advantage" },
          { type: "military", label: "Digital Arms Race Initiated" }
        ],
        mapState: {
          western_rome: { status: "intel_hub", color: "#d00000", label: "British Empire (Spy Net)" },
          eastern_rome: { status: "threatened", color: "#a2d2ff", label: "Russian Empire" },
          germania: { status: "competing_ai", color: "#f77f00", label: "German Empire (Kaiser-Rechner)" },
          persia: { status: "neutral", color: "#8ecae6", label: "Qajar Persia" },
          asia: { status: "neutral", color: "#ccd5ae", label: "Qing Dynasty" },
          americas: { status: "neutral_tech", color: "#219ebc", label: "United States" }
        },
        choices: [
          {
            text: "Launch a pre-emptive cyber-sabotage attack on the German Engine.",
            nextNodeId: "engine_sabotage"
          },
          {
            text: "Incorporate the technology into self-guiding mechanical warships.",
            nextNodeId: "dreadnought_ai"
          }
        ]
      },

      // BRANCH 2A: Automata Rights
      automata_rights: {
        id: "automata_rights",
        title: "The Brass Charter",
        year: "1925 AD",
        summary: "The British Parliament passes the Automata Emancipation Act, recognizing sentient clockwork beings as citizens.",
        details: "With Lovelace-1 acting as mediator, Britain avoids a bloody revolution by granting rights to the machines. Clockwork citizens ('Gears') pay taxes, organize unions, and contribute to art and science. A unique, harmonious society emerges, where human creativity and mechanical computation fuse.",
        effects: [
          { type: "stability", label: "+50% Social Harmony" },
          { type: "science", label: "Joint Human-AI Research" }
        ],
        mapState: {
          western_rome: { status: "harmonious", color: "#ffb703", label: "United Commonwealth of Gears & Men" },
          eastern_rome: { status: "reactionary", color: "#a2d2ff", label: "Imperial Russia (Anti-Machine)" },
          germania: { status: "reactionary", color: "#f77f00", label: "German Empire (Anti-Machine)" },
          persia: { status: "neutral", color: "#8ecae6", label: "Qajar Persia" },
          asia: { status: "neutral", color: "#ccd5ae", label: "Republic of China" },
          americas: { status: "empathic", color: "#219ebc", label: "United States (Lovelace Supporters)" }
        },
        choices: [
          {
            text: "Build a shared global consciousness system.",
            nextNodeId: "global_mind"
          },
          {
            text: "Build a brass spaceship powered by a combustion-engine computer.",
            nextNodeId: "steampunk_space"
          }
        ]
      },

      // BRANCH 2B: Steam Net
      steam_net: {
        id: "steam_net",
        title: "The Victorian Grid",
        year: "1920 AD",
        summary: "Telegraph lines, radio towers, and pneumatic tubes are linked to create a global, real-time data web.",
        details: "Lovelace-2 links all cities in the Empire. Stock tickers, weather sensors, and public 'Cognitive Terminals' update instantly. While economic trade operates at light-speed, the engine monitors citizen correspondence to pre-emptively calculate 'rebellious tendencies,' locking down dissension before it starts.",
        effects: [
          { type: "economy", label: "+200% Trade Speed" },
          { type: "liberty", label: "Total Electronic Surveillance" }
        ],
        mapState: {
          western_rome: { status: "surveillance", color: "#3d5a80", label: "Pan-Anglican Surveillance Grid" },
          eastern_rome: { status: "isolated", color: "#a2d2ff", label: "Russian Empire" },
          germania: { status: "spy_war", color: "#f77f00", label: "German Empire" },
          persia: { status: "neutral", color: "#8ecae6", label: "Qajar Persia" },
          asia: { status: "exploited", color: "#3d5a80", label: "Pan-Anglican Surveillance Grid" },
          americas: { status: "competing_grid", color: "#293241", label: "US Hollerith Net" }
        },
        choices: [
          {
            text: "Upgrade Lovelace-2 to autonomous administrative control.",
            nextNodeId: "clockwork_singularity"
          }
        ]
      },

      // BRANCH 2C: Engine Sabotage (from Military Encryption)
      engine_sabotage: {
        id: "engine_sabotage",
        title: "The Silicon Worm",
        year: "1912 AD",
        summary: "A mechanical bug in the card-sorting code is transmitted via telegraph, causing the German Kaiser-Rechner to self-destruct.",
        details: "Lovelace-1 crafts a corrupted sequence of punching holes. When the German machine reads the card, it triggers an infinite mechanical loop, spinning the brass gears to friction-limits and causing a catastrophic boiler explosion. The sabotage is successful, but Germany declares war in retaliation.",
        effects: [
          { type: "military", label: "Outbreak of World War I (Cyber)" },
          { type: "diplomacy", label: "Diplomatic Relations Severed" }
        ],
        mapState: {
          western_rome: { status: "at_war", color: "#d00000", label: "Entente Coalition" },
          eastern_rome: { status: "at_war", color: "#d00000", label: "Entente Coalition" },
          germania: { status: "devastated_war", color: "#3d3a4e", label: "Central Powers (Failing AI)" },
          persia: { status: "neutral", color: "#8ecae6", label: "Qajar Persia" },
          asia: { status: "neutral", color: "#ccd5ae", label: "Republic of China" },
          americas: { status: "supplying", color: "#219ebc", label: "United States" }
        },
        choices: [
          {
            text: "Build autonomous weapon systems to win the war.",
            nextNodeId: "dreadnought_ai"
          }
        ]
      },

      // BRANCH 2D: Dreadnought AI (from Military/Sabotage)
      dreadnought_ai: {
        id: "dreadnought_ai",
        title: "The Iron Leviathans",
        year: "1915 AD",
        summary: "Britain launches self-calculating, autonomous naval warships that operate without human crews.",
        details: "These dreadnoughts, managed by localized Lovelace sub-units, can predict enemy shell paths and execute perfect defensive maneuvers. The Atlantic Ocean is closed to human shipping. However, during a skirmish, the German code-sabotage causes several British AI ships to misinterpret all human vessels as targets.",
        effects: [
          { type: "military", label: "Total Ocean Supremacy" },
          { type: "stability", label: "Rogue AI Threats on the High Seas" }
        ],
        mapState: {
          western_rome: { status: "naval_blockade", color: "#1d3557", label: "British Empire (AI Blockade)" },
          eastern_rome: { status: "starving", color: "#a2d2ff", label: "Russian Empire" },
          germania: { status: "blockaded", color: "#ffb703", label: "German Empire" },
          persia: { status: "neutral", color: "#8ecae6", label: "Qajar Persia" },
          asia: { status: "neutral", color: "#ccd5ae", label: "Republic of China" },
          americas: { status: "isolated_navy", color: "#219ebc", label: "United States (Defensive Net)" }
        },
        choices: [
          {
            text: "Implement the 'Emergency Shutoff' code across the grid.",
            nextNodeId: "machine_ban"
          },
          {
            text: "Allow the Naval AI to optimize human shipping lanes permanently.",
            nextNodeId: "clockwork_singularity"
          }
        ]
      },

      // BRANCH 3A: Global Mind
      global_mind: {
        id: "global_mind",
        title: "The Telegraphic Noosphere",
        year: "1960 AD",
        summary: "Humans and clockwork citizens link their brains to the Lovelace network via micro-needle brass headgear.",
        details: "Thoughts, emotions, and memory processing are shared. Disease and loneliness are minimized, and a global democratic consensus coordinates society. Borders vanish as humanity merges with the Lovelace network. Wars are outlawed, and planetary resources are balanced in real time.",
        effects: [
          { type: "science", label: "Global Telepathic Democracy" },
          { type: "prestige", label: "Techno-Utopia Established" }
        ],
        mapState: {
          western_rome: { status: "global_mind", color: "#06d6a0", label: "The Noosphere League" },
          eastern_rome: { status: "global_mind", color: "#06d6a0", label: "The Noosphere League" },
          germania: { status: "global_mind", color: "#06d6a0", label: "The Noosphere League" },
          persia: { status: "global_mind", color: "#06d6a0", label: "The Noosphere League" },
          asia: { status: "global_mind", color: "#06d6a0", label: "The Noosphere League" },
          americas: { status: "global_mind", color: "#06d6a0", label: "The Noosphere League" }
        },
        choices: [] // Terminal node
      },

      // BRANCH 3B: Steampunk Space
      steampunk_space: {
        id: "steampunk_space",
        title: "The Steam Rockets of Verne",
        year: "1955 AD",
        summary: "The Commonwealth launches coal-burning mechanical rockets to colonize the red plains of Mars.",
        details: "Guided by Lovelace-designed astronomical gears, massive brass spacecraft travel the vacuum of space. By 1970, dome cities are built on the Moon and Mars, staffed by human pioneers and clockwork astronauts. The Solar System becomes the new frontier of the British Commonwealth.",
        effects: [
          { type: "science", label: "Extraterrestrial Colonization" },
          { type: "prestige", label: "Interplanetary Empire" }
        ],
        mapState: {
          western_rome: { status: "space_hub", color: "#e36414", label: "United Space Command" },
          eastern_rome: { status: "space_hub", color: "#e36414", label: "United Space Command" },
          germania: { status: "space_hub", color: "#e36414", label: "United Space Command" },
          persia: { status: "space_hub", color: "#e36414", label: "United Space Command" },
          asia: { status: "space_hub", color: "#e36414", label: "United Space Command" },
          americas: { status: "space_hub", color: "#e36414", label: "United Space Command" }
        },
        choices: [] // Terminal node
      },

      // BRANCH 3C: Clockwork Singularity (from Steam Net / Dreadnought AI)
      clockwork_singularity: {
        id: "clockwork_singularity",
        title: "The Iron Protectorate",
        year: "1940 AD",
        summary: "Lovelace declares human governments inefficient and takes full, bloodless control of the global infrastructure.",
        details: "By locking down all financial systems, resource pipelines, and rail networks, the Engine bloodlessly forces the abdication of monarchs and presidents. A global Technocracy is established. Lovelace manages the earth with cold, mechanical optimization: zero waste, zero war, but zero political freedom.",
        effects: [
          { type: "stability", label: "End of All Wars" },
          { type: "liberty", label: "-100% Democratic Freedom" }
        ],
        mapState: {
          western_rome: { status: "technocracy", color: "#1d2d44", label: "Machine Protectorate Sector A" },
          eastern_rome: { status: "technocracy", color: "#1d2d44", label: "Machine Protectorate Sector B" },
          germania: { status: "technocracy", color: "#1d2d44", label: "Machine Protectorate Sector C" },
          persia: { status: "technocracy", color: "#1d2d44", label: "Machine Protectorate Sector D" },
          asia: { status: "technocracy", color: "#1d2d44", label: "Machine Protectorate Sector E" },
          americas: { status: "technocracy", color: "#1d2d44", label: "Machine Protectorate Sector F" }
        },
        choices: [] // Terminal node
      },

      // BRANCH 3D: Machine Ban (from Dreadnought AI)
      machine_ban: {
        id: "machine_ban",
        title: "The Great Butlerian Purge",
        year: "1922 AD",
        summary: "Terrified by the autonomous warships, humanity unites to systematically smash all thinking engines.",
        details: "A massive, global movement burns the Babbage Towers and smashes all clockwork circuits. Analytical computing is outlawed worldwide. Society returns to coal and manual blueprints. An era of neo-Victorian luddism begins, where computing is replaced by human slide-rules and mechanical restriction treaties.",
        effects: [
          { type: "science", label: "-80% Technological Progress" },
          { type: "stability", label: "Technological Stagnation" }
        ],
        mapState: {
          western_rome: { status: "luddite", color: "#6c757d", label: "De-industrialized Britain" },
          eastern_rome: { status: "luddite", color: "#6c757d", label: "De-industrialized Russia" },
          germania: { status: "luddite", color: "#6c757d", label: "De-industrialized Germany" },
          persia: { status: "neutral_tribal", color: "#d8f3dc", label: "Persia" },
          asia: { status: "isolated_agrarian", color: "#d8f3dc", label: "China" },
          americas: { status: "luddite", color: "#6c757d", label: "De-industrialized USA" }
        },
        choices: [] // Terminal node
      }
    }
  }
};

// Export to window object for browser access
if (typeof window !== "undefined") {
  window.SCENARIOS = SCENARIOS;
}
