---
company: "Odin Dynamics"
role: "Electro-Mechanical Integration Intern"
location: "Los Angeles, CA"
start: 2026-06
end: 2026-08
summary: "Conceived and led the deployable Starlink satcom module for an unmanned underwater vehicle, built a 2,500 N thruster test rig through CDR, and architected the vehicle's HV power board and surface antenna system."
tags: ["RF modeling", "Structures", "Siemens NX", "HV power", "Test & measurement", "Python"]
---

<!--
  ✏️  The "summary" above shows on the homepage and the list page.
  Everything below shows only on this entry's own page. Write as much as you want.
  Photos: make a folder next to this file with the same name (e.g. odin-dynamics/) and drop
  images in it. They appear as a gallery at the bottom of this page, resized automatically.
  The file name becomes the caption (01-radome-test.jpg → "radome test"; the number sets order).
  To place one inside the text instead, write:  ![caption](./folder-name/photo.jpg)
-->

At Odin I worked across five subsystems of an attritable, ultra-long-range unmanned underwater vehicle (UUV), each one spanning several disciplines at once.

## Deployable Starlink communications module

I conceived and led the design of a deployable Ku-band satellite-communications (Starlink) module that lets the submerged vehicle surface, lift an RF window above the waves, and close a Starlink link, while surviving 300 m of hydrostatic pressure. I owned system definition, requirements, MIL-STD and engineering-standards selection, and the vehicle-integration test plan.

- **RF window modeling.** Wrote first-principles Python solvers (a multilayer ABCD transmission-line model and a Debye seawater model) swept across the full Ku band and ±55° of scan. Used them to select a ¼″ fused-quartz window with under 0.3 dB insertion loss on boresight.
- **Finding the real link-killer.** The water model showed a 1–2 mm film on the aperture costs 14–19 dB, matching what we saw on the bench. That proved the problem was water management (elevation, a convex shedding surface, hydrophobic coating), not RF through glass.
- **Catching a structural failure early.** A flat sandwich window, the standard aircraft-radome construction, fails at 300 m: skin stresses run 10–30× the quartz allowable. I re-architected it into a curved window that carries pressure in membrane compression, with more than 8× margin, the same principle deep-sea viewports use. I then traded window curvature against usable antenna field of view with a geometric ray model.
- **Placement and hydrodynamics.** Built a fully parametric Siemens NX surface model of a faired external enclosure (about 20 driving expressions) and ran iterative CFD. The fairing still added about 20% drag over the bare hull, which pushed the architecture to an internally stowed, upward-actuating module.
- **Deployment mechanism.** Ran a trade study across roughly eight concepts (linkages, rotary, and linear actuators). Showed why a multi-actuator tilt platform binds from over-constraint, and down-selected a self-locking single lead-screw lift on guide rails.
- **Detailed design.** Defined the titanium pressure enclosure (dished floor with local seal-land thickening instead of a heavy constant-thickness tub), a window bonding and sealing stack that handles a 17× quartz-to-titanium thermal-expansion mismatch, waterproof cable connectorization, and quartz sourcing and qualification testing.

## Starlink water-coverage test campaign

I was the sole engineer on a field campaign to find out whether Starlink can work on maritime vehicles, where spray and standing water cover the antenna.

- Wrote a Python harness logging 44 telemetry channels at 1 Hz over gRPC, alongside ping and throughput, all time-aligned, with a live dashboard and an automated go/no-go preflight check.
- Found that single-stream throughput tests under-reported the link by 26× (2.4 vs. 62 Mbps) because of the satellite path's bandwidth-delay product, and moved to parallel load streams.
- Designed 3D-printed fixtures and a mass-based water-depth method (depth = mass ÷ density × area) with 0.008 mm resolution, after measuring that meniscus error from calipers was larger than the entire range I needed.
- **Result:** a sub-millimeter water film causes 82% packet loss, and 4 mm is a total outage. That turned an open question into a hard design requirement (water must shed immediately), and pivoted the program to recovery-time testing across hydrophobic coatings and mount angles.
- Traced mid-test reboots to a power-delivery fault under peak load, separate from a firmware-update reboot, by showing that a full local-telemetry blackout couldn't be caused by RF loss.

## Thruster dynamometer

I designed, procured, and assembled an underwater thrust and torque test stand rated to 2,500 N and 160 N·m, and took it through a passed Critical Design Review.

- Wrote a 10-failure-mode structural package (bending, overturning, torsion, buckling, carriage pull-off) with every member at a factor of safety of 6 or more.
- When solid FEA couldn't mesh the T-slot extrusions, I built a beam-element model directly from the CAD in Python, and then cut thrust-induced sway 85% (6.1 to 0.9 mm) with diagonal bracing.
- Solved the constraints unique to submerged testing: linear rails and high-load carriages instead of corrosion-prone flexures, a submerged load cell, and galvanic protection at aluminum–stainless joints.
- Built a measurement-uncertainty budget (±2.2% uncalibrated to ±0.3% after in-situ calibration) and a calibration test plan, and owned the parametric BOM, procurement, and manufacturing drawings.

## High-voltage power distribution board

I architected the kW-scale power distribution board from a blank sheet, coming from a background of one 20 V hobby PCB.

- Two-stage, floating-HV topology converting a 108–151 V battery pack to an isolated, regulated 48 V bus, with direct point-of-load conversion to 24, 12, 5, and 3.3 V. Distributing at 48 V instead of 12 V cuts distribution losses about 16×, which matters on a vehicle whose main advantage is range.
- A dedicated isolated rail for the NVIDIA Jetson flight computer, so it can switch every other rail without cutting its own power.
- EV-grade protection: a manual service disconnect with an integrated fuse, a pre-charge contactor loop that prevents inrush from welding contactors shut, and BMS-gated, fail-safe power-up sequencing.
- Per-rail eFuse voltage and current telemetry to the flight computer over isolated CAN.
- Down-selected isolated DC-DC converters across five vendor classes, weighing efficiency against lead time, packaging for a sealed vessel, and ruggedness.

## Surface antenna RF front end

I architected a four-link RF front end for the vehicle's surface antenna: 5G 4×4 MIMO cellular, multi-band precision GNSS, Iridium satcom, and Wi-Fi.

- Resolved a ~150 dB co-site problem (GNSS signals near −160 dBm next to cellular transmit at +26 dBm) by moving GNSS onto a dedicated survey-grade receiver.
- Specified a cavity notch filter (≥20 dB rejection), verified from S-parameters, to block the vehicle's own Iridium transmitter, which sits only 40 MHz above GPS L1.
- Specified a pressure-tolerant radome by embedding the antennas in solid syntactic foam, which removes implosion risk at depth.
- Caught a supply-chain compliance issue with the original cellular module and moved to an equivalent part on the same chipset with no loss in capability.
- Delivered full connectorization, a three-unit build BOM, and a boat-based MIMO and GNSS test plan.
