export const archiveSettings = {
  title: "Academic Archive",
  subtitle:
    "A searchable archive of degree projects, outputs, and reflections grouped by theme and demonstrated skills.",
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
    slug: "remote-sensing-land-cover-change",
    title:
      "Climate-Driven Change in Vertical Vegetation Stratification on Mount Everest",
    date: "2024-04-10",
    degree: "BA Environment & Sustainability",
    course: "GEOS 373 Remote Sensing",
    theme: "Remote Sensing",
    keySkills: ["ENVI", "Landsat", "Change Detection", "Team Research"],
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
    slug: "son-preference",
    title: "Mapping Son Preference Patterns in China Using 2020 Census Data",
    date: "2024-04-08",
    degree: "BA Environment & Sustainability",
    course: "Cartography",
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
    course: "GIS Project",
    theme: "Geospatial Analysis",
    keySkills: [
      "ArcGIS Pro",
      "Academic Writing",
      "Data Visualization",
      "Research",
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
  "Remote Sensing",
  "Cartography",
  "Geospatial Analysis",
];
