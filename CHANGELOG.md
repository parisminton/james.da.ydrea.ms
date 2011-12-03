james.da.ydrea.ms
=================

Changelog
---------

*12/3/11* 

1. Renamed `advanceCels()` to `advance()` and `advanceAllCels()` to `advanceAll()`.  

2. Moved the scrubber to the far left of the track (by subtracting 155.8 from all the x-values). 



*11/30/11* 

1. Gave the new controls `record` methods.

2. Made the new controls a little bigger for easier use on touch screens. 



*11/28/11* 

1. Added new `Character` instances: `slider`, `scrubber`, `back` and `forward`. These draw controls on the stage, though they're not active yet.



*11/27/11* 

1. Made a `Character` instance called `track`, drawing a track on the canvas. 

2. Added a condition to `play()` and `stepThrough()` that prevents them from being fired before the previous animation is finished running. 

3. Gave `animate()` a `running` property.

4. Added `emptyCache()` to the `Character` prototype and the helper `emptyAllCaches()`. These clear the `cache` array of saved coordinates inside each `Character`'s sequence.

5. Gave each `Character` a `queue_index` property that stores the `Character`'s index position within `a_queue`.



*11/25/11* 

1. Combined *new_polevault.js* and *polevault.js* into one file named *polevault.js*. Got rid of obsolete comments. Commented out the tests.

2. `vaulter` is an instance of `Character`.

3. Commented out the triggers in *polevault.html*



*11/22/11* 

1. Added `recordBezierCurveTo()`.



*11/21/11* 

1. Added a condition to `advanceCels()` to reset `current_cel` and `current_iteration` to 0 when the `breakpoints` array rolls over.

2. Added another call to `advanceCels()` from `animate()` 



*11/20/11* 

1. Created a `setFinalBreakpoint` function to programatically set the last breakpoint to the last frame in the animation. The user (the developer) doesn't have to do this manually.

2. Added a condition to `animate()` to exit when `current_frame` is equal to or greater than `total_frames`. 



*11/12/11* 

1. Moved `updateCels()` into the `Character` prototype.

2. Added an `advanceCels()` method to the `Character` prototype.

3. Changed `drawFrame()` to expect an argument: an array of `Character`s. All these measures are designed to replace the `anim_queue` object I was using before, which added an extra step to the animation looping.

4. Added a `setFrameTotal` method.



*11/11/11* 

1. Put 5 new members in the `breakpoints` array to test it out.

2. Added `advanceBreakpoint()` to increment `currentBreakpoint`.

3. Made `play()` and `stepThrough()` functions that set different breakpoints before running `animate()`.



*11/10/11* 

1. Renamed `ftha()` to `updateCels()`. Renamed `CharACTer()` to `Character()`. The internal capitlization was designed to help avoid namespace collisions, but really, it was annoying. I'll keep it out of the global space or wrap it or something.

2. Modified the last `if` test in updateCels to compare `current_cel` to `cels.length`.

3. Added a condition to `renderCharacter()` to check whether it's been passed an function. If not, it renders the last cel in the sequence.

4. `CharACTer.create()` isn't necessary. I removed it.

5. `CharACTer`'s methods have been moved into a prototype. Don't see why each instance needs its own unique copy.

6. `animate()` once again increments `current_frame` on every draw. It's clear there needs to be a master count of which frame we're on.

7. `ftha` doesn't reset `current_cel` when a `CharACTer` leaves `anim_queue`. This leaves the `CharACTer` at its last position on the stage while others continue to move.



*11/9/11* 

1. `CharACTer` gets a `create()` method for instantiation.

2. The `sequence` object in every `CharACTer` now has a `starting_frame` member. This tells `ftha` the frame on which to start animating the `CharActer`.

3. `breakpoints` is now an array, using `current_bp` to identify the index of the current breakpoint.



*11/8/11* - *Updates go back to May, but alas, the log starts here. The plan is to be way more atomic from now on.*

The files *polevault.js*, *new\_polevault.js*, *polevault.html* and *pv\_cels.js* all include code for running canvas animations. This will become a subset of [bigwheel.js][1], but I'm testing it [here][2]. The project isn't complete, but these are all working. The highlights:

1. The `CharACTers` constructor, for creating objects that keep their own distinct drawing rules. A CharACTer represents an autonomous object on the stage and might be thought of as a cel in traditional animation.

2. `ftha` (function that handles advancement) which updates the drawing instructions for every CharACTer on every redraw. I'll come up with a better name.

3. `recordMoveTo`, `recordLineTo`, `recordStrokeRect`, and `recordFillRect`, which create paths and cache the results of the coordinates passed to them. This is designed to make it easier to do math on the coordinates between redraws. More of these recorder functions to come.



[1]: https://github.com/parisminton/bigwheel.js "parisminton's bigwheel.js repo on GitHub"

[2]: http://james.da.ydrea.ms/polevault.html "Pole vaulter animation pencil test at james.da.ydrea.ms."
