# Angular2Desktop

!documentation is work in progress!

The library is built on angular 6, tested with latest chrome and firefox versions.
It emulates a desktop environment.

[demo](http://groovybytes.at:9000/)



example usage:
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


it depends on interactjs, lodash, jquery and font-awesome



