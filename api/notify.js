const admin = require('firebase-admin');

// Firebase Admin ইনিশিয়ালাইজ করা (Vercel Environment Variable থেকে সিক্রেট কি নেবে)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Vercel-এ সেভ করা private key এর \n গুলোকে ঠিক করা
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    })
  });
}

export default async function handler(req, res) {
  // শুধুমাত্র POST রিকোয়েস্ট গ্রহণ করবে
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  
  const { token, title, body } = req.body;
  if (!token) return res.status(400).json({ error: 'Token missing' });

  try {
    // নোটিফিকেশন পাঠানো হচ্ছে
    await admin.messaging().send({
      token: token,
      notification: { title, body }
    });
    res.status(200).json({ success: true, message: 'Notification sent!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}