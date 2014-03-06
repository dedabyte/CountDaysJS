# CountDays.js

Tiny JS library for counting days between dates. No dependencies.
Lib is in sort of "what exactly do we need here" stage and should be used only for testing.


## About

Idea is to implement simple code that calculates diff between two dates mesaured in days, hours, minutes and seconds, and also to add some usefull stuff like automatic countdown/countup, flexible date formats reading...


## Docs

---

Create:

    var cd = new CountDays();

You can pass object with options. It will be used for automatic countdown/countup functionlity. Structure and defaults:

    var opts = {
        date: new Date(2014,0,1),
        callback: function(){}
    };

**date**: Date that will be counted down/up to.  
**callback**: Callback function that is called after calculation. Array `[days, hours, minutes, seconds]` is passed as argument.

---

Methods:

    cd.StartCount();
    
Starts calculations in 1 sec interval from `now` to/from `date` and pushes result array to `callback`.

    cd.StopCount();
    
Stops calculations.

    cs.DatesDiff(date1, date2, dateType);
    
Static method that calculates diff between given dates. `dateType` is optional and can be:  
**'y m d'**: `date1` and `date2` should be strings in this format: 'yyyy mm dd'. Examples: `'2014 1 1'`, `'2014 12 31'`...  
**'num'**: `date1` and `date2` should be strings or numbers in format 'yyyymmddhhmmss'. Minimum length is 4, max 12. Every omitted pair will be parsed as 0. Examples: `'20140101'`, `2014030511`, `'201408101930'`...
