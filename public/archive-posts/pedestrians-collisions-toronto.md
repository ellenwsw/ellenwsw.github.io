# Project Overview
Collaborating with my classmates Kenny Zheng and Tom Wang, we utilized geoprocessing tools and Model Builder in ArcGIS Pro to analyze pedestrian-involved collisions in downtown Toronto from 2015 to 2020. Our goal was to identify the primary causes and locations of these collisions and propose potential solutions to reduce their frequency.

## 1. Introduction
In an increasingly crowded and busier metropolitan area nowadays, the possibility of traffic accidents is increasing. And due to the increasingly large number of vehicles running on the roads every day, pedestrians have a higher risk of being seriously harmed in collisions. Our project focused primarily on analyzing data from traffic collisions involving pedestrians in the Greater Toronto Area from 2015 to 2020; we then narrowed our focus area to the Toronto Downtown area based on our findings. We aim to understand the most dangerous roads and intersections for pedestrians and the causes, such that our report could be potentially useful for cities in the Toronto Downtown area to change and improve their current local traffic planning, for the purpose of creating a safer traffic environment for both drivers and pedestrians.

We have our first assumption before conducting the analysis: population density is positively correlated with collisions. In other words, the higher the population density, the higher the number of collisions in the corresponding region. We will start with this assumption.

## 2. Methods
- Prepare: download all the required datasets above from each portal, and import all the feature classes into the project.
- Compute population density: use Add a new field in the attribute table of the Population_DA layer, use Calculate Field to calculate population density and use Graduated Color – Natural Breaks to symbolize the field of Population_Density on the map. We will compare these two factors later because there is a relationship between population density and collision density.
- Sort out the collision data between 2015 and 2020: use Select Layer by Attribute and Export Feature to select the attributes with YEAR equal or greater than 2015. Because the original dataset has a 15-year-long time frame, which is too long to compare with a single year of population density. It is best to shorten the time frame to match a more accurate population density.
- Compute collision density and compare with population density: use Kernel Density tool, input Pedestrians_Accidents_2015_to_2020, then compare the new layer with population density, export two maps as comparison (*Result 3.1*).
- Compare road type with collision distribution: use Select Layer by Attribute and Export Feature in regards to Major Arterial. Because we found that there is a relationship between road type and collision distribution, we would be using this new layer to compare with the overall collision distribution (*Result 3.3*).
- Narrow down our focusing area: Reclassify the raster layer, use Select Layer by Attribute then use Raster to Polygon to select the areas with the highest Kernel density of collisions, then use Clip tool to cut out our focusing area separately. Because we found that there is a very high density of pedestrians-involved collisions within the Downtown Toronto area due to its high population density, we would focus only on the highest-density areas for further analysis.
- Narrow down our focusing attribute: use Select Layer by Attribute to select the attributes of both collision and traffic signal layers in regards to arterial roads and LPI information about traffic signals. Because based on our previous findings, there is a relationship between road type and collision distribution, and a large amount of collisions have happened at traffic signals. We will be focusing more on these two attributes.
- Find out relationship between no LPI signals and downtown collisions: use Select Layer by Location and set criteria as “within 2 meters” then Export Feature and create map, draw on conclusions based on the map (*Result 3.4*).

## 3. Results and Discussion
### 3.1 Relationship between Population Density and Pedestrians-Involved Collisions Density
Areas with a higher population density lead to a higher number of pedestrian-involved collisions. The map below (Figure 3.1.1) shows that most collisions occurred in areas with high population density.
![Figure 3.1.1](/archive-posts/images/Figure-3.1.1.jpg)

We noticed that the Toronto downtown area has a higher density of pedestrian-involved collisions (Figure 3.1.2). Based on the Figure 3.1.1, high population density in downtown area could be one cause of the high density of pedestrian-involved collisions. Downtown houses the city’s economic, financial, and recreational hubs, and the dense streams of commuters and vehicles result in a high concentration of pedestrian-involved collisions.
![Figure 3.1.2](/archive-posts/images/Figure-3.1.2.jpg)

### 3.2 Relationship between Time and Pedestrians-Involved Collisions
We analyzed the time of pedestrian-involved collisions (Figure 3.2.1). Generally, most collisions occur at night. The limited vision could be one of the causes. Besides, the high peak hour pedestrian and vehicle flow (especially around 4–8 p.m.) could increase the risk of the occurrence of pedestrian-involved collisions.
![Figure 3.2.1](/archive-posts/images/Figure-3.2.1.png)

### 3.3 Relationship between Road Type and Pedestrians-Involved Collisions
We speculate that the major arterial may have a higher risk of pedestrian-involved collisions. From the bar chart we created (Figure 3.3.1), we found that most of the pedestrian-involved collisions took place in major arterials, with a percentage of 72.119%. It fits our speculation.
![Figure 3.3.1](/archive-posts/images/Figure-3.3.1.jpg)

The map we created also showed that major arterial has a higher risk of pedestrian-involved collisions (Figure 3.3.2). We speculate that pedestrian-involved collisions are highly determined by vehicle speed, compared with non arterial roads. Before 2020, the speed limit on major arterial roads in Toronto was set at 60 km/h. Vehicle speeds exceeding 20 mph (32.19 km/h) are likely to increase the number of pedestrian collisions and fatalities (Quistberg et al., 2015). It is believed that speed is one of the important factors that lead to a high amount of pedestrian-involved collisions in major arterial in the Greater Toronto Area.

Speed can explain why most of the collisions took place on major arterials. Furthermore, we found that, among all of the pedestrians-involved collisions that took place in the Greater Toronto Area’s arterials, it showed clustering in downtown Toronto arterials (Figure 3.3.2). High pedestrian activity in the downtown area can be one of the factors. In addition, according to Quistberg et al. (2015), intersections with four or more segments had higher pedestrian collision rates. In the downtown Toronto area, there is a great amount of arterial intersections that lead to various segments. And that explained why the collisions among all of the arterials show clustering in the downtown Toronto area.
![Figure 3.3.2](/archive-posts/images/Figure-3.3.2.jpg)

### 3.4 How Traffic Signal Affects Pedestrians-Involved Collisions
From the bar chart we made (Figure 3.4.1), it’s clear that pedestrians are at a high risk of getting hit at the intersections of major roads with traffic lights. The reason might be that there is a higher volume of both pedestrians and vehicles on the arterial roads, and most intersections on arterial roads are installed with traffic signals. The higher volume leads to a higher rate of pedestrian-involved accidents near traffic signals. By looking at the data closely, we found that some pedestrians were hit at intersections with or without the right of way when vehicles were turning left.
![Figure 3.4.1](/archive-posts/images/Figure-3.4.1.jpg)

In the attribute table of the traffic signal layer, we found information about LPI. Leading Pedestrian Interval (LPI) is signal timing that allows pedestrian movement before vehicular movement. It is suggested that implementation of the leading pedestrian interval (LPI) has been recommended as a strategy for reducing pedestrian–vehicle crashes at signalized intersections (Fayish and Gross, 2010). And the City of Toronto has widely installed LPI systems on traffic signals, but with some exceptions or delays.

By selecting pedestrian-vehicle crashes near locations of traffic signals, we found that there are three locations with records of pedestrian accidents but a lack of LPI at any direction of crossovers as shown below. These locations include the intersection of Bathurst St.- Richmond St. W in Toronto downtown, intersection of Parliament St.- Shuter St. in East York, and intersection of Carlton St. – Sherbourne St. in East York (Figure 3.4.2).
![Figure 3.4.2](/archive-posts/images/Figure-3.4.2.jpg)

## 4. Error and Uncertainty
Because traffic accidents are typically integrated outcomes with multiple factors correlated, determining a single cause of certain accidents may be sloppy. Further, the officially recorded data included issues like pedestrian-involved collisions that were underreported. These factors may impact the findings of our study.

## 5. Conclusions
According to the data collected from the City of Toronto – Open Data Catalog, the Toronto Police Service Public Safety Data Portal, and Simply Analytics, the city of Toronto has a population of around five million. First, we chose to reduce the time period for pedestrian collision data from 2006-2020 to 2015-2020. Because the statistics from 2006 to 2015 are no longer applicable. During this time period, the Greater Toronto Area experienced considerable infrastructural developments and demographic shifts. To get a more accurate result, it is essential to exclude the out-of-date date.

Second, we compared the population density with the pedestrian collision density and found that they are positively correlated, indicating that they are closely associated. In addition, we investigated the hour of Pedestrian Collisions and found that accidents occur more often during rush hours and at night. Thirdly, we constructed another bar graph depicting the proportion of pedestrian accidents that occurred on various road classes. Major arterial roads and major arterial ramps were involved in almost three-quarters of the accidents. In addition to having more people and more traffic, the speed limit on major arterial roads and ramps is higher.

We have concluded that some of the collisions happened at intersections with or without the right of way when vehicles were turning left. Our Figure 3.4.2 shows three locations without a Leading Pedestrian Interval (LPI) installed where accidents have been recorded. By introducing LPI or other similar alternative methods (e.g. button-activated LPI), it could potentially reduce the risk of pedestrian-vehicle collisions. Future studies can be done by comparing accident rate of intersections with or without LPI installed.

## Reference
City of Toronto – Open Data Catalog. (2019, July 23). About sidewalk inventory. Retrieved from https://open.toronto.ca/dataset/sidewalk-inventory/

City of Toronto – Open Data Catalog. (2022, October 29). About traffic signals. Retrieved from https://open.toronto.ca/dataset/traffic-signals-tabular/

Fayish, A. C., & Gross, F. (2010). Safety effectiveness of leading pedestrian intervals evaluated by a before–after study with comparison groups. Transportation Research Record: Journal of the Transportation Research Board, 2198(1), 15–22. https://doi.org/10.3141/2198-03

Open data catalogue. City of Toronto Open Data Portal. (n.d.-b). https://open.toronto.ca/catalogue/

Quistberg, D. A., Howard, E. J., Ebel, B. E., Moudon, A. V., Saelens, B. E., Hurvitz, P. M., Curtin, J. E., & Rivara, F. P. (2015). Multilevel models for evaluating the risk of pedestrian–motor vehicle collisions at intersections and mid-blocks. Accident Analysis & Prevention, 84, 99–111. https://doi.org/10.1016/j.aap.2015.08.013.

Statistics Canada. (2018, September 17). Dissemination area: Detailed definition. Retrieved from https://www150.statcan.gc.ca/n1/pub/92-195-x/2011001/geo/da-ad/def-eng.htm

Toronto Police Service. (2021, May 5). Pedestrians. Retrieved from https://data.torontopolice.on.ca/datasets/TorontoPS::pedestrians/about

# Reflection
- This is my first GIS project ever, completed during my second bachelor's degree at UBC. Looking back, I can identify numerous limitations and areas for improvement.
- Collaboration and teamwork are essential for success. To work together effectively and efficiently, we employed several strategies, including dividing and assigning tasks in detail and creating sub-tasks to address key milestones of the project.
- ArcGIS Pro is a versatile tool, excelling in both geoprocessing and data analysis. Its built-in ModelBuilder allows for process automation and simplifies making small adjustments without requiring a complete overhaul or rerunning the entire workflow.
- GIS is an interdisciplinary field that requires knowledge from various areas, including statistics and coding. Therefore, acquiring technical skills and knowledge from other disciplines and perspectives is crucial for success in GIS. It is essential to become a lifelong learner.
