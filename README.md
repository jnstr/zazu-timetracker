# zazu timetracker (work in progress)

This is a simple zazu plugin for tracking time. It makes it easy to track the time you spend on projects during the day.

## Usage

### :start

Start tracking time. This command supporst an optional project name.

`:start`: start tracking time without a project name  it easier to track small
`:start Writing readme for zazu timetrack plugin`: Start tracking time for the given project name.

Starting the timetracker will automatically stop the currently running time tracker.

### :stop

Stop the currently running time tracker

### :hist

Show the history of time registrations

`:hist`: Show the history of last 5 days that have a time registration (entries are grouped by day)  
`:hist today` or `:hist yesterday`: Show the time registrations for today or yesterday, not grouped by day  
`:hist 2016-09-03`: Show the time registrations for a given date, in this case September 3rd 2016

### :delete

Show the last 15 time registrations and delete the selected time registration.

## How it works

This plugin creates a file in the user's home directory: `~/.zazu-timetracker.json` and adds the time registrations to that json file.
There is a hard limit of 500 time registrations.


## Installing

Add `jnstr/zazu-timetracker` inside of `plugins` block of your `~/.zazurc.json` file.

```json
{
  "plugins": [
    "jnstr/zazu-timetracker"
  ]
}
```
