// import * as Gpio from 'onoff';

// // Define the GPIO pin for the LED (adjust as needed)
// const ledPin = new Gpio(17, 'out');

// // Function to turn the LED on
// function turnOnLED() {
//   ledPin.writeSync(1); // 1 turns the LED on
//   console.log('LED turned on');
// }

// // Function to turn the LED off
// function turnOffLED() {
//   ledPin.writeSync(0); // 0 turns the LED off
//   console.log('LED turned off');
// }

// // Handle Ctrl+C to clean up before exiting
// process.on('SIGINT', () => {
//   ledPin.unexport();
//   console.log('Exiting...');
//   process.exit();
// });

// // Turn on the LED for 3 seconds
// turnOnLED();
// setTimeout(() => {
//   turnOffLED();
// }, 3000);
