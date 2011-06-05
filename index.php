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
    <meta name="description" content="James Thomas is Web developer and designer with more than 14 years of experience buidling and maintaining sites, mostly for large news organizations." />
    <meta name="DC.creator" content="James Thomas" />
    <meta name="DC.subject" content="james thomas, web development" />
    <title>James Thomas' portfolio :: james.da.ydrea.ms</title>  
    <link rel="stylesheet" href="c/main.css" type="text/css"/>
    
    <?php

      $clean_name = filter_var($_POST['contact-name'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW); 
      $clean_email = filter_var($_POST['contact-email'], FILTER_SANITIZE_EMAIL);
      $clean_msg = filter_var($_POST['contact-msg'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

      if (isset($_POST['button'])) {
        
        $message = Swift_Message::newInstance()
          ->setSubject("A message from {$clean_name} via james.da.ydrea.ms")
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

//      echo "I can take you there. Just follow me.";

    ?>

  </head>

  <body id="home"> 
    <div id="wrap">
      <!-- <img id="ref" src="a/reference_8bit.png" alt="Just a reference" width="921" height="522" /> -->
      <h1 id="mast">James Thomas is a Web developer and designer. He has more than a decade of experience building and maintaining digital content for news organizations.</h1>
      <img id="toon" src="a/james_logo_leadclouds_8bit.png" alt="Don't let James' stoic expression fool you... he's passionate about effective storytelling, handsome design and clean code." title="Don't let James' stoic expression fool you... he's passionate about effective storytelling, handsome design and clean code." width="252" height="360" />
      <ul id="nav">
        <li id="nav-about"><a href="#">Work experience and interests</a></li>
        <li id="nav-work"><a href="#">See my work</a></li>
        <li id="nav-contact"><a href="#">Call, e-mail or find me on a social online</a></li>
      </ul>
      <div id="content">
        <div id="copy">
          <div id="welcome">
            <h2>People seem to dig my expressive ability.</h2>
            <p>It's all been fun... the journalism, the programming, the graphic design. But it's also been meaningful.</p>
            <p>My goal is to keep that balance of meaningful, challenging and fun work throughout my career.</p>
          </div><!-- end #welcome -->

          <div id="about">
            <h2>About James</h2>
            <p>I'm a tinkerer who loves the creative freedom technology enables. I like my hands dirty.</p>
            <p>For fourteen years, I've built and managed Web sites in a career that began as a newsroom apprentice at the Detroit Free Press.</p>
            <p>I've got a solid understanding of Web standards and the core principles of object-oriented programming. Lately I've been learning some compiled languages and practicing mobile development.</p>
            <p>But I started as a writer and still love the written word. I strive for a well-turned phrase, and news that's accurate, engaging and incisive. Much of my Freep.com work has been making concise Web text read well.</p>
            <p>My career has mostly been in large news organizations, working on tight deadlines in a collaborative environment. I've cherished having great co-workers.</p>
          </div><!-- end #about -->

          <div id="work">
            <h2>Examples of James' work</h2>

            <!-- christ child -->
            <div id="christchild" class="workitem">
              <img id="img-christchild" src="a/christchild.jpg" alt="Alternate text goes here." />
              <h3><a href="http://web.archive.org/web/20090818101308/http://www.freep.com/christchild" target="_new">Christ Child House</a></h3>
              <p class="shortdesc">design / markup / scripting</p>
              <p class="longdesc">I designed and coded this Emmy-winning presentation about boys in foster care while I was at the Detroit Free Press. My editors got detailed Illustrator mock-ups for approval, then I took all the .ai files to Photoshop for layer work and cutting. I hand-coded all pages using XHTML, CSS and JavaScript, then my editor Pat and I turned them into SaxoTech templates.</p>
            </div>
            
            <!-- spubble -->
            <div id="spubble" class="workitem">
              <img id="img-spubble" src="a/christchild.jpg" alt="Alternate text goes here." />
              <h3><a href="http://itunes.apple.com/us/app/spubble-lite/id408355153?mt=8" target="_new">Spubble Lite</a></h3>
              <p class="shortdesc">design</p>
              <p class="longdesc">As part of a University of Michigan 48-hour hackathon, I created most of the interface elements and several icons for this mobile app designed to help autistic kids learn and communicate. I created everything in Illustrator, then brought the vectors to Photoshop for resizing, cutting and layer work. I worked with the coding team side-by-side and virtually in a shared repository.</p>
              <p class="longdesc">That weekend, I got to work with Wacom's draw-directly-on-screen-Cintiq display. Thanks, U-M, and thanks to Dan Fessahazion for letting us crash in Design Lab One.</p>
            </div>
            
            <!-- naomi -->
            <div id="naomi" class="workitem">
              <img id="img-naomi" src="a/christchild.jpg" alt="Alternate text goes here." />
              <h3><a href="http://www.naomirpatton.com" target="_new">naomirpatton.com</a></h3>
              <p class="shortdesc">design / markup / scripting</p>
              <p class="longdesc">This portfolio site for Detroit Free Press reporter Naomi R. Patton uses <a href="http://www.typekit.com" target="_new">Typekit</a> to serve fonts to browsers that support the @font-face declaration. It also uses the jQuery lightbox library.</p>
            </div>

            <!-- historicalvotes  -->
            <div id="histvotes" class="workitem">
              <img id="img-histvotes" src="a/christchild.jpg" alt="Alternate text goes here." />
              <h3><a href="http://james.da.ydrea.ms" target="_new">SE Michigan's presidential votes</a></h3>
              <p class="shortdesc">design / markup / scripting</p>
              <p class="longdesc">This is a huge stats table that uses a slider animation for easier viewing.</p>
              <p class="longdesc">It was to be a project for the Detroit Free Press Web site during the 2008 presidential election, but was shelved when we needed to shift gears to accomodate an even bigger election package from Gannett, our parent company.</p>
              <p class="longdesc">I ended up using an improved version of this slider script in the Christ Child House project later that year.</p>
            </div>

            <!-- github  -->
            <div id="code" class="workitem">
              <img id="img-code" src="a/christchild.jpg" alt="Alternate text goes here." />
              <h3><a href="https://github.com/parisminton" target="_new">My GitHub repositories</a></h3>
              <p class="shortdesc">miscellaneous code</p>
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
              <li id="github"><a href="https://github.com/parisminton">https://github.com/parisminton</a></li>
              <li id="linkedin"><a href="http://www.linkedin.com/in/jamesthomaswebguy">http://www.linkedin.com/in/jamesthomaswebguy</a></li>
              <li id="stackexchange"><a href="http://stackoverflow.com/users/472783/parisminton">http://stackoverflow.com/users/472783/parisminton</a></li>
              <li id="lastfm"><a href="http://www.last.fm/user/parisminton">http://www.last.fm/user/parisminton</a></li>
            </ul>
            
          </div><!-- end #contact -->
            
        </div><!-- end #copy -->
      </div><!-- end #content -->
      
      <div id="footer"><p>A footer goes here?</p></div>
    </div>
  </body>
  <script type="text/javascript" src="j/main.js"></script>
</html>
