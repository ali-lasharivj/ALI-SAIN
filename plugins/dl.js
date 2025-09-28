const { gmd, config, commands, fetchJson, getBuffer, AliconnApkDl } = require('../lib'), 
      { PREFIX: prefix } = config, 
      axios = require('axios'),
      fs = require('fs'),
      ffmpeg = require('fluent-ffmpeg'),
      Aliconn_DLS = require('Aliconn-dls'), 
      Aliconn = new Aliconn_DLS();
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
            caption: `> *${media.title} Downloaded Successfully ✅*\n> *© ᴘσωєʀє∂ ву ᴊᴀᴡᴀᴅ-ᴍᴅ⎯꯭̽🚩°*`
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
  pattern: "play2",
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

    // 3. Send audio file first
    await Aliconn.sendMessage(from, {
      audio: { url: res.data.result },
      mimetype: "audio/mpeg",
      ptt: false,
      contextInfo: { forwardingScore: 999, isForwarded: true }
    }, { quoted: mek });

    // 4. Then reply with success message
    await reply(`✅ *${video.title}* Downloaded Successfully!\n> *© ᴘσωєʀє∂ ву ᴊᴀᴡᴀᴅ-ᴍᴅ⎯꯭̽🚩°*`);

  } catch (e) {
    console.error("play command error:", e);
    reply("❌ Error while downloading audio.");
  }
});

gmd({
    pattern: "tiktok",
    alias: ["ttdl2", "tt", "tiktokdl2"],
    desc: "Download TikTok video without watermark",
    category: "downloader",
    react: "🎀",
    filename: __filename
},
async (Aliconn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("Please provide a TikTok video link.");
        if (!q.includes("tiktok.com")) return reply("Invalid TikTok link.");
        
      //  reply("Downloading video, please wait...");
        
        const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${q}`;
        const { data } = await axios.get(apiUrl);
        
        if (!data.status || !data.data) return reply("Failed to fetch TikTok video.");
        
        const { title, like, comment, share, author, meta } = data.data;
        const videoUrl = meta.media.find(v => v.type === "video").org;
        
        const caption = `> *© ᴘσωєʀє∂ ву αℓι м∂⎯꯭̽🚩°*`;
        
        await Aliconn.sendMessage(from, {
            video: { url: videoUrl },
            caption: caption,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: mek });
        
    } catch (e) {
        console.error("Error in TikTok downloader command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
          
gmd({
  pattern: "facebook",
  alias: ["fbdl", "fb"],
  react: '⏰',
  desc: "Download videos from Facebook.",
  category: "downloader",
  use: ".fbdl <Facebook video URL>",
  filename: __filename
}, async (Aliconn, mek, m, { from, reply, args }) => {
  try {
    // Check if the user provided a Facebook video URL
    const fbUrl = args[0];
    if (!fbUrl || !fbUrl.includes("facebook.com")) {
      return reply('*𝐏ℓєαʂє 𝐏ɼ๏νιɖє 𝐀 fb҇ 𝐕ιɖє๏ ๏ɼ ɼєєℓ 𝐔ɼℓ..*');
    }

    // Add a reaction to indicate processing
    await Aliconn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // Prepare the API URL
    const apiUrl = `https://apis.davidcyriltech.my.id/facebook2?url=${encodeURIComponent(fbUrl)}`;

    // Call the API using GET
    const response = await axios.get(apiUrl);

    // Check if the API response is valid
    if (!response.data || !response.data.status || !response.data.video) {
      return reply('❌ Unable to fetch the video. Please check the URL and try again.');
    }

    // Extract the video details
    const { title, thumbnail, downloads } = response.data.video;

    // Get the highest quality download link (HD or SD)
    const downloadLink = downloads.find(d => d.quality === "HD")?.downloadUrl || downloads[0].downloadUrl;

    // Inform the user that the video is being downloaded
   // await reply('```Downloading video... Please wait.📥```');

    // Download the video
    const videoResponse = await axios.get(downloadLink, { responseType: 'arraybuffer' });
    if (!videoResponse.data) {
      return reply('❌ Failed to download the video. Please try again later.');
    }

    // Prepare the video buffer
    const videoBuffer = Buffer.from(videoResponse.data, 'binary');

    // Send the video with details
    await Aliconn.sendMessage(from, {
      video: videoBuffer,
      caption: `*🎡 fв νι∂єσ ∂σωиℓσα∂є∂*\n> *© ᴘσωєʀє∂ ву αℓι м∂⎯꯭̽🐍*`,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: false,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363318387454868@newsletter',
          newsletterName: '『 𝐀ɭīī 𝐌Ɗ 𝐅𝐁 𝐃𝐋 』',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

    // Add a reaction to indicate success
    await Aliconn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error('Error downloading video:', error);
    reply('❌ Unable to download the video. Please try again later.');

    // Add a reaction to indicate failure
    await Aliconn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});


gmd({
    pattern: "gitclone",
    desc: "Clone/Download GitHub Repositories",
    category: "downloader",
    filename: __filename
},
async (Aliconn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) {
            return reply(`Please provide a GitHub repository URL, e.g.,\n${prefix}gitclone https://github.com/Mayelprince/PRINCE-MD`);
        }

        const gitlink = q.trim();
        if (!gitlink.includes('github.com')) {
            return reply(`Is that a valid GitHub repo link?!`);
        }

        // Improved regex to extract username and repository name
        let regex1 = /(?:https:\/\/|git@)github\.com[\/:]([^\/:]+)\/([^\/:\.]+)(?:\.git)?/i;
        let match = gitlink.match(regex1);

        if (!match) {
            return reply(`The provided URL does not appear to be a valid GitHub repository link.`);
        }

        let [, user3, repo] = match;

        // Construct the API URL for the zipball
        let url = `https://api.github.com/repos/${user3}/${repo}/zipball`;

        // Fetch the filename from the response headers
        let response = await fetch(url, { method: 'HEAD' });
        if (!response.ok) {
            return reply(`Failed to fetch repository details. Make sure the URL is correct and the repository is public.`);
        }

        let contentDisposition = response.headers.get('content-disposition');
        let filename = contentDisposition 
            ? contentDisposition.match(/attachment; filename=(.*)/)[1]
            : `${repo}.zip`;

        // Send the zip file
        await Aliconn.sendMessage(from, {
            document: { url: url },
            mimetype: "application/zip",
            fileName: filename
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});

 
gmd({
  pattern: "spotify",
  alias: ["spotifydl"],
  react: "🎶", 
  desc: "Download Songs from Spotify.",
  category: "downloader",
  filename: __filename
},
async (Aliconn, mek, m, { from, q, isOwner, reply }) => {
  try {
    if (!q) return reply(`Please provide a search term or a spotify audio URL!\nusage: ${prefix}spotify <search_term> or ${prefix}spotify <audio_url>`);
    if (q.startsWith("https://open.spotify.com")) {
      const downloadData = await Aliconn.spotifydl(q);
      if (!downloadData || !downloadData.success) {
        return reply("❌ Failed to fetch the download link. Please try again later.");
      }
      const buffer = await getBuffer(`${downloadData.download_url}`);
      const infoMess = {
            image: { url: downloadData.thumbnail },
            caption: `\`「 SPOTIFY DOWNLOADER 」\`
╭─────────────────⳹
│⏱️ *Duration:* ${downloadData.duration}
│🔑 *Quality:* 128kbps
│🎶 *Title:* ${downloadData.title}
╰─────────────────⳹
> ${global.footer}`,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 5,
                isForwarded: false,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363318387454868@newsletter',
          newsletterName: "𝐀𝐋𝐈-𝐌𝐃 𝐒𝐔𝐏𝐏𝐎𝐑𝐓¬💸",
                    serverMessageId: 143
                }
            }
        };
       await Aliconn.sendMessage(from, infoMess, { disappearingMessagesInChat: true, ephemeralExpiration: 100 }, { quoted: mek });
       await Aliconn.sendMessage(from, {
            document: buffer,
            fileName: `${downloadData.title}.mp3`,
            mimetype: 'audio/mpeg',
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    title: downloadData.title,
                    body: 'ᴘσωєʀє∂ ву αℓι м∂',
                    thumbnailUrl: downloadData.thumbnail,
                    sourceUrl: 'https://whatsapp.com/channel/0029VaoRxGmJpe8lgCqT1T2h',
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: mek });
      await m.react("✅");
    } else {
      const searchData = await Aliconn.spotifysearch(q);
if (!searchData || searchData.length === 0) {
  return reply("❌ No results found for the given search term.");
}
const audioUrl = searchData[0].url; 
if (!audioUrl) {
  return reply("❌ No valid video link found.");
}
      const downloadData = await Aliconn.spotifydl(audioUrl);
      if (!downloadData || !downloadData.success) {
        return reply("❌ Failed to fetch the download link. Please try again later.");
      }
       const buffer = await getBuffer(`${downloadData.download_url}`);
       const infoMess = {
            image: { url: downloadData.thumbnail },
            caption: `\`「 SPOTIFY DOWNLOADER 」\`
╭─────────────────⳹
│⏱️ *Duration:* ${downloadData.duration}
│🔑 *Quality:* 128kbps
│🎶 *Title:* ${downloadData.title}
╰─────────────────⳹
> ${global.footer}`,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 5,
                isForwarded: false,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363318387454868@newsletter',
          newsletterName: "𝐀𝐋𝐈-𝐌𝐃 𝐒𝐔𝐏𝐏𝐎𝐑𝐓¬💸",
                    serverMessageId: 143
                }
            }
        };
       await Aliconn.sendMessage(from, infoMess, { disappearingMessagesInChat: true, ephemeralExpiration: 100 }, { quoted: mek });
       await Aliconn.sendMessage(from, {
            document: buffer,
            fileName: `${downloadData.title}.mp3`,
            mimetype: 'audio/mpeg',
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    title: downloadData.title,
                    body: 'ᴘσωєʀє∂ ву αℓι м∂',
                    thumbnailUrl: downloadData.thumbnail,
                    sourceUrl: 'https://whatsapp.com/channel/0029VaoRxGmJpe8lgCqT1T2h',
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: mek });
      await m.react("✅");
    }
  } catch (e) {
    console.error("Error occurred:", e);
    reply("❌ An error occurred while processing your request. Please try again later.");
  }
});

gmd({
  pattern: "apk",
  alias: ["modapk", "app"],
  react: '📦',
  desc: "Download APK files using NexOracle API.",
  category: "downloader",
  use: ".apk <app name>",
  filename: __filename
}, async (Aliconn, mek, m, { from, reply, args }) => {
  try {
    // Check if the user provided an app name
    const appName = args.join(" ");
    if (!appName) {
      return reply('*🏷️ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀɴ ᴀᴘᴘ ɴᴀᴍᴇ ᴛᴏ sᴇᴀʀᴄʜ.*');
    }

    // Add a reaction to indicate processing
    await Aliconn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // Prepare the NexOracle API URL
    const apiUrl = `https://api.nexoracle.com/downloader/apk`;
    const params = {
      apikey: 'free_key@maher_apis', // Replace with your API key if needed
      q: appName, // App name to search for
    };

    // Call the NexOracle API using GET
    const response = await axios.get(apiUrl, { params });

    // Check if the API response is valid
    if (!response.data || response.data.status !== 200 || !response.data.result) {
      return reply('❌ Unable to find the APK. Please try again later.');
    }

    // Extract the APK details
    const { name, lastup, package, size, icon, dllink } = response.data.result;

    // Send a message with the app thumbnail and "Downloading..." text
    await Aliconn.sendMessage(from, {
      image: { url: icon }, // App icon as thumbnail
      caption: `*『𝐀𝐋𝐈-𝐌𝐃 𝐀𝐏𝐊 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃』*\n*╭──────────────────✑*\n‎*┋ 🔖 ɴαмє: ${name}*\n*┋ 📅 ℓαѕт υρ∂αтє∂: ${lastup}*\n*┋ 📦 ρα¢кαgє: ${package}*\n‎*┋ 📏 ѕιzє: ${size}*\n‎*╰──────────────────✑*\n> *⏳ ρℓєαѕє ωαιт α мσмєɴт ωнιℓє уσυʀ αρк ιѕ вєιɴg ѕєит...*`,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363318387454868@newsletter',
          newsletterName: '𝐀ɭīī 𝐌Ɗ 𝐒ʊ̊𝐏𝐏๏፝֟ɼʈ⎯꯭̽💀🚩',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

    // Download the APK file
    const apkResponse = await axios.get(dllink, { responseType: 'arraybuffer' });
    if (!apkResponse.data) {
      return reply('❌ Failed to download the APK. Please try again later.');
    }

    // Prepare the APK file buffer
    const apkBuffer = Buffer.from(apkResponse.data, 'binary');

    // Prepare the message with APK details
    const message = `> *© ᴘσωєʀє∂ ву αℓι м∂⎯꯭̽🐍*`;
     

    // Send the APK file as a document
    await Aliconn.sendMessage(from, {
      document: apkBuffer,
      mimetype: 'application/vnd.android.package-archive',
      fileName: `${name}.apk`,
      caption: message,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: false,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363318387454868@newsletter',
          newsletterName: '𝐀ɭīī 𝐌Ɗ 𝐒ʊ̊𝐏𝐏๏፝֟ɼʈ⎯꯭̽💀🚩',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

    // Add a reaction to indicate success
    await Aliconn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error('Error fetching APK details:', error);
    reply('❌ Unable to fetch APK details. Please try again later.');

    // Add a reaction to indicate failure
    await Aliconn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});

gmd({
    pattern: "twitter",
    alias: ["twdl", "x", "xdl", "twitterdl"],
    desc: "Download Twitter Videos",
    category: "downloader",
    react: "⬇️",
    filename: __filename
},
async (Aliconn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) {
            return reply("Please provide a valid Twitter URL.");
        }
        const data = await Aliconn.twitter(q);
        const audioUrl = data.result.audio; 
        const sdVideoUrl = data.result.sd_video;
        const hdVideoUrl = data.result.hd_video;
        const audioBuffer = await getBuffer(audioUrl);
        const sdVideoBuffer = await getBuffer(sdVideoUrl);
        const hdVideoBuffer = await getBuffer(hdVideoUrl);
        const infoMess = {
          image: { url: tikTokData.result.thumbnail || config.BOT_PIC },
          caption: `\`「 TWITTER DOWNLOADER 」\`

*ʀᴇᴘʟʏ ᴡɪᴛʜ:*

*𝟷 ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ ᴀᴜᴅɪᴏ 🎶*
*𝟸 ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ sᴅ ᴠɪᴅᴇᴏ 🎥*
*𝟹 ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ ʜᴅ ᴠɪᴅᴇᴏ 🎥*

╭─────────────────⳹
│ ${global.footer}
╰─────────────────⳹`,
          contextInfo: {
              mentionedJid: [m.sender],
              forwardingScore: 5,
              isForwarded: false,
              forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363318387454868@newsletter',
          newsletterName: "𝐀𝐋𝐈-𝐌𝐃 𝐒𝐔𝐏𝐏𝐎𝐑𝐓¬💸",
                  serverMessageId: 143
              }
          }
      };

      const messageSent = await Aliconn.sendMessage(from, infoMess, { quoted: mek });
      const messageId = messageSent.key.id;
      Aliconn.ev.on("messages.upsert", async (event) => {
          const messageData = event.messages[0];
          if (!messageData.message) return;
          const messageContent = messageData.message.conversation || messageData.message.extendedTextMessage?.text;
          const isReplyToDownloadPrompt = messageData.message.extendedTextMessage?.contextInfo?.stanzaId === messageId;

          if (isReplyToDownloadPrompt) {
              await m.react("⬇️");
              switch (messageContent) {
                  case "1": 
                      await Aliconn.sendMessage(from, {
                          audio: audioBuffer,
                          mimetype: "audio/mpeg"
                      }, { quoted: messageData });
                      break;

                      case "2": 
                      await Aliconn.sendMessage(from, {
                          video: sdVideoBuffer,
                          mimetype: "video/mp4"
                      }, { quoted: messageData });
                      break;

                      case "3": 
                      await Aliconn.sendMessage(from, {
                          video: hdVideoBuffer,
                          mimetype: "video/mp4"
                      }, { quoted: messageData });
                      break;

                  default:
                await Aliconn.sendMessage(from, { text: "Invalid option selected. Please reply with a valid number (1, 2 or 3)." });
              }
          }
      });
    } catch (e) {
        console.error("Error in Twitter download command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});


gmd({
    pattern: "gdrive",
    alias: ["googledrive", "gdrivedl"],
    desc: "download Gdrive Files",
    category: "downloader",
    react: "⬇️",
    filename: __filename
},
async(Aliconn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("Provide me gdrive url")
        let data = await Aliconn.googledrive(q);
        const buffer = await getBuffer(`${data.result.download_url}`);
const { fileTypeFromBuffer } = await import('file-type');

// Default MIME type and extension (fallback if detection fails)
let mimeType = 'application/octet-stream'; // Fallback MIME type
let ext = 'bin'; // Fallback extension

try {
    const detectedType = await fileTypeFromBuffer(buffer);
    if (detectedType) {
        mimeType = detectedType.mime;
        ext = detectedType.ext;
    }
} catch (error) {
    console.error('Failed to detect file type:', error);
}
const fileName = data.result.name.includes('.') 
    ? data.result.name 
    : `${data.result.name}.${ext}`;

await Aliconn.sendMessage(
    from, 
    { 
        document: buffer, 
        fileName: fileName, 
        mimetype: mimeType, 
        caption: `> ${global.footer}` 
    }, 
    { quoted: mek }
);
        await m.react("✅"); 
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
});

gmd({
    pattern: "insta",
    alias: ["igdl", "ig", "instadl", "instagram"],
    desc: "Download Instagram Videos",
    category: "downloader",
    react: "⬇️",
    filename: __filename
},
async (Aliconn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) {
            return reply("🔗 *Please provide a valid Instagram URL.*");
        }

        // Call your custom API
        const apiUrl = `${global.api}/download/instadl?apikey=${global.myName}&url=${encodeURIComponent(q)}`;
        const res = await fetchJson(apiUrl);

        if (!res.result?.download_url) {
            return reply("⚠️ Failed to fetch Instagram media. Please check the link or try again.");
        }

        const videoBuffer = await getBuffer(res.result.download_url);

        await Aliconn.sendMessage(from, {
            video: videoBuffer,
            mimetype: "video/mp4",
            caption: `*🪸 ιɴѕтαgʀαм ∂σωиℓσα∂є∂*\n` +
        `> *© ᴘσωєʀє∂ ву αℓι м∂⎯꯭̽🐍*`,
        }, { quoted: mek });

        await m.react("✅");

    } catch (e) {
        console.error("❌ Instagram Download Error:", e);
        reply("⚠️ An error occurred while processing your request. Try again later.");
    }
});


gmd({
    pattern: "mediafire",
    alias: ["mfire", "mediafiredl", "mfiredl"],
    desc: "Download Mediafire Files",
    category: "downloader",
    react: "⬇️",
    filename: __filename
},
async (Aliconn, mek, m, {
    from, q, reply
}) => {
    try {
        if (!q || !q.startsWith("https://")) {
            return reply("📎 Please provide a valid Mediafire URL.");
        }

        const apiUrl = `${global.api}/download/mediafire?apikey=${global.myName}&url=${encodeURIComponent(q)}`;
        const res = await fetchJson(apiUrl);

        if (!res.result || !res.result.downloadUrl) {
            return reply("⚠️ Failed to retrieve download link. Please check the URL.");
        }

        const fileBuffer = await getBuffer(res.result.downloadUrl);

        await Aliconn.sendMessage(from, {
            document: fileBuffer,
            mimetype: res.result.mimeType || 'application/octet-stream',
            fileName: res.result.fileName || 'downloaded_file',
            caption: `📁 *${res.result.fileName}*\n\n📦 Size: ${res.result.fileSize}\n🗓️ Uploaded: ${res.result.uploadedOn}\n🌍 From: ${res.result.uploadedFrom}\n\n> ${global.footer || "AliTech"}`
        }, { quoted: mek });

        await m.react("✅");

    } catch (e) {
        console.error("❌ Mediafire Download Error:", e);
        reply("⚠️ Error downloading file. Please try again later.");
    }
});

gmd({
  pattern: "song",
  alias: ["music", "ytmp3", "ytmp3doc", "play", "audio"],
  desc: "Download Youtube Songs(mp3)",
  category: "downloader",
  react: "🎶",
  filename: __filename
}, 
async (Aliconn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
      if (!q) {
          return reply(`Please enter a search query or YouTube link. Usage example:
*${prefix}play Spectre*
*${prefix}play https://youtu.be/aGjXa18XCRY?si=-rNZHD-trThO1x4Y*`);
      }

      let downloadUrl;
      let dataa;
      let buffer;

      // React with download indicator
      await m.react("⬇️");

      // Enhanced getBuffer function with better headers and error handling
      const getBufferWithHeaders = async (url) => {
          try {
              const response = await axios({
                  method: 'GET',
                  url: url,
                  responseType: 'arraybuffer',
                  timeout: 60000, // 60 seconds timeout
                  headers: {
                      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                      'Accept': '*/*',
                      'Accept-Language': 'en-US,en;q=0.9',
                      'Accept-Encoding': 'gzip, deflate, br',
                      'Connection': 'keep-alive',
                      'Upgrade-Insecure-Requests': '1',
                      'Sec-Fetch-Dest': 'audio',
                      'Sec-Fetch-Mode': 'cors',
                      'Sec-Fetch-Site': 'cross-site',
                      'Referer': 'https://www.youtube.com/'
                  }
              });
              return Buffer.from(response.data);
          } catch (error) {
              console.error(`Failed to fetch buffer from ${url}:`, error.message);
              throw error;
          }
      };

      if (q.startsWith("https://youtu")) {
          // Get video info first
          try {
              const searchs = await fetchJson(`${global.api}/search/yts?apikey=${global.myName}&query=${encodeURIComponent(q)}`);
              dataa = searchs.results[0];
          } catch (err) {
              console.error("Failed to get video info:", err);
              return reply("❌ Unable to fetch video information. Please try again later.");
          }

          // Try multiple download endpoints
          const downloadMethods = [
              () => fetchJson(`${global.api}/download/yta?apikey=${global.myName}&url=${encodeURIComponent(q)}`),
              () => fetchJson(`${global.api}/download/ytmp3?apikey=${global.myName}&url=${encodeURIComponent(q)}`),
              () => fetchJson(`${global.api}/download/ytmusic?apikey=${global.myName}&url=${encodeURIComponent(q)}`)
          ];

          let downloadSuccess = false;
          for (const method of downloadMethods) {
              try {
                  const down = await method();
                  downloadUrl = down.result.download_url;
                  
                  // Try to get buffer with enhanced headers
                  try {
                      buffer = await getBufferWithHeaders(downloadUrl);
                      downloadSuccess = true;
                      break;
                  } catch (bufferErr) {
                      console.error("Buffer fetch failed, trying fallback:", bufferErr.message);
                      // Try original getBuffer as fallback
                      try {
                          buffer = await getBuffer(downloadUrl);
                          downloadSuccess = true;
                          break;
                      } catch (fallbackErr) {
                          console.error("Fallback buffer fetch also failed:", fallbackErr.message);
                          continue;
                      }
                  }
              } catch (err) {
                  console.error("Download method failed:", err.message);
                  continue;
              }
          }

          if (!downloadSuccess) {
              return reply("❌ All download methods failed. The video might be restricted or temporarily unavailable.");
          }
          
          // Send audio directly with song details
          await Aliconn.sendMessage(from, {
              audio: buffer,
              mimetype: "audio/mpeg",
              contextInfo: {
                  externalAdReply: {
                      title: dataa.title,
                      body: 'ᴘσωєʀє∂ ву αℓι м∂',
                      mediaType: 1,
                      sourceUrl: 'https://youtube.com',
                      thumbnailUrl: dataa.thumbnail
                  }
              }
          }, { quoted: mek });
          
          await m.react("✅");
          return;
      }

      // For search queries
      const search = await yts(q);
      if (!search.videos || search.videos.length === 0) {
          return reply("❌ No results found for your search query.");
      }
      
      const datas = search.videos[0];
      const videoUrl = datas.url;

      // Try multiple download endpoints for search results
      const downloadMethods = [
          () => fetchJson(`${global.api}/download/yta?apikey=${global.myName}&url=${encodeURIComponent(videoUrl)}`),
          () => fetchJson(`${global.api}/download/ytmp3?apikey=${global.myName}&url=${encodeURIComponent(videoUrl)}`),
          () => fetchJson(`${global.api}/download/ytmusic?apikey=${global.myName}&url=${encodeURIComponent(videoUrl)}`)
      ];

      let downloadSuccess = false;
      for (const method of downloadMethods) {
          try {
              const down = await method();
              downloadUrl = down.result.download_url;
              
              // Try to get buffer with enhanced headers
              try {
                  buffer = await getBufferWithHeaders(downloadUrl);
                  downloadSuccess = true;
                  break;
              } catch (bufferErr) {
                  console.error("Buffer fetch failed, trying fallback:", bufferErr.message);
                  // Try original getBuffer as fallback
                  try {
                      buffer = await getBuffer(downloadUrl);
                      downloadSuccess = true;
                      break;
                  } catch (fallbackErr) {
                      console.error("Fallback buffer fetch also failed:", fallbackErr.message);
                      continue;
                  }
              }
          } catch (err) {
              console.error("Download method failed:", err.message);
              continue;
          }
      }

      if (!downloadSuccess) {
          return reply("❌ All download methods failed. The video might be restricted or temporarily unavailable.");
      }
      
      // Send audio directly with song details
      await Aliconn.sendMessage(from, {
          audio: buffer,
          mimetype: "audio/mpeg",
          contextInfo: {
              externalAdReply: {
                  title: `${datas.title}`,
                  body: 'ᴘσωєʀє∂ ву αℓι м∂',
                  mediaType: 1,
                  sourceUrl: 'https://youtube.com',
                  thumbnailUrl: datas.thumbnail
              }
          }
      }, { quoted: mek });
      
      await m.react("✅");

  } catch (err) {
      console.error("Main Error:", err);
      reply(`❌ Error: ${err.message || 'Unknown error occurred'}`);
      await m.react("❌");
  }
});


gmd({
  pattern: "ytv",
  desc: "Download Youtube Videos.",
  category: "downloader",
  react: "📽",
  filename: __filename
}, async (Aliconn, mek, m, { from, isOwner, q, reply }) => {
  try {
      if (!q) return reply("Please provide a YouTube URL!");
      if (q.startsWith("https://youtu")) {
          return reply("Please provide a YouTube URL!");
      }
      const searchs = await fetchJson(`${global.api}/search/yts?apikey=${global.myName}&query=${encodeURIComponent(q)}`);
      dataa = searchs.results[0];

      const infoMess = {
          image: { url: dataa.thumbnail || config.BOT_PIC },
          caption: `\`「 VIDEO DOWNLOADER 」\`
╭─────────────────⳹
│🎬 *ᴛɪᴛʟᴇ:* ${datas.title}
│🎐 *ᴜᴘʟᴏᴀᴅᴇᴅ:* ${datas.ago}
│⏳ *ᴅᴜʀᴀᴛɪᴏɴ:* ${datas.timestamp}
│👀 *ᴠɪᴇᴡs:* ${datas.views}
│🎙 *ᴀʀᴛɪsᴛ:* ${datas.author.name}
╰─────────────────⳹

*ʀᴇᴘʟʏ ᴡɪᴛʜ:*

*𝟷. ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ 𝟹𝟼𝟶ᴘ*
*𝟸. ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ 𝟽𝟸𝟶ᴘ*
*𝟹. ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ 𝟷𝟶𝟾𝟶ᴘ*

╭─────────────────⳹
│ ${global.footer}
╰─────────────────⳹`,
          contextInfo: {
              mentionedJid: [m.sender],
              forwardingScore: 5,
              isForwarded: false,
              forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363318387454868@newsletter',
          newsletterName: "𝐀𝐋𝐈-𝐌𝐃 𝐒𝐔𝐏𝐏𝐎𝐑𝐓¬💸",
                  serverMessageId: 143
              }
          }
      };

      const messageSent = await Aliconn.sendMessage(from, infoMess);
      const messageId = messageSent.key.id;
      Aliconn.ev.on("messages.upsert", async (event) => {
          const messageData = event.messages[0];
          if (!messageData.message) return;
          const messageContent = messageData.message.conversation || messageData.message.extendedTextMessage?.text;
          const isReplyToDownloadPrompt = messageData.message.extendedTextMessage?.contextInfo?.stanzaId === messageId;

          if (isReplyToDownloadPrompt) {
              await m.react("⬇️");
              switch (messageContent) {
                  case "1": 
                      const down1 = await Aliconn.ytmp4(q, 360);
                      const downloadUrl1 = down1.result.download_url;
                      const buffer1 = await getBuffer(downloadUrl1);
                      await Aliconn.sendMessage(from, {
                          audio: buffer1,
                          mimetype: "video/mp4",
                          contextInfo: {
                              externalAdReply: {
                                  title: datas.title,
                                  body: 'ᴘσωєʀє∂ ву αℓι м∂',
                                  mediaType: 1,
                                  sourceUrl: 'https://whatsapp.com/channel/0029VaoRxGmJpe8lgCqT1T2h',
                                  thumbnailUrl: datas.thumbnail,
                              }
                          }
                      }, { quoted: messageData });
                      await m.react("✅");
                      break;

                      case "2": 
                      const down2 = await Aliconn.ytmp4(q, 720);
                      const downloadUrl2 = down2.result.download_url;
                      const buffer2 = await getBuffer(downloadUrl2);
                      await Aliconn.sendMessage(from, {
                          audio: buffer2,
                          mimetype: "video/mp4",
                          contextInfo: {
                              externalAdReply: {
                                  title: datas.title,
                                  body: 'ᴘσωєʀє∂ ву αℓι м∂',
                                  mediaType: 1,
                                  sourceUrl: 'https://whatsapp.com/channel/0029VaoRxGmJpe8lgCqT1T2h',
                                  thumbnailUrl: datas.thumbnail,
                              }
                          }
                      }, { quoted: messageData });
                      await m.react("✅");
                      break;

                      case "3": 
                      const down3 = await Aliconn.ytv(q, 1080);
                      const downloadUrl3 = down3.result.download_url;
                      const buffer3 = await getBuffer(downloadUrl3);
                      await Aliconn.sendMessage(from, {
                          audio: buffer3,
                          mimetype: "audio/mpeg",
                          contextInfo: {
                              externalAdReply: {
                                  title: datas.title,
                                  body: 'ᴘσωєʀє∂ ву αℓι м∂',
                                  mediaType: 1,
                                  sourceUrl: 'https://whatsapp.com/channel/0029VaoRxGmJpe8lgCqT1T2h',
                                  thumbnailUrl: datas.thumbnail,
                              }
                          }
                      }, { quoted: messageData });
                      await m.react("✅");
                      break;

                  default:
                await Aliconn.sendMessage(from, { text: "Invalid option selected. Please reply with a valid number (1 or 2)." });
              }
          }
      });
  } catch (err) {
      console.error("Error:", err);
      reply(`❌ Error: ${err.message}`);
  }
});


