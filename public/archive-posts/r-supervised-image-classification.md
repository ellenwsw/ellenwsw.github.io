# Project Overview
This project applies supervised image classification on Landsat 9 surface reflectance imagery to map land-cover classes in Metro Vancouver. The workflow combined polygon-based training data, spectral feature extraction, and a Maximum Likelihood classifier in R.

## Objectives
- Build a reproducible supervised-classification workflow in R.
- Split delineated polygons into training and validation sets.
- Assess map accuracy using a confusion matrix and class-level metrics.

## Workflow Summary
1. Load and inspect the multi-band Landsat image.
2. Import and validate the land-cover training polygons.
3. Split polygons by class into training and validation.
4. Extract pixel values by polygon and train a Maximum Likelihood classifier.
5. Predict land-cover classes for the full scene.
6. Validate predictions and compute overall, producer, and user accuracy.

## Key Visual Outputs

### Delineated training polygons by land-cover class
![Training polygons over Landsat imagery](/archive-posts/images/supervised_classification_sampling.png)

### Training vs. validation polygon split
![Training and validation polygon sets](/archive-posts/images/training_validation_dis.png)

### Accuracy Summary
![Accuracy summary table](/archive-posts/images/accuracy_table.png)

### Classified land-cover map
![Supervised land-cover classification result](/archive-posts/images/classified_map.png)

## Reflection
- This project strengthened my practical understanding of how training-data quality drives classification performance.
- I gained hands-on experience with a complete remote-sensing workflow in R, from raster processing to validation metrics.
- The work highlighted the importance of class balance and robust validation when interpreting land-cover outputs.
