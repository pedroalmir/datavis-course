const countPattern = (str, pattern) => { return ((str || '').match(pattern) || []).length };

function executePreProcessing(){
    console.log("Let's begin!");
    console.time("ProcessingTime");

    nlpConfig = {
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
        plurals: true,      // turn "batmobiles" into "batmobile"
        verbs: true,        // turn all verbs into Infinitive form - "I walked" → "I walk"
        honorifics: false,  //turn 'Vice Admiral John Smith' to 'John Smith'
    };

    stop_words="(www|http|org|net|com|youtube|wiki|wikipedia|a|À|Á|Â|Ã|Ä|Å|Æ|Ç|È|É|Ê|Ë|Ì|Í|Î|Ï|Ð|Ñ|Ò|Ó|Ô|Õ|Ö|×|Ø|Ù|Ú|Û|Ü|Ý|Þ|ß|à|á|â|ã|ä|å|æ|ç|è|é|ê|ë|ì|í|î|ï|ð|ñ|ò|ó|ô|õ|ö|÷|ø|ù|ú|û|ü|ý|þ|¡|¢|£|¤|¥|¦|§|¨|©|ª|«|¬|®|¯|°|±|²|³|´|µ|¶|?|!|\"|#|$|%|&|'|+|,|-|/|:|;|<|=|>|@|¹|º|»|¼|½|¾|¿|*|…|’|’|—|d|£|”|(|)|.|~|·|¸|^|_|`|{|}|[|]|al|s|cra|lot|re|nt|ÿ|about|above|according|across|after|afterwards|again|against|albeit|all|almost|alone|along|already|also|although|always|am|among|amongst|an|and|another|any|anybody|anyhow|anyone|anything|anyway|anywhere|apart|are|around|as|at|av|be|became|because|become|becomes|becoming|been|before|beforehand|behind|being|below|beside|besides|between|beyond|both|but|by|can|cannot|canst|certain|cf|choose|contrariwise|cos|could|cu|day|do|does|doesn't|doing|dost|doth|double|down|dual|during|each|either|else|elsewhere|enough|et|etc|even|ever|every|everybody|everyone|everything|everywhere|except|excepted|excepting|exception|exclude|excluding|exclusive|far|farther|farthest|few|ff|first|for|formerly|forth|forward|from|front|further|furthermore|furthest|get|go|had|halves|hardly|has|hast|hath|have|he|hence|henceforth|her|here|hereabouts|hereafter|hereby|herein|hereto|hereupon|hers|herself|him|himself|hindmost|his|hither|hitherto|how|however|howsoever|i|ie|if|in|inasmuch|inc|include|included|including|indeed|indoors|inside|insomuch|instead|into|inward|inwards|is|it|its|itself|just|kind|kg|km|last|latter|latterly|less|lest|let|like|little|ltd|many|may|maybe|me|meantime|meanwhile|might|moreover|most|mostly|more|mr|mrs|ms|much|must|my|myself|namely|need|neither|never|nevertheless|next|no|nobody|none|nonetheless|noone|nope|nor|not|nothing|notwithstanding|now|nowadays|nowhere|of|off|often|ok|on|once|one|only|onto|or|other|others|otherwise|ought|our|ours|ourselves|out|outside|over|own|per|perhaps|plenty|provide|quite|rather|really|round|said|sake|same|sang|save|saw|see|seeing|seem|seemed|seeming|seems|seen|seldom|selves|sent|several|shalt|she|should|shown|sideways|since|slept|slew|slung|slunk|smote|so|some|somebody|somehow|someone|something|sometime|sometimes|somewhat|somewhere|spake|spat|spoke|spoken|sprang|sprung|stave|staves|still|such|supposing|than|that|the|thee|their|them|themselves|then|thence|thenceforth|there|thereabout|thereabouts|thereafter|thereby|therefore|therein|thereof|thereon|thereto|thereupon|these|they|this|those|thou|though|thrice|through|throughout|thru|thus|thy|thyself|till|to|together|too|toward|towards|ugh|unable|under|underneath|unless|unlike|until|up|upon|upward|upwards|us|use|used|using|very|via|vs|want|was|we|week|well|were|what|whatever|whatsoever|when|whence|whenever|whensoever|where|whereabouts|whereafter|whereas|whereat|whereby|wherefore|wherefrom|wherein|whereinto|whereof|whereon|wheresoever|whereto|whereunto|whereupon|wherever|wherewith|whether|whew|which|whichever|whichsoever|while|whilst|whither|who|whoa|whoever|whole|whom|whomever|whomsoever|whose|whosoever|why|will|wilt|with|within|without|worse|worst|would|wow|ye|yet|year|yippee|you|your|yours|yourself|yourselves|*)"
    
    d3.csv("https://raw.githubusercontent.com/pedroalmir/datavis-course/master/trabalho_final/data/Posts.csv")
        .then(function(data){
            // Data preprocessing...
            let idMap = d3.map();
            
            data.forEach(function(d, i){
            //Discussion restriction
                if(d.UserDiscussionCount > 0){      
                    idMap.set(d.Id, d.Title)                            
                }
            })
            
            let textPosts = d3.csv("https://raw.githubusercontent.com/pedroalmir/datavis-course/master/trabalho_final/data/PostsBody.csv")
                .then(function(data){
                    // Data preprocessing...
                    let textPosts = [];
                    let reverseStemMap = d3.map();
                    let text = 'id,text\n';
                    data.forEach(function(d, i){ 
                        console.log('Iteration ' + i)         
                        if(idMap.get(d.Id) !== undefined){
                            
                            /* This snippet remove <code></code> tags from the posts */
                            var div = document.createElement('div')
                            div.innerHTML = d.Body
                            var list = div.getElementsByTagName('code')
                            while(list.length > 0){
                                list[0].remove()
                                div.getElementsByTagName('code')
                            }
                            list = div.getElementsByTagName('blockquote')
                            while(list.length > 0){
                                list[0].remove()
                                div.getElementsByTagName('blockquote')
                            }
                            list = div.getElementsByTagName('a')
                            while(list.length > 0){
                                list[0].remove()
                                div.getElementsByTagName('a')
                            }
                            
                            /* This snippet try to remove all 'problems' to NLP */
                            /* We decided to use a step-by-step approach for educational purposes */
                            var basicRegexs = [
                                /(\r\n|\n|\r)/gm,                                   // Removing break lines
                                /<[^>]*>?/gm,                                       // Removing html tags
                                /[^\x00-\x7F]/gm,                                   // Removing non-ascii characters
                                /0x\S+/gm,                                          // Removing word started with 0x...
                                /[\[\]\\.,\/#!?$%\^&\*;:{}=\-_`~()"+|“”@><'’]/gm,   // Removing ponctuations
                                /\s{2,}/g                                           // Removing any extra spaces
                            ];

                            var specialRegex = [
                                /(\b(\w{1,2})\b(\s|$))/gm,                          // Removing words with less then 3*
                                /\s([0-9])+\s/gm,                                   // Removing isolated numbers* count
                                /\s(\w)\1+\s/gm,                                    // Removing sequence of the same character*
                                /\s[a-z][0-9]+\s/gm,                                // Removing words that have just the first character as non-numeric*
                                /\s{2,}/g                                           // Removing any extra spaces
                            ];
                            
                            // Here, we decided include the title in analysis...
                            var temp = idMap.get(d.Id) + ' ' + div.innerText;
                            basicRegexs.forEach(function(regex){
                                temp = temp.replace(regex, ' ')
                            });

                            specialRegex.forEach(function(regex){
                                while(countPattern(temp, regex) > 0){
                                    temp = temp.replace(regex, ' ')
                                }
                            });                                      

                            temp = temp.toLowerCase().trim()
    
                            /* The more powerful filter provided by compromise NPL library. Here we remove the stop words too. */
                            var htmlClean = nlp(temp).normalize(nlpConfig).sentences().delete(stop_words).terms().out().trim()
                            
                            // Extracting tokens...
                            var tokensStem = [];
                            var tokens = htmlClean.split(" ");
                            
                            tokens.forEach(function(token, index){
                                var stemToken = stemmer(token.trim());
                                if(stemToken !== undefined && stemToken.length > 0){
                                    reverseStemMap.set(stemToken.trim(), token.trim())
                                    tokensStem.push(stemToken.trim());
                                }
                            })

                            var finalPostTxt = tokensStem.join(' ');
                            // Double check of patterns...
                            basicRegexs.concat(specialRegex).forEach(function(regex){
                                finalPostTxt = finalPostTxt.replace(regex, ' ')
                            });
                            finalPostTxt = finalPostTxt.toLowerCase().trim()


                            /** 
                             * This variable is used to download a file with all cleaned posts
                             * To split in multiple files use the following command:
                             * $ split -l 1 -d -a 4 --additional-suffix=.txt posts.txt file 
                             **/
                            text += d.Id + ',' + finalPostTxt + "\n"
                            
                            textPosts.push({
                                "id": d.Id,
                                "text": finalPostTxt
                            })
                        }  
                    })
                    console.log('Done!')
                    console.timeEnd("ProcessingTime");
                    download('PostsTreated.csv', text)
                    download('ReverseStem.json', JSON.stringify(reverseStemMap))
                })
        })
}