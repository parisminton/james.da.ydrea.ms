james.da.ydrea.ms
=================

This is my online portfolio, living at http://james.da.ydrea.ms.

So it can degrade gracefully, I'm building for older browsers first and adding newer stuff later. You'll see this reflected in the commits.

Right now, there's a separate repo for */historicalvotes*, though it lives at this domain. I haven't yet decided the best way to maintain these. There's a good chance */historicalvotes* will get folded into this repo.


Changelog
---------

**11/8/11** - *Updates go back to May, but alas, the log starts here. The plan is to be way more atomic from now on.*

The files *polevault.js*, *new\_polevault.js*, *polevault.html* and *pv\_cels.js* all include code for running canvas animations. This will become a subset of [bigwheel.js][1], but I'm testing it [here][2]. The project isn't complete, but these are all working. The highlights:

  - The `CharACTers` constructor, for creating objects that keep their own distinct drawing rules. A CharACTer represents an autonomous object on the stage and might be thought of as a cel in traditional animation.

  - `ftha` (function that handles advancement) which updates the drawing instructions for every CharACTer on every redraw. I'll come up with a better name.

  - `recordMoveTo`, `recordLineTo`, `recordStrokeRect`, and `recordFillRect`, which create paths and cache the results of the coordinates passed to them. This is designed to make it easier to do math on the coordinates between redraws. More of these recorder functions to come.

***

[1]: https://github.com/parisminton/bigwheel.js "parisminton's bigwheel.js repo on GitHub"

[2]: http://james.da.ydrea.ms/polevault.html "Pole vaulter animation pencil test at james.da.ydrea.ms."
