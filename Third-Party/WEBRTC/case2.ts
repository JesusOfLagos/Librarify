// public/index.js

// ... (previous code)

let socket;

async function init() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;

    // Connect to the signaling server using WebSocket
    socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
      console.log("Connected to signaling server");
    };

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "offer") {
        // Handle incoming offer from remote peer
        peerConnection = await createPeerConnection();
        await peerConnection.setRemoteDescription(new RTCSessionDescription(message));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        // Send the answer to the remote peer
        socket.send(JSON.stringify(answer));
      } else if (message.type === "answer") {
        // Handle incoming answer from remote peer
        await peerConnection.setRemoteDescription(new RTCSessionDescription(message));
      } else if (message.type === "candidate") {
        // Handle incoming ICE candidate from remote peer
        try {
          await peerConnection.addIceCandidate(new RTCIceCandidate(message));
        } catch (error) {
          console.error("Error adding ICE candidate:", error);
        }
      }
    };
  } catch (error) {
    console.error("Error accessing media devices:", error);
  }
}

init();
