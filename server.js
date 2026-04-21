const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));
app.use(express.json());

// 1. 업로드 및 서명 여부 체크
app.post('/api/upload-and-check', upload.single('apk'), (req, res) => {
    const apkPath = req.file.path;
    const apksignerPath = req.body.apksignerPath;

    exec(`"${apksignerPath}" verify "${apkPath}"`, (error, stdout, stderr) => {
        // 에러가 발생하거나 결과에 'DOES NOT VERIFY'가 있으면 미서명 상태로 간주
        const isSigned = !(error || stdout.includes('DOES NOT VERIFY'));
        res.json({ isSigned, filename: req.file.filename });
    });
});

// 2. 실제 v2 서명 수행
app.post('/api/sign', (req, res) => {
    const { filename, apksignerPath, ksPath, ksPass } = req.body;
    const inputApk = path.join(__dirname, 'uploads', filename);
    const outputApk = path.join(__dirname, 'uploads', 'signed_' + filename);

    const cmd = `"${apksignerPath}" sign --v2-signing-enabled true --ks "${ksPath}" --ks-pass pass:${ksPass} --out "${outputApk}" "${inputApk}"`;

    exec(cmd, (error) => {
        if (error) return res.status(500).send("Signing failed.");
        
        res.download(outputApk, 'signed.apk', () => {
            if (fs.existsSync(inputApk)) fs.unlinkSync(inputApk);
            if (fs.existsSync(outputApk)) fs.unlinkSync(outputApk);
        });
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));