var fs = require('fs');
var path = require('path');
var lang = require('zero-lang');

var REGEXP = {
  importTag: /<import src="\S*"><\/import>/g,
  srcPath: /src="(\S*)"/,
};

function importContent(content, resoucePath) {
  var match = content.match(REGEXP.importTag);
  if (match) {
    lang.each(match, function (m) {
      var sourcePath = m.match(REGEXP.srcPath)[1];
      var absoluteSourcePath = path.resolve(path.dirname(resoucePath), sourcePath);
      var sourceOriginContent = fs.readFileSync(absoluteSourcePath, {
        encoding: 'utf8'
      });
      var sourceDistContent = importContent(sourceOriginContent, absoluteSourcePath);
      content = content.replace(m, sourceDistContent);
    });
  }
  return content;
}

module.exports = function templateImporting(source) {
  var loaderContext = this;
  loaderContext.cacheable && loaderContext.cacheable();
  return importContent(source, loaderContext.resourcePath);
};

