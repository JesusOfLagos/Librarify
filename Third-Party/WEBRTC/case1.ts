// public/index.js
let localStream;
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

const configuration = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

let peerConnection;

async function createPeerConnection() {
  peerConnection = new RTCPeerConnection(configuration);

  localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      // Send the ICE candidate to the remote peer using your P2P signaling method
      // (implement this part in your backend or P2P signaling library)
    }
  };

  peerConnection.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };

  // Implement other event listeners for connection state, errors, etc. if needed

  return peerConnection;
}

async function init() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;
  } catch (error) {
    console.error("Error accessing media devices:", error);
  }
}

init();


// public/index.ts
let localStream: MediaStream;
const localVideo = document.getElementById("localVideo") as HTMLVideoElement;
const remoteVideo = document.getElementById("remoteVideo") as HTMLVideoElement;

const configuration: RTCConfiguration = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

let peerConnection: RTCPeerConnection;

async function createPeerConnection(): Promise<RTCPeerConnection> {
  peerConnection = new RTCPeerConnection(configuration);

  localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      // Send the ICE candidate to the remote peer using your P2P signaling method
      // (implement this part in your backend or P2P signaling library)
    }
  };

  peerConnection.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };

  // Implement other event listeners for connection state, errors, etc. if needed

  return peerConnection;
}

async function init(): Promise<void> {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;
  } catch (error) {
    console.error("Error accessing media devices:", error);
  }
}

init();

