# Project overview
This project uses a digital elevation model (DEM) of Vancouver Island to derive and analyze a stream network for identifying Pacific salmon spawning habitat. By integrating hydrology tools, linear referencing, and network tracing in ArcGIS Pro, the analysis maps stream segments as accessible or inaccessible from the ocean based on dam barriers, stream order, and slope gradient.

## Key Steps of Map Creation
1. Prepare and clean the DEM
Clip the Vancouver Island DEM to the island boundary using "Clip Raster." This removes surrounding islands and noise from the analysis.
2. Derive the stream network
Run Flow Direction → Flow Accumulation → apply a threshold of ≥1,000 cells using the "Con" tool → Stream Link → Stream to Feature. This converts elevation data into a usable stream polyline network.
3. Build stream routes and identify junctions
Convert stream polylines to routes ("Create Routes"), then use topology rules to extract two critical point layers: where dams intersect streams (stream_dam_junctions) and where streams meet the ocean boundary (stream_ocean_junctions).
4. Calculate and classify stream attributes
Compute slope from the DEM, extract it along stream cells only ("Extract by Mask"), then reclassify: slopes < 20% = 1, ≥20% = 0. Do the same for stream order. Use "Locate Features Along Routes" to attach both attributes to the route event tables.
5. Trace the network
Run the "Trace" tool using ocean junctions as starting points and dam junctions as barriers. Flag each route as REACHED = 1 (accessible from ocean) or REACHED = 0 (blocked by dam).
6. Overlay and query for salmon habitat
Use "Overlay Route Events" to combine the gradient and stream order event tables, join the REACHED field, then query for segments that are: reachable from the ocean, 1st or 2nd order, and gradient ≤ 20% → export as accessible_salmon_habitat. Repeat with REACHED = 0 for inaccessible_salmon_habitat.
7. Clip to conservation unit and compose the final map
Clip both habitat layers to your chosen conservation unit. The final map panel shows stream routes symbolized by reachability, dams as barriers, accessible vs. inaccessible habitat, and a zoomed-in inset of Lake Cowichan.

## Key output
The details about the project is illustrated in the academic poster below.
![Chinook Habitat Network](/archive-posts/images/stream-routes.jpg)

# Reflection
- This project demonstrated how a single DEM can generate an entire stream network through sequential raster operations (flow direction → flow accumulation → stream links), reinforcing how foundational data quality cascades through every downstream output.
- Understood the significance of the flow accumulation threshold in defining what counts as a "stream," and how this parameter choice directly affects network density and analytical results.
- Developed practical experience with topology as a quality control tool, using intersection rules to precisely locate dam and ocean junctions rather than manually identifying them.
