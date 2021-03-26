/* eslint-disable no-undef */
async function runIdleDetection() {
  const state = await IdleDetector.requestPermission();
  console.log(state);

  const idleDetector = new IdleDetector();

  idleDetector.addEventListener('change', () => {
    const { userState, screenState } = idleDetector;
    console.log('USER: ', userState);
    console.log('SCREEN: ', screenState);

    if (userState === 'idle') {
      console.log('USER IS IDLE DO SOMETHING');
    }
  });

  await idleDetector.start({
    threshold: 120000,
  });
}

export function askForIdlePermission() {
  if ('IdleDetector' in window) {
    runIdleDetection();
  } else {
    console.log('%cIdle Detection Unsupported', 'color: #FF8C00');
  }
}
