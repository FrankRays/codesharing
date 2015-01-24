<!DOCTYPE html>
<html lang="en" class="app">
   <head>
      <?php include 'partial/head.php' ?>
   </head>
   <body>
      <section class="vbox">
         <?php include 'partial/header.php' ?>
         <section>
            <section class="hbox stretch">
               <aside class="bg-dark lter aside-md hidden-print" id="nav">
                  <?php include 'partial/nav.php' ?>
               </aside>
               <section id="content">
                  <section class="vbox">
                     <section class="scrollable padder">
                        <?php include 'partial/breadcum.php' ?>
                        <section id="pagecontent"></section>
                     </section>
                  </section>
                  <a href="#" class="hide nav-off-screen-block" data-toggle="class:nav-off-screen" data-target="#nav"></a>
               </section>
            </section>
         </section>
      </section>
      <?php include 'partial/scripttag.php' ?>
   </body>
</html>