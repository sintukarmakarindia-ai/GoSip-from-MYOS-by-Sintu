importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Firebase Configuration
firebase.initializeApp({
    apiKey: "AIzaSyAOY2UHZvCIvdTDFo_AgIBzTUqRSyNnxIQ",
    authDomain: "gosip-myos-by-sintu-766cf.firebaseapp.com",
    databaseURL: "https://gosip-myos-by-sintu-766cf-default-rtdb.firebaseio.com",
    projectId: "gosip-myos-by-sintu-766cf",
    storageBucket: "gosip-myos-by-sintu-766cf.firebasestorage.app",
    messagingSenderId: "747584921224",
    appId: "1:747584921224:web:9786bcbdd96b9e67d6c93d"
});

const messaging = firebase.messaging();

// সাইট বন্ধ থাকলে নোটিফিকেশন রিসিভ করার কোড
messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title || 'New Notification';
    const notificationOptions = {
        body: payload.notification.body || 'You have a new message or call.',
        icon: '/logo.png', // আপনার লোগো
        badge: '/logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});