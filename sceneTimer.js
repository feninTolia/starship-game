export function getSceneTimer(fns, ctx, state, interval = 100) {
  let startTime = 0;
  function sceneTimer(timeStamp = 0) {
    const deltaTime = timeStamp - startTime;

    if (deltaTime >= interval) {
      startTime = timeStamp;
      fns.forEach((fn) => fn(ctx, state));
    }

    requestAnimationFrame(sceneTimer);
  }

  return sceneTimer;
}
