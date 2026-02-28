/* Change this file to get your personal Portfolio */

// Website related settings
const settings = {
  isSplash: true, // Change this to false if you don't want Splash screen.
};

//SEO Related settings
const seo = {
  title: "Ellen's E-Portfolio",
  description:
    "A soon-to-be MGEM graduate, a multi-disciplinary lifelong learner, a GISer, a trilingual, and a feminist",
  og: {
    title: "Ellen Wu E-Portfolio",
    type: "website",
    url: "http://ashutoshhathidara.com/",
  },
};

//Home Page
const greeting = {
  title: "Ellen Wu",
  logo_name: "Ellen Wu",
  subTitle:
    "A soon-to-be UBC MGEM graduate, a multi-disciplinary lifelong learner, a GISer, a trilingual, and a feminist.",
  portfolio_repository: "https://github.com/ellenwsw/E-Portfolio",
};

const socialMediaLinks = [
  /* Your Social Media Link */
  // github: "https://github.com/ellenwsw",
  // linkedin: "https://www.linkedin.com/in/sw-ellen/",
  // gmail: "ellenwushangwei@hotmail.com",

  {
    name: "Github",
    link: "https://github.com/ellenwsw",
    fontAwesomeIcon: "fa-github", // Reference https://fontawesome.com/icons/github?style=brands
    backgroundColor: "#181717", // Reference https://simpleicons.org/?q=github
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/sw-ellen/",
    fontAwesomeIcon: "fa-linkedin-in", // Reference https://fontawesome.com/icons/linkedin-in?style=brands
    backgroundColor: "#0077B5", // Reference https://simpleicons.org/?q=linkedin
  },
  {
    name: "email",
    link: "mailto:ellenwushangwei@gmail.com",
    fontAwesomeIcon: "fa-google", // Reference https://fontawesome.com/icons/envelope?f=classic&s=solid
    backgroundColor: "#ff0000", // Reference https://simpleicons.org/?q=gmail
  },
];

const skills = {
  data: [
    {
      title: "Remote Sensing & Environmental Analysis",
      titleStyle: {
        fontSize: "40px",
        textAlign: "center",
      },
      fileName: "DataScienceImg",
      skills: [
        "⚡ Processing and analyzing satellite and aerial imagery using Google Earth Engine and ESRI platforms to monitor land cover change, vegetation health, and other environmental indicators at scale",
        "⚡ Automating geospatial and environmental data workflows using Python and R, from raw data ingestion through to statistical analysis and visualization",
        "⚡ Conducting field surveys to collect ground-truth environmental data, combining in-situ observations with remote sensing outputs to validate and enrich spatial analysis",
      ],
      softwareSkills: [
        {
          skillName: "Python",
          fontAwesomeClassname: "vscode-icons:file-type-python",
          style: {
            backgroundColor: "transparent",
            color: "#3776AB",
          },
        },
        {
          skillName: "R",
          fontAwesomeClassname: "simple-icons:r",
          style: {
            backgroundColor: "transparent",
            color: "#3776AB",
          },
        },
        {
          skillName: "ESRI",
          fontAwesomeClassname: "simple-icons:esri",
          style: {
            color: "#000000",
          },
        },
        {
          skillName: "Google Earth Engine",
          fontAwesomeClassname: "simple-icons:googleearthengine",
          style: {
            color: "#4285F4",
          },
        },
      ],
    },
    {
      title: "Cartography & Geospatial Reporting",
      titleStyle: {
        fontSize: "40px",
        textAlign: "center",
      },
      fileName: "FullStackImg",
      skills: [
        "⚡ Designing clear, visually compelling maps and infographics using Adobe Illustrator to communicate spatial data to both technical and general audiences",
        "⚡ Performing spatial queries, geoprocessing, and geographic modeling using ArcGIS and QGIS",
        "⚡ Combining cartographic design principles with analytical tools to produce publication-ready map products and spatial reports",
        "⚡ Presenting spatial findings to diverse audiences, translating complex geospatial information into clear, accessible reports that support informed decision-making"
      ],
      softwareSkills: [
        {
          skillName: "Adobe Illustrator",
          fontAwesomeClassname: "vscode-icons:file-type-ai",
          style: {
            color: "#FF9A00",
          },
        },
        {
          skillName: "ArcGIS Pro",
          fontAwesomeClassname: "simple-icons:arcgis",
          style: {
            color: "#2C7AC3",
          },
        },
        {
          skillName: "QGIS",
          fontAwesomeClassname: "simple-icons:qgis",
          style: {
            color: "#589632",
          },
        },
      ],
    },
  ],
};

// Education Page
const competitiveSites = {
  competitiveSites: [
    {
      siteName: "LeetCode",
      iconifyClassname: "simple-icons:leetcode",
      style: {
        color: "#F79F1B",
      },
      profileLink: "https://leetcode.com/layman_brother/",
    },
    {
      siteName: "HackerRank",
      iconifyClassname: "simple-icons:hackerrank",
      style: {
        color: "#2EC866",
      },
      profileLink: "https://www.hackerrank.com/layman_brother",
    },
    {
      siteName: "Codechef",
      iconifyClassname: "simple-icons:codechef",
      style: {
        color: "#5B4638",
      },
      profileLink: "https://www.codechef.com/users/ashutosh_1919",
    },
    {
      siteName: "Codeforces",
      iconifyClassname: "simple-icons:codeforces",
      style: {
        color: "#1F8ACB",
      },
      profileLink: "http://codeforces.com/profile/layman_brother",
    },
    {
      siteName: "Hackerearth",
      iconifyClassname: "simple-icons:hackerearth",
      style: {
        color: "#323754",
      },
      profileLink: "https://www.hackerearth.com/@ashutosh391",
    },
    {
      siteName: "Kaggle",
      iconifyClassname: "simple-icons:kaggle",
      style: {
        color: "#20BEFF",
      },
      profileLink: "https://www.kaggle.com/laymanbrother",
    },
  ],
};

const degrees = {
  degrees: [
    {
      title: "University of British Columbia",
      subtitle: "Master of Geomatics for Environmental Management (MGEM)",
      logo_path: "MGEM_logo.jpg",
      alt_name: "UBC MGEM",
      duration: "2025 - 2026",
      descriptions: [
        "⚡ Developed advanced geospatial programming skills through applied coursework, using Python for spatial data analysis and automation and R for remote sensing analysis and statistical modeling.",
        "⚡ Gained hands-on experience with GIS technologies and methodologies, including cloud-based platforms, spatial data science workflows, and environmental monitoring techniques.",
        "⚡ Completed a capstone project leveraging GPS location tracking data to model and forecast cattle habitat preferences.",
      ],
    },
    {
      title: "University of British Columbia",
      subtitle:
        "Bachelor of Arts in Environment and Sustainability, Minor in GIS",
      logo_path: "ubc_logo.png",
      alt_name: "University of British Columbia",
      duration: "2022 - 2025",
      descriptions: [
        "⚡ Built a foundational understanding of environmental management strategies, sustainability frameworks, and policy development, exploring how governance and planning shape environmental outcomes.",
        "⚡ Gained introductory knowledge in GIS and spatial thinking, establishing the groundwork for further technical development in geospatial analysis and mapping.",
        "⚡ Studied core concepts in biogeography, ecology, and species diversity, developing an understanding of how environmental systems function and how biodiversity is distributed across landscapes.",
      ],
    },
    {
      title: "University of Alberta",
      subtitle: "Bachelor of Commerce in Business Economics and Law",
      logo_path: "ua_logo_green_rgb.png",
      alt_name: "University of Alberta",
      duration: "2015 - 2019",
      descriptions: [
        "⚡ Developed a broad understanding of how businesses operate, spanning accounting, marketing, and economics, building a well-rounded foundation in commercial thinking and decision-making.",
        "⚡ Gained working knowledge of core business disciplines including financial principles and business communication, with experience presenting complex information clearly to professional audiences.",
        "⚡ Built specialized knowledge in contract law and international business law, developing an understanding of the legal frameworks that govern commercial relationships and global trade.",
      ],
    },
  ],
};

const certifications = {
  certifications: [
    {
      title: "FME Form Basic",
      subtitle: "FME by Safe Software",
      logo_path: "fme_form_basic_logo.png",
      certificate_link:
        "https://verify.skilljar.com/c/t9zjifeu86w2",
      alt_name: "FME Academy",
      color_code: "#8C151599",
    },
  ],
};

// Experience Page
const experience = {
  title: "Work Experience",
  description:
    "My work has spanned agricultural land use inventories, water demand modeling, and database management using ArcGIS Pro and QGIS, with a strong emphasis on quality assurance and data integrity. These roles have given me practical experience translating technical geospatial requirements into reliable, production-ready deliverables within professional contexts.",
  header_image_path: "experience.svg",
  sections: [
    {
      title: "Work",
      work: true,
      experiences: [
        {
          title: "GIS Technician",
          company: "The Partnership for Water Sustainability in BC",
          company_url: "https://waterbucket.ca/",
          logo_path: "pwsbc_logo.jpg",
          duration: "January 2025 - Present",
          location: "Abbotsford, B.C.",
          description: [
            "⚡Prepare agricultural water demand model (AWDM) input datasets for select areas of B.C. to specifications provided by the B.C. Ministry of Agriculture and Food.",
            "⚡Conduct quality assurance on digital products and deliverables to ensure that technical standards are met."
          ],
            color: "#000000",
        },
        {
          title: "GIS Technician, Co-op",
          company: "B.C. Ministry of Agriculture and Food",
          company_url: "https://www2.gov.bc.ca/gov/content/governments/organizational-structure/ministries-organizations/ministries/agriculture",
          logo_path: "BC_MinistryofAg_logo.png",
          duration: "September 2024 - December 2024",
          location: "Abbotsford, B.C.",
          description:[
            "⚡Updated databases as remote sensing imagery information became available.",
            "⚡Translated, integrated and manipulated data from various sources and formats to ministry standards as required.",
            "⚡Compiled and digitized source information for the creation of various resource themes, databases, spatial products and related models."
          ],
          color: "#234075",
        },
        {
          title: "Oral Practice Assistant (UBC Work Learn)",
          company: "Chinese Language Program, UBC Faculty of Arts",
          company_url: "https://www2.gov.bc.ca/gov/content/governments/organizational-structure/ministries-organizations/ministries/agriculture",
          logo_path: "ubc_logo.png",
          duration: "September 2023 - August 2024",
          location: "Vancouver, B.C.",
          description:[
            "⚡Have organized and led over 20 training sessions for volunteers both in-person and virtually, imparting essential skills for conducting effective oral practice sessions with students.",
            "⚡Facilitated and moderated oral practice materials and activities across low, moderate, and high-level Chinese language courses.",
            "⚡Served as a liaison between instructors, students, and volunteers, offering support in handling unforeseen situations. "
          ],
          color: "#234075",
        },
      ],
    },
  ],
};

// Contact Page
const contactPageData = {
  contactSection: {
    title: "Contact Me",
    profile_image_path: "animated_ashutosh.png",
    description:
      "I am available on almost every social media. You can message me, I will reply within 24 hours. I can help you with ML, AI, React, Android, Cloud and Opensource Development.",
  },
  blogSection: {
    title: "Blogs",
    subtitle:
      "I like to document some of my experiences in professional career journey as well as some technical knowledge sharing.",
    link: "https://blogs.ashutoshhathidara.com/",
    avatar_image_path: "blogs_image.svg",
  },
  addressSection: {
    title: "Address",
    subtitle: "Saratoga Ave, San Jose, CA, USA 95129",
    locality: "San Jose",
    country: "USA",
    region: "California",
    postalCode: "95129",
    streetAddress: "Saratoga Avenue",
    avatar_image_path: "address_image.svg",
    location_map_link: "https://maps.app.goo.gl/NvYZqa34Wye4tpS17",
  },
  phoneSection: {
    title: "",
    subtitle: "",
  },
};

export {
  settings,
  seo,
  greeting,
  socialMediaLinks,
  skills,
  competitiveSites,
  degrees,
  certifications,
  experience,
  contactPageData,
};
