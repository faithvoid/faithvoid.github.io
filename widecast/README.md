## WideCast
A web solution for casting 4:3 (and similar) content in the correct resolution via Chromecasts.

## How it works:
- Select the video file on your PC or the enter video file URL (no data is uploaded, this works entirely via your built-in HTML5 media player), uploading subtitles if needed.
- Select the aspect ratio you'd like to use for the video (for 4:3 content on 4:3 displays, use "Stretch")
- Right click on the web page, select "Cast Tab", select your Chromecast, and you're set, it's that easy!
- To add more videos to your queue, just add another file via "Video" or "Video URL"!

### FAQ:
- "Does this work on (YouTube/Netflix/any streaming site)"
This only works for video files themselves, sorry! This is as good as it gets before ffmpeg transcoding gets involved. For sites that don't use a built-in app, try the "UltraWideo" extension and cast via tab in full-screen!
- "XYZ file format doesn't work!"
That's an HTML5 media player issue, I probably can't resolve it, sorry!
- "I can't switch tabs or fullscreen mode exits!"
This is a known issue, probably specific to Vivaldi? I've tried to incorporate a workaround, but for now, running the page in it's own window and then opening fullscreen video is easiest.

## TODO:
- "Clear Queue" button
