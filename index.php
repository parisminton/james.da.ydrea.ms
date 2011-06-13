<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">


<!--          :: CONCRETE ::
  ____  _____  ____      __  ___ ____ ___
 /    \/     \|    \    |  |/   \ |  |   |
|  |__    |      |  | __|  |  |      |   |
|   __|   |      |  |/        |   |\__   |
|  |      |      |      |     |   |___|  |
 \____/\_____/|__|__|\_____|\___________/
 
              :: DAYDREAMS ::

   once again, back is the incredible  -->


<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="author" content="James Thomas" />
    <meta name="description" content="James Thomas is Web developer and designer with more than 14 years of experience building and maintaining digital content, mostly for large news organizations." />
    <meta name="DC.creator" content="James Thomas" />
    <meta name="DC.subject" content="james thomas, web development" />
    <title>James Thomas' portfolio :: james.da.ydrea.ms</title>  
    <link rel="stylesheet" href="c/main.css" type="text/css"/>
    <script type="text/javascript" src="http://use.typekit.com/lqc4nct.js"></script>
    <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
    
    <?php

      $clean_name = filter_var($_POST['contact-name'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW); 
      $clean_email = filter_var($_POST['contact-email'], FILTER_SANITIZE_EMAIL);
      $clean_msg = filter_var($_POST['contact-msg'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

      if (isset($_POST['button'])) {
        
        $message = Swift_Message::newInstance()
          ->setSubject("A message from {$clean_name} ({$clean_email}) via james.da.ydrea.ms")
          ->setFrom(array($clean_email => $clean_name))
          ->setTo(array('me@myemail.com' => 'James'))
          ->setBody($clean_msg, 'text/html')
          ->addPart($clean_msg, 'text/html')
          ;
             
        $mailer = Swift_Mailer::newInstance($transport);
        $result = $mailer->send($message);
        
        $date = $message->getHeaders()->get('Date')->toString();
                
        if ($_POST['contact-conf'] == "confirmation") {
        
          $conf_msg = "<p>Hi. You asked for a copy of the message you sent to James Thomas from the " . '<a href="http://james.da.ydrea.ms">' . "james.da.ydrea.ms site</a>.</p>

<p>On {$date} you sent the following message:</p>

<p>* * *</p>

      <p>{$clean_msg}</p>

<p>* * *</p>

<p>James will get your message shortly and he'll respond as soon as he can. Thanks for visiting the site.</p>";
        
          $message_copy = Swift_Message::newInstance()
            ->setSubject("Here's a copy of your message to James Thomas")
            ->setFrom(array('me@myemail.com' => 'James\' Mailing Robot'))
            ->setTo(array($clean_email => $clean_name))
            ->setBody($conf_msg)
            ->addPart($conf_msg, 'text/html')
            ;
            
          $mailer_copy = Swift_Mailer::newInstance($transport);
          $result_copy = $mailer_copy->send($message_copy);
          
        }
      
      };

    ?>

  </head>

  <body id="home-page"> 
    <div id="wrap">
      <!-- <img id="ref" src="a/reference_8bit.png" alt="Just a reference" width="921" height="522" /> -->
      <h1 id="mast">James Thomas is a Web developer and designer. He has more than a decade of experience building and maintaining digital content for news organizations.</h1>
      <img id="toon" src="a/james_logo_leadclouds_8bit.png" alt="Don't let James' stoic expression fool you ... he's passionate about effective storytelling, handsome design and clean code." title="Don't let James' stoic expression fool you ... he's passionate about effective storytelling, handsome design and clean code." width="252" height="360" />
      <ul id="nav">
        <li id="nav-about"><a href="about.html">Work experience and interests</a></li>
        <li id="nav-work"><a href="work.html">See my work</a></li>
        <li id="nav-contact"><a href="contact.html">Call, e-mail or find me online</a></li>
      </ul>
      <div id="content">
        <div id="copy">
          <div id="welcome">
            <h2>People seem to dig my expressive ability.</h2>
            <p>It's all been fun ... the journalism, the programming, the graphic design. But it's also been meaningful.</p>
            <p>My goal is to keep that balance of meaningful, challenging and fun work throughout my career.</p>
          </div><!-- end #welcome -->

          <div id="about">
            <h2>About James</h2>
            <p>I'm a tinkerer who loves the creative freedom technology enables. I like my hands dirty.</p>
            <div id="portrait">
            <img src="a/james_portrait.jpg" alt="James has been making digital content for 14 years and working in newsrooms for even longer." title="James has been making digital content for 14 years and working in newsrooms even longer." width="260" height="307" />
            <p id="photocredit">Photo by <a href="http://www.amberhuntphotography.com" target="_new">Amber Hunt</a></p>
            </div>
            <p>For 14 years, I've built and managed digital content in a career path that began as a newsroom apprentice at the <a href="http://www.freep.com" target="_new">Detroit Free Press</a> and traced the stark border between journalism and technology.</p>
            <p><a href="http://www.linkedin.com/in/jamesthomaswebguy" target="_new">My LinkedIn profile</a> and <a href="pdf/jamesthomas_resume_060111.pdf">resume</a> give a glimpse of this odd, interesting space: ("Here, edit this election story. ... Now turn this Illustrator file into code. ... Now parse this XML feed.")</p>
            <p>I've increasingly spent more time on the tech side, and I'd like to focus my career on it.</p>
            <p>I've got a solid understanding of Web standards and the core principles of object-oriented programming. Lately I've been learning some compiled languages and practicing mobile development.</p>
            <p>But I started as a writer and still love the written word. I strive for a well-turned phrase, and news that's accurate, engaging and incisive. Much of my Freep.com work has been making concise Web text read well.</p>
            <p>My career has mostly been in large news organizations, working on tight deadlines in a collaborative environment. I've cherished having great co-workers. It's a trend I know will continue.</p>
          </div><!-- end #about -->

          <div id="work">
            <h2>Examples of James' work</h2>

            <!-- christ child -->
            <div id="christchild" class="workitem">
              <img id="img-christchild" src="a/christchild.jpg" alt="Alternate text goes here." />
              <h3><a href="http://web.archive.org/web/20090818101308/http://www.freep.com/christchild" target="_new">Christ Child House</a></h3>
              <p class="shortdesc">design / markup / scripting</p>
              <p class="link"><a href="http://web.archive.org/web/20090818101308/http://www.freep.com/christchild" target="_new">http://web.archive.com/http://www/freep.com/christchild</a></p>
              <p class="longdesc">I designed and coded this Emmy-winning presentation about boys in foster care while I was at the <a href="http://www.freep.com" target="_new">Detroit Free Press</a>. My editors got detailed Illustrator mock-ups for approval, then I took all the .ai files to Photoshop for layer work and cutting. I hand-coded all pages using XHTML, CSS and JavaScript, then my editor Pat and I turned them into SaxoTech templates.</p>
              <p class="longdesc">Unfortunately, these templates were overwritten with <a href="http://www.freep.com" target="_new">Freep.com</a>'s redesign in January. Right now, the Wayback Machine has the only live instance of this package as it originally appeared.</p>
            </div>
            
            <!-- spubble -->
            <div id="spubble" class="workitem">
              <img id="img-spubble" src="a/spubble.jpg" alt="Alternate text goes here." />
              <h3><a href="http://itunes.apple.com/us/app/spubble-lite/id408355153?mt=8" target="_new">Spubble Lite</a></h3>
              <p class="shortdesc">design</p>
              <p class="link"><a href="http://itunes.apple.com/us/app/spubble-lite/id408355153?mt=8" target="_new">See it in the iTunes Store</a></p>
              <p class="longdesc">As part of a 48-hour hackathon at the University of Michigan, I created most of the interface elements and several icons for this mobile app conceived by <a href="http://www.linkedin.com/in/jasteinerman" target="_new">Jake Steinerman</a> to help autistic kids learn and communicate. I created everything in Illustrator, then brought the vectors to Photoshop for resizing, cutting and layer work. I worked with the coding team side-by-side and virtually in a shared repository.</p>
              <p class="longdesc">That weekend, I got to work with Wacom's draw-directly-on-the-screen-Cintiq display. Very cool. Thanks, U-M, and thanks to Dan Fessahazion for letting us crash in Design Lab One.</p>
            </div>
            
            <!-- naomi -->
            <div id="naomi" class="workitem">
              <img id="img-naomi" src="a/naomi.jpg" alt="Alternate text goes here." />
              <h3><a href="http://www.naomirpatton.com" target="_new">naomirpatton.com</a></h3>
              <p class="shortdesc">design / markup / scripting</p>
              <p class="link"><a href="http://www.naomirpatton.com" target="_new">http://www.naomirpatton.com</a></p>
              <p class="longdesc">This portfolio site for <a href="http://www.freep.com" target="_new">Detroit Free Press</a> reporter Naomi R. Patton uses <a href="http://www.typekit.com" target="_new">Typekit</a> to serve fonts to browsers that support the @font-face declaration. It also uses the jQuery lightbox library, which inspired me to write my own lightbox functions for this site.</p>
            </div>

            <!-- historicalvotes  -->
            <div id="histvotes" class="workitem">
              <img id="img-histvotes" src="a/histvotes.jpg" alt="Alternate text goes here." />
              <h3><a href="http://james.da.ydrea.ms" target="_new">SE Michigan's presidential votes</a></h3>
              <p class="shortdesc">design / markup / scripting</p>
              <p class="link"><a href="http://james.da.ydrea.ms/historicalvotes" target="_new">http://james.da.ydrea.ms/historicalvotes</a></p>
              <p class="longdesc">This is a huge stats table that uses my easing animation script for easier viewing.</p>
              <p class="longdesc">It was to be a project for the <a href="http://www.freep.com" target="_new">Detroit Free Press Web site</a> during the 2008 presidential election, but was shelved when we needed to shift gears to accommodate an even bigger election package from Gannett, our parent company. It was never completed, and this is just a model to show off the functionality.</p>
              <p class="longdesc">I ended up using an improved version of this easing script in the Christ Child House project later that year.</p>
              <p class="longdesc">Click on the red buttons below the table to bring tallies into view.</p>
            </div>

            <!-- github  -->
            <div id="code" class="workitem">
              <img id="img-code" src="a/code.jpg" alt="Alternate text goes here." />
              <h3><a href="https://github.com/parisminton" target="_new">My GitHub repositories</a></h3>
              <p class="shortdesc">miscellaneous code</p>
              <p class="link"><a href="https://github.com/parisminton" target="_new">https://github.com/parisminton</a></p>
              <p class="longdesc">Here's where I store my code, and where you can peek under the hood of much of my stuff.</p>
            </div>
          </div><!-- end #work -->

          <div id="contact">
            <h2>Get in touch with James</h2>
            <form id="contact-form" action="" method="post">
              <p id="contact-wrap-name">
                <label for="contact-name">Your name:</label>
                <input id="contact-name" name="contact-name" type="text" size="26" value="Your name" />
              </p>
              <p id="contact-wrap-email">
                <label for="contact-email">Your e-mail address:</label>
                <input id="contact-email" name="contact-email" type="text" size="26" value="Your e-mail address" />
              </p>
              <p id="contact-wrap-msg">
                <label for="contact-msg">Enter your message here:</label>
                <textarea id="contact-msg" name="contact-msg" rows="10" cols="50">So... a penguin, Optimus Prime and Supreme Court Justice Sonia Sotomayor walk into a bar...</textarea>
              </p>
              <p id="contact-wrap-conf">
                <label id="conf" for="contact-conf">Want a copy of this message?</label>
                <input id="contact-conf" name="contact-conf" type="checkbox" value="confirmation" />
              </p>
              <p id="contact-wrap-button">
                <label for="button">Send this message:</label>
                <input type="submit" id="button" name="button" src="a/email_button_8bit_off.png" />
              </p>
            </form>

            <ul id="mylinks">
              <li id="linkedin"><a href="http://www.linkedin.com/in/jamesthomaswebguy">http://www.linkedin.com/in/jamesthomaswebguy</a></li>
              <li id="github"><a href="https://github.com/parisminton">https://github.com/parisminton</a></li>
              <li id="stackexchange"><a href="http://stackoverflow.com/users/472783/parisminton">http://stackoverflow.com/users/472783/parisminton</a></li>
              <li id="lastfm"><a href="http://www.last.fm/user/parisminton">http://www.last.fm/user/parisminton</a></li>
            </ul>
            
          </div><!-- end #contact -->
            
        </div><!-- end #copy -->
      </div><!-- end #content -->
      
      <div id="footer">
        <p id="footer-nav"><a href="/">Home</a> | <a href="about.html">About</a> | <a href="work.html">Work</a> | <a href="contact.html">Contact</a></p>
        <div id="footer-logos">
          <img src="a/conday_logo_8bit.png" alt="This site rolls with ConDay." title="This site rolls with ConDay." />
          <a href="http://www.dreamhost.com" target="_new"><img src="a/dreamhost_logo_8bit.png" alt="This site rests at Dreamhost." title="This site rests at Dreamhost." /></a>
        </div>
        <p id="copyright">All content and design &copy; 2005-2011 James Thomas (parisminton) unless noted otherwise. All rights reserved.</p>
      </div>
    </div>
  </body>
  <script type="text/javascript" src="j/main.js"></script>
</html>
