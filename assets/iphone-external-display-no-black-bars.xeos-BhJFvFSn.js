const e="/assets/youtube-fullscreen-tv-B9v4K5JI.webp",t="/assets/settings-display-BAhj0_gU.webp",n="/assets/desktop-light-CZUnB7tt.webp",o=`

  <figure>
    <img src="`+e+`" alt="A video playing full screen on a TV from an iPhone, filling the whole panel." loading="lazy" decoding="async">
    <figcaption>The same iPhone and cable, with the picture filling the TV.</figcaption>
  </figure>

  <h2 id="check-which-kind-of-black-bars-you-have">Check which kind of black bars you have</h2>

  <ul>
    <li><strong>Two wide bars, left and right, around a tall picture:</strong> that's iOS screen mirroring. It's the common case and the main subject of this article.</li>
    <li><strong>A thin black frame on all four sides:</strong> that's the TV cropping and padding the picture (overscan). It is a TV setting, covered further down.</li>
  </ul>

  <h2 id="wide-bars-mirroring-keeps-the-phone-s-shape">Wide bars: mirroring keeps the phone's shape</h2>

  <p>An iPhone screen is tall and narrow, roughly 19.5:9. Monitors and TVs are 16:9. Mirroring sends a copy of exactly what the phone shows, so iOS scales that tall picture up until it touches the top and bottom of the display and fills the rest with black. On a typical TV, close to half the screen goes unused.</p>

  <p>No cable, adapter or newer iPhone changes this. Rotating the phone helps a little in some apps, but you still get the phone's interface, one app at a time, only larger.</p>

  <h2 id="the-fix-give-the-display-its-own-desktop">The fix: give the display its own desktop</h2>

  <p>The bars go away when the external display stops receiving a copy of the phone and gets its own picture, drawn for its own shape. That's what <strong>XeOS</strong> does. With the display connected it renders a full desktop in landscape, at the resolution the monitor reports, edge to edge. The iPhone's screen turns into a trackpad, and the display gets windows, a dock, a browser and full-screen video.</p>

  <ol>
    <li>Connect the display: USB-C to HDMI on iPhone 15 and later, the Lightning Digital AV Adapter on iPhone 14 and earlier, or AirPlay.</li>
    <li>Open XeOS. It detects the display and takes it over.</li>
    <li>In Settings › Display, choose the resolution your display reports, usually 1920 × 1080 or 3840 × 2160.</li>
    <li>Adjust the content scale for your distance: around 100% at a desk, 130–150% from a sofa.</li>
  </ol>

  <figure>
    <img src="`+t+`" alt="XeOS display settings with resolution and content scale options." loading="lazy" decoding="async">
    <figcaption>Resolution sets the shape of the picture; content scale sets how big things look.</figcaption>
  </figure>

  <h2 id="thin-frame-on-a-tv-switch-off-overscan">Thin frame on a TV: switch off overscan</h2>

  <p>Many TVs crop the edges of the incoming picture by default, a habit left over from broadcast TV. You'll see it as a narrow black border all the way round even when the source is perfect. Open the TV's picture or aspect settings and look for an option named <em>Just Scan</em>, <em>Screen Fit</em>, <em>Full Pixel</em>, <em>1:1</em> or <em>Original</em>. Turn it on and the frame disappears.</p>

  <h2 id="full-screen-means-the-whole-screen">Full screen means the whole screen</h2>

  <p>Once the desktop fills the display, any window can go full screen too. Video, slides and documents then use every pixel, with no title bar, tabs or dock in the way. Move the pointer to the top edge to bring the controls back.</p>

  <figure>
    <img src="`+n+`" alt="The XeOS desktop in light appearance filling an external monitor." loading="lazy" decoding="async">
    <figcaption>A desktop drawn for the display, not a copy of the phone.</figcaption>
  </figure>

  <h2 id="questions-people-ask">Questions people ask</h2>

  <div class="faq">
    <h3>Do I need a newer iPhone or a different adapter?</h3>
    <p>No. Any iPhone that can send video to a display works, with the adapter you already have. The bars come from mirroring, not from the hardware.</p>

    <h3>Does it work over AirPlay?</h3>
    <p>Yes. Start AirPlay to the TV, then open XeOS and it uses that screen. A cable has less delay and charges the phone at the same time.</p>

    <h3>Why does one video still have bars?</h3>
    <p>If the video itself isn't 16:9, an old 4:3 clip for example, the player adds bars to keep its proportions. That's the video, not the display.</p>

    <h3>Do I have to set it up every time?</h3>
    <p>No. XeOS remembers the resolution for each display, so the next time you connect the same screen it fills it straight away.</p>
  </div>

`,i=[{id:"check-which-kind-of-black-bars-you-have",text:"Check which kind of black bars you have"},{id:"wide-bars-mirroring-keeps-the-phone-s-shape",text:"Wide bars: mirroring keeps the phone's shape"},{id:"the-fix-give-the-display-its-own-desktop",text:"The fix: give the display its own desktop"},{id:"thin-frame-on-a-tv-switch-off-overscan",text:"Thin frame on a TV: switch off overscan"},{id:"full-screen-means-the-whole-screen",text:"Full screen means the whole screen"},{id:"questions-people-ask",text:"Questions people ask"}];export{o as html,i as toc};
