# Interactive Mapping Template (Sample)

Use this file as a starter when you want to publish an archive post with an embedded interactive map.

## 1) Project summary

Describe what the map shows, the purpose, and your key findings in 3–5 bullets.

- Study area:
- Data source(s):
- Methods/tools:
- Key result:

## 2) Interactive map embed

Replace the URL below with your ArcGIS Online / Mapbox / Leaflet / other public embed URL.

@webmap(https://your-public-web-map-url)

## 3) Optional 3D point cloud embed

If you also have a point cloud viewer link, place it like this:

@pointcloud(https://your-public-point-cloud-viewer-url)

## 4) Figure fallback (optional)

Add one static screenshot in case embeds fail on restricted networks.

![Interactive map screenshot fallback](/archive-posts/images/replace-with-screenshot.png)

## 5) Notes for publication

- Ensure all URLs are HTTPS and publicly accessible.
- Confirm the host allows iframe embedding.
- Keep large raw files on external storage/CDN, not in this repo.
