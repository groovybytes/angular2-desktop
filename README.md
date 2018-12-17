# Angular2Desktop

The library is built on angular 6, tested with latest chrome and firefox versions.
It emulates a desktop environment.

[demo](http://groovybytes.at:9000/demo2)

## Requirements

angular6+, jquery, lodash, interactjs,font awesome


## Install

    $ npm install angular2-desktop
    $ npm i jquery
    $ npm i interactjs
    $ npm @fortawesome/fontawesome-free

### Configure app

add css snippet in your global style:
```
html, body {
  height: 100%;
  width: 100%;
  min-width: 1024px;
  min-height: 100% !important;
  margin: 0;
  padding: 0;
}

```

add libraries to your angular.json

```
"styles": [
              "src/styles.css",
              "node_modules/@fortawesome/fontawesome-free/css/all.css"
            ],
            "scripts": [
              "node_modules/jquery/dist/jquery.min.js",
              "node_modules/lodash/lodash.min.js",
              "node_modules/interactjs/dist/interact.min.js"
    
            ]
```

## Usage

### Defining applications / specifying entry components

 In your app.component define applications :
 
 
  ```
   let myGreatApp = new DesktopApplication();
     myGreatApp.component = TestapplicationComponent;
     myGreatApp.id = 'mygreatapp';
     myGreatApp.title = 'mygreatapp';
     myGreatApp.defaultWindowParams = new WindowParams(
       null,
       100,
       100,
       200,
       200,
       'mygreatapp'
     );
   ```
 
 make sure to provide WindowComponent and your application's entry 
 component in the entry components of your app module.
    ```
 entryComponents:[WindowComponent,TestapplicationComponent]
    ```
    
    
 ### Opening Applications
 
 
 #### Using "a2d-shortcut" directive
 
 example:
  ```
  <button
         type="button"
         style="position:absolute;top:100px"
         a2dShortCut
         (initialize)="initializeComponent($event)"
         [appId]="'mygreatapp'">i am a custom button</button>
  ```
  
  #### using "a2d-desktop-shortcut" component
  
  example:
  
  ```
   <a2d-desktop-shortcut
        [appId]="'myotherapp'"
        [x]="20"
        [y]="20"
        [width]="100"
        [height]="50"
        [color]="'transparent'"
        [title]="'some link'"></a2d-desktop-shortcut>
 ```
       
        
#### Via "A2dClientService" 

example:
  
      ```
     this.desktopService
             .createWindow<TestapplicationComponent>('mygreatapp',(component: TestapplicationComponent)=>{
               component.param1 = '2';
             })
             .then(windowId => {
               this.desktopService.openWindow(windowId);
             });
             
      ```
      
        
### Defining windows
 You might also want to specify windows directly in the markup.(see examples)
 
   ```
 <a2d-window
       [id]="'firefox'"
       [appId]="'firefox'"
       [title]="'firefox'"
       [state]="WindowState.NORMAL"
       [dockPosition]="DockPosition.LEFT"
       [x]="400"
       [y]="400"
       [showWindowBtns]="true"
       [alwaysOnTop]="false"
       [showCloseBtnOnly]="false"
       [showDockingTools]="true"
       [width]="400"
       [height]="400">
       <div class="body">
         <button>Some Btn</button>
       </div>
     </a2d-window>
   ```
 ### Desktop Areas
  
 Angular Desktop lets you specify areas in the desktop 
 as placeholders for your html code
 
 - Desktop area
  -- provide a div inside a2d-desktop with class "desktop"
 - bars
  -- provide a div inside a2d-desktop with class 
  "bar-left","bar-top","bar-right" or "bar-bottom"
  
  
  
 ##Full example:
   ```
  <a2d-desktop>
    <div class="desktop">
      <a2d-desktop-shortcut
        [appId]="'myotherapp'"
        [x]="20"
        [y]="20"
        [width]="100"
        [height]="50"
        [color]="'transparent'"
        [title]="'some link'"></a2d-desktop-shortcut>
      <a2d-desktop-shortcut
        [appId]="'mygreatapp'"
        [x]="200"
        [y]="20"
        [width]="50"
        [height]="50"
        [title]="'firefox'"
        [icon]="'/assets/images/icons/firefox.png'"></a2d-desktop-shortcut>
      <a2d-desktop-shortcut
        [appId]="'justAnotherApp'"
        [x]="400"
        [y]="20"
        [width]="50"
        [height]="50"
        [title]="'justAnotherApp'"></a2d-desktop-shortcut>
      <button
        type="button"
        style="position:absolute;top:100px"
        a2dShortCut
        (initialize)="initializeComponent($event)"
        [appId]="'mygreatapp'">i am a custom button</button>
  
      <button
        type="button"
        style="position:absolute;top:200px"
        a2dShortCut
        (initialize)="initializeComponent($event)"
        [linkId]="'some_link'"
        [windowTitle]="'testTitle'"
        [appId]="'justAnotherApp'">multiple instance app but shortcut attached to one window</button>
      <button
        type="button"
        style="position:absolute;top:250px"
        a2dShortCut
        (initialize)="initializeComponent($event)"
        [appId]="'justAnotherApp'">multiple instance app</button>
    </div>
    <div class="bar-top">
      <a2d-task-bar></a2d-task-bar>
    </div>
    <div class="bar-left">
  
      <a2d-shortcut [appId]="'mygreatapp'" [icon]="'/assets/images/icons/firefox.png'"></a2d-shortcut>
      <a2d-shortcut [appId]="'myotherapp'" [icon]="'/assets/images/icons/gmail.png'"></a2d-shortcut>
  
    </div>
  </a2d-desktop>

   
   ```
   

### Options

  - a2d-desktop
    
    - dockPosition: dock position of the window(when the window in docked state)
 
    ```
    export enum DockPosition {
      TOP_LEFT=1,
      TOP=2,
      TOP_RIGHT=3,
      BOTTOM_LEFT=4,
      BOTTOM=5,
      BOTTOM_RIGHT=6,
      LEFT=7,
      RIGHT=8
    }

    ```
    - x: pixels left from the window container
    - y: pixels top from the window container
    - width: width in pixels
    - height: height in pixels
    - alwaysOnTop: keep the window on top
    - showWindowBtns: hide/show the buttons in the header
    - showCloseBtnOnly
    - showDockingTools: turn on/off docking user interaction
    - showHeader: show/hide the window header
    
   - a2d-shortcut
     - windowId: the id of the window the shortcut is related to
     - icon: the url for the icon image


### Styling/Themes

example theme:

```
@import "variables";
@import "utils";

.angular2-desktop {
  background: url("/assets/images/ubuntu-wallpaper.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.window-header {
  background-color: theme-color('background');
  @include text-color();
}

.window-body {
  background-color: theme-color('primary');
  border-left: 2px solid theme-color('background');
  border-right: 2px solid theme-color('background');
  border-bottom: 1px solid theme-color('background');
}

.window-btn {
  background-image: linear-gradient(theme-color('background', 'light'), darken(theme-color('background', 'light'), 10%));
  border: 1px solid theme-color('background', 'dark');
  color: theme-color('background');
  &.danger {
    background-color: theme-color('accent');
  }
}

.bar-container {
  background-color: transparent ;
  color: theme-color('foreground');
}

.taskbar-entry {
  span {
    color: theme-color("foreground");
  }
  &.active {
    background-color: theme-color("accent");
  }
  &:hover {
    background-color: theme-color("background");
  }

}

.bar-dummy {
  background-color: black;
  opacity: 0.3;
}

.preview-rect {
  background-color: theme-color('background');
  opacity: 0.5;
}

.shortcut {
  .circle {
    background-color: theme-color('accent');
  }

  &:hover {
    background-color: theme-color('background');
    cursor: pointer;
  }

}
.desktop-shortcut {
  .fill {
  
    &:hover {
      background-color: black;
      opacity: 0.1;
      cursor: pointer;
    }
  }



}

```

### Next Steps

Resolve conflicts with bootstrap css
Define applications in markup instead of using the service
css style tweaks

