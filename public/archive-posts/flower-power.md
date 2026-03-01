# Project overview
This project is the culmination of my GEOS 407: Vegetation Dynamics: Disturbance, Climate and Human Impacts, which was taken in 2024 Winter Term 2 during my undergrad study. Collaborating with my classmates Kati Hruska and Julie Stewart, we took a close study of a species called chocolate lily (Fritillaria affinis) and studied its phenological response to the changing climate. Collecting data from ClimateNA and the herbarium data from UBC Beaty Biodiversity Museum, we utilized R to decode the species' flowering shift.

## Testable Hypothesis
The flowering date of Fritillaria affinis (chocolate lily) is getting earlier in the year because of increased temperature and increased precipitation.

## Methods
To test our hypothesis that temperature anomalies influence the flowering time of Fritillaria affinis species, we will analyze previously published herbarium data alongside climate data.
1. Data sources:
We used Fritillaria affinis specimen data from the UBC Herbarium, specifically the day of year of collection, latitude and longitude, and phenological stage (flowering and potentially fruiting or not). This dataset has been previously analyzed for phenological stages by UBC GEOS 407 students. Climate data corresponding to each specimen’s collection year and location were obtained from ClimateNA, including key variables such as temperature and precipitation.

2. Data collection and processing:
The Fritillaria affinis herbarium records were collected and archived at the UBC Herbarium. Species metadata, such as DOY and phenological stage were recorded at the time of collection or analyzed and added at a later time. ClimateNA provides high-resolution climate data based on geographical coordinates and historic climate models. We extracted relevant climate variables corresponding to the collection year and location of each herbarium specimen. These datasets will be merged into a single CSV file for analysis.

3. Data analysis:
We imported the merged dataset into R for statistical analysis. A linear regression model was applied to test for correlations between each selected climate variable and the DOY of collection, assessing how climate conditions influence the phenology of Fritillaria affinis.

## Key Output - Academic Poster
The details about the project is illustrated in the academic poster below.
![Decoding Chocolate Lily's Climate Response](/archive-posts/images/flower-power.png)

# Reflection
- This project investigated how temperature anomalies influence the flowering time of Fritillaria affinis by integrating herbarium specimen data from the UBC Herbarium with historical climate data extracted from ClimateNA. 
- Right before entering MGEM, this project provided me a unique experience utilizing R for data analysis. Linear regression models were applied to assess the relationship between key climate variables and day-of-year collection records, providing a statistical lens into how shifting climate conditions drive phenological change. 
- The project strengthened my ability to merge and process multi-source datasets and apply quantitative methods to answer real-world ecological questions.
