import dotenv from 'dotenv'
dotenv.config()
import { Configuration, OpenAIApi } from 'openai'
import { writeFileSync } from 'fs'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

// IMAGE DESCRIPTION
const prompt = `A beige computer from the 90s showing a terminal with java code in the style of vaporwave.`

const result = await openai.createImage({
  prompt,
  n: 1, // number of images to generate
  size: '1024x1024', // size of the image
  user: 'me', // user to generate the image for
})

const url = result.data.data[0].url
console.log(url)

// Save Image URL to Disk
const imgResult = await fetch(url)
const blob = await imgResult.blob()
const buffer = Buffer.from(await blob.arrayBuffer())
writeFileSync(`./img/${Date.now()}.png`, buffer)
