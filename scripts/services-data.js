const SERVICES_DATA = [
  {
    id: "module-01",
    number: "MODULE 01",
    title: "Parametric CAD & DFM",
    shortDesc: "Solid modelling, enclosure design & heat-set insert integration.",
    deliverables: [
      "Parametric 3D CAD models (.STEP / .IGES)",
      "2D production drawings with critical tolerances",
      "Enclosure design optimized for heat-set inserts & hardware"
    ],
    tools: ["Fusion 360", "DFM for FDM/SLA", "Tolerancing"],
    projectTag: "module-01"
  },
  {
    id: "module-02",
    number: "MODULE 02",
    title: "Additive Manufacturing",
    shortDesc: "Rapid prototyping, functional testing & batch print management.",
    deliverables: [
      "Functional FDM prototypes in PETG/ABS/Nylon",
      "Print orientation & clearance optimization",
      "SLA/SLS batch production sourcing and management"
    ],
    tools: ["Bambu Studio", "PrusaSlicer", "FDM/SLA"],
    projectTag: "module-02"
  },
  {
    id: "module-03",
    number: "MODULE 03",
    title: "Harnessing & Power",
    shortDesc: "Low-voltage looms, custom pinouts & power distribution.",
    deliverables: [
      "Custom wiring looms with ratcheted crimp terminations",
      "Power management & keep-alive logic circuits",
      "Pinout documentation and bench test reports"
    ],
    tools: ["Crimping Tooling", "Multimeter/Scope", "Power Supplies"],
    projectTag: "module-03"
  },
  {
    id: "module-04",
    number: "MODULE 04",
    title: "MCU Firmware (C++)",
    shortDesc: "Non-blocking logic, peripheral drivers & embedded state machines.",
    deliverables: [
      "Clean, modular C++ firmware for ESP32 / Arduino",
      "Non-blocking state machine architecture",
      "Sensor/actuator driver integration (I2C, SPI, UART)"
    ],
    tools: ["VS Code / PlatformIO", "Arduino C++", "ESP32"],
    projectTag: "module-04"
  },
  {
    id: "module-05",
    number: "MODULE 05",
    title: "Desktop Tooling & GUIs",
    shortDesc: "Custom PySide6 control panels & diagnostic utilities.",
    deliverables: [
      "Cross-platform desktop GUIs (Python / PySide6)",
      "Serial/USB communication interfaces for hardware debugging",
      "Standalone executable builds for field deployment"
    ],
    tools: ["Python 3", "PySide6 / Qt", "PyInstaller"],
    projectTag: "module-05"
  }
];

// Explicit exports for global access across scripts
window.SERVICES_DATA = SERVICES_DATA;
window.servicesData = SERVICES_DATA;