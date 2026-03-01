The R code to analyze the polygons that you have delineated, split the
data into training and validation sets, classify the image with the
Maximum Likelihood algorithm and generate the confusion matrix is
provided. You just need to set the file path to your
`classification_polygons_YourInitials.shp` at the beginning of PART 3.

However, you will have to type your own code [here](#code-answer) to
calculate the overall accuracy, user accuracy and producer accuracy from
the confusion matrix. **Note that the overall accuracy must be more than
75% to receive full marks**.

Make also sure to answer [Q1](#Q1), [Q2](#Q2), [Q3](#Q3), [Q4](#Q4) and
[Q5](#Q5) in your R Markdown report.

**This document reads in the Landsat imagery and the delineated polygons
with relative file paths from the root directory of the lab folder,
where the Rmd file is located. Make sure that
`classification_polygons_YourInitials` files are stored in the `outputs`
folder and that your Rmd file is located at the root of the directory**

## PART 1 - Supervised Classification

***See PDF***

## PART 2 - Defining areas of training data

***See PDF***

## PART 3 - Image classification and accuracy assessment

**SET THE FILE NAME OF YOUR `classification_polygons_YourInital.shp`
file in the following code chunk**

``` r
my_polygons <- "outputs/classification_polygons_EW.shp"
```

The following packages need to be installed on your machine. *DO NOT
install the packages in the R Markdown document. Run the
install.packages() commands in the console, in a fresh and clean R
Studio session*

``` r
install.packages('terra', repos='https://rspatial.r-universe.dev')
install.packages("raster")
install.packages("sf")
install.packages("RStoolbox")
install.packages("tidyverse")
install.packages("caret")
```

Once installed, we attach the packages

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

``` r
library(terra)
```

    ## Warning: package 'terra' was built under R version 4.5.1

``` r
library(sf)
```

    ## Warning: package 'sf' was built under R version 4.5.1

``` r
library(RStoolbox)
```

    ## Warning: package 'RStoolbox' was built under R version 4.5.1

We start by reading the Landsat image into R

``` r
ls_image <- rast("data/LC09_L2SP_047026_20240716_20240717_02_T1_SR_BSTACK.tif")

ls_image
```

    ## class       : SpatRaster 
    ## size        : 1407, 1194, 6  (nrow, ncol, nlyr)
    ## resolution  : 30, 30  (x, y)
    ## extent      : 466215, 502035, 5371545, 5413755  (xmin, xmax, ymin, ymax)
    ## coord. ref. : WGS 84 / UTM zone 10N (EPSG:32610) 
    ## source      : LC09_L2SP_047026_20240716_20240717_02_T1_SR_BSTACK.tif 
    ## names       : blue, green, red, nir, swir1, swir2 
    ## min values  :    0,     0,   0,   0,     0,     0 
    ## max values  :    1,     1,   1,   1,     1,     1

``` r
terra::plotRGB(ls_image, r = 3, g = 2, b = 1, stretch = "lin")
```

![](/archive-posts/images/unnamed-chunk-4-1.png)<!-- -->

Then, we load the delineated polygons

``` r
class_poly <- st_read(my_polygons)
```

    ## Reading layer `classification_polygons_EW' from data source 
    ##   `C:\Users\ellenwsw.stu\OneDrive - UBC\_Backup\GEM520\Submitted_Lab6\outputs\classification_polygons_EW.shp' 
    ##   using driver `ESRI Shapefile'
    ## Simple feature collection with 245 features and 1 field
    ## Geometry type: POLYGON
    ## Dimension:     XY
    ## Bounding box:  xmin: 466217.3 ymin: 5371554 xmax: 502032.4 ymax: 5413693
    ## Projected CRS: WGS 84 / UTM zone 10N

``` r
# Make sure that the geometry is valid
class_poly <- st_make_valid(class_poly)

# Tranform lc_class to factor
class_poly <- class_poly %>%
  mutate(lc_class = factor(lc_class, 
                           levels = c("Broadleaf Forest", "Coniferous Forest", "Exposed soil and rocks", "High density developed", "Low density developed", "Non-forest vegetation", "Water")))

# Plot
terra::plotRGB(ls_image, r = 3, g = 2, b = 1, stretch = "lin")
plot(class_poly[, "lc_class"], add = TRUE)
```

![](/archive-posts/images/unnamed-chunk-5-1.png)<!-- -->

Here is a summary of the number of polygons per class

``` r
poly_summary <- class_poly %>%
  st_drop_geometry() %>%
  group_by(lc_class) %>%
  summarize(n_poly = n())

poly_summary
```

    ## # A tibble: 7 × 2
    ##   lc_class               n_poly
    ##   <fct>                   <int>
    ## 1 Broadleaf Forest           40
    ## 2 Coniferous Forest          50
    ## 3 Exposed soil and rocks     38
    ## 4 High density developed     21
    ## 5 Low density developed      22
    ## 6 Non-forest vegetation      27
    ## 7 Water                      47

For each land cover class will use 70% of the polygons to train the
classification algorithm and the remaining 30% for validation.

``` r
# Assign a unique ID to each polygon 
class_poly <- tibble::rowid_to_column(class_poly, var = "ID")

set.seed(1234)

# Sample 70% of the polygons in each land cover class
poly_train <- class_poly %>%
  group_by(lc_class) %>%
  sample_frac(0.7) %>%
  mutate(set = "training") %>% st_cast(to = 'POLYGON')

# Use the ID field to select the polygons for validation
poly_val <- class_poly %>%
  filter(!ID %in% poly_train$ID) %>%
  mutate(set = "validation") %>% st_cast(to = 'POLYGON')
```

    ## Warning in st_cast.MULTIPOLYGON(X[[i]], ...): polygon from first part only

``` r
poly_set <- rbind(poly_train, 
                  poly_val)

# Plot poly_set
plot(poly_set[, "set"], key.width = lcm(4)) #key.width = lcm(3.27))
```

![](/archive-posts/images/unnamed-chunk-7-1.png)<!-- -->

We now extract the values of the Landsat image pixels in the polygons

``` r
# Add join column to our polygon set and remove the old one
poly_set <- poly_set %>% tibble::rowid_to_column(var = "join_id") %>% select(-ID)

# Extract pixel values for each polygon
poly_set_vals <- terra::extract(ls_image, vect(poly_set))

# Join with LC class via an inner_join (where new join_id == ID from terra)
poly_set_vals <- inner_join(poly_set, poly_set_vals, join_by(join_id == ID)) %>%
  st_drop_geometry()
```

Each row of `poly_set_vals` corresponds to one pixel of the Landsat
image.

``` r
poly_set_vals
```

    ## # A tibble: 24,833 × 9
    ## # Groups:   lc_class [7]
    ##    join_id lc_class         set        blue  green    red   nir  swir1  swir2
    ##  *   <dbl> <fct>            <chr>     <dbl>  <dbl>  <dbl> <dbl>  <dbl>  <dbl>
    ##  1       1 Broadleaf Forest training 0.0152 0.0345 0.0251 0.246 0.117  0.0512
    ##  2       1 Broadleaf Forest training 0.0142 0.0324 0.0207 0.245 0.104  0.0438
    ##  3       1 Broadleaf Forest training 0.0139 0.0325 0.0207 0.232 0.0960 0.0410
    ##  4       1 Broadleaf Forest training 0.0146 0.0331 0.0241 0.221 0.116  0.0529
    ##  5       1 Broadleaf Forest training 0.0146 0.0329 0.0213 0.231 0.100  0.0437
    ##  6       1 Broadleaf Forest training 0.0142 0.0339 0.0222 0.244 0.113  0.0492
    ##  7       2 Broadleaf Forest training 0.0236 0.0414 0.0259 0.420 0.171  0.0669
    ##  8       2 Broadleaf Forest training 0.0232 0.0416 0.0266 0.376 0.162  0.0636
    ##  9       2 Broadleaf Forest training 0.0224 0.0411 0.0256 0.384 0.152  0.0616
    ## 10       2 Broadleaf Forest training 0.0214 0.0411 0.0251 0.350 0.145  0.0571
    ## # ℹ 24,823 more rows

We can check the number of pixels per class and training / validation
set

``` r
poly_stats <- poly_set_vals %>%
  group_by(set, lc_class) %>%
  summarize(n_px = n())
```

    ## `summarise()` has grouped output by 'set'. You can override using the `.groups`
    ## argument.

``` r
poly_stats
```

    ## # A tibble: 14 × 3
    ## # Groups:   set [2]
    ##    set        lc_class                n_px
    ##    <chr>      <fct>                  <int>
    ##  1 training   Broadleaf Forest         147
    ##  2 training   Coniferous Forest        517
    ##  3 training   Exposed soil and rocks   109
    ##  4 training   High density developed   138
    ##  5 training   Low density developed    551
    ##  6 training   Non-forest vegetation    517
    ##  7 training   Water                  20400
    ##  8 validation Broadleaf Forest          75
    ##  9 validation Coniferous Forest        222
    ## 10 validation Exposed soil and rocks    44
    ## 11 validation High density developed    39
    ## 12 validation Low density developed    235
    ## 13 validation Non-forest vegetation    299
    ## 14 validation Water                   1540

We can pivot the data from a wide to long format

``` r
poly_set_vals_long <- pivot_longer(poly_set_vals,
                                   blue:swir2, 
                                   names_to = "band", 
                                   values_to = "reflectance")

poly_set_vals_long
```

    ## # A tibble: 148,998 × 5
    ## # Groups:   lc_class [7]
    ##    join_id lc_class         set      band  reflectance
    ##      <dbl> <fct>            <chr>    <chr>       <dbl>
    ##  1       1 Broadleaf Forest training blue       0.0152
    ##  2       1 Broadleaf Forest training green      0.0345
    ##  3       1 Broadleaf Forest training red        0.0251
    ##  4       1 Broadleaf Forest training nir        0.246 
    ##  5       1 Broadleaf Forest training swir1      0.117 
    ##  6       1 Broadleaf Forest training swir2      0.0512
    ##  7       1 Broadleaf Forest training blue       0.0142
    ##  8       1 Broadleaf Forest training green      0.0324
    ##  9       1 Broadleaf Forest training red        0.0207
    ## 10       1 Broadleaf Forest training nir        0.245 
    ## # ℹ 148,988 more rows

And calculate some summary statistics for each band and land cover
class: mean, 5<sup>th</sup> quantile and 95<sup>th</sup> quantile of
reflectance.

``` r
spectral_sign <- poly_set_vals_long %>%
  group_by(lc_class, band) %>%
  summarize(r_mean = mean(reflectance, na.rm = TRUE), 
            r_q05 = quantile(reflectance, 0.05, na.rm = TRUE), 
            r_q95 = quantile(reflectance, 0.95, na.rm = TRUE))
```

    ## `summarise()` has grouped output by 'lc_class'. You can override using the
    ## `.groups` argument.

``` r
spectral_sign
```

    ## # A tibble: 42 × 5
    ## # Groups:   lc_class [7]
    ##    lc_class          band  r_mean   r_q05  r_q95
    ##    <fct>             <chr>  <dbl>   <dbl>  <dbl>
    ##  1 Broadleaf Forest  blue  0.0179 0.0126  0.0256
    ##  2 Broadleaf Forest  green 0.0367 0.0284  0.0447
    ##  3 Broadleaf Forest  nir   0.294  0.232   0.385 
    ##  4 Broadleaf Forest  red   0.0233 0.0162  0.0315
    ##  5 Broadleaf Forest  swir1 0.117  0.0815  0.162 
    ##  6 Broadleaf Forest  swir2 0.0489 0.0317  0.0703
    ##  7 Coniferous Forest blue  0.0118 0.00787 0.0219
    ##  8 Coniferous Forest green 0.0277 0.0215  0.0389
    ##  9 Coniferous Forest nir   0.236  0.162   0.354 
    ## 10 Coniferous Forest red   0.0165 0.0110  0.0261
    ## # ℹ 32 more rows

We can now visualize the spectral signature of each land cover class

``` r
# Wavelength corresponding to each band
bands_wavelength <- read_csv("data/bands_wavelength.csv")
```

    ## Rows: 6 Columns: 2
    ## ── Column specification ────────────────────────────────────────────────────────
    ## Delimiter: ","
    ## chr (1): band
    ## dbl (1): wavelength
    ## 
    ## ℹ Use `spec()` to retrieve the full column specification for this data.
    ## ℹ Specify the column types or set `show_col_types = FALSE` to quiet this message.

``` r
bands_wavelength
```

    ## # A tibble: 6 × 2
    ##   band  wavelength
    ##   <chr>      <dbl>
    ## 1 blue       0.48 
    ## 2 green      0.56 
    ## 3 red        0.655
    ## 4 nir        0.865
    ## 5 swir1      1.61 
    ## 6 swir2      2.22

``` r
# Join wavelength
spectral_sign <- inner_join(spectral_sign, bands_wavelength)
```

    ## Joining with `by = join_by(band)`

``` r
# Graph
ggplot(spectral_sign, aes(x = wavelength, y = r_mean, group = 1)) +
  geom_point() + 
  geom_line() + 
  geom_ribbon(aes(ymin = r_q05, ymax = r_q95), alpha = 0.2) + 
  facet_wrap(vars(lc_class)) + 
  theme_bw() + 
  labs(x = "Wavelength (nm)", 
       y = "Reflectance")
```

![](/archive-posts/images/unnamed-chunk-13-1.png)<!-- -->

We can now use the function `superClass()` from the `RSToolbox` package
to perform the classification and accuracy assessment. The argument
`model = "mlc"` is used to select the Maximum Likelihood algorithm for
classification. We provide the polygons used for training and validation
under the arguments `trainData` and `valData`. The function will sample
`500` pixels from the training polygons (argument `nSamples = 500`) per
land cover class and use this sample to train the classification
algorithm. Similarly, validation will be performed on a sample of `500`
pixels of the validation polygons per land cover class. Note that for
some classes there might not be enough pixels to reach `500`
observations. In that case, training / validation would be performed on
\< `500` pixels per land cover class. It is important to try to balance
the number of observation per classes before training the classification
model and assessing its accuracy. Otherwise, the overall accuracy
derived from the confusion matrix could be biased towards the classes
with the largest number of observations.

For example, it is easier to draw large polygons across water (and hence
getting a lot of training/validation data) than it is over broadleaf
forest. Let’s assume that we use 1000 pixels to assess the accuracy of
water and 20 pixels to assess the accuracy of broadleaf vegetation. For
water, 900 out of 1000 pixels (90%) were classified correctly whereas
only 5 out of 20 pixels were classified correctly for broadleaf.

The overall accuracy would be:

``` r
OA_unbalanced <- (900 + 5) / (1000 + 20)

OA_unbalanced
```

    ## [1] 0.8872549

Now let’s assume that 20 pixels were used for both water and broadleaf
to assess the classification accuracy. For water, 18 out of 20 pixels
(still 90%) were classified correctly and 5 out of 20 pixels were
classified correctly for broadleaf.

The overall accuracy would be:

``` r
OA_balanced <- (18 + 5) / (20 + 20)

OA_balanced
```

    ## [1] 0.575

In the first case where classes are unbalanced we obtain an overall
accuracy of 89%. Because there are much more pixels in water than in
broafleaf in the first case, the overall accuracy is very high and
doesn’t reflect the fact that the broadleaf class is poorly classified.
In the second case, where classes are balanced, we obtain an overall
accuracy of 58%. This illustrates that the classification is not as good
as we might think with the first case.

*The superClass() function might take a few minutes to run*

``` r
set.seed(1234)

poly_train <- poly_train %>% rename(class = lc_class)
poly_val <- poly_val %>% rename(class = lc_class)

# Ensure the class variable is a factor and has no NAs
poly_train$class <- as.factor(poly_train$class)
poly_val$class   <- factor(poly_val$class, levels = levels(poly_train$class))

# check
table(poly_train$class)
```

    ## 
    ##       Broadleaf Forest      Coniferous Forest Exposed soil and rocks 
    ##                     28                     35                     27 
    ## High density developed  Low density developed  Non-forest vegetation 
    ##                     15                     15                     19 
    ##                  Water 
    ##                     33

``` r
# Original
mlc_model <- superClass(img = raster::stack(ls_image),
                        trainData = as(poly_train, "Spatial"),
                        valData = as(poly_val, "Spatial"),
                        responseCol = "class",
                        model = "mlc",
                        nSamples = 500)
```

    ## Warning: package 'caret' was built under R version 4.5.1

    ## Loading required package: lattice

    ## Warning: package 'lattice' was built under R version 4.5.2

    ## 
    ## Attaching package: 'caret'

    ## The following object is masked from 'package:purrr':
    ## 
    ##     lift

The `superClass()` function returns a list with multiple objects. The
classified map is stored in the element of the list called `map`. The
trained model is stored in the element `model`. The predictions of the
model at the validation data are stored in a data.frame called
`validationSamples` located in the element of `mlc_model` called
`validation`. The column `reference` is the land cover class that you
have assigned and the column `prediction` is the land cover class
predicted by the model.

``` r
classified_map <- mlc_model$map

# Write the classified map as a tif file
raster::writeRaster(classified_map, 
            filename = "outputs/classified_map.tif", 
            overwrite = TRUE)

# Plot with colors
raster::plot(classified_map,
     col = c('#A6D96A','#33A02C','#DE3B13','#D63CF1','#00D2D2','#F1A026','#2B83BA'))
```

![](/archive-posts/images/unnamed-chunk-17-1.png)<!-- -->

``` r
# Validation df
val_preds <- mlc_model$validation$validationSamples

head(val_preds)
```

    ## Simple feature collection with 6 features and 3 fields
    ## Geometry type: POINT
    ## Dimension:     XY
    ## Bounding box:  xmin: 466620 ymin: 5389500 xmax: 466800 ymax: 5389650
    ## Projected CRS: WGS 84 / UTM zone 10N
    ##   reference prediction   cell               geometry
    ## 1     Water      Water 961186 POINT (466680 5389590)
    ## 2     Water      Water 964766 POINT (466620 5389500)
    ## 3     Water      Water 964768 POINT (466680 5389500)
    ## 4     Water      Water 958802 POINT (466800 5389650)
    ## 5     Water      Water 962384 POINT (466800 5389560)
    ## 6     Water      Water 964772 POINT (466800 5389500)

The confusion matrix can be created from `val_preds` using the `table()`
function (base R package). The columns represent the reference classes
(classes you have assigned) and the rows represent the predictions of
the model.

``` r
conf_matrix <- table(st_drop_geometry(val_preds[, c("prediction", "reference")]))

knitr::kable(conf_matrix)
```

|  | Broadleaf Forest | Coniferous Forest | Exposed soil and rocks | High density developed | Low density developed | Non-forest vegetation | Water |
|:---|---:|---:|---:|---:|---:|---:|---:|
| Broadleaf Forest | 3 | 0 | 0 | 0 | 0 | 0 | 0 |
| Coniferous Forest | 8 | 113 | 0 | 0 | 2 | 0 | 0 |
| Exposed soil and rocks | 0 | 0 | 0 | 0 | 0 | 0 | 15 |
| High density developed | 0 | 0 | 2 | 10 | 0 | 0 | 4 |
| Low density developed | 4 | 12 | 0 | 0 | 169 | 0 | 0 |
| Non-forest vegetation | 0 | 2 | 0 | 0 | 3 | 229 | 0 |
| Water | 0 | 0 | 0 | 0 | 0 | 0 | 1148 |

The `table()` function returns a `matrix` object with the predicted
classes in the rows and the reference classes in the columns. The
diagonal of a matrix can be returned as a `vector` using the `diag()`
function. The row and column sums can be returned with the `rowSums()`
and `colSums()` functions. The sum of all elements of a matrix can be
obtained with the `sum()` function.

Use the functions described above to calculate the overall accuracy
(`OA`), producer accuracy (`PA`) and user accuracy (`UA`) of your
classification.

**Note that the overall accuracy must be more than 75% to receive full
marks**

### Code answer

``` r
# Compute accuracies
PA <- diag(conf_matrix) / colSums(conf_matrix)
UA <- diag(conf_matrix) / rowSums(conf_matrix)
OA <- sum(diag(conf_matrix)) / sum(conf_matrix)

# Add User’s Accuracy as a new column
conf_with_UA <- cbind(conf_matrix, User_Accuracy = round(UA, 3))

# Add Producer’s Accuracy as a new row, with OA in the bottom-right corner
accuracy_table <- rbind(conf_with_UA, Producer_Accuracy = c(round(PA, 3), round(OA, 3)))

# Display the final table
knitr::kable(accuracy_table)
```

|  | Broadleaf Forest | Coniferous Forest | Exposed soil and rocks | High density developed | Low density developed | Non-forest vegetation | Water | User_Accuracy |
|:---|---:|---:|---:|---:|---:|---:|---:|---:|
| Broadleaf Forest | 3.0 | 0.00 | 0 | 0 | 0.000 | 0 | 0.000 | 1.000 |
| Coniferous Forest | 8.0 | 113.00 | 0 | 0 | 2.000 | 0 | 0.000 | 0.919 |
| Exposed soil and rocks | 0.0 | 0.00 | 0 | 0 | 0.000 | 0 | 15.000 | 0.000 |
| High density developed | 0.0 | 0.00 | 2 | 10 | 0.000 | 0 | 4.000 | 0.625 |
| Low density developed | 4.0 | 12.00 | 0 | 0 | 169.000 | 0 | 0.000 | 0.914 |
| Non-forest vegetation | 0.0 | 2.00 | 0 | 0 | 3.000 | 229 | 0.000 | 0.979 |
| Water | 0.0 | 0.00 | 0 | 0 | 0.000 | 0 | 1148.000 | 1.000 |
| Producer_Accuracy | 0.2 | 0.89 | 0 | 1 | 0.971 | 1 | 0.984 | 0.970 |

***Answer the following questions in brief answers (1-5 lines each)***

### Question 1

**What is a supervised classification process and how does it differs
from unsupervised classification?**

Supervised classification is a process that the analyst guides the
computer to perform land cover classification by providing training
data. In this approach, classes are defined prior to classification, and
representative samples are selected for each class. Unsupervised
classification does not require prior knowledge or training samples.
Instead, the computer automatically groups pixels into clusters using
algorithms such as *k*-means to identify spectral-similar pixels, and
the analyst subsequently interprets and labels each class.

### Question 2

**Why do we need distinct training and validation data, and why is
important they do not overlap?**

Training and validation data are used for completing different tasks.
The training data is used to “learn” how to classify the pixels, while
the validation data is used to test how accurately the model can predict
land cover for new, unseen areas. It is important they do not overlap so
the performance of the classification result is evaluated on unseen
data. Overlapping data can lead to overly optimistic results.

### Question 3

**How does Maximum Likelihood classification work?**

Maximum Likelihood classification assumes that pixels for each class
follows a known probability distribution. It compares the mean and
standard deviation within each band and across all bands to model how
the class values are distributed. Each pixel is then assigned to the
class for which it has the highest probability of belonging, based on
these statistical comparisons.

### Question 4

**Which classes achieved the worst producer and user accuracies, why do
you think this is?**

The Exposed soil and rocks is the class achieved the worst producer and
user accuracies. This is likely due to many of its samples collected
along the coast, where the soil has high moisture content and is
sometimes covered by shallow water. This caused confusion with water,
leading to misclassification and reduced accuracy.

### Question 5

**Which classes achieved the best results, why do you think this is?**

Non-forest vegetation and water are the classes achieved the best
results. This is because they have distinct spectral characteristics
that make them easier to separate from other classes. Non-forest
vegetation shows the strongest reflectance among all types of
vegetations in the NIR, while water has all-time low reflectance across
all bands. They are the two most distinguishable classes among the
seven, minimizing class overlap and leads to more accurate
classification results.

## Part 4 - Classification Examination

Now, load the classified map `outputs/classified_map.tif` back into
QGIS. Navigate around the classified image and compare it to the
original image. Ask yourself: was this a successful classification? Does
the distribution of classes make sense? Are there any areas of major
misclassification? Would you feel comfortable and confident passing
along this map to someone who would then make “real world” decisions
based off of it? In order to answer these questions (in your head…these
are not actual graded questions), feel free to review the Google
Satellite imagery with this classified map.
