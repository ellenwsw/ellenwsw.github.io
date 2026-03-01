---
title: "GEM521 Lab3 Developing a suite of lidar products for Alex Fraser Research Forest "
author: "Ellen Wu"
date: "2026-03-01"
output: 
  md_document:
    variant: gfm
    preserve_yaml: true
---

# Lab Objectives

Apply the skills you acquired in labs 1 and 2 to produce a suite of
lidar products for Alex Fraser Research Forest

# Deliverables

- A PDF containing:

  - Details of the models used to predict forest attributes

  - Initial variables selected, final model equations and R2

  - Scatter plots of predicted vs measured values for each model

  - 4 image files: DEM, CHM, total above ground biomass and dominant
    tree height

- The R script created to complete this lab

# Data Description

We will work with 24 `.las` tiles for the Alex Fraser Research Forest
(AFRF). These data were collected in 2008 with a discrete return sensor.
The point density is approximately 3 returns / m2. Fixed-radius plot
data were collected between 1997-2010 across our study area, with an
approximate radius of 10 m for each plot. Individual tree measurements
were made, allowing for the calculation of total above ground biomass
(AGB), dominant tree height, and other attributes of interest.

The table `Data/Plots/Plot_Table.csv` contains plot ids, plot locations
(X and Y), and estimates of our two attributes: total AGB (kg/ha) and
dominant tree height (m).

# Lab steps

In this lab, you are tasked with developing a suite of products from
this discrete-return lidar data set. You can complete this lab however
you want. Take advantage of the R scripts we used in labs 1 and 2 for
developing statistical models. If you get stuck, refer back to the steps
we took in those labs.

Similar to labs 1 and 2, we suggest that you keep an organized folder
system (DEM, CHM, etc) as you work through the lab. The tallest trees at
Alex Fraser Research Forest are approximately 50 m. Remove points below
0 m and points more than 55 m above the surface.

## Produce a DEM and CHM

1.  Develop a DEM with 2 m spatial resolution.

### Processing Steps for DEM

``` r
# 1. Load the packages needed for the lab
library(lidR)
library(terra)
```

    ## Warning: package 'terra' was built under R version 4.5.1

    ## terra 1.8.75

    ## 
    ## Attaching package: 'terra'

    ## The following object is masked from 'package:lidR':
    ## 
    ##     watershed

``` r
library(tidyverse)
```

    ## Warning: package 'tidyverse' was built under R version 4.5.1

    ## Warning: package 'ggplot2' was built under R version 4.5.2

    ## Warning: package 'tibble' was built under R version 4.5.1

    ## Warning: package 'tidyr' was built under R version 4.5.1

    ## Warning: package 'readr' was built under R version 4.5.1

    ## Warning: package 'purrr' was built under R version 4.5.1

    ## Warning: package 'dplyr' was built under R version 4.5.1

    ## Warning: package 'forcats' was built under R version 4.5.1

    ## Warning: package 'lubridate' was built under R version 4.5.1

    ## ── Attaching core tidyverse packages ──────────────────────── tidyverse 2.0.0 ──
    ## ✔ dplyr     1.1.4     ✔ readr     2.1.5
    ## ✔ forcats   1.0.0     ✔ stringr   1.5.2
    ## ✔ ggplot2   4.0.1     ✔ tibble    3.3.0
    ## ✔ lubridate 1.9.4     ✔ tidyr     1.3.1
    ## ✔ purrr     1.1.0

    ## ── Conflicts ────────────────────────────────────────── tidyverse_conflicts() ──
    ## ✖ tidyr::extract() masks terra::extract()
    ## ✖ dplyr::filter()  masks stats::filter()
    ## ✖ dplyr::lag()     masks stats::lag()
    ## ℹ Use the conflicted package (<http://conflicted.r-lib.org/>) to force all conflicts to become errors

``` r
# 2. Create LAScatalog object from las tiles
cat_afrf <- readLAScatalog("data/LAS")
las_check(cat_afrf)
plot(cat_afrf)
```

![](GEM521_Lab3_EllenWu_files/figure-gfm/unnamed-chunk-1-1.png)<!-- -->

``` r
# 3. Examine a single tile to see if there's any significant issue
tile_1_afrf <- readLAS("data/LAS/AFRF_Tile1.las")
```

    ## Warning: There are 162690 points flagged 'withheld'.

    ## Warning: There are 162690 points flagged 'synthetic'.

``` r
las_check(tile_1_afrf)
```

``` r
# 4. Filter out the duplicate points
opt_output_files(cat_afrf) <- paste("data", "/Filtered/filtered_afrf_{ID}", sep = "")
cat_afrf <- filter_duplicates(cat_afrf)
```

![](GEM521_Lab3_EllenWu_files/figure-gfm/unnamed-chunk-3-1.png)<!-- -->

    ## Warning: package 'future' was built under R version 4.5.1

    ## Warning: There are 172519 points flagged 'withheld'.

    ## Warning: There are 172519 points flagged 'synthetic'.

    ## Warning: There are 70697 points flagged 'withheld'.

    ## Warning: There are 70697 points flagged 'synthetic'.

    ## Warning: There are 111844 points flagged 'withheld'.

    ## Warning: There are 111844 points flagged 'synthetic'.

    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.

    ## An error occurred when processing the chunk 17. Try to load this chunk with:
    ##  chunk <- readRDS("C:\Users\ellenwsw.stu\AppData\Local\Temp\RtmpQxAfrK/chunk17.rds")
    ##  las <- readLAS(chunk)

    ## A future (<unnamed-17>) of class SequentialFuture was interrupted at 2026-03-01T10:40:13, while running on 'FRST-PM218' (pid 8524)

``` r
# 5. Check if duplicates were removed for Tile 1
filtered_t1_afrf <- readLAS("data/Filtered/filtered_afrf_1.las")
```

    ## Warning: There are 162690 points flagged 'withheld'.

    ## Warning: There are 162690 points flagged 'synthetic'.

``` r
las_check(filtered_t1_afrf)
```

**Screenshot 1:** Turn in a DEM mosaic of the entire study area.

``` r
# 5. Read the filtered .las tiles
filtered_cat_afrf <- readLAScatalog("data/Filtered")

# 6. Create the DEM with 2 m spatial resolution
dem_allLAS_afrf <- rasterize_terrain(filtered_cat_afrf, 2, tin())
```

![](GEM521_Lab3_EllenWu_files/figure-gfm/unnamed-chunk-4-1.png)<!-- -->

    ## Warning: There are 67811 points flagged 'withheld'.

    ## Warning: There are 67811 points flagged 'synthetic'.

    ## Warning: Interpolation of 55 points failed because they are too far from ground
    ## points. Nearest neighbour was used but interpolation is weak for those points

    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.

    ## Warning: There are 34353 points flagged 'withheld'.

    ## Warning: There are 34353 points flagged 'synthetic'.

    ## Warning: There are 22779 points flagged 'withheld'.

    ## Warning: There are 22779 points flagged 'synthetic'.

    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.

    ## Warning: There are 38890 points flagged 'withheld'.

    ## Warning: There are 38890 points flagged 'synthetic'.

    ## Warning: There are 0 points flagged 'synthetic'.

    ## Warning: Interpolation of 70 points failed because they are too far from ground
    ## points. Nearest neighbour was used but interpolation is weak for those points

    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.

    ## Warning: Interpolation of 62 points failed because they are too far from ground
    ## points. Nearest neighbour was used but interpolation is weak for those points

    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.

``` r
## Create color palette
col_1 <- height.colors(50) 

## Plot DEM using color palette
plot(dem_allLAS_afrf, col = col_1)
```

![](GEM521_Lab3_EllenWu_files/figure-gfm/unnamed-chunk-4-2.png)<!-- -->

2.  Develop a CHM with 2 m spatial resolution.

### Processing Steps for CHM

``` r
# 1. Create the normalized .las tiles
## Define LAScatalog engine options
opt_output_files(filtered_cat_afrf) <- paste("data", "/Normalized/norm_afrf_{ID}", sep = "")

## Normalize all tiles in filtered_cat_afrf with the DEM 
norm_tiles_afrf <- normalize_height(filtered_cat_afrf, dem_allLAS_afrf)
```

![](GEM521_Lab3_EllenWu_files/figure-gfm/unnamed-chunk-5-1.png)<!-- -->

    ## Warning: There are 172519 points flagged 'withheld'.

    ## Warning: There are 172519 points flagged 'synthetic'.

    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.

    ## Warning: There are 219823 points flagged 'withheld'.

    ## Warning: There are 219823 points flagged 'synthetic'.

    ## Warning: There are 70697 points flagged 'withheld'.

    ## Warning: There are 70697 points flagged 'synthetic'.

    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.

    ## Warning: 14 points do not belong in the raster. Nearest neighbor was used to
    ## assign a value.

    ## Warning: There are 111844 points flagged 'withheld'.

    ## Warning: There are 111844 points flagged 'synthetic'.

    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.

``` r
# 2. las_check one of the normalized tile
## Read one of the tiles
norm_tile_1 <- readLAS("data/Normalized/norm_afrf_1.las")
```

    ## Warning: There are 162690 points flagged 'withheld'.

    ## Warning: There are 162690 points flagged 'synthetic'.

``` r
## las_check norm_tile_1
las_check(norm_tile_1)
```

``` r
# 3. Read the norm_cat_afrf into the LAScatalog
norm_cat_afrf <- readLAScatalog("data/Normalized")

# 4. Remove points below 0 m and points more than 55 m above the surface
opt_filter(norm_cat_afrf) <- '-drop_z_below 0 -drop_z_above 55'

# 5. Create CHM
chm_afrf <- rasterize_canopy(norm_cat_afrf, 2, p2r())
```

![](GEM521_Lab3_EllenWu_files/figure-gfm/unnamed-chunk-7-1.png)<!-- -->

    ## Warning: There are 129177 points flagged 'withheld'.

    ## Warning: There are 129177 points flagged 'synthetic'.

    ## Warning: There are 0 points flagged 'synthetic'.

    ## Warning: There are 189691 points flagged 'withheld'.

    ## Warning: There are 189691 points flagged 'synthetic'.

    ## Warning: There are 53654 points flagged 'withheld'.

    ## Warning: There are 53654 points flagged 'synthetic'.

    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.

    ## Warning: There are 90348 points flagged 'withheld'.

    ## Warning: There are 90348 points flagged 'synthetic'.

    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.

**Screenshot 2:** Turn in a CHM mosaic of the entire study area.

``` r
# 6. Plot the CHM mosaic
plot(chm_afrf, col = col_1)
```

![](GEM521_Lab3_EllenWu_files/figure-gfm/unnamed-chunk-8-1.png)<!-- -->

------------------------------------------------------------------------

## Estimate forest attributes and predict wall-to-wall

3.  Extract point clouds for plot locations listed in
    `Data/Plots/Plot_Table.csv` and calculate metrics for each plot.

``` r
# 1. Set up for the plots
## Read the plot table from csv
plot_table <- read.csv("data/Plots/Plot_Table.csv")

## Define plot radius
radius <- 30

## For loop to extract multiple plots and write them into a folder
for(i in 1:nrow(plot_table)){ # run the loop until i = the number of rows
  plot_cent <- c(plot_table$X[i], plot_table$Y[i]) # extract plot center in X and Y
  plot_las <- clip_circle(norm_cat_afrf, plot_cent[1], plot_cent[2], radius) 
  # clip plot from norm_cat_las
  output_file <- paste("data/Plots/afrf_Plot_", i, ".las", sep = "") # output directory 
  writeLAS(assign(paste("afrf_Plot_", i, sep = ""), plot_las), output_file)
  # write'afrf_Plot_i' to output dir.
}
```

![](GEM521_Lab3_EllenWu_files/figure-gfm/unnamed-chunk-9-1.png)<!-- -->![](GEM521_Lab3_EllenWu_files/figure-gfm/unnamed-chunk-9-2.png)<!-- -->

``` r
# 2. Calculate metrics for each plot
## Create empty dataframe
afrf_plot_metrics <- data.frame() 

## For loop to calculate cloud metrics for all plots and add them to the df
for(i in 1:nrow(plot_table)){ 
  # Keep the column names and remove the understory points that are under 2m
  plot <- readLAS(paste("data/Plots/afrf_Plot_", i, ".las", sep= ""), filter = "-keep_first -drop_z_below 2")
  metrics <- cloud_metrics(plot, .stdmetrics) # Compute standard metrics
  afrf_plot_metrics <- rbind(afrf_plot_metrics, metrics)
}
```

    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.

``` r
## Export afrf_plot_metrics as .csv in Plots folder
write_csv(afrf_plot_metrics, "data/Plots/afrf_Plot_Metrics.csv")
```

4.  Develop statistical models between lidar metrics and the two forest
    attributes: Total AGB and dominant tree height. Use forward variable
    selection to accomplish this. Remember not to include variables that
    are too highly correlated!

**Model Turn-in**: For both Total AGB and dominant tree height models,
list the following:

- The initial variables you selected to develop the model
- The final equation of the model
- The corresponding R2 value

To create the statistical model, we need to join the `Plot_Table` with
the `afrf_Plot_Metrics` into `data_table`.

``` r
# Add column to "afrf_plot_metrics" called Plot_ID (join key)
afrf_plot_metrics$Plot_ID = 1:38

# Join 'Plot_Table' and 'MKRF_Plot_Metrics' into 'data_table'
data_table <- plot_table %>%
  full_join(afrf_plot_metrics)
```

    ## Joining with `by = join_by(Plot_ID)`

### Total_AGB Model

Total AGB is a measure of volume, that is height x density. So metrics
measuring both height and structural complexity need to be included.

- The initial variables selected for the `model_AGB` include: `zq90` +
  `pzabove2` + `zentropy` + `zskew`.

``` r
# Model for the total AGB
# Selected variables: zq90 + pzabove2 + zentropy + zskew

# Start with no variables in our model
model_AGB = lm(Total_AGB ~ 1, data = data_table)

# Add each selected variables to the model one by one, to see which variable is the most significant predictor of AGB
add1(model_AGB, ~ zq90 + pzabove2 + zentropy + zskew, test = 'F')
```

`zq90` is selected in the first round of comparison given its low
Pr(\>F) and its higher F value than that of `zskew`.

``` r
# Add zmean into the model_AGB
model_AGB = lm(Total_AGB ~ zq90, data = data_table)

# Add other selected variables and run the F-test
add1(model_AGB, ~ zq90 + pzabove2 + zentropy + zskew, test = 'F')
```

`zentropy` is selected to be added into the model with a Pr(\>F) less
than 0.05 and the lowest AIC value among all other variables. No
additional variables were significant.

``` r
# The AGB model
model_AGB = lm(Total_AGB ~ zq90 + zentropy, data = data_table)

# Get the summary of the final model
summary(model_AGB)
```

- The final equation of the model_AGB is:

``` math
Total\_AGB = 609,811 + (16,293 \times zq90) - (975,484 \times zentropy)
```

- The R2 value for the model is **0.4697**.

### Dominant Height Model

For predicting the dominant height, `zq95` is chosen instead of `zmax`
to avoid the outliers.

- The initial variables selected for the `model_DH` include: `zq95` +
  `zsd` + `zmean`.

``` r
# Model for the dominant height
# Selected variables: zq95 + zsd + zmean

# Start with no variables in our model
model_DH = lm(Dominant_Height ~ 1, data = data_table)

# Add each selected variables to the model one by one, to see which variable is the most significant predictor of AGB
add1(model_DH, ~ zq95 + zsd + zmean, test = 'F')
```

Given that all three variables are significant, the one with the lowest
AIC and the highest F-value is chosen. Therefore, only `zq95` is chosen
for the dominant height model.

``` r
# The Dominant Height model
model_DH = lm(Dominant_Height ~ zq95, data = data_table)

# Get the summary of the final model
summary(model_DH)
```

- The final equation of the model_DH is:

``` math
Dominant\_Height = 3.55544 + (0.91019 \times zq95)
```

- The R2 value for the model is **0.7027**.

------------------------------------------------------------------------

**Screenshots 3 - 4:** Turn in images of total above ground biomass and
dominant tree height. The `app` function won’t work if your model
requires multiple SpatRasters… you’ll need to explore variations of
this.

``` r
# Create function for AGB calculation
# x = zq90, y = zentropy
AGB <- function(x, y){
  609811 + 16293*x - 975484*y
}

# Create function from Dominant height calculation, x = zq95
DH <- function(x){
  3.55544 + 0.91019*x
}

# Calculate grid metrics of mean Z at 10 m resolution for entire study area
pixel_metrics_afrf <- pixel_metrics(norm_cat_afrf, .stdmetrics_z, 10)
```

![](GEM521_Lab3_EllenWu_files/figure-gfm/unnamed-chunk-17-1.png)<!-- -->

    ## Warning: There are 128899 points flagged 'withheld'.

    ## Warning: There are 128899 points flagged 'synthetic'.

    ## Warning: There are 0 points flagged 'synthetic'.

    ## Warning: There are 189312 points flagged 'withheld'.

    ## Warning: There are 189312 points flagged 'synthetic'.

    ## Warning: There are 53466 points flagged 'withheld'.

    ## Warning: There are 53466 points flagged 'synthetic'.

    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.

    ## Warning: There are 90288 points flagged 'withheld'.

    ## Warning: There are 90288 points flagged 'synthetic'.

    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.
    ## Warning: There are 0 points flagged 'synthetic'.

``` r
plot(pixel_metrics_afrf)
```

![](GEM521_Lab3_EllenWu_files/figure-gfm/unnamed-chunk-17-2.png)<!-- -->

``` r
# Subset "zq95" from grid_metrics_afrf RasterBrick
zq95_afrf <- terra::subset(pixel_metrics_afrf, "zq95")

# Subset "zq90" from grid_metrics_afrf RasterBrick
zq90_afrf <- terra::subset(pixel_metrics_afrf, "zq90")

# Subset "zentropy" from grid_metrics_afrf RasterBrick
zentropy_afrf <- terra::subset(pixel_metrics_afrf, "zentropy")

# Apply model_AGB to raster
## Specify the names of the variables
prediction_stack <- c(zq90_afrf, zentropy_afrf)
names(prediction_stack) <- c("zq90", "zentropy")
## Apply the function
total_AGB <- terra::predict(prediction_stack, model_AGB)
## Plot the raster
plot(total_AGB, main = "Predicted Total AGB (kg/ha)")
```

![](GEM521_Lab3_EllenWu_files/figure-gfm/unnamed-chunk-17-3.png)<!-- -->

``` r
# Apply model_DH to raster
dominant_height <- terra::app(zq95_afrf, DH)
## Plot the raster
plot(dominant_height, main = "Predicted Dominant Height (m)")
```

![](GEM521_Lab3_EllenWu_files/figure-gfm/unnamed-chunk-17-4.png)<!-- -->

**Scatter plots 1 - 2:** Create scatterplots of predicted vs. measured
values for your two models.

``` r
# Plot predicted vs. measured values of the Total_AGB
plot(Total_AGB ~ model_AGB$fitted, data = data_table,xlab = 'Predicted', 
     ylab = 'Measured', main = 'Predicted vs. Measured Total AGB (kg/ha)')
abline(0,1)
```

![](GEM521_Lab3_EllenWu_files/figure-gfm/unnamed-chunk-18-1.png)<!-- -->

``` r
# Get the output coefficients to our model
model_AGB$coefficients
```

``` r
# Plot predicted vs. measured values of the Dominant_Height
plot(Dominant_Height ~ model_DH$fitted, data = data_table,xlab = 'Predicted', 
     ylab = 'Measured', main = 'Predicted vs. Measured Dominant_Height (in meter)')
abline(0,1)
```

![](GEM521_Lab3_EllenWu_files/figure-gfm/unnamed-chunk-19-1.png)<!-- -->

``` r
# Get the output coefficients to our model
model_DH$coefficients
```

------------------------------------------------------------------------

# Deliverables

A PDF containing:

- Details of the models used to predict forest attributes

- Initial variables selected, final model equations and R2

- Scatter plots of predicted vs measured values for each model

- 4 image files: DEM, CHM, total above ground biomass and dominant tree
  height

The R script created to complete this lab
