---
title: "Smart Cat Feeder"
kind: "Automated pet feeding system"
label: "Personal"
order: 1
date: 2025-08
summary: "An internet-connected outdoor feeder with a custom KiCad power board, a screw-drive dispenser, and a Raspberry Pi web interface with live camera feeds."
tags: ["KiCad", "Power electronics", "Raspberry Pi", "CAD"]
---
<!--
  ✏️  The "summary" above shows on the homepage and the list page.
  Everything below shows only on this entry's own page. Write as much as you want.
  Add a photo: put it in public/images/ and write  ![caption](/images/your-photo.jpg)
-->

An autonomous, internet-connected outdoor pet feeding system that combines mechanical design, custom power electronics, and software for remote dispensing and visual monitoring through a web interface.

**Status:** PCB fabricated and tested; enclosure and software integration in progress.

## PCB design and power electronics (KiCad)

- Designed a custom hat PCB for a Raspberry Pi Zero 2W that drives high-current motors and pumps.
- Power distribution: 20 V input (a repurposed laptop supply) with dual buck converters regulating to 12 V for the DC motor and 5 V for the water pump and Pi.
- Protection: flyback diodes for inductive kickback, and logic-level MOSFETs so the Pi's 3.3 V signals can switch the loads.
- Managed the full lifecycle: component selection, footprint association, layout, and fabrication.

## Mechanical design and CAD

- Weather-resistant enclosure with a custom screw-drive mechanism for precise food dispensing.
- Custom mounting interface securing the PCB to the Pi, accounting for component overhang.

## Software and telemetry (in progress)

- Local web server on the Pi streaming two camera feeds: the food bowl and a courtyard view.
- Manual override controls for the water pump and food dispenser over Wi-Fi.
