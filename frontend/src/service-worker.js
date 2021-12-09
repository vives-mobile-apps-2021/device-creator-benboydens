self.addEventListener('message', (event) => {
    console.log(event)
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
