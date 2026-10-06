---
company: "Odin Dynamics"
role: "Electro-Mechanical Integration Intern"
location: "Los Angeles, CA"
start: 2026-06
end: 2026-08
summary: "Conceived and led the deployable Starlink satcom module for an unmanned underwater vehicle, built a 2,500 N thruster test rig through CDR, and architected the vehicle's HV power board and surface antenna system."
tags: ["RF modeling", "Structures", "Siemens NX", "HV power", "Test & measurement", "Python"]
logo: "/logos/odin-dynamics.png"
logoBackground: "transparent"
---

<!--
  ✏️  The "summary" above shows on the homepage and the list page.
  Everything below shows only on this entry's own page. Write as much as you want.
  Photos: make a folder next to this file with the same name (e.g. odin-dynamics/) and drop
  images in it. They appear as a gallery at the bottom of this page, resized automatically.
  The file name becomes the caption (01-radome-test.jpg → "radome test"; the number sets order).
  To place one inside the text instead, write:  ![caption](./folder-name/photo.jpg)
-->

I worked across five subsystems of an ultra-long-range unmanned underwater vehicle (UUV).

## Deployable Starlink module

Conceived and led the design of a module that lets the vehicle surface, lift a satellite antenna above the waves, and connect to Starlink, while surviving 300 m depth. I owned the requirements, standards selection, and integration test plan.

- **RF window:** wrote Python RF models to pick a ¼″ quartz window with under 0.3 dB of signal loss, and showed a 1–2 mm water film (14–19 dB) was the real threat, not the glass.
- **Structure:** caught that a standard flat radome would crack at depth (10–30× over the allowable stress) and redesigned it as a curved window in compression, with over 8× margin.
- **Packaging:** ran CFD on a parametric external fairing (about +20% drag), which drove the switch to an internally stowed module on a self-locking lead-screw lift, chosen from a trade study of ~8 mechanisms.
- **Now:** detailed design of the titanium pressure housing, window sealing, waterproof connectors, and quartz qualification.

## Starlink water testing

Sole engineer on a field campaign testing whether Starlink works when water covers the antenna.

- Built a Python logger for 44 telemetry channels, and caught a measurement flaw that under-reported throughput 26×.
- Designed 3D-printed fixtures and a weight-based method to set water depth to 0.008 mm.
- **Result:** under 1 mm of water causes 82% packet loss, and 4 mm is a total outage, which turned the requirement into "water must shed immediately."

## Thruster dynamometer

Designed, procured, and built a 2,500 N / 160 N·m underwater thrust test stand through a passed Critical Design Review.

- Structural analysis across 10 failure modes, with every member at a factor of safety of 6 or more.
- Built a beam FEA model straight from CAD in Python when standard FEA couldn't mesh the frame, then cut sway 85% with diagonal bracing.
- Linear rails instead of flexures, a submerged load cell, and corrosion protection between aluminum and stainless parts.

## High-voltage power board

Architected the kW-scale power distribution board from a blank sheet.

- Converts a 108–151 V battery pack to an isolated 48 V bus, then to 24/12/5/3.3 V, cutting distribution losses about 16× versus 12 V.
- EV-style safety: service disconnect, pre-charge circuit, and battery-controlled, fail-safe start-up.
- Per-rail voltage and current monitoring to the flight computer, which sits on its own isolated supply.

## Surface antenna system

Architected the RF front end for four links: 5G cellular, precision GPS, Iridium satellite, and Wi-Fi.

- Solved a ~150 dB interference problem between GPS and cellular with a dedicated GPS receiver, plus a notch filter against the vehicle's own Iridium transmitter.
- Specified a radome that survives depth by embedding the antennas in solid foam.
- Delivered connectors, a three-unit build BOM, and a boat-based test plan.
