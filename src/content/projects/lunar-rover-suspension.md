---
title: "Lunar Rover Suspension"
kind: "ME 2016 · Numerical Methods"
label: "Course"
order: 7
summary: "Simulated a lunar rover suspension with linear and nonlinear springs and dampers using RK4, then found safe operating frequencies with transmissibility analysis."
tags: ["MATLAB", "RK4", "Vibrations"]
---
<!--
  ✏️  The "summary" above shows on the homepage and the list page.
  Everything below shows only on this entry's own page. Write as much as you want.
  Photos: make a folder next to this file with the same name (e.g. odin-dynamics/) and drop
  images in it. They appear as a gallery at the bottom of this page, resized automatically.
  The file name becomes the caption (01-radome-test.jpg → "radome test"; the number sets order).
  To place one inside the text instead, write:  ![caption](./folder-name/photo.jpg)
-->

Simulated and analyzed a lunar rover suspension as a mass-spring-damper system with linear and nonlinear components, solving coupled second-order differential equations for displacement, velocity, and force over time with the 4th-order Runge-Kutta method.

## What I did

- **Modeling:** wrote function handles for linear and nonlinear spring and damper models and built them into a full simulation.
- **Convergence:** designed a dynamic timestep adjustment to hold accuracy while saving computation, with error metrics to confirm tolerance.
- **Frequency response:** computed displacement and force transmissibility versus frequency to find safe operating ranges, using golden-section search to locate the damped natural frequency.
- **Reporting:** produced clear plots of displacement and force amplitude versus frequency.

## Result

Identified the frequency ranges where the suspension operates safely in the lunar environment.
