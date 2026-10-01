---
title: "Nonlinear Elevator Model"
kind: "ME 3017 · System Dynamics"
label: "Course"
order: 5
summary: "Modeled an elevator as a nonlinear dynamic system in MATLAB/Simulink and designed PID and LQR controllers for smooth, accurate floor-level stops."
tags: ["MATLAB", "Simulink", "PID / LQR", "State space"]
---
<!--
  ✏️  The "summary" above shows on the homepage and the list page.
  Everything below shows only on this entry's own page. Write as much as you want.
  Photos: make a folder next to this file with the same name (e.g. odin-dynamics/) and drop
  images in it. They appear as a gallery at the bottom of this page, resized automatically.
  The file name becomes the caption (01-radome-test.jpg → "radome test"; the number sets order).
  To place one inside the text instead, write:  ![caption](./folder-name/photo.jpg)
-->

A three-person team project modeling an elevator as a nonlinear dynamic system, simulating motion, damping, and braking under varying loads. We derived models of the mechanical and electrical subsystems, explored nonlinear effects such as friction and electromagnetic damping, and built both time- and frequency-domain models.

## What I did

- Modeled the elevator as a second-order mass-spring-damper with nonlinear damping and counterweight tension.
- Derived and linearized state-space equations to study stability and transient response.
- Implemented PID and LQR control in MATLAB/Simulink to regulate acceleration and minimize overshoot.
- Simulated transient and steady-state performance under variable passenger loads and braking.
- Analyzed electromagnetic braking using sinusoidal PWM to approximate real drive behavior.

## Result

Stable, smooth motion with minimal steady-state error and accurate floor-level alignment, with improved damping response that held up under the nonlinear effects.
