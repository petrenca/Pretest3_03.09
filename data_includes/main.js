PennController.ResetPrefix(null); // Initiates PennController
PennController.AddHost("https://amor.cms.hu-berlin.de/~pallesid/dfg_pretests/pictures/");; // loads pictures from external server (pre-test 3 only)
    
    
    // Start typing your code here
    
    //====================================================================================================================================================================================================================
    // Establish sequence, with randomised items
    //PennController.Sequence( "demographics", "instructions1", "practice_trials", "instructions2", randomize("critical_trials") , "send" , "final" );
    PennController.Sequence( "practice_trials", "critical_trials", "send" , "final" );

//====================================================================================================================================================================================================================
// 1. Welcome page/demographics
PennController("demographics",
               newText("welcometext", "<p><b>Herzlich willkommen zu unserem Experiment!</b><p> <p>Um an unserem Experiment teilnehmen zu k&ouml;nnen, ben&ouml;tigen wir Angaben zu Ihrer Person. Diese werden anonym ausgewertet. Genauere Informationen entnehmen Sie bitte dem Informationsblatt f&uuml;r Proband*innen.<p>")              
               .settings.css("font-size", "20px")
               ,
               newCanvas("welcomecanvas", 1000, 125)
               .settings.add(0, 0, getText("welcometext") )
               .print() 
               ,
               newDropDown("age", "")
               .settings.log()
               .settings.add( "17 oder junger" , "18" , "19" , "20", "21" , "22" , "23", "24" , "25" , "26", "27" , "28" , "29", "30" , "31" , "32 oder &auml;lter" )
               ,
               newText("agetext", "Alter:")
               .settings.css("font-size", "20px")
               .settings.bold()
               //        .settings.after( getDropDown("age") )    
               ,
               newCanvas("agecanvas", 1000, 45)
               .settings.add(0, 10, getText("agetext") ) 
               .settings.add(100, 8, getDropDown("age") )
               .print()    
               ,
               newText("Geschlecht", "Geschlecht:")
               .settings.css("font-size", "20px")
               .settings.bold()
               ,
               newDropDown("sex", "" )
               .settings.log()
               .settings.add( "&nbsp;weiblich&nbsp;", "&nbsp;m&auml;nnlich&nbsp;", "&nbsp;divers&nbsp;")
               ,
               newCanvas("sexcanvas", 1000, 40)
               .settings.add(0, 0, getText("Geschlecht") ) 
               .settings.add(120, 3, getDropDown("sex") )
               .print() 
               ,
               newText("SpracheTest", "Haben Sie bis zum 5. Lebensjahr au&szlig;er Deutsch eine weitere Sprache gelernt?")
               .settings.css("font-size", "20px")
               .settings.bold()
               ,
               newTextInput("und zwar", "")
               .settings.log()
               .settings.hidden()
               ,
               newText("label input", "")
               .settings.after( getTextInput("und zwar") )
               ,
               newDropDown("language", "")
               .settings.log()
               .settings.add(  "nein", "ja, und zwar:")    
               .settings.after(  getText("label input") )
               .settings.callback( // Whenever an option is selected, do this:
                   getDropDown("language")
                   .test.selected("ja, und zwar:") 
                   // ... reveal the input box
                   .success( getTextInput("und zwar").settings.visible() )
                   // ... hide the input box
                   .failure( getTextInput("und zwar").settings.hidden()  )
                   
                   //        .print()
                   
               )        
               ,
               newCanvas("languagecanvas", 1000, 25)
               .settings.add(0, 0, getText("SpracheTest") ) 
               .settings.add(690, 2, getDropDown("language") )
               .print() 
               ,
               newText("<p> ")
               .print()
               ,    
               newText("information", "<p>Bevor das Experiment beginnen kann, sollten Sie das <a href='https://amor.cms.hu-berlin.de/~pallesid/dfg_pretests/documentation/probanden_info_ONLINE_LifeFact.pdf' target='_blank' >Probanden Informationsblatt</a> sowie die <a href='https://amor.cms.hu-berlin.de/~pallesid/dfg_pretests/documentation/einversta%CC%88dnis_ONLINE_LifeFact.pdf' target='_blank' >Einwilligungserkl&auml;rung</a> lesen.<p>")    
               .settings.css("font-size", "20px")
               ,
               newCanvas("infocanvastwo", 1000, 80)
               .settings.add(0, 0, getText("information") )
               .print() 
               ,
               newButton("okay", "Ich habe das Probanden Informationsblatt sowie die Einwilligungserkl&auml;rung gelesen und erkl&auml;re mich mit diesen einverstanden.")
               .settings.css("font-size", "15px")        
               .print()
               .wait()  
               ,
               newText("<p> ")
               .print()  
               ,
               newButton("start", "Experiment beginnen")
               .settings.center()  
               ,
               getDropDown("age")
               .test.selected()
               .success()
               .failure(
                   newText("Bitte geben Sie ihr Alter an.")
                   .settings.color("red")
                   .print())   
               ,
               getDropDown("sex")
               .test.selected()
               .success()
               .failure(
                   newText("Bitte geben Sie ihr Geschlecht an.")
                   .settings.color("red")
                   .print()) 
               ,
               getDropDown("language")
               .test.selected()
               .success()
               .failure(
                   newText("Bitte beantworten Sie die Frage zum Spracherwerb.")
                   
                   .settings.color("red")
                   .print())      
               ,
               getDropDown("age").wait("first")
               ,
               getDropDown("sex").wait("first")
               ,
               getDropDown("language").wait("first")
               ,
               getButton("start")
               .print()
               .wait()
               
              )      //end of welcome screen
    ,   
    newVar("IDage")
    .settings.global()
    .set( getTextInput("IDage") )
    ,
    newVar("IDsex")
    .settings.global()
    .set( getTextInput("IDsex") )
    ,
    newVar("IDling")
    .settings.global()
    .set( getTextInput("IDling") )
    , 
    newVar("IDund zwar")
    .settings.global()
    .set( getTextInput("IDund zwar") );


//====================================================================================================================================================================================================================
// 2. Intro/instructions

PennController( "instructions1" ,
                newText("intro_instructions", "<p><b>Vielen Dank, dass Sie an diesem Experiment teilnehmen!</b><p> <p>In diesem Experiment werden Sie die Namen verschiedener ber&uuml;hmter Pers&ouml;nlichkeiten sehen und Fragen zu diesen beantworten.<p> ")
                .settings.css("font-size", "20px")
                ,
                newText("intro_instructions2", "<p>Legen Sie Ihren <b>linken Zeigefinger</b> auf die Taste '<b>F</b>' und Ihren <b>rechten Zeigefinger</b> auf die Taste '<b>J</b>'.<p>")
                .settings.css("font-size", "20px")
                .settings.color("red")
                ,
                newText("intro_instructions3", "<p>Sobald ein Name erscheint, dr&uuml;cken Sie <b>mit dem linken Zeigefinger = 'Ja'</b>, falls Sie diese Person kennen, und <b>mit dem rechten Zeigefinger = 'Nein'</b>, falls Sie diese Person nicht kennen.<p> <p>Werden Sie 'Am Leben?' gefragt, antworten Sie, ob Sie glauben, dass diese Person noch am Leben ist: <b>linker Zeigefinger = 'Ja' / rechter Zeigefinger = 'Nein'</b><p> <p>Danach werden Sie eine Jahreszahl sehen. Antworten Sie, ob Sie glauben, dass diese Person im genannten Jahr am Leben war: <b> linker Zeigefinger = 'Ja'/ rechter Zeigefinger = 'Nein'</b><p> <p>Zuletzt wird Ihnen ein Gegenstand gezeigt und Sie werden gefragt, ob Sie die Person mit diesem Gegenstand assoziieren k&ouml;nnen. Dr&uuml;cken Sie auch hier: <b> linker Zeigefinger = 'Ja' / rechter Zeigefinger = 'Nein'</b>.<p>")
                .settings.css("font-size", "20px")
                ,      
                newCanvas("introcanvas",900, 450)
                .settings.add(0,0, getText("intro_instructions"))
                .settings.add(0,110, getText("intro_instructions2")  )
                .settings.add(0,150, getText("intro_instructions3")  )
                .print()   
                ,
                newButton("beispiel_beginnen", "Beispiele beginnen")
                .settings.center()
                .print()
                .wait()
               );

//====================================================================================================================================================================================================================
// 3. Practice round

PennController. Template( PennController.GetTable( "practice.csv"),
                          variable => PennController( "practice_trials",
                                                      newText ("instructions_example_pic", "<p><br>Ihnen bekannt?<p>")
                                                      .settings.css("font-size", "20px") 
                                                      .settings.center() 
                                                      .settings.color("red")
                                                      .print()
                                                      ,
                                                      newText("example_pic", "<br>"+ variable.file_name)
                                                      .settings.css("font-size", "25px")
                                                      .settings.center()
                                                      .settings.bold()
                                                      .print()
                                                      ,
                                                      newText ("instructions_example_pic2"," <p><b>links = 'Ja' / rechts = 'Nein'</b><p>")
                                                      .settings.css("font-size", "20px") 
                                                      .settings.center() 
                                                      .settings.color("red")
                                                      .print()
                                                      ,
                                                      newTimer("delay", 200)    //no button can be pressed before 500ms
                                                      .start()
                                                      .wait()
                                                      ,                                                      
                                                      newKey("q_example_pic", "FJ")
                                                      .settings.log()
                                                      .wait()                                   
                                                      ,
                                                      getText ("instructions_example_pic")
                                                      .remove()
                                                      ,
                                                      getText("example_pic")
                                                      .remove()
                                                      ,
                                                      getText("instructions_example_pic2")
                                                      .remove()
                                                      ,
                                                      getKey("q_example_pic") 
                                                      .remove()
                                                      ,
                                                      getKey("q_example_pic")
                                                      .test.pressed("F")
                                                      .success
                                                      (      
                                                          
                                                          newTimer("warte", 100) //if absent the "F" pressed in the previous tasks is displayed in the Input Box 
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newText("name_task", "<p><br>Wie hei&szlig;t die Person auf dem Foto?<br><p>")
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newTextInput("name_practice", "")
                                                          .settings.css("font-size", "25px")
                                                          .log()
                                                          .print()
                                                          ,
                                                          newTimer("delay_name", 700)
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newText("<p> ")
                                                          .print()  
                                                          ,
                                                          newText ("instr_contin", "<p><b>Enter</b> um weiter fortzufahren.<p>")  
                                                          .settings.css("font-size", "20px") 
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,  
                                                          newKey("next", "Enter")
                                                          .callback(getTextInput("name_practice")
                                                                    .disable())
                                                          .wait()
                                                          ,
                                                          getText("name_task")
                                                          .remove()
                                                          ,
                                                          getTextInput("name_practice")
                                                          .remove()
                                                          ,
                                                          getText ("instr_contin")
                                                          .remove()
                                                          ,
                                                          getKey("next")
                                                          .remove()
                                                          ,
                                                          newText ("instructions_example_alive", "Noch am Leben?<p>")  
                                                          .settings.css("font-size", "20px") 
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          , 
                                                          newText("example_alive", "<br> Am Leben?" )
                                                          .settings.css("font-size", "25px")
                                                          .settings.center()                                                          
                                                          .print()                                                    
                                                          ,  
                                                          newText ("instructions_example_alive2", "<br><p><b>links = 'Ja' / rechts = 'Nein'</b><p>")  
                                                          .settings.css("font-size", "20px") 
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,                                                           
                                                          newTimer("delay2", 500)     //no button can be pressed before 500ms
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newTimer("time_out", 5000)  //if no button is pressed procedes with the next question after 5s
                                                          .start()
                                                          ,
                                                          newKey("q_example_alive", "FJ")
                                                          .settings.log()
                                                          .callback( getTimer("time_out").stop() )                                 
                                                          ,
                                                          getTimer("time_out")
                                                          .wait()                   
                                                          ,
                                                          getText("example_alive")
                                                          .remove()
                                                          ,
                                                          getText("instructions_example_alive")
                                                          .remove()                                                         
                                                          ,
                                                          getText("instructions_example_alive2")
                                                          .remove()                                                         
                                                          ,  
                                                          getKey("q_example_alive") 
                                                          .remove()
                                                          ,
                                                          newText ("instructions_example_year", "Im genannten Jahr am Leben?<p>")  
                                                          .settings.css("font-size", "20px") 
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newText("example_year", "<br>"+ variable.year)
                                                          .settings.css("font-size", "25px")
                                                          .settings.center()
                                                          .print()  
                                                          ,
                                                          newText ("instructions_example_year2", "<br><p><b>links = 'Ja' / rechts = 'Nein'</b><p>")  
                                                          .settings.css("font-size", "20px") 
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newTimer("delay3", 500)
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newTimer("time_out2", 5000)
                                                          .start()
                                                          ,
                                                          newKey("q_example_year", "FJ")
                                                          .settings.log() 
                                                          .callback( getTimer("time_out2").stop() )      //stops the timer if a button was pressen  before 5s are over                          
                                                          ,
                                                          getTimer("time_out2")
                                                          .wait()                               
                                                          ,
                                                          getText("example_year")
                                                          .remove()
                                                          ,
                                                          getText("instructions_example_year")
                                                          .remove()
                                                          ,
                                                          getText("instructions_example_year2")
                                                          .remove()
                                                          ,  
                                                          getKey("q_example_year") 
                                                          .remove()
                                                          ,
                                                          newText ("instructions_example_fact", "Hat die Person damit zu tun?<p>")  
                                                          .settings.css("font-size", "20px") 
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newText("example_fact", "<br>" + variable.fact)
                                                          .settings.css("font-size", "25px")
                                                          .settings.center()
                                                          .print()                                                    
                                                          ,
                                                          newText ("instructions_example_fact2", "<br><p><b>links = 'Ja' / rechts = 'Nein'</b><p>")  
                                                          .settings.css("font-size", "20px") 
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newTimer("delay4", 500)
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newTimer("time_out3", 5000)
                                                          .start()
                                                          ,
                                                          newKey("q_example_fact", "FJ")
                                                          .settings.log()
                                                          .callback( getTimer("time_out3").stop() ) 
                                                          ,
                                                          getTimer("time_out3")
                                                          .wait()
                                                          ,                                
                                                          getText("instructions_example_fact")
                                                          .remove()
                                                          ,
                                                          getText("example_fact")
                                                          .remove()
                                                          ,
                                                          getText("instructions_example_fact2")
                                                          .remove()
                                                          ,
                                                          getKey("q_example_fact") 
                                                          .remove()                                                          
                                                          ,
                                                          newText ("instructions_example_name","Die Persom auf dem Bild hei&szlig;t...<p>")
                                                          .settings.css("font-size", "20px") 
                                                          .settings.center() 
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newText("example_name","<br>"+  variable.name)
                                                          .settings.css("font-size", "25px")
                                                          .settings.center()
                                                          .settings.bold() 
                                                          .print()
                                                          , 
                                                          newText ("instructions_example_name2"," <p><b>links = 'Ja' / rechts = 'Nein'</b><p>")
                                                          .settings.css("font-size", "20px") 
                                                          .settings.center() 
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newTimer("delay5", 500)
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newTimer("time_out4", 5000)
                                                          .start()
                                                          ,                            
                                                          newKey("q_example_name", "FJ")
                                                          .settings.log()
                                                          .callback( getTimer("time_out4").stop() )                                   
                                                          ,
                                                          getTimer("time_out4")
                                                          .wait()
                                                          ,
                                                          getText("example_name")
                                                          .remove()
                                                          ,
                                                          getText("instructions_example_name")
                                                          .remove()
                                                          ,
                                                          getText ("instructions_example_name2")
                                                          .remove()
                                                          ,
                                                          getKey("q_example_name") 
                                                          .remove()
                                                          ,
                                                          newText ("instructions_continue", "<p>Dr&uuml;cken Sie bitte die <b>Leertaste</b>, um weiter fortzufahren.<p>")  
                                                          .settings.css("font-size", "20px") 
                                                          .settings.center()  
                                                          .settings.color("red")                                                        
                                                          .print()
                                                          ,
                                                          newKey("continue" ," ")
                                                          .print()
                                                          .wait()
                                                          ,
                                                          getText("instructions_continue")
                                                          .remove()
                                                          ,  
                                                          getKey("continue") 
                                                          .remove()
                                                        
                                                          
                                                      )
                                                      .failure
                                                      ( 
                                                          
                                                          newText ("failure", "<br><p>Wenn Sie den Namen nicht kennen, setzen Sie mit dem n&auml;chsten Namen fort.<p>")
                                                          .settings.css("font-size", "20px") 
                                                          .settings.color("red")
                                                          .settings.center()  
                                                          .print()   
                                                          ,
                                                          newText ("instructions_continue2", "<p>Dr&uuml;cken Sie bitte die <b>Leertaste</b>, um weiter fortzufahren.<p>")  
                                                          .settings.css("font-size", "20px") 
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newKey("continue2" ," ")
                                                          .print()
                                                          .wait()
                                                          ,
                                                          getText("instructions_continue2")
                                                          .remove()
                                                          ,  
                                                          getKey("continue2") 
                                                          .remove()  
                                                          
                                                      ))
                          .log( "type" , variable.type ) // 20.04.2020 DP changed from "pratice_trial" to "type"
                          .log( "name" , variable.name)  
                          .log( "year" , variable.year)
                          .log( "fact" , variable.fact)
                          .log( "full_sentence" , variable.full_sentence)
                          .log( "condition" , variable.condition)
                          .log( "life_match" , variable.life_mismatch)
                          .log( "fact_match" , variable.fact_mismatch)
                          .log( "list" , variable.list)
                          .log( "yes_key" , variable.yes_F)
                          .log( "occupation" , variable.occupation)
                         );


//====================================================================================================================================================================================================================
// 4. Instructions before experiment
PennController( "instructions2" ,
                newText("intro_experiment", "<p>Jetzt wird das Experiment beginnen. Es wird ungef&auml;hr eine halbe Stunde dauern.<p> <p>Es wird immer zuerst ein Name angezeigt und anschlie&szlig;end die Frage 'Am Leben?', ein Jahr und ein Gegenstand.<p> <p><br>Anworten Sie bitte: <p><b>1. ob Sie die Person kennen,<p> <p>2. ob die Person noch am Leben ist, <p> <p>4. ob die Person im genannten Jahr am leben war,</b> und zuletzt,<p> <p><b>5. ob Sie die Person mit dem Gegenstand assoziieren k&ouml;nnen.</b><p>")
                .settings.css("font-size", "20px")
                ,
                newText("intro_experiment2", "<p>Antworten Sie immer <b>mit dem linken Zeigefinger = 'Ja'</b> und <b>mit dem rechten Zeigefinger = 'Nein'</b>.")
                .settings.css("font-size", "20px")
                .settings.color("red")
                ,
                newText("intro_experiment3", "<p>Viel Spa&szlig;!<p>")
                .settings.css("font-size", "20px")            
                ,
                newCanvas("instructions_canvas",900, 480)
                .settings.add(0, 0, getText("intro_experiment") )
                .settings.add(0, 345, getText("intro_experiment2") )
                .settings.add(0, 415, getText("intro_experiment3") )
                .print()    
                ,
                newButton("start_experiment3" ,"Experiment beginnen")
                .settings.center()
                .print()
                .wait()
                ,
                getCanvas("instructions_canvas")
                .remove()
                ,
                getButton("start_experiment3")
                .remove()
                ,
                newText("instructions_key", "<br><b>Legen Sie Ihre Zeigefinger auf die Tasten und dr&uuml;cken Sie die 'Ja-Taste', um  das Experiment zu beginnen.</b></br>") 
                .settings.css("font-size", "20px")
                .settings.center()
                .print() 
                , 
                newKey('continue', 'F') 
                .wait() 
                ,  
                getText("instructions_key") 
                .remove() 
                , 
                newTimer(1000) 
                .start() 
                .wait()                
               );     //end of experiment instructions screen   


//====================================================================================================================================================================================================================
// 5. Experimental trials

PennController. Template( PennController.GetTable( "list-1_DFG_stimuli.csv"),
                          variable => PennController( "critical_trials",
                                                      newImage("picture", variable.file_name)
                                                      .settings.size(400)                                                      
                                                      .center()
                                                      .print()
                                                      ,
                                                      newTimer("delay6", 200)
                                                      .start()
                                                      .wait()
                                                      ,
                                                      newKey("question_pic", "FJ")
                                                      .settings.log()
                                                      .wait()                                   
                                                      ,
                                                      getImage("picture")
                                                      .remove()
                                                      ,  
                                                      getKey("question_pic") 
                                                      .remove()
                                                      ,   
                                                      getKey("question_pic")
                                                      .test.pressed("F")
                                                      .success
                                                      (      
                                                          newTimer("warte2", 100) //if absent the "F" pressed in the previous tasks is displayed in the Input Box 
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newText("name_task2", "<p><br>Wie hei&szlig;t die Person auf dem Foto?<br><p>")
                                                          .settings.css("font-size", "25px")
                                                          .settings.center()
                                                          .print()
                                                          ,
                                                          newTextInput("name", "")
                                                          .settings.css("font-size", "25px")
                                                          .log()
                                                          .print()
                                                          ,
                                                          newTimer("delay_name2", 700)
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newText("<p> ")
                                                          .print()  
                                                          ,
                                                          newKey("next2", "Enter")
                                                          .callback(getTextInput("name")
                                                                    .disable())
                                                          .wait()
                                                          ,                                                          
                                                          getText("name_task2")
                                                          .remove()
                                                          ,
                                                          getTextInput("name")
                                                          .remove()
                                                          ,
                                                          getKey("next2")
                                                          .remove()
                                                          ,
                                                          newText("question2","Am Leben?" )
                                                          .settings.css("font-size", "25px")
                                                          .settings.center()
                                                          .print()                                                    
                                                          ,
                                                          newTimer("delay7", 500)
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newTimer("time_out5", 5000)
                                                          .start()
                                                          ,
                                                          newKey("question_alive", "FJ")
                                                          .settings.log()
                                                          .callback( getTimer("time_out5").stop() )  
                                                          ,
                                                          getTimer("time_out5")
                                                          .wait()
                                                          ,
                                                          getText("question2")
                                                          .remove()
                                                          ,  
                                                          getKey("question_alive") 
                                                          .remove()                             
                                                          ,                         
                                                          newText("question3", variable.year)
                                                          .settings.css("font-size", "25px")
                                                          .settings.center()
                                                          .print()  
                                                          ,                   
                                                          newTimer("delay8", 500)
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newTimer("time_out6", 5000)
                                                          .start()
                                                          ,
                                                          newKey("question_year", "FJ")
                                                          .settings.log() 
                                                          .callback( getTimer("time_out6").stop() )                                 
                                                          ,
                                                          getTimer("time_out6")
                                                          .wait()
                                                          ,
                                                          getText("question3")
                                                          .remove()
                                                          ,  
                                                          getKey("question_year") 
                                                          .remove()
                                                          ,                         
                                                          newText("question4", variable.fact)
                                                          .settings.css("font-size", "25px")
                                                          .settings.center()
                                                          .print()                                                    
                                                          ,                          
                                                          newTimer("delay9", 500)
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newTimer("time_out7", 5000)
                                                          .start()
                                                          ,
                                                          newKey("question_fact", "FJ")
                                                          .settings.log()
                                                          .callback( getTimer("time_out7").stop() ) 
                                                          ,
                                                          getTimer("time_out7")
                                                          .wait()
                                                          ,
                                                          getText("question4")
                                                          .remove()
                                                          ,  
                                                          getKey("question_fact") 
                                                          .remove()
                                                          ,                         
                                                          newText("question5", variable.name)
                                                          .settings.css("font-size", "25px")
                                                          .settings.center()
                                                          .print()                                                    
                                                          , 
                                                          newTimer("delay10", 500)
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newTimer("time_out8", 5000)
                                                          .start()
                                                          ,                         
                                                          newKey("question_name", "FJ")
                                                          .settings.log()
                                                          .callback( getTimer("time_out8").stop() )                                 
                                                          ,
                                                          getTimer("time_out8")
                                                          .wait()
                                                          ,
                                                          getText("question5")
                                                          .remove()
                                                          ,  
                                                          getKey("question_name") 
                                                          .remove()
                                                          ,                             
                                                          newText("pleasewait", "...")
                                                          .settings.css("font-size", "25px")
                                                          .settings.center()
                                                          .settings.bold()
                                                          .print()
                                                          ,
                                                          newTimer("wait", 1000)
                                                          .start()
                                                          .wait()
                                                          ,
                                                          getText("pleasewait")
                                                          .remove()
                                                          
                                                      )
                                                      .failure
                                                      ( 
                                                          
                                                          newText("pleasewait2", "...")
                                                          .settings.css("font-size", "25px")
                                                          .settings.center()
                                                          .settings.bold()
                                                          .print()
                                                          ,
                                                          newTimer("wait2", 1000)
                                                          .start()
                                                          .wait()
                                                          ,
                                                          getText("pleasewait2")
                                                          .remove()
                                                          
                                                      ))                       
                          .log( "item" , variable.item )
                          .log( "type" , variable.type ) // 20.04.2020 DP changed from "pratice_trial" to "type"
                          .log( "item" , variable.item)
                          .log( "version" , variable.version)
                          .log( "letter" , variable.letter)
                          .log( "sentence" , variable.sentence)
                          .log( "name" , variable.name)  
                          .log( "year" , variable.year)
                          .log( "fact" , variable.fact)
                          .log( "full_sentence" , variable.full_sentence)
                          .log( "condition" , variable.condition)
                          .log("life_mismatch", variable.life_mismatch)
                          .log("fact_mismatch", variable.fact_mismatch)
                          .log( "list" , variable.list)
                          .log( "yes_key" , variable.yes_F)
                          .log("type", variable.type)  
                          .log( "occupation" , variable.occupation)
                         );

//====================================================================================================================================================================================================================
// 6. Break

PennController( "break" ,
                newText("break_text", "<p><b>Zeit f&uuml;r eine kleine Pause!</b> <br><p>Dr&uuml;cken Sie die Leertaste, um fortzufahren, oder entspannen Sie sich und nehmen Sie kurz die Augen vom Bildschirm.<br><p><b>Das Experiment geht nach 20 Sekunden automatisch weiter.</br></b><p>")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()    
                ,
                newTimer("break_timer", 20000)
                .start()                
                , 
                newKey("continue_exp", " ")                 
                .callback( getTimer("break_timer").stop() )   
                ,
                getTimer("break_timer")
                .wait("first")
                ,
                getText("break_text") 
                .remove()                
                ,
                getKey("continue_exp")
                .remove()   
                ,
                newText("instructions_key2", "<br><b>Legen Sie Ihre Zeigefinger auf die Tasten und dr&uuml;cken Sie die 'Ja-Taste', um  das Experiment zu beginnen.</b></br>") 
                .settings.css("font-size", "20px")
                .settings.center()
                .print() 
                , 
                newKey("continue_Ja", "F") 
                .wait() 
                ,  
                getText("instructions_key2") 
                .remove()                  
                , 
                newTimer(1000) 
                .start() 
                .wait()             
               )    
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 6. Send results

PennController.SendResults( "send" );


//====================================================================================================================================================================================================================
// 7. Good-bye

PennController( "final" ,
                newText("<p><b>Vielen Dank f&uuml;r Ihre Teilnahme an unserem Experiment!</b><p>")
                .settings.css("font-size", "25px")
                .print()
                ,
                newButton("void")
                .wait()
               )
    .log("IDage", getVar("IDage"))
    .log("IDsex", getVar("IDsex"))
    .log("IDling", getVar("IDling"))
    .log("IDsecondlanguage", getVar("IDund zwar"))
