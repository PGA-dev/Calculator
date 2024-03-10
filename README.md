# Calculator App

<img src="darkFinal.png"
     alt="Dark Mode Picture"
     style="float: left; margin-right: 10px; width: 125px; height: 100px" />

## About

### Research

#### General Start
The project started as an attempt to create a functional calculator that encorporated different features that I had seen other programmers do on GitHub and the web as general practice. As I started to research, I realized there are many more ways to skin the calculator cat than I had previously understood. I liked many common features I found during my research: using a table format, with input button elements for the keys, using keymapping (though mine was pretty simple), regular expression usage (opted this out), inline vs. straight-JS functions to call features, and even found some pretty intresting wrapper functions for the event listeners, rather than just basic DOM event handling. 

#### Use Of AI - Good and Bad
I also jumped on to Open AI Chat GPT 3.5 to ask some general questions about modularity and listener cleanup. This was an interesting experience, as I have used Open AI a few times to answer difficult questions while in school, but didn't realize that some of its answers were actually pretty unusable, and often didn't work at all. I learned that you have to be a fairly adept developer to work using AI, as you will have to restructure, refactor, and seriously mod any code that you give it, or ask it about, to actually use within most project workflows. While I thought this was a valuable experience, I would caution young, or language inexperienced devs, in putting too much weight on artificial intelligence while coding -- AI is great to ask a syntax question: "given the following constructor approach, how might you implement this feature...", but realize that the answer it gives will likely require some very heavy modification to be usable.

#### Finally...
I did create some private versions of multiple approaches, using other devs design models, but in the end, I wanted to build one of these fairly well from scratch, so I adopted some of the features I found, using my own coding approaches -- often simplifying some of the more difficult ideas I found, as JavaScript calculators can range from very simple, to extremely capable; creating my own fairly reproducable design! I will include a few other GitHubbers, YouTubers and web calculators I find over time at the bottom of the MD! But at the time of writing this, not planning on updating this approach heavily, just think that there is a lot to learn regarding DOM interaction for calculators.

## My Design

#### Calculator Functions/Functionality:
- ADD
- SUBTRACT
- MULTIPLY
- DIVIDE
- EXPONENTIATION
- MODULUS (division remainder)
- Backspace
- Clear Screen
- Auto-clear after Calculation (when a new button is pushed)

### Coding Design
#### HTML
- Basic HTML Table design for the calculator
- Buttons were inputs inside of the table rows

#### CSS
- Simple light/dark toggle
    - CSS mod for :root custom property declaration
    - Corresponding button -- HTML-- for toggle
- :root CSS var declartions for custom properties (used rgba color schema on this one, kind of getting used to hsl on most of mine lately -- especially for blends)

#### JavaScript
- Vanilla JS script addressed using all functionality as callbacks inside of general DOM ContentLoaded event listener
- Hash array used for calculator function lookup
- modular approach to add event listeners, calling the button mapper inside of the listener
    - Button map filter calls functions for specific key functionality
    - flag for basic workflow, to add auto cleanup of results window after calculation is performed, and new calculation is attempted
- wrapped cleanup inside of window call at the end

I appreciated using a key mapping approach, passing the general DOM get as a class driven input filter for button content, rather than individual id's relating to each button. I think that the CSS was pretty useful in making the calculator itself, more readable and useable; the shadowing was great to give some depth to the calculator body and the buttons. 
Finally, and esthetically speaking, I used a light/dark toggle to play about some small amount with the CSS appearance and shadowing; a small nod to my appreciation of the CSS lessons I keep pursuing. My light/dark icons were thanks to a fellow dev vydroz: https://codepen.io/vydroz/pen/jOGywpO His approach  was much more involved for the JS calculator itself, but there were some sweet icons to use...lol 
    

### Hours Worked:
Since most of these types of projects are undertaken by JR developers looking for some quick resume fill, I figured I would 
- #### Initial Research
    - 2-3 hours
- #### Code Primary
    - 2 hours
- #### BugFix
    - 6-8 hours
- #### Writeup
    - 1 hour
    
## ToDo:
- I had a little fun with the CSS, but haven't fully scaled it properly yet for tablet and mobile.
- Jest add coming in future version
-  I think that I can clean the JS up a bit with a general generic callback for all event listeners, but maybe that is a bit unecessary, and might, depending upon implementation, be slower.
- Probably could update the hash array, into a full hash Map, or hash object approach -- I purely wanted the functionality of a fast reference point, but didn't want the complexity of a true Hashable feature, though maybe will do this on a future calculator project.
- React version would be a good idea; or maybe a React/Vanilla JS wrapper on a Python shell (vastly prefer OOP script, and C-based, languages for doing basic math...lol)

# Pictures
### Dark Mode
![darkFinal picture](/darkFinal.png "Dark mode picture")

### Light Mode
![lightFinal picture](/lightFinal.png "Light mode picture")


#### https://github.com/PGA-dev/Calculator