import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

let expandText = (seed, fullstring) => {
  // Find location of the seed within the longer string.
  let seed_start = fullstring.indexOf(seed);
  console.log('The seed is at', seed_start);

  // Split the longer string using the seed as a delimiter
  let limbs = fullstring.split(seed);

  let expand = (str, forward) => {
    console.log('Expanding ...');
    let i = 0;

    let addOn = () => {
      window.setTimeout( () => {
        console.log('Char is', str.charAt(i));

        i += 1;
        if (i < str.length) addOn();
      }, 250);
    }

    if (!forward) {
      str = str.split('').reverse().join('');
      // append
    }
    console.log(str);
    addOn();
  }

  if (limbs[0] === '') { // seed is at end
    console.log('Seed is at the start of the string.');
    expand(limbs[(limbs.length -1)], false);
  }

  if (limbs[(limbs.length -1)] === '') { // seed is at start
    console.log('Seed is at the end of the string.');
    expand(limbs[0], true);
  }
}

expandText('gh for me, no.', 'One won\'t do, two is not enough for me, no.');

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1 className="nameplate">James Thomas</h1>
    <p className="body-copy">For two decades -- my entire professional life -- I've worked for large news organizations as a digital editor, producer and developer. Since 2012, I've been a software engineer for the Interactive News department of The New York Times. Before that, I spent 11 years as Web Editor for the Detroit Free Press.</p>
    <p className="body-copy">Most of what I do is collaborative and behind the scenes, like the code wired into the nytimes.com home page on presidential debate nights that allows editors to curate up-to-the-minute photos and video in its centerpiece. Nights like these, I'm shoulder-to-shoulder with those editors in the nerve center of the newsroom to guard against unforeseen bugs, errant captions and 404s.</p>
    <p className="body-copy">But I work far more often outside the breaking news cycle. An example is the interactive template I built for The Real Estate section's weekly column <em>The Hunt</em>, where readers can get an intimate understanding of New York's bonkers housing market by playing a quiz game weaved into the narrative. Gamifying the column has helped Real Estate find more habitual readers.</p>
    <p className="body-copy">Part of my job is training the newsroom to use the apps and templates we build in Interactive News. I write code, documentation and curricula, and I help editors incubate new ways to use the tools we provide. The idea to gamify the <em>The Hunt</em> grew out of one of these training sessions.</p>
    <p className="body-copy">Occasionally, I'm able to write, illustrate or design a self-contained story. I'm most proud of a piece I designed myself, a visually rich portrait of New York's street dance culture.</p>
    <p className="body-copy">Scenes like these fall within a huge blind spot shared by large media organizations and represent missed opportunities to earn trust and engagement from audiences that don't typically see themselves reflected with much fidelity.</p> 
    <p className="body-copy">I'm compelled to use my mix of skills and perspective to narrow this blind spot and I'm looking for more opportunities to guide a story from reporting through presentation.</p>
    <p className="body-copy">It's work that strikes a sweet spot for me: solving logical puzzles that result in increased understading of the world. crafting words and visuals</p>
  </Layout>
)

export default IndexPage
