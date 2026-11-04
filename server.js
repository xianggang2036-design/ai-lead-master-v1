const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());

let db = null;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    db = admin.firestore();
    console.log('[Firebase] 成功连接 Firestore');
  } else {
    console.warn('[Firebase] 未检测到环境变量');
  }
} catch (e) {
  console.error('[Firebase] 连接失败:', e.message);
}

app.get('/', (req, res) => {
  res.send('AI Lead Master V1.0 Ready');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
