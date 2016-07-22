<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>untitled</title>
    <style>
      @font-face {
        font-family: uniSans;
        src: url(http://guscaplan.github.io/uni_sans_thin.otf);
      }
      h1 {font-family: uniSans;}
      .nes-status {
        font-family: uniSans;
        font-size: 150%;
      }
      .center{
        text-align: center;
        margin: 0 auto;
      }
      body{
        background-color: #ddd;
        color: #fff;
        margin: 0;
      }
      iframe{
        width:200px;
        height:500px;
        overflow: hidden;
        margin: 0px;
        padding: 0px;
        border: 0px;
      }
      #parent{
        display: flex;
      }
      input {
         height: 29px;
         overflow: hidden;
         width: 240px;
         text-align:center;
         text-indent: 2em;
         -webkit-border-radius: 5px;
         -moz-border-radius: 5px;
         border-radius: 5px;
      }

      input select {
         background: #000;
         border: none;
         font-size: 14px;
         color:#fff;
         text-align:center;
         height: 29px;
         padding: 5px; /* If you add too much padding here, the options won't show in IE */
         width: 268px;
      }
      #buttons {
        font-family: uniSans;
        font-size: 200%;
        margin-right: 300px;
        margin-top: 5em;
        color: #777;
      }
    </style>
</head>

<body>
  <div id="parent">
<!-- <iframe src="contribs.html"></iframe> -->
    <div class="center">
      <!--<h1>NES Interactive Stream</h1> -->
      <div id="emulator"></div>
    </div>
<!--
    <div id="buttons">
      <div id="showbutton-a">A</div>
      <div id="showbutton-b">B</div>
      <div id="showbutton-up">UP</div>
      <div id="showbutton-down">DOWN</div>
      <div id="showbutton-left">LEFT</div>
      <div id="showbutton-right">RIGHT</div>
      <div id="showbutton-start">START</div>
      <div id="showbutton-select">SELECT</div>
    </div>
-->
  </div>
    <script src="lib/webaudio.js"></script>
    <script src="lib/jquery-1.4.2.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="source/nes.js" type="text/javascript" charset="utf-8"></script>
    <script src="source/utils.js" type="text/javascript" charset="utf-8"></script>
    <script src="source/cpu.js" type="text/javascript" charset="utf-8"></script>
    <script src="source/keyboard.js" type="text/javascript" charset="utf-8"></script>
    <script src="source/mappers.js" type="text/javascript" charset="utf-8"></script>
    <script src="source/papu.js" type="text/javascript" charset="utf-8"></script>
    <script src="source/ppu.js" type="text/javascript" charset="utf-8"></script>
    <script src="source/rom.js" type="text/javascript" charset="utf-8"></script>
    <script src="source/ui.js" type="text/javascript" charset="utf-8"></script>
    <script src="/socket.io/socket.io.js"></script>
    <script src="main.js"></script>
    <script type="text/javascript" charset="utf-8">
        var nes;
        $(function() {
            nes = new JSNES({
                'ui': $('#emulator').JSNESUI({
                    "checking": [
			    <?php rom_list('roms/'); ?>
                    ],
                    "favorite": [
			    <?php rom_list('roms/favorite/'); ?>
                    ],
                })
            });
        });
    </script>
    <!--[if IE]>
        <script type="text/vbscript" src="source/jsnes-ie-hacks.vbscript"></script>
    <![endif]-->

<?php
function rom_list($path = 'roms/temp/') {
	foreach (scandir($path) as $key=>$val) {
		if (substr($val,-3) != "nes") continue;
		$val = str_replace("'","\'",$val);
		echo sprintf("['%s', '%s'],", $val, $path.$val);
	}
}

?>
</body>
</html>
