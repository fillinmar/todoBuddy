const showNotification = async (body) => {
    const registration = await navigator.serviceWorker.getRegistration();
    const title = 'Не забудь выполнить';

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

export const handleNotification = async (value) => {
    if(Notification.permission === 'granted') {
        await showNotification(value);
    }
    else {
        if(Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();

            if(permission === 'granted') {
                await showNotification(value);
            }
        }
    }
};