const { google } = require('googleapis');
const cron = require('node-cron');
const sgMail = require('@sendgrid/mail');

const Youtube = (receiverEmail, playlistIds) => {
    let latestVideoId = '';

    async function checkNewVideoInPlaylist() {
        console.log('Checking for new videos in the playlist...');
        try {
            const apiKey = 'AIzaSyAgJ2VQ4-BLICIh3VHrFTX76ngqJLpSSA4';

            const youtube = google.youtube({
                version: 'v3',
                auth: apiKey,
            });

            const { data } = await youtube.playlistItems.list({
                part: 'snippet',
                playlistId: playlistIds,
                maxResults: 1,
            });

            const latestVideo = data.items[0].snippet;
            // console.log(data.items[0].snippet);
            if (latestVideo.title !== latestVideoId) {
                latestVideoId = latestVideo.title;
                console.log('New video added to the playlist:', latestVideo.title);

                // send email notification
                sgMail.setApiKey('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');
                const msg = {
                    to: receiverEmail,
                    from: 'hugog11@hotmail.fr',
                    subject: 'New video added to the playlist',
                    html: `<p>A new video titled "${latestVideo.title}" has been added to the playlist.</p>`,
                };
                sgMail.send(msg);
            } else {
                console.log('No new video added to the playlist');
            }
        } catch (error) {
            console.log('Error checking for new video:', error);
        }
    }

    // run checkNewVideoInPlaylist every minute
    cron.schedule('* * * * *', checkNewVideoInPlaylist);
};

module.exports = Youtube;
