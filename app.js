const { downloadRelease } = require('@terascope/fetch-github-release');
var fs = require('fs');

// Slicing the first two arguments because they aren't the user inserted arguments
var args = process.argv.slice(2);
console.log(args);

if (args.length != 3 && args.length != 6) {
  console.error("Didn't provide enough arguments to run script.");
  return
}

const user = args[0];
const repo = args[1];
const outputdir = args[2];
const leaveZipped = false;
const disableLogging = false;

// Define a function to filter releases.
function filterRelease(release) {
  // Filter out prereleases.
  return release.prerelease === false;
}

// Define a function to filter assets.
function filterAsset(asset) {
  return true;
}

function readWriteSync() {
  var data = fs.readFileSync(args[3], 'utf-8');
  var oldString = args[4];
  var newString = args[5];

  var newValue = data.replace(oldString, newString);

  fs.writeFileSync(args[3], newValue, 'utf-8');

  console.log('readFileSync complete');
}

downloadRelease(user, repo, outputdir, filterRelease, filterAsset, leaveZipped, disableLogging)
  .then(function() {
    if (args.length > 3) {
      readWriteSync();
    }
    console.log('All done!');
    process.exit();
  })
  .catch(function(err) {
    console.error(err.message);
  });