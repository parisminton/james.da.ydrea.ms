james.da.ydrea.ms
=================

Changelog
---------

*11/28/20*

1. Bare minimum for publishing.



*10/6/19*

1. Let's try Gatsby.



*1/9/14*

1. Archived the previous code in v1.0 and starting v2.0 with MEAN.



*12/16/11*

1. Made an `Animator` class that collects all the machinery for drawing images to the screen. You can pass its constructor an optional number representing frames per second in milliseconds; the default is 75. The `Timeline` constructor now expects an `Animator` instance as its first argument.

2. Moved `playthrough_count` into `Timeline`.

3. Adapted `Timeline.storeInFrames()` to store the `xdistance` and `ydistance` of every cel.

4. Rounded all `xdistance` and `ydistance` calculations to two decimal places.



*12/15/11*

1. Added `xlimit` and `ylimit` members to the `scrubber` sequence in `Slider`. These represent the far extremes of the slider, the scrubber's position after it's traveled 100 percent of the track distance.

2. Created `Slider.drawBoundary()`, which helps click detection for the scrubber by drawing a path before running `isPointInPath()`. This was tricky, because it needs to follow the scrubber as it moves, and `Slider` calls two different sequences on each draw.



*12/14/11*

1. Finished making the `Slider` class and combined the previous `slider` and `scrubber` into a new instance of it. `Slider` inherits from `Character` -- it borrows its prototype.

2. Adapted `renderCharacter()` to sniff out `Slider` instances and make sure the track is drawn before the scrubber on each frame.



*12/13/11*

1. Fixed `Timeline.init()`. The timeline remembers the current cel, current sequence and current iteration for every `Character` instance on every frame in the animation. 

2. Moved `current_frame`, `current_bp` and `breakpoints` inside `Timeline`. Scrapped these and `fps` from `stage`'s scope. Everything works.



*12/12/11*

1. Added a constructor and prototype for a `Timeline` class. `Timeline` stores history and methods for every frame in the animation. `frame_total`, `current_frame`, the `breakpoints` array, `current_breakpoint` and `fps` are moving into this class.

2. `Timeline.init()` is now working, though I was wrong about how the `frames` array should store members. I'm revising this function. 

3. Added `Character.countSpan()` to store the total number of cels a `Character` puts on the timeline. Having this number handy makes it easier to do some of the math `Timeline.init()` needs.

4. Switched `pit` and `pitforeground` to the `Character` drawing methods.



*12/11/11*

1. Painstakingly removed all references to `Character.sequence`. I initially thought it would be a true collection, but it never got used that way. Leaving it seems like it costs an unnecessary lookup. So far, no ill effects. 

2. Updated `Character.reset()` to cycle through all sequences within a `Character` and set `current_seq` to zero when it's finished.

3. Updated `Character.setSequenceOrder()` to automatically reset `starting_frame` for any sequence following the first one. This lets `setFrameTotal` keep an accurate count and saves the developer from having to set this value explicitly.

4. Found out the hard way that `Character.setSequenceOrder()` can't set the `starting_frame`s accurately if it's called on a sequence that hasn't yet been populated with cels. It fails silently. So I added an error message to catch this.

5. For testing, made `vaulter`'s run-up sequence loop for 4 iterations. It, and the functions above, seem to work.

6. Removed comments and the unused call to *pv_cels.js* from *polevault.html*.



*12/10/11*

1. Added a `sequenceOrder` property and a `setSequenceOrder()` method to the `Character` prototype. These store and alter the calling order of drawing instructions for a `Character`'s sequences.

2. Modified `setFrameTotal()` to work with these new values. 

3. Added a `runup` sequence to `vaulter`: a loopable series of strides to showthe vaulter approaching the pit.

4. Moved `sequenceOrder` out of the `Character` prototype and into its constructor, fixing the mistake I just introduced.

5. `sequenceOrder` is now called `sequence_order` to stick with the naming convention for variables.

6. Updated `Character.advance()` to cycle through sequences.

7. Fixed a bad assignment in `Character.advance()` that incremented `current_seq` too early.



*12/9/11*

1. Added the pit, the shadow and the updated vaulter to the stage.



*12/5/11* 

1. The scrubber now moves in time with the action, thanks to the new drawing methods. `Character.cache` is almost obsolete. The methods do all the calculations before rendering.

2. Fixed the problems with the Play and Step Through button boundaries. The Play path never closed before the Step Through path was drawn. 

3. Moved the `record` methods into the `Character` prototype. This means the functions can accept fewer arguments to know to which objects they're applied -- almost all of them are back to the arguments they'd expect as regular `CRC` methods. This also means I removed the "record" part of the name. They live in the namespace of their parent and that's how you call them: `vaulter.lineTo(100.0, 200.0);`.

4. Started making a `Scrubber` class that inherits from `Character`.

4. Added `xdistance`, `ydistance`, `xinc` and `yinc` members to each sequence in `Character`. These are meant to remember x and y increments and total distances from the axes as a `Character` moves across the stage.



*12/3/11* 

1. Moved `emptyAllCaches()` to the top of `drawFrame()`. This is a better solution than calling it from `animate()`, ensuring it gets called once per drawing cycle -- even the first one.

2. Added `store()` to the `Character` prototype.

3. Added `recordBeginPath()`, `recordClosePath()`, `recordFillStyle()`, `recordLineWidth()`, `recordLineJoin()`, `recordMiterLimit()`, `recordLinearGradient()`, `recordAddColorStop()`, `recordStroke()`, `recordStrokeStyle()`, `recordSave()` and `recordRestore()`.

4. Renamed `advanceCels()` to `advance()` and `advanceAllCels()` to `advanceAll()`.  

5. Moved the scrubber to the far left of the track (by subtracting 155.8 from all the x-values). 



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

1. Added a condition to `Character.advanceCels()` to reset `current_cel` and `current_iteration` to 0 when the `breakpoints` array rolls over.

2. Added another call to `Character.advanceCels()` from `animate()` 



*11/20/11* 

1. Created a `setFinalBreakpoint` function to programatically set the last breakpoint to the last frame in the animation. The user (the developer) doesn't have to do this manually.

2. Added a condition to `animate()` to exit when `current_frame` is equal to or greater than `total_frames`. 



*11/12/11* 

1. Moved `updateCels()` into the `Character` prototype.

2. Added an `advanceCels()` method to the `Character` prototype.

3. Changed `drawFrame()` to expect an argument: an array of `Character`s. All these measures are designed to replace the `anim_queue` object I was using before, which added an extra step to the animation looping.

4. Added a `setFrameTotal()` method.



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
