const { useState, useEffect, useRef } = React;

function App() {
  const [activeScenario, setActiveScenario] = useState(null);
  const [timelineHistory, setTimelineHistory] = useState([]); // Array of node objects
  const [activeNode, setActiveNode] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [customPrompt, setCustomPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatorLogs, setGeneratorLogs] = useState([]);
  const [currentView, setCurrentView] = useState("home"); // home, simulator, custom-loading

  // Start a pre-authored scenario
  const startScenario = (scenarioId) => {
    const scenario = window.SCENARIOS[scenarioId];
    setActiveScenario(scenario);
    const rootNode = scenario.nodes.root;
    setTimelineHistory([rootNode]);
    setActiveNode(rootNode);
    setCurrentView("simulator");
  };

  // Handle choosing a path
  const handleSelectChoice = (choice) => {
    if (!activeScenario || !activeNode) return;
    const nextNode = activeScenario.nodes[choice.nextNodeId];
    if (nextNode) {
      const updatedHistory = [...timelineHistory, nextNode];
      setTimelineHistory(updatedHistory);
      setActiveNode(nextNode);
    }
  };

  // Travel back in time to a specific node
  const handleRollback = (index) => {
    const updatedHistory = timelineHistory.slice(0, index + 1);
    setTimelineHistory(updatedHistory);
    setActiveNode(updatedHistory[updatedHistory.length - 1]);
  };

  // Reset simulator
  const handleReset = () => {
    setActiveScenario(null);
    setTimelineHistory([]);
    setActiveNode(null);
    setCurrentView("home");
  };

  // Handle generating custom scenario
  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    setIsGenerating(true);
    setCurrentView("custom-loading");
    setGeneratorLogs([]);

    const logs = [
      "INJECTING TEMPORAL COORDINATES...",
      `PARSING PROMPT: "${customPrompt}"`,
      "SCANNING HISTORICAL TIMELINE FOR DIVERGENCE INDEX...",
      "CALCULATING ALTERNATE OUTCOMES...",
      "GENERATING GEOPOLITICAL STATE VECTORS...",
      "STABILIZING QUANTUM TIMELINE BRANCHES...",
      "TIMELINE SIMULATION COMPLETE. LAUNCHING CHRONO-VIEWER."
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setGeneratorLogs((prev) => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        // Build a custom scenario dynamically based on prompt keywords!
        const promptLower = customPrompt.toLowerCase();
        let customScenario = null;

        if (promptLower.includes("alexandria") || promptLower.includes("library") || promptLower.includes("egypt")) {
          customScenario = getAlexandriaScenario(customPrompt);
        } else if (promptLower.includes("napoleon") || promptLower.includes("french") || promptLower.includes("waterloo")) {
          customScenario = getNapoleonScenario(customPrompt);
        } else if (promptLower.includes("mongol") || promptLower.includes("khan") || promptLower.includes("asia")) {
          customScenario = getMongolScenario(customPrompt);
        } else {
          customScenario = getGenericScenario(customPrompt);
        }

        // Add custom scenario to window registry
        window.SCENARIOS[customScenario.id] = customScenario;
        setActiveScenario(customScenario);
        setTimelineHistory([customScenario.nodes.root]);
        setActiveNode(customScenario.nodes.root);
        setIsGenerating(false);
        setCurrentView("simulator");
      }
    }, 850);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo" onClick={handleReset}>
          <i className="bi bi-clock-history"></i>
          <span>CHRONO-SIM</span>
        </div>
        {currentView !== "home" && (
          <button className="btn btn-secondary" onClick={handleReset}>
            <i className="bi bi-house"></i> Back to Scenarios
          </button>
        )}
      </header>

      <main className="main-content">
        {currentView === "home" && (
          <HomeView 
            startScenario={startScenario} 
            customPrompt={customPrompt}
            setCustomPrompt={setCustomPrompt}
            handleCustomSubmit={handleCustomSubmit}
          />
        )}

        {currentView === "custom-loading" && (
          <div className="glass-card" style={{ maxWidth: "700px", margin: "3rem auto" }}>
            <div className="prompt-loading-spinner">
              <div className="spinner"></div>
              <div className="loading-text">GENERATING ALTERNATE TIMELINE</div>
            </div>
            <div className="terminal-simulate">
              {generatorLogs.map((log, index) => (
                <div key={index} className="terminal-line">&gt; {log}</div>
              ))}
            </div>
          </div>
        )}

        {currentView === "simulator" && activeScenario && (
          <div className="simulator-layout">
            <div className="left-panel">
              <TimelineCard 
                timelineHistory={timelineHistory}
                activeNode={activeNode}
                handleRollback={handleRollback}
                handleSelectChoice={handleSelectChoice}
              />
            </div>
            
            <div className="right-panel">
              <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.01)" }}>
                <h2 style={{ fontSize: "1.3rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <i className="bi bi-geo-alt-fill" style={{ color: activeScenario.color }}></i>
                  Geopolitical Chrono-Map ({activeNode.year})
                </h2>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                  Hover over regions to view territorial details. Map updates dynamically based on choices.
                </p>
              </div>

              <InteractiveMap 
                activeNode={activeNode}
                hoveredRegion={hoveredRegion}
                setHoveredRegion={setHoveredRegion}
                tooltipPos={tooltipPos}
                setTooltipPos={setTooltipPos}
                themeColor={activeScenario.color}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ----------------- COMPONENT: HomeView -----------------
function HomeView({ startScenario, customPrompt, setCustomPrompt, handleCustomSubmit }) {
  const scenariosList = Object.values(window.SCENARIOS).filter(s => s.id !== "custom_alexandria" && s.id !== "custom_napoleon" && s.id !== "custom_mongol" && !s.id.startsWith("custom_generic"));

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "3rem", marginTop: "1rem" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "900", marginBottom: "1rem", letterSpacing: "-0.03em" }}>
          Alternate History <span style={{ color: "var(--accent-primary)" }}>Generator</span>
        </h1>
        <p style={{ fontSize: "1.15rem", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
          Step into the crucible of time. Simulate divergent histories, make critical decisions, and watch maps rewrite themselves in real-time.
        </p>
      </div>

      <h2 style={{ fontSize: "1.6rem", marginBottom: "1.5rem" }}>
        Select a Pre-Authored Simulator
      </h2>
      
      <div className="scenarios-grid">
        {scenariosList.map((scenario) => {
          let iconClass = "bi bi-question-circle";
          if (scenario.icon === "shield") iconClass = "bi bi-shield-exclamation";
          if (scenario.icon === "cpu") iconClass = "bi bi-cpu";

          return (
            <div 
              key={scenario.id} 
              className="glass-card scenario-card" 
              style={{ "--card-color": scenario.color }}
              onClick={() => startScenario(scenario.id)}
            >
              <div>
                <div className="scenario-card-header">
                  <div className="scenario-card-icon" style={{ color: scenario.color }}>
                    <i className={iconClass}></i>
                  </div>
                  <div className="scenario-card-tag">{scenario.category}</div>
                </div>
                <h3 className="scenario-card-title">{scenario.title}</h3>
                <p className="scenario-card-desc">{scenario.description}</p>
              </div>
              <div className="scenario-card-footer" style={{ color: scenario.color }}>
                <span>Initialize Simulator</span>
                <i className="bi bi-arrow-right"></i>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-card custom-prompt-box" style={{ marginTop: "4rem" }}>
        <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <i className="bi bi-sparkles" style={{ color: "var(--accent-secondary)" }}></i>
          Generate a Custom "What if?" Scenario
        </h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Type any historical deviation point (e.g., "What if the library of Alexandria was saved?" or "What if Napoleon won Waterloo?") and let the engine construct a branching simulation.
        </p>
        <form onSubmit={handleCustomSubmit} className="custom-input-group">
          <input 
            type="text" 
            className="custom-input" 
            placeholder="e.g. What if the Aztec Empire industrialized in 1500?" 
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
          />
          <button type="submit" className="btn btn-accent">
            <i className="bi bi-play-fill"></i> Generate Timeline
          </button>
        </form>
      </div>
    </div>
  );
}

// ----------------- COMPONENT: TimelineCard -----------------
function TimelineCard({ timelineHistory, activeNode, handleRollback, handleSelectChoice }) {
  const containerRef = useRef(null);

  // Auto scroll to the bottom of the timeline whenever a new node is selected
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [timelineHistory]);

  const isTerminal = !activeNode.choices || activeNode.choices.length === 0;

  return (
    <div className="glass-card timeline-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ overflowY: "auto", flex: 1, paddingRight: "0.5rem" }} ref={containerRef}>
        <div className="timeline-wrapper">
          <div className="timeline-line"></div>
          
          {timelineHistory.map((node, index) => {
            const isActive = node.id === activeNode.id;
            const isClickablePast = index < timelineHistory.length - 1;

            return (
              <div 
                key={`${node.id}-${index}`} 
                className={`timeline-item ${isActive ? 'active-node' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="timeline-dot" 
                  style={{ 
                    cursor: isClickablePast ? "pointer" : "default",
                    borderColor: isActive ? "var(--accent-primary)" : "var(--glass-border)"
                  }}
                  onClick={() => isClickablePast && handleRollback(index)}
                  title={isClickablePast ? "Click to roll back time to this point" : ""}
                >
                  {isClickablePast ? (
                    <i className="bi bi-arrow-counterclockwise" style={{ color: "var(--accent-primary)" }}></i>
                  ) : (
                    <i className="bi bi-circle-fill" style={{ transform: isActive ? "scale(0.5)" : "scale(0.35)", fontSize: "8px" }}></i>
                  )}
                </div>

                <div className="timeline-content-card">
                  <div className="timeline-item-header">
                    <span className="timeline-year">{node.year}</span>
                    {isClickablePast && (
                      <span 
                        style={{ fontSize: "0.75rem", color: "var(--accent-primary)", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.2rem" }}
                        onClick={() => handleRollback(index)}
                      >
                        <i className="bi bi-clock-history" style={{ fontSize: "0.75rem" }}></i> Rollback here
                      </span>
                    )}
                  </div>
                  <h3 className="timeline-title">{node.title}</h3>
                  <p className="timeline-desc">{node.summary}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: "1.5rem", borderTop: "1px solid var(--glass-border)", paddingTop: "1.5rem" }}>
        <h4 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>
          Active State Details
        </h4>
        <div className="details-box">
          {activeNode.details}
          
          {activeNode.effects && activeNode.effects.length > 0 && (
            <div className="impact-badges">
              {activeNode.effects.map((eff, i) => (
                <span key={i} className={`impact-badge ${eff.type}`}>
                  <i className={
                    eff.type === 'science' ? 'bi bi-atom' :
                    eff.type === 'stability' ? 'bi bi-shield-fill' :
                    eff.type === 'economy' ? 'bi bi-coin' :
                    eff.type === 'military' ? 'bi bi-swords' :
                    eff.type === 'colony' ? 'bi bi-anchor' : 'bi bi-info-circle-fill'
                  }></i>
                  {eff.label}
                </span>
              ))}
            </div>
          )}
        </div>

        {!isTerminal ? (
          <div className="branches-card">
            <h5 className="branches-title">
              <i className="bi bi-git"></i> Choose Divergent Path:
            </h5>
            <div className="branch-choices-list">
              {activeNode.choices.map((choice, i) => (
                <button 
                  key={i} 
                  className="choice-button"
                  onClick={() => handleSelectChoice(choice)}
                >
                  <span>{choice.text}</span>
                  <i className="bi bi-chevron-right"></i>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: "1rem", background: "rgba(56, 176, 0, 0.05)", border: "1px dashed var(--accent-success)", borderRadius: "var(--radius-sm)", textAlign: "center", color: "var(--accent-success)", fontWeight: "600" }}>
            <i className="bi bi-check-circle" style={{ marginRight: "0.5rem" }}></i>
            Simulation Terminal Node Reached
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------- COMPONENT: InteractiveMap -----------------
function InteractiveMap({ activeNode, hoveredRegion, setHoveredRegion, tooltipPos, setTooltipPos, themeColor }) {
  
  // Custom world map SVG data points for geometric paths
  const mapPaths = [
    {
      id: "americas",
      name: "The Americas",
      // North and South America combined polygon
      d: "M 80 80 L 220 80 L 250 160 L 220 200 L 200 240 L 260 380 L 230 450 L 170 460 L 190 320 L 140 220 L 80 180 Z"
    },
    {
      id: "western_rome",
      name: "Western Europe / Mediterranean",
      d: "M 360 140 L 450 120 L 470 165 L 430 215 L 380 205 L 350 170 Z"
    },
    {
      id: "germania",
      name: "Northern Europe / Scandinavia",
      d: "M 450 70 L 560 80 L 550 150 L 470 165 L 450 120 Z"
    },
    {
      id: "eastern_rome",
      name: "Eastern Mediterranean / Balkans",
      d: "M 470 165 L 540 170 L 560 235 L 500 245 L 460 215 Z"
    },
    {
      id: "persia",
      name: "Mesopotamia / Persia",
      d: "M 540 170 L 640 175 L 650 245 L 560 235 Z"
    },
    {
      id: "asia",
      name: "East Asia / China / India",
      d: "M 640 90 L 880 90 L 910 260 L 750 340 L 680 260 L 640 175 Z"
    },
    {
      id: "africa",
      name: "Sub-Saharan Africa",
      d: "M 380 225 L 460 220 L 500 280 L 470 420 L 420 420 L 375 290 Z"
    }
  ];

  const handleMouseMove = (e) => {
    // Get cursor position relative to map container
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    setTooltipPos({ x, y });
  };

  const getRegionStyle = (regionId) => {
    const defaultColor = "#1b2336";
    const state = activeNode.mapState && activeNode.mapState[regionId];
    
    if (state) {
      return {
        fill: state.color || themeColor,
        fillOpacity: hoveredRegion === regionId ? 0.95 : 0.75,
      };
    }

    // Default styling for unmentioned/neutral regions (like Sub-Saharan Africa or neutral territories)
    return {
      fill: defaultColor,
      fillOpacity: hoveredRegion === regionId ? 0.4 : 0.25,
    };
  };

  const activeRegionData = activeNode.mapState && hoveredRegion && activeNode.mapState[hoveredRegion];

  return (
    <div className="map-container" onMouseMove={handleMouseMove}>
      <svg className="world-svg" viewBox="0 0 1000 500">
        {/* Draw subtle grid lines in the background */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {mapPaths.map((region) => (
          <path
            key={region.id}
            d={region.d}
            className="map-region"
            style={getRegionStyle(region.id)}
            onMouseEnter={() => setHoveredRegion(region.id)}
            onMouseLeave={() => setHoveredRegion(null)}
          />
        ))}
      </svg>

      {/* Interactive Tooltip */}
      <div 
        className={`map-tooltip ${hoveredRegion ? 'visible' : ''}`}
        style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
      >
        {hoveredRegion && (
          <div>
            <div style={{ fontWeight: "700", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.25rem", marginBottom: "0.25rem" }}>
              {mapPaths.find(r => r.id === hoveredRegion)?.name}
            </div>
            <div style={{ fontSize: "0.8rem", color: activeRegionData ? "var(--text-main)" : "var(--text-muted)" }}>
              {activeRegionData ? (
                <div>
                  <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: activeRegionData.color || themeColor, marginRight: "5px" }}></span>
                  <strong>{activeRegionData.label}</strong>
                  <div style={{ marginTop: "3px", fontSize: "0.75rem", color: "var(--text-muted)" }}>Status: {activeRegionData.status.toUpperCase().replace("_", " ")}</div>
                </div>
              ) : (
                "Neutral / Uncharted Territory"
              )}
            </div>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div className="map-legend">
        {activeNode.mapState && Object.entries(activeNode.mapState).map(([key, state]) => {
          const regionName = mapPaths.find(r => r.id === key)?.name || key;
          return (
            <div key={key} className="legend-item">
              <div className="legend-color" style={{ background: state.color || themeColor }}></div>
              <span>{state.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ----------------- TEMPLATE GENERATORS FOR CUSTOM PROMPTS -----------------

function getAlexandriaScenario(prompt) {
  return {
    id: "custom_alexandria",
    title: "What if the Library of Alexandria was saved?",
    description: `Alternate timeline simulator based on prompt: "${prompt}". In 48 BC, Julius Caesar prevents the fleet fires from spreading to the Royal Quarter, safeguarding 700,000 scientific scrolls and reshaping global academic growth.`,
    color: "#06d6a0",
    gradient: "linear-gradient(135deg, #06d6a0 0%, #1b4332 100%)",
    startYear: "48 BC",
    nodes: {
      root: {
        id: "root",
        title: "The Fire Prevented",
        year: "48 BC",
        summary: "Julius Caesar's soldiers construct an emergency sand-barrier in Alexandria's harbor, halting the spread of fire from docked ships to the Great Library.",
        details: "As flames consume the Egyptian fleet, Roman legions successfully isolate the harbor. The Library of Alexandria remains intact. Scholars and librarians copy and distribute scientific, engineering, and philosophical texts to Rome and Athens, preventing the loss of ancient Greek and Babylonian mathematics.",
        effects: [
          { type: "science", label: "+80% Scientific Knowledge" },
          { type: "stability", label: "Intellectual Preservation" }
        ],
        mapState: {
          western_rome: { status: "growing_empire", color: "#e63946", label: "Roman Republic" },
          eastern_rome: { status: "intellectual_hub", color: "#06d6a0", label: "Alexandrian Cultural Zone" },
          germania: { status: "barbarian", color: "#fb8500", label: "Germanic Tribes" },
          persia: { status: "competing", color: "#457b9d", label: "Parthian Empire" },
          asia: { status: "neutral", color: "#8338ec", label: "Han Dynasty" },
          americas: { status: "unknown", color: "#1d3557", label: "Indigenous Tribes" }
        },
        choices: [
          {
            text: "Establish Roman State Universities to standardize scientific study.",
            nextNodeId: "roman_universities"
          },
          {
            text: "Synthesize Alexandrian steam concepts for early mechanical automation.",
            nextNodeId: "ancient_steam"
          }
        ]
      },
      roman_universities: {
        id: "roman_universities",
        title: "The Great Lyceums",
        year: "150 AD",
        summary: "The Roman Empire funds a network of public universities, accelerating mathematical, medical, and astronomical progress by centuries.",
        details: "With Euclid's geometry and Eratosthenes' geography standard in Roman education, scholars solve sanitation, mechanical pump engineering, and celestial navigation. An early scientific revolution flourishes, and a new middle class of physicians and builders takes political influence in Rome.",
        effects: [
          { type: "science", label: "+150% Math & Navigation" },
          { type: "stability", label: "Representative Senate Reform" }
        ],
        mapState: {
          western_rome: { status: "republic_restored", color: "#06d6a0", label: "United Roman Senate" },
          eastern_rome: { status: "republic_restored", color: "#06d6a0", label: "United Roman Senate" },
          germania: { status: "trading_allies", color: "#e63946", label: "Pacified Germania" },
          persia: { status: "allied", color: "#457b9d", label: "Parthian Republic" },
          asia: { status: "trading", color: "#8338ec", label: "Han Dynasty" },
          americas: { status: "unknown", color: "#1d3557", label: "Indigenous Kingdoms" }
        },
        choices: [
          {
            text: "Design advanced navigational caravels to map the Atlantic.",
            nextNodeId: "early_atlantic_discovery"
          }
        ]
      },
      ancient_steam: {
        id: "ancient_steam",
        title: "The Steam Age of Alexandria",
        year: "100 AD",
        summary: "Alexandrian engineer Hero successfully scales up the aeolipile steam engine, powering massive water mills and mechanical loom factories.",
        details: "Coal is imported from Sardinia to feed the great bronze boilers. Rome bypasses slave labor in favor of cheaper steam-driven looms. Factories crop up in Alexandria, Antioch, and Rome, kicking off an industrial revolution in the 1st century AD.",
        effects: [
          { type: "production", label: "Early Industrialization" },
          { type: "economy", label: "+200% Output Boost" }
        ],
        mapState: {
          western_rome: { status: "industrial", color: "#d90429", label: "Industrialized Rome" },
          eastern_rome: { status: "industrial", color: "#d90429", label: "Industrialized Rome" },
          germania: { status: "hostile", color: "#fb8500", label: "Germanic Coalition" },
          persia: { status: "defensive", color: "#457b9d", label: "Parthian Empire" },
          asia: { status: "neutral", color: "#8338ec", label: "Han Dynasty" },
          americas: { status: "unknown", color: "#1d3557", label: "Indigenous Kingdoms" }
        },
        choices: [
          {
            text: "Build trans-continental steam railroads.",
            nextNodeId: "early_railroads"
          }
        ]
      },
      early_atlantic_discovery: {
        id: "early_atlantic_discovery",
        title: "The Greco-Roman Americas",
        year: "300 AD",
        summary: "Navigating with advanced astrolabes, Roman-Egyptian fleets map the American coastline and form scientific trade outposts.",
        details: "Rome sets up ports in modern Cuba and Brazil, exchanging steel, glass, and books for potatoes and gold. Because this happens centuries early, diseases are managed via early quarantine procedures, allowing Mesoamerican empires to integrate into a global scientific federation rather than collapse.",
        effects: [
          { type: "science", label: "Global Navigation Grid" },
          { type: "economy", label: "Atlantic Scientific League" }
        ],
        mapState: {
          western_rome: { status: "federation", color: "#06d6a0", label: "World Scientific Alliance" },
          eastern_rome: { status: "federation", color: "#06d6a0", label: "World Scientific Alliance" },
          germania: { status: "federation", color: "#06d6a0", label: "World Scientific Alliance" },
          persia: { status: "federation", color: "#06d6a0", label: "World Scientific Alliance" },
          asia: { status: "federation", color: "#06d6a0", label: "World Scientific Alliance" },
          americas: { status: "federation", color: "#06d6a0", label: "Mesoamerican Scientific Leagues" }
        },
        choices: []
      },
      early_railroads: {
        id: "early_railroads",
        title: "The Iron Pax Romana",
        year: "400 AD",
        summary: "Steam trains connect Spain to India. The medieval era is completely bypassed in favor of a global technological union.",
        details: "By 400 AD, humanity lives in a highly connected, industrialized civilization. Classical republics replace absolute monarchs, and scientific progress remains uninterrupted. Air pollution is checked early by alchemical filter systems, leading to a highly clean steam-solar technological utopia.",
        effects: [
          { type: "science", label: "Planetary Rail Grid" },
          { type: "prestige", label: "Classical Utopia Established" }
        ],
        mapState: {
          western_rome: { status: "utopia", color: "#06d6a0", label: "Pax Technica Union" },
          eastern_rome: { status: "utopia", color: "#06d6a0", label: "Pax Technica Union" },
          germania: { status: "utopia", color: "#06d6a0", label: "Pax Technica Union" },
          persia: { status: "utopia", color: "#06d6a0", label: "Pax Technica Union" },
          asia: { status: "utopia", color: "#06d6a0", label: "Pax Technica Union" },
          americas: { status: "utopia", color: "#06d6a0", label: "Pax Technica Union" }
        },
        choices: []
      }
    }
  };
}

function getNapoleonScenario(prompt) {
  return {
    id: "custom_napoleon",
    title: "What if Napoleon won Waterloo?",
    description: `Alternate timeline simulator based on prompt: "${prompt}". In 1815, Napoleon Bonaparte exploits a gap in Wellington's defensive lines, shattering the Allied coalition and securing French hegemony over Europe.`,
    color: "#3a86ff",
    gradient: "linear-gradient(135deg, #3a86ff 0%, #1e3a8a 100%)",
    startYear: "1815 AD",
    nodes: {
      root: {
        id: "root",
        title: "The Triumph at Mont-Saint-Jean",
        year: "1815 AD",
        summary: "Napoleon's cavalry charges Wellington's center before Prussian reinforcements arrive, routing the Anglo-Allied army.",
        details: "By delaying the Prussian marshal Blücher and concentrating heavy artillery fire on Wellington's center, Napoleon claims victory at Waterloo. Britain withdraws its forces to the sea, and the Coalition collapses. The Treaty of Brussels re-establishes the French Empire's domination over Central Europe.",
        effects: [
          { type: "military", label: "+60% French Land Supremacy" },
          { type: "stability", label: "Coalition Collapse" }
        ],
        mapState: {
          western_rome: { status: "french_core", color: "#3a86ff", label: "French Empire" },
          eastern_rome: { status: "wary", color: "#ffb703", label: "Ottoman Empire" },
          germania: { status: "vassal", color: "#8ecae6", label: "Confederation of the Rhine" },
          persia: { status: "neutral", color: "#ccd5ae", label: "Persian Empire" },
          asia: { status: "neutral", color: "#a2d2ff", label: "Russian Empire" },
          americas: { status: "wary", color: "#219ebc", label: "United States" }
        },
        choices: [
          {
            text: "Unify continental Europe under the 'Code Napoleon' legal and economic system.",
            nextNodeId: "continental_system"
          },
          {
            text: "Incorporate steam-powered airships to bypass British naval control.",
            nextNodeId: "french_airships"
          }
        ]
      },
      continental_system: {
        id: "continental_system",
        title: "United States of Europe",
        year: "1840 AD",
        summary: "The metric system, decimal coinages, and the Napoleonic Code are established from Lisbon to Warsaw.",
        details: "Trade barriers are broken down across the continent. France spearheads a massive infrastructure build, constructing canals and iron railways linking Paris to Vienna. While safe on land, the British blockades continue, isolating Europe economically from the Americas.",
        effects: [
          { type: "economy", label: "+100% Continental Trade" },
          { type: "stability", label: "Legal Standardisation" }
        ],
        mapState: {
          western_rome: { status: "united_europe", color: "#3a86ff", label: "French European Union" },
          eastern_rome: { status: "neutral", color: "#ffb703", label: "Ottoman Empire" },
          germania: { status: "united_europe", color: "#3a86ff", label: "French European Union" },
          persia: { status: "neutral", color: "#ccd5ae", label: "Persian Empire" },
          asia: { status: "wary_neutral", color: "#a2d2ff", label: "Russian Empire" },
          americas: { status: "trading", color: "#219ebc", label: "United States" }
        },
        choices: [
          {
            text: "Launch an airship-landing campaign in southern England.",
            nextNodeId: "england_invasion"
          }
        ]
      },
      french_airships: {
        id: "french_airships",
        title: "The Grand Imperial Fleet",
        year: "1835 AD",
        summary: "French scientists scale up coal-burning steam airships, establishing the first militarized aerial divisions.",
        details: "Bypassing the Royal Navy, Napoleon's airships control the European skies. Cargo is transported at high speeds, and Britain's wooden wall is made obsolete. An era of early aviation warfare and steam-punk air dreadnoughts begins.",
        effects: [
          { type: "science", label: "Early Aviation Achieved" },
          { type: "military", label: "Aerial Supremacy" }
        ],
        mapState: {
          western_rome: { status: "aerial_empire", color: "#000814", label: "Imperial French Sky Alliance" },
          eastern_rome: { status: "threatened", color: "#ffb703", label: "Ottoman Empire" },
          germania: { status: "aerial_empire", color: "#000814", label: "Imperial French Sky Alliance" },
          persia: { status: "neutral", color: "#ccd5ae", label: "Persian Empire" },
          asia: { status: "threatened", color: "#a2d2ff", label: "Russian Empire" },
          americas: { status: "defensive", color: "#219ebc", label: "United States" }
        },
        choices: [
          {
            text: "Invade Britain via airship armada.",
            nextNodeId: "england_invasion"
          }
        ]
      },
      england_invasion: {
        id: "england_invasion",
        title: "The Fall of London",
        year: "1850 AD",
        summary: "French forces land in Sussex, taking London and establishing the British Republic under French oversight.",
        details: "With London occupied, the British monarchy flees to Canada. The Royal Navy splits, leaving Europe completely unified under French imperial rule. A global Napoleonic era begins, replacing old feudal institutions with a modernized, meritocratic technocracy.",
        effects: [
          { type: "military", label: "Global Hegemony" },
          { type: "prestige", label: "Dynastic Feudalism Destroyed" }
        ],
        mapState: {
          western_rome: { status: "hegemony", color: "#3a86ff", label: "Global French Coalition" },
          eastern_rome: { status: "subjugated", color: "#3a86ff", label: "Global French Coalition" },
          germania: { status: "hegemony", color: "#3a86ff", label: "Global French Coalition" },
          persia: { status: "allied", color: "#3a86ff", label: "Global French Coalition" },
          asia: { status: "hegemony", color: "#3a86ff", label: "Global French Coalition" },
          americas: { status: "cold_war", color: "#e63946", label: "British Monarchists in Canada" }
        },
        choices: []
      }
    }
  };
}

function getMongolScenario(prompt) {
  return {
    id: "custom_mongol",
    title: "What if the Mongol Empire never fractured?",
    description: `Alternate timeline simulator based on prompt: "${prompt}". In 1259, Mongke Khan survives his campaign in China, preventing the succession civil wars and keeping the massive Mongol Empire united under a central Kurultai.`,
    color: "#ff006e",
    gradient: "linear-gradient(135deg, #ff006e 0%, #7209b7 100%)",
    startYear: "1259 AD",
    nodes: {
      root: {
        id: "root",
        title: "The Survival of Mongke",
        year: "1259 AD",
        summary: "Mongke Khan survives cholera, cementing his rule and electing Kublai as his unified successor without a civil war.",
        details: "By surviving his southern campaign, Mongke Khan maintains the central administrative lock of Karakorum. Kublai is designated successor with unanimous support. The Golden Horde, Chagatai, Ilkhanate, and Yuan dynasties remain departments of a single, colossal empire.",
        effects: [
          { type: "stability", label: "+70% Centralized Control" },
          { type: "economy", label: "Pax Mongolica Stabilized" }
        ],
        mapState: {
          western_rome: { status: "threatened", color: "#e63946", label: "European Kingdoms" },
          eastern_rome: { status: "threatened", color: "#b5179e", label: "Byzantine Empire" },
          germania: { status: "threatened", color: "#fb8500", label: "Teutonic States" },
          persia: { status: "occupied", color: "#ff006e", label: "Ilkhanate (Mongol Empire)" },
          asia: { status: "core", color: "#ff006e", label: "Yuan/Chagatai (Mongol Empire)" },
          americas: { status: "unknown", color: "#1d3557", label: "Indigenous Kingdoms" }
        },
        choices: [
          {
            text: "Invade and integrate Western Europe.",
            nextNodeId: "europe_invasion"
          },
          {
            text: "Build a massive oceanic navy to explore the Pacific.",
            nextNodeId: "mongol_navy"
          }
        ]
      },
      europe_invasion: {
        id: "europe_invasion",
        title: "The Steppe in Rome",
        year: "1280 AD",
        summary: "A unified Mongol army conquers Hungary, Germany, and France, establishing the Khanate of Europe.",
        details: "Without inner conflicts, the Mongol generals use coordinated cavalry tactics to defeat European knights at Vienna and Paris. The Pope retreats to Britain. Europe is integrated into the Mongol postal relay (Yam) and tax system, sparking a rapid flow of Chinese technology (printing, gunpowder) to the West.",
        effects: [
          { type: "military", label: "Conquest of Europe" },
          { type: "science", label: "East-West Tech Integration" }
        ],
        mapState: {
          western_rome: { status: "occupied", color: "#ff006e", label: "European Khanate (Mongol Empire)" },
          eastern_rome: { status: "tributary", color: "#ff006e", label: "European Khanate (Mongol Empire)" },
          germania: { status: "occupied", color: "#ff006e", label: "European Khanate (Mongol Empire)" },
          persia: { status: "core", color: "#ff006e", label: "Mongol Central Core" },
          asia: { status: "core", color: "#ff006e", label: "Mongol Central Core" },
          americas: { status: "unknown", color: "#1d3557", label: "Aztec Empire" }
        },
        choices: [
          {
            text: "Synthesize eastern administrative structures to declare a global Meritocratic Republic.",
            nextNodeId: "merit_republic"
          }
        ]
      },
      mongol_navy: {
        id: "mongol_navy",
        title: "The Pacific Armadas",
        year: "1290 AD",
        summary: "Using Korean and Chinese shipwrights, Karakorum builds a fleet that successfully lands in Japan and reaches America.",
        details: "The Kamikaze storm does not stop the fleet. Japan is annexed, and Mongol vessels ride the Kuroshio current to California. They establish trade ports in the Pacific Northwest, bringing horses and metal metallurgy to North America early.",
        effects: [
          { type: "economy", label: "+150% Pacific Commerce" },
          { type: "colony", label: "Pacific Rim Exploration" }
        ],
        mapState: {
          western_rome: { status: "threatened", color: "#e63946", label: "European Kingdoms" },
          eastern_rome: { status: "neutral", color: "#b5179e", label: "Byzantine Empire" },
          germania: { status: "neutral", color: "#fb8500", label: "Teutonic States" },
          persia: { status: "core", color: "#ff006e", label: "Mongol Central Core" },
          asia: { status: "core", color: "#ff006e", label: "Mongol Central Core" },
          americas: { status: "trading_outposts", color: "#ff006e", label: "Mongol America" }
        },
        choices: [
          {
            text: "Build a global iron telegraph system to coordinate the vast empire.",
            nextNodeId: "mongol_telegraph"
          }
        ]
      },
      merit_republic: {
        id: "merit_republic",
        title: "The Great Pax Pax",
        year: "1400 AD",
        summary: "The Mongol postal system is upgraded to print books, creating an early scientific renaissance.",
        details: "Under Karakorum's central rules, religious tolerance is enforced, and science is funded via state tests. Feudalism is dismantled across Eurasia, replaced by a centralized bureau of engineers and administrators. The world enters a golden age of peace and early industrialization.",
        effects: [
          { type: "science", label: "Scientific Enlightenment" },
          { type: "prestige", label: "Eurasian Union Complete" }
        ],
        mapState: {
          western_rome: { status: "enlightened", color: "#ff006e", label: "United Eurasian Federation" },
          eastern_rome: { status: "enlightened", color: "#ff006e", label: "United Eurasian Federation" },
          germania: { status: "enlightened", color: "#ff006e", label: "United Eurasian Federation" },
          persia: { status: "enlightened", color: "#ff006e", label: "United Eurasian Federation" },
          asia: { status: "enlightened", color: "#ff006e", label: "United Eurasian Federation" },
          americas: { status: "enlightened", color: "#ff006e", label: "United Eurasian Federation" }
        },
        choices: []
      },
      mongol_telegraph: {
        id: "mongol_telegraph",
        title: "The Iron Postal Net",
        year: "1350 AD",
        summary: "Using early chemical batteries and copper wire lines, Karakorum coordinates troops in California and Kiev instantly.",
        details: "By 1350, the Pax Mongolica is held together by the first electrical information network. Rebellions are checked instantly, and a global economic system emerges where paper currency is managed via early computational codes, creating a digital-steppe civilization.",
        effects: [
          { type: "science", label: "Early Telecom System" },
          { type: "economy", label: "Paper Coinage Stabilisation" }
        ],
        mapState: {
          western_rome: { status: "integrated", color: "#ff006e", label: "Telegraphic Mongol Empire" },
          eastern_rome: { status: "integrated", color: "#ff006e", label: "Telegraphic Mongol Empire" },
          germania: { status: "integrated", color: "#ff006e", label: "Telegraphic Mongol Empire" },
          persia: { status: "integrated", color: "#ff006e", label: "Telegraphic Mongol Empire" },
          asia: { status: "integrated", color: "#ff006e", label: "Telegraphic Mongol Empire" },
          americas: { status: "integrated", color: "#ff006e", label: "Telegraphic Mongol Empire" }
        },
        choices: []
      }
    }
  };
}

function getGenericScenario(prompt) {
  const cleanPrompt = prompt.replace("What if ", "").replace("what if ", "").replace("?", "");
  return {
    id: `custom_generic_${Date.now()}`,
    title: `What if ${cleanPrompt}?`,
    description: `A simulated alternate history scenario calculated from the deviation point: "${prompt}". Explores the chain-reaction consequences of this divergence.`,
    color: "#ffb703",
    gradient: "linear-gradient(135deg, #ffb703 0%, #fb8500 100%)",
    startYear: "1700 AD",
    nodes: {
      root: {
        id: "root",
        title: "The Point of Divergence",
        year: "1700 AD",
        summary: `The event details of: "${cleanPrompt}" manifest, causing a ripple effect in global politics.`,
        details: `Due to an unexpected pivot of circumstances, the historical path shifts: "${cleanPrompt}". Local powers are caught off guard, and traditional alliances are broken. Trade patterns alter instantly as a new geopolitical center begins to rise.`,
        effects: [
          { type: "stability", label: "Historical Divergence Active" },
          { type: "economy", label: "+20% Local Autonomy" }
        ],
        mapState: {
          western_rome: { status: "unstable", color: "#fb8500", label: "Dynamic Sector A" },
          eastern_rome: { status: "neutral", color: "#1d3557", label: "Dynamic Sector B" },
          germania: { status: "wary", color: "#8ecae6", label: "Dynamic Sector C" },
          persia: { status: "neutral", color: "#ccd5ae", label: "Dynamic Sector D" },
          asia: { status: "neutral", color: "#a2d2ff", label: "Dynamic Sector E" },
          americas: { status: "affected", color: "#ffb703", label: "Dynamic Sector F" }
        },
        choices: [
          {
            text: "Leverage this change to build a technological federation.",
            nextNodeId: "path_tech"
          },
          {
            text: "Utilize military mobilization to enforce regional stability.",
            nextNodeId: "path_military"
          }
        ]
      },
      path_tech: {
        id: "path_tech",
        title: "The Scientific Renaissance",
        year: "1750 AD",
        summary: "The divergence leads to an early industrial boom, prioritizing scientific academies and mechanical automation.",
        details: "By focusing resources on engineering and education, the state builds massive iron factories and mechanical systems. Trade networks connect far-reaching sectors, creating an early technological union.",
        effects: [
          { type: "science", label: "+100% Technology Progress" },
          { type: "economy", label: "+50% Resource Output" }
        ],
        mapState: {
          western_rome: { status: "industrial", color: "#ffb703", label: "Technological League" },
          eastern_rome: { status: "industrial", color: "#ffb703", label: "Technological League" },
          germania: { status: "allied", color: "#ffb703", label: "Technological League" },
          persia: { status: "neutral", color: "#ccd5ae", label: "Persia" },
          asia: { status: "trading", color: "#8338ec", label: "Asian Dynasties" },
          americas: { status: "industrial", color: "#ffb703", label: "Technological League" }
        },
        choices: [
          {
            text: "Launch a global information net to unify all societies.",
            nextNodeId: "path_final_tech"
          }
        ]
      },
      path_military: {
        id: "path_military",
        title: "The Iron Restructuring",
        year: "1745 AD",
        summary: "Central authorities mobilize massive armies, establishing unified regional protectorates to quell unrest.",
        details: "Rejecting decentralized trade, the central command structures consolidate territory. Heavy fortifications are erected along main trade routes, securing iron-fisted stability but raising local taxes.",
        effects: [
          { type: "military", label: "+80% Territorial Control" },
          { type: "stability", label: "Low Unrest Index" }
        ],
        mapState: {
          western_rome: { status: "occupied", color: "#d90429", label: "Iron Protectorate" },
          eastern_rome: { status: "occupied", color: "#d90429", label: "Iron Protectorate" },
          germania: { status: "hostile", color: "#fb8500", label: "Free Border Tribes" },
          persia: { status: "neutral", color: "#ccd5ae", label: "Persian Empire" },
          asia: { status: "defensive", color: "#8338ec", label: "Asian Coalition" },
          americas: { status: "occupied", color: "#d90429", label: "Iron Protectorate" }
        },
        choices: [
          {
            text: "Establish a permanent global autocracy to secure perpetual peace.",
            nextNodeId: "path_final_military"
          }
        ]
      },
      path_final_tech: {
        id: "path_final_tech",
        title: "The Global Enlightenment Grid",
        year: "1800 AD",
        summary: "Society bypasses industrial pollution, creating a unified global community based on communication and science.",
        details: "By 1800 AD, humanity is united under a global technological forum. Cities are connected via solar telegraph arrays and clean rail transit. Wars are obsolete, replaced by joint scientific ventures.",
        effects: [
          { type: "science", label: "Clean Technology Grid" },
          { type: "prestige", label: "Global Utopia Active" }
        ],
        mapState: {
          western_rome: { status: "utopia", color: "#06d6a0", label: "Global Scientific League" },
          eastern_rome: { status: "utopia", color: "#06d6a0", label: "Global Scientific League" },
          germania: { status: "utopia", color: "#06d6a0", label: "Global Scientific League" },
          persia: { status: "utopia", color: "#06d6a0", label: "Global Scientific League" },
          asia: { status: "utopia", color: "#06d6a0", label: "Global Scientific League" },
          americas: { status: "utopia", color: "#06d6a0", label: "Global Scientific League" }
        },
        choices: []
      },
      path_final_military: {
        id: "path_final_military",
        title: "The Steel Order",
        year: "1800 AD",
        summary: "The world is unified under a single, central administrative council, ending conflict through total authority.",
        details: "With all opposing forces integrated or disbanded, the global council governs resources mathematically. Society is secure, crime is eliminated, but individual political expression is completely replaced by resource quotas.",
        effects: [
          { type: "stability", label: "0% Global Conflict" },
          { type: "liberty", label: "-100% Political Freedom" }
        ],
        mapState: {
          western_rome: { status: "technocracy", color: "#2b2d42", label: "Unified Steel Council" },
          eastern_rome: { status: "technocracy", color: "#2b2d42", label: "Unified Steel Council" },
          germania: { status: "technocracy", color: "#2b2d42", label: "Unified Steel Council" },
          persia: { status: "technocracy", color: "#2b2d42", label: "Unified Steel Council" },
          asia: { status: "technocracy", color: "#2b2d42", label: "Unified Steel Council" },
          americas: { status: "technocracy", color: "#2b2d42", label: "Unified Steel Council" }
        },
        choices: []
      }
    }
  };
}

// Export to window for browser access
if (typeof window !== "undefined") {
  window.App = App;
}
