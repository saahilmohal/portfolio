---
company: "Odin Dynamics"
role: "Electro-Mechanical Integration Intern"
location: "Los Angeles, CA"
start: 2026-06
end: 2026-08
summary: "Led design of a Ku-band satcom subsystem for an unmanned underwater vehicle, built a 2,500 N thruster dynamometer, and designed the vehicle's HV power distribution and RF front end."
tags: ["RF modeling", "Structures", "HV power", "Test rigs"]
---
<!--
  ✏️  The "summary" above shows on the homepage and the list page.
  Everything below shows only on this entry's own page. Write as much as you want.
  Add a photo: put it in public/images/ and write  ![caption](/images/your-photo.jpg)
-->

## Satcom subsystem for a UUV

Led end-to-end design of a deployable Ku-band satellite-communications subsystem for an unmanned underwater vehicle, owning requirements and MIL-STD selection.

- Authored Python RF models optimizing a fused-quartz radome composite layup to under 0.3 dB insertion loss across ±55° scan.
- Re-architected a flat window that was failing at 300 m depth (10–30× allowable stress) into a streamlined curved membrane-compression geometry with a factor of safety above 8.

## Thruster dynamometer

Designed, procured, and assembled an underwater thruster dynamometer rated to 2,500 N / 160 N·m, through a passed Critical Design Review.

- Authored a 10-failure-mode structural package (FoS ≥ 6).
- Built a Python beam-element model from CAD for components that couldn't be meshed.
- Cut deflection 85% with diagonal bracing, and mitigated galvanic corrosion at aluminum–stainless interfaces.

## Starlink qualification for submerged maritime use

Led the field campaign qualifying Starlink for submerged maritime use.

- Built a Python gRPC harness logging 44 telemetry channels at 1 Hz.
- Devised mass-based water-depth metrology (0.008 mm resolution), showing that sub-millimeter water films cause 82% packet loss.
- Pivoted the campaign to recovery-time testing across hydrophobic coatings and mount angles.

## HV power distribution

Architected a kW-scale floating-HV power distribution board converting a 108–151 V pack to an isolated 48 V bus with point-of-load rails (~16× lower distribution loss), EV-grade pre-charge and contactor protection with BMS-gated fail-safe sequencing, and per-rail eFuse telemetry to an NVIDIA Jetson over isolated CAN.

## RF front end

Designed and procured a four-link RF front end (5G 4×4 MIMO, precision GNSS, Iridium satcom, Wi-Fi) for the UUV's surface antenna, resolving a ~150 dB co-site dynamic-range conflict between GNSS receive and cellular transmit with a specified Iridium-reject cavity notch filter.
