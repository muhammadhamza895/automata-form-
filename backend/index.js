const express = require('express');
const app = express();
var cors = require('cors')

app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 3000;
let acceptedFileTypes =  ['pdf', 'jpg']
let options = [{ label: 'pdf', value: 'pdf' },{ label: 'doc', value: 'doc' }, { label: 'docx', value: 'docx' }, { label: 'txt', value: 'txt' }, { label: 'jpeg', value: 'jpeg' }, { label: 'jpg', value: "jpg" }, { label: 'mov', value: 'mov' }, { label: 'mp3', value: "mp3" }, { label: 'mp4', value: 'mp4' }];

app.get('/get-all-file-types',(req,res)=>{
    res.send(options)
})

app.get('/get-init-file-types',(req,res)=>{
    res.send(acceptedFileTypes)
})

app.post('/update-file-types',(req,res)=>{
    acceptedFileTypes= req.body?.value
    res.send(acceptedFileTypes)
})

app.post('/add-new-file-types',(req,res)=>{
    const ifExist = options.find((val)=>{
        return req.body?.newFileExtension == val?.value
    })
    if (ifExist) {
        return res.send({message: "Extension already exists"})
    }
    options.push({label : req.body?.newFileExtension , value: req.body?.newFileExtension})
    res.send(options)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});