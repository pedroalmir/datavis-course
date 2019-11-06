// https://observablehq.com/d/44ff145d6f990ab6@1255
import define1 from "./2683d7ccbaaf16d5@258.js";
import define2 from "./7e52a1d3a3ee8f9c@448.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Trends and challenges in eHealth Development
This work aims to analyze trends and challenges in the development of eHealth solutions, from the perspective of ICT professionals, and having as data source the Stack Overflow discussions.

To answer our questions, we decided to use word clouds [WATTENBERG and VIEGAS, 2008], node-link diagrams [HEER et al., 2010], bubble maps [HEER et al., 2010], and other simple graphics as line, bar, and pie charts. All visualizations were developed using a JavaScript library called D3.js`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<code>css</code> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"><link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="crossorigin=""/>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`We started getting the posts in the Stack Overflow database.<br/> 
The following tags were used:<br/>
<table class="table table-striped table-bordered table-sm" style="margin: 0px 20px; width: 95%">
  <thead>
    <tr>
      <th scope="col" class="align-middle text-center">Tags</th>
      <th scope="col" class="align-middle">Description (adapted from SO)</th>
      <th scope="col" class="align-middle text-center">Retrieved Posts</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td  class="align-middle text-center">dicom pydicom fo-dicom evil-dicom dicomweb</td>
      <td>Digital Imaging and Communications in Medicine standard defines formats for storing and communicating medical images.</td>
      <td class="align-middle text-center">1411</td>
    </tr>
<tr><td class="align-middle text-center">hl7 hl7-fhir hl7-v2 hl7-v3 hl7-cda </td>
<td>The HL7 messaging standard is a communication standard for exchanging electronic information in the domain of health care.</td>
<td class="align-middle text-center">1341</td></tr>
<tr><td class="align-middle text-center">health-kit</td>
<td>HealthKit is a framework for iOS and watchOS that allows health and fitness services to share their data with the new Health app</td>
<td class="align-middle text-center">848</td></tr>
<tr><td class="align-middle text-center">google-fit</td>
<td>Google Fit is an open platform that lets users control their fitness data.</td>
<td class="align-middle text-center">665</td></tr>
<tr><td class="align-middle text-center">medical</td>
<td>The Medical tag relates to coding solutions in the field of medicine.</td>
<td class="align-middle text-center">286</td></tr>
<tr><td class="align-middle text-center">google-fit-sdk</td>
<td>An open platform that lets users control fitness data. Google Fit lets developers build smarter apps</td>
<td class="align-middle text-center">225</td></tr>
<tr><td class="align-middle text-center">researchkit</td>
<td>ResearchKit is an open source software framework that makes it easy to create apps for medical research or for other research projects.</td>
<td class="align-middle text-center">114</td></tr>
<tr><td class="align-middle text-center">hkhealthstore</td>
<td>The HealthKit store acts as a link to all the data managed by HealthKit.</td>
<td class="align-middle text-center">89</td></tr>
<tr><td class="align-middle text-center">niftynet</td>
<td>NiftyNet is a TensorFlow-based open-source convolutional neural networks (CNNs) platform for research in medical image analysis.</td>
<td class="align-middle text-center">69</td></tr>
<tr><td class="align-middle text-center">withings</td>
<td>Withings is a company that makes hardware and software to track body metrics and health statistics.</td>
<td class="align-middle text-center">41</td></tr>
<tr><td class="align-middle text-center">healthvault</td>
<td>Microsoft HealthVault helps you gather, store, use, and share health data</td>
<td class="align-middle text-center">32</td></tr>
<tr><td class="align-middle text-center">heartrate</td>
<td>Questions related to heart signals monitoring.</td>
<td class="align-middle text-center">27</td></tr>
<tr><td class="align-middle text-center">openehr</td>
<td>openEHR is an open standard in health informatics that describes the management and storage, retrieval and exchange of health data</td>
<td class="align-middle text-center">24</td></tr>
<tr><td class="align-middle text-center">carekit</td>
<td>CareKit is Apple's framework includes core modules for developing apps that help people better understand and manage their health.</td>
<td class="align-middle text-center">18</td></tr>
<tr><td class="align-middle text-center">mapmyfitness</td>
<td>A set of Fitness Developer API from mapmyfitness.com</td>
<td class="align-middle text-center">14</td></tr>
<tr><td class="align-middle text-center">google-health</td>
<td>Google-Health is a health record service provided by Google. </td>
<td class="align-middle text-center">9</td></tr>
<tr><td class="align-middle text-center">samsung-health</td>
<td>It provides SDKs to help developers and healthcare providers thrive in an environment that connects apps, devices, and services.</td>
<td class="align-middle text-center">6</td></tr>
<tr><td class="align-middle text-center">intersystems-healthshare</td>
<td>Questions about HL7 (Health Level Seven), CDA (Clinical Document Architecture), Caché or other HIT technologies</td>
<td class="align-middle text-center">2</td></tr>
  </tbody>
</table><br/>
<strong style="margin-left: 20px;">Stack Exchange</strong>: <a href="https://data.stackexchange.com/stackoverflow/query/1127140/ehealth-discussions" target="_blank">ehealth-discussions query</a><br/>`
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
  main.variable(observer("myData")).define("myData", ["d3","URLbase","userCountry"], function(d3,URLbase,userCountry){return(
d3.csv(URLbase + "data/Posts.csv")
  .then(function(data){
    // Data preprocessing...
    let parseDate = d3.timeParse("%Y-%m-%d")
    
    let idMap = d3.map();
    let countryMap = d3.map();
    let posts = [];
    let discussions = [];
    
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
        // Filter discussions
        if(d.AcceptedAnswerId === "" && d.UserDiscussionCount > 0){
          discussions.push({"id": d.Id, "title": d.Title, "score": d.Score, "dCount": d.UserDiscussionCount})
        }
      
        //if(pLanguage == "Unknown") console.log(tags)
        idMap.set(d.Id, i)
        var userLocation = userCountry.get(d.UserId)
        if(userLocation !== undefined){
          var countryCount = countryMap.get(userLocation.country)
          if(countryCount !== undefined) countryMap.set(userLocation.country, countryCount + 1)
          else countryMap.set(userLocation.country, 1)
        }
        posts.push({
          "id": d.Id,
          "creationDate": date, 
          "year": date.getFullYear(),
          "score": d.Score,
          "username": d.UserDisplayName,
          "userReputation": d.UserReputation,
          "userLocation": userLocation,
          "tags": tags,
          "os": os,
          "pLanguage": pLanguage
        })
     }
  })
  
  return {"idMap": idMap, "posts": posts, "countryMap": countryMap, 
          "discussions": discussions.sort((d1, d2) => d2.score - d1.score)}
  })
)});
  main.variable(observer("posts")).define("posts", ["d3","URLbase"], function(d3,URLbase){return(
d3.csv(URLbase + "data/PostsTreated.csv")
)});
  main.variable(observer("ldaModel")).define("ldaModel", ["d3","URLbase"], function(d3,URLbase){return(
d3.json(URLbase + "lda/lda_data/output/d3js/lda.json")
)});
  main.variable(observer("by_year")).define("by_year", ["crossfilter","myData","md","container","dc","d3"], function(crossfilter,myData,md,container,dc,d3)
{
  let facts = crossfilter(myData.posts)
  let dateDimPosts = facts.dimension(d => d.year);
  let postsByYearGroup = dateDimPosts.group()
  
  let view = md`${container('chart1','Number of eHealth-related Posts by Year in Stack Overflow Website')}`
  let barChart = dc.barChart(view.querySelector("#chart1"))
  
  
  barChart
    .width(950).height(400).gap(30)
    .margins({top: 30, right: 50, bottom: 25, left: 40})
    .dimension(dateDimPosts)
    .group(postsByYearGroup)
    .yAxisLabel("Posts by Year")
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
  let facts = crossfilter(myData.posts)
  let osDimPosts = facts.dimension(d => d.os)
  let filter = facts.dimension(d => d.os).filter(function(d){ return d !== 'Unknown';})
  
  let postsByOSGroup = osDimPosts.group()
  let finalGroup = remove_empty_bins(postsByOSGroup)
  
  let view = md`${container('chart2','Number of eHealth-related Posts by Operational System')}`
  let barChart = dc.barChart(view.querySelector("#chart2"))
  
  barChart
    .width(950).height(400).gap(30)
    .margins({top: 30, right: 50, bottom: 25, left: 40})
    .dimension(osDimPosts)
    .group(finalGroup)
    .yAxisLabel("Posts by Operational System")
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
  let facts = crossfilter(myData.posts)
  let pLanguageDimPosts = facts.dimension(d => d.pLanguage);
  let filter = facts.dimension(d => d.pLanguage).filter(function(d){ return d !== 'Unknown';})
  
  let postsByPLanguageGroup = pLanguageDimPosts.group()
  let finalGroup = remove_empty_bins(postsByPLanguageGroup)
  
  let view = md`${container('chart3','Number of eHealth-related Posts by Programming Language')}`
  let barChart = dc.barChart(view.querySelector("#chart3"))
  
  barChart
    .width(950).height(400).gap(30)
    .margins({top: 30, right: 50, bottom: 25, left: 40})
    .dimension(pLanguageDimPosts)
    .group(finalGroup)
    .yAxisLabel("Posts by Programming Language")
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
  main.variable(observer("by_tags")).define("by_tags", ["crossfilter","myData","md","container","dc"], function(crossfilter,myData,md,container,dc)
{
  let facts = crossfilter(myData.posts)
  let tagsDimPosts = facts.dimension(d => d.tags, true);
  let postsByTagsGroup = tagsDimPosts.group()
  
  let view = md`${container('chart4','Number of eHealth-related Posts by Tags')}`
  let rowChart = dc.rowChart(view.querySelector("#chart4"))
  
  rowChart
    .renderLabel(true)
    .width(950).height(600)
    .margins({top: 30, right: 50, bottom: 25, left: 40})
    .dimension(tagsDimPosts)
    .group(postsByTagsGroup)
    .label(d => d.key + ": " + d.value)
    .cap(10)
    .ordering(function(d){return -d.value;})
    .xAxis()
  
  rowChart.legend(dc.legend().x(10).y(10).itemHeight(13).gap(5))
  
  dc.renderAll()
  
  return view     
}
);
  main.variable(observer()).define(["html"], function(html){return(
html`
  <div class='row' style='margin: 10px 20px;'>
    <h5>Map of Posts in World</h5>
    <div class='col-md-12' id='mapid' style="min-height: 500px;"></div>
  </div>`
)});
  main.variable(observer("vizContainer")).define("vizContainer", ["d3","DOM","width","ldaModel","LDAvis"], function*(d3,DOM,width,ldaModel,LDAvis)
{
    yield d3.select(DOM.element('div', { style: `width:${width}px;height:${800*ldaModel.R/30}px` }))
                   .attr('id', 'ldavis_container1')
                   .classed('ldavis_container', true)
                   .node();
    new LDAvis('#ldavis_container1', ldaModel);
}
);
  const child1 = runtime.module(define1);
  main.import("LDAvis", child1);
  main.variable(observer("wordCloud")).define("wordCloud", ["createWordCloudSvg","words"], function(createWordCloudSvg,words){return(
createWordCloudSvg(words)
)});
  main.variable(observer()).define(["printList","docs"], function(printList,docs){return(
printList(docs.nouns().out('topk'))
)});
  main.variable(observer("createWordCloudSvg")).define("createWordCloudSvg", ["d3cloud","width","cloudConfig","cloudScale","rotateWord","baseFont","fontSize","DOM","d3","wordColors"], function(d3cloud,width,cloudConfig,cloudScale,rotateWord,baseFont,fontSize,DOM,d3,wordColors){return(
function createWordCloudSvg(words) {
  var layout = d3cloud()
    .size([width, width * 9/16]) 
    .words(words)
    .padding(cloudConfig.padding * cloudScale)
    .rotate(rotateWord)
    .font(baseFont)
    .fontSize(fontSize)
    .on('word', addWord);

  const svg = DOM.svg(layout.size()[0], layout.size()[1]); // width, height
  const group = d3.select(svg).append('g')
    //.attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
  
  function addWord (word) {
    const text = group.append('text');
    text.style('font-size', '2px')
      .style('font-family', word.font)
      .style('fill', wordColors(Math.random()))
      .style('cursor', 'pointer')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${[word.x, word.y]})rotate(${word.rotate})`)
      .text(word.text)
      //.transition()
      //.duration(1500)
      //.ease(d3.easeLinear)
      .style('font-size', `${word.size}px`);
    text.append('title').text(`${word.text} (${word.count})`); // toolitp
  }
  
  layout.start();
  return svg;
}
)});
  main.variable(observer("frequencyToSize")).define("frequencyToSize", function(){return(
function (frequency) {
  return Math.sqrt(frequency);
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
  main.variable(observer("baseFont")).define("baseFont", ["fontFamilies"], function(fontFamilies){return(
function (d) {
  return fontFamilies[~~(Math.random() * fontFamilies.length)]
}
)});
  main.variable(observer("fontFamilies")).define("fontFamilies", function(){return(
['Corben', 'Pacifico', 'impact']
)});
  main.variable(observer("rotateWord")).define("rotateWord", function(){return(
function () { 
  return 0;
  //return ~~(Math.random() * 4) * 45 - 45; 
}
)});
  main.define("initial cloudScale", function(){return(
1
)});
  main.variable(observer("mutable cloudScale")).define("mutable cloudScale", ["Mutable", "initial cloudScale"], (M, _) => new M(_));
  main.variable(observer("cloudScale")).define("cloudScale", ["mutable cloudScale"], _ => _.generator);
  main.variable(observer("cloudConfig")).define("cloudConfig", ["width"], function(width){return(
{
  minFontSize: 10,
  maxFontSize: 80,
  height: width/2,
  padding: 1,
}
)});
  main.variable(observer("wordColors")).define("wordColors", ["d3"], function(d3){return(
d3.scaleSequential(d3.interpolateGreys)
)});
  main.variable(observer("words")).define("words", ["toWords","docs"], function(toWords,docs){return(
toWords(docs.nouns().out('topk')) // sort by frequency
  .sort((a,b) => b.freq - a.freq).slice(0, 100)
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
  main.variable(observer("freq")).define("freq", ["docs"], function(docs){return(
docs.nouns().out('frequency')
)});
  main.variable(observer("docs")).define("docs", ["nlp","text"], function(nlp,text){return(
nlp(text)
)});
  main.variable(observer("text")).define("text", ["posts"], function(posts)
{
  let text = '';
  posts.forEach(function(d, i){
    text += d.text + '\n'
  })
  return text
}
);
  const child2 = runtime.module(define2);
  main.import("printList", child2);
  main.variable(observer("myMapVis")).define("myMapVis", ["initializingMap","L","myData","worldGeoJson","style"], function(initializingMap,L,myData,worldGeoJson,style)
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
    let posts = myData.countryMap.get(country)
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
  
  geoj = L.geoJson(worldGeoJson, {style: style, onEachFeature: onEachFeature}).addTo(mapInstance);
  infoControl.addTo(mapInstance);
  
  return mapInstance
}
);
  main.variable(observer("legend")).define("legend", ["L","mapColors","colorScale","d3","outlierMapColor","myMapVis"], function(L,mapColors,colorScale,d3,outlierMapColor,myMapVis)
{
  let legendControl = L.control({position: 'bottomright'});

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
  main.variable(observer("style")).define("style", ["applyColorScale"], function(applyColorScale){return(
function style(feature) {
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
  main.variable(observer("applyColorScale")).define("applyColorScale", ["outlierMapColor","colorScale","myData"], function(outlierMapColor,colorScale,myData){return(
function applyColorScale(countryName){
  if(countryName == 'United States of America' || countryName == 'India') return outlierMapColor
  else return colorScale(myData.countryMap.get(countryName))
}
)});
  main.variable(observer("outlierMapColor")).define("outlierMapColor", ["d3"], function(d3){return(
d3.rgb(d3.schemeGreens[9][8]).darker(2).formatHex()
)});
  main.variable(observer("mapColors")).define("mapColors", ["d3"], function(d3){return(
d3.schemeGreens[6]
)});
  main.variable(observer("colorScale")).define("colorScale", ["d3","mapColors"], function(d3,mapColors){return(
d3.scaleQuantize().domain([0, 77]).range(mapColors)
)});
  main.variable(observer("container")).define("container", function(){return(
function container(id, title) { 
  return `<div class='row' style='margin: 10px 20px;'><div class='col-md-12' id='${id}'><h5>${title}</h5></div></div>`
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
  main.variable(observer()).define(["html"], function(html){return(
html`<code>Style</code>
<style>
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
  main.variable(observer("lda")).define("lda", ["getStopWords","stemmer"], function(getStopWords,stemmer)
{
  /**
 * Based on javascript implementation https://github.com/awaisathar/lda.js
 * Original code based on http://www.arbylon.net/projects/LdaGibbsSampler.java
 * 
 * @param {*} sentences 
 * @param {*} numberOfTopics 
 * @param {*} numberOfTermsPerTopic 
 * @param {*} alphaValue 
 * @param {*} betaValue 
 * @param {*} randomSeed 
 */
function process(sentences, numberOfTopics, numberOfTermsPerTopic, alphaValue, betaValue, randomSeed) {
    console.log('aqui')
    var lda = new LDA();
    // The probabilities will consist of topics and their included terms 
    // [[{"term":"word1", "probability":0.065}, {"term":"word2", "probability":0.047}, ... ], 
    // [{"term":"word1", "probability":0.085}, {"term":"word2", "probability":0.024}, ... ]].
    var topicProbabilities = [];
    // Index-encoded array of sentences, with each row containing the indices of the words in the vocabulary.
    var documents = new Array();
    // Hash of vocabulary words and the count of how many times each word has been seen.
    var f = {};
    // Vocabulary of unique words (porter stemmed).
    var vocab = new Array();
    // Vocabulary of unique words in their original form.
    var vocabOrig = {};
    // Array of stop words
    var stopwords = getStopWords();

    if (sentences && sentences.length > 0) {
        for(var i = 0; i < sentences.length; i++) {
            if (sentences[i] == "") continue;

            documents[i] = new Array();
            var words = sentences[i] ? sentences[i].split(/[\s,\"]+/) : null;

            if(!words) continue;

            for(var wc = 0; wc < words.length; wc++) {
                var w = words[wc].toLowerCase().replace(/[^a-z\'A-Z0-9\u00C0-\u00ff ]+/g, '');
                var wStemmed = stemmer(w);
                if (w == "" || !wStemmed || w.length == 1 || stopwords.indexOf(w.replace("'", "")) > -1 
                    || stopwords.indexOf(wStemmed) > -1 || w.indexOf("http") == 0) continue;
                if (f[wStemmed]) { 
                    f[wStemmed] = f[wStemmed] + 1;
                } else if(wStemmed) { 
                    f[wStemmed] = 1; 
                    vocab.push(wStemmed);
                    vocabOrig[wStemmed] = w;
                };
                
                documents[i].push(vocab.indexOf(wStemmed));
            }
        }

        var V = vocab.length;
        //var M = documents.length;
        var K = parseInt(numberOfTopics);
        var alpha = alphaValue || 0.1;                                // per-document distributions over topics
        var beta = betaValue   || .01;                                // per-topic distributions over words
        documents = documents.filter((doc) => { return doc.length }); // filter empty documents

        lda.configure(documents, V, 10000, 2000, 100, 10, randomSeed);
        lda.gibbs(K, alpha, beta);

        var theta = lda.getTheta();
        var phi = lda.getPhi();

        //topics
        var topTerms = numberOfTermsPerTopic;
        var topicText = new Array();
        for (var k = 0; k < phi.length; k++) {
            var things = new Array();
            for (var w = 0; w < phi[k].length; w++) {
                things.push("" + phi[k][w].toPrecision(2) + "_" + vocab[w] + "_" + vocabOrig[vocab[w]]);
            }
            things.sort().reverse();
            //console.log(things);
            if(topTerms > vocab.length) topTerms = vocab.length;
            topicText[k] = '';
            //console.log('Topic ' + (k + 1));
            var row = [];
            
            for (var t = 0; t < topTerms; t++) {
                var topicTerm = things[t].split("_")[2];
                var prob = parseInt(things[t].split("_")[0] * 100);
                if (prob < 2) continue;
                
                //console.log('Top Term: ' + topicTerm + ' (' + prob + '%)');
                topicText[k] += (topicTerm + " ");
                
                var term = {};
                term.term = topicTerm;
                term.probability = parseFloat(things[t].split("_")[0]);
                row.push(term);
            }

            topicProbabilities.push(row);
        }
        //console.log(topicText);
        var sentencesData = [];
        for (var m = 0; m < theta.length; m++) {
            var probPerTopic = {};
		    for (var k = 0; k < theta[m].length; k++) {
                probPerTopic["topic" + k] = {"text": topicText[k].trim(), "probability": theta[m][k] * 100};
            }
            sentencesData.push({"sentence": sentences[m], probPerTopic})
            //console.log(probPerTopic);
	    }
    }
    
    return {"topicProbabilities": topicProbabilities, "sentencesData": sentencesData};
}

function makeArray(x) {
    var a = new Array();    
    for (var i = 0; i < x; i++)  {
        a[i] = 0;
    }
    return a;
}

function make2DArray(x, y) {
    var a = new Array();    
    for (var i = 0; i < x; i++)  {
        a[i] = new Array();
        for (var j = 0; j < y; j++)
            a[i][j] = 0;
    }
    return a;
}

class LDA {
    constructor() {
        this.documents, this.z, this.nw, this.nd, this.nwsum, this.ndsum; 
        this.thetasum, this.phisum, this.V, this.K, this.alpha, this.beta;

        this.THIN_INTERVAL = 20;
        this.BURN_IN = 100;
        this.ITERATIONS = 1000;
        this.SAMPLE_LAG;
        this.RANDOM_SEED;
        this.dispcol = 0;
        this.numstats = 0;
    }

    initialState(K) {
        var i;
        var M = this.documents.length;
        this.nw = make2DArray(this.V, K);
        this.nd = make2DArray(M, K);
        this.nwsum = makeArray(K);
        this.ndsum = makeArray(M);
        this.z = new Array();

        for (i = 0; i < M; i++)
            this.z[i] = new Array();

        for (var m = 0; m < M; m++) {
            var N = this.documents[m].length;
            this.z[m] = new Array();
            for (var n = 0; n < N; n++) {
                var topic = parseInt("" + (this.getRandom() * K));
                this.z[m][n] = topic;
                this.nw[this.documents[m][n]][topic]++;
                this.nd[m][topic]++;
                this.nwsum[topic]++;
            }
            this.ndsum[m] = N;
        }
    };

    sampleFullConditional(m, n) {
        var topic = this.z[m][n];
        this.nw[this.documents[m][n]][topic]--;
        this.nd[m][topic]--;
        this.nwsum[topic]--;
        this.ndsum[m]--;
        var p = makeArray(this.K);
        for (var k = 0; k < this.K; k++) {
            p[k] = (this.nw[this.documents[m][n]][k] + this.beta) / (this.nwsum[k] + this.V * this.beta)
                * (this.nd[m][k] + this.alpha) / (this.ndsum[m] + this.K * this.alpha);
        }
        for (var k = 1; k < p.length; k++) {
            p[k] += p[k - 1];
        }
        var u = this.getRandom() * p[this.K - 1];
        for (topic = 0; topic < p.length; topic++) {
            if (u < p[topic])
                break;
        }
        this.nw[this.documents[m][n]][topic]++;
        this.nd[m][topic]++;
        this.nwsum[topic]++;
        this.ndsum[m]++;
        return topic;
    };

    updateParams() {
        for (var m = 0; m < this.documents.length; m++) {
            for (var k = 0; k < this.K; k++) {
                this.thetasum[m][k] += (this.nd[m][k] + this.alpha) / (this.ndsum[m] + this.K * this.alpha);
            }
        }
        for (var k = 0; k < this.K; k++) {
            for (var w = 0; w < this.V; w++) {
                this.phisum[k][w] += (this.nw[w][k] + this.beta) / (this.nwsum[k] + this.V * this.beta);
            }
        }
        this.numstats++;
    };

    getRandom() {
        if (this.RANDOM_SEED) {
            // generate a pseudo-random number using a seed to ensure reproducable results.
            var x = Math.sin(this.RANDOM_SEED++) * 1000000;
            return x - Math.floor(x);
        } else {
            // use standard random algorithm.
            return Math.random();
        }
    };

    configure(docs, v, iterations, burnIn, thinInterval, sampleLag, randomSeed) {
        this.ITERATIONS = iterations;
        this.BURN_IN = burnIn;
        this.THIN_INTERVAL = thinInterval;
        this.SAMPLE_LAG = sampleLag;
        this.RANDOM_SEED = randomSeed;
        this.documents = docs;
        this.V = v;
        this.dispcol = 0;
        this.numstats = 0;
    };

    gibbs(K, alpha, beta) {
        var i;
        this.K = K;
        this.alpha = alpha;
        this.beta = beta;
        if (this.SAMPLE_LAG > 0) {
            this.thetasum = make2DArray(this.documents.length, this.K);
            this.phisum = make2DArray(this.K, this.V);
            this.numstats = 0;
        }
        this.initialState(K);
        //document.write("Sampling " + this.ITERATIONS
        //   + " iterations with burn-in of " + this.BURN_IN + " (B/S="
        //   + this.THIN_INTERVAL + ").<br/>");
        for (i = 0; i < this.ITERATIONS; i++) {
            for (var m = 0; m < this.z.length; m++) {
                for (var n = 0; n < this.z[m].length; n++) {
                    var topic = this.sampleFullConditional(m, n);
                    this.z[m][n] = topic;
                }
            }
            if ((i < this.BURN_IN) && (i % this.THIN_INTERVAL == 0)) {
                //document.write("B");
                this.dispcol++;
            }
            if ((i > this.BURN_IN) && (i % this.THIN_INTERVAL == 0)) {
                //document.write("S");
                this.dispcol++;
            }
            if ((i > this.BURN_IN) && (this.SAMPLE_LAG > 0) && (i % this.SAMPLE_LAG == 0)) {
                this.updateParams();
                //document.write("|");                
                if (i % this.THIN_INTERVAL != 0)
                    this.dispcol++;
            }
            if (this.dispcol >= 100) {
                //document.write("*<br/>");                
                this.dispcol = 0;
            }
        }
    };

    getTheta() {
        var theta = new Array();
        for (var i = 0; i < this.documents.length; i++)
            theta[i] = new Array();
        if (this.SAMPLE_LAG > 0) {
            for (var m = 0; m < this.documents.length; m++) {
                for (var k = 0; k < this.K; k++) {
                    theta[m][k] = this.thetasum[m][k] / this.numstats;
                }
            }
        } else {
            for (var m = 0; m < this.documents.length; m++) {
                for (var k = 0; k < this.K; k++) {
                    theta[m][k] = (this.nd[m][k] + this.alpha) / (this.ndsum[m] + this.K * this.alpha);
                }
            }
        }
        return theta;
    };

    getPhi() {
        var phi = new Array();
        for (var i = 0; i < this.K; i++)
            phi[i] = new Array();
        if (this.SAMPLE_LAG > 0) {
            for (var k = 0; k < this.K; k++) {
                for (var w = 0; w < this.V; w++) {
                    phi[k][w] = this.phisum[k][w] / this.numstats;
                }
            }
        } else {
            for (var k = 0; k < this.K; k++) {
                for (var w = 0; w < this.V; w++) {
                    phi[k][w] = (this.nw[w][k] + this.beta) / (this.nwsum[k] + this.V * this.beta);
                }
            }
        }
        return phi;
    };
};
  return process;
}
);
  main.variable(observer("stop_words")).define("stop_words", function(){return(
"(www|http|org|net|com|youtube|wiki|wikipedia|a|À|Á|Â|Ã|Ä|Å|Æ|Ç|È|É|Ê|Ë|Ì|Í|Î|Ï|Ð|Ñ|Ò|Ó|Ô|Õ|Ö|×|Ø|Ù|Ú|Û|Ü|Ý|Þ|ß|à|á|â|ã|ä|å|æ|ç|è|é|ê|ë|ì|í|î|ï|ð|ñ|ò|ó|ô|õ|ö|÷|ø|ù|ú|û|ü|ý|þ|¡|¢|£|¤|¥|¦|§|¨|©|ª|«|¬|®|¯|°|±|²|³|´|µ|¶|?|!|\"|#|$|%|&|'|+|,|-|/|:|;|<|=|>|@|¹|º|»|¼|½|¾|¿|*|…|’|’|—|d|£|”|(|)|.|~|·|¸|^|_|`|{|}|[|]|al|s|cra|lot|re|nt|ÿ|about|above|according|across|after|afterwards|again|against|albeit|all|almost|alone|along|already|also|although|always|am|among|amongst|an|and|another|any|anybody|anyhow|anyone|anything|anyway|anywhere|apart|are|around|as|at|av|be|became|because|become|becomes|becoming|been|before|beforehand|behind|being|below|beside|besides|between|beyond|both|but|by|can|cannot|canst|certain|cf|choose|contrariwise|cos|could|cu|day|do|does|doesn't|doing|dost|doth|double|down|dual|during|each|either|else|elsewhere|enough|et|etc|even|ever|every|everybody|everyone|everything|everywhere|except|excepted|excepting|exception|exclude|excluding|exclusive|far|farther|farthest|few|ff|first|for|formerly|forth|forward|from|front|further|furthermore|furthest|get|go|had|halves|hardly|has|hast|hath|have|he|hence|henceforth|her|here|hereabouts|hereafter|hereby|herein|hereto|hereupon|hers|herself|him|himself|hindmost|his|hither|hitherto|how|however|howsoever|i|ie|if|in|inasmuch|inc|include|included|including|indeed|indoors|inside|insomuch|instead|into|inward|inwards|is|it|its|itself|just|kind|kg|km|last|latter|latterly|less|lest|let|like|little|ltd|many|may|maybe|me|meantime|meanwhile|might|moreover|most|mostly|more|mr|mrs|ms|much|must|my|myself|namely|need|neither|never|nevertheless|next|no|nobody|none|nonetheless|noone|nope|nor|not|nothing|notwithstanding|now|nowadays|nowhere|of|off|often|ok|on|once|one|only|onto|or|other|others|otherwise|ought|our|ours|ourselves|out|outside|over|own|per|perhaps|plenty|provide|quite|rather|really|round|said|sake|same|sang|save|saw|see|seeing|seem|seemed|seeming|seems|seen|seldom|selves|sent|several|shalt|she|should|shown|sideways|since|slept|slew|slung|slunk|smote|so|some|somebody|somehow|someone|something|sometime|sometimes|somewhat|somewhere|spake|spat|spoke|spoken|sprang|sprung|stave|staves|still|such|supposing|than|that|the|thee|their|them|themselves|then|thence|thenceforth|there|thereabout|thereabouts|thereafter|thereby|therefore|therein|thereof|thereon|thereto|thereupon|these|they|this|those|thou|though|thrice|through|throughout|thru|thus|thy|thyself|till|to|together|too|toward|towards|ugh|unable|under|underneath|unless|unlike|until|up|upon|upward|upwards|us|use|used|using|very|via|vs|want|was|we|week|well|were|what|whatever|whatsoever|when|whence|whenever|whensoever|where|whereabouts|whereafter|whereas|whereat|whereby|wherefore|wherefrom|wherein|whereinto|whereof|whereon|wheresoever|whereto|whereunto|whereupon|wherever|wherewith|whether|whew|which|whichever|whichsoever|while|whilst|whither|who|whoa|whoever|whole|whom|whomever|whomsoever|whose|whosoever|why|will|wilt|with|within|without|worse|worst|would|wow|ye|yet|year|yippee|you|your|yours|yourself|yourselves|*)"
)});
  main.variable(observer("getStopWords")).define("getStopWords", function(){return(
function getStopWords(){
    return ['www', 'http', 'org', 'xml', 'net', 'com', 'youtube', 'wiki', 'wikipedia', '…', '’', '’', '—', 'd', '£', '”', 'al', 's', 'cra', 'lot', 're', 'nt', '?', '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~', '¡', '¢', '£', '¤', '¥', '¦', '§', '¨', '©', 'ª', '«', '¬', '®', '¯', '°', '±', '²', '³', '´', 'µ', '¶', '·', '¸', '¹', 'º', '»', '¼', '½', '¾', '¿', 'À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', '×', 'Ø', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'Þ', 'ß', 'à', 'á', 'â', 'ã', 'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ð', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', '÷', 'ø', 'ù', 'ú', 'û', 'ü', 'ý', 'þ', 'ÿ', 'a', 'about', 'above', 'according', 'across', 'after', 'afterwards', 'again', 'against', 'albeit', 'all', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'am', 'among', 'amongst', 'an', 'and', 'another', 'any', 'anybody', 'anyhow', 'anyone', 'anything', 'anyway', 'anywhere', 'apart', 'are', 'around', 'as', 'at', 'av', 'be', 'became', 'because', 'become', 'becomes', 'becoming', 'been', 'before', 'beforehand', 'behind', 'being', 'below', 'beside', 'besides', 'between', 'beyond', 'both', 'but', 'by', 'can', 'cannot', 'canst', 'certain', 'cf', 'choose', 'contrariwise', 'cos', 'could', 'cu', 'day', 'do', 'does', 'doesn\'t', 'doing', 'dost', 'doth', 'double', 'down', 'dual', 'during', 'each', 'either', 'else', 'elsewhere', 'enough', 'et', 'etc', 'even', 'ever', 'every', 'everybody', 'everyone', 'everything', 'everywhere', 'except', 'excepted', 'excepting', 'exception', 'exclude', 'excluding', 'exclusive', 'far', 'farther', 'farthest', 'few', 'ff', 'first', 'for', 'formerly', 'forth', 'forward', 'from', 'front', 'further', 'furthermore', 'furthest', 'get', 'go', 'had', 'halves', 'hardly', 'has', 'hast', 'hath', 'have', 'he', 'hence', 'henceforth', 'her', 'here', 'hereabouts', 'hereafter', 'hereby', 'herein', 'hereto', 'hereupon', 'hers', 'herself', 'him', 'himself', 'hindmost', 'his', 'hither', 'hitherto', 'how', 'however', 'howsoever', 'i', 'ie', 'if', 'in', 'inasmuch', 'inc', 'include', 'included', 'including', 'indeed', 'indoors', 'inside', 'insomuch', 'instead', 'into', 'inward', 'inwards', 'is', 'it', 'its', 'itself', 'just', 'kind', 'kg', 'km', 'last', 'latter', 'latterly', 'less', 'lest', 'let', 'like', 'little', 'ltd', 'many', 'may', 'maybe', 'me', 'meantime', 'meanwhile', 'might', 'moreover', 'most', 'mostly', 'more', 'mr', 'mrs', 'ms', 'much', 'must', 'my', 'myself', 'namely', 'need', 'neither', 'never', 'nevertheless', 'next', 'no', 'nobody', 'none', 'nonetheless', 'noone', 'nope', 'nor', 'not', 'nothing', 'notwithstanding', 'now', 'nowadays', 'nowhere', 'of', 'off', 'often', 'ok', 'on', 'once', 'one', 'only', 'onto', 'or', 'other', 'others', 'otherwise', 'ought', 'our', 'ours', 'ourselves', 'out', 'outside', 'over', 'own', 'per', 'perhaps', 'plenty', 'provide', 'quite', 'rather', 'really', 'round', 'said', 'sake', 'same', 'sang', 'save', 'saw', 'see', 'seeing', 'seem', 'seemed', 'seeming', 'seems', 'seen', 'seldom', 'selves', 'sent', 'several', 'shalt', 'she', 'should', 'shown', 'sideways', 'since', 'slept', 'slew', 'slung', 'slunk', 'smote', 'so', 'some', 'somebody', 'somehow', 'someone', 'something', 'sometime', 'sometimes', 'somewhat', 'somewhere', 'spake', 'spat', 'spoke', 'spoken', 'sprang', 'sprung', 'stave', 'staves', 'still', 'such', 'supposing', 'than', 'that', 'the', 'thee', 'their', 'them', 'themselves', 'then', 'thence', 'thenceforth', 'there', 'thereabout', 'thereabouts', 'thereafter', 'thereby', 'therefore', 'therein', 'thereof', 'thereon', 'thereto', 'thereupon', 'these', 'they', 'this', 'those', 'thou', 'though', 'thrice', 'through', 'throughout', 'thru', 'thus', 'thy', 'thyself', 'till', 'to', 'together', 'too', 'toward', 'towards', 'ugh', 'unable', 'under', 'underneath', 'unless', 'unlike', 'until', 'up', 'upon', 'upward', 'upwards', 'us', 'use', 'used', 'using', 'very', 'via', 'vs', 'want', 'was', 'we', 'week', 'well', 'were', 'what', 'whatever', 'whatsoever', 'when', 'whence', 'whenever', 'whensoever', 'where', 'whereabouts', 'whereafter', 'whereas', 'whereat', 'whereby', 'wherefore', 'wherefrom', 'wherein', 'whereinto', 'whereof', 'whereon', 'wheresoever', 'whereto', 'whereunto', 'whereupon', 'wherever', 'wherewith', 'whether', 'whew', 'which', 'whichever', 'whichsoever', 'while', 'whilst', 'whither', 'who', 'whoa', 'whoever', 'whole', 'whom', 'whomever', 'whomsoever', 'whose', 'whosoever', 'why', 'will', 'wilt', 'with', 'within', 'without', 'worse', 'worst', 'would', 'wow', 'ye', 'yet', 'year', 'yippee', 'you', 'your', 'yours', 'yourself', 'yourselves'];
}
)});
  main.variable(observer("stemmer")).define("stemmer", function()
{
//
// Based on javascript implementation https://github.com/words/stemmer
//
// Standard suffix manipulations.
var step2list = {
  ational: 'ate',
   tional: 'tion',
     enci: 'ence',
     anci: 'ance',
     izer: 'ize',
      bli: 'ble',
     alli: 'al',
    entli: 'ent',
      eli: 'e',
    ousli: 'ous',
  ization: 'ize',
    ation: 'ate',
     ator: 'ate',
    alism: 'al',
  iveness: 'ive',
  fulness: 'ful',
  ousness: 'ous',
    aliti: 'al',
    iviti: 'ive',
   biliti: 'ble',
     logi: 'log'
}

var step3list = {
  icate: 'ic',
  ative: '',
  alize: 'al',
  iciti: 'ic',
   ical: 'ic',
    ful: '',
   ness: ''
}

// Consonant-vowel sequences.
var consonant = '[^aeiou]'
var vowel = '[aeiouy]'
var consonants = '(' + consonant + '[^aeiouy]*)'
var vowels = '(' + vowel + '[aeiou]*)'

var gt0 = new RegExp('^' + consonants + '?' + vowels + consonants)
var eq1 = new RegExp('^' + consonants + '?' + vowels + consonants + vowels + '?$')
var gt1 = new RegExp('^' + consonants + '?(' + vowels + consonants + '){2,}')
var vowelInStem = new RegExp('^' + consonants + '?' + vowel)
var consonantLike = new RegExp('^' + consonants + vowel + '[^aeiouwxy]$')

// Exception expressions.
var sfxLl = /ll$/
var sfxE = /^(.+?)e$/
var sfxY = /^(.+?)y$/
var sfxIon = /^(.+?(s|t))(ion)$/
var sfxEdOrIng = /^(.+?)(ed|ing)$/
var sfxAtOrBlOrIz = /(at|bl|iz)$/
var sfxEED = /^(.+?)eed$/
var sfxS = /^.+?[^s]s$/
var sfxSsesOrIes = /^.+?(ss|i)es$/
var sfxMultiConsonantLike = /([^aeiouylsz])\1$/

var step2 = new RegExp('^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$')
var step3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/
var step4 = new RegExp('^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$')

// Stem `value`.
// eslint-disable-next-line complexity
function stemmer(value) {
  var firstCharacterWasLowerCaseY
  var match

  value = String(value).toLowerCase()

  // Exit early.
  if (value.length < 3) {
    return value
  }

  // Detect initial `y`, make sure it never matches.
  if (value.charCodeAt(0) === 121 /* Lowercase Y */ ) {
    firstCharacterWasLowerCaseY = true
    value = 'Y' + value.substr(1)
  }

  // Step 1a.
  if (sfxSsesOrIes.test(value)) {
    // Remove last two characters.
    value = value.substr(0, value.length - 2)
  } else if (sfxS.test(value)) {
    // Remove last character.
    value = value.substr(0, value.length - 1)
  }

  // Step 1b.
  if ((match = sfxEED.exec(value))) {
    if (gt0.test(match[1])) {
      // Remove last character.
      value = value.substr(0, value.length - 1)
    }
  } else if ((match = sfxEdOrIng.exec(value)) && vowelInStem.test(match[1])) {
    value = match[1]

    if (sfxAtOrBlOrIz.test(value)) {
      // Append `e`.
      value += 'e'
    } else if (sfxMultiConsonantLike.test(value)) {
      // Remove last character.
      value = value.substr(0, value.length - 1)
    } else if (consonantLike.test(value)) {
      // Append `e`.
      value += 'e'
    }
  }

  // Step 1c.
  if ((match = sfxY.exec(value)) && vowelInStem.test(match[1])) {
    // Remove suffixing `y` and append `i`.
    value = match[1] + 'i'
  }

  // Step 2.
  if ((match = step2.exec(value)) && gt0.test(match[1])) {
    value = match[1] + step2list[match[2]]
  }

  // Step 3.
  if ((match = step3.exec(value)) && gt0.test(match[1])) {
    value = match[1] + step3list[match[2]]
  }

  // Step 4.
  if ((match = step4.exec(value))) {
    if (gt1.test(match[1])) {
      value = match[1]
    }
  } else if ((match = sfxIon.exec(value)) && gt1.test(match[1])) {
    value = match[1]
  }

  // Step 5.
  if ((match = sfxE.exec(value)) && (gt1.test(match[1]) || (eq1.test(match[1]) && !consonantLike.test(match[1])))) {
    value = match[1]
  }

  if (sfxLl.test(value) && gt1.test(value)) {
    value = value.substr(0, value.length - 1)
  }

  // Turn initial `Y` back to `y`.
  if (firstCharacterWasLowerCaseY) {
    value = 'y' + value.substr(1)
  }

  return value
}
return stemmer
}
);
  main.variable(observer("nlpConfig")).define("nlpConfig", function()
{
  // default params:
  return {
    whitespace: true,   // remove hyphens, newlines, and force one space between words
    case: true,         // keep only first-word, and 'entity' titlecasing
    numbers: true,      // turn 'seven' to '7'
    punctuation: true,  // remove commas, semicolons - but keep sentence-ending punctuation
    unicode: true,      // visually romanize/anglicize 'Björk' into 'Bjork'.
    contractions: true, // turn "isn't" to "is not"
    acronyms: false,    //remove periods from acronyms, like 'F.B.I.'

    //---these ones don't run unless you want them to---
    
    
    parentheses: false, // remove words inside brackets (like these)
    possessives: true,  // turn "Google's tax return" to "Google tax return"
    plurals: false,     // turn "batmobiles" into "batmobile"
    verbs: false,       // turn all verbs into Infinitive form - "I walked" → "I walk"
    honorifics: false,  //turn 'Vice Admiral John Smith' to 'John Smith'
  }
}
);
  main.variable(observer("URLbase")).define("URLbase", function(){return(
"https://raw.githubusercontent.com/pedroalmir/datavis-course/master/trabalho_final/"
)});
  main.variable(observer("nlp")).define("nlp", ["require"], function(require){return(
require('compromise')
)});
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
