---
title: "ML Health Monitoring for 3D Printers"
kind: "ME 4853 · Machine Learning"
label: "Course"
order: 3
summary: "Classified FDM printer faults (blockages, material run-out) from acoustic emission signals with a tuned Random Forest, handling heavy class imbalance."
tags: ["Python", "Random Forest", "PCA", "Manufacturing"]
---
<!--
  ✏️  The "summary" above shows on the homepage and the list page.
  Everything below shows only on this entry's own page. Write as much as you want.
  Add a photo: put it in public/images/ and write  ![caption](/images/your-photo.jpg)
-->

A classification system for real-time health monitoring of fused deposition modeling (FDM) printers. Acoustic emission (AE) signals recorded during printing were used to detect four conditions: nozzle semi-blockage, full obstruction, material run-out, and normal operation.

## What I did

- **Model:** designed and trained a Random Forest classifier on AE features, chosen for strong performance with minimal preprocessing.
- **Data:** standardized a high-dimensional AE feature set and addressed severe class imbalance, since normal operation far outnumbers faults.
- **Tuning:** used grid-search cross-validation to tune hyperparameters and limit overfitting.
- **Dimensionality:** compared the full feature set against PCA-reduced data, showing the full set is needed to capture subtle run-out and blockage signatures.

## Result

The tuned model reached 52% average test accuracy across the four classes, with particularly strong detection of material run-out. It showed AE signals are viable for printer health monitoring, while highlighting how hard subtle blockages are to classify.
