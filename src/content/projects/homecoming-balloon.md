---
title: "Automated Homecoming Balloon"
kind: "Cable-driven linear motion system"
label: "Delta Chi"
order: 2
summary: "Designed and built, in a 4-day sprint, a motorized cable system that flew a giant hot-air balloon across the fraternity house for Homecoming. Won Best Mechanical Pomp."
tags: ["Arduino", "3D printing", "Machine design"]
---
<!--
  ✏️  The "summary" above shows on the homepage and the list page.
  Everything below shows only on this entry's own page. Write as much as you want.
  Photos: make a folder next to this file with the same name (e.g. odin-dynamics/) and drop
  images in it. They appear as a gallery at the bottom of this page, resized automatically.
  The file name becomes the caption (01-radome-test.jpg → "radome test"; the number sets order).
  To place one inside the text instead, write:  ![caption](./folder-name/photo.jpg)
-->

Built for Georgia Tech Delta Chi's "Wizard of Oz" Homecoming display in a 4-day sprint (about 40 hours). The system animated a large chicken-wire hot air balloon so it traveled autonomously across the house façade, on a custom support structure that couldn't modify the building.

## Mechanical design

- Gravity-fed carriage: the balloon travels down an inclined line under gravity, then a motor retracts it.
- Applied deformable bodies and machine design principles to a cantilevered wooden support structure, with zero structural modification to the building.

## Rapid prototyping

- 3D printed custom mounts for the motor and Arduino.
- The first 3D-printed spool deformed under high torque. Redesigned it with a heat-set insert and set screw to spread the load on the shaft, which solved the problem.

## Mechatronics

- Selected a high-torque geared DC motor from hand calculations of weight and friction.
- Wrote C++ on an Arduino to manage timing loops, winding duration, and release cycles.

## Result

The balloon cycled reliably throughout the event, and the display won the **Best Mechanical Pomp** award.
