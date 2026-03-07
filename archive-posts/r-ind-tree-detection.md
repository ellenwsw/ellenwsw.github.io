# Project overview
The primary objective of the lab was to explore and implement `lidR` functions for individual tree segmentation. The project compared two distinct methodologies:
- Point Cloud-based Segmentation: Using the raw, normalized 3D point cloud.
- CHM-based Segmentation: Using a 2D Canopy Height Model to derive tree locations.
The analysis was performed across four distinct plots representing different forest structures, ranging from clearcuts with isolated trees to dense, complex conifer stands.

## Workflow Summary
1. Four plots were extracted from LAS tiles using a 77 m radius. Heights were normalized using a 2 m resolution DEM, and outliers outside the 0–65 m range were removed.
2. The `li2012` algorithm was applied to all plots. This "top-down" approach begins classification at the treetops, where increased point spacing makes it easier to separate individual crowns.
3. For CHM-based detection, a `pit-free` algorithm was used for Plot 1 (0.5 m resolution), while Plot 2 was tested across various resolutions (0.5 m, 2 m, 4 m, and 10 m) to observe the impact of scale.
4. Treetops were identified using a Local Maximum Filter (LMF). These locations served as seeds for the `dalponte2016` algorithm, which segments the forest by "growing" trees from these points based on height thresholds.

## Key Visual Outputs

### 3D segmentation maps for all 4 plots
@pointcloud(/archive-posts/images/Plot1.html)

@pointcloud(/archive-posts/images/Plot2.html)

@pointcloud(/archive-posts/images/Plot3.html)

@pointcloud(/archive-posts/images/Plot4.html)

### Treetop detection with Plot 1 CHM
![Treetop Plot 1](/archive-posts/images/treetop.png)

### Treetop detection with Plot 2 CHM at the optimal resolution
![Treetop Plot 2 2m](/archive-posts/images/treetop_plot2.png)

### RGL visualizations demonstrating the final segmented tree objects with the optimal resolution
@pointcloud(/archive-posts/images/Plot2_2m.html)

## Reflection
- It was concludes that 2 m spatial resolution is the optimal choice for segmentation across the MKRF.
- Finer resolutions (0.5 m) often fail by capturing small gaps between branches, leading to unassigned "grey" points. Conversely, coarser resolutions (4 m and 10 m) result in "under-segmentation," where multiple treetops are blurred into a single pixel or artificial plateaus are created, incorrectly splitting single trees into multiple IDs. But resolution selection depends on the characteristics of different types of forests.
- While the `li2012` algorithm is highly effective in complex mixed conifer forests (like Plots 3 and 4), it is less suited for sparsely distributed trees in clearcuts (Plot 1).
