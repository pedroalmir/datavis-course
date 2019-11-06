// https://observablehq.com/@spencermountain/nlp-compromise@448
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`
# Compromise
[compromise](http://compromise.cool) is a javascript library that can parse, transform, and help use __text__ in a handy and uncomplicated way.

`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`

<div class="small">Get the hang of things:</div>
<div class="big">
  <a class="link" href="https://beta.observablehq.com/@spencermountain/tutorial-1">
    Tutorial #1 - Input → output
  </a>
</div>
<div class="big">
  <a class="link" href="https://beta.observablehq.com/@spencermountain/compromise-tutorial-2">
    Tutorial #2 - Match & transform
  </a>
</div>
<div class="big">
  <a class="link" href="https://beta.observablehq.com/@spencermountain/compromise-making-a-bot">
    Tutorial #3 - Making a bot
  </a>
</div>

<div class="small">but what about..:</div>
<div class="big">
  <a class="link" href="https://beta.observablehq.com/@spencermountain/compromise-filesize">
    Filesize
  </a>
</div>
<div class="big">
  <a class="link" href="https://beta.observablehq.com/@spencermountain/compromise-accuracy">
    Accuracy
  </a>
</div>
<div class="big">
  <a class="link" href="https://beta.observablehq.com/@spencermountain/compromise-performance">
    Performance
  </a>
</div>

<div class="small">Some documentation</div>
<div class="big">
  <a class="link" href="https://beta.observablehq.com/@spencermountain/compromise-api">
    API
  </a>
</div>
<div class="big">
  <a class="link" href="https://beta.observablehq.com/@spencermountain/compromise-plugins">
    Plugins
  </a>
</div>
<div class="big">
  <a class="link" href="https://beta.observablehq.com/@spencermountain/compromise-tags">
    Tags
  </a>
</div>
<div class="big">
  <a class="link" href="https://beta.observablehq.com/@spencermountain/compromise-match-syntax">
    Match Syntax
  </a>
</div>
<div class="big">
  <a class="link" href="https://beta.observablehq.com/@spencermountain/compromise-normalization">
    Normalization
  </a>
</div>
<div class="big">
  <a class="link" href="https://beta.observablehq.com/@spencermountain/compromise-output">
    Output
  </a>
</div>

<div class="small">Specific behaviours</div>
<div class="big">
  <a class="link" href="https://beta.observablehq.com/@spencermountain/nouns">
    Nouns
  </a>
</div>
<div class="big">
  <a class="link" href="https://beta.observablehq.com/@spencermountain/verbs">
    Verbs
  </a>
</div>
<div class="big">
  <a class="link" href="https://beta.observablehq.com/@spencermountain/compromise-values">
    Values
  </a>
</div>
<div class="big">
  <a class="link" href="https://beta.observablehq.com/@spencermountain/topics-named-entity-recognition">
    Named-Entity-Recognition
  </a>
</div>
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`so, this kinda stuff gets a lot easier using [compromise](http://compromise.cool):`
)});
  main.variable(observer("viewof txt")).define("viewof txt", ["html"], function(html){return(
html`<select>
  <option value="weezer/buddyholly">Weezer</option>
  <option value="rap/freshPrince">Fresh Prince</option>
  <option value="beatles/drivemycar">Beatles</option>
  <option value="friends/episode-109">Friends Transcript</option>
  <option value="sotu/Clinton_1996">State of the Union</option>
</select>`
)});
  main.variable(observer("txt")).define("txt", ["Generators", "viewof txt"], (G, _) => G.input(_));
  main.variable(observer()).define(["html"], function(html){return(
html`
part of speech tags:`
)});
  main.variable(observer()).define(["printHtml","doc"], function(printHtml,doc){return(
printHtml(doc)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Freq-list:`
)});
  main.variable(observer("viewof selector")).define("viewof selector", ["html"], function(html){return(
html`<select>
  <option value="nouns">Nouns</option>
  <option value="people">People</option>
  <option value="places">Places</option>
  <option value="organizations">Organizations</option>
  <option value="verbs">Verbs</option>
</select>`
)});
  main.variable(observer("selector")).define("selector", ["Generators", "viewof selector"], (G, _) => G.input(_));
  main.variable(observer()).define(["printList","doc","selector"], function(printList,doc,selector){return(
printList(doc[selector]().out('topk'))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
view more demos and examples at [compromise.cool](http://compromise.cool)

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`

---

### - Libraries - 
\`\`\`js
import {printList, printTags, printHtml} from '@spencermountain/nlp-compromise
\`\`\``
)});
  main.variable(observer("version")).define("version", ["nlp"], function(nlp){return(
nlp.version
)});
  main.variable(observer("printTags")).define("printTags", ["nlp"], function(nlp)
{ 
  let tagset = nlp().world().tags;
  const printTags = (tag, text) => {
    text += '<ul>' + tag;
    if (tagset[tag] && tagset[tag].downward) {
      tagset[tag].downward.forEach((t) => {
        text = printTags(t, text); //recursive
      });
    }
    return text + '</ul>';
  };
  //return a proper html element
 return (tag)=>{
   let el = document.createElement("div");
   el.innerHTML=printTags(tag, '')
   return el
 }
}
);
  main.variable(observer("printList")).define("printList", function()
{ 
  const max = 35
  return (list) => {
     let len=list.length
     list=list.slice(0, max)
     let el = document.createElement("table");
     el.innerHTML = list.reduce((str, o)=>{
       str += '<tr>'
       str += `<td style="color:#46468B;">${o.normal || o.text || ''}</td>`
       str += `<td style="color:#7A7A8B;">${o.count || ''}</td>`
       str += `<td style="color:#B7B7D1;">${o.percent+ '%'}</td>`
        str += '</tr>'
       return str
     },'')
     if(len>list.length){
       el.innerHTML+='<b>(of '+len+' results)<b>'
     }
     return el
   } 
}
);
  main.variable(observer("nlp")).define("nlp", ["require"], function(require){return(
require('compromise')
)});
  main.variable(observer("text")).define("text", ["txt"], async function(txt){return(
(await fetch(`https://unpkg.com/nlp-corpus@3.0.0/${txt}.txt`)).text()
)});
  main.variable(observer("printHtml")).define("printHtml", ["DOM"], function(DOM){return(
function printHtml(doc){
  let el = DOM.element()
  let html = doc.out('html')
  el.innerHTML = html
  //add a hover 'title'
  let sentences= el.children[0].children
  for (var i = 0; i < sentences.length; i++) {
    sentences[i].style='display:block;'
    for (var o = 0; o < sentences[i].children.length; o++) {
      let e=sentences[i].children[o]
      var tags = e.getAttribute('class').split(' ').map(c=>c.replace(/^nl-/,' '))
      e.classList.add('term')
      e.setAttribute('title', tags)
    }
  }
  return el
}
)});
  main.variable(observer("doc")).define("doc", ["nlp","text"], function(nlp,text){return(
nlp(text)
)});
  main.variable(observer("css")).define("css", ["html"], function(html){return(
html`<style>
  body {
    font-family: 'avenir next', avenir, sans-serif;
  }
.big{
  font-size:1.5rem;
  color:cornflowerblue;
}
.small{
  color:grey;
  margin-top:30px;
}

.term { color:grey; cursor:pointer;}
.nl-Person { border-bottom:2px solid #6393b9; }
.nl-Pronoun { border-bottom:2px solid #81acce; }
.nl-Plural { border-bottom:2px solid steelblue; }
.nl-Singular { border-bottom:2px solid lightsteelblue; }
.nl-Verb { border-bottom:2px solid palevioletred; }
.nl-Adverb { border-bottom:2px solid #f39c73; }
.nl-Adjective { border-bottom:2px solid #b3d3c6; }
.nl-Determiner { border-bottom:2px solid #d3c0b3; }
.nl-Preposition { border-bottom:2px solid #9794a8; }
.nl-Conjunction { border-bottom:2px solid #c8c9cf; }
.nl-Value { border-bottom:2px solid palegoldenrod; }
.nl-QuestionWord { border-bottom:2px solid lavender; }
.nl-Acronym { border-bottom:2px solid violet; }
.nl-Possessive { border-bottom:2px solid #7990d6; }
.nl-Noun { border-bottom:2px solid #7990d6; }
.nl-Expression { border-bottom:2px solid #b3d3c6; }
.nl-Negative { border-bottom:2px solid #b4adad; }
</style>`
)});
  return main;
}
