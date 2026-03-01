export const archiveSettings = {
  title: "Academic Archive",
  subtitle:
    "A searchable archive of course projects, lab outputs, and reflections grouped by theme and demonstrated skills.",
  includePrivateByDefault: false,
};

const toTag = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const withAutoTags = (post) => {
  const autoTagSources = [post.theme, ...(post.keySkills || [])];
  const autoTagEntries = autoTagSources
    .map((source) => ({ value: toTag(source), label: source }))
    .filter((entry) => entry.value);

  const manualTagEntries = (post.tags || [])
    .map((entry) => {
      if (typeof entry === "string") {
        return {
          value: toTag(entry),
          label: post.tagLabels?.[toTag(entry)] || entry,
        };
      }

      const value = toTag(entry.value || entry.label || "");
      return {
        value,
        label: entry.label || entry.value || value,
      };
    })
    .filter((entry) => entry.value);

  const mergedTagLabels = [...autoTagEntries, ...manualTagEntries].reduce(
    (acc, entry) => {
      acc[entry.value] = entry.label;
      return acc;
    },
    {}
  );

  return {
    ...post,
    tags: Object.keys(mergedTagLabels),
    tagLabels: mergedTagLabels,
  };
};

export const archivePosts = [
  withAutoTags({
    slug: "supervised-image-classification",
    title: "Supervised Landsat Image Classification with Accuracy Assessment",
    date: "2025-11-01",
    degree: "Master of Geomatics for Environmental Management",
    course: "GEM 520 Remote Sensing for Ecosystem Management",
    theme: "Remote Sensing",
    keySkills: [
      "R",
      "Landsat",
      "Supervised Classification",
      "Accuracy Assessment",
    ],
    tags: [
      {
        value: "mgem",
        label: "MGEM",
      },
    ],
    markdownPath: "/archive-posts/supervised-image-classification.md",
    outputs: [
      {
        label: "Classified Land-Cover Map",
        note:
          "A supervised land-cover map produced from Landsat 9 imagery and validated with held-out polygon samples.",
      },
      {
        label: "Accuracy Summary",
        note:
          "Confusion-matrix-based validation including overall, producer, and user accuracy metrics.",
      },
    ],
    isPrivate: false,
  }),
  withAutoTags({
    slug: "r-lidar",
    title: "R LiDAR Forest Attribute Modeling and Raster Products",
    date: "2026-02-05",
    degree: "Master of Geomatics for Environmental Management",
    course: "GEM 521",
    theme: "Remote Sensing",
    keySkills: ["R", "LiDAR", "Raster Processing", "Statistical Modeling"],
    tags: [
      {
        value: "mgem",
        label: "MGEM",
      },
    ],
    markdownPath: "/archive-posts/r-lidar.md",
    outputs: [
      {
        label: "DEM and CHM Products",
        note:
          "Terrain and canopy raster outputs generated from AFRF LiDAR tiles in R.",
      },
      {
        label: "Forest Attribute Maps",
        note:
          "Mapped dominant tree height and above-ground biomass predictions from plot-driven models.",
      },
    ],
    isPrivate: false,
  }),
  withAutoTags({
    slug: "stream-management",
    title: "Riparian Management Area Delineation in the Nahmint Watershed",
    date: "2026-02-13",
    degree: "Master of Geomatics for Environmental Management",
    course: "GEM 511 Advanced GIS for Environmental Management",
    theme: "Hydrological Modeling",
    keySkills: [
      "ArcGIS Pro",
      "DEM Processing",
      "Hydrological Modeling",
      "Python",
    ],
    tags: [
      {
        value: "mgem",
        label: "MGEM",
      },
    ],
    markdownPath: "/archive-posts/stream-management.md",
    outputs: [
      {
        label: "Riparian Management Map",
        note:
          "A map product delineating reserve and management buffers for BC stream classes across the Nahmint watershed.",
      },
    ],
    isPrivate: false,
  }),
  withAutoTags({
    slug: "stream-network-analysis",
    title:
      "Pacific Salmon Habitat Accessibility Mapping from Stream-Network Analysis",
    date: "2026-01-31",
    degree: "Master of Geomatics for Environmental Management",
    course: "GEM 511 Advanced GIS for Environmental Management",
    theme: "Hydrological Modeling",
    keySkills: [
      "ArcGIS Pro",
      "DEM Processing",
      "Network Analysis",
      "Habitat Mapping",
    ],
    tags: [
      {
        value: "mgem",
        label: "MGEM",
      },
    ],
    markdownPath: "/archive-posts/stream-network-analysis.md",
    outputs: [
      {
        label: "Chinook Habitat Network Poster",
        note:
          "A map-based analysis identifying stream segments that are accessible and inaccessible for salmon spawning habitat.",
      },
    ],
    isPrivate: false,
  }),
  withAutoTags({
    slug: "ubc-flower-map",
    title: "UBC Spring Flowering Trees Distribution Map",
    date: "2025-09-20",
    degree: "Master of Geomatics for Environmental Management",
    course: "GEM 510 GIS for Forestry and Conservation",
    theme: "GIS & Cartography",
    keySkills: ["ArcGIS Pro", "PostgreSQL", "SQL", "Cartography"],
    tags: [
      {
        value: "mgem",
        label: "MGEM",
      },
    ],
    markdownPath: "/archive-posts/ubc-flower-map.md",
    outputs: [
      {
        label: "Campus Flower Map",
        note:
          "A campus-wide spring flowering tree map produced from UBC tree inventory data.",
      },
    ],
    isPrivate: false,
  }),
  withAutoTags({
    slug: "flower-power",
    title: "Flower Power: Decoding Chocolate Lily's Climate Response",
    date: "2025-04-10",
    degree: "BA Environment & Sustainability",
    course: "GEOS 407 Vegetation Dynamics",
    theme: "Ecological Data Analysis",
    keySkills: ["R", "ClimateNA", "Phenology", "Teamwork"],
    tags: [
      {
        value: "ba-environment-sustainability",
        label: "BA Environment & Sustainability",
      },
    ],
    markdownPath: "/archive-posts/flower-power.md",
    outputs: [
      {
        label: "Academic Poster",
        note:
          "Poster summarizing chocolate lily flowering-time shifts against historical climate variables.",
      },
    ],
    isPrivate: false,
  }),
  withAutoTags({
    slug: "remote-sensing-land-cover-change",
    title:
      "Climate-Driven Change in Vertical Vegetation Stratification on Mount Everest",
    date: "2024-04-10",
    degree: "BA Environment & Sustainability",
    course: "GEOS 373 Remote Sensing",
    theme: "Remote Sensing",
    keySkills: ["ENVI", "Landsat", "Change Detection", "Teamwork"],
    tags: [
      {
        value: "ba-environment-sustainability",
        label: "BA Environment & Sustainability",
      },
    ],
    markdownPath: "/archive-posts/remote-sensing-land-cover-change.md",
    outputs: [
      {
        label: "Academic Poster",
        note:
          "Poster visualizing multi-temporal Landsat analysis and vegetation-zone change on Mount Everest's southern slope.",
      },
    ],
    isPrivate: false,
  }),
  withAutoTags({
    slug: "r-fire-recovery",
    title: "R Post-Fire Recovery Analysis",
    date: "2025-12-05",
    degree: "Master of Geomatics for Environmental Management",
    course: "MGEM Independent Analysis",
    theme: "Ecological Data Analysis",
    keySkills: [
      "R",
      "Time Series",
      "Data Visualization",
      "Ecological Monitoring",
    ],
    tags: [
      {
        value: "mgem",
        label: "MGEM",
      },
    ],
    markdownPath: "/archive-posts/r-fire-recovery.md",
    outputs: [
      {
        label: "Post-Fire Recovery Trajectory",
        note:
          "Primary recovery trend figure generated in R (image: unnamed-chunk-13-1.png).",
      },
      {
        label: "Recovery Phase Comparison",
        note:
          "Comparative post-fire phase output generated in R (image: unnamed-chunk-17-1.png).",
      },
    ],
    isPrivate: false,
  }),
  withAutoTags({
    slug: "r-time-series",
    title: "R Time-Series Trend and Seasonality Analysis",
    date: "2025-11-14",
    degree: "Master of Geomatics for Environmental Management",
    course: "MGEM Independent Analysis",
    theme: "Ecological Data Analysis",
    keySkills: ["R", "Time Series", "Trend Analysis", "Data Visualization"],
    tags: [
      {
        value: "mgem",
        label: "MGEM",
      },
    ],
    markdownPath: "/archive-posts/r-time-series.md",
    outputs: [
      {
        label: "Trend Visualization",
        note:
          "Core trend output from the R workflow (image: unnamed-chunk-4-1.png).",
      },
      {
        label: "Seasonal Decomposition",
        note:
          "Seasonality/decomposition output from the R workflow (image: unnamed-chunk-5-1.png).",
      },
    ],
    isPrivate: false,
  }),
  withAutoTags({
    slug: "gem521-lab3-ellen-wu",
    title: "GEM 521 Lab 3",
    date: "2025-11-21",
    degree: "Master of Geomatics for Environmental Management",
    course: "GEM 521",
    theme: "Ecological Data Analysis",
    keySkills: ["R", "Statistical Analysis", "Data Visualization"],
    tags: [
      {
        value: "mgem",
        label: "MGEM",
      },
    ],
    markdownPath: "/archive-posts/gem521-lab3-ellen-wu.md",
    outputs: [
      {
        label: "Output 1 — Main Analytical Figure",
        note: "Placeholder ready: /archive-posts/images/lab3-output-1.png",
      },
      {
        label: "Output 2 — Supporting Map/Plot",
        note: "Placeholder ready: /archive-posts/images/lab3-output-2.png",
      },
    ],
    isPrivate: false,
  }),
  withAutoTags({
    slug: "gem521-lab4-ellen-wu",
    title: "GEM 521 Lab 4",
    date: "2025-11-28",
    degree: "Master of Geomatics for Environmental Management",
    course: "GEM 521",
    theme: "Ecological Data Analysis",
    keySkills: ["R", "Statistical Analysis", "Data Visualization"],
    tags: [
      {
        value: "mgem",
        label: "MGEM",
      },
    ],
    markdownPath: "/archive-posts/gem521-lab4-ellen-wu.md",
    outputs: [
      {
        label: "Output 1 — Main Analytical Figure",
        note:
          "Primary analytical output documented in the GEM 521 Lab 4 report.",
      },
      {
        label: "Output 2 — Supporting Map/Plot",
        note:
          "Supporting figure/table reported alongside the main Lab 4 result.",
      },
    ],
    isPrivate: false,
  }),
  withAutoTags({
    slug: "son-preference",
    title: "Mapping Son Preference Patterns in China Using 2020 Census Data",
    date: "2024-04-08",
    degree: "BA Environment & Sustainability",
    course: "GEOS 372 Cartography",
    theme: "Cartography",
    keySkills: [
      "ArcGIS Pro",
      "Data Visualization",
      "Thematic Mapping",
      "Adobe Illustrator",
    ],
    tags: [
      {
        value: "ba-environment-sustainability",
        label: "BA Environment & Sustainability",
      },
    ],
    markdownPath: "/archive-posts/son-preference.md",
    outputs: [
      {
        label: "Provincial Son-Preference Map",
        note:
          "A province-level thematic map showing sex-ratio-at-birth patterns for second and later children in China.",
      },
    ],
    isPrivate: false,
  }),
  withAutoTags({
    slug: "pedestrians-collisions-toronto",
    title:
      "Analysis of Pedestrians-Involved Collisions In the Toronto Downtown Area",
    date: "2022-12-08",
    degree: "BA Environment & Sustainability",
    course: "GEOS 270 Geographical Sciences",
    theme: "Geospatial Analysis",
    keySkills: [
      "ArcGIS Pro",
      "Academic Writing",
      "Data Visualization",
      "Teamwork",
    ],
    // Manual tags let you control archive filters per post.
    // Use strings ("envi") or objects ({ value: "envi", label: "ENVI" }).
    // They are merged with auto-tags from `theme` and `keySkills` in withAutoTags().
    tags: [
      {
        value: "ba-environment-sustainability",
        label: "BA Environment & Sustainability",
      },
    ],
    markdownPath: "/archive-posts/pedestrians-collisions-toronto.md",
    outputs: [
      {
        label: "Collision Density Maps",
        note:
          "Population density and collision-density comparison maps for Toronto and downtown focus areas.",
      },
      {
        label: "Road-Type and Signal Analysis Figures",
        note:
          "Charts and maps summarizing collision risk by arterial class, time, and signalized intersections.",
      },
    ],
    isPrivate: false,
  }),
];

export const themeOrder = [
  "Hydrological Modeling",
  "Ecological Data Analysis",
  "Remote Sensing",
  "Cartography",
  "Geospatial Analysis",
];
