const express = require('express');
const cors = require('cors');
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
        console.warn('[Firebase] 警告: 未找到 FIREBASE_SERVICE_ACCOUNT 环境变量');
    }
} catch (error) {
    console.error('[Firebase] 初始化失败:', error);
}

app.get('/', (req, res) => {
    res.send('AI Lead Master V1.0 Ready');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(Server is running on port );
});
