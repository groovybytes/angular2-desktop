# Angular2Desktop

The library is built on angular 6, tested with latest chrome and firefox versions.
It emulates a desktop environment.

[demo](http://groovybytes.at:9000/)

## Requirements

angular6+, jquery, lodash, interactjs,font awesome

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v0.10.24

    $ npm --version
    1.3.21


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


 Optionally you can add 
  ```
  public DockPosition=DockPosition;
  public WindowState=WindowState;
   ```
   in your app.component to work with the provided Enums.
   
 example:
   ```
   <a2d-desktop>
     <div class="windows">
       <a2d-window
         [id]="'chrome'"
         [title]="'google chrome'"
         [state]="WindowState.NORMAL"
         [dockPosition]="DockPosition.LEFT"
         [x]="50"
         [y]="50"
         [width]="400"
         [height]="400">
         <div class="header">header</div>
         <div class="body">
   
           test
         </div>
       </a2d-window>
       <a2d-window
         [id]="'firefox'"
         [title]="'firefox'"
         [state]="WindowState.NORMAL"
         [dockPosition]="DockPosition.LEFT"
         [x]="400"
         [y]="400"
         [width]="400"
         [height]="400">
         <div class="body">
           <button>Some Btn</button>
         </div>
       </a2d-window>
       <a2d-window
         [id]="'gmail'"
         [title]="'google mail'"
         [state]="WindowState.NORMAL"
         [dockPosition]="DockPosition.LEFT"
         [x]="200"
         [y]="200"
         [width]="400"
         [height]="400">
         <div class="body">
           <button>Some Btn</button>
         </div>
       </a2d-window>
     </div>
     <div class="shortcuts">
       <a2d-shortcut [windowId]="'chrome'" [icon]="'/assets/images/icons/chrome.png'"></a2d-shortcut>
       <a2d-shortcut [windowId]="'firefox'" [icon]="'/assets/images/icons/firefox.png'"></a2d-shortcut>
       <a2d-shortcut [windowId]="'gmail'" [icon]="'/assets/images/icons/gmail.png'"></a2d-shortcut>
     </div>
   
   </a2d-desktop>
   
   ```
   
   inside the window tag you can define the header by using
    ```<div class="header">some header</div> ```

### Options

  - a2d-desktop
    - showTopBar: hide/show top bar
    - showLeftBar: hide/show left bar

  - a2d-window
    - id: identifier, must match shortcut id(if provided)
    - state: the state of the window
    ```
    export enum WindowState {
      CLOSED = 0,
      NORMAL = 1,
      MINIMIZED = 2,
      MAXIMIZED = 3,
      DOCKED=4
    }
    ```
    
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

documentation for styling is coming soon. 
