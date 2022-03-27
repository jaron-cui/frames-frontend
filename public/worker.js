let message = "original";

self.addEventListener(
  "message",
  function(event) {
    message = event.data;
    console.log("message changed to " + message);
  },
  false
);

async function wait(time) {
  await new Promise(r => setTimeout(r, time));
}

async function doey() {
  while (true) {
    await wait(1000);
    console.log(message);
    postMessage(message);
  }
}

doey();