james.da.ydrea.ms
=================

This is my online portfolio, living at http://james.da.ydrea.ms.

So it can degrade gracefully, I'm building for older browsers first and adding newer stuff later. You'll see this reflected in the commits.

Right now, there's a separate repo for */historicalvotes*, though it lives at this domain. I haven't yet decided the best way to maintain these. There's a good chance */historicalvotes* will get folded into this repo.


Changelog
---------

**11/12/11** 

- Moved `updateCels()` into the `Character` prototype.

- Added an `advanceCels()` method to the `Character` prototype.

- Changed `drawFrame()` to expect an argument: an array of `Character`s. All these measures are designed to replace the `anim_queue` object I was using before, which added an extra step to the animation looping.

- Added a `setFrameTotal` method.

***


**11/11/11** 

- Put 5 new members in the breakpoints array to test it out.

- Added `advanceBreakpoint()` to increment `currentBreakpoint`.

- Made `play()` and `stepThrough()` functions that set different breakpoints before running `animate()`.

***


**11/10/11** 

- Renamed `ftha()` to `updateCels()`. Renamed `CharACTer()` to `Character()`. The internal capitlization was designed to help avoid namespace collisions, but really, it was annoying. I'll keep it out of the global space or wrap it or something.

- Modified the last `if` test in updateCels to compare `current_cel` to `cels.length`.

- Added a condition to `renderCharacter()` to check whether it's been passed an function. If not, it renders the last cel in the sequence.

- `CharACTer.create()` isn't necessary. I removed it.

- `CharACTer`'s methods have been moved into a prototype. Don't see why each instance needs its own unique copy.

- `animate()` once again increments `current_frame` on every draw. It's clear there needs to be a master count of which frame we're on.

- `ftha` doesn't reset `current_cel` when a `CharACTer` leaves anim_queue. This leaves the `CharACTer` at its last position on the stage while others continue to move.

***


**11/9/11** 

- CharACTer gets a create() method for instantiation.

- The sequence object in every CharACTer now has a starting_frame member. This tells ftha the frame on which to start animating the CharActer.

- breakpoints is now an array, using current_bp to identify the index of the current breakpoint.

***


**11/8/11** - *Updates go back to May, but alas, the log starts here. The plan is to be way more atomic from now on.*

The files *polevault.js*, *new\_polevault.js*, *polevault.html* and *pv\_cels.js* all include code for running canvas animations. This will become a subset of [bigwheel.js][1], but I'm testing it [here][2]. The project isn't complete, but these are all working. The highlights:

  - The `CharACTers` constructor, for creating objects that keep their own distinct drawing rules. A CharACTer represents an autonomous object on the stage and might be thought of as a cel in traditional animation.

  - `ftha` (function that handles advancement) which updates the drawing instructions for every CharACTer on every redraw. I'll come up with a better name.

  - `recordMoveTo`, `recordLineTo`, `recordStrokeRect`, and `recordFillRect`, which create paths and cache the results of the coordinates passed to them. This is designed to make it easier to do math on the coordinates between redraws. More of these recorder functions to come.

***

[1]: https://github.com/parisminton/bigwheel.js "parisminton's bigwheel.js repo on GitHub"

[2]: http://james.da.ydrea.ms/polevault.html "Pole vaulter animation pencil test at james.da.ydrea.ms."
