const  showNotification = async (body) => {
    const registration = await navigator.serviceWorker.getRegistration();
    console.log('logs registration', registration)
    const title = 'What PWA Can Do Today';

    const payload = {
        body
    };

    if(registration && 'showNotification' in registration) {
        registration.showNotification(title, payload);
    }
    else {
        new Notification(title, payload);
    }
};

export const handleNotification = async () => {
    if(Notification.permission === 'granted') {
        await showNotification('notification.value');
    }
    else {
        if(Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();

            if(permission === 'granted') {
                await showNotification('notification.value');
            }
        }
    }
};