import express, { response } from 'express'
import bodyParser from 'body-parser'
import axios from "axios"

const app = express();
const port = 3000;
const API_URL = "https://ifsc.razorpay.com/"
const API_URL_PO_PIN = "https://api.postalpincode.in/pincode/"
const API_URL_PO_BRANCH = "https://api.postalpincode.in/postoffice/"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.render("index.ejs")
})

app.get("/bank", (req, res)=>{
    res.render("bank.ejs")
})

app.get("/postOffice", (req, res)=>{
    res.render("postOffice.ejs")
})

app.get("/about", (req, res)=>{
    res.render("about.ejs")
})

app.post("/bank-details", async (req, res)=>{
    const ifscCode = req.body["ifsc"]
    try{
        const response = await axios.get(API_URL + `${ifscCode}`)
        res.render("bank.ejs", {content: response.data})
    } catch(error){
        res.render("bank.ejs", {content: "Something went wrong"})
    }
})
app.post("/postOffice-pin", async (req, res)=>{
    const pinCode = req.body["pin"]
    try{
        const response = await axios.get(API_URL_PO_PIN + `${pinCode}`)
        res.render("postOffice.ejs", {content: response.data})
    } catch(error){
        res.render("postOffice.ejs", {content: "Something went wrong"})
    }
})
app.post("/postOffice-branch", async (req, res)=>{
    const branchName = req.body["branch"]
    try{
        const response = await axios.get(API_URL_PO_BRANCH + `${branchName}`)
        res.render("postOffice.ejs", {content: response.data})
    } catch(error){
        res.render("postOffice.ejs", {content: "Something went wrong"})
    }
})



app.listen(port, ()=>{
    console.log(`App is listing on port ${port}`)
})