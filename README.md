# Angular2Desktop

The library is built on angular 6, tested with latest chrome and firefox versions.
It emulates a desktop environment.

[demo](http://groovybytes.at:9000/)

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


 Optionally you can add 
  ```
  public DockPosition=DockPosition;
  public WindowState=WindowState;
   ```
   in your app.component to work with the provided Enums.
   
   use <div class="bar-left"> to add a left bar or "bar-right","bar-bottom","bar-top"
   
 example:
   ```
  <a2d-desktop>
    <div class="windows">
      <a2d-window
        [id]="'chrome'"
        [title]="'google chrome'"
        [state]="WindowState.NORMAL"
        [x]="50"
        [y]="50"
        [width]="400"
        [height]="400">
        <div class="header">
          Google Chrome
        </div>
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
        [alwaysOnTop]="true"
        [showCloseBtnOnly]="false"
        [showDockingTools]="true"
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
        [showWindowBtns]="false"
        [x]="200"
        [y]="200"
        [width]="400"
        [height]="400">
        <div class="body">
          <button>Some Btn</button>
        </div>
      </a2d-window>
    </div>
    <div class="bar-top">
      <a2d-task-bar></a2d-task-bar>
    </div>
    <div class="bar-left">
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

example theme:

```

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

.bar-top-container {

}

.bar-left-container {

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

```

### Next Steps

Resolve conflicts with bootstrap css

