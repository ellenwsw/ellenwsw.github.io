---
title: "Lab 7 - Time Series Analysis in R"
author: "Ellen Wu"
date: "01 March 2026"
output: 
  md_document:
    variant: gfm
    preserve_yaml: true
---

# Lab Instructions

Complete the following questions, including all R code used and written
answers (boxes for your answers are already defined below). Submit your
markdown file on Canvas, in PDF format, by the due date posted online.

## Attaching packages

This lab requires the following packages to be installed and attached.

``` r
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

# PART 1 - MODIS NDVI time-series analysis

The first part of this lab will focus on an area located in the region
of Yellowhead Country, Alberta. We will examine a time series of NDVI
values from the MOD13Q1 MODIS product, as we have done during the
lecture.

------------------------------------------------------------------------

This lab uses NDVI Data from the MODIS Terra product MOD13Q1. Navigate
to the following website to read about the product:

<https://lpdaac.usgs.gov/products/mod13q1v006/>

List the following information about the dataset:

- spatial resolution
- temporal resolution
- temporal availability (how far back does it go? Is it still
  distributed?)
- valid range of NDVI values (1st layer in dataset)

------------------------------------------------------------------------

### Written Answer

- Spatial resolution: 250 Meters x 250 Meters
- Temporal resolution: 16 Day
- Temporal availability (how far back does it go? Is it still
  distributed?): Coverage from 2000-02-18 to 2023-02-17, and it was
  decommissioned on July 31, 2023.
- Valid range of NDVI values (1st layer in dataset): -2000 to 10000

------------------------------------------------------------------------

The time series of cleaned MOD13Q1 NDVI layers is located in the
`"data/MOD13Q1_TS"` directory. List all the tif files located in this
directory using the `list.files` function and the argument
`pattern = "tif$"`. The `$` indicates that the file name should **end**
with `"tif"` and that the other files containing `"tif"` within their
file name will not be listed.

The date of the time series is indicated in the file name a sequence of
7 numbers after the letter `A`. The first four numbers indicate the year
and the next three numbers indicate the day of the year. Extract the
sequence of 7 numbers indicating the date in a vector of characters
called `date_ts`. Convert `date_ts` to an object of class `Date` using
the `lubridate::as_date()` function and the argument `format`.

Create a data.frame with a single column storing the `Dates` vector
`date_ts`. Use `dplyr` and `lubridate` to create a new column storing
the year corresponding to each date and summarize the number of files
per year.

**- What is the range of years covered by the time series?**

**- How many files per year?**

------------------------------------------------------------------------

### Code answer

``` r
# Your answer here

# List all the files in the folder
flist <- list.files("data/MOD13Q1_TS", pattern = "tif$", full.names = TRUE)

# Return only the basename
fname <- basename(flist)

# Extract the 7-digit date code after 'A'
date_ts <- str_sub(fname, start = 10, end = 16)

# Convert Julian day to date
Date <- as_date(date_ts, format = "%Y%j")

# Create data frame to store the dates and convert the years
df_dates <- data.frame(Date = date_ts) %>%
  mutate(year = year(as_date(date_ts, format = "%Y%j")))

# Summarize the number of files per year
df_year_files <- df_dates %>%
  count(
    year = year,
    name = "n_files"
  )
```

### Written answer

The time series cover the years between 2001 and 2020, and there are 23
files per year.

------------------------------------------------------------------------

Open the files of `flist` in a `SpatRaster` object called `ndvi_ts` and
rename the layers of `ndvi_ts` based on `date_ts`.

Calculate the median (`median`) NDVI value of each pixel throughout the
entire time-series in a `SpatRaster` object called `ndvi_ts_med`.
Include a plot of `ndvi_ts_med` in your report.

------------------------------------------------------------------------

### Code answer

``` r
# Your answer here

# Open the files as rasters
ndvi_ts <- rast(flist)

# Rename the layers based on date_ts
names(ndvi_ts) <- date_ts

# Calculate the median NDVI value
ndvi_ts_med <- app(ndvi_ts, fun = "median", na.rm = TRUE)

# Plot ndvi_ts_med
plot(ndvi_ts_med, main = "Median NDVI")
```

![](GEM520_Lab7_Time_Series-assign_files/figure-gfm/unnamed-chunk-3-1.png)<!-- -->

------------------------------------------------------------------------

We are going to focus on two regions of interest (ROIs) located in the
study area. The ROIs are stored in the shapefile `MOD13Q1_roi.shp`
located in the `data` folder. Open the shapefile. It uses the same CRS
as the MOD13Q1 time series. The `MOD13Q1_roi.shp` has a field called
`ID` with the value `A` for the first ROI and `B` for the second `ROI`.

Extract the average NDVI value of each ROI for each layer of `ndvi_ts`
time series into a `data.frame` named `ndvi_roi`. Transform `ndvi_roi`
to a data.frame in a “long” format (one column storing the layer names
and another one storing NDVI) named `ndvi_roi_long`.

Using `ndvi_roi_long` and `dplyr` functions, calculate the monthly NDVI
average **of the months between May and September** from the **first
year of the time series to `2006`** for both ROIs combined (i.e. you
don’t need to calculate an average NDVI per ROI). Store the summary in
an object called `ndvi_roi_summary`

**What is the month with the highest average NDVI?**

------------------------------------------------------------------------

### Code answer

``` r
# Your answer here

# Load the roi layer
roi <- st_read("data/roi_MOD13Q1.shp")
```

    ## Reading layer `roi_MOD13Q1' from data source 
    ##   `C:\Users\ellenwsw.stu\OneDrive - UBC\_Backup\GEM520\Submitted_Lab7\data\roi_MOD13Q1.shp' 
    ##   using driver `ESRI Shapefile'
    ## Simple feature collection with 2 features and 1 field
    ## Geometry type: POINT
    ## Dimension:     XY
    ## Bounding box:  xmin: -7885506 ymin: 6129112 xmax: -7873407 ymax: 6133884
    ## Projected CRS: unnamed

``` r
# Extract the average NDVI value of each ROI for each layer
ndvi_roi <- terra::extract(ndvi_ts, vect(roi), fun = mean, na.rm = TRUE)
```

    ## Warning: [extract] transforming vector data to the CRS of the raster

``` r
# Transform the data frame to a long format
ndvi_roi_long <- ndvi_roi %>%
  pivot_longer(
    cols = -ID,
    names_to = "layer_day",      # column to store layer names
    values_to = "ndvi"       # column storing extracted NDVI
  )

# Calculate the monthly NDVI average for both ROI
ndvi_roi_summary <- ndvi_roi_long %>%
  mutate(
    Year = year(as_date(as.character(layer_day), format = "%Y%j")),
    Month = month(as_date(as.character(layer_day), format = "%Y%j"))) %>%
  # Filter for the specific time period
  filter(Year <= 2006, Month >= 5, Month <= 9) %>%
  # Group the data by Year and Month
  group_by(Month) %>%
  # Calculate the average NDVI for each Month group
  summarise(Mean_NDVI = mean(ndvi, na.rm = TRUE))

# Show the table
print(ndvi_roi_summary)
```

    ## # A tibble: 5 × 2
    ##   Month Mean_NDVI
    ##   <dbl>     <dbl>
    ## 1     5     0.599
    ## 2     6     0.685
    ## 3     7     0.722
    ## 4     8     0.721
    ## 5     9     0.683

### Written answer

July is the month with the highest average NDVI throughout the first
year of the time series up to 2006.

------------------------------------------------------------------------

Using `ggplot2` and `ndvi_roi_summary`, make a connected scatter plot
(points connected with a line) showing the monthly NDVI average on the
y-axis and the month on the x-axis.

\[Hint: If you want to join each point of your plot with a line (using
`geom_line`), you might need to add `group = 1` in `aes()`:
`ggplot(..., aes(...,group = 1))`. This is used to overwrite the default
behavior of `geom_line` that tries to join points belonging to the same
factor/group. In our case, each month consists in only one observation
(mean NDVI) so there is no pair of points to draw a line from within
groups. To overcome this, one trick consists in assigning the value 1 to
the `group` argument of the `aes` function\]

------------------------------------------------------------------------

### Code answer

``` r
# Your answer here

ggplot(ndvi_roi_summary, 
       aes(x = Month, y = Mean_NDVI, group = 1)) +
  geom_point() +
  geom_line() +
  labs(
    x = "Month",
    y = "Average NDVI",
    title = "Monthly NDVI Average Trend (May–September)"
  ) 
```

![](GEM520_Lab7_Time_Series-assign_files/figure-gfm/unnamed-chunk-5-1.png)<!-- -->

------------------------------------------------------------------------

We are now going to apply the BFAST change detection algorithm at the
two ROIs located in the study area.

Filter the object `ndvi_roi_long` to create two data.frame `ndvi_roi_A`
and `ndvi_roi_B` with the NDVI time series at the ROI A and ROI B,
respectively. Convert `ndvi_roi_A` and `ndvi_roi_B` to a `time-series`
object with the function
`ts(data = ..., frequency = ..., start = c(..., ...))`. The `frequency`
of the time series is equal to the number of NDVI layers per year and
the time series starts on the first observation of the first year in the
time series.

Run the BFAST algorithm for both ROIs using `bfastmonitor()`, as shown
in the lecture. For ROI A, start the monitoring period on the first
observation of 2008 (`start = c(2008,1)`). For ROI B, start the
monitoring period on the first observation of 2006 (`start = c(2006,1)`)

**For both ROI A and ROI B:**

- At what time does BFAST detects a deviation from the expected NDVI
  pattern?
- What is the direction of change in NDVI (Decrease/Increase)?
- Examine the change in NDVI values and the evolution of NDVI after the
  break. Make an educated guess as to what caused the break at that POI.

------------------------------------------------------------------------

### Code answer

``` r
# Your answer here

# Filter for ROI A (ID == 1)
ndvi_roi_A <- ndvi_roi_long %>%
  filter (ID == 1)

# Filter for ROI B (ID == 2)
ndvi_roi_B <- ndvi_roi_long %>%
  filter (ID == 2)

# Convert both data frame to time series
ndvi_ts_A <- ts(ndvi_roi_A$ndvi, frequency = 23, start = c(2001,1))

ndvi_ts_B <- ts(ndvi_roi_B$ndvi, frequency = 23, start = c(2001,1))

# Run the BFAST algorithm for both ROIs
# For ROI A, start the monitoring period on the first observation of 2008 (`start = c(2008,1)`)
bfm_A <- bfast::bfastmonitor(ndvi_ts_A, start = c(2008,1))
plot(bfm_A)
```

![](GEM520_Lab7_Time_Series-assign_files/figure-gfm/unnamed-chunk-6-1.png)<!-- -->

``` r
# For ROI B, start the monitoring period on the first observation of 2006 (`start = c(2006,1)`)
bfm_B <- bfast::bfastmonitor(ndvi_ts_B, start = c(2006,1))
plot(bfm_B)
```

![](GEM520_Lab7_Time_Series-assign_files/figure-gfm/unnamed-chunk-6-2.png)<!-- -->

### Written answer

1.  BFAST detects a deviation (breakpoint) from the expected NDVI
    pattern in the fourteenth layer collected in 2011 for ROI A, and in
    the tenth layer collected in 2008 for ROI B.
2.  ROI A has a sharp decrease of NDVI immediately after the break, from
    ~0.75 to 0.2; ROI B also has a strong decrease of NDVI but not as
    sharp as that in ROI A, from ~0.55 to 0.3.
3.  For ROI A, the sharp decrease in NDVI followed by persistently low
    but fluctuating values suggests that the most likely cause of the
    drop is clear-cut harvesting, consistent with ongoing forestry
    activities in the area. For ROI B, the gradual partial recovery in
    NDVI after the break indicates that the most likely cause is
    wildfire, followed by natural regeneration.

------------------------------------------------------------------------

# PART 2 - Land cover time series analysis

In the second part of this lab we are going to analyze a 33-year time
series of land cover maps classified from Landsat imagery. The
classification was performed using the Virtual Land Cover Engine (VLCE;
[Hermosilla et al.,
2017](https://www.tandfonline.com/doi/full/10.1080/07038992.2018.1437719)).

The VLCE classifies land cover into the following classes:

- Water (class 20)
- Snow/Ice (class 31)
- Rock/Rubble (class 32)
- Exposed/Barren Land (class 33)
- Bryoids (class 40)
- Shrubland (class 50)
- Wetland (class 80)
- Wetland-Treed (class 81)
- Herbs (class 100)
- Coniferous (class 210)
- Broadleaf (class 220)
- Mixed Wood (class 230)

We are going to focus on a ~ 25 x 20 km area near Williams Lake, BC
where active forest management practices take place. The aim of the lab
is to examine the evolution of total forested area through time in this
area as a balance between forest area loss (e.g. harvesting) and gain
(e.g. forest regeneration).

------------------------------------------------------------------------

The folder `VLCE_TS` contains the time series of VLCE land cover maps
for the study area.

List all the full path of the tif files in a vector of characters called
`flist_vlce`. Extract the year from each element of `flist_vlce` into a
vector called `year_ts`.

------------------------------------------------------------------------

### Code answer

``` r
# Your answer here

# List all the full path of the tif files
flist_vlce <- list.files("data/VLCE_TS", pattern = "tif$", full.names = TRUE)

# Extract the year from each element of flist_vlce
fname <- basename(flist_vlce)
year_ts <- str_sub(fname, start = -8, end = -5)
```

------------------------------------------------------------------------

Open all of the files listed in `flist_vlce` in a single `SpatRaster`
object called `vlce_ts`. Rename the layers of `vlce_ts` based on their
corresponding year in the time series.

------------------------------------------------------------------------

### Code answer

``` r
# Your answer here

# Open all the files listed in a single SpatRaster object
vlce_ts <- rast(flist_vlce)

# Rename the layers based on their corresponding year in the time series
names(vlce_ts) <- year_ts
```

------------------------------------------------------------------------

Plot the first and last image of the time series side by side and
describe in a few lines the changes in land cover that occurred between
1984 and 2016. Which classes have changed the most/least?

------------------------------------------------------------------------

### Code answer

``` r
# Your answer here

par(mfrow = c(1, 2))
plot(vlce_ts[[1]], main = (names(vlce_ts)[1]))
plot(vlce_ts[[nlyr(vlce_ts)]], main = names(vlce_ts)[nlyr(vlce_ts)])
```

![](GEM520_Lab7_Time_Series-assign_files/figure-gfm/unnamed-chunk-9-1.png)<!-- -->

### Written answer

Large areas of shrubland cover in 1984 were replaced by dark green
(coniferous) in the center and in the southwest of the landscape. In
contrast, areas originally covered by coniferous in the northeast of the
landscape in 1984 were replaced by a mosaic of mixed wood and shrubland
in 2016. As a summary, coniferous forest, mixed wood, herbs and
shrubland have changed the most from 1984 to 2016, while water,
rock/rubble, exposed/barren, snow/ice and wetland/wetland-treed
experienced the least change.

------------------------------------------------------------------------

In the following questions we are going to focus on the gain and loss in
forested areas over time. Therefore, we are going to reclassify the land
cover time series into forested and non-forested land cover.

The text file `lc_reclassification.csv` lists all the possible land
cover types classified by the VLCE, the original value assigned to each
class and the new value each class should get to obtain a binary
forested / non-forested classification. The classes `Coniferous`,
`Broadleaf`, `Mixed woods` and `Wetland-Treed` are considered as
forested areas (class `1`) while all other classes (expect
`Unclassifed`) are considered as non-forested areas (class `0`)

Use the `terra::classify` function to reclassify `vlce_ts` into a binary
forested / non-forested `Spatraster` called `ts_forested`.

Correctly input the reclassification matrix into the classify function;
see ?terra::classify for details. *Hint* Drop the first column of the
lc_reclassification dataframe to only contain org_value and new_value. —

### Code answer

``` r
# Your answer here

# Read the csv
lc <- read.csv("data/lc_reclassification.csv")

# Drop the first column and convert the data frame into a matrix
rcl <- as.matrix(lc[ ,-1])

# Reclassify vlce_ts into a binary spatraster
ts_forested <- classify(vlce_ts, rcl)
```

------------------------------------------------------------------------

The function `terra::diff` can be used to “compute the difference
between consecutive layers in a SpatRaster”. The argument `lag` is used
to specify the gap between the layers that are substracted with each
other. The function `diff` is also part of the `base` R and operates on
a vector. See the example below:

``` r
# Define a vector x (length = 10)
x <- c(1,1,0,0,1,1,1,0,0,1)
x
```

    ##  [1] 1 1 0 0 1 1 1 0 0 1

``` r
# Lagged difference with lag = 1
# Equivalent to x[2:10] - x[1:9]
diff(x, lag = 1)
```

    ## [1]  0 -1  0  1  0  0 -1  0  1

``` r
# Lagged difference with lag = 2
# Equivalent to x[3:10] - x[1:8]
diff(x, lag = 2)
```

    ## [1] -1 -1  1  1  0 -1 -1  1

Use the `terra::diff` function with a lag of 1 year to compute the
`SpatRaster` object called `ts_forested_lag`. The layer of
`ts_forested_lag` at year `t` is the result of
`ts_forested[[t]] - ts_forested[[t - 1]]`. Note that the first year of
the time series (i.e. 1984) is lost in the lagged difference
computation.

**Answer the following questions in your report:**

- If a pixel is forested at T1 and non-forested at T2 (forest loss),
  what will be the result of the difference T2 - T1?

- If a pixel is non-forested at T1 and forested at T2 (forest gain),
  what will be the result of the difference T2 - T1?

------------------------------------------------------------------------

### Code answer

``` r
# Your answer here

# The difference between consecutive layers with a lag of 1 year
ts_forested_lag <- diff(ts_forested, lag = 1)
```

### Written answer

If a pixel is forested at T1 and non-forested at T2 (forest loss), the
result of the difference is -1; if a pixel is non-forested at T1 and
forested at T2 (forest gain), the result of the difference is 1.

------------------------------------------------------------------------

Calculate the total forest area gained and the total forest areas lost
for each year between 1985 and 2016, ***in hectares***. Store this
information in two data frames called `forest_gain` and `forest_loss`.
Each data frame should have 2 columns: `year` and either `gain` or
`loss`. Then, join the two data frames `forest_gain` and `forest_loss`
into a single data frame `forest_change`.

Finally, add a column `net_change` equal to the difference between
forest gain and forest loss to the data frame `forest_change`.

------------------------------------------------------------------------

### Code answer

``` r
# Your answer here

# Calculate the number of pixels with forest gain
gain_counts <- (ts_forested_lag == 1) %>%
  global(fun = "sum", na.rm = TRUE)

# Each pixel is 30 x 30m, 900 m2, which is 0.09 hectare
# Create a forest_gain data frame to store the year and corresponding gains
forest_gain <- data.frame(gain_counts) %>%
  mutate(year = names(ts_forested_lag),
         gain = sum * 0.09) %>%
  select(year, gain) %>%
  as_tibble()

# Calculate the number of pixels with forest loss
loss_counts <- (ts_forested_lag == -1) %>%
  global(fun = "sum", na.rm = TRUE)

# Create a forest_loss data frame to store the year and corresponding loss
forest_loss <- data.frame(loss_counts) %>%
  mutate(year = names(ts_forested_lag),
         loss = sum * 0.09) %>%
  select(year, loss) %>%
  as_tibble()

# Join the two data frames into a single data frame
forest_change <- inner_join(forest_gain, forest_loss, by = "year") %>%
  mutate(net_change = gain - loss)
```

------------------------------------------------------------------------

Use `ggplot2` to reproduce the graph shown below (obtained with another
dataset) that shows the net change in forested area over time (solid
black line). The dashed black line indicates a net change of `0` and can
be created with the `geom_abline()` function.

`geom_abline(slope = 0, intercept = 0, linetype = "dashed")`

Make sure that you change the title as well as the labels of the x and y
axis to the ones shown in the graph below.

![](exdata/net_change_plot.png)

### Code answer

``` r
# Your answer here

# Plot the net change throughout the time series
ggplot(data = forest_change, aes(x = year, y = net_change, group = 1)) + 
  geom_line(color = "black", linewidth = 1) +
  geom_abline(slope = 0, intercept = 0, linetype = "dashed") +
  labs(
    title = "Yearly net forest area change in hectares",
    x = "Year", 
    y = "Change in forested area (ha)"
  ) +
  theme_minimal() +
  theme(
    axis.text.x = element_text(angle = 45, hjust = 1)
)
```

![](GEM520_Lab7_Time_Series-assign_files/figure-gfm/unnamed-chunk-14-1.png)<!-- -->

------------------------------------------------------------------------

Use `ggplot2` to reproduce the graph shown below (obtained with another
dataset) that shows the forested area gain and loss over time (colored
bars).Note that extra intermediate steps might be necessary to format
the data properly before making the graph with `ggplot2`.

Make sure that you change the labels of the legend and axis to the ones
shown in the graph below.

![](exdata/gain_loss_plot.png)

------------------------------------------------------------------------

### Code answer

``` r
# Your answer here

# Reshape the data frame to the long format
forest_change_long <- forest_change %>%
  select(year, gain, loss) %>%
  # Convert from wide to long format
  pivot_longer(
    cols = c(gain, loss), 
    names_to = "change_type", 
    values_to = "hectares"
  ) %>%
  # Make loss values negative for intuitive directional plotting
  mutate(hectares = ifelse(change_type == "loss", -hectares, hectares)) %>%
  as_tibble()

# Plot the data frame to a stacked bar chart
ggplot(forest_change_long, aes(x = year, y = hectares, fill = change_type)) +
  geom_bar(stat = "identity", position = "identity") +
  labs(
    title = "Yearly forest area gain and loss",
    x = "Year",
    y = "Change in forested area (ha)",
    fill = "Change Type"
  ) +
  theme_minimal() +
  theme(
    axis.text.x = element_text(angle = 45, hjust = 1)
  )
```

![](GEM520_Lab7_Time_Series-assign_files/figure-gfm/unnamed-chunk-15-1.png)<!-- -->
