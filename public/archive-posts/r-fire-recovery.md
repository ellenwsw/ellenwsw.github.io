---
title: "Analysis of fire burn severity and post-fire vegetation recovery with Landsat time-series"
subtitle: "GEM520 Lab 8 - Final Demonstration of R skills"
author: "Ellen Wu"
date: "01 March 2026"
output: 
  md_document:
    variant: gfm
    preserve_yaml: true
---

# Introduction

Summer 2017 was considered as one the worst wild fire season in BC
(until 2023), with over 1.2 million ha of burned areas, 65,000 people
displaced and \$649 million spent on fire suppression
(<https://www2.gov.bc.ca/gov/content/safety/wildfire-status/about-bcws/wildfire-history/wildfire-season-summary>).

The Prouton Lakes fire (fire ID C30870) burned part of the Alex Fraser
Research Forest (AFRF) located near Williams Lake, BC, on the
traditional, ancestral and unceded territory of the T’exelcemc, Xatsu’ll
and Esket First Nations. The burn severity varied from low-severity
ground fire to high-severity canopy fire.

### Lab objective

The objective of this lab is to quantify the burn severity of the
Prouton Lakes fire and examine the recovery and re-establishment of
vegetation in the years following the fire. You will use a Landsat 8 OLI
time-series of images acquired between the 1<sup>st</sup> of July and
the 31<sup>st</sup> of August between 2013 and 2021.

### Description of data

#### Landsat time-series

Landsat 8 Collection 2 Level-2 surface reflectance (SR) products are
generated using the Land Surface Reflectance Code (LaSRC) algorithm that
corrects for atmospheric effects at the time of the image acquisition.
Unlike Level-1 products that represent top-of-atmosphere reflectance,
Level-2 SR products therefore represent the fraction of incoming
sunlight reflected by the Earth’s surface (bottom-of-atmosphere) and can
be combined and compared across time and space. Land surface temperature
(ST) products are also generated in Landsat 8 Level-2 products. The
surface reflectance and surface temperature products are accompanied by
pixel-level quality assessment (QA) layers that indicate the presence of
clouds, cloud shadows, snow/ice and water.

We focused on a single Landsat scene overlapping the study area (WRS
Path 048; WRS Row 023) and downloaded all the Level-2 products acquired
between the 1<sup>st</sup> of July and the 31<sup>st</sup> of August
between 2013 and 2021 from the [USGS Earth
Explorer](https://earthexplorer.usgs.gov/). This resulted in 35 products
of approximately 1 GB each. Each product is named as described below.

<img src="illustrations/L2_product_naming.PNG" width="95%" style="display: block; margin: auto;" />

Each product contains 19 TIF files (SR, ST and QA layers) and a Metadata
file.

<img src="illustrations/L2_product_bands.PNG" width="95%" style="display: block; margin: auto;" />

The surface reflectance measured in the spectral bands of the OLI sensor
are labeled as SR_B# where \# is the band number

| Band Number | Band Name | Wavelength (um) | Spatial resolution (m) |
|---:|:---|:---|---:|
| 1 | Band 1 - Coastal aerosol | 0.43-0.45 | 30 |
| 2 | Band 2 - Blue | 0.45-0.51 | 30 |
| 3 | Band 3 - Green | 0.53-0.59 | 30 |
| 4 | Band 4 - Red | 0.64-0.67 | 30 |
| 5 | Band 5 - Near Infrared (NIR) | 0.85-0.88 | 30 |
| 6 | Band 6 - SWIR 1 | 1.57-1.65 | 30 |
| 7 | Band 7 - SWIR 2 | 2.11-2.29 | 30 |

The `QA_PIXEL` layer indicates the presence of clouds, cirrus, snow/ice
and water as well as confidence levels in the presence of each. A
16-digit binary number is used to encode each condition.

<img src="illustrations/QA_values_description.PNG" width="663" style="display: block; margin: auto;" />

We show below how pixel values are determined for 4 conditions: clear,
water, high confidence cloud and high confidence cloud shadow.
Additional examples are provided in the Table 6-3 of the [Landsat 8
Collection 2 Level-2 Science Product
Guide](https://prd-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/atoms/files/LSDS-1619_Landsat-8-Collection2_Level-2_Science-Product-Guide-v3.pdf)

<img src="illustrations/QA_values_example.PNG" width="832" />

#### Historical fire perimeters

A polygon shapefile showing the perimeter of historical wildfires in BC
(all wildfires before current year) is available on the [BC Data
Catalogue](https://catalogue.data.gov.bc.ca/dataset/fire-perimeters-historical).
This layer is available in
`"data/PROT_HISTORICAL_FIRE_POLYS_SP/H_FIRE_PLY_polygon.shp"`. We
describe a few fields below:

- `FIRE_NO`: A unique ID assigned to each layer (e.g. C30870 for the
  Prouton Lakes fire)
- `FIRE_YEAR`: The year when the fire happened
- `FIRE_CAUSE`: The cause of the fire (either `Lightning`, `Person` or
  `Unknown`)
- `SIZE_HA`: The area of each fire, in hectares (ha)

### Instructions

#### Step 1 - Historical fires in BC

**Provide code AND written answers for the following questions**. Use
the `H_FIRE_PLY_polygon.shp` shapefile for this step.

- What was the number of fires and total land area burned (in hectares)
  in 2017?

- What is the ID and burned area (in hectares) of the three largest
  fires recorded in 2017?

- How much land area was burned by the Prouton Lakes fire (ID C30870) ?

**Include the following figure**

Use `ggplot2` to create a barplot (examples
[here](http://www.sthda.com/english/wiki/ggplot2-barplots-quick-start-guide-r-software-and-data-visualization))
showing the total area burned per year in BC. Each bar should be colored
by fire cause.

**Hints**

- Summarizing a `sf` objects is faster if the `geometry` information is
  *dropped*

#### Step 2 - Pre-processing Level-2 products and calculating vegetation indices

For each L2 product, put each surface reflectance band (Band 1 to Band
7) in the same raster object, **mask** pixels that do not have the value
`21824` (*clear conditions*) in the `QA_PIXEL` layers and **crop** (no
need to mask) the multi-layer raster to the Prouton Lakes fire extent.
You also need to calculate the normalized vegetation difference index
(NDVI) and the normalized burn ratio (NBR) for each cropped and masked
raster (see hints). For each product, save the multi-layer SR product,
NDVI and NBR layers in the `outputs` directory with the file name
`ProductID_SR.tif`, `ProductID_NDVI.tif` or `ProductID_NBR.tif`
(e.g. `LC08_L2SP_048023_20130701_20200912_02_T1_NBR.tif`)

**Include the following figure**

A true color composite image of the Prouton Lakes fire area before
(**July 7 2015**) and after the fire (**July 15 2018**)

**Hints**

- The functions `list.files(..., pattern = ..., full.names = TRUE)` and
  `list.dirs(..., full.names = TRUE, recursive = FALSE)` can be used to
  list all the files and directories in a path.

- The function `basename(x)` can be used to keep only a file or
  directory name without the preceding path

``` r
basename("path/to/dir/filename.tif")
```

    ## [1] "filename.tif"

``` r
basename("path/to/dir")
```

    ## [1] "dir"

- The function `tools::file_path_sans_ext()` can be used to remove the
  extension (e.g. `.TIF`) from a file name

``` r
tools::file_path_sans_ext("filename.tif")
```

    ## [1] "filename"

- The function `file.path()` can be used to construct a file path from
  characters.

``` r
file.path("path", "to", "directory", "filename.tif")
```

    ## [1] "path/to/directory/filename.tif"

``` r
file.path("path/to/directory", "filename.tif")
```

    ## [1] "path/to/directory/filename.tif"

- The function `paste0()` can be used to concatenate characters

``` r
paste0("filename", ".tif")
```

    ## [1] "filename.tif"

- The function `terra::mask()` has an argument named `inverse`

- The function
  `terra::writeRaster(x, filename = fname, overwrite = TRUE)` is used to
  write a `SpatRaster` to a file on disk named `fname` (containing both
  the path and the file name with extension). The argument
  `overwrite = TRUE` allows `writeRaster` to overwrite an existing file
  with the same name.

- 
  ``` math
  NDVI = \frac{NIR - RED}{NIR + RED}
  ```

- 
  ``` math
  NBR = \frac{NIR - SWIR2}{NIR + SWIR2}
  ```

#### Step 3 - Yearly composites of NDVI and NBR

For each year in the NDVI and NBR time-series, create yearly composites
by calculating the average value of each pixel from all the layers
acquired in July and August. Make sure that `NA` values are not included
in the average.

Then, calculate the average NDVI of all the pixels overlaid by the
Prouton Lakes fire, for each year in the time series.

**Include the following figure**

Use `ggplot2` to create a connected scatterplot (points joined by lines)
showing the average NDVI across the Prouton Lakes fire area through
time.

**Hint**

`geom_line()` requires the `group` aesthetic to be set :
`aes(x = ..., y = ..., group = ...)`. If there is no variable to group
the lines by (i.e. a single group of data connected by lines), you can
use `group = 1` (`aes(x = ..., y = ..., group = 1)`)

#### Step 4 - Classify burn severity

The burn severity of a fire can be estimated with the delta NBR (dNBR),
which is the difference between pre-fire and post-fire NBR. Generally
speaking, the higher dNBR is, the more severe the fire burned the land.

``` math
dNBR = NBR_{prefire} - NBR_{postfire}
```
Field-based surveys are generally necessary to assess the burn severity
of a fire. *Supervised classification* can then be used to create maps
of burn severity. In our case, we will classify burn severity of the
Prouton Lakes fire using dNBR thresholds. The reclassification table is
described below:

| dNBR range   | Burn Severity   |
|:-------------|:----------------|
| -0.2 to 0.15 | unburned        |
| 0.15 to 0.25 | low severity    |
| 0.25 to 0.3  | medium severity |
| 0.3 to 1     | high severity   |

Considering `2015` as the pre-fire year and `2018` as the post-fire
year, create a raster of the Prouton Lakes fire burn severity. Make sure
that the value of each pixel is the burn severity class
(i.e. `"unburned"`, `"low severity"`, `"medium severity"`,
`"high severity"`) instead of an arbitrary number (see hint).

**Include the following figure**

A plot of the dNBR raster classified into burn severity classes,
overlaid with the boundary of the Prouton Lakes fire. The legend should
show the burn severity levels (i.e. `"unburned"`, `"low severity"`,
`"medium severity"`, `"high severity"`)

**Hints**

When a `SpatRaster` `x` has discrete values that represent classes
(e.g. binary values representing water or land), you can set the
`levels` of `x` as follows:

``` r
levels(x) <- data.frame(id = c(0, 1),
                        label = c("water", 
                                  "land"))
```

That way, values are transformed to a `factor`.

#### Step 5 - Post-fire vegetation recovery

Convert the burn severity raster to polygons (one polygon per burn
severity class) and extract the NDVI values in 2018, 2019, 2020 and 2021
for each burn severity class. **Do not summarize the pixel values
(e.g. mean). We want the value of every pixel in each burn severity
class because we want to examine the distribution of NDVI values per
burn severity class.**

**Hints**

- The function `terra::as.polygons` can be used to convert a
  `SpatRaster` to a polygon `SpatVector`. With the default argument
  `dissolve = TRUE`, the cells of the `SpatRaster` with the same values
  will be combined to a `SpatVector`

**Include the following figures**

- A plot showing the yearly NDVI composites in 2018, 2019, 2020
  and 2021. Make sure that the legends of the 4 plots display the same
  range of values between 0 and 0.5 (`plot(..., range = c(0, 0.5))`)

- Use `ggplot2` to create a boxplot (examples
  [here](http://www.sthda.com/english/wiki/ggplot2-box-plot-quick-start-guide-r-software-and-data-visualization#change-box-plot-colors-by-groups))
  showing the distribution of NDVI values per burn severity classes in
  2018, 2019, 2020 and 2021. You can either make facets for each year
  (`facet_wrap()`) or make one plot with different colors for each
  boxplot. Make sure that the burn severity classes on the x axis area
  ordered from unburned to high severity (**hint: make sure that burn
  severity is an ordered factor**)

### Attaching packages

You can attach the package that you are using in the following code
block

``` r
#Attach packages here
# Spatial Data
library(terra)
```

    ## Warning: package 'terra' was built under R version 4.5.1

``` r
library(sf)
```

    ## Warning: package 'sf' was built under R version 4.5.1

``` r
# Tidyverse
library(readr)
```

    ## Warning: package 'readr' was built under R version 4.5.1

``` r
library(stringr)
library(lubridate)
```

    ## Warning: package 'lubridate' was built under R version 4.5.1

``` r
library(dplyr)
```

    ## Warning: package 'dplyr' was built under R version 4.5.1

``` r
library(tidyr)
```

    ## Warning: package 'tidyr' was built under R version 4.5.1

``` r
library(ggplot2)
```

    ## Warning: package 'ggplot2' was built under R version 4.5.2

``` r
# BFAST
library(bfast)
```

    ## Warning: package 'bfast' was built under R version 4.5.2

    ## Warning: package 'strucchangeRcpp' was built under R version 4.5.2

    ## Warning: package 'zoo' was built under R version 4.5.1

    ## Warning: package 'sandwich' was built under R version 4.5.2

### Type your code and answers here

#### Step 1 - Historical fires in BC

##### Code answer

``` r
# Include code here

# Load the shp file 
hfires <- sf::st_read("data/PROT_HISTORICAL_FIRE_POLYS_SP/H_FIRE_PLY_polygon.shp")
```

    ## Reading layer `H_FIRE_PLY_polygon' from data source 
    ##   `C:\Users\ellenwsw.stu\OneDrive - UBC\_Backup\GEM520\Submitted_Lab8\data\PROT_HISTORICAL_FIRE_POLYS_SP\H_FIRE_PLY_polygon.shp' 
    ##   using driver `ESRI Shapefile'
    ## Simple feature collection with 22479 features and 16 fields
    ## Geometry type: MULTIPOLYGON
    ## Dimension:     XY
    ## Bounding box:  xmin: 408933.1 ymin: 370244.2 xmax: 1870587 ymax: 1709027
    ## Projected CRS: NAD83 / BC Albers

``` r
# Drop the geometry information for faster processing
hfires_nogeom <- sf::st_drop_geometry(hfires)

# Number of fires and total area bruned in hectares in 2017
fire_2017 <- hfires_nogeom %>%
  filter(FIRE_YEAR == 2017) %>%
  summarize(number_fires_2017 = n(),
            area_burned_ha = sum(SIZE_HA))
fire_2017 # Print the results
```

    ##   number_fires_2017 area_burned_ha
    ## 1               342        1222205

``` r
# The three largest fires recorded in 2017, ID and burned area for each
hfires_nogeom %>% 
  arrange(desc(SIZE_HA)) %>% 
  head(3) %>% 
  select(FIRE_NO, SIZE_HA)
```

    ##   FIRE_NO  SIZE_HA
    ## 1  C10784 520885.2
    ## 2  G00117 244026.5
    ## 3  C50647 239339.6

``` r
# Area burned by the Prouton Lakes fire (ID C30870)
hfires_nogeom %>% 
  filter(FIRE_NO == "C30870") %>% 
  select(SIZE_HA)
```

    ##   SIZE_HA
    ## 1   859.3

``` r
# Create a barplot showing the total area burned per year, colored by fire cause
area_by_year_cause <- hfires_nogeom %>% 
  group_by(FIRE_YEAR, FIRE_CAUSE) %>%
  summarize(
    # summarize the burned areas
    total_area_burned = sum(SIZE_HA, na.rm = TRUE))
```

    ## `summarise()` has grouped output by 'FIRE_YEAR'. You can override using the
    ## `.groups` argument.

``` r
area_burned_plot <- ggplot(area_by_year_cause, aes(x = FIRE_YEAR, 
                                                   y = total_area_burned, 
                                                   fill = FIRE_CAUSE)) +
  geom_col() +
  labs(
    title = "Total Area Burned Annually, Stacked by Fire Cause",
    x = "Fire Year",
    y = "Total Area Burned (HA)",
    fill = "Fire Cause"
  ) + theme_minimal() +
  theme(
    axis.text.x = element_text(angle = 45, hjust = 1),
    plot.title = element_text(hjust = 0.5, face = "bold")
  )

print(area_burned_plot)
```

![](GEM520_Lab8_EllenWu_files/figure-gfm/unnamed-chunk-13-1.png)<!-- -->

``` r
# Consulted Gemini for the better layout of the barplot
```

##### Written answer

- 342 fires happened in 2017, and they burned 1,222,205 hectares in
  total.

- The three largest fires recorded in 2017 are: C10784, burned 520,885.2
  hectares; G00117, burned 244,026.5 hectares; C50647, burned 239,339.6
  hectares.

- 859.3 hectares were burned by the Prouton Lakes fire (ID C30870).

#### Step 2 - Pre-processing Level-2 products and calculating vegetation indices

##### Code answer

``` r
# Include code here

# The path for all the L2 products
main_data <- "data/Landsat 8 OLI_TIRS C2 L2"
l2products <- list.files(main_data)

# Define the band names 
sr_bands <- c("SR_B1", "SR_B2", "SR_B3", "SR_B4", "SR_B5", "SR_B6", "SR_B7")

# Prouton Lakes fire extent
prouton_extent <- hfires %>% 
  filter(FIRE_NO == "C30870")

# Loop through all the folders, stack B1-B7, mask pixels and crop to extent
for (folder in l2products) {
  # Name of the current folder
  current_folder <- file.path(main_data, folder)
  
  # Find the band files in the current folder
  files_to_stack_paths <- c() # Hold all 7 bands for the current folder
  for (band_name in sr_bands) {
    pattern <- paste0(folder, "_", band_name, ".tif")
    files_to_stack_paths <- c(files_to_stack_paths, 
                              file.path(current_folder, pattern))
  }
  
  # Stack B1-B7
  scene_stack <- rast(files_to_stack_paths)
  # Assign clear names to the layers in the stack
  names(scene_stack) <- sr_bands

  # Load the QA_PIXEL file
  qa_filename <- paste0(folder, "_QA_PIXEL.tif")
  qa_path <- file.path(current_folder, qa_filename)
  qa_raster <- rast(qa_path)
  # Apply the mask
  scene_masked <- mask(scene_stack, qa_raster, maskvalues = 21824, inverse = TRUE)
  # Adjust the crs for the fire extent to WGS 84 / UTM zone 10N (EPSG:32610) 
  prouton_extent_proj <- sf::st_transform(prouton_extent, crs = 32610)
  # Crop to the Prouton Lakes fire extent
  scene_final <- crop(scene_masked, vect(prouton_extent_proj))
  
  # Export the SR bands into folder
  output_dir <- "output/LC08_L2SP_048023_SR"
  sr_name <- file.path(output_dir, paste0(folder, "_SR.tif"))
  terra::writeRaster(scene_final, sr_name, overwrite = TRUE)
  
  # Calculate NDVI and export the NDVI files into folder
  # NDVI = (SRB5-SRB4)/(SRB5+SRB4)
  ndvi <- (scene_final$SR_B5-scene_final$SR_B4)/
    (scene_final$SR_B5+scene_final$SR_B4)
  
  # Export the NDVI files into folder
  output_dir <- "output/LC08_L2SP_048023_NDVI"
  ndvi_name <- file.path(output_dir, paste0(folder, "_NDVI.tif"))
  terra::writeRaster(ndvi, ndvi_name, overwrite = TRUE)
  
  # Calculate NBR and export the NBR files into folder
  # NBR = (SRB5-SRB7)/(SRB5+SRB7)
  nbr <- (scene_final$SR_B5-scene_final$SR_B7)/
    (scene_final$SR_B5+scene_final$SR_B7)
  
  # Export the NBR files into folder
  output_dir <- "output/LC08_L2SP_048023_NBR"
  nbr_name <- file.path(output_dir, paste0(folder, "_NBR.tif"))
  terra::writeRaster(nbr, nbr_name, overwrite = TRUE)
}

# True color composite pre-fire (July 7 2015)
pre_fire <- rast(
  "output/LC08_L2SP_048023_SR/LC08_L2SP_048023_20150707_20200909_02_T1_SR.tif")
plotRGB(pre_fire, r=4, g=3, b=2, stretch="lin", 
        main="True Color Composite Pre-fire (July 7 2015)")
```

![](GEM520_Lab8_EllenWu_files/figure-gfm/unnamed-chunk-14-1.png)<!-- -->

``` r
# True color composite post-fire (July 15 2018)
post_fire <- rast(
  "output/LC08_L2SP_048023_SR/LC08_L2SP_048023_20180715_20200831_02_T1_SR.tif")
plotRGB(post_fire, r=4, g=3, b=2, stretch="lin", 
        main="True Color Composite Post-fire (July 15 2018)")
```

![](GEM520_Lab8_EllenWu_files/figure-gfm/unnamed-chunk-14-2.png)<!-- -->

#### Step 3 - Yearly composites of NDVI and NBR

##### Code answer

``` r
# Include code here

# Create a year list (2013-2021)
yr_list <- 2013:2021

# Path to the files
ndvi_path <- "output/LC08_L2SP_048023_NDVI"
nbr_path <- "output/LC08_L2SP_048023_NBR"
ndvi_all_files <- list.files(ndvi_path, full.names = TRUE)
nbr_all_files <- list.files(nbr_path, full.names = TRUE)

# Get just the base filename for year indexing
ndvi_basename <- list.files(ndvi_path)
nbr_basename <- list.files(nbr_path)

# Load all the files into a Spatraster and rename each layer
all_ndvi <- rast(ndvi_all_files)
all_nbr <- rast(nbr_all_files)
names(all_ndvi) <- paste0(substr(ndvi_basename, 18, 25))
names(all_nbr) <- paste0(substr(nbr_basename, 18, 25))

# Empty lists to store yearly composite
ndvi_composites_list <- list()
nbr_composites_list <- list()

# Loop through the all_ndvi and all_nbr
for (yr in yr_list) {
  yr_char <- as.character(yr)
  
  # Filter for the specific year
  ndvi_for_year <- subset(all_ndvi, which(substr(names(all_ndvi), 1, 4) == yr_char))
  nbr_for_year  <- subset(all_nbr, which(substr(names(all_nbr), 1, 4) == yr_char))
  
  # Calcualte the cell-wise values for the stack
  yearly_avg_ndvi <- app(ndvi_for_year, fun = mean, na.rm = TRUE)
  yearly_avg_nbr  <- app(nbr_for_year, fun = mean, na.rm = TRUE)
  
  # Rename the layers in the list
  names(yearly_avg_ndvi) <- paste0(yr_char, "_NDVI_Avg")
  names(yearly_avg_nbr)  <- paste0(yr_char, "_NBR_Avg")
  
  # Store in lists
  ndvi_composites_list[[yr_char]] <- yearly_avg_ndvi
  nbr_composites_list[[yr_char]]  <- yearly_avg_nbr
}

# Stack all the layers contained in the lists into multi-layers rasters
avg_ndvi_stack <- rast(ndvi_composites_list)
avg_nbr_stack  <- rast(nbr_composites_list)

# prouton_extent_proj is the Prouton Lakes fire vector after projecting
# Zonal statistics within the fire extent
ndvi_zonal_mean <- terra::extract(
  x = avg_ndvi_stack,
  y = prouton_extent_proj,
  fun = mean,
  na.rm = TRUE,  
  ID = FALSE)

# Convert the data frame to long format
ndvi_zonal_long <- ndvi_zonal_mean %>%
  pivot_longer(
    cols = everything(), 
    names_to = "Year",
    values_to = "Average_NDVI") %>%
  mutate(Year = as.numeric(Year))

# Show the data frame
ndvi_zonal_long
```

    ## # A tibble: 9 × 2
    ##    Year Average_NDVI
    ##   <dbl>        <dbl>
    ## 1  2013        0.277
    ## 2  2014        0.265
    ## 3  2015        0.274
    ## 4  2016      NaN    
    ## 5  2017        0.191
    ## 6  2018        0.183
    ## 7  2019        0.219
    ## 8  2020        0.269
    ## 9  2021        0.259

``` r
# Create a connected scatterplot (points joined by lines) showing the 
# average NDVI across the Prouton Lakes fire area through time
ndvi_time_series_plot <- ggplot(
  data = ndvi_zonal_long, 
  aes(x = Year, y = Average_NDVI, group = 1)
) +
  geom_line(linewidth = 1, color = "#1B9E77") + 
  geom_point(size = 3, color = "#D95F02") +
  
  scale_x_continuous(breaks = ndvi_zonal_long$Year) +
  labs(
    title = "Average July-August NDVI Across Prouton Lakes Fire Area by Year",
    x = "Year",
    y = "Average NDVI",
    caption = "Data is NaN for 2016 (all pixels masked)."
  ) +
  theme_minimal() + 
  theme(
    plot.title = element_text(hjust = 0.5, face = "bold"),
    axis.text.x = element_text(angle = 45, hjust = 1)
  )

# Consulted Gemini for the layout of the plot
# Print the final plot
print(ndvi_time_series_plot)
```

    ## Warning: Removed 1 row containing missing values or values outside the scale range
    ## (`geom_point()`).

![](GEM520_Lab8_EllenWu_files/figure-gfm/unnamed-chunk-15-1.png)<!-- -->

#### Step 4 - Classify burn severity

##### Code answer

``` r
# Include code here

# avg_nbr_stack contains the avg nbr value by year
# Subset the 2015 as the pre-fire and the 2018 as the post-fire
prefire_nbr <- subset(avg_nbr_stack, "2015")
postfire_nbr <- subset(avg_nbr_stack, "2018")

# Calculate dNBR = NBR(prefire) - NBR(postfire)
dnbr <- prefire_nbr - postfire_nbr 
names(dnbr) <- "dNBR"

# Make the reclassify matrix
reclass_matrix <- matrix(
  c(
    -0.20, 0.15, 1,  # unburned
    0.15, 0.25, 2,   # low severity
    0.25, 0.30, 3,   # medium severity
    0.30, 1.00, 4    # high severity
  ), 
  ncol = 3, byrow = TRUE
)

# Reclassify the raster
burn_severity <- classify(dnbr, rcl = reclass_matrix, right = TRUE)
names(burn_severity) <- "Prouton_Lakes_Burn_Severity"

# Rename the codes to labels
levels(burn_severity) <- data.frame(id = c(1:4),
                                    burn_severity = c("unburned", 
                                                      "low severity",
                                                      "medium severity", 
                                                      "high severity"))

# Plot the dNBR with burn severity classes with help from Gemini
# Specify colors
plot_colors <- c(
  "unburned" = "#4daf4a",
  "low severity" = "#a6d96a",
  "medium severity" = "#fdae61",
  "high severity" = "#d7191c")

plot(
  x = burn_severity,
  col = plot_colors,                      
  type = "classes",
  plg = list(
    title = "Burn Severity Levels",
    cex = 1),
  main = "2017 Prouton Lakes Fire Burn Severity Map",
  mar = c(3, 3, 3, 4)
)

# Overlay the boundary of the fire
plot(prouton_extent_proj, add = TRUE, lwd = 2, border = "black", col = NA)
```

    ## Warning in plot.sf(prouton_extent_proj, add = TRUE, lwd = 2, border = "black",
    ## : ignoring all but the first attribute

![](GEM520_Lab8_EllenWu_files/figure-gfm/unnamed-chunk-16-1.png)<!-- -->

#### Step 5 - Post-fire vegetation recovery

##### Code answer

``` r
# Include code here

# Convert the burn severity raster to polygons
burn_severity_poly <- terra::as.polygons(burn_severity, dissolve = TRUE)

# Convert to data frame and view the result
burn_severity_poly_df <- as.data.frame(burn_severity_poly)

# Extract all the yearly composite post-fire
postfire_ndvi <- avg_ndvi_stack[[c(6:9)]]

# Rename the layers for plots
postfire_yr <- c("2018", "2019", "2020", "2021")
names(postfire_ndvi) <- paste0(postfire_yr, "_NDVI")

# Extract all NDVI values by burn severity polygon
ndvi_by_severity <- terra::extract(
  x = postfire_ndvi,
  y = burn_severity_poly,
  fun = NULL,
  df = TRUE)

# Reshape the data frame into longer format
ndvi_severity_long <- pivot_longer(data = ndvi_by_severity,
                                   cols = `2018_NDVI`:`2021_NDVI`,
                                   names_to = "Year",
                                   values_to = "NDVI")

# A plot showing the yearly NDVI composites in 2018-2021
plot(postfire_ndvi, nc = 2, range = c(0, 0.5))
```

![](GEM520_Lab8_EllenWu_files/figure-gfm/unnamed-chunk-17-1.png)<!-- -->

``` r
# Make sure the burn severity is an ordered factor
severity_levels_numeric <- c(1, 2, 3, 4)
severity_labels <- c("unburned", "low severity", 
                     "medium severity", "high severity")
ndvi_severity_long$burn_severity <- factor(
    ndvi_severity_long$ID,
    levels = severity_levels_numeric,
    labels = severity_labels,
    ordered = TRUE
)

# Create a boxplot showing the distribution of NDVI per burn classes by year
ggplot(ndvi_severity_long, aes(x = burn_severity, y = NDVI)) +
    geom_boxplot(aes(fill = burn_severity), outlier.shape = 1) +
    facet_wrap(~ Year, ncol = 4) +
    labs(
        title = "Post-fire NDVI by Burn Severity (2018–2021)",
        x = "Burn Severity Class",
        y = "NDVI Values",
        fill = "Severity"
    ) +
    theme_bw() +
    theme(
        plot.title = element_text(hjust = 0.5, face = "bold"),
        axis.text.x = element_text(angle = 45, hjust = 1),
        legend.position = "none"
    )
```

    ## Warning: Removed 72 rows containing non-finite outside the scale range
    ## (`stat_boxplot()`).

![](GEM520_Lab8_EllenWu_files/figure-gfm/unnamed-chunk-17-2.png)<!-- -->

``` r
# Consulted Gemini for a better layout of the boxplot
```
