---
title: "ML for Stiffness Prediction"
kind: "ME 4853 · Machine Learning"
label: "Course"
order: 4
summary: "Benchmarked linear models, XGBoost, and a neural network for predicting material stiffness from microstructure. The tuned ANN hit a test RMSE of 2.32, versus ~8 for linear models."
tags: ["Python", "Neural networks", "XGBoost", "Materials"]
---
<!--
  ✏️  The "summary" above shows on the homepage and the list page.
  Everything below shows only on this entry's own page. Write as much as you want.
  Photos: make a folder next to this file with the same name (e.g. odin-dynamics/) and drop
  images in it. They appear as a gallery at the bottom of this page, resized automatically.
  The file name becomes the caption (01-radome-test.jpg → "radome test"; the number sets order).
  To place one inside the text instead, write:  ![caption](./folder-name/photo.jpg)
-->

Developed and compared machine learning models to predict material stiffness from microstructure features, using 9,000 observations described by the first 15 principal components of the microstructure data. Materials with nonlinear behavior are expensive to analyze traditionally, which is what makes a fast predictive model valuable.

## What I did

- **Models:** linear regression, ridge and lasso, an artificial neural network (ANN), and XGBoost.
- **Data pipeline:** validation and z-score standardization, then a full benchmark suite.
- **Tuning:** random search on the ANN and XGBoost to maximize generalization.
- **Evaluation:** compared RMSE across models; simple linear models badly underfit (RMSE ~8.00).

## Result

The tuned ANN performed best, with a test RMSE of 2.32 (train 1.91). It clearly beat the linear baseline and overfit less than XGBoost (test RMSE 2.65).
