const fs = require('fs');
const files = [
  'src/lib/actions/admin/blogs.actions.js',
  'src/lib/actions/admin/dayTrips.actions.js',
  'src/lib/actions/admin/destinations.actions.js',
  'src/lib/actions/admin/hotels.actions.js'
];
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(
    /let thumbnailUrl = ([a-zA-Z0-9_\.]+);\s*if \(thumbnailFile && thumbnailFile.size > 0\)/g,
    'let thumbnailUrl = $1;\n    if (formData.get("removeThumbnail") === "true") {\n      thumbnailUrl = "";\n    }\n    if (thumbnailFile && thumbnailFile.size > 0)'
  );
  fs.writeFileSync(f, content);
});
console.log("Done");
