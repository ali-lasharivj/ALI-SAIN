const { gmd, config, commands, fetchJson, getBuffer, GiftedApkDl } = require('../lib'), 
      { PREFIX: prefix } = config, 
      axios = require('axios'),
      fs = require('fs'),
      ffmpeg = require('fluent-ffmpeg'),
      GIFTED_DLS = require('gifted-dls'), 
      gifted = new GIFTED_DLS();
      yts = require('yt-search');
  
gmd({
    pattern: "video",
    alias: ["ytmp4", "ytv"],
    desc: "Download YouTube videos",
    category: "download",
    react: "📹",
    filename: __filename
}, async (Aliconn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("📺 Please provide video name or URL!\n\nExample: .video funny cat");

        // Search on YouTube if query is not a link
        let url = q;
        if (!q.includes("youtube.com") && !q.includes("youtu.be")) {
            const { videos } = await yts(q);
            if (!videos || videos.length === 0) return reply("❌ No results found!");
            url = videos[0].url;
        }

        const api = `https://gtech-api-xtp1.onrender.com/api/video/yt?apikey=APIKEY&url=${encodeURIComponent(url)}`;
        const res = await axios.get(api);
        const json = res.data;

        if (!json?.status || !json?.result?.media) {
            return reply("❌ Download failed! Try again later.");
        }

        const media = json.result.media;
        const videoUrl = media.video_url_hd !== "No HD video URL available"
            ? media.video_url_hd
            : media.video_url_sd !== "No SD video URL available"
                ? media.video_url_sd
                : null;

        if (!videoUrl) return reply("❌ No downloadable video found!");

        // Send video
        await Aliconn.sendMessage(from, {
            video: { url: videoUrl },
            caption: `> *${media.title} Downloaded Successfully ✅*\n> *© ᴘσωєʀє∂ ву ALI-MD⎯꯭̽🚩°*`
        }, { quoted: mek });

        // Success reaction
        await Aliconn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.error("Error in video command:", e);
        reply("❌ Error occurred, try again later!");
        await Aliconn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

gmd({
  pattern: "play",
  alias: ["song", "music"],   
  desc: "Download YouTube audio by title",
  category: "download",
  react: "🎵",
  filename: __filename
}, async (Aliconn, mek, m, { from, args, q, reply }) => {
  try {
    if (!q) return reply("❌ Please give me a song name.");

    // 1. Search video on YouTube
    let search = await yts(q);
    let video = search.videos[0];
    if (!video) return reply("❌ No results found.");

    // 2. Call your API with video URL
    let apiUrl = `https://jawad-tech.vercel.app/download/yt?url=${encodeURIComponent(video.url)}`;
    let res = await axios.get(apiUrl);

    if (!res.data.status) {
      return reply("❌ Failed to fetch audio. Try again later.");
    }

    // 3. Send audio file with externalAdReply (YT-SEARCH INFO)
    await Aliconn.sendMessage(from, {
      audio: { url: res.data.result },
      mimetype: "audio/mpeg",
      ptt: false,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: video.title,
          body: `👤 ${video.author.name} | ⏱ ${video.timestamp} | 👁 ${video.views}`,
          thumbnailUrl: video.thumbnail,
          sourceUrl: video.url,
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true
        }
      }
    }, { quoted: mek });

  } catch (e) {
    console.error("play command error:", e);
    reply("❌ Error while downloading audio.");
  }
});
