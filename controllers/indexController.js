const { PDFDocument} = require('pdf-lib');
const { readFile, writeFile } = require('fs/promises');
const { existsSync }= require('fs')

const users = require('../data/db.js')

const index = async (req, res) => { 
   try {
      res.send(users)
   } catch (error) {
      console.log(error);
   }
}

const create = async (req, res) => { 
   try {
      users.push(req.body)
      res.status(200).send("success")
   } catch (error) {
      console.log(error);
   }
}

const download = async (req, res) => { 
   try {
      const id = req.params.id
   const data = users.filter((user) => {
      return user.id == id
   })

   const templateDir = `${__dirname}/../pdf/${data[0].template}`
      if (!existsSync(templateDir)) {
         throw new Error(`Template not found`)
      } else {
         const pdfDoc = await PDFDocument.load(await readFile(templateDir))

   pdfDoc.removePage(0)
   pdfDoc.removePage(0)
   pdfDoc.removePage(3)

   const form = pdfDoc.getForm()

   const datas = data[0].data;
   const ringkasan = data[0].ringkasan;

   for (const keys in datas) {
      form.getTextField(keys).setText(`${datas[keys]}`)
   }

   for (const keys in ringkasan) {
      form.getTextField(keys).setText(`${ringkasan[keys]}`)
   }
      form.getTextField(`total_dana`).setText(`
      ${
         ringkasan.aof_nilai_dana +
         ringkasan.fipf_nilai_dana +
         ringkasan.gpf_nilai_dana +
         ringkasan.scef_nilai_dana +
         ringkasan.sf_nilai_dana
      }`)

   form.flatten()

   const pdfBtyes = await pdfDoc.save()
   await writeFile(`${__dirname}/../pdf/output.pdf`, pdfBtyes)

   res.status(200).download(`${__dirname}/../pdf/output.pdf`, 'form.pdf')

   }
   } catch (error) {
      console.log(error);
   }
 }

module.exports = { index, create, download }