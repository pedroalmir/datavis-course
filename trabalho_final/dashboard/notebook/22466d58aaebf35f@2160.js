// https://observablehq.com/d/22466d58aaebf35f@2160
import define1 from "./576f8943dbfbd395@109.js";
import define2 from "./2683d7ccbaaf16d5@258.js";
import define3 from "./e93997d5089d7165@2200.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  
  main.variable(observer()).define(["md"], function(md){return(
md`# Ten years of eHealth on Stack Overflow (Dashboard)`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<code>css</code> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"><link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="crossorigin=""/>`
)});
  main.variable(observer("worldGeoJson")).define("worldGeoJson", ["d3","URLbase"], function(d3,URLbase){return(
d3.json(URLbase + "data/countries.geo.json")
)});
  main.variable(observer("userCountry")).define("userCountry", ["d3","URLbase"], function(d3,URLbase){return(
d3.csv(URLbase + "data/UserCountryData.csv").then(function(data){
  let cMap = d3.map()
  data.forEach(function(d, i){
    cMap.set(d.UserID, {"country": d.Country, "lat": d.Latitude, "long": d.Longitude})
  })
  return cMap
})
)});
  main.variable(observer("step6")).define("step6", ["md"], function(md){return(
md`
###### This code was used to filter and preprocess our dataset

\`\`\`js
myData = d3.csv(URLbase + "data/Posts.csv")
  .then(function(data){
    // Data preprocessing...
    let parseDate = d3.timeParse("%Y-%m-%d")
    
    let idMap = d3.map();
    let countryMap = d3.map();
    let posts = [];
    let discussions = [];
    let tagsByYearModel = [];
    
    data.forEach(function(d, i){
      //Discussion restriction
      if(d.UserDiscussionCount > 0){      
        let date = parseDate(d.CreationDate.substr(0, 10))
        let tagsTmp = d.Tags.trim().replace(/</g, '')
        let tags = tagsTmp.substring(0, tagsTmp.length - 1).split('>')
      
        let os = "Unknown"
        if(tags.includes("android") || tags.includes("android-augmented-reality") || tags.includes("android-studio")){
          os = "android"
        }
        if(tags.includes("apple") || tags.includes("ios") ||  tags.includes("iphone") 
               ||  tags.includes("ipad") || tags.includes("ios7") || tags.includes("ios8") 
               || tags.includes("ios8.1") || tags.includes("ios9") || tags.includes("ios10") 
               || tags.includes("ios11") || tags.includes("apple-watch") || tags.includes("xcode")
               || tags.includes("xcode7.3")){
          if(os == "Unknown") os = "ios"
          else os = "Unknown"
        }
        if(tags.includes("linux")){
          if(os == "Unknown") os = "linux"
          else os = "Unknown"
        }
      
        let pLanguage = "Unknown"
        let languages = ['python', 'javascript', 'java', 'c#', '.net', 'php', 'c++', 'c', 'r', 'swift', 'objective-c',
                         'kotlin', 'perl', 'python-3.x', 'python-2.7', 'node.js', 'swift3', 'vb.net', 'dart', 'go',
                         'flutter', 'visual-c++']
        for(var l in languages){
          if(tags.includes(languages[l])){
            if(pLanguage == "Unknown"){
              if(languages[l] == 'python-3.x') pLanguage = 'python'
              else if(languages[l] == 'python-2.7') pLanguage = 'python'
              else if(languages[l] == 'node.js') pLanguage = 'javascript'
              else if(languages[l] == 'swift3') pLanguage = 'swift'
              else if(languages[l] == 'vb.net') pLanguage = '.net'
              else if(languages[l] == 'flutter') pLanguage = 'dart'
              else if(languages[l] == 'visual-c++') pLanguage = 'c++'
              else pLanguage = languages[l]
            }else{
              pLanguage = "Unknown"
              break
            }
          }
        }
          
        //if(pLanguage == "Unknown") console.log(tags)
        idMap.set(d.Id, i)
        var userLocation = userCountry.get(d.UserId)
        if(userLocation !== undefined){
          var countryCount = countryMap.get(userLocation.country)
          if(countryCount !== undefined) countryMap.set(userLocation.country, countryCount + 1)
          else countryMap.set(userLocation.country, 1)
        }
          
        // Tags by year model
        tags.forEach(function(tag, i){
          tagsByYearModel.push({"tag": tag, "year": date.getFullYear()})
        })
          
        // Filter discussions
        if(d.AcceptedAnswerId === "" && d.AnswerCount > 0 && d.UserDiscussionCount > 0){
          discussions.push({
            "id": d.Id, 
            "title": d.Title, 
            "creationDate": date, 
            "year": date.getFullYear(),
            
            "score": d.Score,
            "viewCount": d.ViewCount,
            "AnswerCount": d.AnswerCount,
            "FavoriteCount": d.FavoriteCount,
            "dCount": d.UserDiscussionCount,
            
            "userLocation": userLocation,
            "userReputation": d.UserReputation,
            
            "os": os,
            "tags": tags,
            "pLanguage": pLanguage,
            "link": 'http://stackoverflow.com/questions/' + d.Id
          })
        }
        
        posts.push({
          "id": d.Id,
          "creationDate": date, 
          "year": date.getFullYear(),
          "score": d.Score,
          "viewCount": d.ViewCount,
          "username": d.UserDisplayName,
          "userReputation": d.UserReputation,
          "userLocation": userLocation,
          "tags": tags,
          "os": os,
          "pLanguage": pLanguage
        })
     }
  })
  
  return {"idMap": idMap, "posts": posts, "countryMap": countryMap, "tagsByYearModel": tagsByYearModel, 
          "openDiscussions": discussions.sort(
            (d1, d2) => d2.AnswerCount - d1.AnswerCount || d2.score - d1.score)}
  })
\`\`\`

The result (present in the next cell) was as download as json file just to improve the notebook performance.
`
)});
  main.variable(observer("myData")).define("myData", ["d3","URLbase"], function(d3,URLbase){return(
d3.json(URLbase + "data/json/myDataJson.json")
)});
  main.variable(observer("postsMalletModel")).define("postsMalletModel", ["d3","URLbase"], function(d3,URLbase){return(
d3.json(URLbase + "data/mallet/postsModel.json")
)});
  main.variable(observer("questions")).define("questions", ["d3","URLbase"], function(d3,URLbase){return(
d3.csv(URLbase + "data/PostsTreated.csv").then(function(data){
  let text = '';
  data.forEach(function(d, i){
    text += d.text + '\n'
  })
  return {"data": data, "text": text}
})
)});
  main.variable(observer("openDiscussionsTxt")).define("openDiscussionsTxt", ["d3","URLbase","myData"], function(d3,URLbase,myData){return(
d3.csv(URLbase + "data/PostsTreated.csv").then(function(data){
  let openDiscussionsIDs = []
  myData.openDiscussions.forEach(d => openDiscussionsIDs.push(d.id))
  let result = data.filter(d => openDiscussionsIDs.includes(d.id))
  
  let text = '';
  result.forEach(function(d, i){
    text += d.text + '\n'
  })
  
  return {"data": result, "text": text}
})
)});
  main.variable(observer("ldaModel")).define("ldaModel", ["d3","URLbase"], function(d3,URLbase){return(
d3.json(URLbase + "lda/lda_data/output/d3js/lda.json")
)});
  main.variable(observer("factsAndDims")).define("factsAndDims", ["crossfilter","myData"], function(crossfilter,myData)
{
  let facts = crossfilter(myData.posts)
  let dateDimPosts = facts.dimension(d => d.year)
  let postsByYearGroup = dateDimPosts.group()
  
  return {
    dateDimPosts: dateDimPosts, postsByYearGroup: postsByYearGroup
  }
}
);
  main.variable(observer("by_year")).define("by_year", ["md","container","dc","factsAndDims","d3"], function(md,container,dc,factsAndDims,d3)
{
  let byYearWidth = Math.floor($($('#postByYear').parent().get(0)).width());
  let view = md`${container('chart1','Number of eHealth-related Posts by Year in Stack Overflow Website')}`
  let barChart = dc.barChart(view.querySelector("#chart1"))
  
  barChart
    .width(byYearWidth).height(400).gap(30)
    .margins({top: 30, right: 50, bottom: 25, left: 40})
    .dimension(factsAndDims.dateDimPosts)
    .group(factsAndDims.postsByYearGroup)
    .x(d3.scaleBand()).xUnits(dc.units.ordinal)
    .renderHorizontalGridLines(true)
    .controlsUseVisibility(true)
    .renderLabel(true)
    .clipPadding(20)
    .brushOn(true)
  
  dc.renderAll()
  
  return view     
}
);
  main.variable(observer("by_os")).define("by_os", ["crossfilter","myData","remove_empty_bins","md","container","dc","d3"], function(crossfilter,myData,remove_empty_bins,md,container,dc,d3)
{
  let byOSWidth = Math.floor($($('#postByOS').parent().get(0)).width());
  let facts = crossfilter(myData.posts)
  let osDimPosts = facts.dimension(d => d.os)
  let filter = facts.dimension(d => d.os).filter(function(d){ return d !== 'Unknown';})
  
  let postsByOSGroup = osDimPosts.group()
  let finalOSGroup = remove_empty_bins(postsByOSGroup)
  
  let view = md`${container('chart2','Number of eHealth-related Posts by Operational System')}`
  let barChart = dc.barChart(view.querySelector("#chart2"))
  
  barChart
    .width(byOSWidth).height(300).gap(30)
    .margins({top: 30, right: 50, bottom: 25, left: 40})
    .dimension(osDimPosts)
    .group(finalOSGroup)
    .x(d3.scaleBand()).xUnits(dc.units.ordinal)
    .ordering(function(d) { return -d.value; })
    .renderHorizontalGridLines(true)
    .controlsUseVisibility(true)
    .renderLabel(true)
    .clipPadding(20)
    .brushOn(true)
    .elasticX(true)
  
  
  dc.renderAll()
  
  return view     
}
);
  main.variable(observer("by_pLanguage")).define("by_pLanguage", ["crossfilter","myData","remove_empty_bins","md","container","dc","d3"], function(crossfilter,myData,remove_empty_bins,md,container,dc,d3)
{
  let byPLWidth = Math.floor($($('#postByProgLang').parent().get(0)).width());
  let facts = crossfilter(myData.posts)
  let pLanguageDimPosts = facts.dimension(d => d.pLanguage);
  let filter = facts.dimension(d => d.pLanguage)
  .filter(function(d){ return ['swift', 'java',  'python', 'c#', 'objective-c', 
                               'c++', 'javascript', '.net', 'r', 'php'].includes(d);})
  
  let postsByPLanguageGroup = pLanguageDimPosts.group()
  let finalGroup = remove_empty_bins(postsByPLanguageGroup)
  
  let view = md`${container('chart3','Number of eHealth-related Posts by Programming Language')}`
  let barChart = dc.barChart(view.querySelector("#chart3"))
  
  barChart
    .width(byPLWidth).height(300).gap(15)
    .margins({top: 30, right: 50, bottom: 25, left: 40})
    .dimension(pLanguageDimPosts)
    .group(finalGroup)
    .x(d3.scaleBand()).xUnits(dc.units.ordinal)
    .ordering(function(d) { return -d.value; })
    .renderHorizontalGridLines(true)
    .controlsUseVisibility(true)
    .renderLabel(true)
    .clipPadding(20)
    .brushOn(true)
  
  dc.renderAll()
  
  return view     
}
);
  main.variable(observer("by_world")).define("by_world", ["html"], function(html)
{
  return html`<div id='mapid' style="min-height: 500px; width: 100%"></div>`
}
);
  main.variable(observer("myMapVis")).define("myMapVis", ["initializingMap","L","getCountryValue","worldGeoJson","mapStyle"], function(initializingMap,L,getCountryValue,worldGeoJson,mapStyle)
{
  initializingMap() 
  
  let mapInstance = L.map('mapid').setView([20.593684, 10.451526], 2)//center [lat, long], zoom
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 17
  }).addTo(mapInstance)
  
  let infoControl = L.control()
	infoControl.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	}
  
  function createInfoLabel(feat){
    let country = feat.properties.name
    let posts = getCountryValue(country)
    return '<strong>' + country + '</strong>: ' + (posts ? posts : 0)
  }

	infoControl.update = function (feat) {
			this._div.innerHTML = '<h5>Number of Posts</h5>' 
        + (feat ?  createInfoLabel(feat) : 'Mouse over a country');
	}
   
  function highlightFeature(e) {
		let layer = e.target;
		layer.setStyle({weight: 2, color: '#AAA', dashArray: '', fillOpacity: 0.7 });
		if (!L.Browser.ie && !L.Browser.opera) layer.bringToFront();
		infoControl.update(layer.feature);
  }
  
  let geoj;
	function resetHighlight(e) { geoj.resetStyle(e.target); infoControl.update(); }
	function zoomToFeature(e) { mapInstance.fitBounds(e.target.getBounds()); }

	function onEachFeature(feature, layer) {
		layer.on({ mouseover: highlightFeature, mouseout: resetHighlight, click: zoomToFeature });
	}
  
  geoj = L.geoJson(worldGeoJson, {style: mapStyle, onEachFeature: onEachFeature}).addTo(mapInstance);
  
  infoControl.addTo(mapInstance);
  
  return mapInstance
}
);
  main.variable(observer("legend")).define("legend", ["L","mapColors","colorScale","d3","outlierMapColor","myMapVis"], function(L,mapColors,colorScale,d3,outlierMapColor,myMapVis)
{
  let legendControl = L.control({position: 'bottomleft'});

	legendControl.onAdd = function (map) {
		let div = L.DomUtil.create('div', 'info legend'), labels = [], n = mapColors.length, from, to;
		for (let i = 0; i < n; i++) {
			let c = mapColors[i]
      let fromto = colorScale.invertExtent(c);
			labels.push(
				'<i style="background:' + mapColors[i] + '"></i> ' +
				d3.format("d")(fromto[0]) + (d3.format("d")(fromto[1]) ? '&ndash;' + d3.format("d")(fromto[1]) : '+'));
		}
    labels.push('<i style="background:' + outlierMapColor + '"></i> >300')
		div.innerHTML = labels.join('<br/>')
		return div
	}
  legendControl.addTo(myMapVis)
  return legendControl
}
);
  main.variable(observer("initializingMap")).define("initializingMap", ["L"], function(L){return(
function initializingMap() {
  var container = L.DomUtil.get('mapid');
  if(container != null){
    container._leaflet_id = null;
  }
}
)});
  main.variable(observer()).define(["html"], function(html){return(
html`
<div class="row">
  <div class="col-md-12 text-center h4">Topic Modeling (LDAVis)</div>
</div>
<div class="row">
  <div class="col-md-12 text-center">
    See <a href="http://mallet.cs.umass.edu/index.php">Mallet Website</a> and LDAVis 
    <a href="http://bl.ocks.org/AlessandraSozzi/raw/ce1ace56e4aed6f2d614ae2243aab5a5/#topic=0&lambda=1&term=">Demo 1</a>
    or
    <a href="http://www.kennyshirley.com/LDAvis/#topic=0&lambda=1&term=">Demo 2</a>.
  </div>
</div>`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`
  <div class='row' style='margin: 10px 20px;'>
    <div id='ldaVisContainer' class='ldavis_container' style='height: 760px; width: 100%'></div>
  </div>
`
)});
  main.variable(observer("wordCloud")).define("wordCloud", ["createWordCloudSvg","words"], function(createWordCloudSvg,words){return(
createWordCloudSvg(words)
)});
  main.variable(observer("treeData")).define("treeData", ["postsMalletModel"], function(postsMalletModel)
{
  let tree = [{
    "name": "Topics",
    "parent": "null",
    "children": []
  }]
  
  let root = tree[0]
  postsMalletModel["myTrees"] = {}
  
  function searchTree(element, matchingName){
    if(element.name == matchingName){
      return element;
    } else if (element.children != null){
      var result = null;
      for(var i = 0; result == null && i < element.children.length; i++){
        result = searchTree(element.children[i], matchingName)
      }
      return result;
    }
    return null;
  }
  
  function changeParent(childNodeName, newParentName){
    let childNode = searchTree(root, childNodeName)
    if(childNode){
      let parent = searchTree(root, childNode.parent)
      let nChildren = []
      parent.children.forEach(function(child, i){
        if(child.name != childNodeName) nChildren.push(child)
      })
      parent.children = nChildren
      childNode.parent = newParentName
      let newParentNode = searchTree(root, newParentName)
      newParentNode.children.push(childNode)
    }
  }
  
  function appendNode(pNodeName, name, children){
    let fNode = searchTree(root, pNodeName)
    if(fNode){
      fNode.children.push({"name": name, "parent": fNode.name, "children": children})
    }
  }
  
  function removeNode(parentName, nodeName){
    let pNode = searchTree(root, parentName)
    if(pNode){
      let nChildren = []
      pNode.children.forEach(function(child, i){
        if(child.name != nodeName) nChildren.push(child)
      })
      pNode.children = nChildren
    }
  }
  
  function changeName(oldName, newName){
    let node = searchTree(root, oldName)
    if(node){
      node.name = newName
    }
  }
  
  appendNode('Topics', 'Medical Image Processing', [])
  appendNode('Topics', 'Healthcare Interoperability', [])
  appendNode('Topics', 'Apps Development', [])
  
  appendNode('Medical Image Processing', 'dicom', [])
  appendNode('Healthcare Interoperability', 'fhir', [])
  appendNode('Apps Development', 'app', [])
  postsMalletModel.myTrees["topic3"] = JSON.parse(JSON.stringify(tree))
  
  appendNode('app', 'google fit', [])
  appendNode('app', 'apple healthkit', [])
  postsMalletModel.myTrees["topic4"] = JSON.parse(JSON.stringify(tree))
  
  appendNode('dicom', 'python', [])
  appendNode('dicom', 'matlab', [])
  appendNode('fhir', 'patient resource', [])
  appendNode('fhir', 'xml message', [])
  
  appendNode('Topics', 'Other', [])
  appendNode('Other', 'error', [])
  postsMalletModel.myTrees["topic6"] = JSON.parse(JSON.stringify(tree))
  
  appendNode('Other', 'data', [])
  appendNode('fhir', '.dcm file', [])
  postsMalletModel.myTrees["topic8"] = JSON.parse(JSON.stringify(tree))
  
  appendNode('Other', 'documentation', [])
  appendNode('dicom', 'technology', [])
  changeParent('python', 'technology', [])
  changeParent('matlab', 'technology', [])
  appendNode('dicom', 'issue', [])
  appendNode('issue', 'image slice', [])
  appendNode('issue', 'read file', [])
  appendNode('issue', 'server', [])
  appendNode('Healthcare Interoperability', 'hl7', [])
  appendNode('hl7', 'CDA', [])
  appendNode('hl7', 'HAPI', [])
  postsMalletModel.myTrees["topic12"] = JSON.parse(JSON.stringify(tree))
  
  appendNode('app', 'android', [])
  appendNode('app', 'ios', [])
  
  changeParent('google fit', 'android', [])
  changeParent('apple healthkit', 'ios', [])

  appendNode('ios', 'device', [])
  appendNode('apple healthkit', 'heart rate', [])
  appendNode('device', 'watch', [])
  appendNode('device', 'iphone', [])
  appendNode('fhir', 'mirth', [])
  appendNode('python', 'pydicom', [])
  
  appendNode('Other', 'withings', [])
  
  appendNode('Topics', 'Platform', [])
  appendNode('Platform', 'openehr', [])
  appendNode('Platform', 'healthvault', [])
  
  appendNode('ios', 'apple researchkit', [])
  changeParent('device', 'ios')
  
  appendNode('data', 'sleep', [])
  appendNode('data', 'step', [])
  appendNode('data', 'distance', [])
  appendNode('data', 'daily period', [])
  appendNode('data', 'calory', [])
  appendNode('data', 'date', [])
  appendNode('data', 'sleep', [])
  appendNode('data', 'activity', [])
  
  appendNode('activity', 'running', [])
  appendNode('activity', 'walking', [])
   
  postsMalletModel.myTrees["topic16"] = JSON.parse(JSON.stringify(tree))
  
  appendNode('hl7', 'segments', [])
  appendNode('segments', 'obx', [])
  appendNode('segments', 'pid', [])
  appendNode('python', 'opencv', [])
  appendNode('python', 'numpy', [])
  appendNode('technology', 'c++', [])
  appendNode('c++', 'gdcm', [])
  appendNode('c++', 'imebra', [])
  appendNode('CDA', 'ccd', [])
  appendNode('withings', 'oauth', [])
  appendNode('healthvault', 'oauth', [])
  
  appendNode('ios', 'apple carekit', [])
  changeParent('device', 'ios')
  
  appendNode('data', 'ecg', [])
  appendNode('data', 'glucose', [])
  appendNode('data', 'blood', [])
  appendNode('data', 'pressure', [])
  changeParent('activity', 'data')
  
  appendNode('Apps Development', 'Tasks', [])
  appendNode('Tasks', 'drug prescription', [])
  appendNode('Tasks', 'health monitoring', [])
  changeParent('data', 'Apps Development')
  changeParent('withings', 'Platform')
  
  postsMalletModel.myTrees["topic24"] = JSON.parse(JSON.stringify(tree))
  
  appendNode('python', 'niftynet', [])
  appendNode('data', 'height', [])
  appendNode('data', 'weight', [])
  appendNode('data', 'age', [])
  appendNode('data', 'mass', [])
  appendNode('data', 'gender', [])
  appendNode('data', 'birthday', [])
  appendNode('data', 'temperature', [])
  changeParent('activity', 'data')
  appendNode('python', 'evildicom', [])
  appendNode('server', 'orthanc', [])
  appendNode('fhir', 'diagnostic order schedule', [])
  appendNode('segments', 'obr')
  postsMalletModel.myTrees["topic32"] = JSON.parse(JSON.stringify(tree))
  
  removeNode('ios', 'device')
  changeName('app', 'Op. System')
  changeParent('Op. System', 'Apps Development')
  changeParent('data', 'Apps Development')
  removeNode('Topics', 'Other')
  removeNode('healthvault', 'oauth')
  removeNode('withings', 'oauth')
  changeName('CDA', 'cda')
  changeName('HAPI', 'hapi')
  changeParent('matlab', 'technology')
  changeParent('heart rate', 'data')
  changeParent('activity', 'data')
  appendNode('Apps Development', 'API', [])
  appendNode('API', 'withings', [])
  changeParent('Op. System', 'Apps Development')
  changeParent('data', 'Apps Development')
  removeNode('Topics', 'Platform')
  appendNode('Topics', 'EHR', [])
  changeParent('Apps Development', 'Topics')
  changeParent('Healthcare Interoperability', 'EHR')
  changeName('Healthcare Interoperability', 'Interoperability Standards')
  appendNode('EHR', 'Platforms', [])
  appendNode('Platforms', 'openehr', [])
  appendNode('Platforms', 'healthvault', [])
  
  postsMalletModel.myTrees["topic48"] = JSON.parse(JSON.stringify(tree))
}
);
  main.variable(observer("viewof tNumberSelect")).define("viewof tNumberSelect", ["select"], function(select){return(
select({
  title: "Topic Number",
  description: "Please select a number of topic to visualize.",
  options: [3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512],
  value: 3
})
)});
  main.variable(observer("tNumberSelect")).define("tNumberSelect", ["Generators", "viewof tNumberSelect"], (G, _) => G.input(_));
  main.variable(observer()).define(["html"], function(html){return(
html`
  <div class='row' style='margin: 10px 20px;'>
    <div id='treeContainer'></div>
  </div>
`
)});
  main.variable(observer()).define(["DOM","serialize","treeChartSVG"], function(DOM,serialize,treeChartSVG){return(
DOM.download(() => serialize(treeChartSVG.svg[0][0]), undefined, "Save as SVG")
)});
  const child1 = runtime.module(define1);
  main.import("serialize", child1);
  main.variable(observer("vizContainer")).define("vizContainer", ["d3","LDAvis","postsMalletModel","tNumberSelect"], function(d3,LDAvis,postsMalletModel,tNumberSelect)
{

  d3.select("#ldaVisContainer").html("");
  new LDAvis('#ldaVisContainer', postsMalletModel.lda['topic' + tNumberSelect]);

  $("#topicNumberInput").change(function() {
    var tNumberSelect = $(this).children("option:selected").val();
    d3.select("#ldaVisContainer").html("");
    new LDAvis('#ldaVisContainer', postsMalletModel.lda['topic' + tNumberSelect]);
  });
}
);
  main.variable(observer("dendrogram")).define("dendrogram", ["tree","postsMalletModel","tNumberSelect","d3"], function(tree,postsMalletModel,tNumberSelect,d3)
{
  const root = tree(postsMalletModel.tree['topic' + tNumberSelect]);

  const svg = d3.create("svg")
      .style("max-width", "100%")
      .style("height", "auto")
      .style("font", "11px sans-serif")
      .style("margin", "5px");

  const link = svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5)
  .selectAll("path")
    .data(root.links())
    .join("path")
      .attr("d", d => `
        M${d.target.y},${d.target.x}
        C${d.source.y + root.dy / 2},${d.target.x}
         ${d.source.y + root.dy / 2},${d.source.x}
         ${d.source.y},${d.source.x}
      `);

  const node = svg.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
    .selectAll("g")
    .data(root.descendants())
    .join("g")
      .attr("transform", d => `translate(${d.y},${d.x})`);

  node.append("circle")
      .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 2.5);

  node.append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d.children ? -6 : 6)
      .text(d => d.data.name)
    .filter(d => d.children)
      .attr("text-anchor", "end")
    .clone(true).lower()
      .attr("stroke", "white");

  //yield svg.node();
  //svg.attr("viewBox", autoBox);
}
);
  main.variable(observer("treeChartSVG")).define("treeChartSVG", function()
{
  return {svg: null}
}
);
  main.variable(observer("treeChart")).define("treeChart", ["postsMalletModel","tNumberSelect","d3t","treeChartSVG","d3"], function(postsMalletModel,tNumberSelect,d3t,treeChartSVG,d3)
{
// ************** Generate the tree diagram	 *****************
  var i = 0, duration = 1000, root;
  var height = 1000, width = 720;
  var margin = ({top: 20, right: 120, bottom: 20, left: 120});
  var treeData = postsMalletModel.myTrees['topic' + tNumberSelect]

  var tree = d3t.layout.tree().size([height, width]);
  var diagonal = d3t.svg.diagonal().projection(function(d) { return [d.y, d.x]; });
  
  d3t.select("#treeContainer").html("");
  var svg = d3t.select("#treeContainer").append("svg")
	  .attr("width", width + margin.right + margin.left)
	  .attr("height", height + margin.top + margin.bottom)
    .append("g")
	  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  root = treeData[0];
  root.x0 = height / 2;
  root.y0 = 0;
  
  update(root);
  
  treeChartSVG.svg = svg;

  function update(source) {
    // Compute the new tree layout.
    var nodes = tree.nodes(root), links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 120; });

    // Update the nodes…
    var node = svg.selectAll("g.node").data(nodes, function(d) { return d.id || (d.id = ++i); });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
	    .attr("class", d => ("node " + d.name.replace(' ', '').toLowerCase().trim()))
	    .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	    .on("click", click);

    nodeEnter.append("circle")
	    .attr("r", 1e-6)
	    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeEnter.append("text")
	    .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
	    .attr("dy", ".35em")
	    .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
	    .text(function(d) { return d.name; })
	    .style("fill-opacity", 1e-6)
      .call(wrap, 150);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition().duration(duration)
	    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    nodeUpdate.select("circle").attr("r", 10)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeUpdate.select("text").style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition().duration(duration)
	    .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	    .remove();

    nodeExit.select("circle").attr("r", 1e-6);
    nodeExit.select("text").style("fill-opacity", 1e-6);

    // Update the links…
    var link = svg.selectAll("path.link").data(links, function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
	    .attr("class", "link")
	    .attr("d", function(d) {
		    var o = {x: source.x0, y: source.y0};
		    return diagonal({source: o, target: o});
	    });

    // Transition links to their new position.
    link.transition().duration(duration).attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition().duration(duration)
	    .attr("d", function(d) {
		    var o = {x: source.x, y: source.y};
		    return diagonal({source: o, target: o});
	    })
	  .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
	    d.x0 = d.x;
	    d.y0 = d.y;
    });
  }
  
  function wrap(text, twidth) {
    text.each(function() {
      
      var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word, line = [], 
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy"));
      
      while (word = words.pop()) {
        line.push(word);
        if(line.join(" ").length > 20 && line.join(" ") != 'diagnostic order schedule'){
          var tspan = text.text(null).append("tspan").attr("x", -15).attr("y", y).attr("dy", "-0.3em")
          tspan.text(line.join(" "));
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan")
            .attr("x", -15).attr("y", y)
            .attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
	    d._children = d.children;
	    d.children = null;
    } else {
	    d.children = d._children;
	    d._children = null;
    }
    update(d);
  }
  //###############################################
  //###############################################
  //###############################################
  $("#topicNumberInput").change(function() {
    var tNumberSelect = $(this).children("option:selected").val();
    var i = 0, duration = 1000, root;
  var height = 1000, width = 720;
  var margin = ({top: 20, right: 120, bottom: 20, left: 120});
  var treeData = postsMalletModel.myTrees['topic' + tNumberSelect]

  var tree = d3t.layout.tree().size([height, width]);
  var diagonal = d3t.svg.diagonal().projection(function(d) { return [d.y, d.x]; });
  
  d3t.select("#treeContainer").html("");
  var svg = d3t.select("#treeContainer").append("svg")
	  .attr("width", width + margin.right + margin.left)
	  .attr("height", height + margin.top + margin.bottom)
    .append("g")
	  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  root = treeData[0];
  root.x0 = height / 2;
  root.y0 = 0;
  
  update(root);
  
  treeChartSVG.svg = svg;

  function update(source) {
    // Compute the new tree layout.
    var nodes = tree.nodes(root), links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 120; });

    // Update the nodes…
    var node = svg.selectAll("g.node").data(nodes, function(d) { return d.id || (d.id = ++i); });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
	    .attr("class", d => ("node " + d.name.replace(' ', '').toLowerCase().trim()))
	    .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	    .on("click", click);

    nodeEnter.append("circle")
	    .attr("r", 1e-6)
	    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeEnter.append("text")
	    .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
	    .attr("dy", ".35em")
	    .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
	    .text(function(d) { return d.name; })
	    .style("fill-opacity", 1e-6)
      .call(wrap, 150);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition().duration(duration)
	    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    nodeUpdate.select("circle").attr("r", 10)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeUpdate.select("text").style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition().duration(duration)
	    .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	    .remove();

    nodeExit.select("circle").attr("r", 1e-6);
    nodeExit.select("text").style("fill-opacity", 1e-6);

    // Update the links…
    var link = svg.selectAll("path.link").data(links, function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
	    .attr("class", "link")
	    .attr("d", function(d) {
		    var o = {x: source.x0, y: source.y0};
		    return diagonal({source: o, target: o});
	    });

    // Transition links to their new position.
    link.transition().duration(duration).attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition().duration(duration)
	    .attr("d", function(d) {
		    var o = {x: source.x, y: source.y};
		    return diagonal({source: o, target: o});
	    })
	  .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
	    d.x0 = d.x;
	    d.y0 = d.y;
    });
  }
  
  function wrap(text, twidth) {
    text.each(function() {
      
      var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word, line = [], 
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy"));
      
      while (word = words.pop()) {
        line.push(word);
        if(line.join(" ").length > 20 && line.join(" ") != 'diagnostic order schedule'){
          var tspan = text.text(null).append("tspan").attr("x", -15).attr("y", y).attr("dy", "-0.3em")
          tspan.text(line.join(" "));
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan")
            .attr("x", -15).attr("y", y)
            .attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
	    d._children = d.children;
	    d.children = null;
    } else {
	    d.children = d._children;
	    d._children = null;
    }
    update(d);
  }
  });
  //return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`
###### This code was used to filter the top 100 most frequent words

\`\`\`js
  toWords(docs.nouns().out('topk')).sort((a,b) => b.freq - a.freq).slice(0, 100)
\`\`\`
`
)});
  main.variable(observer("words")).define("words", ["d3","URLbase"], function(d3,URLbase){return(
d3.json(URLbase + 'data/json/words.json')
)});
  main.variable(observer("createWordCloudSvg")).define("createWordCloudSvg", ["d3cloud","width","cloudConfig","cloudScale","rotateWord","baseFont","fontSize","d3","DOM"], function(d3cloud,width,cloudConfig,cloudScale,rotateWord,baseFont,fontSize,d3,DOM){return(
function createWordCloudSvg(words) {

  let wordCloudWidth = Math.floor($($('#wordCloud').parent().get(0)).width());  

  var layout = d3cloud()
    .size([wordCloudWidth, wordCloudWidth * 9/16]) 
    .words(words)
    .padding(cloudConfig.padding * cloudScale)
    .rotate(rotateWord)
    .font(baseFont)
    .fontSize(fontSize)
    .on('word', addWord);
  
  //d3.schemeBlues[9][3] d3.schemeBlues[9][8]
  var myColorScale = d3.scaleLinear()
        .domain(d3.extent(words, d => d.count))
        .range(["#9ecae1", "#08306b"]);
  const svg = DOM.svg(layout.size()[0], layout.size()[1]); // width, height
  const group = d3.select(svg).append('g')
    //.attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
  
  function addWord (word) {
    const text = group.append('text');
    text.style('font-size', '2px')
      .style('font-family', word.font)
      //wordColors(Math.random() + 0.2)
      .style('fill', myColorScale(word.count))
      .style('cursor', 'pointer')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${[word.x, word.y]})rotate(${word.rotate})`)
      .text(word.text)
      .transition()
      .duration(200)
      .ease(d3.easeLinear)
      .style('font-size', `${word.size}px`);
    text.append('title').text(`${word.text} (${word.count})`); // toolitp
  }
  
  layout.start();
  return svg;
}
)});
  main.variable(observer("cloudConfig")).define("cloudConfig", ["width"], function(width){return(
{
  minFontSize: 10,
  maxFontSize: 80,
  height: width/2,
  padding: 1,
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
###### The LDA models were generated using the following code:

\`\`\`R
## Imports:
## install.packages("jsonlite")
library(mallet)
library(LDAvis)
library(jsonlite)
library(rjson)

HCtoJSON <- function(hc, labels){

  merge <- data.frame(hc$merge)
  print(merge)

  for (i in (1:nrow(merge))) {    
    if (merge[i,1]<0 & merge[i,2]<0){
	print(paste("node", i, labels[-merge[i,1]], labels[-merge[i,2]], sep=" "))
	eval(parse(text=paste0("node", i, "<-list(name=\"node", i, "\", children=list(list(name=labels[-merge[i,1]]),list(name=labels[-merge[i,2]])))")))
    }else if (merge[i,1]>0 & merge[i,2]<0){
	eval(parse(text=paste0("node", i, "<-list(name=\"node", i, "\", children=list(node", merge[i,1], ", list(name=labels[-merge[i,2]])))")))
    }else if (merge[i,1]<0 & merge[i,2]>0){
	eval(parse(text=paste0("node", i, "<-list(name=\"node", i, "\", children=list(list(name=labels[-merge[i,1]]), node", merge[i,2],"))")))
    }else if (merge[i,1]>0 & merge[i,2]>0){
	eval(parse(text=paste0("node", i, "<-list(name=\"node", i, "\", children=list(node",merge[i,1] , ", node" , merge[i,2]," ))")))
    }
  }
  
  eval(parse(text=paste0("JSON<-toJSON(node",nrow(merge), ")")))
  
  return(JSON)
}

createLeafNode <- function(hclust, labels, i) {
    list(name = labels[i], order = hclust$order[[i]])
}

hclustToTree <- function(hclust, labels) {
    if (length(hclust$merge) == 0) 
        return(NULL)

    merges <- list()
    for (index in 1:nrow(hclust$merge)) {
        left <- hclust$merge[index, 1]
        right <- hclust$merge[index, 2]

        if (left < 0) 
            left <- createLeafNode(hclust, labels, -left) else left <- merges[[left]]
        if (right < 0) 
            right <- createLeafNode(hclust, labels, -right) else right <- merges[[right]]

        if (left$order > right$order) {
            tmp <- left
            left <- right
            right <- tmp
        }

        merges[[index]] <- list(children = list(left, right), order = left$order)
    }

    return(merges[nrow(hclust$merge)])
}

executeLDA <- function(nTopics, dataFilePath, stopWordsPath, outputBasePath, rootPath){
   outputDirPath <- paste(outputBasePath, nTopics, sep = "")
   jsonTreeFilePath <- paste(outputDirPath, "/tree_", nTopics, ".json", sep = "")

   ## Create a wrapper for the data with three elements, one for each column.
   ## R does some type inference, and will guess wrong, so give it hints with "colClasses".
   ## Note that "id" and "text" are special fields -- mallet will look there for input.
   ## "class" is arbitrary. We will only use that field on the R side.
   documents <- read.table(dataFilePath, col.names = c("id", "text"), sep = ",", quote = "", stringsAsFactors = FALSE)

   ## Create a mallet instance list object. Right now I have to specify the stoplist
   ## as a file, I can't pass in a list from R.
   ## This function has a few hidden options (whether to lowercase, how we
   ## define a token). See ?mallet.import for details.
   mallet.instances <- mallet.import(documents$id, documents$text, stopWordsPath, token.regexp = "\\p{L}[\\p{L}\\p{P}]+\\p{L}")

   ## Create a topic trainer object.
   topic.model <- MalletLDA(num.topics = nTopics)

   ## Load our documents. We could also pass in the filename of a
   ## saved instance list file that we build from the command-line tools.
   topic.model$loadDocuments(mallet.instances)

   ## Get the vocabulary, and some statistics about word frequencies.
   ## These may be useful in further curating the stopword list.
   vocabulary <- topic.model$getVocabulary()
   word.freqs <- mallet.word.freqs(topic.model)

   ## Optimize hyperparameters every 10 iterations,
   ## after 20 burn-in iterations.
   topic.model$setAlphaOptimization(10, 20)

   ## Now train a model. Note that hyperparameter optimization is on, by default.
   ## We can specify the number of iterations. Here we'll use a large-ish round number.
   topic.model$train(500)

   ## NEW: run through a few iterations where we pick the best topic for each token,
   ## rather than sampling from the posterior distribution.
   topic.model$maximize(10)

   ## Get the probability of topics in documents and the probability of words in topics.
   ## By default, these functions return raw word counts. Here we want probabilities,
   ## so we normalize, and add "smoothing" so that nothing has exactly 0 probability.
   doc.topics <- mallet.doc.topics(topic.model, smoothed=T, normalized=T)
   topic.words <- mallet.topic.words(topic.model, smoothed=T, normalized=T)

   ## Creating JSON LDA to use in LDAVis
   phi <- mallet::mallet.topic.words(topic.model, smoothed = TRUE, normalized = TRUE)
   theta <- mallet::mallet.doc.topics(topic.model, smoothed = TRUE, normalized = TRUE)	
   doc.length <- rowSums(mallet::mallet.doc.topics(topic.model, smoothed = FALSE, normalized = FALSE))
   word.freqs <- mallet::mallet.word.freqs(topic.model)
   vocab <- topic.model$getVocabulary()
   json <- list(phi = phi, theta = theta, doc.length = doc.length, vocab = vocab, term.frequency = droplevels(word.freqs)$term.freq)
   jsonLDA <- LDAvis::createJSON(phi = json$phi, theta = json$theta, doc.length = json$doc.length, vocab = json$vocab, term.frequency = json$term.frequency)

   # see help("serVis") for more details
   library(gistr)
   LDAvis::serVis(jsonLDA, out.dir = outputDirPath, open.browser = FALSE, as.gist = FALSE)

   clusters = mallet.topic.hclust(doc.topics, topic.words, 0.3)
   #plot(clusters, labels = topic.labels)

   #halfway <- hclustToTree(clusters, topic.labels)
   #jsonTree <- toJSON(halfway)
   jsonTree <- HCtoJSON(clusters, topic.labels)
   write(jsonTree, jsonTreeFilePath)

   file.copy(jsonTreeFilePath, rootPath)
   file.copy(paste(outputDirPath, "/lda.json", sep = ""), rootPath)
   file.rename(paste(rootPath, "lda.json", sep = ""), paste(rootPath, "lda_", nTopics,".json", sep = ""))
}

dataFilePath1 <- "D:/Git/datavis-course/trabalho_final/data/PostsTreated.csv"
dataFilePath2 <- "D:/Git/datavis-course/trabalho_final/data/OpenDiscussionTreated.csv"

rootPath1 <- "D:/Git/datavis-course/trabalho_final/data/mallet/posts/"
rootPath2 <- "D:/Git/datavis-course/trabalho_final/data/mallet/openDiscussions/"

outputBasePath1 <- "D:/Git/datavis-course/trabalho_final/data/mallet/posts/lda_"
outputBasePath2 <- "D:/Git/datavis-course/trabalho_final/data/mallet/openDiscussions/lda_"

stopWordsPath <- "D:/Git/datavis-course/trabalho_final/lda/stop_words.txt"

nTopicsList <- c(3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512)

for (i in 1:length(nTopicsList)) {
   print(paste("Iteration", i, ": topics-", nTopicsList[i], sep = ""))
   nTopics <- nTopicsList[i]
   executeLDA(nTopics, dataFilePath1, stopWordsPath, outputBasePath1, rootPath1)
}

print("##########################")

for (i in 1:length(nTopicsList)) {
   print(paste("Iteration", i, ": topics-", nTopicsList[i], sep = ""))
   nTopics <- nTopicsList[i]
   executeLDA(nTopics, dataFilePath2, stopWordsPath, outputBasePath2, rootPath2)
}

## End(Not run)
\`\`\`

Enjoy it!
`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<div class="row"><div class="col-md-12 text-center h3">Other Functions</div></div>`
)});
  main.variable(observer("autoBox")).define("autoBox", function(){return(
function autoBox() {
  const {x, y, width, height} = this.getBBox();
  return [x, y, width, height];
}
)});
  main.variable(observer("baseFont")).define("baseFont", ["fontFamilies"], function(fontFamilies){return(
function (d) {
  return fontFamilies[~~(Math.random() * fontFamilies.length)]
}
)});
  main.variable(observer("tree")).define("tree", ["d3","width"], function(d3,width){return(
data => {
  const root = d3.hierarchy(data).sort((a, b) => (a.height - b.height) || a.data.name.localeCompare(b.data.name));
  root.dx = 10;
  root.dy = width / (root.height + 1);
  return d3.cluster().nodeSize([root.dx, root.dy])(root);
}
)});
  main.variable(observer("fontSize")).define("fontSize", ["frequencyToSize","words","cloudConfig","width","mutable cloudScale"], function(frequencyToSize,words,cloudConfig,width,$0)
{
  let totalArea = 0;
  let minSize = frequencyToSize(words[words.length-1].freq);
  let maxSize = frequencyToSize(words[0].freq);
  for (let w of words) {
    let size = frequencyToSize(w.freq);
    let fontSize = cloudConfig.minFontSize + 
      (cloudConfig.maxFontSize - cloudConfig.minFontSize) * ((size-minSize) / (maxSize-minSize));
    totalArea += (w.text.length * 0.6 + cloudConfig.padding * 2) * fontSize * (fontSize + cloudConfig.padding * 2);
  }
  let s = Math.sqrt(width * cloudConfig.height/totalArea);
  $0.value = s;
  return function (w) {
    return s * (cloudConfig.minFontSize + 
        (cloudConfig.maxFontSize - cloudConfig.minFontSize) * ((frequencyToSize(w.freq) - minSize) / (maxSize - minSize))
      );
  }
}
);
  main.variable(observer("fontFamilies")).define("fontFamilies", function(){return(
['Corben', 'Pacifico', 'impact']
)});
  main.define("initial cloudScale", function(){return(
1
)});
  main.variable(observer("mutable cloudScale")).define("mutable cloudScale", ["Mutable", "initial cloudScale"], (M, _) => new M(_));
  main.variable(observer("cloudScale")).define("cloudScale", ["mutable cloudScale"], _ => _.generator);
  main.variable(observer("frequencyToSize")).define("frequencyToSize", function(){return(
function (frequency) {
  return Math.sqrt(frequency);
}
)});
  main.variable(observer("outlierMapColor")).define("outlierMapColor", ["d3"], function(d3){return(
d3.rgb(d3.schemeBlues[9][8]).darker(2).formatHex()
)});
  main.variable(observer("wordColors")).define("wordColors", ["d3"], function(d3){return(
d3.scaleSequential(d3.interpolateBlues)
)});
  main.variable(observer("rotateWord")).define("rotateWord", function(){return(
function () { 
  return 0;
  //return ~~(Math.random() * 4) * 45 - 45; 
}
)});
  main.variable(observer("toWords")).define("toWords", function(){return(
function toWords (terms) {
  return terms.map(term => ({
    text: term.normal,
    count: term.count,
    freq: term.percent/100
  }));
}
)});
  main.variable(observer("mapStyle")).define("mapStyle", ["applyColorScale"], function(applyColorScale){return(
function mapStyle(feature) {
		 return {
					weight: 1,
					opacity: 1,
					color: 'white',
					dashArray: '3',
					fillOpacity: 0.6,
					fillColor: applyColorScale(feature.properties.name)
				};
	}
)});
  main.variable(observer("applyColorScale")).define("applyColorScale", ["outlierMapColor","colorScale","getCountryValue"], function(outlierMapColor,colorScale,getCountryValue){return(
function applyColorScale(countryName){
  if(countryName == 'United States of America' || countryName == 'India') return outlierMapColor
  else return colorScale(getCountryValue(countryName))
}
)});
  main.variable(observer("getCountryValue")).define("getCountryValue", ["myData"], function(myData){return(
function getCountryValue(countryName){
  let value = myData.countryMap['$' + countryName];
  return (countryName !== undefined && value !== undefined) ? value : 0;
}
)});
  main.variable(observer("mapColors")).define("mapColors", ["d3"], function(d3){return(
d3.schemeBlues[6]
)});
  main.variable(observer("colorScale")).define("colorScale", ["d3","mapColors"], function(d3,mapColors){return(
d3.scaleQuantize().domain([0, 77]).range(mapColors)
)});
  main.variable(observer("container")).define("container", function(){return(
function container(id, title) { 
  return `<div><div id='${id}'></div></div>`
}
)});
  main.variable(observer("remove_empty_bins")).define("remove_empty_bins", function(){return(
function remove_empty_bins(source_group) {
    return {
        all:function () {
            return source_group.all().filter(function(d) {
                return d.value != 0;
            });
        }
    };
}
)});
  main.variable(observer("URLbase")).define("URLbase", function(){return(
"https://raw.githubusercontent.com/pedroalmir/datavis-course/master/trabalho_final/"
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<div class="row"><div class="col-md-12 text-center h3">Imports Section</div></div>`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<code>Style</code>
<style>
  .node {
		cursor: pointer;
	}

	.node circle {
	  fill: #fff;
	  stroke: steelblue;
	  stroke-width: 3px;
	}

	.node text {
	  font: 12px sans-serif;
	}

	.link {
	  fill: none;
	  stroke: #ccc;
	  stroke-width: 2px;
	}

/* Taken from https://github.com/cpsievert/LDAvis */
/* Copyright 2013, AT&T Intellectual Property */
/* MIT Licence */
.ldavis_container path {
  fill: none;
  stroke: none;
}

.ldavis_container .xaxis .tick.major {
    fill: black;
    stroke: black;
    stroke-width: 0.1;
    opacity: 0.7;
}

.ldavis_container .slideraxis {
    fill: black;
    stroke: black;
    stroke-width: 0.4;
    opacity: 1;
}

.ldavis_container text {
    font-family: sans-serif;
    font-size: 11px;
}

/*om: smaller font */
.ldavis_container * {
   font-size: 11px;
}

/*om: so that the "lambda box is right aligned */
.ldavis_container div {
    margin-right: 0px;
}

.info {
  padding: 6px 8px;
  font: 14px/16px Arial, Helvetica, sans-serif;
  background: white;
  background: rgba(255,255,255,0.8);
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  border-radius: 5px;
}

.info h4 {
  margin: 0 0 5px;
  color: #777;
}

.legend {
  text-align: left;
  line-height: 18px;
  color: #555;
}
.legend i {
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 8px;
  opacity: 0.7;
}

#chart4 g.row text {
    fill: black !important;
}
.dc-chart path.dc-symbol, .dc-legend g.dc-legend-item.fadeout {
  fill-opacity: 0.5;
  stroke-opacity: 0.5; }

.dc-chart rect.bar {
  stroke: none;
  cursor: pointer; }
  .dc-chart rect.bar:hover {
    fill-opacity: .5; }

.dc-chart rect.deselected {
  stroke: none;
  fill: #ccc; }

.dc-chart .pie-slice {
  fill: #fff;
  font-size: 12px;
  cursor: pointer; }
  .dc-chart .pie-slice.external {
    fill: #000; }
  .dc-chart .pie-slice :hover, .dc-chart .pie-slice.highlight {
    fill-opacity: .8; }

.dc-chart .pie-path {
  fill: none;
  stroke-width: 2px;
  stroke: #000;
  opacity: 0.4; }

.dc-chart .selected path, .dc-chart .selected circle {
  stroke-width: 3;
  stroke: #ccc;
  fill-opacity: 1; }

.dc-chart .deselected path, .dc-chart .deselected circle {
  stroke: none;
  fill-opacity: .5;
  fill: #ccc; }

.dc-chart .axis path, .dc-chart .axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges; }

.dc-chart .axis text {
  font: 10px sans-serif; }

.dc-chart .grid-line, .dc-chart .axis .grid-line, .dc-chart .grid-line line, .dc-chart .axis .grid-line line {
  fill: none;
  stroke: #ccc;
  shape-rendering: crispEdges; }

.dc-chart .brush rect.selection {
  fill: #4682b4;
  fill-opacity: .125; }

.dc-chart .brush .custom-brush-handle {
  fill: #eee;
  stroke: #666;
  cursor: ew-resize; }

.dc-chart path.line {
  fill: none;
  stroke-width: 1.5px; }

.dc-chart path.area {
  fill-opacity: .3;
  stroke: none; }

.dc-chart path.highlight {
  stroke-width: 3;
  fill-opacity: 1;
  stroke-opacity: 1; }

.dc-chart g.state {
  cursor: pointer; }
  .dc-chart g.state :hover {
    fill-opacity: .8; }
  .dc-chart g.state path {
    stroke: #fff; }

.dc-chart g.deselected path {
  fill: #808080; }

.dc-chart g.deselected text {
  display: none; }

.dc-chart g.row rect {
  fill-opacity: 0.8;
  cursor: pointer; }
  .dc-chart g.row rect:hover {
    fill-opacity: 0.6; }

.dc-chart g.row text {
  fill: #fff;
  font-size: 12px;
  cursor: pointer; }

.dc-chart g.dc-tooltip path {
  fill: none;
  stroke: #808080;
  stroke-opacity: .8; }

.dc-chart g.county path {
  stroke: #fff;
  fill: none; }

.dc-chart g.debug rect {
  fill: #00f;
  fill-opacity: .2; }

.dc-chart g.axis text {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none; }

.dc-chart .node {
  font-size: 0.7em;
  cursor: pointer; }
  .dc-chart .node :hover {
    fill-opacity: .8; }

.dc-chart .bubble {
  stroke: none;
  fill-opacity: 0.6; }

.dc-chart .highlight {
  fill-opacity: 1;
  stroke-opacity: 1; }

.dc-chart .fadeout {
  fill-opacity: 0.2;
  stroke-opacity: 0.2; }

.dc-chart .box text {
  font: 10px sans-serif;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none; }

.dc-chart .box line {
  fill: #fff; }

.dc-chart .box rect, .dc-chart .box line, .dc-chart .box circle {
  stroke: #000;
  stroke-width: 1.5px; }

.dc-chart .box .center {
  stroke-dasharray: 3, 3; }

.dc-chart .box .data {
  stroke: none;
  stroke-width: 0px; }

.dc-chart .box .outlier {
  fill: none;
  stroke: #ccc; }

.dc-chart .box .outlierBold {
  fill: red;
  stroke: none; }

.dc-chart .box.deselected {
  opacity: 0.5; }
  .dc-chart .box.deselected .box {
    fill: #ccc; }

.dc-chart .symbol {
  stroke: none; }

.dc-chart .heatmap .box-group.deselected rect {
  stroke: none;
  fill-opacity: 0.5;
  fill: #ccc; }

.dc-chart .heatmap g.axis text {
  pointer-events: all;
  cursor: pointer; }

.dc-chart .empty-chart .pie-slice {
  cursor: default; }
  .dc-chart .empty-chart .pie-slice path {
    fill: #fee;
    cursor: default; }

.dc-data-count {
  float: right;
  margin-top: 15px;
  margin-right: 15px; }
  .dc-data-count .filter-count, .dc-data-count .total-count {
    color: #3182bd;
    font-weight: bold; }

.dc-legend {
  font-size: 11px; }
  .dc-legend .dc-legend-item {
    cursor: pointer; }

.dc-hard .number-display {
  float: none; }

div.dc-html-legend {
  overflow-y: auto;
  overflow-x: hidden;
  height: inherit;
  float: right;
  padding-right: 2px; }
  div.dc-html-legend .dc-legend-item-horizontal {
    display: inline-block;
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer; }
    div.dc-html-legend .dc-legend-item-horizontal.selected {
      background-color: #3182bd;
      color: white; }
  div.dc-html-legend .dc-legend-item-vertical {
    display: block;
    margin-top: 5px;
    padding-top: 1px;
    padding-bottom: 1px;
    cursor: pointer; }
    div.dc-html-legend .dc-legend-item-vertical.selected {
      background-color: #3182bd;
      color: white; }
  div.dc-html-legend .dc-legend-item-color {
    display: table-cell;
    width: 12px;
    height: 12px; }
  div.dc-html-legend .dc-legend-item-label {
    line-height: 12px;
    display: table-cell;
    vertical-align: middle;
    padding-left: 3px;
    padding-right: 3px;
    font-size: 0.75em; }

.dc-html-legend-container {
  height: inherit; }
</style>`
)});
  const child2 = runtime.module(define2);
  main.import("LDAvis", child2);
  const child3 = runtime.module(define3);
  main.import("select", child3);
  main.variable(observer("L")).define("L", ["require"], function(require){return(
require('leaflet@1.5.1')
)});
  main.variable(observer("dc")).define("dc", ["require"], function(require){return(
require("dc")
)});
  main.variable(observer("crossfilter")).define("crossfilter", ["require"], function(require){return(
require("crossfilter2")
)});
  main.variable(observer("d3cloud")).define("d3cloud", ["require"], function(require){return(
require('d3-cloud')
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3")
)});
  main.variable(observer("d3t")).define("d3t", ["require"], function(require){return(
require("d3@3")
)});
  main.variable(observer("$")).define("$", ["require"], function(require){return(
require('jquery').then(jquery => {
  window.jquery = jquery;
  return require('popper@1.0.1/index.js').catch(() => jquery);
})
)});
  main.variable(observer("bootstrap")).define("bootstrap", ["require"], function(require){return(
require('bootstrap')
)});
  return main;
}
