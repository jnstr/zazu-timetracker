module.exports = (start, stop) => {
    // get the durection in seconds
    const duration = Math.floor((stop - start) / 1000);

    // calculate the hours
    let hours = Math.floor(duration / 3600);
    if (hours < 10) { 
        hours = "0" + hours; 
    }

    // calculate the minutes
    let minutes = Math.floor((duration - (hours * 3600)) / 60);
    if (minutes < 10) { 
        minutes = "0" + minutes; 
    }

    // calculate the seconds
    let seconds = duration - (hours * 3600) - (minutes * 60);
    if (seconds < 10) { 
        seconds = "0" + seconds; 
    }
    
    // that's all folks!
    return hours + ':' + minutes + ':' + seconds;
}