(function(){
    var CD = function(opts){
    
        // ---- vars
        
        var oneDay = 86400, //24*60*60
            oneHour = 3600, //60*60
            oneMinute = 60;
            
        var countInterval;

        opts = opts || {};
        var now,
            date = opts.date || new Date(2014, 0, 1),
            callback = typeof opts.callback === 'function' ? opts.callback : function(){};
        
        // ---- utils
        
        var utc = function(d){
            return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
        };
        
        var diff = function(d1, d2){
            d1 = utc(d1);
            d2 = utc(d2);
            var time = Math.abs(Math.floor((d1 - d2) / 1000));
            var days = parseInt(time / oneDay);
            time -= days * oneDay;
            var hours = parseInt(time / oneHour);
            time -= hours * oneHour;
            var minutes = parseInt(time / oneMinute);
            var seconds = time - minutes * oneMinute;
            return [days, hours, minutes, seconds];
        };
        
        var num = function(str){
            var r = parseInt(str);
            return isNaN(r) ? 0 : r;
        }
        
        // ---- private methods
        
        function DiffNowAndDate(){
            now = new Date();
            callback(diff(now, date));
        }
        
        // ---- public methods

        this.StartCount = function(){
            DiffNowAndDate();
            countInterval = setInterval(DiffNowAndDate, 1000);
        };
        
        this.StopCount = function(){
            clearInterval(countInterval);
        };
        
        this.DatesDiff = function(date1, date2, type){
            var d1, d2, reg = /(\d+)/g;
            switch (type){
                case 'y m d':
                    d1 = date1.match(reg);
                    d2 = date2.match(reg);
                    return diff(new Date(d1[0], num(d1[1]) - 1, d1[2]), new Date(d2[0], num(d2[1]) - 1, d2[2]));
                case 'num':
                    if (typeof date1 !== 'string')
                        date1 = date1.toString();
                    d1 = new Date(
                        num(date1.substr(0,4)),
                        num(date1.substr(4,2)) - 1,
                        num(date1.substr(6,2)),
                        num(date1.substr(8,2)),
                        num(date1.substr(10,2)),
                        num(date1.substr(12,2))
                    );
                    if (typeof date2 !== 'string')
                        date2 = date2.toString();
                    d2 = new Date(
                        num(date2.substr(0,4)),
                        num(date2.substr(4,2)) - 1,
                        num(date2.substr(6,2)),
                        num(date2.substr(8,2)),
                        num(date2.substr(10,2)),
                        num(date2.substr(12,2))
                    );
                    return diff(d1, d2);                    
                default:
                    return diff(date1, date2);            
            }
        };
        
    }
    
    window.CountDays = CD;
})();