// public/index.js
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");


const peer = new SimplePeer({
  initiator: location.hash === "#init",
  trickle: false,
});

navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    localVideo.srcObject = stream;
    peer.addStream(stream);

    peer.on("signal", (data) => {
      const signalingData = JSON.stringify(data);
      // Send the signalingData to the server for negotiation
      // (implement this part in your backend)
    });

    peer.on("stream", (remoteStream) => {
      remoteVideo.srcObject = remoteStream;
    });

    // Add the received signalingData from the server for negotiation
    // (implement this part in your backend)
  })
  .catch((err) => {
    console.error("Error accessing media devices:", err);
  });
