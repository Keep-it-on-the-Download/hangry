if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((reg) =>
        console.log(
          '%cService worker registration succeeded:',
          'color: green',
          reg.scope
        )
      )
      .catch((err) =>
        console.log('%cService worker registration failed -', 'color: red', err)
      );
  });
} else {
  console.log('%cService workers are not supported.', 'color: orange');
}
