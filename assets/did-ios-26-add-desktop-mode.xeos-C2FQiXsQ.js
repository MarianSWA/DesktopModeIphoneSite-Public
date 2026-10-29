const e="/assets/desktop-ipados-SGdiwLj7.webp",t="/assets/desktop-working-iie8djOm.webp",n=`

  <figure>
    <img src="`+e+`" alt="A full desktop with windows and a dock on an external display, driven by an iPhone." loading="lazy" decoding="async">
    <figcaption>A desktop on an external display, without waiting for Apple.</figcaption>
  </figure>

  <h2 id="what-was-expected">What was expected</h2>

  <p>For a couple of years, reports pointed to a Stage Manager-style mode for USB-C iPhones on an external display: windows, using the whole screen, Apple's answer to Samsung DeX. It became one of the most searched-for iOS features.</p>

  <p>It never arrived. Unfinished code that could be coaxed into showing something like it was found in iOS 26.1, and that path was closed again in the iOS 26.2 betas. Unshipped code means someone was working on it. It doesn't mean you can use it.</p>

  <h2 id="what-each-device-does-today">What each device does today</h2>

  <div class="table-scroll">
    <table>
      <thead>
        <tr><th>Device</th><th>Connected to a monitor, out of the box</th></tr>
      </thead>
      <tbody>
        <tr><td>Any iPhone</td><td>Mirrors the phone. A few apps, like video players and Keynote, use the screen themselves.</td></tr>
        <tr><td>iPad without an M-series chip</td><td>Mirrors the iPad.</td></tr>
        <tr><td>iPad with an M-series chip</td><td>Stage Manager: an extended desktop with windows.</td></tr>
      </tbody>
    </table>
  </div>

  <p>So a desktop on an external display is something Apple keeps for its most expensive iPads. Every iPhone mirrors.</p>

  <h2 id="why-mirroring-makes-a-poor-desktop">Why mirroring makes a poor desktop</h2>

  <p>The iPhone screen is tall, about 19.5:9, and monitors are wide, 16:9. Mirroring copies the tall picture onto the wide panel and fills the gap with black, so a large part of the monitor goes unused. What's left is laid out for a phone in your hand, not a screen across the desk: one app at a time, touch only, a mobile browser.</p>

  <h2 id="getting-desktop-mode-now">Getting desktop mode now</h2>

  <p>Instead of waiting, you can run <strong>XeOS</strong>. It doesn't mirror the iPhone. It draws its own desktop for the external display, in landscape and at the display's resolution, and uses the phone as the trackpad. You get:</p>

  <ul>
    <li>Windows you can move, resize and stack, with a dock to switch between them.</li>
    <li>A desktop browser with tabs, bookmarks, saved passwords, downloads and a built-in ad blocker.</li>
    <li>Full-screen video at the display's resolution, without letterboxing.</li>
    <li>Files with iCloud Drive and USB drives, a PDF editor, and Word, Excel and PowerPoint preview.</li>
    <li>Websites installed as apps, each in its own window.</li>
    <li>A Bluetooth mouse and keyboard, the phone as a trackpad, or the iPhone as an Air Mouse.</li>
  </ul>

  <p>Because XeOS draws everything itself, it doesn't depend on Stage Manager or an M-series chip. Every iPhone that can output video gets it, and so does every iPad, including the ones Apple left out.</p>

  <figure>
    <img src="`+t+`" alt="Several windows open on an external display: a document, a browser and a file manager." loading="lazy" decoding="async">
    <figcaption>Several apps on screen at once, the way a desktop should work.</figcaption>
  </figure>

  <h2 id="what-to-know-first">What to know first</h2>

  <p>XeOS is a desktop environment, not iOS on a bigger screen. Your other iPhone apps don't run inside it, because iOS doesn't allow one app to host another. What runs is its own apps, the browser, and any website you install, which covers most of what people do at a computer.</p>

  <p>A few page elements, such as some sign-in boxes, payment fields and cookie banners, are built to resist input that doesn't come from the device's own screen. For those, one button hands the page to your iPhone for a single tap and brings it straight back.</p>

  <h2 id="will-apple-ship-it-later">Will Apple ship it later?</h2>

  <p>Perhaps. iOS 27 added Split View, but only on iPhone Duo and only on its own screens; an iPhone connected to a monitor still mirrors. Whatever Apple ships will probably be limited to recent USB-C hardware and to windows rather than a full desktop. If you have a monitor and an iPhone today, you don't have to wait. For what changed in the next release, see iOS 27 desktop mode.</p>

  <h2 id="questions-people-ask">Questions people ask</h2>

  <div class="faq">
    <h3>Is there a desktop mode in iOS 26?</h3>
    <p>No. Unfinished code turned up in iOS 26.1 and was closed off in the 26.2 betas. Nothing shipped.</p>

    <h3>Is there anything like Samsung DeX on iPhone?</h3>
    <p>Not from Apple. An app that draws its own desktop, like XeOS, is the way to get it. See <a href="/blog/samsung-dex-for-iphone">Samsung DeX for iPhone</a>.</p>

    <h3>Which iPads extend instead of mirroring?</h3>
    <p>Only iPads with an M-series chip, through Stage Manager. The others mirror, but they can run XeOS.</p>

    <h3>What do I need to connect?</h3>
    <p>A USB-C to HDMI cable for USB-C iPhones, the Lightning Digital AV Adapter for Lightning models, or AirPlay.</p>
  </div>

`,o=[{id:"what-was-expected",text:"What was expected"},{id:"what-each-device-does-today",text:"What each device does today"},{id:"why-mirroring-makes-a-poor-desktop",text:"Why mirroring makes a poor desktop"},{id:"getting-desktop-mode-now",text:"Getting desktop mode now"},{id:"what-to-know-first",text:"What to know first"},{id:"will-apple-ship-it-later",text:"Will Apple ship it later?"},{id:"questions-people-ask",text:"Questions people ask"}];export{n as html,o as toc};
